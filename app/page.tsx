'use client';

import Image from "next/image";
import { X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  const [showNotification, setShowNotification] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a2332]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#1a2332" strokeWidth="2"/>
                  <path d="M8 8l8 8M16 8l-8 8" stroke="#1a2332" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-xl font-light text-white">theo</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Learn</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Products</a>
              <button className="px-6 py-2.5 bg-white text-[#1a2332] rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2332]/60 via-[#1a2332]/70 to-[#0c0e11]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-left w-full">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-light mb-6 leading-tight">
              Reimagining<br />
              Global Markets
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              Theo is a full-stack platform connecting onchain capital to<br />
              global financial markets.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-[#2a3f5f] text-white rounded-lg hover:bg-[#3a4f6f] transition-colors">
                Explore Theo
              </button>
              <button className="px-6 py-3 text-white flex items-center gap-2 hover:text-gray-300 transition-colors">
                Get in Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Banner */}
        {!showNotification && (
          <div className="absolute bottom-8 right-8 z-20 bg-[#1a2a3a] backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-sm">
            <button
              onClick={() => setShowNotification(true)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-light mb-2">Announcing our $20M Raise</h3>
            <button className="text-[#449fa5] flex items-center gap-2 mt-4 hover:text-[#55afb5] transition-colors">
              Read More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Backed By Section */}
      <section className="py-16 bg-[#0c0e11]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-8">BACKED BY:</p>
          <div className="flex flex-wrap items-center gap-12 opacity-60">
            <div className="text-2xl font-light tracking-wider">manifold</div>
            <div className="text-xl font-light">MIRANA</div>
            <div className="text-xl font-light">METALAYER<br/>VENTURES</div>
          </div>
        </div>
      </section>

      {/* Tokenization Infrastructure */}
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
          <p className="text-xl text-gray-400 mb-8">
            Successful real world assets can't stop at issuance.<br />
            Theo helps issuers and allocators realize their potential.
          </p>
        </div>
      </section>

      {/* Complete Ecosystems Section */}
      <section className="py-24 bg-[#0c0e11]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-light mb-6">
                Complete ecosystems for<br />
                tokenized assets
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Tap into onchain markets with an institutional-grade tokenization stack that goes beyond issuance. Theo powers financial products with built-in distribution, liquidity, and interoperability.
              </p>
            </div>
            <div className="relative h-96 flex items-center justify-center">
              <div className="absolute w-96 h-96 rounded-full border-2 border-[#449fa5]/30" />
              <div className="absolute w-80 h-80 rounded-full border-2 border-[#449fa5]/40" />
              <div className="absolute w-64 h-64 rounded-full border-2 border-[#449fa5]/50" />
              <div className="absolute w-48 h-48 rounded-full border-2 border-[#449fa5]/60" />
              <div className="absolute w-32 h-32 rounded-full bg-[#449fa5]/20 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#1a2332" strokeWidth="2"/>
                    <path d="M8 8l8 8M16 8l-8 8" stroke="#1a2332" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div className="absolute top-16 right-16 w-4 h-4 rounded-full bg-[#449fa5]" />
              <div className="absolute bottom-20 left-20 w-3 h-3 rounded-full bg-[#449fa5]" />
            </div>
          </div>
        </div>
      </section>

      {/* thBILL Section */}
      <section className="py-24 bg-[#0c0e11]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-light mb-6">
                The safest way to<br />
                earn onchain
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                thBILL is a tokenized T-bill vehicle developed in collaboration with leading financial institutions and the safest way to access Treasury yield onchain.
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">BEST IN CLASS PARTNERS</p>
              <div className="flex gap-8 opacity-60">
                <div className="text-sm">Standard Chartered</div>
                <div className="text-sm">Wellington Management</div>
                <div className="text-sm">Fundbridge</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#c8d8d8] to-[#88b8c8] rounded-2xl p-8 aspect-square flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#1a2332] flex items-center justify-center">
                    <span className="text-2xl text-white">₮</span>
                  </div>
                  <span className="text-3xl font-light text-[#1a2332]">thBILL</span>
                </div>
                <p className="text-xs text-[#1a2332]/60 uppercase tracking-wider mb-4">
                  Short Duration US Treasuries
                </p>
                <div className="text-6xl font-light text-[#1a2332] mb-2">4.3%</div>
                <p className="text-xs text-[#1a2332]/60 uppercase">
                  Forward Yield (APR Last 7 Days)<br />
                  As of Today, 25 Nov 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e11] via-[#1a2550] to-[#0c0e11]">
          {/* Matrix animation background */}
          <div className="absolute inset-0 opacity-30">
            {matrixLines.map((line) => (
              <div
                key={line.id}
                className="absolute w-px bg-gradient-to-b from-transparent via-[#449fa5] to-transparent"
                style={{
                  left: line.left,
                  height: line.height,
                  animation: `float ${line.duration} ease-in-out infinite`,
                  animationDelay: line.delay,
                }}
              />
            ))}
            {matrixDots.map((dot) => (
              <div
                key={dot.id}
                className="absolute w-2 h-2 rounded-full bg-[#449fa5]"
                style={{
                  left: dot.left,
                  top: dot.top,
                  animation: `pulse ${dot.duration} ease-in-out infinite`,
                  animationDelay: dot.delay,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-white/30 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-5xl font-light mb-4">
            Built with <span className="text-[#449fa5]">security</span><br />
            & trust in mind
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            We work with best-in-class partners to ensure the highest<br />
            standard of security.
          </p>
          <div className="space-y-8">
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
      <section className="py-24 bg-[#0c0e11]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#1a3a3a] to-[#0f2a2a] rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1/2 h-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-8 border-[#449fa5]/30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#449fa5]/10 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-8 border-white flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                    <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative z-10 max-w-xl">
              <h2 className="text-5xl font-light mb-6">
                Announcing our $20M<br />
                Raise
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                We've raised $20m led by Hack VC and Anthos Capital, with participation from Manifold Trading, Mirana Ventures, Metalayer Ventures, MEXC, SCB, Amber Group, and Selini Capital.
              </p>
              <button className="px-6 py-3 border border-white rounded-full text-white hover:bg-white hover:text-[#1a3a3a] transition-all">
                Read more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 bg-[#0c0e11]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1a2a3a] rounded-2xl overflow-hidden">
              <div className="aspect-video bg-[#2a3a4a] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-light">thBILL</div>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Announcements</span>
                <h3 className="text-xl font-light mt-2 mb-3">
                  Theo 推出机构级代币化货币市场基金 thBILL
                </h3>
                <p className="text-sm text-gray-500">JUL 24, 2025 · 3 MINUTES</p>
              </div>
            </div>
            <div className="bg-[#1a2a3a] rounded-2xl overflow-hidden">
              <div className="aspect-video bg-[#2a3a4a] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-light">thBILL</div>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Announcements</span>
                <h3 className="text-xl font-light mt-2 mb-3">
                  thBILL is Live: Theo's Institutional-Grade Tokenized Money Market ...
                </h3>
                <p className="text-sm text-gray-500">JUL 24, 2025 · 3 MINUTES</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Up To Date */}
      <section className="py-16 bg-[#0c0e11]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#1a4a4a] to-[#2a5a5a] rounded-2xl p-8 flex items-center justify-between">
            <h3 className="text-3xl font-light">Stay up to date</h3>
            <button className="px-8 py-3 bg-white text-[#1a4a4a] rounded-full font-medium hover:bg-gray-100 transition-colors">
              Follow Us On X
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-[#0c0e11]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-light mb-8">
            Need<br />
            more information?
          </h2>
          <button className="px-8 py-4 bg-white text-[#0c0e11] rounded-full font-medium hover:bg-gray-100 transition-colors">
            Read our documentation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#0c0e11] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-4">SOCIALS</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-4">ABOUT</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Brand Kit</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers (Coming Soon)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-4">LEARN</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Vision</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Docs & FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-gray-500 font-mono">
              THEO ©2025, THE GLOBAL FINANCE LAYER.
            </p>
          </div>
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
      `}</style>
    </div>
  );
}
