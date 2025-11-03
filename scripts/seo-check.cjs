#!/usr/bin/env node

/**
 * SEO检查脚本
 * 检查所有URL的可访问性和SEO配置
 */

const fs = require('fs');
const path = require('path');

// 定义所有应该存在的路由
const EXPECTED_ROUTES = [
  '/',
  '/articles',
  '/skincare-article',
  '/nutrition-article',
  '/mindfulness-article',
  '/articles/skincare-secrets',
  '/articles/nutrition-and-aging',
  '/articles/mindfulness-for-youthfulness'
];

// 页面组件映射
const PAGE_COMPONENTS = {
  '/': 'Home.tsx',
  '/articles': 'ArticlesPage.tsx',
  '/skincare-article': 'SkincareArticle.tsx',
  '/nutrition-article': 'NutritionArticle.tsx',
  '/mindfulness-article': 'MindfulnessArticle.tsx',
  '/articles/skincare-secrets': 'SkincareSecrets.tsx',
  '/articles/nutrition-and-aging': 'NutritionAndAging.tsx',
  '/articles/mindfulness-for-youthfulness': 'MindfulnessForYouthfulness.tsx'
};

// 检查颜色
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

function checkAppRoutes() {
  log('blue', '🔍 检查App.tsx路由配置...');

  const appPath = path.join(__dirname, '../src/App.tsx');
  if (!checkFileExists(appPath)) {
    log('red', '❌ App.tsx文件不存在');
    return false;
  }

  const appContent = fs.readFileSync(appPath, 'utf8');
  const issues = [];

  // 检查是否导入了所有页面组件
  for (const [route, component] of Object.entries(PAGE_COMPONENTS)) {
    const componentName = component.replace('.tsx', '');
    const importPattern = componentName + ' = lazy';
    if (!appContent.includes(importPattern)) {
      issues.push(`❌ 缺少${componentName}组件导入`);
    }
  }

  // 检查路由配置
  for (const route of EXPECTED_ROUTES) {
    const routePattern = `path="${route}"`;
    if (!appContent.includes(routePattern)) {
      issues.push(`❌ 缺少路由: ${route}`);
    }
  }

  if (issues.length === 0) {
    log('green', '✅ 所有路由配置正确');
    return true;
  } else {
    log('red', '❌ 发现路由配置问题:');
    issues.forEach(issue => log('red', `   ${issue}`));
    return false;
  }
}

function checkPageComponents() {
  log('blue', '🔍 检查页面组件文件...');

  const pagesDir = path.join(__dirname, '../src/pages');
  const issues = [];

  for (const [route, component] of Object.entries(PAGE_COMPONENTS)) {
    const componentPath = path.join(pagesDir, component);
    if (!checkFileExists(componentPath)) {
      issues.push(`❌ 缺少页面组件: ${component} (路由: ${route})`);
    } else {
      log('green', `✅ ${component} 存在`);
    }
  }

  if (issues.length === 0) {
    log('green', '✅ 所有页面组件都存在');
    return true;
  } else {
    log('red', '❌ 发现页面组件问题:');
    issues.forEach(issue => log('red', `   ${issue}`));
    return false;
  }
}

function checkVercelConfig() {
  log('blue', '🔍 检查vercel.json配置...');

  const vercelPath = path.join(__dirname, '../vercel.json');
  if (!checkFileExists(vercelPath)) {
    log('red', '❌ vercel.json文件不存在');
    return false;
  }

  const vercelContent = fs.readFileSync(vercelPath, 'utf8');

  // 检查SPA fallback配置
  if (!vercelContent.includes('"destination": "/index.html"')) {
    log('red', '❌ vercel.json缺少SPA fallback配置');
    return false;
  }

  log('green', '✅ vercel.json配置正确');
  return true;
}

