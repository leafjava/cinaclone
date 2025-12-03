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
      // 动态加载 Lottie
      if (!(window as any).lottie) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      // 初始化动画
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
    <div className={`relative bg-gradient-to-br from-[#1a3a3a] to-[#0f2a2a] rounded-3xl p-8 overflow-hidden min-h-[400px] ${className}`}>
      {/* 内容 */}
      <div className="relative z-10">
        <div className="inline-block px-3 py-1 bg-[#449fa5]/20 rounded-full mb-6">
          <span className="text-sm text-[#449fa5]">{badge}</span>
        </div>
        <h3 className="text-3xl font-light mb-4 leading-tight text-white">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Lottie 动画 */}
      {animationPath && (
        <div 
          ref={containerRef}
          className="absolute right-0 bottom-0 w-64 h-64 opacity-20"
        />
      )}

      {/* 备用装饰 */}
      <div className="absolute right-0 bottom-0 w-64 h-64 opacity-20 pointer-events-none">
        <div className="absolute w-full h-full rounded-full border-2 border-[#449fa5]/30" />
        <div className="absolute inset-8 rounded-full border-2 border-[#449fa5]/40" />
        <div className="absolute inset-16 rounded-full border-2 border-[#449fa5]/50" />
      </div>
    </div>
  );
}
