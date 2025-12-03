'use client';

import { useEffect, useRef } from 'react';

interface LottieCardProps {
  badge: string;
  title: string;
  description: string;
  animationPath?: string;
  className?: string;
}

export default function LottieCard({
  badge,
  title,
  description,
  animationPath,
  className = '',
}: LottieCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (!animationPath || typeof window === 'undefined') return;

    const loadAnimation = async () => {
      if (!(window as any).lottie) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      if (containerRef.current && (window as any).lottie) {
        animationRef.current = (window as any).lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: animationPath,
        });
      }
    };

    loadAnimation().catch(console.error);

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [animationPath]);

  return (
    <div className={`relative rounded-[10px] overflow-hidden bg-[#181818] ${className}`}>
      <div className="relative min-h-[400px] md:min-h-[500px] flex items-center">
        {/* 左侧内容区域 */}
        <div className="relative z-10 p-8 md:p-12 max-w-[50%]">
          {/* 徽章 */}
          <div className="inline-flex items-center justify-center px-3 py-1 rounded mb-6 bg-[#60787c]">
            <p className="text-sm text-center text-white m-0">{badge}</p>
          </div>
          
          {/* 标题 */}
          <h3 className="text-3xl md:text-4xl font-light mb-4 text-white leading-tight">
            {title}
          </h3>
          
          {/* 描述 */}
          <p className="text-[#d6d6d6] leading-relaxed text-base">
            {description}
          </p>
        </div>

        {/* 右侧 Lottie 动画 */}
        {animationPath && (
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[550px] md:h-[550px] pointer-events-none"
            style={{ 
              opacity: 0.6
            }}
          >
            <div 
              ref={containerRef}
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