function checkSEOComponents() {
  log('blue', '🔍 检查页面SEO配置...');

  const pagesDir = path.join(__dirname, '../src/pages');
  const issues = [];

  for (const [route, component] of Object.entries(PAGE_COMPONENTS)) {
    const componentPath = path.join(pagesDir, component);
    if (!checkFileExists(componentPath)) continue;

    const content = fs.readFileSync(componentPath, 'utf8');

    // 检查SEO组件 (Helmet 或 ArticleSchema)
    if (!content.includes('Helmet') && !content.includes('ArticleSchema')) {
      issues.push(`❌ ${component}: 缺少SEO组件 (Helmet 或 ArticleSchema)`);
    }

    // 检查title标签 (在ArticleSchema中)
    if (route !== '/' && !content.includes('title=') && !content.includes('<title>')) {
      issues.push(`❌ ${component}: 缺少title标签`);
    }

    // 检查meta description (在ArticleSchema中)
    if (route !== '/' && !content.includes('description=') && !content.includes('name="description"')) {
      issues.push(`❌ ${component}: 缺少meta description`);
    }

    // 检查ArticleSchema（文章页面）
    if (route !== '/' && route !== '/articles' && !content.includes('ArticleSchema')) {
      issues.push(`❌ ${component}: 缺少ArticleSchema组件`);
    }
  }

  if (issues.length === 0) {
    log('green', '✅ 所有页面SEO配置正确');
    return true;
  } else {
    log('red', '❌ 发现SEO配置问题:');
    issues.forEach(issue => log('red', `   ${issue}`));
    return false;
  }
}

function checkInternalLinks() {
  log('blue', '🔍 检查内部链接...');

  const srcDir = path.join(__dirname, '../src');
  const issues = [];

  function findFiles(dir, extension) {
    const files = [];

    function traverse(currentDir) {
      const items = fs.readdirSync(currentDir);

      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          traverse(fullPath);
        } else if (stat.isFile() && item.endsWith(extension)) {
          files.push(fullPath);
        }
      }
    }

    traverse(dir);
    return files;
  }

  const tsxFiles = findFiles(srcDir, '.tsx');

  for (const filePath of tsxFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.relative(srcDir, filePath);

    // 检查内部链接
    const linkMatches = content.match(/to="([^"]+)"/g);
    if (linkMatches) {
      for (const match of linkMatches) {
        const linkPath = match.match(/to="([^"]+)"/)[1];

        // 检查是否为内部链接
        if (linkPath.startsWith('/') && !linkPath.startsWith('http')) {
          // 移除锚点部分 (#top 等)
          const cleanPath = linkPath.split('#')[0];
          if (!EXPECTED_ROUTES.includes(cleanPath)) {
            issues.push(`❌ ${fileName}: 链接到不存在的路由: ${linkPath}`);
          }
        }
      }
    }
  }

  if (issues.length === 0) {
    log('green', '✅ 所有内部链接正确');
    return true;
  } else {
    log('red', '❌ 发现内部链接问题:');
    issues.forEach(issue => log('red', `   ${issue}`));
    return false;
  }
}

function generateRouteReport() {
  log('cyan', '\n📊 SEO检查报告');
  log('cyan', '================');

  log('blue', '\n📍 当前路由映射:');
  for (const [route, component] of Object.entries(PAGE_COMPONENTS)) {
    const componentPath = path.join(__dirname, '../src/pages', component);
    const exists = checkFileExists(componentPath);
    const status = exists ? '✅' : '❌';
    console.log(`   ${status} ${route} → ${component}`);
  }

  log('blue', `\n📈 总计: ${EXPECTED_ROUTES.length} 个路由`);
  log('blue', `🌐 网站域名: https://howolddoilook.art`);
}

function main() {
  log('cyan', '🚀 开始SEO检查...\n');

  const results = {
    routes: checkAppRoutes(),
    components: checkPageComponents(),
    vercel: checkVercelConfig(),
    seo: checkSEOComponents(),
    links: checkInternalLinks()
  };

  generateRouteReport();

  const allPassed = Object.values(results).every(result => result);

  log('\n' + '='.repeat(50), 'cyan');
  if (allPassed) {
    log('green', '🎉 所有SEO检查通过！');
    log('green', '✅ 可以安全部署到生产环境');
    process.exit(0);
  } else {
    log('red', '❌ 发现SEO问题，请修复后重新检查');
    log('yellow', '💡 请参考 SEO_GUIDELINES.md 文件');
    process.exit(1);
  }
}

// 运行检查
if (require.main === module) {
  main();
}

module.exports = {
  checkAppRoutes,
  checkPageComponents,
  checkVercelConfig,
  checkSEOComponents,
  checkInternalLinks,
  EXPECTED_ROUTES,
  PAGE_COMPONENTS
};