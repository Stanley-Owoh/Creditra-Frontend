import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '1rem', borderRadius = '4px', style }) => {
  const baseStyle: React.CSSProperties = {
    width,
    height,
    borderRadius,
    background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 37%, #e0e0e0 63%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    ...style,
  };

  // Disable animation for reduced motion users
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    baseStyle.animation = 'none';
    baseStyle.background = '#e0e0e0';
  }

  return <div style={baseStyle} role="status" aria-label="loading" />;
};

// Inject global keyframes if not already present
if (typeof document !== 'undefined') {
  const styleTagId = 'skeleton-shimmer-styles';
  if (!document.getElementById(styleTagId)) {
    const style = document.createElement('style');
    style.id = styleTagId;
    style.textContent = `@keyframes shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}`;
    document.head.appendChild(style);
  }
}
