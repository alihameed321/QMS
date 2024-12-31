import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  actions,
  footer,
  noPadding = false,
}) => {
  return (
    <div className={`card ${className}`}>
      {/* Card Header */}
      {(title || actions) && (
        <div className="card-header flex justify-between items-center">
          <div>
            {title && <h3 className="text-lg font-medium">{title}</h3>}
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center space-x-3">{actions}</div>}
        </div>
      )}

      {/* Card Body */}
      <div className={noPadding ? '' : 'card-body'}>{children}</div>

      {/* Card Footer */}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
