'use client';

import { X } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import LottieCard from "./components/LottieCard";

export default function Home() {
  const [showNotification, setShowNotification] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showLearnDropdown, setShowLearnDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const learnDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAboutDropdown(false);
      }
      if (learnDropdownRef.current && !learnDropdownRef.current.contains(event.target as Node)) {
        setShowLearnDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lottie动画加载
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

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
        // 清除之前的动画
        if (animationRef.current) {
          animationRef.current.destroy();
        }
        
        animationRef.current = (window as any).lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/sxp5vYoSaPggBtOydnITFu0QUSw.json', // 使用一个安全相关的动画
        });
      }
    };

    loadAnimation().catch(console.error);

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [mounted]);

  // Generate random positions only on client side
  const matrixLines = useMemo(() => {
    if (!mounted) return [];
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${(i * 5) + Math.random() * 5}%`,
      height: `${30 + Math.random() * 40}%`,
      duration: `${3 + Math.random() * 4}s`,
      delay: `${Math.random() * 2}s`,
    }));
  }, [mounted]);

  const matrixDots = useMemo(() => {
    if (!mounted) return [];
    return [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 2}s`,
      delay: `${Math.random() * 2}s`,
    }));
  }, [mounted]);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-7 left-1/2 -translate-x-1/2 z-50 w-[944px]">
        <div className="bg-white/10 backdrop-blur-[12px] border border-white/10 rounded-[10px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1)] h-[72px] px-6 pl-6 pr-5">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M12 0C5.3826 0 0 5.38259 0 12C0 18.6174 5.3826 24 12 24C18.6174 24 24 18.6174 24 12C24 5.38259 18.6174 0 12 0ZM18.7324 19.0706C18.7159 19.087 18.5649 19.225 18.0197 19.1954C17.4746 19.1658 16.7159 18.9688 15.7767 18.5419C13.908 17.6979 11.6223 16.0887 9.41544 13.8851C9.21183 13.6814 9.02135 13.4811 8.82759 13.2775L8.77504 13.2151H16.4893L16.5353 13.2775C17.5895 14.7685 18.2989 16.1445 18.6338 17.2479C19.0542 18.6207 18.7652 19.0345 18.7291 19.0706H18.7324ZM4.73892 19.3695C4.70279 19.3333 4.41379 18.9195 4.83416 17.5468C5.17241 16.4433 5.87849 15.0673 6.93268 13.5764H7.0312C7.44499 14.0427 7.87521 14.509 8.33498 14.9688C9.10345 15.7373 9.88834 16.4401 10.6667 17.0739C9.61248 17.8325 8.60099 18.4302 7.6913 18.844C6.75206 19.2677 5.99343 19.4647 5.44828 19.4975C4.90312 19.5271 4.75206 19.3892 4.73563 19.3727L4.73892 19.3695ZM4.73892 5.37931C4.75534 5.36289 4.90641 5.22496 5.45156 5.25452C5.99672 5.28407 6.75534 5.48112 7.69458 5.90805C8.52874 6.28571 9.44828 6.82102 10.4039 7.48768C9.9179 7.91461 9.43186 8.36782 8.95238 8.84729C8.20361 9.59606 7.51724 10.358 6.89655 11.1199C5.86207 9.6486 5.16585 8.29228 4.83416 7.20197C4.41379 5.82923 4.70279 5.41543 4.73892 5.37931ZM16.2824 11.6864H8.41051C8.90969 11.0985 9.44828 10.5123 10.0296 9.92775C12.2332 7.72414 14.5222 6.11494 16.3908 5.27094C17.33 4.84729 18.0887 4.65025 18.6338 4.61741C19.179 4.58785 19.3301 4.72578 19.3465 4.7422C19.3629 4.75862 19.4647 4.867 19.4745 5.25452C19.4844 5.65189 19.3859 6.22332 19.1166 6.96552C18.6305 8.30542 17.665 9.95895 16.2824 11.6864ZM17.688 3.21839C15.9934 3.58949 13.8292 4.73563 11.6158 6.47619C9.33334 4.82759 7.16585 3.84236 5.57964 3.73727C7.35304 2.35796 9.57964 1.53038 11.9967 1.53038C14.0952 1.53038 16.046 2.15107 17.688 3.21839ZM3.11659 6.46305C3.30049 8.05255 4.29885 10.1642 5.9179 12.3777C4.49261 14.3251 3.5468 16.197 3.21511 17.7012C2.14778 16.0591 1.52381 14.1051 1.52381 12.0066C1.52381 9.90805 2.10838 8.07225 3.11659 6.46305ZM6.44664 20.8801C7.99672 20.5287 9.93104 19.5369 11.9343 18.0427C14.1478 19.6289 16.2496 20.5846 17.8095 20.7126C16.1445 21.8259 14.1445 22.4795 11.9967 22.4795C9.95731 22.4795 8.05583 21.8916 6.44664 20.8801ZM20.3777 18.2824C20.2923 16.7225 19.3399 14.5813 17.7274 12.3218C19.3925 10.1741 20.4926 8.08539 20.8604 6.4335C21.8785 8.04926 22.4729 9.95731 22.4729 12.0033C22.4729 14.3547 21.6946 16.5287 20.3777 18.2791V18.2824Z" fill="black"/>
                </svg>
              </div>
              <span className="text-xl font-light text-white">theo</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="relative" 
                ref={dropdownRef}
                onMouseLeave={() => setShowAboutDropdown(false)}
              >
                <button 
                  onMouseEnter={() => setShowAboutDropdown(true)}
                  className="px-4 py-2 text-sm text-white hover:text-gray-300 transition-colors opacity-95 rounded-full"
                >
                  About
                </button>
                
                {/* Dropdown Menu */}
                {showAboutDropdown && (
                  <div 
                    className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-[10px] border border-white/10 rounded-[10px] shadow-[0px_0.602187px_0.602187px_-1.25px_rgba(0,0,0,0.04),0px_2.28853px_2.28853px_-2.5px_rgba(0,0,0,0.03),0px_10px_10px_-3.75px_rgba(0,0,0,0.01)] p-2 flex flex-col gap-0.5 min-w-[320px]"
                    onMouseEnter={() => setShowAboutDropdown(true)}
                  >
                    {/* Contact Us */}
                    <a href="#" className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-[10px] transition-colors">
                      <div className="w-10 h-10 bg-[#007f8e]/20 rounded-md flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#007f8e]">
                          <rect x="2" y="4" width="20" height="16" rx="2"/>
                          <path d="m2 7 10 6 10-6"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-normal mb-0.5">Contact Us</p>
                        <p className="text-white/70 text-xs leading-relaxed">Reach out with a question, idea, or request.</p>
                      </div>
                    </a>

                    {/* Brand Kit */}
                    <a href="#" className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-[10px] transition-colors">
                      <div className="w-10 h-10 bg-[#007f8e]/20 rounded-md flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#007f8e]">
                          <rect x="9" y="9" width="13" height="13" rx="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-normal mb-0.5">Brand Kit</p>
                        <p className="text-white/70 text-xs leading-relaxed">Access our marks, brand guidelines, and approved assets.</p>
                      </div>
                    </a>

                    {/* Socials */}
                    <a href="#" className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-[10px] transition-colors">
                      <div className="w-10 h-10 bg-[#007f8e]/20 rounded-md flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#007f8e]">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-normal mb-0.5">Socials</p>
                        <p className="text-white/70 text-xs leading-relaxed">Be the first to get Theo news on X and LinkedIn, and connect with the community on Discord.</p>
                      </div>
                    </a>

                    {/* Careers (Coming Soon) */}
                    <a href="#" className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-[10px] transition-colors opacity-50">
                      <div className="w-10 h-10 bg-[#007f8e]/20 rounded-md flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#007f8e]">
                          <rect x="2" y="7" width="20" height="14" rx="2"/>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-normal mb-0.5">Careers (Coming Soon)</p>
                        <p className="text-white/70 text-xs leading-relaxed">Join Theo and help us reimagine global financial markets.</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
              <div 
                className="relative" 
                ref={learnDropdownRef}
                onMouseLeave={() => setShowLearnDropdown(false)}
              >
                <button 
                  onMouseEnter={() => setShowLearnDropdown(true)}
                  className="px-4 py-2 text-sm text-white hover:text-gray-300 transition-colors opacity-95 rounded-full"
                >
                  Learn
                </button>
                
                {/* Learn Dropdown Menu */}
                {showLearnDropdown && (
                  <div 
                    className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-[10px] border border-white/10 rounded-[10px] shadow-[0px_10px_20px_0px_rgba(0,0,0,0.05)] p-2 flex flex-col gap-0.5 min-w-[320px]"
                    onMouseEnter={() => setShowLearnDropdown(true)}
                  >
                    {/* Blog */}
                    <a href="#" className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-[10px] transition-colors">
                      <div className="w-10 h-10 bg-[#645ff1]/20 rounded-md flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#645ff1]">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-normal mb-0.5">Blog</p>
                        <p className="text-white/70 text-xs leading-relaxed">Stay up to date with insights and updates from the Theo team.</p>
                      </div>
                    </a>

                    {/* Docs & FAQ */}
                    <a href="#" className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-[10px] transition-colors">
                      <div className="w-10 h-10 bg-[#645ff1]/20 rounded-md flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#645ff1]">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-normal mb-0.5">Docs & FAQ</p>
                        <p className="text-white/70 text-xs leading-relaxed">Explore technical documentation and answers to common questions.</p>
                      </div>
                    </a>

                    {/* Vision */}
                    <a href="#" className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-[10px] transition-colors">
                      <div className="w-10 h-10 bg-[#645ff1]/20 rounded-md flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#645ff1]">
                          <circle cx="11" cy="11" r="8"/>
                          <path d="m21 21-4.35-4.35"/>
                          <circle cx="11" cy="11" r="3"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-normal mb-0.5">Vision</p>
                        <p className="text-white/70 text-xs leading-relaxed">Understand our mission and the long-term vision behind Theo.</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
              <a href="#" className="px-4 py-2 text-sm text-white hover:text-gray-300 transition-colors opacity-95 rounded-full">Products</a>
              <button className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-normal hover:bg-gray-100 transition-colors backdrop-blur-[10px] ml-2">
                Launch app
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/home.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 max-w-[944px] mx-auto px-6 text-left w-full">
          <div className="max-w-2xl flex flex-col gap-8">
            <h1 className="text-6xl md:text-7xl font-light leading-tight">
              Reimagining<br />
              Global Markets
            </h1>
            <p className="text-lg text-white leading-relaxed max-w-xl">
              Theo is a full-stack platform connecting onchain capital to<br />
              global financial markets.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white/10 backdrop-blur-[9px] text-white rounded-full hover:bg-white/20 transition-colors">
                Explore Theo
              </button>
              <button className="px-6 py-3 text-white flex items-center gap-2 hover:text-gray-300 transition-colors bg-transparent rounded-full">
                Get in Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Banner */}
        {!showNotification && (
          <div className="absolute bottom-8 right-8 z-20 bg-white/10 backdrop-blur-[4px] rounded-lg p-3 pl-3 pr-2.5 pt-3 pb-0.5 max-w-[464px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[15px] text-white font-normal">Announcing our $20M Raise</p>
              <button
                onClick={() => setShowNotification(true)}
                className="text-black hover:text-gray-700 ml-4"
              >
                <X size={20} />
              </button>
            </div>
            <a 
              href="#" 
              className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors opacity-90 pb-2"
            >
              <span className="text-[15px]">Read More</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        )}
      </section>

      {/* Backed By Section */}
      <section className="py-16 bg-[#0c0e11] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-8">BACKED BY:</p>
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-16 animate-scroll">
              <div className="text-2xl font-light tracking-wider whitespace-nowrap">anthos</div>
              <div className="text-2xl font-light tracking-wider whitespace-nowrap">HACK VC</div>
              <div className="text-xl font-light whitespace-nowrap">MIRANA</div>
              <div className="text-2xl font-light tracking-wider whitespace-nowrap">manifold</div>
              <div className="text-xl font-light whitespace-nowrap">METALAYER VENTURES</div>
              <div className="text-xl font-light whitespace-nowrap">SCB</div>
              <div className="text-xl font-light whitespace-nowrap">Selini</div>
              <div className="text-xl font-light whitespace-nowrap">Amber</div>
              <div className="text-xl font-light whitespace-nowrap">MEXC</div>
              <div className="text-xl font-light whitespace-nowrap">Flowdesk</div>
              {/* Duplicate for seamless loop */}
              <div className="text-2xl font-light tracking-wider whitespace-nowrap">anthos</div>
              <div className="text-2xl font-light tracking-wider whitespace-nowrap">HACK VC</div>
              <div className="text-xl font-light whitespace-nowrap">MIRANA</div>
              <div className="text-2xl font-light tracking-wider whitespace-nowrap">manifold</div>
              <div className="text-xl font-light whitespace-nowrap">METALAYER VENTURES</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Theo Section */}
      <section className="py-24 bg-[#0c0e11]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-3 rounded-full bg-[#449fa5]" />
            <div className="w-3 h-3 rounded-full bg-gray-600" />
            <div className="w-3 h-3 rounded-full bg-gray-600" />
          </div>
          <h2 className="text-5xl font-light mb-6">
            Tokenization infrastructure that goes<br />
            beyond issuance
          </h2>
          <p className="text-xl text-gray-400 mb-16">
            Successful real world assets can't stop at issuance.<br />
            Theo helps issuers and allocators realize their potential.
          </p>

          {/* Cards Grid */}
          <LottieCard
            switchable={true}
            className="mb-8"
          />
        </div>
      </section>

      {/* thBILL Section */}
      <section className="py-24 bg-[#0c0e11]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-4xl mx-auto">
            {/* 左侧内容 */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
                The safest way to<br />
                earn onchain
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed max-w-lg">
                thBILL is a tokenized T-bill vehicle developed in collaboration with leading financial institutions and the safest way to access Treasury yield onchain.
              </p>
              <div className="mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">BEST IN CLASS PARTNERS</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 opacity-60">
                  <div className="text-sm">Standard Chartered</div>
                  <div className="text-sm">Wellington Management</div>
                  <div className="text-sm">Fundbridge</div>
                </div>
              </div>
            </div>

            {/* 右侧卡片 */}
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-[#c8d8d8] to-[#88b8c8] rounded-3xl p-8 w-80 h-80 flex flex-col items-center justify-center relative overflow-hidden">
                {/* 背景装饰 */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-[#1a2332]/20"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-[#1a2332]/10"></div>
                
                <div className="text-center relative z-10">
                  {/* Logo和标题 */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#1a2332] flex items-center justify-center">
                      <span className="text-2xl text-white font-bold">₮</span>
                    </div>
                    <span className="text-3xl font-light text-[#1a2332]">thBILL</span>
                  </div>
                  
                  {/* 描述 */}
                  <p className="text-xs text-[#1a2332]/60 uppercase tracking-wider mb-6">
                    Short Duration US Treasuries
                  </p>
                  
                  {/* 收益率 */}
                  <div className="text-6xl font-light text-[#1a2332] mb-3">4.3%</div>
                  
                  {/* 底部信息 */}
                  <p className="text-xs text-[#1a2332]/60 uppercase leading-tight">
                    Forward Yield (APR Last 7 Days)<br />
                    As of Today, 25 Nov 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="relative py-32 overflow-hidden">
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e11] via-[#1a2550] to-[#0c0e11]">
          {/* 主要Lottie动画背景 - 完全填充容器 */}
          <div 
            className="absolute inset-0"
            style={{
              opacity: 0.5,
              mixBlendMode: 'screen'
            }}
          >
            <div 
              ref={containerRef}
              className="w-full h-full"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                transform: 'scale(1.5)'
              }}
            />
          </div>
          
          {/* 装饰性几何元素 - 增强效果 */}
          <div className="absolute inset-0 opacity-30">
            {/* 圆形装饰 */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border-2 border-[#918fff]/40 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border-2 border-[#918fff]/50 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full border-2 border-[#918fff]/30 animate-pulse" style={{animationDelay: '2s'}}></div>
            
            {/* 线条装饰 - 增加数量和效果 */}
            {matrixLines.map((line) => (
              <div
                key={line.id}
                className="absolute w-1 bg-gradient-to-b from-transparent via-[#918fff]/70 to-transparent"
                style={{
                  left: line.left,
                  height: line.height,
                  animation: `float ${line.duration} ease-in-out infinite`,
                  animationDelay: line.delay,
                  boxShadow: '0 0 20px rgba(145, 143, 255, 0.4)',
                  filter: 'blur(1px)'
                }}
              />
            ))}
            
            {/* 点装饰 - 增强效果 */}
            {matrixDots.map((dot) => (
              <div
                key={dot.id}
                className="absolute w-4 h-4 rounded-full bg-[#918fff]"
                style={{
                  left: dot.left,
                  top: dot.top,
                  animation: `pulse ${dot.duration} ease-in-out infinite`,
                  animationDelay: dot.delay,
                  boxShadow: '0 0 20px rgba(145, 143, 255, 0.6)',
                  filter: 'blur(0.5px)'
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-white/30 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-5xl font-light mb-6">
              Built with <span className="text-[#918fff]">security</span><br />
              <span className="text-[#918fff]">& trust</span> in mind
            </h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
              We work with best-in-class partners to ensure the highest<br />
              standard of security.
            </p>
          </div>
          
          <div className="space-y-12">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">AUDITED BY</p>
              <div className="flex justify-center gap-12 opacity-70">
                <div className="text-xl">Zellic</div>
                <div className="text-xl">code4rena</div>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">CUSTODY PARTNERS</p>
              <div className="flex justify-center gap-12 opacity-70">
                <div className="text-xl">FORDEFI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Card */}
      <section className="py-12 bg-[#0c0e11]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div 
            className="bg-[#01161b] rounded-[10px] p-8 md:p-10 relative overflow-hidden border border-black flex flex-col justify-between"
            style={{ aspectRatio: '2.53083' }}
          >
            {/* 右侧背景图片 */}
            <div className="absolute top-0 right-0 bottom-0 left-0 pointer-events-none">
              <img 
                src="/announce1.avif" 
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* 内容区域 */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              {/* 标题和描述 */}
              <div className="flex flex-col gap-6 max-w-[480px]">
                <h2 className="text-4xl md:text-[44px] font-light leading-[1.2] text-white">
                  Announcing our $20M Raise
                </h2>
                <div className="flex flex-col gap-4">
                  <p className="text-white/90 leading-relaxed text-[15px] md:text-base">
                    We've raised $20m led by Hack VC and Anthos Capital, with participation from Manifold Trading, Mirana Ventures, Metalayer Ventures, MEXC, SCB, Amber Group, and Selini Capital.
                  </p>
                  <button className="self-start px-7 py-2.5 border-[0.8px] border-white rounded-full text-white text-sm hover:bg-white/10 transition-all font-normal backdrop-blur-[20px] bg-transparent">
                    Read more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 bg-[#0c0e11]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Card 1 */}
            <a href="#" className="block bg-[#202020] rounded-[10px] overflow-hidden hover:opacity-90 transition-opacity cursor-pointer flex flex-col gap-6">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="/announce2.avif" 
                  alt="thBILL is LIVE"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="inline-block self-start px-3 py-1 bg-[#002b31] rounded-md">
                    <span className="text-[11px] text-white uppercase tracking-wider font-normal">Announcements</span>
                  </div>
                  <h3 className="text-2xl font-normal text-white leading-tight line-clamp-2">
                    Theo 推出机构级代币化货币市场基金 thBILL
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#5f5f5f] uppercase tracking-wide">
                  <span>JUL 24, 2025</span>
                  <span>·</span>
                  <span>3 MINUTES</span>
                </div>
              </div>
            </a>

            {/* Card 2 */}
            <a href="#" className="block bg-[#202020] rounded-[10px] overflow-hidden hover:opacity-90 transition-opacity cursor-pointer flex flex-col gap-6">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="/announce2.avif" 
                  alt="thBILL is LIVE"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="inline-block self-start px-3 py-1 bg-[#002b31] rounded-md">
                    <span className="text-[11px] text-white uppercase tracking-wider font-normal">Announcements</span>
                  </div>
                  <h3 className="text-2xl font-normal text-white leading-tight line-clamp-2">
                    thBILL is Live: Theo's Institutional-Grade Tokenized Money Market Fund
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#5f5f5f] uppercase tracking-wide">
                  <span>JUL 24, 2025</span>
                  <span>·</span>
                  <span>3 MINUTES</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Stay Up To Date */}
      <section className="py-10 bg-[#0c0e11]">
        <div className="max-w-[1024px] mx-auto px-10">
          <div className="bg-[#007f8e] rounded-[10px] px-8 py-5 flex flex-row items-center justify-between gap-6">
            <h3 className="text-3xl md:text-[32px] font-normal text-white leading-tight">Stay up to date</h3>
            <button className="px-8 py-3 bg-white text-black rounded-full font-normal text-[15px] hover:bg-gray-100 transition-all whitespace-nowrap backdrop-blur-[10px]">
              Follow Us On X
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-[#0c0e11]">
        <div className="max-w-[1024px] mx-auto px-16">
          <div className="flex flex-row justify-between items-start">
            {/* Left: Need more information */}
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl md:text-[44px] font-light leading-[1.2] text-white">
                Need<br />
                more information?
              </h2>
              <button className="self-start px-8 py-3 bg-white text-black rounded-full font-normal text-[15px] hover:bg-gray-100 transition-all backdrop-blur-[10px]">
                Read our documentation
              </button>
            </div>

            {/* Right: Footer Links */}
            <div className="flex flex-row gap-16">
              {/* ABOUT */}
              <div className="flex flex-col gap-4">
                <p className="text-xs text-[#5f5f5f] uppercase tracking-wider font-bold">ABOUT</p>
                <div className="flex flex-col gap-2">
                  <a href="#" className="text-base text-white hover:text-gray-300 transition-colors">Contact Us</a>
                  <a href="#" className="text-base text-white hover:text-gray-300 transition-colors">Brand Kit</a>
                  <p className="text-base text-white opacity-50">Careers (Coming Soon)</p>
                </div>
              </div>

              {/* LEARN */}
              <div className="flex flex-col gap-4">
                <p className="text-xs text-[#5f5f5f] uppercase tracking-wider font-bold">LEARN</p>
                <div className="flex flex-col gap-2">
                  <a href="#" className="text-base text-[#d6d6d6] hover:text-white transition-colors">Vision</a>
                  <a href="#" className="text-base text-[#d6d6d6] hover:text-white transition-colors">Blog</a>
                  <a href="#" className="text-base text-[#d6d6d6] hover:text-white transition-colors">Docs & FAQ</a>
                </div>
              </div>
            </div>
          </div>

          {/* SOCIALS */}
          <div className="mt-16 bg-transparent rounded-[10px] flex flex-col gap-4">
            <p className="text-xs text-[#5f5f5f] uppercase tracking-wider font-normal">SOCIALS</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors opacity-70">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors opacity-70">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors opacity-70">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0c0e11] border-t border-white/10">
        <div className="max-w-[1024px] mx-auto px-16">
          <p className="text-sm text-gray-500 font-mono">
            THEO ©2025, THE GLOBAL FINANCE LAYER.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
