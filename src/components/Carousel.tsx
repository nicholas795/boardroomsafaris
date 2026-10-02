import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode;
  autoplay?: boolean;
  autoplayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, autoplay = true, autoplayInterval = 4000 }) => {
  const items = React.Children.toArray(children);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [isHover, setIsHover] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startTranslate = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setVisible(3);
      else if (w >= 768) setVisible(2);
      else setVisible(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (index < 0) setIndex(0);
    const maxIndex = Math.max(0, items.length - visible);
    if (index > maxIndex) setIndex(maxIndex);
  }, [visible, items.length, index]);

  useEffect(() => {
    let id: number | undefined;
    if (autoplay && !isHover && items.length > visible) {
      id = window.setInterval(() => {
        setIndex((i) => {
          const maxIndex = Math.max(0, items.length - visible);
          return i >= maxIndex ? 0 : i + 1;
        });
      }, autoplayInterval);
    }
    return () => { if (id) window.clearInterval(id); };
  }, [autoplay, autoplayInterval, isHover, items.length, visible]);

  const goPrev = () => {
    setIndex((i) => (i <= 0 ? Math.max(0, items.length - visible) : i - 1));
  };

  const goNext = () => {
    setIndex((i) => {
      const maxIndex = Math.max(0, items.length - visible);
      return i >= maxIndex ? 0 : i + 1;
    });
  };

  const applyTransform = (valuePercent: number) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(${valuePercent}%)`;
  };

  useEffect(() => {
    // compute base transform based on index and visible
    const percentPer = 100 / visible;
    const value = -index * percentPer;
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 700ms cubic-bezier(.22,.9,.37,1)';
      applyTransform(value);
    }
  }, [index, visible]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current || !trackRef.current) return;
    setIsDragging(true);
    startX.current = e.clientX;
    const style = window.getComputedStyle(trackRef.current);
    // parse current translateX (pixels)
    try {
      // DOMMatrix is broadly available in browsers
      // @ts-ignore
      const matrix = new DOMMatrix(style.transform || '');
      // @ts-ignore
      startTranslate.current = matrix.m41 || 0;
    } catch {
      startTranslate.current = 0;
    }
    trackRef.current.style.transition = 'none';
    try { (e.target as Element).setPointerCapture(e.pointerId); } catch {}
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current || !trackRef.current) return;
    const deltaX = e.clientX - startX.current;
    const containerW = containerRef.current.clientWidth || 1;
    const deltaPercent = (deltaX / containerW) * 100;
    const percentPer = 100 / visible;
    const base = -index * percentPer;
    // apply temporary transform
    const value = base + deltaPercent;
    applyTransform(value);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current || !trackRef.current) return;
    setIsDragging(false);
    const deltaX = e.clientX - startX.current;
    const threshold = Math.max(30, containerRef.current.clientWidth * 0.08);
    if (deltaX > threshold) {
      goPrev();
    } else if (deltaX < -threshold) {
      goNext();
    } else {
      // snap back
      const percentPer = 100 / visible;
      const value = -index * percentPer;
      applyTransform(value);
    }
    try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
  };

  return (
    <div className="relative">
      <div className="absolute top-1/2 -translate-y-1/2 left-3 z-20">
        <button
          aria-label="Previous"
          onClick={goPrev}
          className="w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-charcoal hover:scale-105 transition-transform"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-3 z-20">
        <button
          aria-label="Next"
          onClick={goNext}
          className="w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-charcoal hover:scale-105 transition-transform"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        ref={containerRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ transform: `translateX(${-(index * (100 / visible))}%)` }}
        >
          {items.map((child, i) => (
            <div
              key={i}
              className="flex-shrink-0 p-2"
              style={{ width: `${100 / visible}%` }}
            >
              <div className="h-full">{child}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-charcoal' : 'bg-charcoal/30'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
