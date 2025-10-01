'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface StackGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function StackGroup({ 
  children, 
  className = '',
  staggerDelay = 80
}: StackGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // If reduced motion is preferred, just show all elements immediately
      const children = container.querySelectorAll('[data-stack-item]');
      children.forEach((child) => {
        child.classList.add('in');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('[data-stack-item]');
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('in');
              }, index * staggerDelay);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [staggerDelay]);

  return (
    <div 
      ref={containerRef}
      className={`${className}`}
      data-stack
    >
      {children}
    </div>
  );
}

// Utility component for stack items
interface StackItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function StackItem({ 
  children, 
  className = '',
  index = 0
}: StackItemProps) {
  return (
    <div
      data-stack-item
      className={`opacity-0 transform translate-y-4 scale-[0.985] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--acc-500)]/10 ${className}`}
      style={{
        '--i': index,
        transitionDelay: `calc(var(--i) * 80ms)`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

