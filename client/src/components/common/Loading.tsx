import React from 'react';

interface LoadingProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  type = 'spinner',
  size = 'md',
  text,
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const renderSpinner = () => (
    <div className={`relative ${sizeClasses[size]}`}>
      <div className="absolute w-full h-full border-4 border-gray-200 dark:border-gray-700 rounded-full" />
      <div className="absolute w-full h-full border-4 border-primary-500 rounded-full animate-spin border-t-transparent" />
    </div>
  );

  const renderDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${
            sizeClasses[size].split(' ')[0]
          } aspect-square bg-primary-500 rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className="flex space-x-2">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`${
            sizeClasses[size].split(' ')[0]
          } aspect-square bg-primary-500 rounded-full animate-pulse`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );

  const renderSkeleton = () => (
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded shimmer" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 shimmer" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 shimmer" />
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'skeleton':
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderLoader()}
      {text && (
        <p
          className={`text-gray-600 dark:text-gray-300 ${
            textSizeClasses[size]
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
