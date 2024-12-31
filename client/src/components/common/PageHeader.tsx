import React from 'react';
import { Link } from 'react-router-dom';

interface Breadcrumb {
  name: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
}) => {
  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.name} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 mx-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    className="hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span>{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center space-x-3">{actions}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
