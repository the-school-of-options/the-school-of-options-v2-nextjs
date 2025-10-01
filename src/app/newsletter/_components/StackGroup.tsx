"use client";

import React, { useEffect, useRef, useState } from "react";

interface StackGroupProps {
  children: React.ReactNode;
  className?: string;
}

export default function StackGroup({ children, className = "" }: StackGroupProps) {
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`stack-group ${className} ${isInView ? "in" : ""}`}
      style={{
        // Disable animations if user prefers reduced motion
        ...(prefersReducedMotion && {
          opacity: 1,
          transform: "none",
        }),
      }}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            style: {
              ...child.props.style,
              "--i": index,
            },
          } as any);
        }
        return child;
      })}
    </div>
  );
}
