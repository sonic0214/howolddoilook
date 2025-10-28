# Tools 目录

这个目录包含独立的开工具和脚本，用于辅助开发和SEO分析。

## 文件说明

### SEO分析工具
- `claude_seo_agent.py` - Claude SEO Agent主程序
- `demo_seo_agent.py` - SEO Agent演示脚本
- `requirements.txt` - Python依赖包

## 使用方法

```bash
# 进入tools目录
cd tools

# 安装Python依赖
pip install -r requirements.txt

# 运行SEO分析
python claude_seo_agent.py

# 运行演示
python demo_seo_agent.py
```

## 注意事项

这些是独立的工具，不需要在React项目中运行。如果不需要SEO分析功能，可以安全删除整个tools目录。