import React from 'react';
import { useReveal } from '@/lib/useReveal';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SectionReveal: React.FC<SectionRevealProps> = ({ children, className = '', delay = 0 }) => {
  const { ref, isVisible } = useReveal(0.1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default SectionReveal;
