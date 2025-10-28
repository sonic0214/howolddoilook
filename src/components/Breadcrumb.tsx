import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  path: string;
  icon?: any;
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  // Don't show breadcrumbs on homepage
  if (pathSegments.length === 0) {
    return null;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/', icon: Home }
  ];

  // Add current page if it's an article
  if (pathSegments.length === 2 && pathSegments[0] === 'articles') {
    const articleType = pathSegments[1];
    let articleTitle = 'Article';

    switch(articleType) {
      case 'skincare-article':
        articleTitle = 'Skincare Guide';
        break;
      case 'nutrition-article':
        articleTitle = 'Nutrition Guide';
        break;
      case 'mindfulness-article':
        articleTitle = 'Mindfulness Guide';
        break;
    }

    breadcrumbItems.push({
      label: 'Articles',
      path: '/articles'
    });

    breadcrumbItems.push({
      label: articleTitle,
      path: location.pathname
    });
  }

  return (
    <nav className="container mx-auto px-6 py-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const Icon = item.icon;

          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
              {Icon && (
                <Icon className="w-4 h-4 mr-1" />
              )}
              {isLast ? (
                <span className="text-terracotta font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-terracotta transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}