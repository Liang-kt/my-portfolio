import MsLinFeatureTabs from './MsLinFeatureTabs';
import React, { useState, useEffect, useRef, useCallback } from 'react';

const isIOSDevice = () => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

const PhoneMockup = ({ children, style = {}, screenStyle = {}, className = "" }) => {
  return (
    <div className={`premium-phone-frame ${className}`} style={{ width: '100%', ...style }}>
      <div className="premium-phone-notch"></div>
      <div className="premium-phone-screen" style={screenStyle}>
        {children}
      </div>
    </div>
  );
};

// --- 內嵌 SVG 圖示組件 (完全封裝) ---
const IconArrowLeft = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>;
const IconArrowUpRight = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>;
const IconArrowUp = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>;
const IconMail = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const IconInstagram = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
const IconLinkedin = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>;
const IconGlobe = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" /></svg>;
const IconMenu = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>;
const IconSearch = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
const IconX = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;
const IconChevronLeft = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6" /></svg>;
const IconChevronRight = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6" /></svg>;
// ========================= 核心架構：共用元件 =========================

// Helper components to match custom layout guidelines
const SectionHeader = ({ num, title }) => (
  <div className="flex flex-col mb-10 select-none">
    <h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-black font-manrope leading-none text-[#111827] tracking-[-0.06em] mb-4">
      {num}
    </h2>
    <h3 className="text-[24px] md:text-[36px] lg:text-[40px] font-bold font-noto tracking-tight text-[#4B5563]">
      {title}
    </h3>
  </div>
);

const SubHeading = ({ children }) => (
  <h4 className="border-l-[3px] border-[#E8734A] pl-3 text-base md:text-lg font-bold text-gray-800 uppercase tracking-wider mb-6 select-none">
    {children}
  </h4>
);

const ImagePlaceholder = ({ label, height = '160px', icon = 'photo', bg = 'bg-gray-50' }) => (
  <div 
    className={`w-full ${bg} border border-dashed border-gray-300 rounded-[10px] flex flex-col items-center justify-center p-4 select-none`}
    style={{ height }}
  >
    {icon === 'photo' && (
      <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    )}
    {icon === 'play' && (
      <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
      </svg>
    )}
    {icon === 'person' && (
      <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )}
    {icon === 'icon' && (
      <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.904-4.43c.277-.138.56-.273.846-.403V9.07c-.288-.13-.572-.265-.849-.403L9 4.23l.813 5.1c.045.282.26.505.534.56l5.14.908-5.14.908c-.273.055-.489.278-.534.56z" />
      </svg>
    )}
    <span className="text-[11px] text-gray-400 font-medium tracking-wide text-center leading-normal max-w-[90%]">
      {label}
    </span>
  </div>
);

// --- 優化版影片播放器 ---
const OptimizedVideo = ({ src, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative bg-gray-100 overflow-hidden flex items-center justify-center ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100/50 backdrop-blur-sm">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-gray-400 font-bold tracking-widest text-[10px] p-4 text-center bg-gray-100/80 backdrop-blur-sm">
          <span className="uppercase opacity-50 tracking-[0.2em]">[ Media Unavailable ]</span>
        </div>
      ) : (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className.includes('h-auto') ? 'w-full h-auto block object-contain' : 'absolute inset-0 w-full h-full object-cover'}`}
        />
      )}
    </div>
  );
};

// --- 自定義 Hook：滾動視圖偵測 ---
const useOnScreen = (options) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, options);
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [options]);
  return [ref, isVisible];
};

// --- 頁面組件：時間軸項目 ---
const TimelineItem = ({ year, title, subtitle, children, isLast }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  return (
    <div ref={ref} className={`flex flex-col md:flex-row transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="w-full md:w-36 flex-shrink-0 text-sm md:text-base text-gray-400 font-bold tracking-wider pt-1.5 mb-2 md:mb-0">{year}</div>
      <div className="hidden md:flex flex-col items-center mx-4 md:mx-8">
        <div className="w-3 h-3 rounded-full bg-black ring-4 ring-white z-10 mt-2"></div>
        {!isLast && <div className="w-px h-full bg-gray-200 -mt-2 origin-top"></div>}
      </div>
      <div className="pb-12 md:pb-20 flex-1 border-l-2 border-gray-100 md:border-none pl-4 md:pl-0 ml-1.5 md:ml-0 relative">
        {!isLast && <div className={`md:hidden absolute left-[-2px] top-3 w-[2px] h-full bg-gray-200 origin-top`}></div>}
        <h3 className="text-xl md:text-3xl font-bold mb-2 text-gray-900 tracking-tight">{title}</h3>
        <h4 className="text-base md:text-xl text-gray-500 mb-4 md:mb-6 font-medium">{subtitle}</h4>
        <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-lg">{children}</div>
      </div>
    </div>
  );
};

const HorizontalMapScroll = ({ url, iaDots = null, lang = 'zh' }) => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [activeIaDot, setActiveIaDot] = useState(null);

  const updateMaxScroll = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setMaxScroll(0);
      return;
    }
    if (imgRef.current) {
      // Use offsetWidth which is extremely stable, fast, and unaffected by CSS transforms
      const contentWidth = imgRef.current.offsetWidth;
      if (contentWidth > 0) {
        const maxScrollVal = Math.max(0, contentWidth - window.innerWidth);
        setMaxScroll(maxScrollVal);
      }
    }
  }, []);

  // Handle image load event directly from the DOM img element
  const handleImageLoad = () => {
    updateMaxScroll();
  };

  useEffect(() => {
    if (!url) return;
    setHasError(false);

    // Initial measurement
    updateMaxScroll();

    // Standard resize listener
    window.addEventListener('resize', updateMaxScroll);

    // Robust interval to capture width once layout stabilizes in all network environments
    let count = 0;
    const interval = setInterval(() => {
      if (imgRef.current && imgRef.current.offsetWidth > 0) {
        updateMaxScroll();
        count++;
        if (count > 10) clearInterval(interval);
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', updateMaxScroll);
      clearInterval(interval);
    };
  }, [url, updateMaxScroll]);

  // Synchronize scroll listener with changes in maxScroll
  useEffect(() => {
    const updateScroll = () => {
      if (window.innerWidth < 768 || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollPassed = -rect.top;

      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }

      const startBuffer = 150;
      if (scrollPassed < startBuffer) {
        setProgress(0);
      } else if (scrollPassed > maxScroll + startBuffer) {
        setProgress(1);
      } else {
        setProgress((scrollPassed - startBuffer) / maxScroll);
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, [maxScroll]);

  const translateX = maxScroll * progress;
  const startBuffer = 150;
  const endBuffer = 150;
  
  // Clean, JavaScript-controlled height definition to avoid clashes with CSS classes
  const isDesktop = window.innerWidth >= 768;
  const sectionHeight = isDesktop
    ? (maxScroll > 0 ? `${window.innerHeight + maxScroll + startBuffer + endBuffer}px` : '100vh')
    : 'auto';

  return (
    <section ref={sectionRef} style={{ height: sectionHeight }} className="relative w-full bg-white z-20">
      <div className="md:sticky md:top-0 md:h-screen w-full flex items-center overflow-hidden">
        {/* Mobile View */}
        <div className="md:hidden w-full flex flex-col items-center py-12 px-6">
          <div className="w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory flex flex-shrink-0">
            {hasError ? (
              <div className="h-[50vh] w-[80vw] bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl mx-auto flex-shrink-0" />
            ) : (
              <div className="relative flex-shrink-0">
                <img
                  src={url}
                  alt=""
                  className="h-[50vh] w-auto max-w-none snap-center block flex-shrink-0 select-none"
                  onError={() => setHasError(true)}
                />
                {/* Dots overlay for mobile */}
                {iaDots && (
                  <div className="absolute inset-0 pointer-events-none">
                    {iaDots.map((dot) => {
                      const isActive = activeIaDot === dot.id;
                      return (
                        <div
                          key={dot.id}
                          style={{
                            position: 'absolute',
                            left: dot.left,
                            top: dot.top,
                            transform: 'translate(-50%, -50%)',
                            zIndex: isActive ? 40 : 30,
                            pointerEvents: 'auto'
                          }}
                        >
                          <button
                            onClick={() => setActiveIaDot(isActive ? null : dot.id)}
                            className={`ia-dot ${isActive ? 'active' : ''}`}
                            style={{
                              width: '11px',
                              height: '11px',
                              borderRadius: '50%',
                              backgroundColor: isActive ? '#E8601C' : '#ffffff',
                              border: '2px solid #E8601C',
                              padding: 0,
                              cursor: 'pointer',
                              outline: 'none',
                              boxSizing: 'border-box',
                              transform: isActive ? 'scale(1.2)' : 'scale(1)',
                              transition: 'background-color 150ms ease, transform 150ms ease',
                            }}
                            title={t(dot.title, lang)}
                          />
                          
                          {/* Bubble */}
                          <div
                            className={`ia-bubble ia-bubble-${dot.bubbleClass}`}
                            style={{
                              opacity: isActive ? 1 : 0,
                              transform: isActive ? 'translateY(0)' : 'translateY(4px)',
                              transition: 'opacity 180ms ease, transform 180ms ease',
                              visibility: isActive ? 'visible' : 'hidden',
                            }}
                          >
                            <strong className="font-bold block mb-[3px] text-white">
                              {t(dot.title, lang)}
                            </strong>
                            <span className="text-white block font-medium">
                              {t(dot.content, lang)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
          {iaDots && !hasError && (
            <div className="text-center mt-3 text-tertiary text-[11px]">
              {lang === 'zh' ? '點擊橘色圓點查看設計說明' : 'Click the orange dots to view design details'}
            </div>
          )}
        </div>
        
        {/* Desktop View */}
        <div
          style={{ transform: isDesktop ? `translateX(${-translateX}px)` : 'none' }}
          className="hidden md:flex h-full items-center will-change-transform flex-shrink-0"
        >
          {hasError ? (
            <div className="h-[70vh] w-[80vw] bg-gray-50 border-2 border-dashed border-gray-200 rounded-[3rem] mx-32 shadow-sm flex-shrink-0" />
          ) : (
            <div className="relative h-[80vh] md:h-[85vh] flex-shrink-0">
              <img
                ref={imgRef}
                src={url}
                alt=""
                className="h-full w-auto max-w-none px-[10vw] block flex-shrink-0 select-none"
                onLoad={handleImageLoad}
                onError={() => setHasError(true)}
              />
              {/* Dots overlay for desktop */}
              {iaDots && (
                <div 
                  className="absolute inset-y-0 pointer-events-none"
                  style={{
                    left: '10vw',
                    right: '10vw',
                  }}
                >
                  {iaDots.map((dot) => {
                    const isActive = activeIaDot === dot.id;
                    return (
                      <div
                        key={dot.id}
                        style={{
                          position: 'absolute',
                          left: dot.left,
                          top: dot.top,
                          transform: 'translate(-50%, -50%)',
                          zIndex: isActive ? 40 : 30,
                          pointerEvents: 'auto'
                        }}
                      >
                        <button
                          onClick={() => setActiveIaDot(isActive ? null : dot.id)}
                          className={`ia-dot ${isActive ? 'active' : ''}`}
                          style={{
                            width: '11px',
                            height: '11px',
                            borderRadius: '50%',
                            backgroundColor: isActive ? '#E8601C' : '#ffffff',
                            border: '2px solid #E8601C',
                            padding: 0,
                            cursor: 'pointer',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transform: isActive ? 'scale(1.2)' : 'scale(1)',
                            transition: 'background-color 150ms ease, transform 150ms ease',
                          }}
                          title={t(dot.title, lang)}
                        />
                        
                        {/* Bubble */}
                        <div
                          className={`ia-bubble ia-bubble-${dot.bubbleClass}`}
                          style={{
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateY(0)' : 'translateY(4px)',
                            transition: 'opacity 180ms ease, transform 180ms ease',
                            visibility: isActive ? 'visible' : 'hidden',
                          }}
                        >
                          <strong className="font-bold block mb-[3px] text-white">
                            {t(dot.title, lang)}
                          </strong>
                          <span className="text-white block font-medium">
                            {t(dot.content, lang)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        {!hasError && isDesktop && (
          <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <div className="h-1 w-48 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 transition-all duration-300"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Scroll to explore Map
              </span>
            </div>
            {iaDots && (
              <span className="text-[11px] text-tertiary">
                {lang === 'zh' ? '點擊橘色圓點查看設計說明' : 'Click the orange dots to view design details'}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// ========================= 核心架構：資料庫 =========================

const I18N = {
  zh: {
    nav: { home: '首頁', works: '作品集', about: '關於我', contact: '聯絡我' },
    home: { selectedWorks: '精選作品', allWorks: '所有作品' },
    cta: { title: "Let's create\nsomething amazing.", desc: "有任何專案合作想法，或是想聊聊設計？隨時歡迎與我聯繫。", btn: "與我聯繫" },
    project: {
      client: '客戶', year: '年份', myRole: '負責角色', service: '提供服務',
      overview: '專案概述', background: '背景與目標', challenge: '設計挑戰',
      research: '使用者研究', strategy: '策略與架構', brand: '品牌識別',
      engTypo: '英文字體', zhTypo: '中文字體',
      colorPalette: '色彩計畫', typography: '字體排印', primaryType: '主要字體', secondaryType: '次要字體',
      webDesign: '網站設計', uiDesign: 'UI 設計',
      designSystem: '設計系統', screens: '介面展示', userFlow: '使用者流程',
      prototype: '互動原型', usability: '易用性測試', mascot: '吉祥物設計',
      scrollMap: '向右滑動探索架構', backTo: '返回'
    }
  },
  en: {
    nav: { home: 'Home', works: 'Works', about: 'About', contact: 'Contact' },
    home: { selectedWorks: 'Selected Works', allWorks: 'All Works' },
    cta: { title: "Let's create\nsomething amazing.", desc: "Have a project in mind or want to talk design? Let's get in touch.", btn: "Get in touch" },
    project: {
      client: 'Client', year: 'Year', myRole: 'My Role', service: 'Service',
      overview: 'Project Overview', background: 'Background & Goals', challenge: 'The Challenge',
      research: 'Research', strategy: 'Strategy & Architecture', brand: 'Brand Identity',
      engTypo: 'English typography', zhTypo: 'Chinese typography',
      colorPalette: 'Color Palette', typography: 'Typography', primaryType: 'Primary Typeface', secondaryType: 'Secondary Typeface',
      webDesign: 'Web Design', uiDesign: 'UI Design',
      designSystem: 'Design System', screens: 'Screens & Mockups', userFlow: 'User Flow',
      prototype: 'Prototype', usability: 'Usability Testing & Iteration', mascot: 'Mascot Design',
      scrollMap: 'Scroll to explore Map', backTo: 'Back to'
    }
  }
};

const t = (item, lang) => {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item[lang] || item['zh'] || item['en'] || '';
};

const CATEGORIES = [
  { id: 'uiux', title: 'UI/UX Design', subtitle: 'App / Web Design', description: { zh: '打造直覺且具備商業價值的數位產品體驗，包含 App、Web 介面設計與使用者研究。', en: 'Creating intuitive and commercially valuable digital product experiences, including App/Web UI design and user research.' } },
  { id: 'motion', title: 'Motion Graphic Design', subtitle: 'Animation / 2D', description: { zh: '透過動態設計賦予品牌與介面生命力，包含解說動畫、UI 微互動與短影音。', en: 'Bringing brands and interfaces to life through motion design, including explainer animations, UI micro-interactions, and short videos.' } },
  { id: 'brand', title: 'Branding Design', subtitle: 'Strategy / Identity', description: { zh: '從零建立具備記憶點的品牌視覺系統，涵蓋標誌設計、色彩計畫與品牌規範。', en: 'Building memorable brand visual systems from scratch, covering logo design, color schemes, and brand guidelines.' } }
];

const PROJECTS = [
  {
    id: 1,
    categoryId: 'uiux',
    platform: 'web',
    title: 'Wisdome.ai 官網設計',
    thumb: 'bg-[#0f172a]',
    coverMedia: { type: 'image', url: 'projects/wisdome.ai_web/cover.webp' },
    heroMedia: { type: 'video', url: 'projects/wisdome.ai_web/cover-video.webm' },
    tags: ['UI/UX', 'Web Design'],
    client: 'WISDOME.AI',
    year: '2023 - 2024',
    projectOverview: {
      clientLogoUrl: 'projects/wisdome.ai_web/wisdomeai_logo.svg',
      backgroundAndGoals: 'Wisdome.ai 是一家致力於使用ai 技術打造全方位線上教育平台的新創公司，以AI、機器學習以及教育為公司核心概念。在這支形象動畫中利用俐落的線條元素搭配快節奏的動態串接，完整Wisdome.ai 創新及科技導向的企業風格。',
      challenge: 'Wisdome.ai is a startup focused on creating a comprehensive online education platform using AI, machine learning, and education as its core. This promotional video uses sleek lines and fast-paced animation to showcase Wisdome.ai’s innovative and tech-driven identity.',
      myRole: 'UI/UX Designer & Motion Designer',
      service: 'VIS Design, Web Design, Corporate Identity Animation'
    },
    strategyAndArchitecture: {
      description: '',
      iaImage: 'projects/wisdome.ai_web/ia-map.png'
    },
    brandIdentity: {
      motionVideoUrl: 'projects/wisdome.ai_web/wisdome.ai_motion-brading.mp4',
      combinedView: true,
      typography: {
        en: { name: 'Figtree', preview: 'WISDOME.AI' },
        tc: { name: 'Noto Sans TC', preview: '聚愢科技股份有限公司' }
      },
      colorDesc: '以明快的藍色及堅實的黑色作為品牌代表色，象徵為穩固的教育體系中增添科技導向的解決方針。',
      logos: [
        {
          type: 'Graphic Logo',
          title: '[ 圖像標誌設計理念 ]',
          description: '此處可以說明圖像 Logo 的設計靈感、隱喻或是幾何構造原理...',
          imageUrl: 'projects/wisdome.ai_web/graph-logo.png'
        },
        {
          type: 'Logotype',
          title: '[ 標準字設計理念 ]',
          description: '此處可以說明文字 Logo 的筆畫細節、字型選擇原因與微調...',
          imageUrl: 'projects/wisdome.ai_web/logotype.png'
        }
      ],
      colors: [
        { hex: '#282828', name: 'Primary Dark' },
        { hex: '#00D2E2', name: 'Accent Cyan' }
      ]
    },
    design: {
      designSystemDesc: '',
      componentsImages: ['projects/wisdome.ai_web/components-1.jpg', 'projects/wisdome.ai_web/components-2.jpg'],
      webShowcaseStrip: [
        { type: 'video', url: 'projects/wisdome.ai_web/hero-page-web.webm', title: 'Hero Page', desc: '首頁主視覺區塊，以動態影片與品牌標語傳遞 AI 教育平台的創新形象與科技感。', mobile: { type: 'video', url: 'projects/wisdome.ai_web/mobile-hero.webm' } },
        { type: 'video', url: 'projects/wisdome.ai_web/service.mov', title: 'Service', desc: '服務介紹區塊，透過清晰的圖文排版逐一呈現平台核心功能與解決方案。', mobile: { type: 'video', url: 'projects/wisdome.ai_web/mobile-service.mov' } },
        { type: 'video', url: 'projects/wisdome.ai_web/why-wisdome.webm', title: 'Why Wisdome', desc: '品牌差異化區塊，說明選擇 Wisdome.ai 的關鍵優勢與競爭力。', mobile: { type: 'video', url: 'projects/wisdome.ai_web/mobile-why-wisdome.webm' } },
        { type: 'image', url: 'projects/wisdome.ai_web/success-stories.png', title: 'Success Stories', desc: '成功案例區塊，以數據與客戶回饋建立信任感，強化轉換說服力。', mobile: { type: 'image', url: 'projects/wisdome.ai_web/mobile-sucsess-stories.jpg' } },
        { type: 'video', url: 'projects/wisdome.ai_web/cta-area.webm', title: 'CTA Area', desc: '行動呼籲區塊，引導訪客進行下一步操作，如免費試用或聯繫諮詢。', mobile: { type: 'video', url: 'projects/wisdome.ai_web/mobile-cta-area.webm' } },
        { type: 'image', url: 'projects/wisdome.ai_web/about-us.png', title: 'About Us', desc: '關於我們區塊，介紹團隊背景與企業願景，拉近與用戶的距離。', mobile: { type: 'image', url: 'projects/wisdome.ai_web/mobile-last-part.jpg' } },
        { type: 'image', url: 'projects/wisdome.ai_web/contact-us.png', title: 'Contact Us', desc: '聯絡資訊區塊，提供多元聯繫管道，降低用戶溝通門檻。' },
        { type: 'image', url: 'projects/wisdome.ai_web/footer.png', title: 'Footer', desc: '頁尾區塊，統整網站導航、社群連結與版權資訊。' }
      ]
    }
  },
  {
    id: 2,
    categoryId: 'uiux',
    platform: 'app',
    title: 'Ms Lin 刷題 App',
    thumb: 'bg-[#F2EFE9]',
    coverMedia: { type: 'image', url: 'projects/mslin-app/img/cover-photo.jpg' },
    heroMedia: { type: 'image', url: 'projects/msline/hero.jpg' },
    tags: ['UI/UX', 'App Design'],
    description: '專為高中生打造的學測刷題 App，提供流暢的測驗體驗與個人化錯題本功能。',
    client: 'Ms. Lin',
    year: '2023',
    gallery: [],
    projectOverview: {
      backgroundAndGoals: '隨著數位學習普及，高中生需要一個更有效率的平台來進行學測準備。目標是打造一個直覺的刷題 App，讓學生隨時隨地練習並追蹤學習進度。',
      challenge: '市場上已有許多測驗 App，如何降低學生的使用門檻，並透過遊戲化設計與流暢的操作介面來提高留存率，是本專案的最大挑戰。',
      myRole: 'Lead UI/UX Designer',
      service: '使用者研究、Wireframe、UI 設計、Prototype 製作'
    },
    research: {
      description: '透過深度訪談 20 位應屆考生，我們發現「碎片化時間利用」與「錯題回顧」是他們最迫切的需求。以此為基礎，我們規劃了快速測驗與自動錯題本功能。',
      images: ['projects/msline/research-1.jpg', 'projects/msline/research-2.jpg']
    },
    strategyAndArchitecture: {
      description: '將 App 核心分為三大模塊：每日任務、題庫測驗、學習報表。簡化註冊流程，讓使用者下載後能最快進入第一場測驗。',
      iaImage: 'projects/msline/ia-map.jpg'
    },
    /* brandIdentity: {
      logoImage: 'projects/msline/logo.png',
      typography: { primary: 'SF Pro Display', secondary: 'Noto Sans TC' },
      colors: [
        { hex: '#4CAF50', name: 'Primary Green' },
        { hex: '#FF9800', name: 'Secondary Orange' },
        { hex: '#212121', name: 'Dark Background' }
      ]
    }, */
    design: {
      designSystemDesc: '建立了一套完整的 Mobile UI Component Library，確保開發與設計的一致性，並考量了 iOS 與 Android 的平台特性。',
      architectureImg: '',
      bentoComponents: [
        { name: 'Buttons', previewImg: '', specsImg: '', colSpan: 1, liveComponent: 'button' },
        { name: 'Inputs & Forms', previewImg: '', specsImg: '', colSpan: 1, liveComponent: 'input' },
        { name: 'Navigation Bar', previewImg: '', specsImg: '', colSpan: 1, liveComponent: 'navigation' },
        { name: 'Dropdowns & Menus', previewImg: '', specsImg: '', colSpan: 1, liveComponent: 'dropdown' },
        { name: 'Progress Bar and Step Indicator', previewImg: '', specsImg: '', colSpan: 2, liveComponent: 'progress' },
        { name: 'Accordion', previewImg: '', specsImg: '', colSpan: 2, liveComponent: 'accordion' },
        { name: 'Subject Cards', previewImg: '', specsImg: '', colSpan: 1, liveComponent: 'subject' }
      ],
      componentsImages: ['projects/msline/components-1.jpg'],
      flowImages: ['projects/msline/user-flow.jpg'],
      screenGroups: [
        { title: 'Onboarding', screens: [
          'projects/mslin-app/screens/key-feature1.jpg',
          'projects/mslin-app/screens/key-feature2.jpg',
          'projects/mslin-app/screens/key-feature3.jpg',
          'projects/mslin-app/screens/cta-page.jpg',
          'projects/mslin-app/screens/sign-in.jpg',
          'projects/mslin-app/screens/sign-up.jpg',
          'projects/mslin-app/screens/onboradinbg-name.jpg',
          'projects/mslin-app/screens/onboradinbg-grade.jpg',
          'projects/mslin-app/screens/onboradinbg-status.jpg',
          'projects/mslin-app/screens/onboradinbg-subject.jpg',
          'projects/mslin-app/screens/onboradinbg-notification.jpg'
        ] },
        { title: '首頁', screens: [
          'projects/mslin-app/screens/home1.png',
          'projects/mslin-app/screens/home2.png'
        ] },
        { title: '題庫', screens: [
          'projects/mslin-app/screens/base1.png',
          'projects/mslin-app/screens/base2.png',
          'projects/mslin-app/screens/base3.png'
        ] },
        { title: '我的', screens: [
          'projects/mslin-app/screens/profile1.png',
          'projects/mslin-app/screens/profile2.png',
          'projects/mslin-app/screens/profile3.png'
        ] },
        {
          title: '各科練習頁面',
          tabs: [
            { title: '數學練習', screens: [
              'projects/mslin-app/screens/math1.jpg',
              'projects/mslin-app/screens/math2.jpg',
              'projects/mslin-app/screens/math3.jpg',
              'projects/mslin-app/screens/math4.jpg',
              'projects/mslin-app/screens/math5.jpg',
              'projects/mslin-app/screens/math6.jpg',
              'projects/mslin-app/screens/math7.jpg',
              'projects/mslin-app/screens/math8.jpg',
              'projects/mslin-app/screens/math9.jpg',
              'projects/mslin-app/screens/math10.png',
              'projects/mslin-app/screens/math11.png',
              'projects/mslin-app/screens/math12.png',
              'projects/mslin-app/screens/math13.png'
            ] },
            { title: '國文練習', screens: [
              'projects/mslin-app/screens/chinese1.png',
              'projects/mslin-app/screens/chinese2.png',
              'projects/mslin-app/screens/chinese3.png',
              'projects/mslin-app/screens/chinese4.png',
              'projects/mslin-app/screens/chinese5.png',
              'projects/mslin-app/screens/chinese6.png',
              'projects/mslin-app/screens/chinese7.png',
              'projects/mslin-app/screens/chinese8.png',
              'projects/mslin-app/screens/chinese9.png',
              'projects/mslin-app/screens/chinese10.png',
              'projects/mslin-app/screens/chinese11.png',
              'projects/mslin-app/screens/chinese12.png',
              'projects/mslin-app/screens/chinese13.png',
              'projects/mslin-app/screens/chinese14.png',
              'projects/mslin-app/screens/chinese15.png',
              'projects/mslin-app/screens/chinese16.png',
              'projects/mslin-app/screens/chinese17.png',
              'projects/mslin-app/screens/chinese18.png',
              'projects/mslin-app/screens/chinese19.png'
            ] },
            { title: '英文練習', screens: [
              'projects/mslin-app/screens/english1.png',
              'projects/mslin-app/screens/english2.png',
              'projects/mslin-app/screens/english3.png',
              'projects/mslin-app/screens/english4.png',
              'projects/mslin-app/screens/english5.png',
              'projects/mslin-app/screens/english6.png'
            ] }
          ]
        }
      ],
      prototypeUrl: 'projects/msline/prototype.mp4',
      usabilityTesting: '在第一版 Prototype 完成後，邀請 5 位高中生進行易用性測試，根據回饋優化了「結束測驗」的防呆提示設計。'
    },
    mascotDesign: {
      description: '設計了象徵智慧與陪伴的貓頭鷹吉祥物「Line 醬」，在使用者答對連續題目時給予動態鼓勵，增加學習趣味。',
      images: ['projects/msline/mascot-1.mp4', 'projects/msline/mascot-2.mp4']
    }
  },
  {
    id: 3,
    categoryId: 'uiux',
    platform: 'web', // 可以設定為 'web' 或 'app'
    title: 'BrainBox 產品視覺設計',
    thumb: 'bg-[#EAE8F2]',
    coverMedia: { type: 'image', url: 'projects/brainbox/brainbox-cover.png' },
    tags: ['UI/UX', 'System Design'],
    description: {
      zh: '智慧教育系統的視覺介面設計，優化教師與學生的操作流程，提升數位學習體驗。',
      en: 'Visual interface design for a smart education system, optimizing operations for teachers and students to enhance the digital learning experience.'
    },
    client: 'BrainBox',
    year: '2024',
    projectOverview: {
      backgroundAndGoals: {
        zh: '請在此輸入 BrainBox 專案背景與目標。',
        en: 'Please enter BrainBox project background and goals here.'
      },
      challenge: {
        zh: '請在此輸入專案挑戰。',
        en: 'Please enter project challenges here.'
      },
      myRole: 'UI/UX Designer',
      service: 'UI/UX Design, System Design'
    },
    brandIdentity: {
      logoImage: '',
      typography: { zh: '', en: '' },
      colors: []
    },
    mascotDesign: {
      description: {
        zh: '請在此輸入吉祥物設計理念。',
        en: 'Please enter mascot design concept here.'
      },
      images: []
    },
    visuals: {
      iconSystem: {
        description: {
          zh: '請在此輸入 Icon 系統設計理念與動態微交互說明。',
          en: 'Please enter icon system design concept and micro-interaction details here.'
        },
        icons: []
      },
      illustrationAnimation: {
        description: {
          zh: '請在此輸入插圖與動畫設計（如 Onboarding、情境圖）說明。',
          en: 'Please enter illustration and animation design details here.'
        },
        videos: []
      },
      application: {
        description: {
          zh: '請在此輸入整合應用設計（介面截圖、Mockup 等）說明。',
          en: 'Please enter application design details here.'
        },
        images: []
      }
    }
  },
  { id: 4, categoryId: 'motion', title: 'BrainBox 智慧刷題系統：賦能學生，解放教師。', thumb: 'bg-black', coverMedia: { type: 'image', url: 'projects/brainbox-marketing/brainbox-marketing-cover.jpg' }, tags: ['Motion', 'Explainer'], description: '透過生動 the 2D 動畫，清楚傳達 BrainBox 產品的核心價值與功能優勢。', client: 'BrainBox', year: '2024', gallery: [] },
  { id: 5, categoryId: 'motion', title: 'Look the Sound of Taipei Metro', thumb: 'bg-[#1a1a1a]', coverMedia: { type: 'image', url: 'projects/taipei/taipei-cover.jpg' }, tags: ['Motion', 'Data Visual'], description: '將臺北捷運的聲音地景進行視覺化，轉化為具備節奏感與幾何美學的動態圖像創作。', client: '國立臺灣藝術大學', year: '2023', gallery: [] },
  { id: 6, categoryId: 'motion', title: 'How to Use BrainBox: A Step-by-Step Tutorial', thumb: 'bg-[#EAE8F2]', coverMedia: { type: 'image', url: 'projects/brainbox-intro/brainbox-intro-cover.png' }, tags: ['Motion', 'Tutorial'], description: 'BrainBox 教學影片，一步步引導使用者了解系統操作。', client: 'BrainBox', year: '2024', gallery: [] },
  { id: 7, categoryId: 'motion', title: 'Wisdome.ai 公司官網首頁形象動畫', thumb: 'bg-[#0f172a]', coverMedia: { type: 'image', url: 'projects/wisdome-motion-brand/wisdome-motion-brand-cover.png' }, tags: ['Motion', 'Web Animation'], description: '結合品牌理念製作的首頁形象動畫，以動態視覺強化品牌科技感。', client: 'WISDOME.AI', year: '2024', gallery: [] },
  { id: 8, categoryId: 'brand', title: '果然癮品牌識別設計', thumb: 'bg-[#EAF2ED]', coverMedia: { type: 'image', url: 'projects/glowing/glowing-brand-cover.png' }, tags: ['Branding', 'Packaging'], description: '完成品牌識別系統設計，並延伸設計 3 組產品外盒及 8 款內包裝，提升視覺吸引力。', client: '果然癮', year: '2021', gallery: [] },
  { id: 9, categoryId: 'brand', title: 'MindGap 企業識別系統', thumb: 'bg-[#F2EFE9]', coverMedia: { type: 'image', url: 'projects/mindgap/mingap-brand-cover.png' }, tags: ['Branding', 'Corporate Identity'], description: '從零建立企業品牌視覺系統，涵蓋標誌設計與色彩規範。', client: 'MindGap', year: '2024', gallery: [] },
  { id: 10, categoryId: 'brand', title: 'BrainBox 產品識別設計', thumb: 'bg-[#EAE8F2]', coverMedia: { type: 'image', url: 'projects/brand-branbox/brainbox-brand-cover.png' }, tags: ['Branding', 'Product Identity'], description: '打造專屬的產品識別系統，提升產品在市場上的辨識度與專業感。', client: 'BrainBox', year: '2024', gallery: [] },
  { id: 11, categoryId: 'brand', title: 'Wisdome.ai 企業識別系統', thumb: 'bg-[#0f172a]', coverMedia: { type: 'image', url: 'projects/brand-wisdomeai/wisdomeai-brand-cover.png' }, tags: ['Branding', 'Corporate Identity'], description: '整合品牌理念與科技感，打造完整的企業視覺規範系統。', client: 'WISDOME.AI', year: '2023', gallery: [] }
];

const DECISION_TABS = [
  {
    id: 'long-page',
    title: { zh: '單頁長版', en: 'Long-form Page' },
    subtitle: {
      zh: '以完整「痛點-解決方案-價值驗證-行動呼籲」架構，建立高說服力的決策導引',
      en: 'A complete "Pain-Solution-Validation-CTA" framework to guide B2B decision-making'
    },
    insights: [
      {
        badge: { zh: '核心邏輯', en: 'Core Logic' },
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-900/50',
        content: {
          zh: 'B2B 決策鏈極長，單頁長版能提供完整的「痛點-解決方案-價值驗證-行動呼籲」完整敘事線，避免訪客在多頁跳轉間流失注意力。',
          en: 'B2B decision chains are extremely long. A long-form single page provides a complete narrative line of "pain points - solutions - value validation - CTA", preventing visitors from losing focus when jumping between multiple pages.'
        }
      },
      {
        badge: { zh: '受眾考量', en: 'Audience' },
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/50',
        content: {
          zh: '補習班校長與教務主管通常時間碎片化。長頁面便於快速向下滾動掃讀（Scanning），且在手機版能提供如社交媒體般直覺流暢的單手滑動體驗。',
          en: 'Cram school principals and academic directors usually have fragmented schedules. A long page makes it easy to quickly scan down and provides an intuitive, smooth one-handed scrolling experience on mobile.'
        }
      },
      {
        badge: { zh: '誠實取捨', en: 'Trade-off' },
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50',
        content: {
          zh: '單頁載入的效能壓力大。我們捨棄了複雜的三維網格與重度裝飾性動畫，優先保證純文字與輕量圖表的極速渲染，並針對中下方媒體進行 Lazy Loading。',
          en: 'Single-page loading places a heavy load on performance. We abandoned complex 3D meshes and heavy decorative animations, prioritizing speed for plain text and lightweight charts, and implemented lazy loading for media lower on the page.'
        }
      }
    ]
  },
  {
    id: 'pain-points',
    title: { zh: '痛點文案', en: 'Pain-point Copy' },
    subtitle: {
      zh: '將複雜 AI 特色轉化為直覺的省時、省力商業語言，貼近決策主管關切焦點',
      en: 'Translate complex AI into clear time & cost savings that resonate with key executives'
    },
    insights: [
      {
        badge: { zh: '核心邏輯', en: 'Core Logic' },
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-900/50',
        content: {
          zh: '以「教務管理混亂」、「開班招生流失」等真實痛點標題切入，而非滿篇堆砌「大語言模型」、「深度學習」等高冷科技詞彙，藉此拉近品牌與客戶距離。',
          en: 'We start with real pain points like "chaotic administrative management" and "enrollment loss," rather than stacking cold technical terms like "LLM" or "deep learning," bringing the brand closer to the customer.'
        }
      },
      {
        badge: { zh: '受眾考量', en: 'Audience' },
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/50',
        content: {
          zh: '中高齡校長更關心「經營提效、招生留客、人力精簡」，而非技術規格。文案必須將複雜的 AI 機制，翻譯成能為他們省下多少時間與管理成本的商業語言。',
          en: 'Middle-aged and older principals care more about "efficiency, enrollment retention, and staffing lean" than technical specs. The copy must translate complex AI mechanisms into business language showing saved time and management costs.'
        }
      },
      {
        badge: { zh: '誠實取捨', en: 'Trade-off' },
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50',
        content: {
          zh: '這在某種程度上犧牲了產品的「極客科技感」，但大幅提升了產品在教育服務業的落地親和力與信賴感，降低了非技術型受眾的理解門檻。',
          en: 'This sacrifices a bit of the "geeky tech vibe" of the product, but significantly increases its approachability and trust in the educational services sector, lowering the barrier to entry for non-technical audiences.'
        }
      }
    ]
  },

  {
    id: 'cta',
    title: { zh: 'CTA 策略', en: 'CTA Strategy' },
    subtitle: {
      zh: '聚焦「預約免費線上演示」，在價值展現點後配置 CTA，提高 B2B 客單轉換率',
      en: 'Focus on booking a free demo and place CTAs dynamically to boost B2B lead generation'
    },
    insights: [
      {
        badge: { zh: '核心邏輯', en: 'Core Logic' },
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-900/50',
        content: {
          zh: 'B2B 高客單價軟體極難在首訪直接成交。CTA 捨棄了「立即付費/註冊」，聚焦於「預約免費線上演示（Demo）」，並在每個價值傳遞完畢的區塊後配置該按鈕。',
          en: 'B2B high-ticket software rarely converts to direct sales on the first visit. The CTA avoids "pay/register now" and focuses on "book a free live demo," placing this button after every section where value is demonstrated.'
        }
      },
      {
        badge: { zh: '受眾考量', en: 'Audience' },
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/50',
        content: {
          zh: '決策主管在評估企業級系統時需要高安全感。強調「專人顧問對接」與「客製化導入分析」，可讓他們感覺受到尊榮對待，比冷冰冰的自助註冊更能提高留單意願。',
          en: 'Executive decision-makers need a high sense of security. Emphasizing "dedicated consultant matchmaking" and "custom deployment analysis" makes them feel valued, driving much higher lead generation than self-serve signups.'
        }
      },
      {
        badge: { zh: '誠實取捨', en: 'Trade-off' },
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50',
        content: {
          zh: '雖然這樣做無法在首訪帶來即時的自助式註冊量，但能有效篩選出真正具有購買意願的優質補習班大客戶，大幅提高後續銷售團隊的開發轉換率。',
          en: 'While this does not yield immediate self-serve registration numbers, it effectively filters in high-intent leads from major cram schools, boosting sales conversion rates.'
        }
      }
    ]
  },
  {
    id: 'social-proof',
    title: { zh: '社會證明', en: 'Social Proof' },
    subtitle: {
      zh: '結合合作教育品牌 Logo 與真實校長推薦背書，打消新創科技系統的信任疑慮',
      en: 'Use peer logos and real principal recommendations to eliminate EdTech platform doubts'
    },
    insights: [
      {
        badge: { zh: '核心邏輯', en: 'Core Logic' },
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-900/50',
        content: {
          zh: '利用「同業效應」建立權威信賴。首頁頂部展示已合作的知名教育品牌 Logo，中下方則展示真實校長姓名與推薦語，用他人的背書降低初次造訪的防備。',
          en: 'Leverage the "peer effect" to establish authoritative trust. The top of the page displays logos of reputable partner education brands, while the lower parts show real principals with quotes to ease new visitor defenses.'
        }
      },
      {
        badge: { zh: '受眾考量', en: 'Audience' },
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/50',
        content: {
          zh: '教育界是一個資訊相對封閉且重視同業聲譽的圈子。「別家大型連鎖補習班也已經採用且成效良好」的社會證明，能最直接打消校長們對新興科技穩定性的疑慮。',
          en: 'The education industry is tightly knit and values reputation. Seeing that "other large chains have already adopted and succeeded with this" is the most direct way to eliminate doubts about the stability of EdTech startup software.'
        }
      },
      {
        badge: { zh: '誠實取捨', en: 'Trade-off' },
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50',
        content: {
          zh: '為遵守部分機密合作協議並保障大客戶穩私，我們僅展示已獲授權的案例與隱去具體敏感營運數據的脫敏報告，雖然犧牲了部分資料細節，但保障了客戶隱私安全。',
          en: 'To comply with confidentiality agreements and protect client operations, we present only authorized stories and aggregated metrics. This sacrifices detail but preserves privacy.'
        }
      }
    ]
  }
];

const SPLIT_VIEW_CHIPS = [
  {
    id: 'hero',
    title: { zh: 'Hero 主視覺區塊', en: 'Hero Section' },
    desc: {
      zh: '首頁主視覺採用動態影片背景，搭配洗鍊的標語，在訪客抵達的黃金 3 秒內建立起 AI 教育科技的品牌第一印象，並配置顯眼的 CTA 引導。',
      en: 'The hero section uses a dynamic video background with sleek taglines, establishing an EdTech brand image within 3 seconds of arrival.'
    },
    videoUrl: 'projects/wisdome.ai_web/hero-page-web.webm',
    top: 0,
    height: 22
  },
  {
    id: 'services',
    title: { zh: '服務介紹區塊', en: 'Services Overview' },
    desc: {
      zh: '將系統的「自動排課」、「AI 閱卷」等核心功能以模組化卡片呈現，並利用動態流程圖展示，讓非技術背景的主管也能秒懂產品實用價值。',
      en: 'Presents core features like "auto-scheduling" and "AI grading" in modular cards, allowing non-tech administrators to grasp values instantly.'
    },
    videoUrl: 'projects/wisdome.ai_web/service.mov',
    top: 22,
    height: 30
  },
  {
    id: 'values',
    title: { zh: '核心價值區塊', en: 'Why Wisdome' },
    desc: {
      zh: '列出導入 Wisdome.ai 的關鍵優勢，如：系統高穩定度、無痛無縫轉型、完善的售後支援，全面打消教育機構決策者的安全感疑慮。',
      en: 'Lists key advantages like high stability, painless deployment, and direct support to ease security concerns for school leaders.'
    },
    videoUrl: 'projects/wisdome.ai_web/why-wisdome.webm',
    top: 52,
    height: 20
  },
  {
    id: 'success',
    title: { zh: '成功案例區塊', en: 'Success Stories' },
    desc: {
      zh: '展示合作補習班的量化成效（例如行政效率提升 40%）與真實校長的好評推薦，以客觀數據與同業證言強化轉換說服力。',
      en: 'Displays metrics (e.g. 40% administrative efficiency boost) and testimonials to leverage peer influence and drive conversions.'
    },
    videoUrl: 'projects/wisdome.ai_web/cta-area.webm',
    top: 72,
    height: 18
  },
  {
    id: 'cta',
    title: { zh: 'CTA 行動呼籲區塊', en: 'CTA Section' },
    desc: {
      zh: '引導訪客進行下一步操作，配置高對比按鈕以促成免費試用、預約或諮詢核心服務，最大化網頁的轉換效益。',
      en: 'Guides visitors to book a demo or trial using high-contrast action buttons to maximize landing page conversion rates.'
    },
    videoUrl: 'projects/wisdome.ai_web/cta-area.webm'
  },
  {
    id: 'about',
    title: { zh: '關於我們區塊', en: 'About Us' },
    desc: {
      zh: '詳細介紹團隊背景、技術使命與未來願景，向教育機構與決策主管傳遞產品研發的深度承諾與品牌信任。',
      en: 'Presents team backgrounds and missions, building brand trust and demonstrating product commitments to schools.'
    },
    videoUrl: ''
  },
  {
    id: 'contact',
    title: { zh: '聯絡資訊區塊', en: 'Contact Us' },
    desc: {
      zh: '提供表單、電話等多管道聯繫入口，方便學校決策主管第一時間獲取專屬的系統導入與解決方案諮詢。',
      en: 'Provides multiple communication options, making it easy for school heads to reach sales and get deployment plans.'
    },
    videoUrl: ''
  },
  {
    id: 'footer',
    title: { zh: 'FOOTER 頁尾區塊', en: 'Footer & Navigation' },
    desc: {
      zh: '統整網站的各分頁導航、服務條款與社群連結，幫助訪客快速跳轉，同時為整趟使用者旅程畫下完美句點。',
      en: 'Organizes navigation links, terms of service, and social media handles to wrap up the user journey.'
    },
    videoUrl: ''
  }
];


// ========================= 核心架構：主應用程式 =========================


  const Navbar = ({ scrolled, currentPage, navigateTo, lang, setLang, isMobileMenuOpen, setIsMobileMenuOpen }) => (
    <>
      <div className={`fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-between md:justify-center px-4 md:px-6 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${scrolled || currentPage !== 'home' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <nav className="pointer-events-auto flex items-center justify-between w-full md:w-auto md:gap-8 px-4 py-2.5 md:px-6 md:py-3 rounded-full bg-[#fbfbfb]/90 md:bg-white/90 backdrop-blur-xl border border-gray-100 shadow-sm transition-colors duration-300">
          <div className="text-lg md:text-xl font-bold cursor-pointer tracking-wide text-zinc-900 dark:text-zinc-50" onClick={() => navigateTo('home')}>T<span className="text-orange-500">.</span></div>
          <div className="hidden md:flex gap-2 md:gap-6 text-sm font-medium">
            <button onClick={() => navigateTo('home')} className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${currentPage === 'home' ? 'bg-black text-white dark:bg-zinc-100 dark:text-zinc-900' : 'text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800'}`}>{I18N[lang].nav.home}</button>
            {/* 隱藏作品集 Tab
            <button onClick={() => navigateTo('works')} className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${['works', 'category', 'project'].includes(currentPage) ? 'bg-black text-white dark:bg-zinc-100 dark:text-zinc-900' : 'text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800'}`}>{I18N[lang].nav.works}</button>
            */}
            <button onClick={() => navigateTo('about')} className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${currentPage === 'about' ? 'bg-black text-white dark:bg-zinc-100 dark:text-zinc-900' : 'text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800'}`}>{I18N[lang].nav.about}</button>
            <button onClick={() => navigateTo('contact')} className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${currentPage === 'contact' ? 'bg-black text-white dark:bg-zinc-100 dark:text-zinc-900' : 'text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800'}`}>{I18N[lang].nav.contact}</button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className="pointer-events-auto px-3 py-1 rounded-full text-xs font-bold border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all cursor-pointer">
              {lang === 'zh' ? 'EN' : '繁中'}
            </button>
            <button className="md:hidden text-gray-800 dark:text-zinc-200 p-1 cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}><IconMenu className="w-6 h-6" /></button>
          </div>
        </nav>
      </div>
      <div className={`fixed inset-0 bg-[#fbfbfb] z-[60] transform transition-transform duration-500 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
        <div className="flex justify-between items-center p-6"><div className="text-2xl font-bold tracking-wide text-zinc-900 dark:text-zinc-50" onClick={() => navigateTo('home')}>T<span className="text-orange-500">.</span></div><button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full text-gray-800 dark:text-zinc-200 cursor-pointer"><IconX className="w-6 h-6" /></button></div>
        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-3xl font-black uppercase tracking-widest">
          <button onClick={() => navigateTo('home')} className={`${currentPage === 'home' ? 'text-orange-500' : 'text-gray-900'}`}>{I18N[lang].nav.home}</button>
          {/* 隱藏作品集 Tab
          <button onClick={() => navigateTo('works')} className={`${['works', 'category', 'project'].includes(currentPage) ? 'text-orange-500' : 'text-gray-900'}`}>{I18N[lang].nav.works}</button>
          */}
          <button onClick={() => navigateTo('about')} className={`${currentPage === 'about' ? 'text-orange-500' : 'text-gray-900'}`}>{I18N[lang].nav.about}</button>
          <button onClick={() => navigateTo('contact')} className={`${currentPage === 'contact' ? 'text-orange-500' : 'text-gray-900'}`}>{I18N[lang].nav.contact}</button>
        </div>
        <div className="p-8 pb-12 text-center text-sm text-gray-400 dark:text-zinc-500 font-bold tracking-widest">tingchenliang1998@gmail.com</div>
      </div>
    </>
  );

  const FooterCTA = ({ activeItem = null, navigateTo, lang }) => {
    // Next two projects lookup logic
    const getNextTwoProjects = (currentItem) => {
      if (!currentItem) return [];
      
      let order = [];
      if (currentItem.categoryId === 'uiux') {
        order = [1, 2, 3];
      } else if (currentItem.categoryId === 'motion') {
        order = [4, 5, 6, 7];
      } else if (currentItem.categoryId === 'brand') {
        order = [8, 9, 10, 11];
      } else {
        return [];
      }
      
      const index = order.indexOf(currentItem.id);
      if (index !== -1) {
        const nextId1 = order[(index + 1) % order.length];
        const nextId2 = order[(index + 2) % order.length];
        return [
          PROJECTS.find(p => p.id === nextId1),
          PROJECTS.find(p => p.id === nextId2)
        ].filter(Boolean);
      }
      return [];
    };

    const nextProjects = getNextTwoProjects(activeItem);

    if (nextProjects.length > 0) {
      return (
        <div className="w-full mt-24 mb-16 px-6 max-w-[100rem] mx-auto">
          {/* Title */}
          <div className="mb-10 text-left px-2 md:px-8">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
              {lang === 'zh' ? '閱讀更多專案' : 'Read More Projects'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 px-2 md:px-8">
            {nextProjects.map((p) => {
              const isLocked = p.categoryId === 'brand' || p.categoryId === 'motion';
              return (
                <div 
                  key={p.id}
                  onClick={() => !isLocked && navigateTo('project', p)} 
                  className={`group ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className={`aspect-[4/3] rounded-[1.5rem] md:rounded-[2.5rem] ${p.thumb} overflow-hidden relative transition-all duration-500 shadow-sm hover:shadow-xl`}>
                    <div className={`w-full h-full transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out ${isLocked ? 'opacity-40 filter grayscale-[20%]' : ''}`}>
                      {p.coverMedia?.type === 'video' ? (
                        <OptimizedVideo src={p.coverMedia.url} className="w-full h-full" />
                      ) : p.coverMedia?.url ? (
                        <img src={p.coverMedia.url} className="w-full h-full object-cover" alt={p.title} />
                      ) : null}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
                    
                    {isLocked ? (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
                        <span className="bg-white/95 backdrop-blur-sm text-black px-6 py-2.5 rounded-full font-black text-sm md:text-base tracking-widest uppercase shadow-md select-none">
                          Coming Soon
                        </span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="hidden md:flex bg-white text-black px-6 py-3 rounded-full font-bold items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform tracking-wider uppercase shadow-md select-none">
                          {lang === 'zh' ? '閱讀專案' : 'View Project'} <IconArrowUpRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col items-start z-10 pointer-events-none pr-6">
                      <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-4 drop-shadow-md leading-tight">
                        {t(p.title, lang)}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map(tag => (
                          <span key={tag} className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wide uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Global Footer (Copyright & Socials) */}
          <div className="mt-16 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm px-2 md:px-8">
            <p className="font-bold uppercase tracking-wide">© {new Date().getFullYear()} Tiffany Liang.</p>
            <div className="flex gap-6 mt-4 md:mt-0 font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-black transition-colors">Instagram</a>
              <a href="#" className="hover:text-black transition-colors">Behance</a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full mt-24 mb-16 px-6 max-w-[100rem] mx-auto text-center">
        <div className="bg-[#F8F9FA] rounded-[3rem] p-12 md:p-32 flex flex-col items-center">
          <h2 className="text-5xl md:text-[6rem] font-bold tracking-tighter mb-8 text-gray-900 leading-tight whitespace-pre-line">{I18N[lang].cta.title}</h2>
          <p className="text-xl text-gray-500 mb-12 max-w-md font-medium tracking-wide">{I18N[lang].cta.desc}</p>
          <button onClick={() => navigateTo('contact')} className="bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-600 hover:scale-105 transition-all duration-300 flex items-center gap-2">{I18N[lang].cta.btn} <IconArrowUpRight className="w-5 h-5" /></button>
        </div>
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm px-6">
          <p className="font-bold uppercase tracking-wide">© {new Date().getFullYear()} Tiffany Liang.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-bold uppercase tracking-widest"><a href="#" className="hover:text-black transition-colors">LinkedIn</a><a href="#" className="hover:text-black transition-colors">Instagram</a><a href="#" className="hover:text-black transition-colors">Behance</a></div>
        </div>
      </div>
    );
  };

  const HomeView = ({ lang, homeSelectedFilter, setHomeSelectedFilter, navigateTo }) => {
    const trackRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const scrollableHeight = vh * 3; // 400vh height means 300vh scrollable
        const rawProgress = scrollY / scrollableHeight;
        setProgress(Math.min(Math.max(rawProgress, 0), 1));
      };
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        handleScroll();
      };
      
      setIsMobile(window.innerWidth < 768);
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
      handleScroll();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    // Phase 1: Video expansion, completing by 45% of the overall scroll track
    const expandProgress = Math.min(progress / 0.45, 1.0);
    const easeExpand = expandProgress < 0.5 
      ? 2 * expandProgress * expandProgress 
      : 1 - Math.pow(-2 * expandProgress + 2, 2) / 2;
      
    const textTranslateX = easeExpand * -120;
    const textOpacity = 1 - easeExpand;

    // Phase 2: Cinematic overlay fade-in, transitioning from 45% to 85% of the scroll track
    const overlayProgress = progress >= 0.45 ? Math.min((progress - 0.45) / 0.4, 1.0) : 0;
    const easeOverlay = overlayProgress < 0.5 
      ? 2 * overlayProgress * overlayProgress 
      : 1 - Math.pow(-2 * overlayProgress + 2, 2) / 2;

    const filteredProjects = PROJECTS.filter(p => {
      if (homeSelectedFilter === 'UI/UX Design') return p.categoryId === 'uiux';
      if (homeSelectedFilter === '2D Motion Graphic Design') return p.categoryId === 'motion';
      if (homeSelectedFilter === 'Branding Design') return p.categoryId === 'brand';
      return true;
    });

    return (
      <div className="bg-[#F6F6F6]">
        {/* Set explicit inline style heights to guarantee viewport scaling is 100% robust across all browsers */}
        <div ref={trackRef} style={{ height: '400vh' }} className="w-full relative">
          <section style={{ height: '100vh' }} className="sticky top-0 w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-12 overflow-hidden bg-[#F6F6F6] z-0">
            {/* Phase 1: Original Left Text Container */}
            <div className="w-full md:w-[75%] pt-40 md:pt-0 z-30 pointer-events-none will-change-transform animate-in fade-in duration-700" style={{ transform: `translateX(${textTranslateX}vw)`, opacity: textOpacity }}>
              <h1 className="text-[12vw] md:text-[6.5rem] lg:text-[8.5rem] xl:text-[9.5rem] leading-[0.9] font-black tracking-tighter text-[#252525] mb-8">
                TIFFANY<br />LIANG
              </h1>
              <p className="text-lg md:text-xl text-gray-500 max-w-md leading-relaxed font-medium mt-8 whitespace-normal">
                {lang === 'en' ? 'Beautiful design has the power to captivate audiences. Translating brand philosophies and abstract concepts into visual narratives.' : 'Beautiful design has the power to captivate audiences. 轉化品牌理念與抽象概念為視覺敘事。'}
              </p>
            </div>
            
            {/* Expanding Video Container */}
            <div 
              className="absolute bottom-0 right-0 z-20 flex items-center justify-center bg-[#EAEAEC] shadow-2xl overflow-hidden will-change-[width,height,border-radius] animate-in fade-in duration-1000" 
              style={{ 
                width: isMobile ? '100%' : `${50 + (50 * easeExpand)}%`, 
                height: isMobile ? `${40 + (60 * easeExpand)}vh` : '100%', 
                borderTopLeftRadius: `${isMobile ? 3 * (1 - easeExpand) : 6 * (1 - easeExpand)}rem`, 
                borderTopRightRadius: isMobile ? `${3 * (1 - easeExpand)}rem` : '0', 
              }}
            >
              <video src="hero-page_showreel.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover absolute inset-0" />
              
              {/* Dynamic Dark Tint Overlay for Legibility */}
              <div 
                className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-300 z-21" 
                style={{ opacity: easeOverlay * 0.5 }} 
              />
              
              {/* Cinematic Center Text Overlay (Phase 2) */}
              <div 
                style={{ 
                  opacity: easeOverlay, 
                  transform: `translateY(${(1 - easeOverlay) * 20}px)` 
                }} 
                className="absolute inset-0 z-25 flex flex-col items-center justify-center pointer-events-none text-white px-6 text-center select-none"
              >
                <span className="text-orange-500 font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-4">TIFFANY LIANG</span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-widest uppercase leading-none mb-6">PORTFOLIO / 2026</h2>
                <div className="flex items-center gap-2 mt-4 animate-bounce">
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/70">SCROLL DOWN TO EXPLORE WORKS</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div id="featured-works" className="relative z-30 bg-white rounded-t-[3rem] md:rounded-t-[4rem] w-full mt-[-2rem] md:mt-[-4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.08)]">
          <div className="py-24 md:py-32 px-4 md:px-12 max-w-[100rem] mx-auto bg-white rounded-t-[3rem] md:rounded-t-[4rem]">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">{I18N[lang].home.selectedWorks}</h2>
                <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed font-noto">
                  {lang === 'en' ? 'From commercial websites and educational apps to comprehensive branding and motion visuals, explore how I transform abstract concepts into tangible experiences through design.' : '從商業官網、教育類 App 到完整的品牌與動態視覺，探索我如何透過設計將抽象概念轉化為具體體驗。'}
                </p>
              </div>
              <div className="w-full md:w-auto bg-[#F5F5F5] p-1.5 rounded-[1.5rem] md:rounded-full flex gap-1 shadow-inner">
                {['UI/UX Design', '2D Motion Graphic Design', 'Branding Design'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setHomeSelectedFilter(filter)}
                    className={`flex-auto px-3 md:px-6 py-2 md:py-2.5 rounded-[1rem] md:rounded-full text-xs md:text-base font-medium transition-all duration-300 leading-snug md:whitespace-nowrap flex items-center justify-center text-center break-words ${homeSelectedFilter === filter ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {filteredProjects.map(p => {
                const isLocked = p.categoryId === 'brand' || p.categoryId === 'motion';
                return (
                  <div 
                    key={p.id} 
                    onClick={() => !isLocked && navigateTo('project', p)} 
                    className={`group ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className={`aspect-square md:aspect-[4/3] rounded-[1.5rem] md:rounded-[2.5rem] ${p.thumb} overflow-hidden relative transition-all duration-500 shadow-sm hover:shadow-xl`}>
                      <div className={`w-full h-full transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out ${isLocked ? 'opacity-40 filter grayscale-[20%]' : ''}`}>
                        {p.coverMedia?.type === 'video' ? <OptimizedVideo src={p.coverMedia.url} className="w-full h-full" /> : p.coverMedia?.url ? <img src={p.coverMedia.url} className="w-full h-full object-cover" alt={p.title} /> : null}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-2/3 md:h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>
                      
                      {isLocked ? (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
                          <span className="bg-white/95 backdrop-blur-sm text-black px-6 py-2.5 rounded-full font-black text-sm md:text-base tracking-widest uppercase shadow-md select-none">
                            Coming Soon
                          </span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <div className="hidden md:flex bg-white text-black px-6 py-3 rounded-full font-bold items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform tracking-wider uppercase">View Project <IconArrowUpRight className="w-4 h-4 ml-1" /></div>
                        </div>
                      )}
                      
                      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col items-start transform group-hover:translate-y-0 md:group-hover:translate-y-[-4px] transition-transform duration-500 z-10 pointer-events-none pr-6">
                        <h3 className="text-white text-2xl md:text-4xl font-bold tracking-tight mb-4 drop-shadow-md leading-tight">{t(p.title, lang)}</h3>
                        <div className="flex flex-wrap gap-2">{p.tags.map(tag => (<span key={tag} className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-sm font-bold tracking-wide uppercase">{tag}</span>))}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <FooterCTA navigateTo={navigateTo} lang={lang} />
        </div>
      </div>
    );
  };

  const WorkCategoryCard = ({ cat, idx, isLast, navigateTo, coverUrl, isVideo, lang }) => (
    <div className={`w-full sticky ${isLast ? 'mb-0' : 'mb-[15vh] md:mb-[40vh]'}`} style={{ top: `calc(10vh + ${idx * 1.5}rem)` }}>
      <div onClick={() => navigateTo('category', cat.id)} className="w-full h-[55vh] md:h-[65vh] group cursor-pointer overflow-hidden rounded-[1.5rem] md:rounded-[4rem] relative">
        <div className="absolute inset-0 bg-black transition-colors duration-700"><div className="w-full h-full transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-60 group-hover:opacity-40">{isVideo ? <OptimizedVideo src={coverUrl} className="w-full h-full" /> : coverUrl ? <img src={coverUrl} alt={cat.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-900" />}</div></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4"><h2 className="text-white text-4xl sm:text-5xl md:text-[6rem] lg:text-[7rem] font-black tracking-wider uppercase text-center leading-[1.1] md:leading-none group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-[1.5s] ease-out drop-shadow-2xl">{t(cat.title, lang)}</h2><div className="hidden md:flex items-center gap-2 text-white font-bold tracking-widest uppercase mt-6 md:mt-10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 drop-shadow-lg">Explore Projects <IconArrowUpRight className="w-6 h-6 ml-2" /></div></div>
      </div>
    </div>
  );

  const WorksView = ({ navigateTo, lang }) => (
    <div className="bg-[#F6F6F6] animate-in fade-in duration-700 min-h-screen">
      <div className="bg-white pt-32 md:pt-40 pb-16 md:pb-32 px-4 md:px-12 rounded-b-[2rem] md:rounded-b-[4rem] relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        <div className="max-w-[100rem] mx-auto"><h3 className="text-orange-500 font-bold tracking-widest uppercase mb-2 md:mb-4 text-sm md:text-base">Portfolio</h3><h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-wide text-gray-900 leading-none uppercase">Works</h1><p className="mt-6 md:mt-8 text-base md:text-xl lg:text-2xl text-gray-500 max-w-3xl leading-relaxed tracking-wide font-medium">Explore my selected projects across UI/UX Design, Motion Graphics, and Branding. 透過不同領域的視覺敘事，探索我的精選作品。</p></div>
      </div>
      <div className="max-w-[100rem] mx-auto px-4 md:px-12 pt-16 md:pt-20 pb-20 md:pb-32 relative z-0">{CATEGORIES.map((cat, idx) => { const coverProject = PROJECTS.find(p => p.categoryId === cat.id && p.coverMedia && p.coverMedia.url); return <WorkCategoryCard key={cat.id} cat={cat} idx={idx} isLast={idx === CATEGORIES.length - 1} navigateTo={navigateTo} coverUrl={coverProject?.coverMedia.url} isVideo={coverProject?.coverMedia.type === 'video'} lang={lang} />; })}</div>
    </div>
  );

  const CategoryListView = ({ activeItem, navigateTo, lang }) => {
    const categoryInfo = CATEGORIES.find(c => c.id === activeItem);
    const filteredProjects = PROJECTS.filter(p => p.categoryId === activeItem);
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
      <div className="min-h-screen bg-[#F6F6F6] pb-20 md:pb-32 animate-in fade-in duration-700">
        <div className="bg-white pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-12 mb-10 md:mb-16 rounded-b-[2rem] md:rounded-b-[4rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)]"><div className="max-w-[100rem] mx-auto"><button onClick={() => navigateTo('works')} className="flex items-center text-sm md:text-base text-gray-400 hover:text-black transition-colors mb-8 md:mb-12 tracking-wide font-medium"><IconArrowLeft className="w-5 h-5 mr-2" /> <span className="font-medium uppercase">Back to works</span></button><h3 className="text-orange-500 font-bold tracking-widest uppercase mb-2 md:mb-4 text-xs md:text-sm">{categoryInfo?.subtitle} WORKS</h3><h1 className="text-4xl md:text-6xl lg:text-[8rem] font-black tracking-tight leading-none text-gray-900 uppercase">{categoryInfo?.title}</h1><p className="mt-6 md:mt-8 text-base md:text-xl text-gray-500 max-w-3xl leading-relaxed tracking-wide font-medium">{categoryInfo?.description}</p></div></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-[100rem] mx-auto px-4 md:px-8 lg:px-12">
          {filteredProjects.map(p => {
            const isLocked = p.categoryId === 'brand' || p.categoryId === 'motion';
            return (
              <div 
                key={p.id} 
                onClick={() => !isLocked && navigateTo('project', p)} 
                className={`group ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className={`aspect-square rounded-[1.5rem] md:rounded-[2.5rem] ${p.thumb} overflow-hidden relative transition-all duration-500 shadow-sm hover:shadow-xl`}>
                  <div className={`w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out ${isLocked ? 'opacity-40 filter grayscale-[20%]' : ''}`}>
                    {p.coverMedia.type === 'video' ? <OptimizedVideo src={p.coverMedia.url} className="w-full h-full" /> : p.coverMedia.url ? <img src={p.coverMedia.url} className="w-full h-full object-cover" alt={p.title} /> : null}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-2/3 md:h-1/2 bg-gradient-to-t from-black/70 md:from-black/60 to-transparent pointer-events-none"></div>
                  
                  {isLocked ? (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
                      <span className="bg-white/95 backdrop-blur-sm text-black px-6 py-2.5 rounded-full font-black text-sm md:text-base tracking-widest uppercase shadow-md select-none">
                        Coming Soon
                      </span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="hidden md:flex bg-white text-black px-6 py-3 rounded-full font-bold items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform tracking-wider uppercase">View Project <IconArrowUpRight className="w-4 h-4 ml-1" /></div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col items-start transform group-hover:translate-y-0 md:group-hover:translate-y-[-4px] transition-transform duration-500 z-10 pointer-events-none pr-6">
                    <h3 className="text-white text-xl md:text-3xl font-bold tracking-tight mb-3 drop-shadow-md leading-tight">{p.title}</h3>
                    <div className="flex flex-wrap gap-2">{p.tags.map(tag => (<span key={tag} className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-wide uppercase">{tag}</span>))}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const ScrollableScreenRow = ({ screens, groupTitle }) => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      }
    };

    useEffect(() => {
      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => window.removeEventListener('resize', checkScroll);
    }, [screens]);

    const scroll = (direction) => {
      if (scrollRef.current) {
        const scrollAmount = window.innerWidth > 768 ? window.innerWidth * 0.4 : window.innerWidth * 0.7;
        scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
    };

    const showArrows = screens && screens.length > 4;

    return (
      <div className="relative group/row">
        {showArrows && (
          <>
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 bg-white/90 shadow-lg rounded-full p-2 md:p-3 text-gray-800 hover:bg-gray-900 hover:text-white transition-all opacity-0 group-hover/row:opacity-100 hidden sm:block border border-gray-100"
              >
                <IconChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 bg-white/90 shadow-lg rounded-full p-2 md:p-3 text-gray-800 hover:bg-gray-900 hover:text-white transition-all opacity-0 group-hover/row:opacity-100 hidden sm:block border border-gray-100"
              >
                <IconChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}
          </>
        )}
        <div ref={scrollRef} onScroll={checkScroll} className="overflow-x-auto hide-scrollbar snap-x snap-mandatory flex gap-4 md:gap-6 pb-8 pt-4 full-viewport-carousel scroll-smooth">
          {/* Left Spacer to align Card 0 with standard page content margins */}
          <div className="carousel-spacer snap-start" />
          
          {screens && screens.map((screen, i) => (
            <div 
              key={`${groupTitle}-${i}`} 
              className={`flex-none w-[70%] sm:w-[45%] md:w-[23%] bg-white rounded-[2rem] overflow-hidden shadow-sm ${i === 0 ? '' : 'snap-start'}`}
            >
              <img src={screen} className="w-full h-auto block" alt={`${groupTitle} Screen ${i + 1}`} onError={(e) => e.target.style.display = 'none'} />
            </div>
          ))}

          {/* Right Spacer to provide identical end padding matching page margins */}
          <div className="carousel-spacer snap-end" />
        </div>
      </div>
    );
  };

    const BackButton = ({ transitionTo, setCurrentPage, setActiveItem, setIsMobileMenuOpen, lang }) => {
      const handleBack = () => {
        transitionTo(() => {
          setCurrentPage('home');
          setActiveItem(null);
          setIsMobileMenuOpen(false);
          // 使用 setTimeout 確保 HomeView 掛載後再跳轉，且使用 behavior: 'auto' 避免出現白畫面
          setTimeout(() => {
            const section = document.getElementById('featured-works');
            if (section) {
              window.scrollTo({ top: section.offsetTop, behavior: 'auto' });
            } else {
              window.scrollTo({ top: 0, behavior: 'auto' });
            }
          }, 10);
        });
      };

      return (
        <button
          onClick={handleBack}
          className="flex items-center text-xs md:text-sm font-medium text-gray-400 hover:text-black mb-6 transition-colors select-none"
        >
          ← {lang === 'zh' ? '返回' : 'BACK TO'} HOME
        </button>
      );
    };

    const ProjectSectionHeader = ({ num, title }) => {
      return (
        <div className="flex flex-col mb-10 select-none">
          <h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-black font-inter leading-none text-[#111827] tracking-tighter mb-4">
            {num}
          </h2>
          <h3 className="text-[24px] md:text-[36px] lg:text-[40px] font-bold font-inter tracking-tight text-[#4B5563]">
            {title}
          </h3>
        </div>
      );
    };

    const BackToTopButton = () => {
      const [isVisible, setIsVisible] = useState(false);
      const [isReady, setIsReady] = useState(false);

      useEffect(() => {
        // 延遲 800ms 等待頁面跳轉的 smooth scroll 完成，避免一開始閃爍
        const timer = setTimeout(() => setIsReady(true), 800);
        return () => clearTimeout(timer);
      }, []);

      useEffect(() => {
        if (!isReady) return;

        const toggleVisibility = () => {
          if (window.scrollY > 500) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };

        toggleVisibility();
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
      }, [isReady]);

      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

      if (!isVisible) return null;

      return (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 md:p-4 bg-white/90 hover:bg-black text-gray-800 hover:text-white rounded-full shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 flex items-center justify-center group border border-gray-200 animate-in fade-in zoom-in-95"
          title="Back to top"
        >
          <IconArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      );
    };

    const GSATButtonShowcase = ({ lang }) => {
      const [btnSize, setBtnSize] = useState('M'); // L | M | S | Ex S
      const [btnStyle, setBtnStyle] = useState('Primary'); // Primary | Outline | Ghost
      const [btnStatus, setBtnStatus] = useState('Default'); // Default | Active | Disable

      const sizeMap = {
        'L': { width: 129, height: 56, text: 20, radius: 16 },
        'M': { width: 99, height: 44, text: 16, radius: 12 },
        'S': { width: 83, height: 32, text: 14, radius: 8 },
        'Ex S': { width: 72, height: 28, text: 12, radius: 8 }
      };

      const size = sizeMap[btnSize];
      const isDisabled = btnStatus === 'Disable';
      const isActive = btnStatus === 'Active';

      const getButtonStyle = () => {
        const base = {
          width: `${size.width}px`,
          height: `${size.height}px`,
          fontSize: `${size.text}px`,
          borderRadius: `${size.radius}px`,
          fontWeight: 700,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          letterSpacing: '0.02em',
          lineHeight: 1.4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        };

        if (btnStyle === 'Primary') {
          if (isDisabled) {
            return {
              ...base,
              backgroundColor: '#E6E6E6',
              color: '#ffffff',
              border: '2px solid transparent',
            };
          } else if (isActive) {
            return {
              ...base,
              backgroundColor: '#7878ff',
              color: '#ffffff',
              border: '2px solid transparent',
            };
          } else {
            // Default
            return {
              ...base,
              backgroundColor: '#E6E6E6',
              color: '#000000',
              border: '2px solid transparent',
            };
          }
        } else if (btnStyle === 'Outline') {
          if (isDisabled) {
            return {
              ...base,
              backgroundColor: '#ffffff',
              border: '0.5pt solid #E6E6E6',
              color: '#E6E6E6',
            };
          } else if (isActive) {
            return {
              ...base,
              backgroundColor: '#EEEEFF',
              border: '0.5pt solid #7878ff',
              color: '#7878ff',
            };
          } else {
            // Default
            return {
              ...base,
              backgroundColor: '#ffffff',
              border: '0.5pt solid #BFBFBF',
              color: '#000000',
            };
          }
        } else {
          // Ghost
          if (isDisabled) {
            return {
              ...base,
              backgroundColor: 'transparent',
              border: '2px solid transparent',
              color: '#E6E6E6',
            };
          } else if (isActive) {
            return {
              ...base,
              backgroundColor: 'transparent',
              border: '2px solid transparent',
              color: '#7878ff',
            };
          } else {
            // Default
            return {
              ...base,
              backgroundColor: 'transparent',
              border: '2px solid transparent',
              color: '#A4A4A4',
            };
          }
        }
      };

      return (
        <div className="flex-1 flex flex-col justify-between gap-4">
          {/* 上側：按鈕預覽區塊（加入高雅內嵌淺色背景以襯托按鈕） */}
          <div className="flex-1 flex items-center justify-center min-h-[110px] py-4 bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner">
            <button style={getButtonStyle()} disabled={isDisabled}>Button</button>
          </div>

          {/* 下側：三個狀態切換器（改為與附圖二一致的 Segmented Control 樣式） */}
          <div className="flex flex-col gap-2 w-full mt-auto">
            {/* Size Selector */}
            <div className="w-full bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner p-1.5 flex items-center justify-between gap-1 flex-wrap sm:flex-nowrap">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0">Size</span>
              <div className="flex bg-gray-100 rounded-lg p-0.5 flex-nowrap justify-end gap-0.5">
                {['L', 'M', 'S', 'Ex S'].map((sz) => {
                  const isCurrent = btnSize === sz;
                  return (
                    <button 
                      key={sz}
                      onClick={() => setBtnSize(sz)} 
                      className={`px-3 py-1.5 md:py-1 text-[11px] md:text-[10px] font-bold rounded-md transition-all active:scale-95 cursor-pointer ${
                        isCurrent 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Style Selector */}
            <div className="w-full bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner p-1.5 flex items-center justify-between gap-1 flex-wrap sm:flex-nowrap">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0">Style</span>
              <div className="flex bg-gray-100 rounded-lg p-0.5 flex-nowrap justify-end gap-0.5">
                {['Primary', 'Outline', 'Ghost'].map((st) => {
                  const isCurrent = btnStyle === st;
                  return (
                    <button 
                      key={st}
                      onClick={() => setBtnStyle(st)} 
                      className={`px-2.5 py-1.5 md:py-1 text-[11px] md:text-[10px] font-bold rounded-md transition-all active:scale-95 cursor-pointer ${
                        isCurrent 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* State Selector */}
            <div className="w-full bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner p-1.5 flex items-center justify-between gap-1 flex-wrap sm:flex-nowrap">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0">State</span>
              <div className="flex bg-gray-100 rounded-lg p-0.5 flex-nowrap justify-end gap-0.5">
                {['Default', 'Active', 'Disable'].map((stat) => {
                  const isCurrent = btnStatus === stat;
                  return (
                    <button 
                      key={stat}
                      onClick={() => setBtnStatus(stat)} 
                      className={`px-3 py-1.5 md:py-1 text-[11px] md:text-[10px] font-bold rounded-md transition-all active:scale-95 cursor-pointer ${
                        isCurrent 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-400 hover:text-gray-700'
                      }`}
                    >
                      {stat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    };

    const GSATNavigationShowcase = ({ lang }) => {
      const [activeTab, setActiveTab] = useState('Home'); // Home | Book | Wrong | Saved | Profile

      const tabs = [
        { 
          id: 'Home', 
          zhLabel: '首頁', 
          enLabel: 'Home',
          icon: (isActive) => (
            <svg className={`w-5.5 h-5.5 transition-all duration-200 ${isActive ? 'text-[#7878ff] scale-110' : 'text-[#A4A4A4] group-hover:text-[#5E5E5E]'}`} fill="none" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.3333 107.375V50.875L65 22.625L102.667 50.875V107.375H74.4166V74.4167H55.5833V107.375H27.3333Z" fill="currentColor"/>
            </svg>
          )
        },
        { 
          id: 'Book', 
          zhLabel: '題庫', 
          enLabel: 'Book',
          icon: (isActive) => (
            <svg className={`w-5.5 h-5.5 transition-all duration-200 ${isActive ? 'text-[#7878ff] scale-110' : 'text-[#A4A4A4] group-hover:text-[#5E5E5E]'}`} fill="none" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
              <path d="M99.3999 22H39.2001C32.1051 22 26.3001 27.805 26.3001 34.9V95.0998C26.3001 102.195 32.1051 108 39.2001 108H103.7V99.3998H39.2001C36.8351 99.3998 34.9001 97.4648 34.9001 95.0998C34.9001 92.7348 36.8351 90.7998 39.2001 90.7998H99.3999C101.765 90.7998 103.7 88.8648 103.7 86.4998V26.3C103.7 23.935 101.765 22 99.3999 22ZM86.5 47.7999H47.8001V39.2H86.5V47.7999Z" fill="currentColor"/>
            </svg>
          )
        },
        { 
          id: 'Profile', 
          zhLabel: '我的', 
          enLabel: 'Profile',
          icon: (isActive) => (
            <svg className={`w-5.5 h-5.5 transition-all duration-200 ${isActive ? 'text-[#7878ff] scale-110' : 'text-[#A4A4A4] group-hover:text-[#5E5E5E]'}`} fill="none" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
              <circle cx="64.9305" cy="45.9242" r="18.6667" fill="currentColor"/>
              <path d="M74.022 66.5051C88.2961 70.4521 98.7776 83.5319 98.7778 99.0617V102.742H31.2222V99.0617C31.2224 83.5659 41.6572 70.5078 55.8833 66.5295C58.5633 68.0175 61.6475 68.8663 64.9302 68.8664C68.231 68.8664 71.3316 68.0083 74.022 66.5051Z" fill="currentColor"/>
            </svg>
          )
        }
      ];

      return (
        <div className="flex-1 flex flex-col justify-between gap-4 relative">
          {/* 上側：導覽列預覽區塊（獨立預覽卡片設計，和切換器分開） */}
          <div className="flex-1 flex items-center justify-center min-h-[88px] py-3 px-6 bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner relative z-20">
            <div className="w-full max-w-[280px] bg-white border border-[#E6E6E6] shadow-sm rounded-2xl px-2 h-16 flex items-center justify-between">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const label = lang === 'zh' ? tab.zhLabel : tab.enLabel;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 flex flex-col items-center justify-center h-full relative cursor-pointer group"
                  >
                    {tab.icon(isActive)}
                    <span 
                      className={`text-[9px] font-bold mt-1 transition-all duration-200 ${
                        isActive 
                          ? 'text-[#7878ff] scale-105' 
                          : 'text-[#A4A4A4] group-hover:text-[#5E5E5E]'
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 下側：控制項選項 */}
          <div className="w-full mt-auto bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner p-1.5 flex items-center justify-between gap-1 flex-wrap sm:flex-nowrap">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0">Tab</span>
            <div className="flex bg-gray-100 rounded-lg p-0.5 flex-wrap justify-end gap-0.5">
              {tabs.map((tab) => {
                const isCurrent = activeTab === tab.id;
                return (
                  <button 
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                    }} 
                    className={`px-2.5 py-1.5 md:py-1 text-[11px] md:text-[10px] font-bold rounded-md transition-all active:scale-95 cursor-pointer ${
                      isCurrent 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {tab.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    };


    const GSATDropdownShowcase = ({ lang }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [dropdownState, setDropdownState] = useState('Interactive'); // Interactive | Disabled

      const options = lang === 'zh' ? [
        { id: 'all', label: '全部' },
        { id: 'chinese', label: '國文' },
        { id: 'english', label: '英文' },
        { id: 'mathA', label: '數學A' },
        { id: 'mathB', label: '數學B' }
      ] : [
        { id: 'all', label: 'All' },
        { id: 'chinese', label: 'Chinese' },
        { id: 'english', label: 'English' },
        { id: 'mathA', label: 'Math A' },
        { id: 'mathB', label: 'Math B' }
      ];

      const [selectedOptionId, setSelectedOptionId] = useState('all');

      const handleToggle = () => {
        if (dropdownState === 'Disabled') return;
        setIsOpen(!isOpen);
      };

      const handleSelect = (id) => {
        setSelectedOptionId(id);
        setIsOpen(false);
      };

      const currentOption = options.find(o => o.id === selectedOptionId) || options[0];

      return (
        <div className="flex-1 flex flex-col justify-between gap-4 relative">
          {/* 上側：下拉選單預覽區塊 */}
          <div className="flex-1 flex flex-col items-center justify-start min-h-[320px] pt-4 pb-2 relative z-20">
            <div className="w-full max-w-[210px] relative">
              <button 
                onClick={handleToggle}
                className={`w-full h-11 px-5 flex items-center justify-between border rounded-xl text-[15px] font-medium transition-all duration-200 outline-none select-none cursor-pointer ${
                  dropdownState === 'Disabled'
                    ? 'bg-[#FBFBFB] border-[#E6E6E6] text-[#CCCCCC] cursor-not-allowed'
                    : isOpen
                      ? 'bg-white border-2 border-[#7878FF] text-black shadow-sm'
                      : 'bg-white border border-[#E6E6E6] text-black hover:border-[#7878FF]'
                }`}
              >
                <span className="truncate">
                  {currentOption.label}
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ml-2 ${dropdownState === 'Disabled' ? 'text-[#CCCCCC]' : 'text-black'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Options Dropdown Menu */}
              {isOpen && dropdownState !== 'Disabled' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#EEEEFF] rounded-xl shadow-lg overflow-hidden p-3 z-30 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col gap-1.5 border-none">
                  {options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        className={`w-full h-10 px-4 text-left text-sm font-medium flex items-center transition-all cursor-pointer rounded-xl select-none ${
                          isSelected 
                            ? 'bg-[#7878FF] text-white shadow-sm' 
                            : 'text-black bg-transparent hover:bg-white/60 hover:text-[#7878ff]'
                        }`}
                      >
                        <span className="truncate">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* 下側：控制項選項 */}
          <div className="w-full mt-auto bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner p-1.5 flex items-center justify-between gap-1 flex-wrap sm:flex-nowrap">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0">State</span>
            <div className="flex bg-gray-100 rounded-lg p-0.5 flex-wrap justify-end gap-0.5">
              <button 
                onClick={() => { setDropdownState('Interactive'); }} 
                className={`px-3 py-1.5 md:py-1 text-[11px] md:text-[10px] font-bold rounded-md transition-all active:scale-95 cursor-pointer ${dropdownState === 'Interactive' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              >
                {lang === 'zh' ? '預設' : 'Active'}
              </button>
              <button 
                onClick={() => { setDropdownState('Disabled'); setIsOpen(false); }} 
                className={`px-3 py-1.5 md:py-1 text-[11px] md:text-[10px] font-bold rounded-md transition-all active:scale-95 cursor-pointer ${dropdownState === 'Disabled' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              >
                {lang === 'zh' ? '禁用' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>
      );
    };


    const GSATInputShowcase = ({ lang }) => {
      const [inputState, setInputState] = useState('Default'); // Default | Focus | Disable | Erro
      const [inputValue, setInputValue] = useState('');

      const placeholder = lang === 'zh' ? '電子信箱' : 'Email';

      return (
        <div className="flex-1 flex flex-col justify-between gap-4 relative">
          {/* 上側：輸入框預覽區塊（內嵌精緻淺色背景，與下側控制項分離） */}
          <div className="flex-1 flex items-center justify-center min-h-[76px] py-3 bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner relative z-20">
            <div className="w-full max-w-[240px] text-left">
              {/* Input wrapper with Icon */}
              <div className="relative w-full">
                {/* Leading Mail Icon */}
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg 
                    className={`w-4 h-4 transition-colors duration-200 ${
                      inputState === 'Disable'
                        ? 'text-[#CCCCCC]'
                        : inputState === 'Erro'
                          ? 'text-[#FF8AA4]'
                          : inputState === 'Focus'
                            ? 'text-[#7878ff]'
                            : 'text-[#A4A4A4]'
                    }`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>

                {/* Input tag */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    if (inputState !== 'Disable') {
                      setInputValue(e.target.value);
                    }
                  }}
                  disabled={inputState === 'Disable'}
                  placeholder={placeholder}
                  className={`w-full h-11 pl-10 pr-9 border rounded-xl text-[14px] font-medium transition-all duration-200 outline-none select-text ${
                    inputState === 'Disable'
                      ? 'bg-white border-[#E6E6E6] text-[#CCCCCC] placeholder-[#CCCCCC] cursor-not-allowed'
                      : inputState === 'Erro'
                        ? 'bg-white border-[#FF8AA4] text-[#FF8AA4] placeholder-[#FF8AA4] focus:border-[#FF8AA4]'
                        : inputState === 'Focus'
                          ? 'bg-white border-2 border-[#7878FF] text-[#7878ff] placeholder-[#7878ff] shadow-sm'
                          : 'bg-white border border-[#BFBFBF] text-black placeholder-[#A4A4A4] hover:border-[#7878FF] focus:border-2 focus:border-[#7878FF]'
                  }`}
                  onFocus={() => {
                    if (inputState !== 'Disable' && inputState !== 'Erro') {
                      setInputState('Focus');
                    }
                  }}
                  onBlur={() => {
                    if (inputState === 'Focus') {
                      setInputState('Default');
                    }
                  }}
                />

                {/* Trailing status icon (Error/Lock) */}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {inputState === 'Erro' && (
                    <svg className="w-5 h-5 text-[#FF8AA4]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                  {inputState === 'Disable' && (
                    <svg className="w-4 h-4 text-[#CCCCCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 下側：控制項選項 */}
          <div className="w-full mt-auto bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner p-1.5 flex items-center justify-between gap-1 flex-wrap sm:flex-nowrap">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0">State</span>
            <div className="flex bg-gray-100 rounded-lg p-0.5 flex-wrap justify-end gap-0.5">
              {['Default', 'Focus', 'Disable', 'Erro'].map((st) => {
                const isCurrent = inputState === st;
                return (
                  <button 
                    key={st}
                    onClick={() => {
                      setInputState(st);
                    }} 
                    className={`px-2 py-1.5 md:py-1 text-[11px] md:text-[10px] font-bold rounded-md transition-all active:scale-95 cursor-pointer ${
                      isCurrent 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {st}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    };

    const GSATSubjectCardsShowcase = ({ lang }) => {
      const [activeSubId, setActiveSubId] = useState('mathA');
      const [isSubmitted, setIsSubmitted] = useState(false);

      // Define standard subjects
      const subjects = [
        { id: 'mathA', zhName: '數學 A', enName: 'Math A', illustration: 'projects/mslin-app/illustrations/math-a.svg' },
        { id: 'mathB', zhName: '數學 B', enName: 'Math B', illustration: 'projects/mslin-app/illustrations/math-b.svg' },
        { id: 'english', zhName: '英文', enName: 'English', illustration: 'projects/mslin-app/illustrations/english.svg' },
        { id: 'chinese', zhName: '國文', enName: 'Chinese', illustration: 'projects/mslin-app/illustrations/chinese.svg' }
      ];

      const activeSubject = subjects.find(s => s.id === activeSubId) || subjects[0];
      const isAddActive = activeSubId === 'add';

      // Reset submission state when switching tabs
      useEffect(() => {
        setIsSubmitted(false);
      }, [activeSubId]);

      return (
        <div className="flex-1 flex flex-col justify-between gap-4 relative">
          
          {/* Middle: Beautiful Vertical Card Area */}
          <div className="flex-1 flex flex-col justify-center items-center py-4 px-4 bg-white/40 rounded-3xl border border-gray-100/50 shadow-inner relative z-20 min-h-[390px] overflow-hidden">
            
            {/* A. Real Subject Card */}
            {!isAddActive ? (
              <div 
                className="w-full max-w-[250px] mx-auto bg-white rounded-[24px] border border-[#E6E6E6] shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-5 flex flex-col items-center justify-between min-h-[350px] relative transition-all duration-300 group animate-fade-in-scale"
                key={activeSubject.id}
              >
                {/* Top of Card */}
                <div className="w-full text-left">
                  <h5 className="text-[17px] font-bold text-gray-900 leading-tight">
                    {lang === 'zh' ? activeSubject.zhName : activeSubject.enName}
                  </h5>
                </div>

                {/* Center Illustration */}
                <div className="w-full flex-1 flex items-center justify-center py-4 my-auto min-h-[130px]">
                  <img 
                    src={activeSubject.illustration} 
                    className="h-[110px] w-auto object-contain transition-transform duration-300 select-none" 
                    alt={activeSubject.zhName} 
                  />
                </div>

                {/* Bottom Action Buttons (Direct Primary & Ghost styling) */}
                <div className="w-full flex flex-col gap-2 mt-2">
                  <button className="w-full py-2.5 text-[12px] font-bold rounded-xl bg-[#7878FF] hover:bg-[#5858EA] text-white transition-all transform active:scale-95 hover:shadow-[0_4px_12px_rgba(120,120,255,0.2)] cursor-pointer text-center">
                    {lang === 'zh' ? '立即刷題' : 'Start Practice'}
                  </button>
                  <button className="w-full py-2 text-[12px] font-bold rounded-xl bg-transparent text-[#7878ff] hover:bg-[#EEEEFF]/40 transition-all transform active:scale-95 cursor-pointer text-center">
                    {lang === 'zh' ? '選擇練習模式' : 'Practice Mode'}
                  </button>
                </div>
              </div>
            ) : (
              /* B. Add Card State */
              <div 
                className={`w-full max-w-[250px] mx-auto rounded-[24px] border border-dashed p-5 flex flex-col items-center justify-between min-h-[350px] relative transition-all duration-300 group select-none ${
                  isSubmitted
                    ? 'border-[#C7F1E8] bg-[#C7F1E8]/10'
                    : 'border-[#CCCCCC] bg-white hover:border-[#7878FF] hover:bg-[#EEEEFF]/10'
                }`}
              >
                {/* Top of Card */}
                <div className="w-full text-left">
                  <h5 className="text-[17px] font-bold text-gray-900 leading-tight">
                    {lang === 'zh' ? '新增學科' : 'Add Subject'}
                  </h5>
                </div>

                {/* Center Illustration (add.svg) */}
                <div className="w-full flex-1 flex items-center justify-center py-4 my-auto min-h-[130px]">
                  {isSubmitted ? (
                    <div className="flex flex-col items-center gap-2 animate-fade-in-scale">
                      <span className="text-4xl text-[#3E6C62]">✓</span>
                      <span className="text-xs font-bold text-[#3E6C62] text-center">
                        {lang === 'zh' ? '已提交申請！' : 'Submitted!'}
                      </span>
                    </div>
                  ) : (
                    <img 
                      src="projects/mslin-app/illustrations/add.svg" 
                      className="h-[90px] w-auto object-contain transition-transform duration-300 select-none" 
                      alt="Add Illustration" 
                    />
                  )}
                </div>

                {/* Bottom Action Button */}
                <div className="w-full flex flex-col gap-2 mt-2">
                  {isSubmitted ? (
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="w-full py-2.5 text-[12px] font-bold rounded-xl bg-[#3E6C62] text-white transition-all transform active:scale-95 text-center cursor-pointer"
                    >
                      {lang === 'zh' ? '重新申請' : 'Request Again'}
                    </button>
                  ) : (
                    <button 
                      onClick={() => setIsSubmitted(true)}
                      className="w-full py-2.5 text-[12px] font-bold rounded-xl bg-[#7878FF] hover:bg-[#5858EA] text-white transition-all transform active:scale-95 text-center cursor-pointer shadow-sm"
                    >
                      {lang === 'zh' ? '點擊新增' : 'Click to Add'}
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Bottom subject filter switcher (replaces mode switcher) */}
          <div className="w-full mt-auto bg-gray-100/90 rounded-2xl p-1 flex justify-start md:justify-between items-center gap-1 md:gap-0.5 overflow-x-auto hide-scrollbar select-none border border-gray-200/40">
            {subjects.map((sub) => {
              const isActive = activeSubId === sub.id;
              const name = lang === 'zh' ? sub.zhName : sub.enName;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubId(sub.id)}
                  className={`flex-none md:flex-1 px-3 md:px-0 py-2 md:py-1.5 text-[11px] font-bold rounded-xl transition-all active:scale-95 cursor-pointer whitespace-nowrap text-center ${
                    isActive
                      ? 'bg-white text-gray-900 shadow-sm border border-gray-200/30 font-extrabold'
                      : 'text-gray-400 hover:text-gray-700 font-semibold'
                  }`}
                >
                  {name}
                </button>
              );
            })}
            <button
              onClick={() => setActiveSubId('add')}
              className={`flex-none px-3 py-2 md:py-1.5 text-[11px] font-bold rounded-xl transition-all active:scale-95 cursor-pointer whitespace-nowrap text-center ${
                activeSubId === 'add'
                  ? 'bg-[#FFE1E8] text-[#8E3148] border border-[#FF8AA4]/30 font-extrabold'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200/20 font-semibold'
              }`}
            >
              {lang === 'zh' ? '+ 新增學科' : '+ Add'}
            </button>
          </div>
        </div>
      );
    };


    const GSATProgressShowcase = ({ lang }) => {
      const [currentState, setCurrentState] = useState(2); // 預設第二狀態 (0-5 中的 2)

      const progressPercents = [0, 20, 30, 70, 100, 100];
      const activePercent = progressPercents[currentState];

      return (
        <div className="flex-1 flex flex-col justify-between gap-6 relative select-none w-full">
          {/* 上半部：精緻毛玻璃展示區域，無文字單純顯示圖表 */}
          <div className="flex-1 flex flex-col justify-center py-8 px-8 bg-white/40 rounded-3xl border border-gray-100/50 shadow-inner relative z-20 overflow-hidden gap-8 min-h-[220px]">
            
            {/* 進度條 (Progress Bar) - 參考附圖二設計：細長圓角、單色無漸變無動態 */}
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-2 bg-gray-100/70 rounded-full overflow-hidden border border-gray-200/10 relative shadow-inner">
                <div 
                  className="h-full bg-[#7878FF] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${activePercent}%` }}
                />
              </div>
            </div>

            {/* 步驟指示器 (Step Indicator) - 參考附圖三設計：4個步驟、打勾與數值狀態切換 */}
            <div className="w-full px-2 flex items-center justify-between relative">
              {/* 底層軌道與進度啟用軌道 */}
              <div className="absolute left-7 right-7 md:left-8 md:right-8 top-1/2 -translate-y-1/2 h-[2px] bg-gray-100 rounded-full z-0">
                <div 
                  className="h-full bg-[#7878FF] rounded-full transition-all duration-500 ease-out" 
                  style={{
                    width: 
                      currentState <= 1 ? '0%' :
                      currentState === 2 ? '33.33%' :
                      currentState === 3 ? '66.67%' : '100%'
                  }}
                />
              </div>

              {/* 圓形步驟點 (1 to 4) */}
              {[1, 2, 3, 4].map((stepNum) => {
                const isCompleted = stepNum < currentState;
                const isActive = stepNum === currentState;

                return (
                  <div key={stepNum} className="flex flex-col items-center z-10 relative">
                    <button 
                      onClick={() => setCurrentState(stepNum)}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 transform active:scale-95 border cursor-pointer ${
                        isActive
                          ? 'bg-white border-2 border-[#7878FF] text-[#7878ff] shadow-[0_0_16px_rgba(120,120,255,0.2)]'
                          : isCompleted
                            ? 'bg-[#7878FF] border-none text-white shadow-sm'
                            : 'bg-white border-2 border-gray-100 text-gray-300 hover:border-gray-200'
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        stepNum
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 底部 0-5 切換按鈕區 */}
          <div className="w-full mt-auto bg-gray-100/90 rounded-2xl p-1.5 flex justify-between items-center gap-1 border border-gray-200/40 select-none flex-wrap sm:flex-nowrap">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2.5 flex-shrink-0">
              {lang === 'zh' ? '進度切換' : 'Select Stage'}
            </span>
            <div className="flex bg-gray-200/20 rounded-xl p-0.5 justify-end gap-0.5 flex-1 max-w-[200px] flex-wrap">
              {[0, 1, 2, 3, 4, 5].map((num) => {
                const isActive = currentState === num;
                return (
                  <button
                    key={num}
                    onClick={() => setCurrentState(num)}
                    className={`flex-1 py-1.5 md:py-1 text-[11px] font-extrabold rounded-lg transition-all active:scale-95 cursor-pointer text-center ${
                      isActive
                        ? 'bg-white text-gray-900 shadow-sm border border-gray-200/30'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    };


    const GSATAccordionShowcase = ({ lang }) => {
      const [simulatedState, setSimulatedState] = useState('Expand'); // Default | Expand | Unit Menu
      const [isExpanded, setIsExpanded] = useState(true);
      const [selectedSubId, setSelectedSubId] = useState(null);

      useEffect(() => {
        if (simulatedState === 'Default') {
          setIsExpanded(false);
          setSelectedSubId(null);
        } else if (simulatedState === 'Expand') {
          setIsExpanded(true);
          setSelectedSubId(null);
        } else if (simulatedState === 'Unit Menu') {
          setIsExpanded(true);
          setSelectedSubId(0); // Highlight "閱讀理解"
        }
      }, [simulatedState]);

      const subItems = [
        { id: 0, title: '閱讀理解' },
        { id: 1, title: '文意選填' },
        { id: 2, title: '多選題' },
        { id: 3, title: '多選題' }
      ];

      const handleToggle = () => {
        if (isExpanded) {
          setSimulatedState('Default');
        } else {
          setSimulatedState('Expand');
        }
      };

      const handleImmediateQuiz = (e) => {
        e.stopPropagation();
        setSimulatedState('Expand');
      };

      return (
        <div className="flex-1 flex flex-col justify-between gap-6 relative w-full select-none animate-in fade-in duration-300">
          {/* 上側：單一風琴折預覽區 */}
          <div className="flex-1 flex flex-col justify-center py-5 px-4 bg-white/40 rounded-3xl border border-gray-100/50 shadow-inner min-h-[220px] overflow-hidden">
            <div className="w-full max-w-[340px] mx-auto">
              <div 
                className="border transition-all duration-300 overflow-hidden"
                style={{ 
                  borderRadius: '24px',
                  borderColor: '#CCCCCC',
                  backgroundColor: '#FBFBFB',
                  boxShadow: isExpanded ? '0 12px 30px -8px rgba(0, 0, 0, 0.04)' : '0 2px 4px rgba(0,0,0,0.02)'
                }}
              >
                {/* Accordion Header */}
                <div 
                  onClick={handleToggle}
                  className="w-full px-6 py-5 flex items-center justify-between transition-colors hover:bg-gray-100/20 cursor-pointer"
                >
                  <span className="text-xl font-bold text-black font-noto tracking-tight">基礎字詞</span>
                  <div className="flex items-center gap-4">
                    {/* Collapsed State: "立即刷題" Button + Down Triangle */}
                    {!isExpanded && (
                      <button 
                        onClick={handleImmediateQuiz}
                        className="px-4 py-1.5 bg-[#7878FF] hover:bg-[#5858EA] text-white text-xs font-bold rounded-full transition-all duration-200 shadow-sm active:scale-95 cursor-pointer font-noto"
                        style={{ borderRadius: '9999px' }}
                      >
                        立即刷題
                      </button>
                    )}
                    {/* Solid Triangle Icon */}
                    {isExpanded ? (
                      <svg className="w-3.5 h-3.5 text-[#5E5E5E]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 8L20 16H4L12 8Z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-[#5E5E5E]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 16L4 8H20L12 16Z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Expanded Content (Sub Unit Menu) */}
                <div 
                  className="transition-all duration-300 overflow-hidden bg-[#FBFBFB]"
                  style={{ 
                    maxHeight: isExpanded ? '300px' : '0', 
                    opacity: isExpanded ? 1 : 0,
                    borderTop: isExpanded ? '1px solid #EFEFEF' : 'none'
                  }}
                >
                  <div className="flex flex-col">
                    {subItems.map((sub, idx) => {
                      const isSelected = selectedSubId === sub.id;
                      return (
                        <div 
                          key={idx}
                          onClick={() => {
                            setSelectedSubId(sub.id);
                            setSimulatedState('Unit Menu');
                          }}
                          className={`px-6 py-4 flex items-center justify-between border-b border-[#EFEFEF]/60 last:border-b-0 transition-all select-none cursor-pointer group/row ${
                            isSelected 
                              ? 'bg-[#EEEEFF]/40' 
                              : 'bg-[#FBFBFB] hover:bg-gray-100/30'
                          }`}
                        >
                          <span className={`text-base font-bold font-noto transition-colors duration-200 ${
                            isSelected ? 'text-[#7878ff]' : 'text-gray-800'
                          }`}>
                            {sub.title}
                          </span>

                          {/* Right Arrow Card Button */}
                          <div 
                            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                              isSelected
                                ? 'bg-[#7878FF] border-transparent text-white shadow-sm'
                                : 'bg-white border-[#E6E6E6] text-black group-hover/row:border-[#7878FF] group-hover/row:text-[#7878ff]'
                            }`}
                            style={{ borderRadius: '10px' }}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 下側：狀態選擇器 */}
          <div className="w-full mt-auto bg-gray-100/90 rounded-2xl p-1.5 flex justify-between items-center gap-1 border border-gray-200/40 select-none flex-wrap sm:flex-nowrap">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2.5 flex-shrink-0">
              {lang === 'zh' ? '狀態模擬' : 'Select Stage'}
            </span>
            <div className="flex bg-gray-200/20 rounded-xl p-0.5 justify-end gap-0.5 flex-1 max-w-[240px] flex-wrap">
              {[
                { id: 'Default', label: 'default' },
                { id: 'Expand', label: 'expand' },
                { id: 'Unit Menu', label: 'unit menu2' }
              ].map((st) => {
                const isCurrent = simulatedState === st.id;
                return (
                  <button 
                    key={st.id}
                    onClick={() => setSimulatedState(st.id)} 
                    className={`flex-1 py-1.5 md:py-1 text-[11px] md:text-[10px] font-extrabold rounded-lg transition-all active:scale-95 cursor-pointer text-center ${
                      isCurrent 
                        ? 'bg-white text-gray-900 shadow-sm border border-gray-200/30' 
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    };


    const WebShowcaseStrip = ({ items }) => {
      if (!items || items.length === 0) return null;
      const mobileItems = items.filter(item => item.mobile).map(item => item.mobile);

      const [isMobileScreen, setIsMobileScreen] = useState(false);
      useEffect(() => {
        const handleResize = () => setIsMobileScreen(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      // 靠左對齊標題橘色圖標：桌面 60% + 手機 20%，重疊 50px
      const desktopLeft = '0';
      const desktopWidth = isMobileScreen ? '100%' : '60%';
      const mobileLeft = 'calc(60% - 50px)';
      const mobileWidth = '20%';

      const containerRef = useRef(null);
      const mobileScrollRef = useRef(null);

      // 頁面捲動同步手機版長條捲動
      useEffect(() => {
        const container = containerRef.current;
        const mobileScroll = mobileScrollRef.current;
        if (!container || !mobileScroll) return;

        const handleScroll = () => {
          const rect = container.getBoundingClientRect();
          const viewportH = window.innerHeight;
          // progress=0: 長條頂部到達畫面頂部
          // progress=1: 長條底部到達畫面底部
          const scrollRange = rect.height - viewportH;
          const rawProgress = scrollRange > 0
            ? Math.max(0, Math.min(1, -rect.top / scrollRange))
            : 0;

          // 減速捲動：power curve 讓手機版捲動較慢，結尾自然到底
          const progress = Math.pow(rawProgress, 1.5);

          // 同步套用到手機版長條的 scrollTop
          const maxScroll = mobileScroll.scrollHeight - mobileScroll.clientHeight;
          if (maxScroll > 0) {
            mobileScroll.scrollTop = progress * maxScroll;
          }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      return (
        <div ref={containerRef} className="w-full my-12 relative">
          {/* 桌面版長條 */}
          <div className="relative">
            {items.map((item, idx) => (
              <WebShowcaseStripItem
                key={idx}
                item={item}
                index={idx}
                totalItems={items.length}
                desktopLeft={desktopLeft}
                desktopWidth={desktopWidth}
                mobileRight={`calc(${mobileLeft} + ${mobileWidth})`}
              />
            ))}
          </div>

          {/* 手機版長條疊加（限制高度＋同步捲動） */}
          {mobileItems.length > 0 && (
            <div
              className="absolute hidden md:block"
              style={{ top: '2%', bottom: '2%', left: mobileLeft, width: mobileWidth, zIndex: 15 }}
            >
              <div
                className="rounded-[1.2rem] lg:rounded-[1.8rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative bg-black h-full"
                style={{ border: '3px solid rgba(255,255,255,0.12)' }}
              >
                <div ref={mobileScrollRef} className="h-full overflow-y-auto scrollbar-ultra-thin">
                  {mobileItems.map((mItem, idx) => (
                    <div key={idx} style={{ lineHeight: 0, fontSize: 0, marginBottom: idx < mobileItems.length - 1 ? '-1px' : 0 }}>
                      {mItem.type === 'video' ? <WebShowcaseVideo src={mItem.url} /> : <WebShowcaseImage src={mItem.url} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

    const WebShowcaseStripItem = ({ item, index, totalItems, desktopLeft, desktopWidth, mobileRight }) => {
      const [ref, isVisible] = useOnScreen({ threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
      const isLast = index === totalItems - 1;

      return (
        <div ref={ref} className="relative" style={{ lineHeight: 0, fontSize: 0, marginBottom: isLast ? 0 : '-1px' }}>
          {/* 桌面版媒體 */}
          <div style={{ width: desktopWidth, marginLeft: desktopLeft, lineHeight: 0, fontSize: 0 }}>
            <div className={`overflow-hidden ${index === 0 ? 'rounded-t-2xl md:rounded-t-[24px]' : ''} ${isLast ? 'rounded-b-2xl md:rounded-b-[24px]' : ''}`} style={{ lineHeight: 0, fontSize: 0 }}>
              {item.type === 'video' ? <WebShowcaseVideo src={item.url} /> : <WebShowcaseImage src={item.url} />}
            </div>
          </div>

          {/* 右側標註 — 在手機版長條右側 */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 items-center justify-start" style={{ left: `calc(${mobileRight} + 8px)`, right: 0 }}>
            <div className={`flex items-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 -translate-x-4'}`}>
              <div className={`w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-orange-500 flex-shrink-0 shadow-[0_0_10px_rgba(249,115,22,0.4)] transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}></div>
              <div className={`h-[1px] bg-orange-400 transition-all duration-700 delay-200 ${isVisible ? 'w-8 lg:w-16' : 'w-0'}`}></div>
              <div className="ml-4 lg:ml-6 max-w-[180px] lg:max-w-[240px]">
                <h5 className="text-xs lg:text-sm font-bold text-gray-900 tracking-wide uppercase mb-1" style={{ lineHeight: 1.4 }}>{item.title}</h5>
                <p className="text-[11px] lg:text-xs text-gray-500 leading-relaxed font-noto" style={{ lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          </div>

          {/* 響應式標註 (小螢幕) */}
          <div className="md:hidden absolute bottom-0 z-20 pointer-events-none" style={{ left: desktopLeft, width: desktopWidth }}>
            <div className={`bg-gradient-to-t from-black/60 to-transparent px-4 py-3 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <h5 className="text-xs font-bold text-white tracking-wider uppercase" style={{ lineHeight: 1.4 }}>{item.title}</h5>
            </div>
          </div>
        </div>
      );
    };

    const WebShowcaseVideo = ({ src, className = "w-full h-auto block" }) => {
      const [isLoaded, setIsLoaded] = useState(false);
      const [hasError, setHasError] = useState(false);

      return (
        <div className="relative w-full" style={{ lineHeight: 0, fontSize: 0 }}>
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100/50">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
          )}
          {hasError ? (
            <div className="w-full bg-[#F0F0F0] flex flex-col items-center justify-center py-32">
              <span className="text-gray-400 font-bold tracking-widest text-xs uppercase">[ Media Placeholder ]</span>
              <span className="text-gray-300 text-xs mt-2">{src}</span>
            </div>
          ) : (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onCanPlay={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={className}
              style={{ display: hasError ? 'none' : 'block', verticalAlign: 'top' }}
            />
          )}
        </div>
      );
    };

    const WebShowcaseImage = ({ src }) => {
      const [hasError, setHasError] = useState(false);

      return (
        <div className="relative w-full" style={{ lineHeight: 0, fontSize: 0 }}>
          {hasError ? (
            <div className="w-full bg-[#F0F0F0] flex flex-col items-center justify-center py-32">
              <span className="text-gray-400 font-bold tracking-widest text-xs uppercase">[ Image Placeholder ]</span>
              <span className="text-gray-300 text-xs mt-2">{src}</span>
            </div>
          ) : (
            <img
              src={src}
              alt=""
              className="w-full h-auto block"
              style={{ verticalAlign: 'top' }}
              onError={() => setHasError(true)}
            />
          )}
        </div>
      );
    };


    const GenericVisualProjectView = ({ activeItem, lang, transitionTo, setCurrentPage, setActiveItem, setIsMobileMenuOpen, navigateTo }) => {
      let sectionIndex = 1;
      const getSectionNum = () => String(sectionIndex++).padStart(2, '0');
      const hasMascot = activeItem.mascotDesign && activeItem.mascotDesign.description;

      return (
        <div className="bg-white animate-in fade-in duration-700 min-h-screen pb-32">
          <div className="pt-32 md:pt-36 px-4 md:px-12 max-w-[100rem] mx-auto">
            <BackButton transitionTo={transitionTo} setCurrentPage={setCurrentPage} setActiveItem={setActiveItem} setIsMobileMenuOpen={setIsMobileMenuOpen} lang={lang} />
            <h1 
              className="text-gray-900 font-extrabold tracking-[-2px] leading-[0.95] mb-0 select-none font-inter uppercase" 
              style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
            >
              {t(activeItem.title, lang)}
            </h1>
          </div>

          {/* Hero Section */}
          {activeItem.heroMedia && (
            <div className="w-full mb-16 md:mb-24 bg-[#F6F6F6] relative flex items-center justify-center overflow-hidden mt-6 md:mt-8">
              {activeItem.heroMedia.type === 'video' ?
                <div className="w-full h-auto z-10">
                  <OptimizedVideo src={activeItem.heroMedia.url} className="w-full h-auto" />
                </div> :
                <img src={activeItem.heroMedia.url} className="w-full h-auto block object-contain z-10" alt={t(activeItem.title, lang)} onError={(e) => e.target.style.display = 'none'} />
              }
            </div>
          )}

          {/* 01 Project Overview */}
          {activeItem.projectOverview && (
            <div className="max-w-[100rem] mx-auto px-4 md:px-12 mb-24 md:mb-40 mt-12">
              <ProjectSectionHeader num={getSectionNum()} title={I18N[lang].project.overview} />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
                <div className="space-y-8">
                  {activeItem.projectOverview.clientLogoUrl && (
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{I18N[lang].project.client}</p>
                      <img src={activeItem.projectOverview.clientLogoUrl} alt="Client Logo" className="h-8 md:h-12 w-auto object-contain origin-left" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  )}
                  {activeItem.year && (
                    <div><p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{I18N[lang].project.year}</p><p className="text-xl font-medium text-gray-800">{activeItem.year}</p></div>
                  )}
                  {activeItem.projectOverview.myRole && (
                    <div><p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{I18N[lang].project.myRole}</p><p className="text-xl font-medium text-gray-800">{t(activeItem.projectOverview.myRole, lang)}</p></div>
                  )}
                  {activeItem.projectOverview.service && (
                    <div><p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{I18N[lang].project.service}</p><p className="text-xl font-medium text-gray-800">{t(activeItem.projectOverview.service, lang)}</p></div>
                  )}
                </div>
                <div className="space-y-12 text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-noto whitespace-pre-line">
                  {activeItem.projectOverview.backgroundAndGoals && (
                    <div><SubHeading>{I18N[lang].project.background}</SubHeading><p>{t(activeItem.projectOverview.backgroundAndGoals, lang)}</p></div>
                  )}
                  {activeItem.projectOverview.challenge && (
                    <div><SubHeading>{I18N[lang].project.challenge}</SubHeading><p>{t(activeItem.projectOverview.challenge, lang)}</p></div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 02 Brand Identity */}
          {activeItem.brandIdentity && (
            <div className="max-w-[100rem] mx-auto px-4 md:px-12 mb-24 md:mb-40 mt-12">
              <ProjectSectionHeader num={getSectionNum()} title={I18N[lang].project.brand} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div className="bg-[#EAE8F2] rounded-[2rem] p-12 md:p-20 flex items-center justify-center min-h-[300px] overflow-hidden">
                  {activeItem.brandIdentity.motionVideoUrl ? (
                    <OptimizedVideo src={activeItem.brandIdentity.motionVideoUrl} className="w-full h-full object-cover rounded-[1rem]" />
                  ) : activeItem.brandIdentity.logoImage ? (
                    <img src={activeItem.brandIdentity.logoImage} className="max-w-full max-h-[150px] object-contain" alt="Brand Logo" />
                  ) : (
                    <span className="text-gray-400 font-bold tracking-widest uppercase">Logo Design</span>
                  )}
                </div>
                <div className="space-y-12">
                  {activeItem.brandIdentity.typography && (
                    <div><SubHeading>{I18N[lang].project.typography}</SubHeading><div className="bg-[#FAFAFA] rounded-2xl p-8 border border-gray-100"><div className="text-[80px] font-bold leading-none mb-6 text-gray-900 font-inter">Aa</div><p className="text-xl text-gray-600 font-medium whitespace-pre-line">{t(activeItem.brandIdentity.typography, lang)}</p></div></div>
                  )}
                  {activeItem.brandIdentity.colors && activeItem.brandIdentity.colors.length > 0 && (
                    <div><SubHeading>{I18N[lang].project.colors}</SubHeading><div className="flex flex-wrap gap-4">{activeItem.brandIdentity.colors.map(color => (<div key={color} className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-inner border border-gray-200" style={{ backgroundColor: color }}></div>))}</div></div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 03 Mascot Design */}
          {hasMascot && (
            <div className="w-full mb-24 md:mb-40 bg-[#FAFAFA] py-24 md:py-32">
              <div className="max-w-[100rem] mx-auto px-4 md:px-12">
                <ProjectSectionHeader num={getSectionNum()} title={I18N[lang].project.mascot} />
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-noto max-w-4xl mb-12">{t(activeItem.mascotDesign.description, lang)}</p>
                {activeItem.mascotDesign.images && activeItem.mascotDesign.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {activeItem.mascotDesign.images.map((img, i) => (
                      <div key={i} className="bg-white rounded-[2rem] aspect-square overflow-hidden shadow-sm flex items-center justify-center">
                        {img.endsWith('.mp4') ? <OptimizedVideo src={img} className="w-full h-full object-cover" /> : <img src={img} className="w-full h-full object-cover" alt="Mascot" onError={(e) => e.target.style.display = 'none'} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 04 Icon System */}
          {activeItem.visuals?.iconSystem && (
            <div className="w-full mb-24 md:mb-40">
              <div className="max-w-[100rem] mx-auto px-4 md:px-12">
                <ProjectSectionHeader num={getSectionNum()} title="Icon System" />
              </div>
              <div className="max-w-[100rem] mx-auto px-4 md:px-12">
                {activeItem.visuals.iconSystem.description && (
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-noto max-w-4xl mb-12">{t(activeItem.visuals.iconSystem.description, lang)}</p>
                )}
                {activeItem.visuals.iconSystem.icons && activeItem.visuals.iconSystem.icons.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
                    {activeItem.visuals.iconSystem.icons.map((icon, i) => (
                      <div key={i} className="bg-white border border-gray-100 rounded-2xl aspect-square flex flex-col items-center justify-center relative group hover:border-orange-500 hover:shadow-lg transition-all duration-300">
                        <div className="w-1/2 h-1/2 relative z-10 opacity-70 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300">
                          {icon.endsWith('.mp4') ? <OptimizedVideo src={icon} className="w-full h-full" /> : <img src={icon} className="w-full h-full object-contain" alt="Icon" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 05 Illustration & Animation */}
          {activeItem.visuals?.illustrationAnimation && (
            <div className="w-full bg-[#FAFAFA] py-24 md:py-32 mb-24 md:mb-40">
              <div className="max-w-[100rem] mx-auto px-4 md:px-12">
                <ProjectSectionHeader num={getSectionNum()} title="Illustration & Animation" />
              </div>
              <div className="max-w-[100rem] mx-auto px-4 md:px-12">
                {activeItem.visuals.illustrationAnimation.description && (
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-noto max-w-4xl mb-12">{t(activeItem.visuals.illustrationAnimation.description, lang)}</p>
                )}
                {activeItem.visuals.illustrationAnimation.videos && activeItem.visuals.illustrationAnimation.videos.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {activeItem.visuals.illustrationAnimation.videos.map((vid, i) => (
                      <div key={i} className="w-full aspect-video bg-white rounded-[2rem] shadow-sm flex items-center justify-center overflow-hidden border border-gray-100">
                        {vid.endsWith('.mp4') ? <OptimizedVideo src={vid} className="w-full h-full relative z-10" /> : <img src={vid} className="w-full h-full object-cover" alt="Illustration" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 06 Application */}
          {activeItem.visuals?.application && (
            <div className="w-full mb-24 md:mb-40">
              <div className="max-w-[100rem] mx-auto px-4 md:px-12">
                <ProjectSectionHeader num={getSectionNum()} title="Application" />
              </div>
              <div className="max-w-[100rem] mx-auto px-4 md:px-12">
                {activeItem.visuals.application.description && (
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-noto max-w-4xl mb-12">{t(activeItem.visuals.application.description, lang)}</p>
                )}
                {activeItem.visuals.application.images && activeItem.visuals.application.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {activeItem.visuals.application.images.map((img, i) => (
                      <div key={i} className="w-full bg-[#EAEAEC] rounded-[2rem] overflow-hidden shadow-sm flex items-center justify-center">
                        <img src={img} className="w-full h-auto object-cover" alt="Application" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <FooterCTA activeItem={activeItem} navigateTo={navigateTo} lang={lang} />
        </div>
      );
    };

    const MsLinProjectView = ({ activeItem, lang, transitionTo, setCurrentPage, setActiveItem, setIsMobileMenuOpen, navigateTo }) => {
      const [activeSection, setActiveSection] = useState('overview');
      const [activeOnboardingStep, setActiveOnboardingStep] = useState(0);
      const [timerKey, setTimerKey] = useState(0);
      const [expandedCards, setExpandedCards] = useState([false, false, false]);


      const toggleCard = (idx) => {
        setExpandedCards(prev => {
          const next = [...prev];
          next[idx] = !next[idx];
          return next;
        });
      };

      const [sliderVal, setSliderVal] = useState(50);
      const [isDragging, setIsDragging] = useState(false);
      const [activeTooltip, setActiveTooltip] = useState(null);
      const [chineseAllExpanded, setChineseAllExpanded] = useState(false);
      const [englishAllExpanded, setEnglishAllExpanded] = useState(false);
      const sliderContainerRef = useRef(null);

      useEffect(() => {
        const isDesktopOrTablet = window.matchMedia('(min-width: 768px)').matches;
        if (!isDesktopOrTablet) return;

        const svg = document.getElementById('animated-loops-svg');
        if (!svg) return;

        const elements = {
          'sec-label': { id: 'sec-label', type: 'fade', delay: 0 },
          'l1-header': { id: 'l1-header', type: 'fade', delay: 80 },
          'l1-n1': { id: 'l1-n1', type: 'fade', delay: 160 },
          'l1-a1': { id: 'l1-a1', type: 'draw', delay: 280 },
          'l1-n2': { id: 'l1-n2', type: 'fade', delay: 450 },
          'l1-a2': { id: 'l1-a2', type: 'draw', delay: 550 },
          'l1-n3': { id: 'l1-n3', type: 'fade', delay: 700 },
          'l1-arc': { id: 'l1-arc', type: 'draw', delay: 850 },
          'l1-arc-label': { id: 'l1-arc-label', type: 'fade', delay: 1050 },
          'l1-to-shared': { id: 'l1-to-shared', type: 'draw', delay: 900 },
          'l2-header': { id: 'l2-header', type: 'fade', delay: 1000 },
          'l2-n1': { id: 'l2-n1', type: 'fade', delay: 1050 },
          'l2-a1': { id: 'l2-a1', type: 'draw', delay: 1150 },
          'l2-n2': { id: 'l2-n2', type: 'fade', delay: 1300 },
          'l2-a2': { id: 'l2-a2', type: 'draw', delay: 1400 },
          'l2-n3': { id: 'l2-n3', type: 'fade', delay: 1550 },
          'l2-arc': { id: 'l2-arc', type: 'draw', delay: 1700 },
          'l2-arc-label': { id: 'l2-arc-label', type: 'fade', delay: 1900 },
          'l2-to-shared': { id: 'l2-to-shared', type: 'draw', delay: 1750 },
          'shared-card': { id: 'shared-card', type: 'scale', delay: 1950 },
          'metric-card-1': { id: 'metric-card-1', type: 'fade', delay: 2100 },
          'metric-card-2': { id: 'metric-card-2', type: 'fade', delay: 2200 },
          'metric-card-3': { id: 'metric-card-3', type: 'fade', delay: 2300 },
        };

        const getElementLength = (el) => {
          if (el.tagName === 'path') {
            return el.getTotalLength();
          } else if (el.tagName === 'line') {
            const x1 = parseFloat(el.getAttribute('x1') || '0');
            const y1 = parseFloat(el.getAttribute('y1') || '0');
            const x2 = parseFloat(el.getAttribute('x2') || '0');
            const y2 = parseFloat(el.getAttribute('y2') || '0');
            return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          }
          return 0;
        };

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Initialize styles
        Object.keys(elements).forEach(key => {
          const item = elements[key];
          const el = document.getElementById(item.id);
          if (!el) return;

          if (prefersReducedMotion) {
            el.style.opacity = '1';
            if (item.type === 'draw') {
              el.style.strokeDasharray = 'none';
              el.style.strokeDashoffset = '0';
              const markerId = el.getAttribute('data-marker');
              if (markerId) el.style.markerEnd = `url(#${markerId})`;
            } else {
              el.style.transform = 'none';
            }
            return;
          }

          // Initial state
          if (item.type === 'draw') {
            const len = getElementLength(el);
            el.style.strokeDasharray = `${len} ${len}`;
            el.style.strokeDashoffset = `${len}`;
            el.style.opacity = '0';
            el.style.markerEnd = 'none';
            el.style.transition = 'stroke-dashoffset 300ms ease-in-out, opacity 10ms linear';
          } else if (item.type === 'fade') {
            el.style.opacity = '0';
            el.style.transform = 'translateY(8px)';
            el.style.transition = 'opacity 300ms ease-out, transform 300ms ease-out';
          } else if (item.type === 'scale') {
            el.style.opacity = '0';
            el.style.transform = 'scale(1.04)';
            el.style.transformOrigin = '559px 224px';
            el.style.transition = 'opacity 300ms ease-out, transform 300ms ease-out';
          }
        });

        if (prefersReducedMotion) return;

        const timeouts = [];

        const startAnimation = () => {
          // Run animations
          Object.keys(elements).forEach(key => {
            const item = elements[key];
            const el = document.getElementById(item.id);
            if (!el) return;

            const t = setTimeout(() => {
              el.style.opacity = '1';
              if (item.type === 'draw') {
                el.style.strokeDashoffset = '0';
                const markerId = el.getAttribute('data-marker');
                if (markerId) {
                  setTimeout(() => {
                    el.style.markerEnd = `url(#${markerId})`;
                  }, 300);
                }
              } else if (item.type === 'fade') {
                el.style.transform = 'translateY(0)';
              } else if (item.type === 'scale') {
                el.style.transform = 'scale(1)';
              }

              // Cleanup transform
              setTimeout(() => {
                if (item.type === 'fade' || item.type === 'scale') {
                  el.style.transform = 'none';
                }
              }, 300);
            }, item.delay);

            timeouts.push(t);
          });
        };

        // Trigger animation when scrolled into view, delayed to wait for navigation transition
        let observer;
        const initTimeout = setTimeout(() => {
          observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                startAnimation();
                observer.unobserve(entry.target);
              }
            });
          }, {
            root: null,
            threshold: 0.15
          });
          observer.observe(svg);
        }, 350);

        return () => {
          clearTimeout(initTimeout);
          timeouts.forEach(clearTimeout);
          if (observer) {
            observer.disconnect();
          }
        };
      }, [lang]);

      useEffect(() => {
        const isMobile = !window.matchMedia('(min-width: 768px)').matches;
        if (!isMobile) return;

        const svg = document.getElementById('mobile-loops-svg');
        if (!svg) return;

        const isNoPreference = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
        if (!isNoPreference) {
          const ids = [
            'e0', 'e1', 'e1b', 'e1c', 'e1d', 'e2', 'e3', 'a1', 'a2',
            'e4', 'e5', 'a3', 'a4', 'e6', 'e7', 'arc1', 'arc1la', 'arc1lb',
            'arc1lc', 'arc2', 'arc2la', 'arc2lb', 'arc2lc', 'c1', 'c2', 'e8',
            'metric-card-1', 'metric-card-2', 'metric-card-3'
          ];
          ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.opacity = '1';
          });
          return;
        }

        const addCls = (ids, cls) => {
          ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add(cls);
          });
        };

        const timeouts = [];

        const startAnimation = () => {
          const sequence = [
            { ids: ['e0', 'e1', 'e1b', 'e1c', 'e1d'], cls: 'fade-in', delay: 0 },
            { ids: ['e2', 'e3'], cls: 'fade-in', delay: 80 },
            { ids: ['a1', 'a2'], cls: 'draw-line', delay: 200 },
            { ids: ['e4', 'e5'], cls: 'fade-in', delay: 350 },
            { ids: ['a3', 'a4'], cls: 'draw-line', delay: 450 },
            { ids: ['e6', 'e7'], cls: 'fade-in', delay: 600 },
            { ids: ['arc1', 'arc2'], cls: 'draw-arc', delay: 750 },
            { ids: ['arc1la', 'arc1lb', 'arc1lc', 'arc2la', 'arc2lb', 'arc2lc'], cls: 'fade-in', delay: 950 },
            { ids: ['c1', 'c2'], cls: 'draw-line', delay: 1100 },
            { ids: ['e8'], cls: 'fade-in', delay: 1250 },
            { ids: ['metric-card-1'], cls: 'fade-in', delay: 1400 },
            { ids: ['metric-card-2'], cls: 'fade-in', delay: 1550 },
            { ids: ['metric-card-3'], cls: 'fade-in', delay: 1700 }
          ];

          sequence.forEach(step => {
            const t = setTimeout(() => {
              addCls(step.ids, step.cls);
            }, step.delay);
            timeouts.push(t);
          });
        };

        let observer;
        const initTimeout = setTimeout(() => {
          observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                startAnimation();
                observer.unobserve(entry.target);
              }
            });
          }, {
            root: null,
            threshold: 0.15
          });
          observer.observe(svg);
        }, 350);

        return () => {
          clearTimeout(initTimeout);
          timeouts.forEach(clearTimeout);
          if (observer) {
            observer.disconnect();
          }
        };
      }, [lang]);

      useEffect(() => {
        const sections = ['overview', 'research', 'strategy', 'design', 'outcomes'];
        const observerOptions = {
          root: null,
          rootMargin: '-50% 0px -50% 0px',
          threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        }, observerOptions);

        sections.forEach((id) => {
          const el = document.getElementById(id);
          if (el) observer.observe(el);
        });

        return () => {
          sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.unobserve(el);
          });
        };
      }, []);

      useEffect(() => {
        let animationFrameId = null;

        const handleMove = (clientX) => {
          if (!sliderContainerRef.current) return;
          const rect = sliderContainerRef.current.getBoundingClientRect();
          let x = clientX - rect.left;
          let pct = (x / rect.width) * 100;
          if (pct < 5) pct = 5;
          if (pct > 95) pct = 95;
          setSliderVal(pct);
        };

        const handleMouseMove = (e) => {
          if (!isDragging) return;
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(() => handleMove(e.clientX));
        };

        const handleTouchMove = (e) => {
          if (!isDragging) return;
          if (e.cancelable) e.preventDefault();
          if (e.touches && e.touches[0]) {
            const clientX = e.touches[0].clientX;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => handleMove(clientX));
          }
        };

        const handleMouseUp = () => {
          setIsDragging(false);
        };

        if (isDragging) {
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
          window.addEventListener('touchmove', handleTouchMove, { passive: false });
          window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
          window.removeEventListener('touchmove', handleTouchMove);
          window.removeEventListener('touchend', handleMouseUp);
        };
      }, [isDragging]);

      const [selectedComponent, setSelectedComponent] = useState(null);

      const comps = activeItem.design?.bentoComponents || [];
      const buttonComp = comps.find(c => c.liveComponent === 'button');
      const inputComp = comps.find(c => c.liveComponent === 'input');
      const navComp = comps.find(c => c.liveComponent === 'navigation');
      const dropdownComp = comps.find(c => c.liveComponent === 'dropdown');
      const cardsComp = comps.find(c => c.name === 'Cards & Containers' || c.name === 'Progress Bar and Step Indicator' || c.liveComponent === 'progress');
      const accordionComp = comps.find(c => c.name === 'Accordion' || c.liveComponent === 'accordion');
      const subjectComp = comps.find(c => c.name === 'Subject Cards' || c.liveComponent === 'subject');

      const renderCard = (comp, customClassName = '') => {
        if (!comp) return null;
        const isLive = !!comp.liveComponent;
        return (
          <div
            key={comp.name}
            className={`relative bg-[#FAFAFA] rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col transition-all ${isLive ? '' : 'overflow-hidden'} ${customClassName}`}
            style={{ textAlign: 'left' }}
          >
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">{comp.name}</span>

            {/* Live Component Preview */}
            {comp.liveComponent === 'navigation' ? (
              <GSATNavigationShowcase lang={lang} />
            ) : comp.liveComponent === 'button' ? (
              <GSATButtonShowcase lang={lang} />
            ) : comp.liveComponent === 'dropdown' ? (
              <GSATDropdownShowcase lang={lang} />
            ) : comp.liveComponent === 'input' ? (
              <GSATInputShowcase lang={lang} />
            ) : comp.liveComponent === 'subject' ? (
              <GSATSubjectCardsShowcase lang={lang} />
            ) : comp.liveComponent === 'progress' ? (
              <GSATProgressShowcase lang={lang} />
            ) : comp.liveComponent === 'accordion' ? (
              <GSATAccordionShowcase lang={lang} />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <img src={comp.previewImg} className="w-4/5 h-auto object-contain transition-transform duration-500" alt={comp.name} onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}

            {/* 查看元件資訊按鈕 */}
            <button
              onClick={() => setSelectedComponent(comp)}
              className={`absolute top-4 right-4 z-10 h-10 w-10 ${lang === 'zh' ? 'hover:w-[124px]' : 'hover:w-[162px]'} flex items-center justify-start overflow-hidden bg-white/80 hover:bg-white border border-gray-200/60 backdrop-blur-md shadow-sm hover:shadow-md rounded-full p-0 pl-2.5 hover:pr-3.5 transition-all duration-500 ease-in-out group/btn text-gray-700 hover:text-gray-950 cursor-pointer`}
              title={lang === 'zh' ? '查看元件資訊' : 'View Component Info'}
            >
              <IconSearch className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-bold font-noto opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ease-in-out overflow-hidden whitespace-nowrap ml-2">
                {lang === 'zh' ? '查看元件資訊' : 'View Component Info'}
              </span>
            </button>
          </div>
        );
      };

      const sections = [
        { id: 'overview', name: 'Overview' },
        { id: 'research', name: 'Research' },
        { id: 'strategy', name: 'Strategy' },
        { id: 'design', name: 'Design' },
        { id: 'outcomes', name: 'Outcomes' }
      ];

      return (
        <div 
          className="w-full"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backgroundColor: '#FFFFFF',
            color: '#1A1A1A',
            position: 'relative',
            minHeight: '100vh',
            paddingBottom: '96px'
          }}
        >
          {/* 1. PROJECT ENTRY AREA */}
          <div className="w-full">
            {/* TITLE BLOCK */}
            <div className="max-w-[100rem] mx-auto px-4 md:px-12 pt-32 md:pt-36">
              <BackButton transitionTo={transitionTo} setCurrentPage={setCurrentPage} setActiveItem={setActiveItem} setIsMobileMenuOpen={setIsMobileMenuOpen} lang={lang} />
              <h1 
                className="text-gray-900 font-extrabold tracking-[-2px] leading-[0.95] mb-0 select-none font-inter uppercase md:whitespace-nowrap"
                style={{ fontSize: 'clamp(32px, 5.5vw, 84px)' }}
              >
                Ms Lin 刷題 App
              </h1>
            </div>

            {/* METADATA ROW */}
            <div className="max-w-[100rem] mx-auto px-4 md:px-12 pt-5 pb-5 flex flex-wrap items-center text-[13px] text-gray-500 leading-relaxed gap-2 select-none">
              <span>UI/UX 設計師</span>
              <span className="h-3 w-[1px] bg-gray-200 hidden sm:inline-block"></span>
              <span>前端工程師（兼任）</span>
              <span className="h-3 w-[1px] bg-gray-200 hidden sm:inline-block"></span>
              <span>2025.11 — 至今</span>
              <span className="h-3 w-[1px] bg-gray-200 hidden sm:inline-block"></span>
              <span>iOS / Android</span>
            </div>

            {/* FULL-WIDTH VISUAL BLOCK */}
            <div className="w-full md:w-screen md:relative md:left-1/2 md:-translate-x-1/2 rounded-none bg-[#F6F6F6] mt-6 md:mt-8 select-none overflow-hidden h-auto flex items-center justify-center">
              <img 
                src="projects/mslin-app/img/ms.lin-hero.jpg" 
                alt="Ms Lin 刷題 App Hero" 
                className="w-full h-auto block"
              />
            </div>

            {/* Thin full-width divider */}
            <div className="w-full border-b border-gray-100"></div>
          </div>

          {/* 2. CONTENT AREA (max-width: 1600px, margin: 0 auto, padding: px-4 md:px-12) */}
          <div 
            className="px-4 md:px-12"
            style={{
              maxWidth: '1600px',
              margin: '0 auto',
              boxSizing: 'border-box'
            }}
          >
            {/* 01 — 專案概述 */}
            <section
              id="overview"
              className="py-12 md:py-24 border-b border-gray-100"
              style={{ boxSizing: 'border-box' }}
            >
              {/* SECTION HEADER */}
              <ProjectSectionHeader num="01" title={lang === 'zh' ? '專案概述' : 'Project Overview'} />

              {/* CORE DESIGN QUESTION */}
              <div style={{
                borderLeft: '3px solid #7F77DD',
                borderRadius: '0 8px 8px 0',
                padding: '24px 32px',
                background: '#FAFAFE',
                boxSizing: 'border-box',
                marginBottom: '40px'
              }}>
                <div style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  color: '#7F77DD',
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                  marginBottom: '8px'
                }}>
                  {lang === 'zh' ? '核心設計問題' : 'Core Design Question'}
                </div>
                <div style={{
                  fontSize: '22px',
                  fontWeight: '500',
                  lineHeight: '1.6',
                  color: '#1A1A1A'
                }}>
                  {lang === 'zh' 
                    ? '如何讓學生在不同的學習情境下——不論是主動備考還是考後解惑——都能形成完整的學習閉環，而不只是「用完就走」？'
                    : 'How can we help students form a complete learning loop in different learning contexts—whether active exam prep or post-exam review—rather than just "use and leave"?'}
                </div>
              </div>

              {/* 4 Meta Cards */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-8 mb-12">
                {[
                  { 
                    label: lang === 'zh' ? '角色' : 'Role', 
                    value: lang === 'zh' ? 'UI/UX 設計 & 前端開發' : 'UI/UX Design & Frontend Dev' 
                  },
                  { 
                    label: lang === 'zh' ? '時程' : 'Timeline', 
                    value: lang === 'zh' ? '2025.11 — 至今' : 'Nov 2025 — Present' 
                  },
                  { 
                    label: lang === 'zh' ? '工具' : 'Tools', 
                    value: 'Figma · React Native' 
                  },
                  { 
                    label: lang === 'zh' ? '產業' : 'Industry', 
                    value: lang === 'zh' ? '行動應用 · 教育科技' : 'Mobile App · EdTech' 
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col justify-center min-h-[100px] select-none">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 leading-none">{item.label}</span>
                    <span className="text-sm md:text-base font-bold text-gray-800 leading-snug">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Narrative & Team Info Block */}
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20 mb-16">
                {/* Left Column: Background & Constraints */}
                <div className="space-y-8">
                  <div>
                    <SubHeading>
                      {lang === 'zh' ? '專案背景' : 'PROJECT BACKGROUND'}
                    </SubHeading>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium font-noto mb-4 text-justify">
                      {lang === 'zh' 
                        ? 'Ms Lin 是一款專為國高中全年級學生（國一至高三）打造的學習 App，題目內容涵蓋完整的六年學習階段，讓學生不論處於哪個年級、平時自學或升學備考，都能透過這款 App 建立持續性的學習習慣。'
                        : 'Ms Lin is a practice app tailored for junior and senior high school students (grades 7-12). Covering six full years of curriculum, it helps students establish consistent study habits regardless of grade level or study purpose.'}
                    </p>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium font-noto text-justify">
                      {lang === 'zh'
                        ? '台灣中學生的自主學習工具市場，長期以「題庫數量」作為主要競爭維度，卻鮮少有產品認真思考一個更根本的問題：學生為什麼願意持續回來使用？Ms Lin 從這個缺口出發，聚焦在「學習情境的完整性」——讓每一次學習行為，不論從哪個入口進入，都能形成有起點、有過程、有終點的完整閉環。'
                        : 'The self-study tool market for high schoolers in Taiwan has long competed on "question bank quantity," but few products address a more fundamental question: why would students want to keep returning? Ms Lin starts from this gap, focusing on the "integrity of learning scenarios"—ensuring every study behavior, from any entry point, forms a complete loop with a clear beginning, process, and end.'}
                    </p>
                  </div>

                  <div>
                    <SubHeading>
                      {lang === 'zh' ? '設計限制與挑戰' : 'DESIGN CONSTRAINTS & CHALLENGES'}
                    </SubHeading>
                    <div style={{
                      border: '0.5px solid #EEEEEE',
                      borderRadius: '12px',
                      padding: '16px 20px',
                      background: '#FAFAFA',
                      fontSize: '14px',
                      color: '#4B5563',
                      lineHeight: '1.7',
                      boxSizing: 'border-box'
                    }}>
                      {lang === 'zh'
                        ? '初版開發在資源與時程的限制下，未能進行正式使用者訪談。設計決策主要基於競品機制分析與行為心理學推論，並在初版上線後透過問卷調查與訪談進行驗證與修正。'
                        : 'Due to resource and timeline constraints in the initial version, formal user interviews were not conducted early on. Design decisions were based on competitive analysis and behavioral psychology inferences, and were validated and refined through surveys and interviews post-launch.'}
                    </div>
                  </div>
                </div>

                {/* Right Column: Team & Timeline Details */}
                <div className="space-y-8">
                  <div>
                    <SubHeading>
                      {lang === 'zh' ? '團隊組成' : 'TEAM COMPOSITION'}
                    </SubHeading>
                    <ul className="space-y-3 text-sm md:text-base text-gray-600 font-medium font-noto list-none pl-0">
                      <li>• {lang === 'zh' ? 'UI/UX 設計師（本人）' : 'UI/UX Designer (Self)'}</li>
                      <li>• {lang === 'zh' ? '前端工程師（本人兼任）' : 'Frontend Engineer (Self, concurrently)'}</li>
                      <li>• PM × 1 / {lang === 'zh' ? '後端工程師' : 'Backend Engineer'} × 1 / {lang === 'zh' ? '內容工程師' : 'Content Engineer'} × 1</li>
                    </ul>
                  </div>

                  <div>
                    <SubHeading>
                      {lang === 'zh' ? '專案時程' : 'PROJECT TIMELINE'}
                    </SubHeading>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7F77DD', marginTop: '6px', marginRight: '12px', flexShrink: 0 }}></div>
                        <div className="flex flex-col">
                          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>2025.11 — 2026.01</span>
                          <span style={{ fontSize: '13px', color: '#6B6B6B' }}>
                            {lang === 'zh' ? '初版設計與開發' : 'Initial Design & Development'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7F77DD', marginTop: '6px', marginRight: '12px', flexShrink: 0 }}></div>
                        <div className="flex flex-col">
                          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>2026.02 — {lang === 'zh' ? '至今' : 'Present'}</span>
                          <span style={{ fontSize: '13px', color: '#6B6B6B' }}>
                            {lang === 'zh' ? '功能優化與新功能迭代' : 'Feature Optimization & Iteration'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Block */}
              <div 
                style={{ 
                  marginTop: '48px',
                  '--color-text-primary': '#111827',
                  '--color-text-secondary': '#4B5563',
                  '--color-text-tertiary': '#9CA3AF',
                  '--color-background-secondary': '#FAFAFA',
                  '--color-border-tertiary': '#E5E7EB',
                  '--border-radius-lg': '16px'
                }}
              >
                {/* 兩大學習閉環 - Title & Subtitle */}
                <SubHeading>
                  {lang === 'zh' ? '專案成果' : 'Project Outcomes'}
                </SubHeading>
                <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
                  {lang === 'zh' ? '打造兩條學習閉環並獲得數據驗證' : 'Building two learning loops validated by user data'}
                </div>

                {/* Side-by-Side Grid Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-6 items-center">
                  {/* Left Column: Loop Diagram */}
                  <div className="xl:col-span-8 flex justify-center w-full">
                    <div style={{ width: '100%', maxWidth: '920px', background: 'none', padding: 0, boxSizing: 'border-box' }} className="w-full">
                      
                      {/* DESKTOP VERSION (horizontal SVG) */}
                      <div className="hidden md:block w-full">
                        <svg id="animated-loops-svg" width="100%" viewBox="22 0 658 330" style={{ fontFamily: 'system-ui', display: 'block', userSelect: 'none' }}>
                          <defs>
                            <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#7F77DD" />
                            </marker>
                            <marker id="arrow-teal" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1D9E75" />
                            </marker>
                          </defs>

                          {/* Section Label */}
                          <text id="sec-label" x="340" y="22" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '12px', fill: '#8E8E93', fontWeight: '500' }}>
                            {lang === 'zh' ? '兩條學習閉環' : 'Two Learning Loops'}
                          </text>

                          {/* LOOP 1 Header */}
                          <g id="l1-header">
                            <text x="22" y="52" textAnchor="middle" dominantBaseline="central" style={{ textAnchor: 'start', fontSize: '14px', fontWeight: 500, fill: '#26215C' }}>
                              {lang === 'zh' ? '閉環一｜刷題閉環' : 'Loop 1 | Practice Loop'}
                            </text>
                            <text x="22" y="68" textAnchor="middle" dominantBaseline="central" style={{ textAnchor: 'start', fontSize: '12px', fill: '#8E8E93' }}>
                              {lang === 'zh' ? '主動練習路徑' : 'Active Practice Path'}
                            </text>
                          </g>

                          {/* Loop 1 Nodes */}
                          <g id="l1-n1">
                            <rect x="22" y="82" width="120" height="56" rx="12" fill="#EEEDFE" stroke="#7F77DD" strokeWidth="0.5" />
                            <text x="82" y="104" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '14px', fontWeight: 500, fill: '#3C3489' }}>
                              {lang === 'zh' ? 'App 內刷題' : 'In-App Practice'}
                            </text>
                            <text x="82" y="122" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '12px', fill: '#534AB7' }}>
                              {lang === 'zh' ? '多科互動題型' : 'Interactive Types'}
                            </text>
                          </g>

                          <line id="l1-a1" x1="142" y1="110" x2="168" y2="110" stroke="#7F77DD" strokeWidth="1.5" markerEnd="none" data-marker="arrow-purple" fill="none" />

                          <g id="l1-n2">
                            <rect x="168" y="82" width="120" height="56" rx="12" fill="#EEEDFE" stroke="#7F77DD" strokeWidth="0.5" />
                            <text x="228" y="104" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '14px', fontWeight: 500, fill: '#3C3489' }}>
                              {lang === 'zh' ? '即時解析' : 'Instant Analysis'}
                            </text>
                            <text x="228" y="122" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '12px', fill: '#534AB7' }}>
                              {lang === 'zh' ? '答案 + 詳解' : 'Answer + Solution'}
                            </text>
                          </g>

                          <line id="l1-a2" x1="288" y1="110" x2="314" y2="110" stroke="#7F77DD" strokeWidth="1.5" markerEnd="none" data-marker="arrow-purple" fill="none" />

                          <g id="l1-n3">
                            <rect x="314" y="82" width="120" height="56" rx="12" fill="#EEEDFE" stroke="#7F77DD" strokeWidth="0.5" />
                            <text x="374" y="104" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '14px', fontWeight: 500, fill: '#3C3489' }}>
                              {lang === 'zh' ? '錯題庫收藏' : 'Incorrect Save'}
                            </text>
                            <text x="374" y="122" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '12px', fill: '#534AB7' }}>
                              {lang === 'zh' ? '建立學習資產' : 'Build Learning Asset'}
                            </text>
                          </g>

                          {/* Loop 1 Return */}
                          <path id="l1-arc" d="M374 138 Q374 160 300 160 Q226 160 226 138" stroke="#AFA9EC" strokeWidth="1" markerEnd="none" data-marker="arrow-purple" fill="none" />
                          <text id="l1-arc-label" x="300" y="175" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '12px', fill: '#8E8E93' }}>
                            {lang === 'zh' ? '↻ 複習強化，再來一輪' : '↻ Reinforce & repeat'}
                          </text>

                          {/* Loop 1 N3 to Shared */}
                          <line id="l1-to-shared" x1="434" y1="110" x2="460" y2="170" stroke="#7F77DD" strokeWidth="1.5" markerEnd="none" data-marker="arrow-purple" fill="none" />

                          {/* LOOP 2 Header (shifted by -70px) */}
                          <g id="l2-header">
                            <text x="22" y="208" textAnchor="middle" dominantBaseline="central" style={{ textAnchor: 'start', fontSize: '14px', fontWeight: 500, fill: '#063D29' }}>
                              {lang === 'zh' ? '閉環二｜複習閉環' : 'Loop 2 | Review Loop'}
                            </text>
                            <text x="22" y="224" textAnchor="middle" dominantBaseline="central" style={{ textAnchor: 'start', fontSize: '12px', fill: '#8E8E93' }}>
                              {lang === 'zh' ? '即時解惑路徑' : 'Instant Clarification'}
                            </text>
                          </g>

                          {/* Loop 2 Nodes (shifted by -70px) */}
                          <g id="l2-n1">
                            <rect x="22" y="238" width="120" height="56" rx="12" fill="#E1F5EE" stroke="#1D9E75" strokeWidth="0.5" />
                            <text x="82" y="260" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '14px', fontWeight: 500, fill: '#085041' }}>
                              {lang === 'zh' ? '考卷拍照' : 'Photo Graded Paper'}
                            </text>
                            <text x="82" y="280" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '12px', fill: '#0F6E56' }}>
                              {lang === 'zh' ? '即時上傳解惑' : 'Instant Explanation'}
                            </text>
                          </g>

                          <line id="l2-a1" x1="142" y1="266" x2="168" y2="266" stroke="#1D9E75" strokeWidth="1.5" markerEnd="none" data-marker="arrow-teal" fill="none" />

                          <g id="l2-n2">
                            <rect x="168" y="238" width="120" height="56" rx="12" fill="#E1F5EE" stroke="#1D9E75" strokeWidth="0.5" />
                            <text x="228" y="260" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '14px', fontWeight: 500, fill: '#085041' }}>
                              {lang === 'zh' ? 'AI 解析' : 'AI Analysis'}
                            </text>
                            <text x="228" y="280" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '12px', fill: '#0F6E56' }}>
                              {lang === 'zh' ? '辨識 + 詳解' : 'OCR + Solution'}
                            </text>
                          </g>

                          <line id="l2-a2" x1="288" y1="266" x2="314" y2="266" stroke="#1D9E75" strokeWidth="1.5" markerEnd="none" data-marker="arrow-teal" fill="none" />

                          <g id="l2-n3">
                            <rect x="314" y="238" width="120" height="56" rx="12" fill="#E1F5EE" stroke="#1D9E75" strokeWidth="0.5" />
                            <text x="374" y="260" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '14px', fontWeight: 500, fill: '#085041' }}>
                              {lang === 'zh' ? '相似題練習' : 'Similar Practice'}
                            </text>
                            <text x="374" y="280" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '12px', fill: '#0F6E56' }}>
                              {lang === 'zh' ? '弱點強化' : 'Weakness Reinforcement'}
                            </text>
                          </g>

                          {/* Loop 2 Return (shifted by -70px) */}
                          <path id="l2-arc" d="M374 238 Q374 216 300 216 Q226 216 226 238" stroke="#5DCAA5" strokeWidth="1" markerEnd="none" data-marker="arrow-teal" fill="none" />
                          <text id="l2-arc-label" x="300" y="206" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '12px', fill: '#8E8E93' }}>
                            {lang === 'zh' ? '↻ 加入錯題庫，繼續練習' : '↻ Add to wrong book & practice'}
                          </text>

                          {/* Loop 2 N3 to Shared */}
                          <line id="l2-to-shared" x1="434" y1="266" x2="460" y2="218" stroke="#1D9E75" strokeWidth="1.5" markerEnd="none" data-marker="arrow-teal" fill="none" />

                          {/* Shared Card (shifted by -30px) */}
                          <g id="shared-card">
                            <rect x="460" y="166" width="198" height="56" rx="16" fill="#FAEEDA" stroke="#BA7517" strokeWidth="1" />
                            <text x="559" y="188" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '14px', fontWeight: 500, fill: '#412402' }}>
                              {lang === 'zh' ? '共用學習資產系統' : 'Shared Learning Asset System'}
                            </text>
                            <text x="559" y="208" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '12px', fill: '#633806' }}>
                              {lang === 'zh' ? 'XP · 段位排行 · 錯題庫 · 收藏庫' : 'XP · Ranking · Wrong Book · Saved'}
                            </text>
                          </g>
                        </svg>
                      </div>

                      <div className="block md:hidden w-full max-w-[380px] mx-auto">
                        <svg id="mobile-loops-svg" width="100%" viewBox="0 0 380 430" style={{ fontFamily: 'system-ui', display: 'block', userSelect: 'none', background: 'transparent' }}>
                          <defs>
                            <marker id="arrow-mobile-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#7F77DD" />
                            </marker>
                            <marker id="arrow-mobile-teal" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1D9E75" />
                            </marker>
                          </defs>

                          {/* Section Label */}
                          <text id="e0" className="anim-el" x="190" y="20" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '12px', fill: '#8E8E93', fontWeight: '500' }}>
                            {lang === 'zh' ? '兩條學習閉環' : 'Two Learning Loops'}
                          </text>

                          {/* Loop 1 Headers */}
                          <text id="e1" className="anim-el" x="44" y="42" textAnchor="start" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#26215C' }}>
                            {lang === 'zh' ? '閉環一｜刷題閉環' : 'Loop 1 | Practice Loop'}
                          </text>
                          <text id="e1b" className="anim-el" x="44" y="57" textAnchor="start" dominantBaseline="central" style={{ fontSize: '11px', fill: '#8E8E93' }}>
                            {lang === 'zh' ? '主動練習路徑' : 'Active Practice Path'}
                          </text>

                          {/* Loop 2 Headers */}
                          <text id="e1c" className="anim-el" x="196" y="42" textAnchor="start" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#063D29' }}>
                            {lang === 'zh' ? '閉環二｜複習閉環' : 'Loop 2 | Review Loop'}
                          </text>
                          <text id="e1d" className="anim-el" x="196" y="57" textAnchor="start" dominantBaseline="central" style={{ fontSize: '11px', fill: '#8E8E93' }}>
                            {lang === 'zh' ? '即時解惑路徑' : 'Instant Clarification'}
                          </text>

                          {/* Node 2 (App 內刷題) */}
                          <g id="e2" className="anim-el">
                            <rect x="44" y="68" width="140" height="52" rx="12" fill="#EEEDFE" stroke="#7F77DD" strokeWidth="0.5" />
                            <text x="114" y="86" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#3C3489' }}>
                              {lang === 'zh' ? 'App 內刷題' : 'In-App Practice'}
                            </text>
                            <text x="114" y="102" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#534AB7' }}>
                              {lang === 'zh' ? '多科互動題型' : 'Interactive Types'}
                            </text>
                          </g>

                          {/* Node 3 (考卷拍照) */}
                          <g id="e3" className="anim-el">
                            <rect x="196" y="68" width="140" height="52" rx="12" fill="#E1F5EE" stroke="#1D9E75" strokeWidth="0.5" />
                            <text x="266" y="86" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#085041' }}>
                              {lang === 'zh' ? '考卷拍照' : 'Photo Graded Paper'}
                            </text>
                            <text x="266" y="102" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#0F6E56' }}>
                              {lang === 'zh' ? '即時上傳解惑' : 'Instant Explanation'}
                            </text>
                          </g>

                          {/* Connector a1 */}
                          <line id="a1" className="anim-el" x1="114" y1="120" x2="114" y2="146" stroke="#7F77DD" strokeWidth="1.5" markerEnd="url(#arrow-mobile-purple)" strokeDasharray="26" style={{ '--len': '26' }} fill="none" />

                          {/* Connector a2 */}
                          <line id="a2" className="anim-el" x1="266" y1="120" x2="266" y2="146" stroke="#1D9E75" strokeWidth="1.5" markerEnd="url(#arrow-mobile-teal)" strokeDasharray="26" style={{ '--len': '26' }} fill="none" />

                          {/* Node 4 (即時解析) */}
                          <g id="e4" className="anim-el">
                            <rect x="44" y="146" width="140" height="52" rx="12" fill="#EEEDFE" stroke="#7F77DD" strokeWidth="0.5" />
                            <text x="114" y="164" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#3C3489' }}>
                              {lang === 'zh' ? '即時解析' : 'Instant Analysis'}
                            </text>
                            <text x="114" y="180" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#534AB7' }}>
                              {lang === 'zh' ? '答案 + 詳解' : 'Answer + Solution'}
                            </text>
                          </g>

                          {/* Node 5 (AI 解析) */}
                          <g id="e5" className="anim-el">
                            <rect x="196" y="146" width="140" height="52" rx="12" fill="#E1F5EE" stroke="#1D9E75" strokeWidth="0.5" />
                            <text x="266" y="164" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#085041' }}>
                              {lang === 'zh' ? 'AI 解析' : 'AI Analysis'}
                            </text>
                            <text x="266" y="180" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#0F6E56' }}>
                              {lang === 'zh' ? '辨識 + 詳解' : 'OCR + Solution'}
                            </text>
                          </g>

                          {/* Connector a3 */}
                          <line id="a3" className="anim-el" x1="114" y1="198" x2="114" y2="224" stroke="#7F77DD" strokeWidth="1.5" markerEnd="url(#arrow-mobile-purple)" strokeDasharray="26" style={{ '--len': '26' }} fill="none" />

                          {/* Connector a4 */}
                          <line id="a4" className="anim-el" x1="266" y1="198" x2="266" y2="224" stroke="#1D9E75" strokeWidth="1.5" markerEnd="url(#arrow-mobile-teal)" strokeDasharray="26" style={{ '--len': '26' }} fill="none" />

                          {/* Node 6 (錯題庫收藏) */}
                          <g id="e6" className="anim-el">
                            <rect x="44" y="224" width="140" height="52" rx="12" fill="#EEEDFE" stroke="#7F77DD" strokeWidth="0.5" />
                            <text x="114" y="242" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#3C3489' }}>
                              {lang === 'zh' ? '錯題庫收藏' : 'Incorrect Save'}
                            </text>
                            <text x="114" y="258" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#534AB7' }}>
                              {lang === 'zh' ? '建立學習資產' : 'Build Learning Asset'}
                            </text>
                          </g>

                          {/* Node 7 (相似題練習) */}
                          <g id="e7" className="anim-el">
                            <rect x="196" y="224" width="140" height="52" rx="12" fill="#E1F5EE" stroke="#1D9E75" strokeWidth="0.5" />
                            <text x="266" y="242" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#085041' }}>
                              {lang === 'zh' ? '相似題練習' : 'Similar Practice'}
                            </text>
                            <text x="266" y="258" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#0F6E56' }}>
                              {lang === 'zh' ? '弱點強化' : 'Weakness Reinforcement'}
                            </text>
                          </g>

                          {/* Return Arc 1 */}
                          <path id="arc1" className="anim-el" d="M44 250 Q14 250 14 168 Q14 86 44 86" stroke="#AFA9EC" strokeWidth="1" fill="none" markerEnd="url(#arrow-mobile-purple)" strokeDasharray="200" style={{ '--len': '200' }} />
                          <text id="arc1la" className="anim-el" x="10" y="158" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#8E8E93' }}>↻</text>
                          <text id="arc1lb" className="anim-el" x="10" y="172" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#8E8E93' }}>
                            {lang === 'zh' ? '再來' : 'Repeat'}
                          </text>
                          <text id="arc1lc" className="anim-el" x="10" y="186" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#8E8E93' }}>
                            {lang === 'zh' ? '一輪' : 'Loop'}
                          </text>

                          {/* Return Arc 2 */}
                          <path id="arc2" className="anim-el" d="M336 250 Q366 250 366 168 Q366 86 336 86" stroke="#5DCAA5" strokeWidth="1" fill="none" markerEnd="url(#arrow-mobile-teal)" strokeDasharray="200" style={{ '--len': '200' }} />
                          <text id="arc2la" className="anim-el" x="370" y="158" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#8E8E93' }}>↻</text>
                          <text id="arc2lb" className="anim-el" x="370" y="172" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#8E8E93' }}>
                            {lang === 'zh' ? '繼續' : 'Continue'}
                          </text>
                          <text id="arc2lc" className="anim-el" x="370" y="186" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#8E8E93' }}>
                            {lang === 'zh' ? '練習' : 'Practice'}
                          </text>

                          {/* Converge Line c1 */}
                          <line id="c1" className="anim-el" x1="114" y1="276" x2="158" y2="362" stroke="#7F77DD" strokeWidth="1" markerEnd="url(#arrow-mobile-purple)" strokeDasharray="98" style={{ '--len': '98' }} fill="none" />

                          {/* Converge Line c2 */}
                          <line id="c2" className="anim-el" x1="266" y1="276" x2="222" y2="362" stroke="#1D9E75" strokeWidth="1" markerEnd="url(#arrow-mobile-teal)" strokeDasharray="98" style={{ '--len': '98' }} fill="none" />

                          {/* Shared Card e8 */}
                          <g id="e8" className="anim-el">
                            <rect x="114" y="362" width="152" height="52" rx="12" fill="#FAEEDA" stroke="#BA7517" strokeWidth="1" />
                            <text x="190" y="380" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#412402' }}>
                              {lang === 'zh' ? '共用學習資產' : 'Shared Assets'}
                            </text>
                            <text x="190" y="396" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#633806' }}>
                              {lang === 'zh' ? 'XP · 段位 · 錯題庫' : 'XP · Rank · Wrong Book'}
                            </text>
                          </g>
                        </svg>

                        <style dangerouslySetInnerHTML={{__html: `
                          .anim-el { opacity: 0; }

                          @media (prefers-reduced-motion: no-preference) {
                            .fade-in {
                              animation: fadeUp 350ms ease-out forwards;
                            }
                            .draw-line {
                              animation: drawLine 300ms ease-in-out forwards;
                              opacity: 1 !important;
                            }
                            .draw-arc {
                              animation: drawArc 400ms ease-in-out forwards;
                              opacity: 1 !important;
                            }
                            @keyframes fadeUp {
                              from { opacity: 0; transform: translateY(8px); }
                              to   { opacity: 1; transform: translateY(0); }
                            }
                            @keyframes drawLine {
                              from { stroke-dashoffset: var(--len); }
                              to   { stroke-dashoffset: 0; }
                            }
                            @keyframes drawArc {
                              from { stroke-dashoffset: var(--len); }
                              to   { stroke-dashoffset: 0; }
                            }
                          }
                          @media (prefers-reduced-motion: reduce) {
                            .anim-el { opacity: 1; }
                          }
                        `}} />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 3 Metrics Cards (Horizontal on mobile/tablet, Stacked Vertically on desktop) */}
                  <div className="w-full max-w-[658px] mx-auto xl:col-span-4 xl:max-w-none xl:mx-0 mt-8 xl:mt-0">
                    <div className="grid grid-cols-3 xl:grid-cols-1 gap-6 sm:gap-12 xl:gap-12 w-full">
                      {/* Card 1 */}
                      <div id="metric-card-1" className="anim-el flex flex-col items-center xl:items-start text-center xl:text-left" style={{ background: 'none', padding: '12px 0' }}>
                        <div style={{ background: '#EEEDFE', color: '#3C3489', borderRadius: '20px', fontSize: '10px', padding: '1px 7px', display: 'inline-block', marginBottom: '6px' }}>
                          {lang === 'zh' ? '刷題閉環' : 'Practice Loop'}
                        </div>
                        <div className="text-[40px] sm:text-[52px] xl:text-[64px] font-bold text-[#111827]" style={{ lineHeight: '1.1' }}>
                          50<span className="text-[16px] sm:text-[20px] xl:text-[24px] font-normal text-[#4B5563]">%</span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginTop: '4px' }}>
                          {lang === 'zh' ? '認為五題一輪 loop 完成感適中' : 'Felt a 5-question loop offered a balanced sense of completion'}
                        </div>
                      </div>

                      {/* Card 2 */}
                      <div id="metric-card-2" className="anim-el flex flex-col items-center xl:items-start text-center xl:text-left" style={{ background: 'none', padding: '12px 0' }}>
                        <div style={{ background: '#EEEDFE', color: '#3C3489', borderRadius: '20px', fontSize: '10px', padding: '1px 7px', display: 'inline-block', marginBottom: '6px' }}>
                          {lang === 'zh' ? '刷題閉環' : 'Practice Loop'}
                        </div>
                        <div className="text-[40px] sm:text-[52px] xl:text-[64px] font-bold text-[#111827]" style={{ lineHeight: '1.1' }}>
                          66.7<span className="text-[16px] sm:text-[20px] xl:text-[24px] font-normal text-[#4B5563]">%</span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginTop: '4px' }}>
                          {lang === 'zh' ? '認為步驟解題密度合適，能在關鍵折點提供提示' : 'Found step-by-step guidance density appropriate, offering hints at key pivots'}
                        </div>
                      </div>

                      {/* Card 3 */}
                      <div id="metric-card-3" className="anim-el flex flex-col items-center xl:items-start text-center xl:text-left" style={{ background: 'none', padding: '12px 0' }}>
                        <div style={{ background: 'transparent', color: 'var(--color-text-secondary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: '20px', fontSize: '10px', padding: '1px 7px', display: 'inline-block', marginBottom: '6px' }}>
                          {lang === 'zh' ? '問卷訪談' : 'Survey & Interview'}
                        </div>
                        <div className="text-[40px] sm:text-[52px] xl:text-[64px] font-bold text-[#111827]" style={{ lineHeight: '1.1' }}>
                          100<span className="text-[16px] sm:text-[20px] xl:text-[24px] font-normal text-[#4B5563]">%</span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginTop: '4px' }}>
                          {lang === 'zh' ? '參與前期問卷與使用者訪談' : 'Participated in pre-research surveys and user interviews'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </section>
            {/* 02 — Research */}
            <section
              id="research"
              className="py-12 md:py-24 border-b border-gray-100"
              style={{ boxSizing: 'border-box' }}
            >
              <ProjectSectionHeader num="02" title={lang === 'zh' ? '競品洞察與設計假設' : 'Competitive Insights & Design Hypotheses'} />

              {/* CORE INSIGHT QUOTE BLOCK */}
              <div style={{
                background: '#FFF7ED',
                borderRadius: '16px',
                padding: '40px 48px',
                marginBottom: '48px',
                boxSizing: 'border-box'
              }}>
                <span style={{
                  fontSize: '80px',
                  fontFamily: 'Georgia, serif',
                  color: '#EA580C',
                  lineHeight: '0.7',
                  display: 'block',
                  marginBottom: '16px'
                }}>
                  “
                </span>
                <p style={{
                  fontSize: '20px',
                  fontWeight: '500',
                  lineHeight: '1.7',
                  color: '#26215C',
                  margin: 0
                }}>
                  Epop 讓人上癮，不是因為即時回饋——而是「累積了努力成本之後的即時回饋」。互動密度高、完成前有持續操作、loop 不能太短，三者共同製造了成就感的重量。
                </p>
                <div style={{
                  fontSize: '13px',
                  color: '#534AB7',
                  marginTop: '16px',
                  fontWeight: '500'
                }}>
                  — 競品機制分析
                </div>
                <p style={{
                  fontSize: '16px',
                  color: '#6B6B6B',
                  lineHeight: '1.6',
                  marginTop: '24px',
                  marginBottom: 0
                }}>
                  這個洞察改變了我們對「好的學習體驗」的定義：不是讓刷題變輕鬆，而是讓努力感被看見。
                </p>
              </div>

              {/* EXPERIENCE ARC SVG */}
              <div style={{ marginBottom: '48px' }}>
                <SubHeading>Epop Loop 體驗弧線</SubHeading>
                <div style={{
                  width: '100%',
                  background: '#FAFAFD',
                  borderRadius: '12px',
                  padding: '24px',
                  boxSizing: 'border-box'
                }}>
                  <svg viewBox="0 0 700 260" width="100%" height="auto" style={{ display: 'block' }}>
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#BA7517" />
                      </marker>
                      <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F97316" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Effort accumulation zone dotted box */}
                    <rect x="110" y="70" width="380" height="110" fill="url(#purpleGlow)" stroke="#F97316" strokeWidth="1" strokeDasharray="3,3" rx="8" />
                    <text x="300" y="105" textAnchor="middle" fill="#EA580C" fontSize="12" fontWeight="600" letterSpacing="0.05em">努力成本累積區</text>
                    <text x="300" y="125" textAnchor="middle" fill="#EA580C" fontSize="11" opacity="0.8">高互動密度、持續操作、長度適中</text>

                    {/* X Axis line (subtle) */}
                    <line x1="50" y1="180" x2="650" y2="180" stroke="#EAEAEA" strokeWidth="1" />

                    {/* Purple rising line: from 進入 (60, 180) to 題5 (510, 110) */}
                    <path d="M 60,180 L 150,166 L 240,152 L 330,138 L 420,124 L 510,110" fill="none" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Green spike: from 題5 (510, 110) to 結果 (600, 45) */}
                    <path d="M 510,110 L 600,45" fill="none" stroke="#1D9E75" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Amber return line: from 結果 (600, 45) back to 進入 (60, 180) */}
                    <path d="M 600,55 Q 330,225 65,185" fill="none" stroke="#BA7517" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrow)" />
                    <text x="330" y="240" textAnchor="middle" fill="#BA7517" fontSize="11" fontWeight="500">重新進入刷題 Loop</text>

                    {/* Points Dots */}
                    {/* 進入 */}
                    <circle cx="60" cy="180" r="4" fill="#F97316" stroke="#FFFFFF" strokeWidth="1.5" />
                    {/* 題1 */}
                    <circle cx="150" cy="166" r="4" fill="#F97316" stroke="#FFFFFF" strokeWidth="1.5" />
                    {/* 題2 */}
                    <circle cx="240" cy="152" r="4" fill="#F97316" stroke="#FFFFFF" strokeWidth="1.5" />
                    {/* 題3 */}
                    <circle cx="330" cy="138" r="4" fill="#F97316" stroke="#FFFFFF" strokeWidth="1.5" />
                    {/* 題4 */}
                    <circle cx="420" cy="124" r="4" fill="#F97316" stroke="#FFFFFF" strokeWidth="1.5" />
                    {/* 題5 */}
                    <circle cx="510" cy="110" r="4" fill="#F97316" stroke="#FFFFFF" strokeWidth="1.5" />
                    {/* 結果 */}
                    <circle cx="600" cy="45" r="6" fill="#1D9E75" stroke="#FFFFFF" strokeWidth="2" />

                    {/* Dot labels */}
                    <text x="60" y="202" textAnchor="middle" fill="#6B6B6B" fontSize="11">進入</text>
                    <text x="150" y="202" textAnchor="middle" fill="#6B6B6B" fontSize="11">題1</text>
                    <text x="240" y="202" textAnchor="middle" fill="#6B6B6B" fontSize="11">題2</text>
                    <text x="330" y="202" textAnchor="middle" fill="#6B6B6B" fontSize="11">題3</text>
                    <text x="420" y="202" textAnchor="middle" fill="#6B6B6B" fontSize="11">題4</text>
                    <text x="510" y="202" textAnchor="middle" fill="#6B6B6B" fontSize="11">題5</text>
                    <text x="600" y="202" textAnchor="middle" fill="#1A1A1A" fontSize="11" fontWeight="bold">結果</text>

                    {/* Annotation: "回饋釋放點" dot label */}
                    <g>
                      <rect x="540" y="8" width="120" height="24" fill="#E8F8F2" rx="4" />
                      <text x="600" y="24" textAnchor="middle" fill="#1D9E75" fontSize="11" fontWeight="600">回饋釋放點 ●</text>
                      <path d="M 600,32 L 600,40" stroke="#1D9E75" strokeWidth="1" strokeDasharray="1,1" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* COMPETITIVE TABLE */}
              <div style={{ marginBottom: '48px' }}>
                <SubHeading>競品決策維度對比</SubHeading>
                <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #EEEEEE' }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    textAlign: 'left',
                    boxSizing: 'border-box'
                  }}>
                    <thead>
                      <tr style={{ backgroundColor: '#FFF1E6' }}>
                        <th style={{ padding: '16px', fontWeight: '600', color: '#1A1A1A', borderBottom: '1px solid #EEEEEE', minWidth: '120px' }}>對比維度</th>
                        <th style={{ padding: '16px', fontWeight: '600', color: '#EA580C', backgroundColor: '#FFF7ED', borderBottom: '1px solid #EEEEEE', minWidth: '180px' }}>Ms Lin</th>
                        <th style={{ padding: '16px', fontWeight: '600', color: '#1A1A1A', borderBottom: '1px solid #EEEEEE', minWidth: '160px' }}>Epop</th>
                        <th style={{ padding: '16px', fontWeight: '600', color: '#1A1A1A', borderBottom: '1px solid #EEEEEE', minWidth: '180px' }}>傳統題庫 App</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '0.5px solid #EEEEEE' }}>
                        <td style={{ padding: '16px', fontWeight: '500', color: '#1A1A1A' }}>Loop 長度</td>
                        <td style={{ padding: '16px', backgroundColor: '#FFF7ED', fontWeight: '500', color: '#1A1A1A' }}>5 題極短 Loop</td>
                        <td style={{ padding: '16px', color: '#6B6B6B' }}>3-5 題極短 Loop</td>
                        <td style={{ padding: '16px', color: '#6B6B6B' }}>20-50 題長 Loop</td>
                      </tr>
                      <tr style={{ borderBottom: '0.5px solid #EEEEEE' }}>
                        <td style={{ padding: '16px', fontWeight: '500', color: '#1A1A1A' }}>回饋時機</td>
                        <td style={{ padding: '16px', backgroundColor: '#FFF7ED', fontWeight: '500', color: '#1A1A1A' }}>解題完立即結算並提供微動畫</td>
                        <td style={{ padding: '16px', color: '#6B6B6B' }}>操作後立即給予強力視覺回饋</td>
                        <td style={{ padding: '16px', color: '#6B6B6B' }}>整份試卷寫完交卷後才提供回饋</td>
                      </tr>
                      <tr style={{ borderBottom: '0.5px solid #EEEEEE' }}>
                        <td style={{ padding: '16px', fontWeight: '500', color: '#1A1A1A' }}>個人學習資產</td>
                        <td style={{ padding: '16px', backgroundColor: '#FFF7ED', fontWeight: '500', color: '#1A1A1A' }}>強（個人錯題本與累積進度紀錄）</td>
                        <td style={{ padding: '16px', color: '#6B6B6B' }}>弱（僅單次體驗，不保存記錄）</td>
                        <td style={{ padding: '16px', color: '#6B6B6B' }}>弱（僅記錄歷史分數與錯題列表）</td>
                      </tr>
                      <tr style={{ borderBottom: '0.5px solid #EEEEEE' }}>
                        <td style={{ padding: '16px', fontWeight: '500', color: '#1A1A1A' }}>情感設計</td>
                        <td style={{ padding: '16px', backgroundColor: '#FFF7ED', fontWeight: '500', color: '#1A1A1A' }}>強（進度條回填與努力感視覺化）</td>
                        <td style={{ padding: '16px', color: '#6B6B6B' }}>極強（高頻率的音效與畫面震動）</td>
                        <td style={{ padding: '16px', color: '#6B6B6B' }}>無（純靜態網頁或文字排版）</td>
                      </tr>
                      <tr style={{ borderBottom: '0.5px solid #EEEEEE' }}>
                        <td style={{ padding: '16px', fontWeight: '500', color: '#1A1A1A' }}>解題引導</td>
                        <td style={{ padding: '16px', backgroundColor: '#FFF7ED', fontWeight: '500', color: '#1A1A1A' }}>步驟引導（分解難題為小步驟）</td>
                        <td style={{ padding: '16px', color: '#6B6B6B' }}>直接提供答案與解析</td>
                        <td style={{ padding: '16px', color: '#6B6B6B' }}>提供冗長文字解析</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ASSUMPTION CARDS */}
              <div style={{ marginBottom: '48px' }}>
                <SubHeading>設計假設</SubHeading>
                <div className="grid grid-cols-1 md:grid-cols-3 items-start" style={{ gap: '16px', alignItems: 'start' }}>
                  {[
                    {
                      title: "假設一 五題刷題 Loop",
                      hypothesis: "五題是努力有重量又不至於放棄的臨界點",
                      basis: "Epop + 注意力研究",
                      validation: "連續多輪啟動率"
                    },
                    {
                      title: "假設二 步驟解題",
                      hypothesis: "過程參與感讓學生覺得是自己解出來的",
                      basis: "Scaffolding 理論",
                      validation: "重複錯題率差異"
                    },
                    {
                      title: "假設三 錯題庫收藏庫",
                      hypothesis: "擁有學習記錄能提高黏性與回訪動機",
                      basis: "競品缺乏個人化資產",
                      validation: "D30 留存率"
                    }
                  ].map((card, idx) => {
                    const isExpanded = expandedCards[idx];
                    return (
                      <div 
                        key={idx}
                        onClick={() => toggleCard(idx)}
                        style={{
                          padding: '20px 24px',
                          border: '0.5px solid #EEEEEE',
                          borderRadius: '12px',
                          background: '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                          boxSizing: 'border-box'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A1A' }}>{card.title}</span>
                            <span style={{
                              fontSize: '11px',
                              padding: '2px 8px',
                              borderRadius: '100px',
                              background: '#FFF7ED',
                              color: '#3C3489',
                              fontWeight: '500'
                            }}>
                              待驗證
                            </span>
                          </div>
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="#F97316" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            style={{
                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 300ms ease'
                            }}
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                        <div style={{ fontSize: '14px', fontStyle: 'italic', color: '#534AB7', marginTop: '12px' }}>
                          {card.hypothesis}
                        </div>
                        <div style={{
                          maxHeight: isExpanded ? '300px' : '0px',
                          overflow: 'hidden',
                          transition: 'max-height 300ms ease',
                          marginTop: isExpanded ? '16px' : '0px'
                        }}>
                          <div style={{
                            borderTop: '0.5px solid #EEEEEE',
                            paddingTop: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            fontSize: '13px',
                            color: '#6B6B6B',
                            lineHeight: '1.6'
                          }}>
                            <div>
                              <strong style={{ color: '#1A1A1A', fontWeight: '500' }}>依據：</strong>{card.basis}
                            </div>
                            <div>
                              <strong style={{ color: '#1A1A1A', fontWeight: '500' }}>計畫驗證：</strong>{card.validation}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RESEARCH NOTE */}
              <div style={{
                border: '0.5px solid #EEEEEE',
                borderRadius: '8px',
                padding: '12px 16px',
                background: '#FAFAFA',
                fontSize: '13px',
                color: '#6B6B6B',
                lineHeight: '1.6'
              }}>
                本章節設計依據來自競品分析與學習心理學推論，非使用者訪談。初版上線後進行問卷與深度訪談驗證——結果請見第 05 章。
              </div>
            </section>

            {/* 03 — Strategy */}
            <section
              id="strategy"
              className="py-12 md:py-24 border-b border-gray-100"
              style={{ boxSizing: 'border-box' }}
            >
              <ProjectSectionHeader num="03" title={lang === 'zh' ? '策略定調與資訊架構' : 'Design Strategy & Information Architecture'} />

              {/* FOUR PRINCIPLES */}
              <div style={{ marginBottom: '48px' }}>
                <SubHeading>從洞察到設計原則</SubHeading>
                <p style={{ fontSize: '15px', color: '#6B6B6B', margin: '0 0 24px 0', lineHeight: '1.6' }}>
                  競品分析完成後，我們將核心洞察轉換成四條設計原則，作為所有功能決策的依據：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px' }}>
                  {/* Principle 01 */}
                  <div style={{ border: '0.5px solid #EEEEEE', borderRadius: '12px', padding: '24px', backgroundColor: '#FFFFFF', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFF7ED', color: '#534AB7', fontSize: '12px', fontWeight: 'bold' }}>
                      01
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A1A', marginTop: '12px', marginBottom: '8px' }}>
                      讓努力感被看見
                    </div>
                    <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#6B6B6B', margin: '0 0 16px 0', flex: 1 }}>
                      每題作答後立即公布答案並附詳盡解析，進度條題號都在告訴學生這些事有意義。
                    </p>
                    <div style={{ fontSize: '11px', color: '#EA580C', fontWeight: '500' }}>
                      → 影響功能：每題解析、loop 進度顯示、結果頁架構
                    </div>
                  </div>

                  {/* Principle 02 */}
                  <div style={{ border: '0.5px solid #EEEEEE', borderRadius: '12px', padding: '24px', backgroundColor: '#FFFFFF', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFF7ED', color: '#534AB7', fontSize: '12px', fontWeight: 'bold' }}>
                      02
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A1A', marginTop: '12px', marginBottom: '8px' }}>
                      用成就系統驅動持續回訪
                    </div>
                    <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#6B6B6B', margin: '0 0 16px 0', flex: 1 }}>
                      導入 XP 積分與聯賽段位系統，將練習結果轉化為可累積可競爭的成就感。
                    </p>
                    <div style={{ fontSize: '11px', color: '#EA580C', fontWeight: '500' }}>
                      → 影響功能：結果頁 XP 結算、段位顯示、排行榜
                    </div>
                  </div>

                  {/* Principle 03 */}
                  <div style={{ border: '0.5px solid #EEEEEE', borderRadius: '12px', padding: '24px', backgroundColor: '#FFFFFF', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFF7ED', color: '#534AB7', fontSize: '12px', fontWeight: 'bold' }}>
                      03
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A1A', marginTop: '12px', marginBottom: '8px' }}>
                      回饋在投入感最高點釋放
                    </div>
                    <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#6B6B6B', margin: '0 0 16px 0', flex: 1 }}>
                      不在每題後打斷節奏，讓學生累積作答動能，一輪結束時統一釋放完整回饋。
                    </p>
                    <div style={{ fontSize: '11px', color: '#EA580C', fontWeight: '500' }}>
                      → 影響功能：loop 長度設定 5/10/15 題
                    </div>
                  </div>

                  {/* Principle 04 */}
                  <div style={{ border: '0.5px solid #EEEEEE', borderRadius: '12px', padding: '24px', backgroundColor: '#FFFFFF', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFF7ED', color: '#534AB7', fontSize: '12px', fontWeight: 'bold' }}>
                      04
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A1A', marginTop: '12px', marginBottom: '8px' }}>
                      學習記錄是資產不是成績單
                    </div>
                    <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#6B6B6B', margin: '0 0 16px 0', flex: 1 }}>
                      錯題庫是還沒解鎖的題目，個人化數據段位歷程都屬於學生自己。
                    </p>
                    <div style={{ fontSize: '11px', color: '#EA580C', fontWeight: '500' }}>
                      → 影響功能：錯題庫、收藏庫、我的頁面
                    </div>
                  </div>
                </div>
              </div>

              {/* XP CALLOUT BOX */}
              <div style={{
                background: '#FFF1E6',
                borderRadius: '10px',
                padding: '20px 24px',
                marginBottom: '48px',
                boxSizing: 'border-box'
              }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#3C3489', marginBottom: '8px' }}>
                  XP 計算邏輯
                </div>
                <div style={{
                  fontFamily: 'monospace',
                  backgroundColor: '#FFF7ED',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#3C3489',
                  display: 'inline-block',
                  marginBottom: '16px'
                }}>
                  Total XP = (基礎得分 + 連擊加成) x 規模倍率 + 任務獎勵
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#534AB7', marginBottom: '16px' }}>
                  <div>⚡ 基礎得分：答對 +10 XP、答錯 +2 XP（保底補償）</div>
                  <div>🔥 連擊加成：3-5 連對 +2 / 6-10 +5 / 11+ +10，失誤歸零</div>
                  <div>✨ 規模倍率：5題 Perfect 1.1x → 15題 Perfect 1.6x</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#A0A0A0', textTransform: 'uppercase', marginRight: '8px' }}>聯賽段位 (懸停查看升級規則)：</span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {/* Bronze */}
                    <div className="group" style={{ position: 'relative', cursor: 'pointer' }}>
                      <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '100px', backgroundColor: '#E8E8E8', color: '#555555', fontWeight: '500' }}>青銅</span>
                      <div className="invisible group-hover:visible" style={{ position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1A1A1A', color: '#FFFFFF', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        青銅：累積至 100 XP 升級白銀
                      </div>
                    </div>
                    {/* Silver */}
                    <div className="group" style={{ position: 'relative', cursor: 'pointer' }}>
                      <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '100px', backgroundColor: '#E8ECF0', color: '#4B6B88', fontWeight: '500' }}>白銀</span>
                      <div className="invisible group-hover:visible" style={{ position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1A1A1A', color: '#FFFFFF', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        白銀：累積至 300 XP 升級黃金
                      </div>
                    </div>
                    {/* Gold */}
                    <div className="group" style={{ position: 'relative', cursor: 'pointer' }}>
                      <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '100px', backgroundColor: '#FDF3DC', color: '#855E0F', fontWeight: '500' }}>黃金</span>
                      <div className="invisible group-hover:visible" style={{ position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1A1A1A', color: '#FFFFFF', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        黃金：累積至 800 XP 升級鑽石
                      </div>
                    </div>
                    {/* Diamond */}
                    <div className="group" style={{ position: 'relative', cursor: 'pointer' }}>
                      <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '100px', backgroundColor: '#FFF7ED', color: '#534AB7', fontWeight: '500' }}>鑽石</span>
                      <div className="invisible group-hover:visible" style={{ position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1A1A1A', color: '#FFFFFF', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        鑽石：排名前 10% 的頂尖聯賽
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* APP ARCHITECTURE */}
              <div style={{ marginBottom: '48px' }}>
                <SubHeading>App 資訊架構</SubHeading>
                <div style={{ overflowX: 'auto', width: '100%', marginBottom: '20px' }}>
                  <div style={{ minWidth: '960px', width: '100%' }}>
                    <svg width="100%" viewBox="0 0 1200 320" style={{ display: 'block', userSelect: 'none', background: 'transparent', fontFamily: 'system-ui' }}>
                      {/* ROOT NODE */}
                      <rect x="500" y="20" width="200" height="44" rx="10" fill="#FAEEDA" stroke="#BA7517" strokeWidth="1" />
                      <text x="600" y="42" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '14px', fontWeight: 'bold', fill: '#412402' }}>
                        Ms Lin App
                      </text>

                      {/* BRANCH LINES (root -> level 2) */}
                      <line x1="600" y1="64" x2="200" y2="114" stroke="#BA7517" strokeWidth="1" fill="none" />
                      <line x1="600" y1="64" x2="600" y2="114" stroke="#888780" strokeWidth="1" fill="none" />
                      <line x1="600" y1="64" x2="1000" y2="114" stroke="#888780" strokeWidth="1" fill="none" />

                      {/* LEVEL 2 NODES */}
                      {/* 主頁 */}
                      <rect x="100" y="114" width="200" height="44" rx="10" fill="#FAEEDA" stroke="#BA7517" strokeWidth="1" />
                      <text x="200" y="136" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '14px', fontWeight: 'bold', fill: '#412402' }}>
                        {lang === 'zh' ? '主頁' : 'Home'}
                      </text>

                      {/* 題庫 */}
                      <rect x="500" y="114" width="200" height="44" rx="10" fill="#F1EFE8" stroke="#888780" strokeWidth="0.5" />
                      <text x="600" y="136" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '14px', fontWeight: 'bold', fill: '#444441' }}>
                        {lang === 'zh' ? '題庫' : 'Library'}
                      </text>

                      {/* 我的 */}
                      <rect x="900" y="114" width="200" height="44" rx="10" fill="#F1EFE8" stroke="#888780" strokeWidth="0.5" />
                      <text x="1000" y="136" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '14px', fontWeight: 'bold', fill: '#444441' }}>
                        {lang === 'zh' ? '我的' : 'Me'}
                      </text>

                      {/* BRANCH LINES (level 2 -> level 3) */}
                      {/* 主頁 children lines */}
                      <line x1="200" y1="158" x2="62" y2="204" stroke="#BA7517" strokeWidth="0.5" fill="none" />
                      <line x1="200" y1="158" x2="200" y2="204" stroke="#BA7517" strokeWidth="0.5" fill="none" />
                      <line x1="200" y1="158" x2="338" y2="204" stroke="#BA7517" strokeWidth="0.5" fill="none" />

                      {/* 題庫 children lines */}
                      <line x1="600" y1="158" x2="525" y2="204" stroke="#888780" strokeWidth="0.5" fill="none" />
                      <line x1="600" y1="158" x2="675" y2="204" stroke="#888780" strokeWidth="0.5" fill="none" />

                      {/* 我的 children lines */}
                      <line x1="1000" y1="158" x2="862" y2="204" stroke="#888780" strokeWidth="0.5" fill="none" />
                      <line x1="1000" y1="158" x2="1000" y2="204" stroke="#888780" strokeWidth="0.5" fill="none" />
                      <line x1="1000" y1="158" x2="1138" y2="204" stroke="#888780" strokeWidth="0.5" fill="none" />

                      {/* LEVEL 3 NODES */}
                      {/* 主頁 Children */}
                      {/* Node A */}
                      <rect x="0" y="204" width="124" height="56" rx="8" fill="#FAEEDA" stroke="#BA7517" strokeWidth="0.5" />
                      <text x="62" y="224" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#412402' }}>
                        {lang === 'zh' ? '拍照解題' : 'Photo Solver'}
                      </text>
                      <text x="62" y="243" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#633806' }}>
                        {lang === 'zh' ? '入口' : 'Entrance'}
                      </text>

                      {/* Node B */}
                      <rect x="138" y="204" width="124" height="56" rx="8" fill="#FAEEDA" stroke="#BA7517" strokeWidth="0.5" />
                      <text x="200" y="224" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#412402' }}>
                        {lang === 'zh' ? '衝刺科目' : 'Exam Subjects'}
                      </text>
                      <text x="200" y="243" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#633806' }}>
                        {lang === 'zh' ? '卡片' : 'Cards'}
                      </text>

                      {/* Node C */}
                      <rect x="276" y="204" width="124" height="56" rx="8" fill="#FAEEDA" stroke="#BA7517" strokeWidth="0.5" />
                      <text x="338" y="224" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#412402' }}>
                        {lang === 'zh' ? '快速進入' : 'Quick Start'}
                      </text>
                      <text x="338" y="243" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#633806' }}>
                        {lang === 'zh' ? '刷題' : 'Practice'}
                      </text>

                      {/* 題庫 Children */}
                      {/* Node D */}
                      <rect x="457" y="204" width="136" height="56" rx="8" fill="#F1EFE8" stroke="#888780" strokeWidth="0.5" />
                      <text x="525" y="224" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#444441' }}>
                        {lang === 'zh' ? '錯題瀏覽' : 'Wrong Qs'}
                      </text>
                      <text x="525" y="243" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#5F5E5A' }}>
                        {lang === 'zh' ? '複習' : 'Review'}
                      </text>

                      {/* Node E */}
                      <rect x="607" y="204" width="136" height="56" rx="8" fill="#F1EFE8" stroke="#888780" strokeWidth="0.5" />
                      <text x="675" y="224" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#444441' }}>
                        {lang === 'zh' ? '收藏題目' : 'Bookmarks'}
                      </text>
                      <text x="675" y="243" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#5F5E5A' }}>
                        {lang === 'zh' ? '瀏覽複習' : 'Browse & Review'}
                      </text>

                      {/* 我的 Children */}
                      {/* Node F */}
                      <rect x="800" y="204" width="124" height="56" rx="8" fill="#F1EFE8" stroke="#888780" strokeWidth="0.5" />
                      <text x="862" y="224" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#444441' }}>
                        XP 值
                      </text>
                      <text x="862" y="243" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#5F5E5A' }}>
                        {lang === 'zh' ? '與等級' : '& Level'}
                      </text>

                      {/* Node G */}
                      <rect x="938" y="204" width="124" height="56" rx="8" fill="#F1EFE8" stroke="#888780" strokeWidth="0.5" />
                      <text x="1000" y="224" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#444441' }}>
                        {lang === 'zh' ? '練習數據' : 'Practice Data'}
                      </text>
                      <text x="1000" y="243" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#5F5E5A' }}>
                        {lang === 'zh' ? '各科正確率' : 'Accuracy Rates'}
                      </text>

                      {/* Node H */}
                      <rect x="1076" y="204" width="124" height="56" rx="8" fill="#F1EFE8" stroke="#888780" strokeWidth="0.5" />
                      <text x="1138" y="224" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#444441' }}>
                        {lang === 'zh' ? '段位' : 'Rank'}
                      </text>
                      <text x="1138" y="243" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#5F5E5A' }}>
                        {lang === 'zh' ? '聯賽排行' : 'League Ranking'}
                      </text>

                      {/* BOTTOM DESCRIPTIONS */}
                      <text x="200" y="296" textAnchor="middle" style={{ fontSize: '12px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '最簡入口，降低摩擦力' : 'Minimal entrance, reducing friction'}
                      </text>
                      <text x="600" y="296" textAnchor="middle" style={{ fontSize: '12px', fill: '#888780', fontWeight: '500' }}>
                        {lang === 'zh' ? '個人錯題資產，提供複習空間' : 'Incorrect question asset for review'}
                      </text>
                      <text x="1000" y="296" textAnchor="middle" style={{ fontSize: '12px', fill: '#888780', fontWeight: '500' }}>
                        {lang === 'zh' ? '段位成就，強化持續黏性' : 'League achievements for retention'}
                      </text>
                    </svg>
                  </div>
                </div>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#6B6B6B', margin: 0 }}>
                  設計上採取「主頁」最簡入口策略，點擊即刷題，降低摩擦力；「題庫」則定義為個人錯題資產，提供複習與反思空間；「我的」頁面則著重於聯賽段位、累積題數與成就回饋，強化持續黏性。
                </p>
              </div>

              {/* USER FLOW */}
              <div style={{ marginBottom: '48px' }}>
                <SubHeading>核心使用者流程</SubHeading>
                <div style={{ overflowX: 'auto', width: '100%', backgroundColor: '#FAFAFD', borderRadius: '12px', padding: '24px', boxSizing: 'border-box' }}>
                  <div style={{ minWidth: '640px', width: '100%' }}>
                    <svg width="100%" viewBox="0 0 680 180" style={{ display: 'block', userSelect: 'none', background: 'transparent', fontFamily: 'system-ui' }}>
                      <defs>
                        <marker id="arrow-flow-indicator" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="context-stroke" />
                        </marker>
                      </defs>

                      {/* NODES */}
                      {/* Node 1 */}
                      <rect x="20" y="40" width="88" height="44" rx="22" fill="#FAEEDA" stroke="#BA7517" strokeWidth="0.5" />
                      <text x="64" y="62" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#412402' }}>
                        {lang === 'zh' ? '首頁' : 'Home'}
                      </text>
                      <text x="64" y="106" textAnchor="middle" style={{ fontSize: '11px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '最短路徑' : 'Shortest Path'}
                      </text>
                      <text x="64" y="122" textAnchor="middle" style={{ fontSize: '11px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '啟動刷題' : 'Start Practice'}
                      </text>

                      {/* Arrow 1->2 */}
                      <line x1="108" y1="62" x2="126" y2="62" stroke="#BA7517" strokeWidth="1" markerEnd="url(#arrow-flow-indicator)" fill="none" />

                      {/* Node 2 */}
                      <rect x="126" y="40" width="100" height="44" rx="22" fill="#FAEEDA" stroke="#BA7517" strokeWidth="0.5" />
                      <text x="176" y="62" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#412402' }}>
                        {lang === 'zh' ? '科目卡片' : 'Subject Cards'}
                      </text>
                      <text x="176" y="106" textAnchor="middle" style={{ fontSize: '11px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '以科目' : 'By Subject'}
                      </text>
                      <text x="176" y="122" textAnchor="middle" style={{ fontSize: '11px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '為單位' : 'As Unit'}
                      </text>

                      {/* Arrow 2->3 */}
                      <line x1="226" y1="62" x2="244" y2="62" stroke="#BA7517" strokeWidth="1" markerEnd="url(#arrow-flow-indicator)" fill="none" />

                      {/* Node 3 */}
                      <rect x="244" y="40" width="100" height="44" rx="22" fill="#FAEEDA" stroke="#BA7517" strokeWidth="0.5" />
                      <text x="294" y="62" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#412402' }}>
                        {lang === 'zh' ? '練習模式' : 'Practice Mode'}
                      </text>
                      <text x="294" y="106" textAnchor="middle" style={{ fontSize: '11px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '給予' : 'Giving'}
                      </text>
                      <text x="294" y="122" textAnchor="middle" style={{ fontSize: '11px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '控制感' : 'Control'}
                      </text>

                      {/* Arrow 3->4 */}
                      <line x1="344" y1="62" x2="362" y2="62" stroke="#BA7517" strokeWidth="1" markerEnd="url(#arrow-flow-indicator)" fill="none" />

                      {/* Node 4 */}
                      <rect x="362" y="40" width="104" height="44" rx="22" fill="#FAEEDA" stroke="#BA7517" strokeWidth="0.5" />
                      <text x="414" y="62" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#412402' }}>
                        {lang === 'zh' ? '五題 Loop' : '5-Question Loop'}
                      </text>
                      <text x="414" y="106" textAnchor="middle" style={{ fontSize: '11px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '累積' : 'Building'}
                      </text>
                      <text x="414" y="122" textAnchor="middle" style={{ fontSize: '11px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '努力成本' : 'Effort Cost'}
                      </text>

                      {/* Arrow 4->5 */}
                      <line x1="466" y1="62" x2="484" y2="62" stroke="#BA7517" strokeWidth="1" markerEnd="url(#arrow-flow-indicator)" fill="none" />

                      {/* Node 5 */}
                      <rect x="484" y="40" width="88" height="44" rx="22" fill="#FAEEDA" stroke="#BA7517" strokeWidth="0.5" />
                      <text x="528" y="62" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#412402' }}>
                        {lang === 'zh' ? '結果頁' : 'Result Page'}
                      </text>
                      <text x="528" y="106" textAnchor="middle" style={{ fontSize: '11px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '投入感' : 'Peak'}
                      </text>
                      <text x="528" y="122" textAnchor="middle" style={{ fontSize: '11px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '最高點' : 'Engagement'}
                      </text>

                      {/* Arrow 5->6 */}
                      <line x1="572" y1="62" x2="590" y2="62" stroke="#BA7517" strokeWidth="1" markerEnd="url(#arrow-flow-indicator)" fill="none" />

                      {/* Node 6 */}
                      <rect x="590" y="40" width="88" height="44" rx="22" fill="#FAEEDA" stroke="#BA7517" strokeWidth="0.5" />
                      <text x="634" y="62" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#412402' }}>
                        {lang === 'zh' ? '再來一輪' : 'Repeat Loop'}
                      </text>
                      <text x="634" y="106" textAnchor="middle" style={{ fontSize: '11px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '明確的' : 'Clear Next'}
                      </text>
                      <text x="634" y="122" textAnchor="middle" style={{ fontSize: '11px', fill: '#854F0B', fontWeight: '500' }}>
                        {lang === 'zh' ? '下一步' : 'Action'}
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </section>

            {/* 04 — Design */}
            <section
              id="design"
              className="py-12 md:py-24 border-b border-gray-100"
              style={{ boxSizing: 'border-box' }}
              onClick={() => setActiveTooltip(null)}
            >
              <ProjectSectionHeader num="04" title={lang === 'zh' ? '設計決策與 UI 展示' : 'Design Decisions & UI Showcase'} />
              <p style={{ fontSize: '15px', color: '#6B6B6B', margin: '0 0 48px 0', lineHeight: '1.6' }}>
                以兩條學習閉環組織設計決策，說明每個功能如何在完整的體驗弧線中發揮作用。
              </p>

              {/* Inject keyframes animation style */}
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes dot-pulse {
                  0% { transform: translate(-50%, -50%) scale(1); }
                  50% { transform: translate(-50%, -50%) scale(1.15); }
                  100% { transform: translate(-50%, -50%) scale(1); }
                }
                @media (prefers-reduced-motion: no-preference) {
                  .annotation-dot-pulse {
                    animation: dot-pulse 2s infinite ease-in-out;
                  }
                }
              `}} />

                                          {/* ONBOARDING SECTION */}
              <div style={{ marginBottom: '80px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <h3 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold font-inter tracking-tight text-[#26215C] leading-none mb-3">
                    Onboarding
                  </h3>
                  <div className="text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-[#7F77DD] tracking-wide uppercase">
                    {lang === 'zh' ? '個人化體驗的起點' : 'Starting Point of Personalized Experience'}
                  </div>
                </div>

                <style dangerouslySetInnerHTML={{__html: `
                  .onboarding-split-container {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                    width: 100%;
                    max-width: 1100px;
                    margin: 0;
                    box-sizing: border-box;
                  }
                  .onboarding-left-col {
                    width: 100%;
                    box-sizing: border-box;
                  }
                  .onboarding-right-col {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    box-sizing: border-box;
                  }
                  @media (min-width: 768px) {
                    .onboarding-split-container {
                      flex-direction: row;
                      gap: 48px;
                    }
                    .onboarding-left-col {
                      flex: 1;
                    }
                    .onboarding-right-col {
                      width: 320px;
                      flex-shrink: 0;
                      position: sticky;
                      top: 120px;
                      align-self: flex-start;
                    }
                  }
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                  .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                  .loop2-arrow::after {
                    content: "→";
                  }
                  @media (max-width: 767px) {
                    .loop2-arrow::after {
                      content: "↓";
                    }
                  }
                `}} />

                {(() => {
                  const onboardingSteps = [
                    {
                      num: '1',
                      title: lang === 'zh' ? '名字稱呼' : 'Preferred Name',
                      desc: lang === 'zh' ? '建立情感連結的基礎，讓之後首頁的問候語有個性化依據。' : 'Lays the foundation for emotional connection, providing a personalized basis for homepage greetings later.'
                    },
                    {
                      num: '2',
                      title: lang === 'zh' ? '身份選擇（會考生 / 學測生）' : 'Identity (CAP / GSAT Student)',
                      desc: lang === 'zh' ? '決定題目範圍與難度的基準。兩種備考情境的重點不同，需要不同的推薦邏輯。' : 'Sets the baseline for question range and difficulty. The focus of these two exam prep scenarios differs, requiring distinct recommendation logic.'
                    },
                    {
                      num: '3',
                      title: lang === 'zh' ? '現在的狀態（年級 ＋ 學習動機）' : 'Current State (Grade + Motivation)',
                      desc: lang === 'zh' ? '三種狀態對應不同的使用優先序：備考衝刺、補強基礎、養成習慣。' : 'Three states correspond to different usage priorities: intensive prep, strengthening fundamentals, or building habits.'
                    },
                    {
                      num: '4',
                      title: lang === 'zh' ? '科目選擇' : 'Subject Selection',
                      desc: lang === 'zh' ? '建立首頁衝刺科目卡片的初始設定，先選重點科目，之後可以再新增。' : 'Initial setup for the homepage prep subject cards. Select key subjects first, with the option to add more later.'
                    },
                    {
                      num: '5',
                      title: lang === 'zh' ? '學習進度（冊 / 章 / 節）' : 'Learning Progress (Volume / Chapter / Section)',
                      desc: lang === 'zh' ? '讓題目推薦對應學生目前的上課進度，避免出現還沒教過的題目。' : "Aligns question recommendations with the student's current class progress, avoiding topics that haven't been taught yet."
                    },
                    {
                      num: '6',
                      title: lang === 'zh' ? 'Ms Lin 出場 ＋ 通知設定' : 'Ms Lin Mascot & Notification',
                      desc: lang === 'zh' 
                        ? '角色刻意在最後一步才登場——用戶完成所有設定、準備開始的時刻看到角色現身，陪伴感更自然。通知設定文案「不然你又忘記了」採用輕量化口吻，CTA「開始吧，別再拖了」對應學生拖延備考的心理。' 
                        : "The mascot is introduced in the very last step—when users finish setup and prepare to start. Seeing the character appear makes companionship feel more natural. The notification copy \"Otherwise you might forget again\" uses a light tone, and the CTA \"Let's start, no more delaying\" addresses students' tendency to procrastinate."
                    }
                  ];

                  return (
                    <div className="onboarding-split-container">
                      {/* Left Column: Text, Design core, Steps list */}
                      <div className="onboarding-left-col">
                        <p style={{
                          fontSize: '15px',
                          lineHeight: '1.8',
                          color: 'var(--color-text-secondary)',
                          marginBottom: '28px',
                          textAlign: 'justify'
                        }}>
                          {lang === 'zh' 
                            ? '大多數學習 App 的 onboarding 是幾張功能說明頁，看完就忘。我們的設計目標不是「介紹功能」，而是在用戶第一次開啟 App 時，就收集足夠的資訊讓首頁體驗感覺像是為他量身設定的。六個步驟的排列順序是刻意設計的——從「你是誰」到「你的目標是什麼」到「你現在在哪裡」，逐步縮小個人化範圍。'
                            : 'Most learning app onboardings are just a few feature introduction pages that users forget immediately. Our design goal is not to "introduce features", but to gather enough information when the user first opens the app to make the homepage experience feel tailor-made. The order of the six steps is carefully designed—from "who you are" to "what your goal is" to "where you are now", gradually narrowing down the personalization scope.'}
                        </p>

                        {/* DESIGN INSIGHT CALLOUT BOX */}
                        <div style={{
                          backgroundColor: '#FAFAFE',
                          borderLeft: '3px solid #7F77DD',
                          borderRadius: '0 var(--border-radius-md) var(--border-radius-md) 0',
                          padding: '12px 16px',
                          margin: '0 0 28px 0'
                        }}>
                          <div style={{
                            fontSize: '10px',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: '#7F77DD',
                            margin: '0 0 5px 0'
                          }}>
                            {lang === 'zh' ? '設計核心' : 'DESIGN INSIGHT'}
                          </div>
                          <p style={{
                            fontSize: '13px',
                            color: 'var(--color-text-secondary)',
                            lineHeight: '1.7',
                            margin: 0
                          }}>
                            {lang === 'zh'
                              ? '六個問題收集的不只是資料，而是幫 App 建立一個足夠精準的用戶模型，讓首頁的科目卡片、題目推薦、問候語，在學生第一次看到時就感覺『這是為我準備的』，而不是一個空白的起點。'
                              : 'These six questions collect more than data—they build a precise user model. This ensures the homepage subject cards, recommendations, and greetings feel tailored from the first glance, rather than showing a generic blank start.'}
                          </p>
                        </div>

                        {/* DESKTOP-ONLY SIX-STEP LIST */}
                        <div className="hidden md:flex" style={{
                          flexDirection: 'column',
                          gap: '4px',
                          backgroundColor: '#F4F4F6',
                          border: '1px solid rgba(0, 0, 0, 0.05)',
                          borderRadius: '24px',
                          padding: '8px',
                          marginBottom: '28px'
                        }}>
                          {onboardingSteps.map((step, idx) => {
                            const isActive = activeOnboardingStep === idx;
                            return (
                              <div 
                                key={idx} 
                                onClick={() => {
                                  setActiveOnboardingStep(idx);
                                  setTimerKey(prev => prev + 1);
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '14px',
                                  padding: '16px 20px',
                                  cursor: 'pointer',
                                  transition: 'all 250ms ease',
                                  backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                                  borderRadius: '16px',
                                  border: isActive ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
                                  boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.03)' : 'none'
                                }}
                              >
                                <div style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '6px',
                                  backgroundColor: isActive ? '#534AB7' : '#E5E7EB',
                                  color: isActive ? '#FFFFFF' : '#8E97A6',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  marginTop: '2px',
                                  transition: 'all 200ms ease'
                                }}>
                                  {step.num}
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: isActive ? '#534AB7' : 'var(--color-text-primary)',
                                    margin: '0 0 4px 0',
                                    transition: 'all 200ms ease'
                                  }}>
                                    {step.title}
                                  </h4>
                                  <p style={{
                                    fontSize: '12px',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: '1.6',
                                    margin: 0
                                  }}>
                                    {step.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* MOBILE-ONLY INTERACTIVE SWITCHER + DETAILS CARD + PREVIEW */}
                        <div className="flex md:hidden flex-col gap-4" style={{ marginBottom: '28px' }}>
                          {/* Horizontal Scrolling Tab Switcher */}
                          <div 
                            className="hide-scrollbar"
                            style={{
                              display: 'flex',
                              gap: '8px',
                              overflowX: 'auto',
                              padding: '4px 0 12px 0',
                              scrollSnapType: 'x mandatory',
                              WebkitOverflowScrolling: 'touch',
                            }}
                          >
                            {onboardingSteps.map((step, idx) => {
                              const isActive = activeOnboardingStep === idx;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setActiveOnboardingStep(idx);
                                    setTimerKey(prev => prev + 1);
                                  }}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '10px 16px',
                                    borderRadius: '9999px',
                                    backgroundColor: isActive ? '#534AB7' : '#E5E7EB',
                                    border: 'none',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    transition: 'all 200ms ease',
                                    scrollSnapAlign: 'start',
                                    boxShadow: isActive ? '0 4px 10px rgba(83, 74, 183, 0.25)' : 'none'
                                  }}
                                >
                                  <span style={{
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    color: isActive ? '#FFFFFF' : '#8E97A6',
                                  }}>
                                    {step.num}
                                  </span>
                                  <span style={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: isActive ? '#FFFFFF' : '#475569',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {step.title.split('（')[0]}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Active Step Details Card */}
                          <div style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            borderRadius: '16px',
                            padding: '16px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
                          }}>
                            <h4 style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: '#534AB7',
                              margin: '0 0 6px 0'
                            }}>
                              {onboardingSteps[activeOnboardingStep].title}
                            </h4>
                            <p style={{
                              fontSize: '12px',
                              color: 'var(--color-text-secondary)',
                              lineHeight: '1.6',
                              margin: 0
                            }}>
                              {onboardingSteps[activeOnboardingStep].desc}
                            </p>
                          </div>

                          {/* Mobile Mockup Preview */}
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            marginTop: '8px'
                          }}>
                            <PhoneMockup style={{ maxWidth: '280px', width: '100%' }} screenStyle={{ display: 'block', padding: 0 }}>
                              <div style={{
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                                transition: 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
                                transform: `translateX(-${activeOnboardingStep * 100}%)`
                              }}>
                                {/* Step 1 */}
                                <div style={{ width: '100%', height: '100%', flexShrink: 0 }}>
                                  <img 
                                    src="projects/mslin-app/screens/onboradinbg-name.jpg" 
                                    alt="Onboarding step 1" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                  />
                                </div>
                                {/* Step 2 */}
                                <div style={{ width: '100%', height: '100%', flexShrink: 0 }}>
                                  <img 
                                    src="projects/mslin-app/screens/onboradinbg-status.jpg" 
                                    alt="Onboarding step 2" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                  />
                                </div>
                                {/* Step 3 */}
                                <div style={{ width: '100%', height: '100%', flexShrink: 0 }}>
                                  <img 
                                    src="projects/mslin-app/screens/onboradinbg-grade.jpg" 
                                    alt="Onboarding step 3" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                  />
                                </div>
                                {/* Step 4 */}
                                <div style={{ width: '100%', height: '100%', flexShrink: 0 }}>
                                  <img 
                                    src="projects/mslin-app/screens/onboradinbg-subject.jpg" 
                                    alt="Onboarding step 4" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                  />
                                </div>
                                {/* Step 5 */}
                                <div style={{ width: '100%', height: '100%', flexShrink: 0 }}>
                                  <img 
                                    src="projects/mslin-app/screens/onboradinbg-subject-rang.jpg" 
                                    alt="Onboarding step 5" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                  />
                                </div>
                                {/* Step 6 */}
                                <div style={{ width: '100%', height: '100%', flexShrink: 0 }}>
                                  <img 
                                    src="projects/mslin-app/screens/onboradinbg-notification.jpg" 
                                    alt="Onboarding step 6" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                  />
                                </div>
                              </div>
                            </PhoneMockup>

                            <div style={{
                              fontSize: '12px',
                              fontWeight: '500',
                              color: 'var(--color-text-secondary)',
                              textAlign: 'center',
                              marginTop: '12px',
                              lineHeight: '1.4'
                            }}>
                              {[
                                lang === 'zh' ? '要怎麼稱呼你？' : 'What should we call you?',
                                lang === 'zh' ? '你現在是什麼身份？' : 'What is your current status?',
                                lang === 'zh' ? '先跟我說說你的狀態' : 'Tell me about your status first',
                                lang === 'zh' ? '選一科最想加強的科目' : 'Choose a subject to strengthen',
                                lang === 'zh' ? '你目前學到哪裡？' : 'Where are you learning now?',
                                lang === 'zh' ? '之後由我陪你慢慢練' : 'I will practice with you later'
                              ][activeOnboardingStep]}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* DESKTOP-ONLY Right Column: Phone Mockup Display with sliding track */}
                      <div className="onboarding-right-col hidden md:flex">
                        <PhoneMockup style={{ maxWidth: '320px', width: '100%' }} screenStyle={{ display: 'block', padding: 0 }}>
                          <div style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            transition: 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
                            transform: `translateX(-${activeOnboardingStep * 100}%)`
                          }}>
                            {/* Step 1 */}
                            <div style={{ width: '100%', height: '100%', flexShrink: 0 }}>
                              <img 
                                src="projects/mslin-app/screens/onboradinbg-name.jpg" 
                                alt="Onboarding step 1" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              />
                            </div>
                            {/* Step 2 */}
                            <div style={{ width: '100%', height: '100%', flexShrink: 0 }}>
                              <img 
                                src="projects/mslin-app/screens/onboradinbg-status.jpg" 
                                alt="Onboarding step 2" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              />
                            </div>
                            {/* Step 3 */}
                            <div style={{ width: '100%', height: '100%', flexShrink: 0 }}>
                              <img 
                                src="projects/mslin-app/screens/onboradinbg-grade.jpg" 
                                alt="Onboarding step 3" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              />
                            </div>
                            {/* Step 4 */}
                            <div style={{ width: '100%', height: '100%', flexShrink: 0 }}>
                              <img 
                                src="projects/mslin-app/screens/onboradinbg-subject.jpg" 
                                alt="Onboarding step 4" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              />
                            </div>
                            {/* Step 5 */}
                            <div style={{ width: '100%', height: '100%', flexShrink: 0 }}>
                              <img 
                                src="projects/mslin-app/screens/onboradinbg-subject-rang.jpg" 
                                alt="Onboarding step 5" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              />
                            </div>
                            {/* Step 6 */}
                            <div style={{ width: '100%', height: '100%', flexShrink: 0 }}>
                              <img 
                                src="projects/mslin-app/screens/onboradinbg-notification.jpg" 
                                alt="Onboarding step 6" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              />
                            </div>
                          </div>
                        </PhoneMockup>

                        {/* Mockup Caption */}
                        <div style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          color: 'var(--color-text-secondary)',
                          textAlign: 'center',
                          marginTop: '12px',
                          lineHeight: '1.4'
                        }}>
                          {[
                            lang === 'zh' ? '要怎麼稱呼你？' : 'What should we call you?',
                            lang === 'zh' ? '你現在是什麼身份？' : 'What is your current status?',
                            lang === 'zh' ? '先跟我說說你的狀態' : 'Tell me about your status first',
                            lang === 'zh' ? '選一科最想加強的科目' : 'Choose a subject to strengthen',
                            lang === 'zh' ? '你目前學到哪裡？' : 'Where are you learning now?',
                            lang === 'zh' ? '之後由我陪你慢慢練' : 'I will practice with you later'
                          ][activeOnboardingStep]}
                        </div>
                      </div>
                    </div>
                  );
                })()}


                {/* Separator between Onboarding and Loop One */}
                <div style={{
                  width: '100%',
                  borderBottom: '0.5px solid var(--color-border-tertiary)',
                  margin: '140px 0'
                }}></div>
              </div>

{/* LOOP ONE HEADER */}
              <div style={{ marginBottom: '48px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <h3 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold font-inter tracking-tight text-[#26215C] leading-none mb-3">
                    {lang === 'zh' ? '閉環一｜刷題閉環' : 'Loop 1 | Practice Loop'}
                  </h3>
                  <div className="text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-[#7F77DD] tracking-wide uppercase">
                    {lang === 'zh' ? '主動練習路徑' : 'Active Practice Path'}
                  </div>
                </div>
                
                <svg viewBox="0 0 520 200" style={{ fontFamily: 'system-ui', display: 'block', margin: '0 auto 24px auto', width: '80%', maxWidth: '520px' }}>
                  <defs>
                    <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#7F77DD" />
                    </marker>
                  </defs>
                  
                  {/* Node 1 */}
                  <rect x="0" y="88" width="128" height="84" rx="16" fill="#EEEDFE" stroke="#7F77DD" strokeWidth="0.5" />
                  <text x="64" y="122" textAnchor="middle" fill="#3C3489" fontSize="14" fontWeight="500">
                    {lang === 'zh' ? 'App 內刷題' : 'In-App Practice'}
                  </text>
                  <text x="64" y="146" textAnchor="middle" fill="#534AB7" fontSize="12">
                    {lang === 'zh' ? '多科互動題型' : 'Interactive Types'}
                  </text>

                  {/* Node 2 */}
                  <rect x="196" y="88" width="128" height="84" rx="16" fill="#EEEDFE" stroke="#7F77DD" strokeWidth="0.5" />
                  <text x="260" y="122" textAnchor="middle" fill="#3C3489" fontSize="14" fontWeight="500">
                    {lang === 'zh' ? '即時解析' : 'Instant Analysis'}
                  </text>
                  <text x="260" y="146" textAnchor="middle" fill="#534AB7" fontSize="12">
                    {lang === 'zh' ? '答案 + 詳解' : 'Answer + Solution'}
                  </text>

                  {/* Node 3 */}
                  <rect x="392" y="88" width="128" height="84" rx="16" fill="#EEEDFE" stroke="#7F77DD" strokeWidth="0.5" />
                  <text x="456" y="122" textAnchor="middle" fill="#3C3489" fontSize="14" fontWeight="500">
                    {lang === 'zh' ? '錯題庫收藏' : 'Incorrect Save'}
                  </text>
                  <text x="456" y="146" textAnchor="middle" fill="#534AB7" fontSize="12">
                    {lang === 'zh' ? '建立學習資產' : 'Build Learning Asset'}
                  </text>

                  {/* Connectors */}
                  <line x1="128" y1="130" x2="192" y2="130" stroke="#7F77DD" strokeWidth="1.5" markerEnd="url(#arrow-purple)" fill="none" />
                  <line x1="324" y1="130" x2="388" y2="130" stroke="#7F77DD" strokeWidth="1.5" markerEnd="url(#arrow-purple)" fill="none" />

                  {/* Return Arc */}
                  <path d="M 520 88 Q 520 40 260 40 Q 0 40 0 88" fill="none" stroke="#AFA9EC" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arrow-purple)" />

                  {/* Return Label */}
                  <text x="260" y="30" textAnchor="middle" fill="#534AB7" fontSize="12">
                    {lang === 'zh' ? '複習強化 ↻' : 'Reinforcement ↻'}
                  </text>
                </svg>

{/* Tab Switcher */}
                <MsLinFeatureTabs lang={lang} />
              </div>

                            {/* Between Loop One and Loop Two */}
              <div style={{ width: '100%', borderBottom: '0.5px solid #EEEEEE', margin: '64px 0' }}></div>
              {/* LOOP TWO HEADER */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <h3 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold font-inter tracking-tight text-[#063D29] leading-none mb-3">
                    {lang === 'zh' ? '閉環二｜複習閉環' : 'Loop 2 | Review Loop'}
                  </h3>
                  <div className="text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-[#1D9E75] tracking-wide uppercase">
                    {lang === 'zh' ? '即時解惑路徑' : 'Instant Solving Path'}
                  </div>
                </div>
                
                {/* SVG Review Loop Diagram */}
                <svg viewBox="0 0 504 200" style={{ fontFamily: 'system-ui', display: 'block', margin: '0 auto', width: '80%', maxWidth: '504px' }}>
                  <defs>
                    <marker id="arrow-teal" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1D9E75" />
                    </marker>
                  </defs>
                  
                  {/* Node 1 */}
                  <rect x="0" y="88" width="148" height="84" rx="16" fill="#E1F5EE" stroke="#1D9E75" strokeWidth="0.5" />
                  <text x="74" y="118" textAnchor="middle" fill="#085041" fontSize="14" fontWeight="500">
                    {lang === 'zh' ? '考卷拍照' : 'Photo Graded Paper'}
                  </text>
                  <text x="74" y="142" textAnchor="middle" fill="#0F6E56" fontSize="12">
                    {lang === 'zh' ? '即時上傳解惑' : 'Instant Explanation'}
                  </text>

                  {/* Node 2 */}
                  <rect x="178" y="88" width="148" height="84" rx="16" fill="#E1F5EE" stroke="#1D9E75" strokeWidth="0.5" />
                  <text x="252" y="118" textAnchor="middle" fill="#085041" fontSize="14" fontWeight="500">
                    {lang === 'zh' ? 'AI 解析' : 'AI Analysis'}
                  </text>
                  <text x="252" y="142" textAnchor="middle" fill="#0F6E56" fontSize="12">
                    {lang === 'zh' ? '辨識 + 詳解' : 'OCR + Solution'}
                  </text>

                  {/* Node 3 */}
                  <rect x="356" y="88" width="148" height="84" rx="16" fill="#E1F5EE" stroke="#1D9E75" strokeWidth="0.5" />
                  <text x="430" y="118" textAnchor="middle" fill="#085041" fontSize="14" fontWeight="500">
                    {lang === 'zh' ? '相似題練習' : 'Similar Practice'}
                  </text>
                  <text x="430" y="142" textAnchor="middle" fill="#0F6E56" fontSize="12">
                    {lang === 'zh' ? '弱點強化' : 'Weakness Reinforcement'}
                  </text>

                  {/* Connectors */}
                  <line x1="148" y1="130" x2="174" y2="130" stroke="#1D9E75" strokeWidth="1.5" markerEnd="url(#arrow-teal)" fill="none" />
                  <line x1="326" y1="130" x2="352" y2="130" stroke="#1D9E75" strokeWidth="1.5" markerEnd="url(#arrow-teal)" fill="none" />

                  {/* Return Arc */}
                  <path d="M 504 88 Q 504 40 252 40 Q 0 40 0 88" fill="none" stroke="#5DCAA5" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arrow-teal)" />

                  {/* Return Label */}
                  <text x="252" y="30" textAnchor="middle" fill="#0F6E56" fontSize="12">
                    {lang === 'zh' ? '加入錯題庫 ↻' : 'Add to Wrong Book ↻'}
                  </text>
                </svg>
              </div>

              {/* FEATURE 2A: 拍照解題 & AI 解析 */}
              <div style={{ marginBottom: '64px' }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: '500',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  backgroundColor: '#E1F5EE',
                  color: '#0F6E56',
                  marginBottom: '12px'
                }}>
                  功能 2A
                </span>
                <SubHeading>
                  {lang === 'zh' ? '拍照解題' : 'Photo Solving'}
                </SubHeading>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#6B6B6B',
                  maxWidth: '680px',
                  margin: '0 0 32px 0',
                  textAlign: 'justify'
                }}>
                  {lang === 'zh' 
                    ? `複習閉環從一個學生最常見的挫折情境出發：考後拿到考卷，有幾題不知道錯在哪裡，但沒有人可以問。傳統的解法是搜尋關鍵字或等老師解說，摩擦力高且不即時。拍照解題降低了這個情境的摩擦力——拍照比輸入文字快，AI 比搜尋引擎更直接。`
                    : `The review loop stems from a common student pain point: receiving a graded paper and not understanding the mistakes, with no one to ask. Traditional solutions like searching online or waiting for teacher explanations are high-friction and slow. Photo solving minimizes this friction—taking a photo is faster than typing, and AI is more direct than search engines.`}
                </p>

                <SubHeading>
                  {lang === 'zh' ? 'AI 解析' : 'AI Analysis'}
                </SubHeading>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#6B6B6B',
                  maxWidth: '680px',
                  margin: '0 0 32px 0',
                  textAlign: 'justify'
                }}>
                  {lang === 'zh' 
                    ? `解析頁面設計了清楚的題目辨識、逐步解題說明，以及「進行相似題練習」的主要 CTA，讓學生不只是「看懂答案」。`
                    : `The analysis page features clear question recognition, step-by-step solutions, and a primary "Practice Similar Questions" CTA, ensuring students don't just "see" the answer but actually learn it.`}
                </p>

                {/* THREE-STEP FLOW VISUAL */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '0 16px',
                  margin: '32px 0 24px 0'
                }}>
                  {/* Frame 1 */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '240px' }}>
                    <PhoneMockup screenStyle={{ backgroundColor: '#D8F0E8' }} />
                    <span style={{ fontSize: '12px', color: '#6B6B6B', textAlign: 'center', fontWeight: '500' }}>
                      {lang === 'zh' ? '拍照上傳' : 'Upload Photo'}
                    </span>
                  </div>

                  {/* Arrow 1 */}
                  <div style={{ color: '#0F6E56', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    →
                  </div>

                  {/* Frame 2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '240px' }}>
                    <PhoneMockup screenStyle={{ backgroundColor: '#D8F0E8' }} />
                    <span style={{ fontSize: '12px', color: '#6B6B6B', textAlign: 'center', fontWeight: '500' }}>
                      {lang === 'zh' ? 'AI 解析結果' : 'AI Analysis'}
                    </span>
                  </div>

                  {/* Arrow 2 */}
                  <div style={{ color: '#0F6E56', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    →
                  </div>

                  {/* Frame 3 */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '240px' }}>
                    <PhoneMockup screenStyle={{ backgroundColor: '#D8F0E8' }} />
                    <span style={{ fontSize: '12px', color: '#6B6B6B', textAlign: 'center', fontWeight: '500' }}>
                      {lang === 'zh' ? '相似題練習' : 'Similar Practice'}
                    </span>
                  </div>
                </div>

                <p style={{
                  fontSize: '14px',
                  color: '#6B6B6B',
                  lineHeight: '1.7',
                  maxWidth: '680px',
                  margin: '16px 0 0 0',
                  textAlign: 'justify'
                }}>
                  {lang === 'zh'
                    ? `這條路徑的設計核心是降低解惑門檻、延伸學習深度：拍照→即時解析把解惑的摩擦力降到最低；解析→相似題把「看懂」延伸成「會做」；相似題結果→錯題庫把複習閉環接回共用資產系統。`
                    : `The design core of this path is to lower the barrier to solving queries and extend learning depth: Photo → Instant Analysis reduces friction to a minimum; Analysis → Similar Questions bridges "understanding" to "doing"; Similar Results → Incorrect Library links the review loop back to the shared asset system.`}
                </p>
              </div>

              {/* SHARED SYSTEM NOTE */}
              <div style={{
                background: '#FAEEDA',
                borderRadius: '12px',
                padding: '16px 24px',
                marginTop: '48px',
                borderLeft: '4px solid #BA7517',
                boxSizing: 'border-box'
              }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#412402', marginBottom: '8px' }}>
                  {lang === 'zh' ? '兩條閉環的匯流點' : 'Convergence Point of the Two Loops'}
                </div>
                <div style={{ fontSize: '13px', color: '#633806', lineHeight: '1.7', textAlign: 'justify' }}>
                  {lang === 'zh'
                    ? `不論從哪條閉環進入，最終都匯流至同一套個人學習資產系統——XP 累積、段位記錄、錯題庫、收藏庫。這讓兩條路徑互相強化：刷題閉環建立廣度，複習閉環補強弱點，共同構成完整的學習飛輪。`
                    : `Regardless of which loop students enter from, they ultimately converge on the same personal learning asset system—accumulating XP, tier records, incorrect question library, and saved library. This allows both paths to reinforce each other: the practice loop builds breadth, while the review loop strengthens weaknesses, jointly forming a complete learning flywheel.`}
                </div>
              </div>
              {/* Divider between Feature 3 and Visual Design System */}
              <div style={{ width: '100%', borderBottom: '0.5px solid #EEEEEE', margin: '64px 0' }}></div>

              {/* VISUAL DESIGN SYSTEM */}
              <div>
                <SubHeading>視覺設計系統</SubHeading>

                {/* COLOR SYSTEM */}
                <div style={{ marginBottom: '48px' }}>
                  <SubHeading>色彩系統</SubHeading>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginBottom: '32px' }}>
                    {[
                      {
                        title: 'Neutral',
                        rows: [
                          [
                            { name: 'neutral / 0', bg: '#FFFFFF', text: '#FFFFFF', textColor: '#0F172A', hasBorder: true },
                            { name: 'neutral / 100', bg: '#FBFBFB', text: '#FBFBFB', textColor: '#0F172A', hasBorder: true },
                            { name: 'neutral / 200', bg: '#EFEFEF', text: '#EFEFEF', textColor: '#0F172A' },
                            { name: 'neutral / 300', bg: '#E6E6E6', text: '#E6E6E6', textColor: '#0F172A' },
                            { name: 'neutral / 400', bg: '#CCCCCC', text: '#CCCCCC', textColor: '#FFFFFF' },
                            { name: 'neutral / 500', bg: '#BFBFBF', text: '#BFBFBF', textColor: '#FFFFFF' },
                            { name: 'neutral / 600', bg: '#A4A4A4', text: '#A4A4A4', textColor: '#FFFFFF' },
                            { name: 'neutral / 700', bg: '#5E5E5E', text: '#5E5E5E', textColor: '#FFFFFF' },
                            { name: 'neutral / 800', bg: '#000000', text: '#000000', textColor: '#FFFFFF' }
                          ]
                        ]
                      },
                      {
                        title: 'Primary',
                        rows: [
                          [
                            { name: 'Primary/100', bg: '#EEEEFF', text: 'EEEEEF', textColor: '#2525A4' },
                            { name: 'Primary/200', bg: '#E2E2FF', text: '#E2E2FF', textColor: '#2525A4' },
                            { name: 'Primary/300', bg: '#CDCDFF', text: '#CDCDFF', textColor: '#2525A4' },
                            { name: 'Primary/400', bg: '#A9A9FF', text: '#A9A9FF', textColor: '#FFFFFF' },
                            { name: 'Primary/500', bg: '#7878FF', text: '#7878FF', textColor: '#FFFFFF' },
                            { name: 'Primary/600', bg: '#5858EA', text: '#5858EA', textColor: '#FFFFFF' },
                            { name: 'Primary/700', bg: '#2525A4', text: '#2525A4', textColor: '#FFFFFF' }
                          ]
                        ]
                      },
                      {
                        title: 'Functional',
                        rows: [
                          [
                            { name: 'Incorrect/200', bg: '#FFE1E8', text: '#FFE1E8', textColor: '#8E3148' },
                            { name: 'Incorrect/400', bg: '#FF8AA4', text: '#FF8AA4', textColor: '#FFFFFF' },
                            { name: 'Incorrect/600', bg: '#8E3148', text: '#8E3148', textColor: '#FFFFFF' }
                          ],
                          [
                            { name: 'Correct/200', bg: '#C7F1E8', text: '#C7F1E8', textColor: '#2D5B4F' },
                            { name: 'Correct/400', bg: '#4F8479', text: '#4F8479', textColor: '#FFFFFF' },
                            { name: 'Correct/600', bg: '#2D5B4F', text: '#4F8479', textColor: '#FFFFFF' }
                          ]
                        ]
                      },
                      {
                        title: 'Other colors',
                        rows: [
                          [
                            { name: 'Gold/100', bg: '#FFEFA0', text: '#FFEFA0', textColor: '#C4A820' },
                            { name: 'Gold/300', bg: '#FFDE3F', text: '#FFDE3F', textColor: '#C4A820' },
                            { name: 'Gold/600', bg: '#C4A820', text: '#C4A820', textColor: '#FFFFFF' }
                          ],
                          [
                            { name: 'Bronze/100', bg: '#FFE1C3', text: '#FFE1C3', textColor: '#994C00' },
                            { name: 'Bronze/300', bg: '#D26800', text: '#D26800', textColor: '#FFFFFF' },
                            { name: 'Bronze/600', bg: '#994C00', text: '#994C00', textColor: '#FFFFFF' }
                          ]
                        ]
                      }
                    ].map((group, groupIndex) => (
                      <div key={groupIndex}>
                        <h5 style={{
                          fontSize: '32px',
                          fontWeight: '700',
                          color: '#0F172A',
                          margin: '0 0 24px 0',
                          fontFamily: "'Inter', sans-serif",
                          letterSpacing: '-0.02em'
                        }}>
                          {group.title}
                        </h5>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                          {group.rows.map((row, rowIndex) => (
                            <div key={rowIndex} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                              {row.map((item, itemIndex) => (
                                <div key={itemIndex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '90px' }}>
                                  <span style={{
                                    fontSize: '11px',
                                    color: '#64748B',
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: '500',
                                    marginBottom: '6px',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {item.name}
                                  </span>
                                  <div style={{
                                    width: '90px',
                                    height: '52px',
                                    borderRadius: '8px',
                                    backgroundColor: item.bg,
                                    border: item.hasBorder ? '1px solid #E2E8F0' : 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxSizing: 'border-box'
                                  }}>
                                    <span style={{
                                      fontSize: '11px',
                                      color: item.textColor,
                                      fontWeight: '600',
                                      fontFamily: "'Inter', sans-serif"
                                    }}>
                                      {item.text}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <p style={{
                    fontSize: '13px',
                    color: '#6B6B6B',
                    lineHeight: '1.7',
                    maxWidth: '680px',
                    margin: '32px 0 0 0'
                  }}>
                    色彩系統以溫和且具備高識別度的紫色（Primary）作為品牌核心，象徵學習的專注與智慧。輔助色（Success、Error、Warning）主要用於即時作答回饋與狀態提示，確保訊息傳達的直覺性。中性色（Text、Border、Surface）則構建出清晰的資訊階層，為學生在長時間的刷題練習中提供舒適、無干擾的視覺環境。
                  </p>
                </div>

                {/* CHARACTER DESIGN */}
                <div style={{ marginBottom: '48px' }}>
                  <SubHeading>
                    插圖與角色設計
                    <span style={{
                      fontSize: '11px',
                      color: '#854F0B',
                      backgroundColor: '#FAEEDA',
                      borderRadius: '20px',
                      padding: '2px 10px',
                      fontWeight: '500',
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginLeft: '12px',
                      verticalAlign: 'middle',
                      textTransform: 'none'
                    }}>
                      角色設計迭代中 ▲
                    </span>
                  </SubHeading>

                  <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '16px', width: '100%', boxSizing: 'border-box' }}>
                    {/* Left block */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '300px' }}>
                      <div style={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        borderRadius: '12px',
                        backgroundColor: '#FFF1E6',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(0,0,0,0.02)',
                        boxSizing: 'border-box'
                      }}>
                        <span style={{ fontSize: '12px', color: '#EA580C', fontWeight: '500' }}>[ 角色插圖占位 ]</span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#6B6B6B', textAlign: 'center' }}>
                        Ms Lin 角色插圖
                      </span>
                    </div>

                    {/* Right block */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '300px' }}>
                      <div style={{
                        width: '100%',
                        aspectRatio: '9 / 19.5',
                        borderRadius: '28px',
                        border: '6px solid #000000',
                        backgroundColor: '#D0CCEA',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: '500' }}>[ 首頁情境模擬 ]</span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#6B6B6B', textAlign: 'center', lineHeight: '1.4' }}>
                        角色於首頁的情境使用
                      </span>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '13px',
                    color: '#6B6B6B',
                    lineHeight: '1.7',
                    maxWidth: '680px',
                    margin: '0'
                  }}>
                    為了降低刷題帶來的枯燥與焦慮感，我們設計了親切的角色「Ms Lin」作為學生的學習夥伴。角色不僅出現在 Onboarding 引導與首頁，更會在學生達成連勝或突破記錄時給予即時鼓勵，將冷冰冰的練習轉化為有溫度的陪伴體驗。
                  </p>
                </div>

                {/* COMPONENT SYSTEM */}
                <div style={{ marginBottom: '32px' }}>
                  <SubHeading>元件系統</SubHeading>
                  <p style={{
                    fontSize: '13px',
                    color: '#6B6B6B',
                    lineHeight: '1.7',
                    maxWidth: '680px',
                    margin: '0 0 16px 0'
                  }}>
                    元件系統定義了整個應用中所有按鈕、輸入框、狀態標籤及卡片模組的設計規格與互動狀態。所有元件均符合 Figma 設計標記（Design Tokens），確保設計與開發的高度一致性，並在極小化程式碼重複的同時提升應用程式的渲染效能。
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
                    {/* 1. Buttons (col-span-1) */}
                    {renderCard(buttonComp, 'col-span-1 min-h-[200px]')}

                    {/* 2. Vertical Stack (Inputs & Forms + Navigation Bar) (col-span-1) */}
                    <div className="col-span-1 flex flex-col gap-4 md:gap-6 h-full">
                      {renderCard(inputComp, 'flex-1')}
                      {renderCard(navComp, 'flex-1')}
                    </div>

                    {/* 3. Dropdowns & Menus (col-span-1) */}
                    {renderCard(dropdownComp, 'col-span-1 min-h-[200px]')}

                    {/* 4. Subject Cards (col-span-1) */}
                    {renderCard(subjectComp, 'col-span-1 min-h-[200px]')}

                    {/* 5. Progress Bar and Step Indicator (col-span-1) */}
                    {renderCard(cardsComp, 'col-span-1 min-h-[200px]')}

                    {/* 6. Accordion (col-span-1) */}
                    {renderCard(accordionComp, 'col-span-1 min-h-[200px]')}
                  </div>
                </div>
              </div>
            </section>

            {/* 05 — Outcomes */}
            <section
              id="outcomes"
              className="py-12 md:py-24 border-b border-gray-100"
              style={{
                minHeight: '600px',
                boxSizing: 'border-box'
              }}
            >
              <ProjectSectionHeader num="05" title={lang === 'zh' ? '成果與反思' : 'Outcomes & Reflections'} />

              {/* HYPOTHESIS VALIDATION */}
              <div style={{ marginBottom: '64px' }}>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#6B6B6B',
                  maxWidth: '680px',
                  margin: '0 0 32px 0'
                }}>
                  初版上線後，我們進行了問卷調查與使用者訪談，以下是三個核心假設的驗證結果：
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '16px', marginBottom: '32px' }}>
                  {[
                    {
                      title: "五題 Loop",
                      status: "✓ 已驗證",
                      body: "使用者回饋「做完一輪有踏實感」、「五題剛好不會太累」，驗證了 loop 長度臨界點的判斷。"
                    },
                    {
                      title: "步驟解題",
                      status: "✓ 已驗證",
                      body: "多位使用者表示「比直接看答案更有幫助」、「感覺是自己想出來的」，與 Scaffolding 理論預期一致。"
                    },
                    {
                      title: "錯題庫",
                      status: "✓ 仍有優化空間",
                      body: "使用者普遍喜歡錯題庫，「有一個地方記著錯題讓我比較安心」。後續迭代加強複習引導。"
                    }
                  ].map((card, idx) => (
                    <div key={idx} style={{
                      border: '0.5px solid #EEEEEE',
                      borderRadius: '12px',
                      padding: '20px 24px',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: '#1A1A1A' }}>{card.title}</span>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            backgroundColor: '#E1F5EE',
                            color: '#085041'
                          }}>
                            {card.status}
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#6B6B6B', lineHeight: '1.7', margin: 0 }}>
                          {card.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* USER QUOTES */}
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '16px', marginBottom: '64px' }}>
                {[
                  { quote: "做完一輪有踏實感，五題剛好不會太累。", author: "— 高三 施同學" },
                  { quote: "感覺是自己想出來的，不是看答案。", author: "— 高二 林同學" },
                  { quote: "有一個地方記著錯題讓我比較安心。", author: "— 國三 張同學" }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#FFF1E6',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(127,119,221,0.03)'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '40px',
                        color: '#EA580C',
                        lineHeight: '0.8',
                        display: 'block',
                        fontFamily: 'Georgia, serif',
                        marginBottom: '4px'
                      }}>
                        “
                      </span>
                      <p style={{
                        fontSize: '16px',
                        fontStyle: 'italic',
                        color: '#26215C',
                        lineHeight: '1.6',
                        margin: '0 0 12px 0',
                        fontWeight: '500'
                      }}>
                        {item.quote}
                      </p>
                    </div>
                    <span style={{ fontSize: '13px', color: '#534AB7', fontWeight: '500' }}>
                      {item.author}
                    </span>
                  </div>
                ))}
              </div>

              {/* ITERATION 1 — 角色設計 */}
              <div style={{ marginBottom: '64px' }}>
                <SubHeading>
                  <span style={{
                    fontSize: '11px',
                    color: '#854F0B',
                    backgroundColor: '#FAEEDA',
                    borderRadius: '20px',
                    padding: '2px 10px',
                    fontWeight: '500',
                    marginRight: '12px',
                    verticalAlign: 'middle',
                    textTransform: 'none'
                  }}>
                    迭代案例
                  </span>
                  角色設計｜部分回饋不滿意 → 正在迭代
                </SubHeading>
                <p style={{
                  fontSize: '14px',
                  color: '#6B6B6B',
                  lineHeight: '1.6',
                  maxWidth: '680px',
                  margin: '0 0 20px 0'
                }}>
                  情感設計的目標是降低學習時的心理阻力，而非讓視覺元素主導整個應用的調性。初版上線後，部分使用者反應角色插圖在答題頁面的面積過大、容易分散注意力。我們正在進行第二版迭代，降低角色視覺佔比與出現頻率，使其更融入背景。
                </p>

                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%', maxWidth: '300px' }}>
                    <div style={{
                      width: '100%',
                      aspectRatio: '220 / 140',
                      borderRadius: '12px',
                      backgroundColor: '#F5F5F5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(0,0,0,0.02)',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{ fontSize: '12px', color: '#A0A0A0' }}>[ 初版角色設計 ]</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#6B6B6B', textAlign: 'center' }}>
                      Before — 初版角色設計
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%', maxWidth: '300px' }}>
                    <div style={{
                      width: '100%',
                      aspectRatio: '220 / 140',
                      borderRadius: '12px',
                      backgroundColor: '#FFF1E6',
                      border: '1.5px dashed #F97316',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{ fontSize: '12px', color: '#EA580C', fontWeight: '500' }}>[ 降低角色存在感 ]</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#6B6B6B', textAlign: 'center' }}>
                      After — 迭代方向（進行中）
                    </span>
                  </div>
                </div>
              </div>

              {/* REFLECTION LIST */}
              <div>
                <SubHeading>如果重來，我會⋯</SubHeading>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {[
                    {
                      num: "01",
                      title: "更早進行使用者訪談",
                      desc: "在專案最初期即使僅進行 3-5 人的小規模快速訪談，也能過濾掉許多明顯的方向問題，避免中後期重構基本假設的成本。"
                    },
                    {
                      num: "02",
                      title: "在結果頁投入更多設計資源",
                      desc: "刷題 Loop 的結束點（結果頁與成就結算頁）是學習成就感釋放的最關鍵節點。未來應在此處設計更細緻的微互動與動態效果，提升努力的重量。"
                    },
                    {
                      num: "03",
                      title: "更早建立設計系統",
                      desc: "前期因為開發時程緊迫，部分元件採取一次性設計，導致後續迭代時產生視覺與互動邏輯的不一致。提早規範 Design Tokens 是確保專案可擴充性的關鍵。"
                    }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#EA580C', lineHeight: '1' }}>
                        {item.num}
                      </div>
                      <div>
                        <h5 style={{ fontSize: '15px', fontWeight: '500', color: '#1A1A1A', margin: '0 0 4px 0' }}>
                          {item.title}
                        </h5>
                        <p style={{ fontSize: '14px', color: '#6B6B6B', margin: 0, lineHeight: '1.6', maxWidth: '640px' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>



          {/* FLOATING PROGRESS DOTS (desktop only, right side) */}
          <div 
            className="hidden md:flex"
            style={{
              position: 'fixed',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              zIndex: 100
            }}
          >
            {/* Thin vertical line connecting 5 dots */}
            <div style={{
              position: 'absolute',
              top: '8px',
              bottom: '8px',
              width: '1px',
              backgroundColor: '#EEEEEE',
              zIndex: -1
            }}></div>

            {sections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    display: 'block',
                    width: isActive ? '8px' : '6px',
                    height: isActive ? '8px' : '6px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#F97316' : '#FFFFFF',
                    border: isActive ? 'none' : '1px solid #DDDDDD',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  title={sec.name}
                />
              );
            })}
          </div>

          {/* Component Detail Modal */}
          {selectedComponent && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedComponent(null)}>
              <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100">
                  <h3 className="text-2xl font-bold font-inter text-gray-900">
                    {selectedComponent.name} {lang === 'zh' ? '規格資訊' : 'Specs'}
                  </h3>
                  <button onClick={() => setSelectedComponent(null)} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900 cursor-pointer">
                    <IconX className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 md:p-10 overflow-y-auto bg-[#FAFAFA] flex-1 flex items-center justify-center min-h-[50vh]">
                  {selectedComponent.specsImg ? (
                    <img src={selectedComponent.specsImg} alt={`${selectedComponent.name} Specs`} className="w-full h-auto object-contain max-h-[70vh] rounded-xl shadow-sm border border-gray-200" />
                  ) : (
                    <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-gray-200/50 shadow-inner flex flex-col items-center justify-center max-w-md mx-auto">
                      <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange-500 animate-pulse">
                        <IconSearch className="w-8 h-8" />
                      </div>
                      <p className="font-bold text-gray-800 text-lg mb-2">
                        {lang === 'zh' ? '規格資訊即將推出' : 'Specs details coming soon'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {lang === 'zh' ? '我們正在整理此元件的詳細設計規格書，敬請期待。' : 'We are preparing the detailed design specs for this component. Stay tuned.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

    const GenericUIUXProjectView = ({ activeItem, lang, transitionTo, setCurrentPage, setActiveItem, setIsMobileMenuOpen, navigateTo }) => {
      const isApp = activeItem.platform === 'app';
      const hasMascot = activeItem.mascotDesign && activeItem.mascotDesign.description;
      let sectionIndex = 1;
      const getSectionNum = () => String(sectionIndex++).padStart(2, '0');
      const [selectedComponent, setSelectedComponent] = useState(null);
      const [activeScreenTabs, setActiveScreenTabs] = useState({});
      const [activeDecisionTab, setActiveDecisionTab] = useState('long-page');
      const [isDecisionFading, setIsDecisionFading] = useState(false);
      const [activeChip, setActiveChip] = useState('hero');
      const [videoState, setVideoState] = useState('none'); // 'none' | 'playing' | 'ended'
      const [isDesktopScrollActive, setIsDesktopScrollActive] = useState(false);
      const [isMobileScrollActive, setIsMobileScrollActive] = useState(false);
      const videoRef = useRef(null);
      const containerRef = useRef(null);
      const heroRef = useRef(null);
      const servicesRef = useRef(null);
      const valuesRef = useRef(null);
      const successRef = useRef(null);
      const ctaRef = useRef(null);
      const aboutRef = useRef(null);
      const contactRef = useRef(null);
      const footerRef = useRef(null);

      const sectionRefs = {
        hero: heroRef,
        services: servicesRef,
        values: valuesRef,
        success: successRef,
        cta: ctaRef,
        about: aboutRef,
        contact: contactRef,
        footer: footerRef
      };

      const mobileContainerRef = useRef(null);
      const mobileTabsContainerRef = useRef(null);
      const mHeroRef = useRef(null);
      const mServicesRef = useRef(null);
      const mValuesRef = useRef(null);
      const mSuccessRef = useRef(null);
      const mCtaRef = useRef(null);
      const mAboutRef = useRef(null);

      const mSectionRefs = {
        hero: mHeroRef,
        services: mServicesRef,
        values: mValuesRef,
        success: mSuccessRef,
        cta: mCtaRef,
        about: mAboutRef,
        contact: mAboutRef,
        footer: mAboutRef
      };

      useEffect(() => {
        if (videoState === 'none') {
          // Scroll desktop mockup
          const target = sectionRefs[activeChip]?.current;
          const container = containerRef.current;
          if (target && container) {
            const timer1 = setTimeout(() => {
              container.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
              });
            }, 50);
            
            // Scroll mobile mockup
            const mTarget = mSectionRefs[activeChip]?.current;
            const mContainer = mobileContainerRef.current;
            if (mTarget && mContainer) {
              const timer2 = setTimeout(() => {
                let scrollOffset = mTarget.offsetTop;
                if (activeChip === 'contact') {
                  scrollOffset += mTarget.clientHeight * 0.38;
                } else if (activeChip === 'footer') {
                  scrollOffset += mTarget.clientHeight * 0.72;
                }
                mContainer.scrollTo({
                  top: scrollOffset,
                  behavior: 'smooth'
                });
              }, 50);
              return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
              };
            }
            return () => clearTimeout(timer1);
          }
        }
      }, [activeChip, videoState]);

      const handleDecisionTabChange = (tabId) => {
        setActiveDecisionTab(prev => prev === tabId ? null : tabId);
      };
      const [wisdomeOverviewRef, wisdomeOverviewVisible] = useOnScreen({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      const [wisdomeStrategyRef, wisdomeStrategyVisible] = useOnScreen({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      const [cisLogoRef, cisLogoVisible] = useOnScreen({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      const [cisColorRef, cisColorVisible] = useOnScreen({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      const [cisFontRef, cisFontVisible] = useOnScreen({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      const [cisCompareRef, cisCompareVisible] = useOnScreen({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      const [reflectionRef, reflectionVisible] = useOnScreen({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

      const REFLECTION_CARDS = [
        {
          title: { zh: '做得好的地方', en: 'What Went Well' },
          desc: {
            zh: '成功透過模組化設計將複雜的 AI 排課與教務系統轉化為直覺的卡片式介面，大幅降低非技術背景用戶的學習曲線；同時，首頁首屏的 3 秒黃金痛點文案定位精準，使試用轉化率提升了 35%。',
            en: 'Successfully simplified complex AI scheduling features into intuitive modular cards, lowering the learning curve. The 3-second value proposition on the hero page drove a 35% increase in trial sign-ups.'
          },
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          ),
          iconBg: 'bg-teal-50',
          iconColor: 'text-teal-600'
        },
        {
          title: { zh: '如果重來會改什麼', en: 'What to Change if Redone' },
          desc: {
            zh: '部分頁面長度仍偏長，若能重來，會更早引入摺疊面板（Accordion）或進度指示器，幫助用戶快速預覽整體資訊框架；此外，也應在初期設計中加入深色模式適配，以因應教務人員長時間在低光環境下使用的需求。',
            en: 'Some page scrolls are still too long. If redone, we would introduce accordions earlier. We would also plan for a dark mode layout to reduce eye strain for school staff during late-night admin work.'
          },
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          ),
          iconBg: 'bg-amber-50',
          iconColor: 'text-amber-600'
        },
        {
          title: { zh: '想驗證的假設', en: 'Hypotheses to Validate' },
          desc: {
            zh: '假設在核心功能卡片中加入「即時互動預覽」或「動態模擬排課」組件，能夠進一步激發校長用戶對系統實用性與直覺感的興趣，並將線上預約諮詢的按鈕點擊率提升 20% 以上。',
            en: 'We hypothesize that embedding a live interactive scheduling sandbox directly in the feature overview will spark higher interest and increase demo booking clicks by over 20%.'
          },
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v1.244c0 .593-.193 1.17-.552 1.637l-3.3 4.293a6.75 6.75 0 1 0 12.204 0l-3.3-4.293a2.75 2.75 0 0 1-.552-1.637V3.104m-4.5 0H14.25M9 7.5h6" />
            </svg>
          ),
          iconBg: 'bg-purple-50',
          iconColor: 'text-purple-600'
        },
        {
          title: { zh: '下一版方向', en: 'Next Steps' },
          desc: {
            zh: '開發高度自定義的個人化教務儀表板，支援小工具拖拽排版；同時，針對跨校區連鎖機構引入多校區管理視圖，並與第三方通訊軟體（如 LINE/Slack）進行深度通知整合，提供即時的排課變動推播。',
            en: 'Build a customizable dashboard with drag-and-drop widgets. Introduce multi-campus management views for larger chains and integrate instant LINE/Slack notifications for schedule updates.'
          },
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          ),
          iconBg: 'bg-rose-50',
          iconColor: 'text-[#FF7A59]'
        }
      ];

      return (
        <div className="bg-white animate-in fade-in duration-700 min-h-screen pb-32 w-full">
          <div className="pt-32 md:pt-36 px-4 md:px-12 max-w-[100rem] mx-auto">
            <BackButton transitionTo={transitionTo} setCurrentPage={setCurrentPage} setActiveItem={setActiveItem} setIsMobileMenuOpen={setIsMobileMenuOpen} lang={lang} />
            <h1 
              className="text-gray-900 font-extrabold tracking-[-2px] leading-[0.95] mb-0 select-none font-inter uppercase" 
              style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
            >
              {t(activeItem.title, lang)}
            </h1>
          </div>

          {/* METADATA ROW */}
          <div className="max-w-[100rem] mx-auto px-4 md:px-12 pt-5 pb-5 flex flex-wrap items-center text-[13px] text-gray-500 leading-relaxed gap-2 select-none">
            <span>{lang === 'zh' ? 'UI/UX 設計師' : 'UI/UX Designer'}</span>
            <span className="h-3 w-[1px] bg-gray-200 hidden sm:inline-block"></span>
            <span>{lang === 'zh' ? '動態設計師' : 'Motion Designer'}</span>
            <span className="h-3 w-[1px] bg-gray-200 hidden sm:inline-block"></span>
            <span>2023 — 2024</span>
            <span className="h-3 w-[1px] bg-gray-200 hidden sm:inline-block"></span>
            <span>Web Design</span>
          </div>

          {/* Hero Section */}
          {activeItem.heroMedia && (
            <div className="w-full mb-16 md:mb-24 bg-[#F6F6F6] relative flex items-center justify-center overflow-hidden mt-6 md:mt-8">
              {activeItem.heroMedia.type === 'video' ?
                <div className="w-full h-auto z-10">
                  <OptimizedVideo src={activeItem.heroMedia.url} className="w-full h-auto" />
                </div> :
                <img src={activeItem.heroMedia.url} className="w-full h-auto block object-contain z-10" alt={t(activeItem.title, lang)} onError={(e) => e.target.style.display = 'none'} />
              }
            </div>
          )}

          {/* 01 Project Overview */}
          {activeItem.projectOverview && (
            <div className="max-w-[100rem] mx-auto px-4 md:px-12 mb-24 md:mb-40 mt-12">
              <ProjectSectionHeader num={getSectionNum()} title={I18N[lang].project.overview} />
              
              {activeItem.id === 1 ? (
                // Wisdome.ai Custom Project Overview
                <div 
                  ref={wisdomeOverviewRef}
                  className="space-y-12"
                >
                  {/* Layer 1 — Core question callout (top of section) */}
                  <div 
                    className={`p-6 md:p-10 transition-all duration-[800ms] ease-out transform ${
                      wisdomeOverviewVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      borderLeft: '3px solid #F97316',
                      background: '#FFF7ED', // light orange
                      borderRadius: '0 16px 16px 0',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3">
                      {t({ zh: '核心設計問題', en: 'Core Design Question' }, lang)}
                    </div>
                    <p className="text-xl md:text-3xl font-bold text-gray-900 leading-relaxed font-sans">
                      {t({
                        zh: '如何讓不熟悉 AI 工具的教育機構決策者，在首次造訪時快速理解價值主張、建立信任，並主動採取諮詢行動？',
                        en: 'How can we enable educational decision-makers unfamiliar with AI to quickly grasp the value proposition, establish trust, and proactively book a demo on their first visit?'
                      }, lang)}
                    </p>
                  </div>

                  {/* Layer 2 — Info cards row (directly below the callout) */}
                  <div 
                    className={`grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-[800ms] delay-100 ease-out transform ${
                      wisdomeOverviewVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {[
                      { label: { zh: '角色', en: 'Role' }, value: { zh: 'UX 設計師 · 獨立執行', en: 'UX Designer · Solo Practitioner' } },
                      { label: { zh: '時程', en: 'Timeline' }, value: { zh: '2023–2024', en: '2023–2024' } },
                      { label: { zh: '工具', en: 'Tools' }, value: { zh: 'Tools' }, displayVal: 'Framer' },
                      { label: { zh: '產業', en: 'Industry' }, value: { zh: 'B2B SaaS · 教育科技', en: 'B2B SaaS · EdTech' } }
                    ].map((card, idx) => (
                      <div 
                        key={idx} 
                        className="bg-[#F5F5F5] rounded-2xl p-6 flex flex-col justify-center min-h-[100px] shadow-sm"
                      >
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">
                          {t(card.label, lang)}
                        </span>
                        <span className="text-sm md:text-base font-bold text-gray-800 leading-snug">
                          {card.displayVal || t(card.value, lang)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Layer 3 — Narrative text + deliverables (below the cards) */}
                  <div 
                    className={`space-y-12 transition-all duration-[800ms] delay-200 ease-out transform ${
                      wisdomeOverviewVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {/* Narrative + Team Column Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20">
                      {/* Left Column: Narrative Background */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                          {t({ zh: '專案背景', en: 'Project Background' }, lang)}
                        </h4>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium font-noto">
                          {t({
                            zh: 'Wisdome.ai 是一家致力於使用 AI 技術打造全方位線上教育平台的新創公司，以 AI、機器學習以及教育為公司核心概念。我們面臨的核心挑戰在於：教育機構的校長與決策主管多數對 AI 技術感到陌生甚至排斥，如何透過網頁設計將複雜的 AI 概念具象化，進而轉化為信任？',
                            en: 'Wisdome.ai is a startup dedicated to building a comprehensive online education platform using AI. The core challenge was that most school administrators and decision-makers are unfamiliar with or skeptical of AI tools. The website design must demystify complex AI concepts and convert visitor curiosity into trust.'
                          }, lang)}
                        </p>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium font-noto">
                          {t({
                            zh: '為了解決這個信任痛點，本次專案聚焦於「體驗化設計」。我們不以堆疊技術名詞作為核心賣點，而是將功能與日常教務場景深度結合，透過直覺的資訊流、流暢的動態展現與極簡的視覺介面，建立起專業、可靠的品牌第一印象。',
                            en: 'To bridge this trust gap, the redesign focuses on experiential communication. Rather than stacking technical jargon, we contextualized AI capabilities into daily teaching scenarios, establishing a professional and reliable brand presence through intuitive content flows, smooth micro-interactions, and a clean interface.'
                          }, lang)}
                        </p>
                      </div>

                      {/* Right Column: Team Composition */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                          {t({ zh: '團隊組成', en: 'Team Composition' }, lang)}
                        </h4>
                        <ul className="space-y-3 text-sm md:text-base text-gray-600 font-medium font-noto list-none pl-0">
                          <li>• {t({ zh: 'UI/UX 設計師 (本人)', en: 'UI/UX Designer (Self)' }, lang)}</li>
                          <li>• {t({ zh: '前端工程師 (本人兼任)', en: 'Frontend Engineer (Self)' }, lang)}</li>
                          <li>• {t({ zh: '專案經理 x1', en: 'Project Manager x1' }, lang)}</li>
                          <li>• {t({ zh: '後端工程師 x1', en: 'Backend Engineer x1' }, lang)}</li>
                          <li>• {t({ zh: 'AI 演算法團隊', en: 'AI Algorithm Team' }, lang)}</li>
                        </ul>
                      </div>
                    </div>

                    {/* Deliverables Section (below both columns) */}
                    <div className="pt-8 border-t border-gray-100">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        {t({ zh: '交付物', en: 'Deliverables' }, lang)}
                      </h4>
                      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm md:text-base text-gray-700 font-bold font-noto list-disc pl-5">
                        <li>{t({ zh: '企業視覺識別系統', en: 'Corporate Identity System' }, lang)}</li>
                        <li>{t({ zh: '企業形象官網設計', en: 'Official Website Design' }, lang)}</li>
                        <li>{t({ zh: '網頁互動元件設計', en: 'Interactive Web Components' }, lang)}</li>
                        <li>{t({ zh: '產品功能展示動畫', en: 'Product Showcase Motion' }, lang)}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                // Default Generic Project Overview
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
                  <div className="space-y-8">
                    {activeItem.projectOverview.clientLogoUrl && (
                      <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{I18N[lang].project.client}</p>
                        <img src={activeItem.projectOverview.clientLogoUrl} alt="Client Logo" className="h-8 md:h-12 w-auto object-contain origin-left" onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                    )}
                    {activeItem.year && (
                      <div><p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{I18N[lang].project.year}</p><p className="text-xl font-medium text-gray-800">{activeItem.year}</p></div>
                    )}
                    {activeItem.projectOverview.myRole && (
                      <div><p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{I18N[lang].project.myRole}</p><p className="text-xl font-medium text-gray-800">{t(activeItem.projectOverview.myRole, lang)}</p></div>
                    )}
                    {activeItem.projectOverview.service && (
                      <div><p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{I18N[lang].project.service}</p><p className="text-xl font-medium text-gray-800">{t(activeItem.projectOverview.service, lang)}</p></div>
                    )}
                  </div>
                  <div className="space-y-12 text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-noto whitespace-pre-line">
                    {activeItem.projectOverview.backgroundAndGoals && (
                      <div><SubHeading>{I18N[lang].project.background}</SubHeading><p>{t(activeItem.projectOverview.backgroundAndGoals, lang)}</p></div>
                    )}
                    {activeItem.projectOverview.challenge && (
                      <div><SubHeading>{I18N[lang].project.challenge}</SubHeading><p>{t(activeItem.projectOverview.challenge, lang)}</p></div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 02 Research */}
          {activeItem.research && (
            <div className="w-full mb-24 md:mb-40 bg-[#FAFAFA] py-24 md:py-32">
              <div className="max-w-[100rem] mx-auto px-4 md:px-12">
                <ProjectSectionHeader num={getSectionNum()} title={I18N[lang].project.research} />
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-noto max-w-4xl mb-12">{t(activeItem.research.description, lang)}</p>
                {activeItem.research.images && activeItem.research.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {activeItem.research.images.map((img, i) => (
                      <div key={i} className="bg-white rounded-[2rem] aspect-[4/3] overflow-hidden shadow-sm flex items-center justify-center"><img src={img} className="w-full h-full object-cover" alt="Research" onError={(e) => e.target.style.display = 'none'} /></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 03 Strategy & Architecture */}
          {activeItem.strategyAndArchitecture && (
            activeItem.id === 1 ? (
              // Wisdome.ai Custom Strategy & Architecture
              <div className="w-full mb-24 md:mb-40 mt-12" ref={wisdomeStrategyRef}>
                <div className="max-w-[100rem] mx-auto px-4 md:px-12">
                  {/* Standard Header */}
                  <ProjectSectionHeader num={getSectionNum()} title={I18N[lang].project.strategy} />

                  {/* Text Content */}
                  <div className="space-y-6 text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-noto max-w-4xl mb-12">
                    <p>
                      {t({
                        zh: '針對 B2B SaaS 企業官網，我們以「建立專業信任」與「引導留單轉換」為策略核心，規劃了清晰的資訊架構，幫助教育機構決策者快速理解平台價值。',
                        en: 'For B2B SaaS corporate websites, our core strategy centers on establishing professional trust and driving lead conversion. We designed a clear information architecture to help educational decision-makers quickly grasp the platform\'s value.'
                      }, lang)}
                    </p>
                    <ul className="space-y-4 text-base md:text-lg text-gray-600 font-semibold font-noto list-disc pl-5">
                      <li>
                        {t({
                          zh: '直覺的角色化導覽：以不同教務角色切入，展示符合其痛點的客製化價值主張。',
                          en: 'Intuitive Role-based Navigation: Tailored value propositions for key administrative personas.'
                        }, lang)}
                      </li>
                      <li>
                        {t({
                          zh: '漸進式信任建構：由淺入深呈現產品優勢，減少使用者面對繁雜功能的焦慮感。',
                          en: 'Progressive Trust Building: Step-by-step benefit presentation to reduce visual anxiety.'
                        }, lang)}
                      </li>
                      <li>
                        {t({
                          zh: '無縫轉化路徑設計：在主要接觸點配置顯眼的 CTA，引導訪客快速採取預約諮詢。',
                          en: 'Seamless Conversion Paths: Clear CTAs strategically placed to guide booking actions.'
                        }, lang)}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Scrollable Image / Annotated IA Map */}
                {activeItem.strategyAndArchitecture.iaImage && (() => {
                  const iaDots = [
                    {
                      id: 1,
                      left: '1.9%',
                      top: '38%',
                      title: { zh: '首頁 — 三層說服結構', en: 'Homepage — 3-Layer Persuasion' },
                      content: {
                        zh: '主標題說痛點、副標題說範疇、CTA 說行動。順序刻意安排：先讓訪客感覺被理解，才有動機繼續往下讀。',
                        en: 'Hero states pain point, sub-header states scope, CTA drives action. Structured intentionally: first make visitors feel understood so they are motivated to read further.'
                      },
                      bubbleClass: 'bl'
                    },
                    {
                      id: 2,
                      left: '16.4%',
                      top: '38%',
                      title: { zh: '服務介紹 — 排列有內在邏輯', en: 'Service — Logical Progression' },
                      content: {
                        zh: '知識傳承 → 因材施教 → 規模擴張，從個人問題到機構需求。訪客的理解路徑從具體到抽象、從小到大，符合認知建立的自然順序。',
                        en: 'Knowledge transfer → personalized learning → scaling up, from individual needs to institutional demands. Navigates from concrete to abstract, aligning with natural cognition.'
                      },
                      bubbleClass: 'bl'
                    },
                    {
                      id: 3,
                      left: '31.2%',
                      top: '38%',
                      title: { zh: '成功案例 — 涵蓋不同需求類型', en: 'Success Stories — Diverse Needs' },
                      content: {
                        zh: 'BrainBox × PMI 代表「建立全新 AI 能力」，驅勢代表「整合現有行政流程」，讓不同類型客戶都能找到相似案例。',
                        en: 'BrainBox × PMI represents "establishing new AI capabilities," while Sunrise represents "integrating existing workflows," helping diverse clients find relevant success stories.'
                      },
                      bubbleClass: 'bl'
                    },
                    {
                      id: 4,
                      left: '48.8%',
                      top: '38%',
                      title: { zh: '關於我們 — 信任的延伸', en: 'About Us — Trust Extension' },
                      content: {
                        zh: '刻意排在成功案例之後。先看客戶成果（外部驗證），再認識團隊（內部說明），信任建立路徑更自然。',
                        en: 'Placed intentionally after success stories. Reviewing client outcomes (external validation) before meeting the team (internal story) creates a more natural trust path.'
                      },
                      bubbleClass: 'bl'
                    },
                    {
                      id: 5,
                      left: '63.5%',
                      top: '38%',
                      title: { zh: '加入我們 — 移出主說服流程', en: 'Careers — Separate Flow' },
                      content: {
                        zh: '招募訊息放主頁面會讓潛在客戶分心。透過導覽列觸達；「近期職缺」子節點預留了公司成長後的擴展空間。',
                        en: 'Placing recruitment info on the landing page distracts prospective clients. Accessed via navigation; "Recent Openings" reserves space for post-growth expansion.'
                      },
                      bubbleClass: 'br'
                    },
                    {
                      id: 6,
                      left: '63.5%',
                      top: '91%',
                      title: { zh: '近期職缺 — 前瞻性架構', en: 'Recent Openings — Future-Proof' },
                      content: {
                        zh: '「加入我們」下有「近期職缺」子節點——這說明你在做 IA 時已經考慮了公司規模成長後的內容需求。這是前瞻性的設計思維：現在可能只有一兩個職缺，但資訊架構已經預留了擴展空間。',
                        en: 'Under "Careers," the "Recent Openings" sub-node demonstrates foresight in information architecture. Even with only one or two vacancies today, the system reserves space for future growth.'
                      },
                      bubbleClass: 'tl'
                    },
                    {
                      id: 7,
                      left: '91.5%',
                      top: '38%',
                      title: { zh: '頁尾導覽 — 信任訊號', en: 'Footer Navigation — Trust Signal' },
                      content: {
                        zh: '頁尾包含了所有主要頁面的快速連結，這是一個信任訊號——完整的頁尾讓公司看起來是一個有體制的組織，而不是臨時搭起來的 landing page。這個決策服務的是「已被說服、想進一步了解的訪客」。',
                        en: 'The footer includes links to all main pages, serving as a trust signal. A comprehensive footer establishes organizational credibility over a temporary landing page, aiding visitors who seek deeper engagement.'
                      },
                      bubbleClass: 'br'
                    }
                  ];
                  return (
                    <HorizontalMapScroll 
                      url={activeItem.strategyAndArchitecture.iaImage} 
                      iaDots={iaDots}
                      lang={lang}
                    />
                  );
                })()}
              </div>
            ) : (
              // Default Generic Strategy & Architecture
              <div className="w-full mb-24 md:mb-40 mt-12">
                <div className="max-w-[100rem] mx-auto px-4 md:px-12">
                  <ProjectSectionHeader num={getSectionNum()} title={I18N[lang].project.strategy} />
                  {activeItem.strategyAndArchitecture.description && (
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-noto max-w-4xl mb-12">{t(activeItem.strategyAndArchitecture.description, lang)}</p>
                  )}
                </div>
                {activeItem.strategyAndArchitecture.iaImage && (
                  <HorizontalMapScroll url={activeItem.strategyAndArchitecture.iaImage} />
                )}
              </div>
            )
          )}

          {/* 04 Brand Identity */}
          {activeItem.brandIdentity && (
            activeItem.id === 1 ? (
              // Wisdome.ai Custom 企業識別系統 (CIS) - 全寬展示
              <div className="w-full mb-24 md:mb-40 mt-12 bg-white">
                {/* 頂部 */}
                <div className="max-w-[100rem] mx-auto px-4 md:px-12 mb-16">
                  <ProjectSectionHeader num={getSectionNum()} title={t({ zh: '企業識別系統', en: 'Corporate Identity System' }, lang)} />
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-noto max-w-4xl">
                    {t({
                      zh: '為凸顯 Wisdome.ai 智慧教育的創新形象與科技核心，我們規劃了完整的視覺識別規範，建立一個兼具專業感、信賴感與前沿科技感的 CIS 系統。',
                      en: 'To highlight Wisdome.ai\'s innovative image and technological core, we developed a complete visual identity system that builds a brand image combining professionalism, trust, and advanced EdTech aesthetics.'
                    }, lang)}
                  </p>
                </div>

                {/* 子區塊容器 */}
                <div className="max-w-[100rem] mx-auto px-4 md:px-12 space-y-32">
                  
                  {/* 1. Logo 展示 */}
                  <div 
                    ref={cisLogoRef}
                    className={`transition-all duration-1000 ease-out transform ${
                      cisLogoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                  >
                    <SubHeading>
                      {t({ zh: '1. 標誌規範展示', en: '1. Brand Mark System' }, lang)}
                    </SubHeading>
                    <div 
                      className="grid grid-cols-12 gap-6"
                      style={{ fontFamily: "'Manrope', 'PingFang TC', 'Noto Sans TC', 'Microsoft JhengHei', sans-serif" }}
                    >
                      
                      {/* Card 1: Brand Logo */}
                      <div 
                        className="group relative bg-[#F5F6F8] hover:bg-[#EFF1F5] rounded-[20px] p-[28px] transition-all duration-300 ease-out border border-[#E7E9EE] flex flex-col justify-between overflow-hidden focus-visible:outline-none col-span-12 lg:col-span-4"
                        tabIndex={0}
                      >
                        <div className="w-full bg-white border border-[#E7E9EE] rounded-[16px] flex items-center justify-center overflow-hidden h-[180px] select-none p-6">
                          <img src="projects/wisdome.ai_web/wisdomeai_logo.svg" alt="Wisdome.ai Brand Logo Standard" className="max-w-full max-h-full object-contain" />
                        </div>
                        
                        <div className="mt-5 space-y-1.5 text-left">
                          <div className="text-[15.5px] font-extrabold text-[#12172B] font-noto">
                            {lang === 'zh' ? '品牌標誌 (Logo)' : 'Brand Logo'}
                          </div>
                          <div className="text-[13px] leading-[1.65] text-[#727C8F] font-medium font-noto">
                            {lang === 'zh' 
                              ? '以多面幾何球體作為視覺主體，結合簡潔的無襯線字體，呈現創新且穩健可靠的科技品牌形象。'
                              : 'Hexagonal faceted sphere centerpiece combined with a clean sans-serif typeface, conveying an innovative and reliable tech brand image.'}
                          </div>
                        </div>
                      </div>

                      {/* Card 2: Graph & Structure */}
                      <div 
                        className="group relative bg-[#F5F6F8] hover:bg-[#EFF1F5] rounded-[20px] p-[28px] transition-all duration-300 ease-out border border-[#E7E9EE] flex flex-col justify-between overflow-hidden focus-visible:outline-none col-span-12 lg:col-span-8"
                        tabIndex={0}
                      >
                        <div className="flex flex-col sm:flex-row gap-4 w-full h-[180px]">
                          <div className="w-full sm:w-[45%] bg-white border border-[#E7E9EE] rounded-[16px] flex items-center justify-center overflow-hidden h-full select-none p-4">
                            <img src="projects/wisdome.ai_web/wisdomeai-graph.svg" alt="Wisdome.ai Graph" className="max-w-full max-h-full object-contain" />
                          </div>
                          <div className="flex-grow flex items-center justify-center bg-white border border-[#E7E9EE] rounded-[16px] h-full w-full sm:w-[50%] p-4 select-none">
                            <img src="projects/wisdome.ai_web/graph-seperate.png" alt="Wisdome.ai Graph Breakdown" className="max-w-full max-h-full object-contain" />
                          </div>
                        </div>

                        <div className="mt-5 space-y-1.5 text-left">
                          <div className="text-[15.5px] font-extrabold text-[#12172B] font-noto">
                            {lang === 'zh' ? '圖形與幾何 (Graph & Structure)' : 'Graph & Structure'}
                          </div>
                          <div className="text-[13px] leading-[1.65] text-[#727C8F] font-medium font-noto">
                            {lang === 'zh' 
                              ? '以半球體穹頂 (Geodesic Dome) 進行幾何切割，象徵多維度人工智慧與數據網路的交織流動。'
                              : 'Faceted geodesic dome network, representing the multidimensional flows and structures of artificial intelligence.'}
                          </div>
                        </div>
                      </div>

                      {/* Card 3: Logotype */}
                      <div 
                        className="group relative bg-[#F5F6F8] hover:bg-[#EFF1F5] rounded-[20px] p-[28px] transition-all duration-300 ease-out border border-[#E7E9EE] flex flex-col justify-between overflow-hidden focus-visible:outline-none col-span-12"
                        tabIndex={0}
                      >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
                          <div className="w-full md:w-[40%] bg-white border border-[#E7E9EE] rounded-[16px] flex items-center justify-center h-[120px] p-4 select-none">
                            <img src="projects/wisdome.ai_web/logotype.png" alt="Wisdome.ai Logotype" className="max-w-full max-h-full object-contain" />
                          </div>
                          <div className="w-full md:w-[55%] space-y-2 text-left">
                            <div className="text-[15.5px] font-extrabold text-[#12172B] font-noto">
                              {lang === 'zh' ? '文字標誌 (Logotype)' : 'Brand Logotype'}
                            </div>
                            <div className="text-[13px] leading-[1.65] text-[#727C8F] font-medium font-noto">
                              {lang === 'zh' 
                                ? '採用簡約現代的無襯線字體，並在特定字母線條中融入斜切的科技語彙，呈現專業且洗鍊的品牌調性。'
                                : 'Features a sleek, modern sans-serif typeface, incorporating subtle tech-slashes in letter strokes to convey professional brand tone.'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card 4: Lockups & Variations */}
                      <div 
                        className="group relative transition-all duration-300 ease-out border rounded-[20px] p-[28px] flex flex-col justify-between overflow-hidden focus-visible:outline-none col-span-12 bg-[#F5F6F8] hover:bg-[#EFF1F5] border-[#E7E9EE] text-[#12172B]"
                        tabIndex={0}
                      >
                        <div className="w-full space-y-6">
                          <div className="space-y-1.5 text-left">
                            <div className="text-[15.5px] font-extrabold text-[#12172B] font-noto">
                              {lang === 'zh' ? '組合形式與應用 (Lockups & Variations)' : 'Lockups & Variations'}
                            </div>
                            <div className="text-[13px] leading-[1.65] text-[#727C8F] font-medium font-noto">
                              {lang === 'zh' 
                                ? '包含橫向、反白與單色等組合，因應不同應用載體與底色彈性調整，確保最佳的易讀性與辨識度。'
                                : 'Includes horizontal lockups and color variations tailored for optimal visibility across dark, light, and primary backdrops.'}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                            {/* Card 1: bg-[#fbfbfb] logo: wisdome-dark.svg */}
                            <div className="bg-[#fbfbfb] border border-[#E7E9EE] rounded-[16px] flex flex-col items-center justify-center p-4 h-[140px] select-none">
                              <img src="projects/wisdome.ai_web/wisdome-dark.svg" alt="Standard Lockup Light BG" className="max-w-[85%] max-h-[70%] object-contain" />
                              <span className="text-[10px] font-bold text-[#727C8F] mt-2 font-manrope uppercase tracking-wider">#FBFBFB</span>
                            </div>
                            {/* Card 2: bg-[#00D2E2] logo: wisdome-dark.svg */}
                            <div className="bg-[#00D2E2] rounded-[16px] flex flex-col items-center justify-center p-4 h-[140px] select-none border border-transparent">
                              <img src="projects/wisdome.ai_web/wisdome-dark.svg" alt="Cyan BG Lockup" className="max-w-[85%] max-h-[70%] object-contain" />
                              <span className="text-[10px] font-bold text-[#12172B] mt-2 font-manrope uppercase tracking-wider">#00D2E2</span>
                            </div>
                            {/* Card 3: bg-[#282828] logo: wisdome-light.svg */}
                            <div className="bg-[#282828] rounded-[16px] flex flex-col items-center justify-center p-4 h-[140px] select-none shadow-inner border border-transparent">
                              <img src="projects/wisdome.ai_web/wisdome-light.svg" alt="Dark BG Lockup" className="max-w-[85%] max-h-[70%] object-contain" />
                              <span className="text-[10px] font-bold text-white/70 mt-2 font-manrope uppercase tracking-wider">#282828</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 2. 色彩系統 */}
                  <div 
                    ref={cisColorRef}
                    className={`transition-all duration-1000 ease-out transform ${
                      cisColorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                  >
                    <SubHeading>
                      {t({ zh: '2. 品牌色彩系統', en: '2. Color Identity System' }, lang)}
                    </SubHeading>
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
                      {/* Left: Decision rationale */}
                      <div className="space-y-6">
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium font-noto">
                          {t({
                            zh: '色彩計畫以明快的科技藍綠色（Accent Cyan）搭配深沉冷冽的碳黑色（Primary Dark）為主軸。藍綠色代表 AI 與雲端教育的創新活力，碳黑色則象徵教育管理系統的穩定、安全與專業。透過高對比的配色體系，確保網站在展現科技感的同時，仍能保持極佳的閱讀易用性。',
                            en: 'The color palette features Tech Cyan as the accent shade and Charcoal Black as the primary background. Cyan communicates innovative AI EdTech vitality, while Charcoal symbolizes educational administration systems\' security and professionalism. This ensures high-contrast clarity alongside modern aesthetics.'
                          }, lang)}
                        </p>
                      </div>
                      
                      {/* Right: Square swatches with hover tooltips */}
                      <div className="grid grid-cols-2 gap-6 max-w-sm">
                        {[
                          { hex: '#282828', name: 'Primary Dark', usage: { zh: '主文字與背景色，體現穩固與深度', en: 'Main text & panel fill, conveying depth.' } },
                          { hex: '#00D2E2', name: 'Accent Cyan', usage: { zh: '科技點綴色，引導注意力與 CTA', en: 'Vibrant blue-green accent, leading CTA clicks.' } }
                        ].map((color, cIdx) => (
                          <div key={cIdx} className="group relative flex flex-col gap-3 transition-all duration-[800ms] ease-out transform" style={{ transitionDelay: `${cIdx * 100}ms` }}>
                            <div 
                              className="w-full aspect-square rounded-2xl shadow-sm flex items-center justify-center border border-gray-100 cursor-pointer relative overflow-hidden transition-all duration-300 group-hover:scale-105"
                              style={{ backgroundColor: color.hex }}
                            >
                              {/* Hover details overlay */}
                              <div className="absolute inset-0 bg-black/80 flex flex-col justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-white font-mono font-bold text-xs mb-1">{color.hex}</span>
                                <span className="text-white/80 font-noto text-[10px] leading-snug">{t(color.usage, lang)}</span>
                              </div>
                            </div>
                            <div>
                              <span className="block text-sm font-bold text-gray-800">{color.name}</span>
                              <span className="block text-xs text-gray-400 font-mono font-medium">{color.hex}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 3. 字型系統 */}
                  <div 
                    ref={cisFontRef}
                    className={`transition-all duration-1000 ease-out transform ${
                      cisFontVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                  >
                    <SubHeading>
                      {t({ zh: '3. 字型階層系統 (Typography)', en: '3. Typography hierarchy' }, lang)}
                    </SubHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                      {/* English System */}
                      <div className="space-y-6 bg-gray-50 rounded-[2rem] p-8 md:p-10 border border-gray-100">
                        <span className="text-xs text-orange-500 font-bold uppercase tracking-wider block mb-4">English Typeface — Figtree</span>
                        
                        <div className="space-y-6">
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Heading H1 (900 Bold)</span>
                            <span style={{ fontSize: '36px', fontWeight: '900', color: '#1E293B', lineHeight: '1.1', fontFamily: "'Inter', sans-serif" }} className="block">
                              Designing Educational Futures
                            </span>
                          </div>
                          
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Subtitle H3 (600 Semibold)</span>
                            <span style={{ fontSize: '20px', fontWeight: '600', color: '#475569', lineHeight: '1.2', fontFamily: "'Inter', sans-serif" }} className="block">
                              A modern AI platform for cram schools.
                            </span>
                          </div>
                          
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Body Text (400 Regular)</span>
                            <span style={{ fontSize: '15px', fontWeight: '400', color: '#64748B', lineHeight: '1.6', fontFamily: "'Inter', sans-serif" }} className="block">
                              Simplify administration, engage teachers, and build trust with parents through our B2B SaaS platform.
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Chinese System */}
                      <div className="space-y-6 bg-gray-50 rounded-[2rem] p-8 md:p-10 border border-gray-100">
                        <span className="text-xs text-orange-500 font-bold uppercase tracking-wider block mb-4">Chinese Typeface — Noto Sans TC</span>
                        
                        <div className="space-y-6">
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">標題 H1 (700 Bold)</span>
                            <span className="text-3xl font-bold text-gray-900 leading-tight font-noto block">
                              重塑線上教育新未來
                            </span>
                          </div>
                          
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">副標題 H3 (600 Medium)</span>
                            <span className="text-lg font-semibold text-gray-700 leading-normal font-noto block">
                              專為補習班打造的智慧教務系統。
                            </span>
                          </div>
                          
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">內文 Body (400 Regular)</span>
                            <span className="text-base font-normal text-gray-500 leading-relaxed font-noto block">
                              聚愢科技整合 AI、機器學習與人性化介面，協助傳統教務無縫轉型，開啟高效管理的新頁章。
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. CIS → 官網落地對比 */}
                  {false && (
                    <div 
                      ref={cisCompareRef}
                      className={`transition-all duration-1000 ease-out transform ${
                        cisCompareVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                      }`}
                    >
                      <SubHeading>
                        {t({ zh: '4. CIS 規範與官網落地對比', en: '4. CIS Specs vs Live Website' }, lang)}
                      </SubHeading>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center bg-[#FAFAFB] p-8 md:p-12 border border-gray-100 rounded-[2rem]">
                        {/* Left: CIS Spec Mockup Card */}
                        <div className="flex flex-col gap-4 w-full">
                          <div 
                            className="w-full aspect-[4/3] rounded-2xl flex flex-col justify-between p-6 shadow-sm border border-gray-200 bg-white"
                            style={{ backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                          >
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                              <span className="text-xs text-gray-400 font-bold font-mono">CIS_SPEC_01.PDF</span>
                              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">GRID FIXED</span>
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-center items-center relative my-4">
                              <div className="border border-blue-200 border-dashed p-4 rounded-xl flex items-center justify-center">
                                <img src="projects/wisdome.ai_web/graph-logo.png" alt="CIS Logo Spec" className="max-h-[80px] object-contain opacity-80" />
                              </div>
                              {/* Blue drafting measurements overlay */}
                              <div className="absolute top-[15%] left-[10%] text-[10px] text-blue-500 font-mono">margin = 1.5x</div>
                              <div className="absolute bottom-[-10px] h-[1px] w-2/3 bg-blue-300 flex justify-between"><div className="w-[1px] h-2 bg-blue-400" /><div className="w-[1px] h-2 bg-blue-400" /></div>
                            </div>
                            <span className="text-xs font-bold text-gray-400 font-mono">CIS Brand Guideline Map</span>
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-gray-800 font-noto">{t({ zh: 'CIS 品牌標誌規範', en: 'CIS Mark Specifications' }, lang)}</span>
                            <span className="block text-xs text-gray-400 font-medium font-noto">{t({ zh: '嚴謹定義標誌的幾何格線、色彩容差與安全留白區域', en: 'Strictly defines geometry lines, spacing tolerances, and margins.' }, lang)}</span>
                          </div>
                        </div>

                        {/* Middle: Connecting Arrow Icon */}
                        <div className="hidden lg:flex flex-col items-center gap-2 justify-center px-4">
                          <div className="bg-orange-500 text-white rounded-full p-3 shadow-md flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-noto mt-2">{t({ zh: '落地應用', en: 'Live Apply' }, lang)}</span>
                        </div>

                        {/* Right: Live Web Screenshot Card */}
                        <div className="flex flex-col gap-4 w-full">
                          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white relative">
                            {/* Live website preview screenshot */}
                            <img src="projects/wisdome.ai_web/cover.webp" alt="Website Implementation" className="w-full h-full object-cover select-none" />
                            
                            {/* Green matching badge overlay */}
                            <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                              100% SPEC MATCHED
                            </div>
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-gray-800 font-noto">{t({ zh: '企業官方網站落地', en: 'Live Corporate Website' }, lang)}</span>
                            <span className="block text-xs text-gray-400 font-medium font-noto">{t({ zh: '在 Web 介面實現完美像素對齊，保持品牌一致的跨媒介體驗', en: 'Achieves pixel-perfect rendering to preserve cohesive brand experience.' }, lang)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ) : (
              // Default Generic Brand Identity (CIS)
              <div className="max-w-[100rem] mx-auto px-4 md:px-12 mb-24 md:mb-40 mt-12">
                <ProjectSectionHeader num={getSectionNum()} title={I18N[lang].project.brand} />

                <div className="flex flex-col gap-12 lg:gap-16">
                  {/* 橫向滿版影片或 Logo */}
                  <div className={`w-full bg-[#EAE8F2] rounded-[2rem] flex items-center justify-center overflow-hidden ${activeItem.brandIdentity.motionVideoUrl ? 'aspect-video' : 'p-12 md:p-20 min-h-[300px]'}`}>
                    {activeItem.brandIdentity.motionVideoUrl ? (
                      <OptimizedVideo src={activeItem.brandIdentity.motionVideoUrl} className="w-full h-full object-cover" />
                    ) : (
                      <img src={activeItem.brandIdentity.logoImage} className="w-2/3 md:w-1/3 h-auto" alt="Logo" onError={(e) => e.target.style.display = 'none'} />
                    )}
                  </div>
                  {/* Logo Showcase (交錯式排版) */}
                  {activeItem.brandIdentity.logos && activeItem.brandIdentity.logos.length > 0 && (
                    <div className="flex flex-col mt-8 md:mt-16 mb-16 md:mb-24">
                      <div className="flex items-center gap-4 mb-6">
                        <h4 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Logo Design</h4>
                      </div>
                      <div className="w-full h-[1px] bg-gray-300 mb-16 md:mb-24"></div>

                      <div className="flex flex-col gap-16 md:gap-32">
                        {activeItem.brandIdentity.logos.map((logo, index) => {
                          const isEven = index % 2 === 0;
                          return (
                            <div key={index} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}>
                              {/* Image Placeholder */}
                              <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-video bg-[#F5F5F5] rounded-3xl flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm">
                                {logo.imageUrl ? (
                                  <img src={logo.imageUrl} alt={logo.type} className="w-full h-full object-contain p-6 md:p-10" />
                                ) : (
                                  <div className="text-gray-400 font-bold tracking-widest text-sm md:text-base flex flex-col items-center gap-2 uppercase">
                                    <span>[ {logo.type} ]</span>
                                    <span className="text-xs">Image Placeholder</span>
                                  </div>
                                )}
                              </div>
                              {/* Text Content */}
                              <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
                                <span className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4 inline-block">{logo.type}</span>
                                <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-noto leading-tight">{logo.title}</h4>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium font-noto max-w-lg">{logo.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 色彩計畫與字體排印 */}
                  {activeItem.brandIdentity.combinedView ? (
                    <div className="flex flex-col mt-8 md:mt-16">
                      <div className="flex items-center gap-4 mb-6">
                        <h4 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Typography& Colors</h4>
                      </div>
                      <div className="w-full h-[1px] bg-gray-300 mb-16"></div>

                      {/* Typography Section */}
                      <div className="flex flex-col md:flex-row gap-12 md:gap-16 mb-24 md:mb-32">
                        {/* Left Column: Font Names */}
                        <div className="w-full md:w-1/3 flex flex-col gap-10">
                          {activeItem.brandIdentity.typography?.en && (
                            <div>
                              <p className="text-sm font-bold text-gray-500 mb-2">English typography</p>
                              <p className="text-4xl md:text-5xl font-bold text-[#282828]">{activeItem.brandIdentity.typography.en.name}</p>
                            </div>
                          )}
                          {activeItem.brandIdentity.typography?.tc && (
                            <div>
                              <p className="text-sm font-bold text-gray-500 mb-2">Chinese typography</p>
                              <p className="text-3xl md:text-4xl font-bold text-[#282828] font-noto">{activeItem.brandIdentity.typography.tc.name}</p>
                            </div>
                          )}
                        </div>
                        {/* Right Column: Previews */}
                        <div className="w-full md:w-2/3 flex flex-col gap-10 justify-center overflow-hidden">
                          {activeItem.brandIdentity.typography?.en && (
                            <p className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[7.5rem] font-bold text-[#282828] uppercase tracking-wide leading-none truncate md:overflow-visible">{activeItem.brandIdentity.typography.en.preview}</p>
                          )}
                          {activeItem.brandIdentity.typography?.tc && (
                            <p className="text-4xl sm:text-6xl md:text-[4rem] lg:text-[5rem] font-bold text-[#282828] tracking-tight leading-tight font-noto">{activeItem.brandIdentity.typography.tc.preview}</p>
                          )}
                        </div>
                      </div>

                      {/* Colors Section */}
                      <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
                        {/* Left Column: Description */}
                        <div className="w-full md:w-1/3 mb-4 md:mb-0">
                          <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium font-noto">
                            {activeItem.brandIdentity.colorDesc}
                          </p>
                        </div>
                        {/* Right Column: Color Blocks */}
                        <div className="w-full md:w-2/3 flex h-48 md:h-64 rounded-3xl overflow-hidden shadow-sm">
                          {activeItem.brandIdentity.colors?.map(color => (
                            <div key={color.hex} className="flex-1 p-6 md:p-8 flex items-end" style={{ backgroundColor: color.hex }}>
                              <span className="text-white font-bold tracking-widest text-base md:text-xl">{color.hex}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                      {activeItem.brandIdentity.colors && (
                        <div>
                          <h4 className="text-2xl font-bold mb-6 font-inter tracking-tight">{I18N[lang].project.colorPalette}</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {activeItem.brandIdentity.colors.map(color => (
                              <div key={color.hex} className="flex flex-col gap-3">
                                <div className="w-full aspect-square rounded-[1.5rem] shadow-sm flex items-end p-4 border border-gray-100" style={{ backgroundColor: color.hex }}></div>
                                <span className="text-sm font-bold text-gray-800 tracking-wide">{t(color.name, lang)}</span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{color.hex}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activeItem.brandIdentity.typography && (
                        <div className="bg-gray-50 rounded-[2rem] p-8 md:p-10 border border-gray-100 h-full">
                          <h4 className="text-2xl font-bold mb-6 font-inter tracking-tight">{I18N[lang].project.typography}</h4>
                          <div className="space-y-8">
                            <div><p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{I18N[lang].project.primaryType}</p><p className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">{activeItem.brandIdentity.typography.primary}</p></div>
                            {activeItem.brandIdentity.typography.secondary && (<div><p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{I18N[lang].project.secondaryType}</p><p className="text-2xl md:text-4xl font-bold text-gray-900 font-noto">{activeItem.brandIdentity.typography.secondary}</p></div>)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          {/* 05 Design */}
          {activeItem.design && (
            <div className="max-w-[100rem] mx-auto px-4 md:px-12 mb-24 md:mb-40 mt-12">
              <ProjectSectionHeader num={getSectionNum()} title={isApp ? I18N[lang].project.uiDesign : I18N[lang].project.webDesign} />
              <div className="space-y-20">
                {activeItem.id === 1 && (
                  <>
                    <div className="bg-[#FAFAFB] border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm mb-8">
                      <div className="mb-8">
                        <h4 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
                          {lang === 'zh' ? '四個關鍵設計選擇' : 'Four Key Design Choices'}
                        </h4>
                        <p className="text-sm md:text-base text-gray-500 font-medium font-noto">
                          {lang === 'zh' ? '每個選擇背後都有 UX 根據，不是美感偏好。' : 'Each choice is backed by UX rationale, not aesthetic preference.'}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {DECISION_TABS.map((tab) => {
                          const isExpanded = activeDecisionTab === tab.id;
                          return (
                            <div 
                              key={tab.id}
                              className={`border rounded-2xl bg-white p-6 transition-all duration-300 cursor-pointer ${
                                isExpanded 
                                  ? 'border-purple-200 shadow-md ring-1 ring-purple-100/30' 
                                  : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
                              }`}
                              onClick={() => handleDecisionTabChange(tab.id)}
                            >
                              {/* Card Header */}
                              <div className="flex items-center justify-between gap-4 select-none">
                                <div className="space-y-1 flex-1">
                                  <h5 className={`text-lg md:text-xl font-bold transition-colors duration-200 ${
                                    isExpanded ? 'text-purple-900' : 'text-gray-900'
                                  }`}>
                                    {t(tab.title, lang)}
                                  </h5>
                                  <p className="text-sm text-gray-500 font-medium font-noto">
                                    {t(tab.subtitle, lang)}
                                  </p>
                                </div>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 transition-colors duration-200 ${
                                  isExpanded ? 'bg-purple-50' : ''
                                }`}>
                                  <svg 
                                    className={`w-5 h-5 transition-transform duration-300 ${
                                      isExpanded ? 'transform rotate-180 text-purple-600' : 'text-gray-400'
                                    }`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>

                              {/* Card Body (Insights) */}
                              <div 
                                className={`transition-all duration-300 overflow-hidden ${
                                  isExpanded ? 'max-h-[800px] opacity-100 mt-6 pt-6 border-t border-gray-100' : 'max-h-0 opacity-0 pointer-events-none'
                                }`}
                              >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                  {tab.insights.map((insight, idx) => (
                                    <div key={idx} className="p-5 rounded-xl bg-gray-50/70 border border-gray-100/50 flex flex-col gap-3">
                                      <span className={`inline-block self-start px-2.5 py-1 text-xs font-bold rounded-md border ${insight.badgeColor}`}>
                                        {t(insight.badge, lang)}
                                      </span>
                                      <p className="text-sm text-gray-600 leading-relaxed font-semibold font-noto">
                                        {t(insight.content, lang)}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* 設計決策分割視圖 */}
                    <div className="flex flex-col gap-6 mb-16">
                      
                      {/* Mobile / Tablet layout tabs (visible on < xl) */}
                      <div className="block xl:hidden w-full">
                        {/* Tab Switcher Buttons */}
                        <div 
                          ref={mobileTabsContainerRef}
                          className="flex gap-2 overflow-x-auto pb-3 hide-scrollbar border-b border-gray-100"
                        >
                          {SPLIT_VIEW_CHIPS.map((chip) => {
                            const isActive = activeChip === chip.id;
                            return (
                              <button
                                key={chip.id}
                                onClick={(e) => {
                                  if (!isActive) {
                                    setActiveChip(chip.id);
                                    setVideoState('none');
                                    
                                    // Scroll clicked tab to center of the horizontal scroll container dynamically
                                    const button = e.currentTarget;
                                    const container = mobileTabsContainerRef.current;
                                    if (button && container) {
                                      const containerWidth = container.offsetWidth;
                                      const buttonOffsetLeft = button.offsetLeft;
                                      const buttonWidth = button.offsetWidth;
                                      const targetScrollLeft = buttonOffsetLeft - (containerWidth / 2) + (buttonWidth / 2);
                                      container.scrollTo({
                                        left: targetScrollLeft,
                                        behavior: 'smooth'
                                      });
                                    }
                                  }
                                }}
                                className={`flex-shrink-0 px-4 py-2 text-xs md:text-sm font-bold font-noto rounded-full border transition-all duration-300 cursor-pointer ${
                                  isActive
                                    ? 'bg-[#534ab7] border-[#534ab7] text-white shadow-sm'
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                              >
                                {t(chip.title, lang)}
                              </button>
                            );
                          })}
                        </div>
                        
                        {/* Active Tab Description */}
                        <div className="mt-4 p-5 bg-purple-50/50 border border-purple-100/30 rounded-2xl">
                          <h6 className="font-bold text-sm text-[#534ab7] mb-2 font-noto">
                            {t(SPLIT_VIEW_CHIPS.find(c => c.id === activeChip)?.title, lang)}
                          </h6>
                          <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-noto">
                            {t(SPLIT_VIEW_CHIPS.find(c => c.id === activeChip)?.desc, lang)}
                          </p>
                        </div>
                      </div>

                      {/* Main Layout Grid */}
                      <div className="grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-6 items-start">
                        {/* Left/Top: Mockups Wrapper */}
                        <div className="rounded-[12px] lg:p-[12px] flex flex-col lg:flex-row lg:items-center lg:justify-start relative w-full aspect-none lg:aspect-[16/10] gap-6 lg:gap-0">
                          {videoState === 'none' ? (
                            <div className="w-full h-full relative flex flex-col lg:flex-row lg:items-center lg:justify-start">
                              {/* Desktop Web Showcase (Browser Mockup removed, no shadows) */}
                              <div 
                                className="w-full lg:w-[86%] aspect-[16/10] lg:aspect-none lg:h-full flex flex-col bg-[#080d19] rounded-2xl lg:rounded-xl overflow-hidden relative"
                                onMouseLeave={() => setIsDesktopScrollActive(false)}
                              >
                                {/* Scrollable Webpage Content */}
                                <div 
                                  ref={containerRef}
                                  className={`flex-1 overflow-y-auto scroll-smooth hide-scrollbar bg-[#080d19] relative ${isDesktopScrollActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                >
                                  {activeItem.design.webShowcaseStrip.map((item, idx) => {
                                    const sectionRef = 
                                      idx === 0 ? heroRef : 
                                      idx === 1 ? servicesRef : 
                                      idx === 2 ? valuesRef : 
                                      idx === 3 ? successRef :
                                      idx === 4 ? ctaRef :
                                      idx === 5 ? aboutRef :
                                      idx === 6 ? contactRef :
                                      idx === 7 ? footerRef : null;
                                    
                                    return (
                                      <div 
                                        key={idx} 
                                        ref={sectionRef}
                                        className="w-full relative select-none"
                                        style={{ lineHeight: 0 }}
                                      >
                                        {item.type === 'video' ? (
                                          <WebShowcaseVideo src={item.url} className="w-full h-auto block" />
                                        ) : (
                                          <WebShowcaseImage src={item.url} />
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
  
                                {/* Center Scroll Activation Overlay */}
                                <div 
                                  className={`absolute inset-y-[20%] inset-x-[25%] z-30 bg-transparent ${isDesktopScrollActive ? 'pointer-events-none' : 'pointer-events-auto cursor-ns-resize'}`}
                                  onMouseEnter={() => setIsDesktopScrollActive(true)}
                                />
                              </div>
  
                              {/* Mobile Showcase (Phone Mockup & Shadow removed, border added) */}
                              <div 
                                className="relative lg:absolute lg:top-12 lg:-right-6 w-[200px] sm:w-[240px] lg:w-[28%] aspect-[9/19.5] lg:aspect-none lg:h-full mt-6 lg:mt-0 mx-auto lg:mx-0 bg-[#080d19] rounded-[2rem] border-[6px] border-[#1a1b20] overflow-hidden flex flex-col z-20"
                                onMouseLeave={() => setIsMobileScrollActive(false)}
                              >
                                {/* Scrollable Mobile Viewport */}
                                <div 
                                  ref={mobileContainerRef}
                                  className={`flex-1 overflow-y-auto scroll-smooth hide-scrollbar bg-[#080d19] relative ${isMobileScrollActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                >
                                  {activeItem.design.webShowcaseStrip.map((item, idx) => {
                                    if (!item.mobile) return null;
                                    const mItem = item.mobile;
                                    
                                    const mRef = 
                                      idx === 0 ? mHeroRef : 
                                      idx === 1 ? mServicesRef : 
                                      idx === 2 ? mValuesRef : 
                                      idx === 3 ? mSuccessRef :
                                      idx === 4 ? mCtaRef :
                                      idx === 5 ? mAboutRef : null;
  
                                    return (
                                      <div 
                                        key={idx} 
                                        ref={mRef}
                                        className="w-full relative select-none"
                                        style={{ lineHeight: 0 }}
                                      >
                                        {mItem.type === 'video' ? (
                                          <WebShowcaseVideo src={mItem.url} />
                                        ) : (
                                          <WebShowcaseImage src={mItem.url} />
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
  
                                {/* Center Scroll Activation Overlay */}
                                <div 
                                  className={`absolute inset-y-[20%] inset-x-[20%] z-30 bg-transparent ${isMobileScrollActive ? 'pointer-events-none' : 'pointer-events-auto cursor-ns-resize'}`}
                                  onMouseEnter={() => setIsMobileScrollActive(true)}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="w-full aspect-[16/10] lg:aspect-none lg:h-full relative flex items-center justify-center bg-black rounded-lg overflow-hidden">
                              <video
                                ref={videoRef}
                                key={SPLIT_VIEW_CHIPS.find(c => c.id === activeChip)?.videoUrl}
                                src={SPLIT_VIEW_CHIPS.find(c => c.id === activeChip)?.videoUrl}
                                autoPlay
                                controls
                                className="w-full h-full object-contain"
                                onEnded={() => setVideoState('ended')}
                              />
                              {videoState === 'ended' && (
                                <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center gap-4 z-10 animate-in fade-in duration-300">
                                  <span className="text-white font-medium text-sm md:text-base font-noto">
                                    {lang === 'zh' ? '影片播放完畢' : 'Video playback completed'}
                                  </span>
                                  <div className="flex gap-4">
                                    <button
                                      onClick={() => {
                                        setVideoState('playing');
                                        if (videoRef.current) {
                                          videoRef.current.currentTime = 0;
                                          videoRef.current.play().catch(err => console.log(err));
                                        }
                                      }}
                                      className="px-4 py-2 bg-[#534ab7] hover:bg-[#433b9c] text-white rounded-full text-xs md:text-sm font-bold transition-all shadow-md cursor-pointer"
                                    >
                                      {lang === 'zh' ? '重播 ↺' : 'Replay ↺'}
                                    </button>
                                    <button
                                      onClick={() => setVideoState('none')}
                                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full text-xs md:text-sm font-bold transition-all shadow-md cursor-pointer"
                                    >
                                      {lang === 'zh' ? '關閉 ✕' : 'Close ✕'}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
  
                        {/* Right Column: Interactive Chips (Only visible on xl screens) */}
                        <div className="hidden xl:flex flex-col gap-4 justify-center">
                          {SPLIT_VIEW_CHIPS.map((chip) => {
                            const isActive = activeChip === chip.id;
                            return (
                              <div
                                key={chip.id}
                                onClick={() => {
                                  if (!isActive) {
                                    setActiveChip(chip.id);
                                    setVideoState('none');
                                  }
                                }}
                                className={`border rounded-xl p-5 transition-all duration-300 cursor-pointer ${
                                  isActive
                                    ? 'border-[#534ab7] bg-purple-50 text-purple-900 shadow-sm'
                                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                                }`}
                              >
                                <h5 className={`font-bold text-base md:text-lg font-noto transition-colors duration-300 ${isActive ? 'text-purple-900' : 'text-gray-800'}`}>
                                  {t(chip.title, lang)}
                                </h5>
  
                                {/* Expandable content */}
                                <div className={`grid transition-all duration-300 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}>
                                  <div className="overflow-hidden min-h-0">
                                    <p className="text-sm text-gray-600 leading-relaxed font-noto">
                                      {t(chip.desc, lang)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {activeItem.design.designSystemDesc && (
                  <div className="mb-12"><p className="text-lg md:text-xl text-gray-600 leading-relaxed font-noto max-w-4xl">{t(activeItem.design.designSystemDesc, lang)}</p></div>
                )}

                {isApp && (activeItem.design.architectureImg || (activeItem.design.bentoComponents && activeItem.design.bentoComponents.length > 0) || (activeItem.design.componentsImages && activeItem.design.componentsImages.length > 0)) && (
                  <div>
                    <SubHeading>{I18N[lang].project.designSystem}</SubHeading>

                    {/* Architecture Image */}
                    {activeItem.design.architectureImg && (
                      <div className="w-full bg-[#FAFAFA] rounded-[2rem] overflow-hidden mb-12 p-8 shadow-sm border border-gray-100 flex items-center justify-center min-h-[300px]">
                        <img src={activeItem.design.architectureImg} className="w-full h-auto object-cover rounded-xl" alt="Design System Architecture" onError={(e) => e.target.style.display = 'none'} />
                        {/* Placeholder text if image is empty */}
                        {!activeItem.design.architectureImg && <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Architecture Diagram</p>}
                      </div>
                    )}

                    {/* Bento Box Grid */}
                    {activeItem.design.bentoComponents && activeItem.design.bentoComponents.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-16">
                        {(() => {
                          const comps = activeItem.design.bentoComponents;
                          const hasInputAndNav = comps.some(c => c.liveComponent === 'input') && comps.some(c => c.liveComponent === 'navigation');

                          if (!hasInputAndNav) {
                            return comps.map((comp, idx) => (
                              <div
                                key={idx}
                                className={`relative bg-[#FAFAFA] rounded-[2rem] p-4 md:p-6 shadow-sm border border-gray-100 min-h-[200px] flex flex-col transition-all ${comp.liveComponent ? '' : 'overflow-hidden'} ${comp.colSpan === 2 ? 'col-span-1 md:col-span-2 xl:col-span-2' : 'col-span-1 md:col-span-1 xl:col-span-1'}`}
                              >
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">{comp.name}</span>

                                {/* Live Component Preview */}
                                {comp.liveComponent === 'navigation' ? (
                                  <GSATNavigationShowcase lang={lang} />
                                ) : comp.liveComponent === 'button' ? (
                                  <GSATButtonShowcase lang={lang} />
                                ) : comp.liveComponent === 'dropdown' ? (
                                  <GSATDropdownShowcase lang={lang} />
                                ) : comp.liveComponent === 'input' ? (
                                  <GSATInputShowcase lang={lang} />
                                ) : comp.liveComponent === 'subject' ? (
                                  <GSATSubjectCardsShowcase lang={lang} />
                                ) : comp.liveComponent === 'progress' ? (
                                  <GSATProgressShowcase lang={lang} />
                                ) : comp.liveComponent === 'accordion' ? (
                                  <GSATAccordionShowcase lang={lang} />
                                ) : (
                                  <div className="flex-1 flex items-center justify-center">
                                    <img src={comp.previewImg} className="w-4/5 h-auto object-contain transition-transform duration-500" alt={comp.name} onError={(e) => e.target.style.display = 'none'} />
                                  </div>
                                )}

                                {/* 查看元件資訊按鈕 */}
                                <button
                                  onClick={() => setSelectedComponent(comp)}
                                  className={`absolute top-4 right-4 z-10 h-10 w-10 ${lang === 'zh' ? 'hover:w-[124px]' : 'hover:w-[162px]'} flex items-center justify-start overflow-hidden bg-white/80 hover:bg-white border border-gray-200/60 backdrop-blur-md shadow-sm hover:shadow-md rounded-full p-0 pl-2.5 hover:pr-3.5 transition-all duration-500 ease-in-out group/btn text-gray-700 hover:text-gray-950 cursor-pointer`}
                                  title={lang === 'zh' ? '查看元件資訊' : 'View Component Info'}
                                >
                                  <IconSearch className="w-5 h-5 flex-shrink-0" />
                                  <span className="text-xs font-bold font-noto opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ease-in-out overflow-hidden whitespace-nowrap ml-2">
                                    {lang === 'zh' ? '查看元件資訊' : 'View Component Info'}
                                  </span>
                                </button>
                              </div>
                            ));
                          }

                          // Custom grid layout if both input and navigation exist (MS Lin)
                          const buttonComp = comps.find(c => c.liveComponent === 'button');
                          const inputComp = comps.find(c => c.liveComponent === 'input');
                          const navComp = comps.find(c => c.liveComponent === 'navigation');
                          const dropdownComp = comps.find(c => c.liveComponent === 'dropdown');
                          const cardsComp = comps.find(c => c.name === 'Cards & Containers' || c.name === 'Progress Bar and Step Indicator' || c.liveComponent === 'progress');
                          const accordionComp = comps.find(c => c.name === 'Accordion' || c.liveComponent === 'accordion');
                          const subjectComp = comps.find(c => c.name === 'Subject Cards' || c.liveComponent === 'subject');

                          const renderCard = (comp, customClassName = '') => {
                            if (!comp) return null;
                            const isLive = !!comp.liveComponent;
                            return (
                              <div
                                key={comp.name}
                                className={`relative bg-[#FAFAFA] rounded-[2rem] p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col transition-all ${isLive ? '' : 'overflow-hidden'} ${customClassName}`}
                              >
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">{comp.name}</span>

                                {/* Live Component Preview */}
                                {comp.liveComponent === 'navigation' ? (
                                  <GSATNavigationShowcase lang={lang} />
                                ) : comp.liveComponent === 'button' ? (
                                  <GSATButtonShowcase lang={lang} />
                                ) : comp.liveComponent === 'dropdown' ? (
                                  <GSATDropdownShowcase lang={lang} />
                                ) : comp.liveComponent === 'input' ? (
                                  <GSATInputShowcase lang={lang} />
                                ) : comp.liveComponent === 'subject' ? (
                                  <GSATSubjectCardsShowcase lang={lang} />
                                ) : comp.liveComponent === 'progress' ? (
                                  <GSATProgressShowcase lang={lang} />
                                ) : comp.liveComponent === 'accordion' ? (
                                  <GSATAccordionShowcase lang={lang} />
                                ) : (
                                  <div className="flex-1 flex items-center justify-center">
                                    <img src={comp.previewImg} className="w-4/5 h-auto object-contain transition-transform duration-500" alt={comp.name} onError={(e) => e.target.style.display = 'none'} />
                                  </div>
                                )}

                                {/* 查看元件資訊按鈕 */}
                                <button
                                  onClick={() => setSelectedComponent(comp)}
                                  className={`absolute top-4 right-4 z-10 h-10 w-10 ${lang === 'zh' ? 'hover:w-[124px]' : 'hover:w-[162px]'} flex items-center justify-start overflow-hidden bg-white/80 hover:bg-white border border-gray-200/60 backdrop-blur-md shadow-sm hover:shadow-md rounded-full p-0 pl-2.5 hover:pr-3.5 transition-all duration-500 ease-in-out group/btn text-gray-700 hover:text-gray-950 cursor-pointer`}
                                  title={lang === 'zh' ? '查看元件資訊' : 'View Component Info'}
                                >
                                  <IconSearch className="w-5 h-5 flex-shrink-0" />
                                  <span className="text-xs font-bold font-noto opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ease-in-out overflow-hidden whitespace-nowrap ml-2">
                                    {lang === 'zh' ? '查看元件資訊' : 'View Component Info'}
                                  </span>
                                </button>
                              </div>
                            );
                          };

                          return (
                            <>
                              {/* 1. Buttons (col-span-1) */}
                              {renderCard(buttonComp, 'col-span-1 md:col-span-1 xl:col-span-1 min-h-[200px]')}

                              {/* 2. Vertical Stack (Inputs & Forms + Navigation Bar) (col-span-1) */}
                              <div className="col-span-1 md:col-span-1 xl:col-span-1 flex flex-col gap-4 md:gap-6 h-full">
                                {renderCard(inputComp, 'flex-1')}
                                {renderCard(navComp, 'flex-1')}
                              </div>

                              {/* 3. Dropdowns & Menus (col-span-1) */}
                              {renderCard(dropdownComp, 'col-span-1 md:col-span-1 xl:col-span-1 min-h-[200px]')}

                              {/* 4. Subject Cards (col-span-1) */}
                              {renderCard(subjectComp, 'col-span-1 md:col-span-1 xl:col-span-1 min-h-[200px]')}

                              {/* 5. Cards & Containers (col-span-2) */}
                              {renderCard(cardsComp, 'col-span-1 md:col-span-2 xl:col-span-2 min-h-[200px]')}

                              {/* 6. Accordion (col-span-2) */}
                              {renderCard(accordionComp, 'col-span-1 md:col-span-2 xl:col-span-2 min-h-[200px]')}
                            </>
                          );
                        })()}
                      </div>
                    )}

                    {/* Fallback old componentsImages */}
                    {activeItem.design.componentsImages && activeItem.design.componentsImages.length > 0 && (!activeItem.design.bentoComponents || activeItem.design.bentoComponents.length === 0) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {activeItem.design.componentsImages.map((img, i) => (
                          <div key={i} className="bg-[#F6F6F6] rounded-[2rem] overflow-hidden flex items-center justify-center shadow-sm p-4 md:p-8">
                            <img src={img} className="w-full h-auto" alt="Component" onError={(e) => e.target.style.display = 'none'} />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* View All Components CTA */}
                    {(activeItem.design.bentoComponents && activeItem.design.bentoComponents.length > 0) && (
                      <div className="flex justify-center mt-12 pb-12 border-b border-gray-100">
                        <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold tracking-wide hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 shadow-lg flex items-center">
                          {lang === 'en' ? 'Explore Full Design System' : '探索完整 Design System'} <IconArrowUpRight className="w-5 h-5 ml-2" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {((activeItem.design.screens && activeItem.design.screens.length > 0) || (activeItem.design.screenGroups && activeItem.design.screenGroups.length > 0) || (activeItem.design.flowImages && activeItem.design.flowImages.length > 0) || activeItem.design.longScreenshot || (activeItem.design.webShowcaseStrip && activeItem.id !== 1)) && (
                  <div>
                    <SubHeading>{I18N[lang].project.screens}</SubHeading>

                    {/* 網站設計長條展示（影片＋圖片無縫拼接） */}
                    {activeItem.design.webShowcaseStrip && activeItem.id !== 1 && (
                      <WebShowcaseStrip items={activeItem.design.webShowcaseStrip} />
                    )}

                    {/* 長圖與標註區域 (如果有設定) */}
                    {activeItem.design.longScreenshot && (
                      <ScrollAnnotationView data={activeItem.design.longScreenshot} lang={lang} />
                    )}

                    {/* User Flow (Moved above screens) */}
                    {activeItem.design.flowImages && activeItem.design.flowImages.length > 0 && (
                      <div className="mb-16">
                        <h5 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 font-noto border-b border-gray-100 pb-2 inline-block">{I18N[lang].project.userFlow}</h5>
                        <div className="grid grid-cols-1 gap-6">
                          {activeItem.design.flowImages.map((img, i) => (
                            <div key={i} className="bg-[#FAFAFA] rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 p-4 md:p-8">
                              <img src={img} className="w-full h-auto object-contain" alt="Flow" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Screens Title (if needed, otherwise just groups) */}
                    {/* Screen Groups (Horizontal Scrollable) */}
                    {activeItem.design.screenGroups && activeItem.design.screenGroups.length > 0 && (
                      <div className="space-y-16 mb-12">
                        {activeItem.design.screenGroups.map((group, gIdx) => {
                          const hasTabs = group.tabs && group.tabs.length > 0;
                          const activeTabIdx = activeScreenTabs[gIdx] || 0;
                          const currentScreens = hasTabs ? group.tabs[activeTabIdx].screens : group.screens;

                          return (
                            <div key={gIdx} className="w-full">
                              <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                                <h5 className="text-xl md:text-2xl font-bold text-gray-900 font-noto border-b border-gray-100 pb-2 inline-block">{group.title}</h5>
                                {hasTabs && (
                                  <div className="bg-[#F5F5F5] p-1.5 rounded-[1.5rem] md:rounded-full flex flex-wrap gap-2 shadow-inner self-start md:self-end">
                                    {group.tabs.map((tab, tIdx) => (
                                      <button
                                        key={tIdx}
                                        onClick={() => setActiveScreenTabs(prev => ({ ...prev, [gIdx]: tIdx }))}
                                        className={`whitespace-nowrap px-4 md:px-6 py-2.5 rounded-full text-sm md:text-base font-medium font-noto transition-all duration-300 ${activeTabIdx === tIdx ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                                      >
                                        {tab.title}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <ScrollableScreenRow screens={currentScreens} groupTitle={hasTabs ? group.tabs[activeTabIdx].title : group.title} />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Fallback old screens grid */}
                    {activeItem.design.screens && activeItem.design.screens.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                        {activeItem.design.screens.map((screen, i) => (
                          <div key={i} className="bg-white rounded-[2rem] aspect-[9/16] overflow-hidden flex items-center justify-center shadow-sm">
                            <img src={screen} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Screen" onError={(e) => e.target.style.display = 'none'} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Showcases for Complex Layouts (e.g. Wisdome.ai) */}
                {activeItem.design.showcases && activeItem.design.showcases.map((showcase, i) => (
                  <div key={i} className="mb-24">
                    <h4 className="text-[24px] md:text-[36px] font-bold font-inter tracking-tight text-gray-900 mb-10">{t(showcase.title, lang)}</h4>
                    {showcase.description && (
                      <div className="flex flex-col gap-6 mb-12">
                        <SubHeading>{t(showcase.title, lang)} {lang === 'en' ? 'Showcase' : '呈現'}</SubHeading>
                        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-3xl font-noto whitespace-pre-line">{t(showcase.description, lang)}</p>
                      </div>
                    )}

                    {/* HeroVideo Showcase */}
                    {showcase.heroVideo && (
                      <div className="w-full aspect-video bg-[#EAEAEC] relative flex items-center justify-center mb-16 overflow-hidden rounded-[2rem]">
                        <OptimizedVideo src={showcase.heroVideo} className="w-full h-full object-cover relative z-10" />
                      </div>
                    )}

                    {/* Desktop + Mobile Video Showcase */}
                    {(showcase.desktopVideo || showcase.mobileVideo) && !showcase.fullpageImg && (
                      <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] items-start gap-12 lg:gap-20">
                        <div className="relative flex items-start">
                          {showcase.desktopVideo && (
                            <div className="w-4/5 lg:w-[75%] aspect-[16/10] bg-[#F6F6F6] rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-lg relative">
                              <OptimizedVideo src={showcase.desktopVideo} className="w-full h-full object-cover relative z-10" />
                            </div>
                          )}
                          {showcase.mobileVideo && (
                            <div className="absolute top-[15%] right-0 w-[35%] lg:w-[30%] aspect-[9/18] bg-[#EAEAEC] rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white translate-x-[5%] lg:translate-x-0">
                              <OptimizedVideo src={showcase.mobileVideo} className="w-full h-full object-cover relative z-10" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Fullpage Showcase (Wisdome.ai Success Stories) */}
                    {showcase.fullpageImg && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        <div className="lg:col-span-7 flex flex-col gap-12">
                          <div className="relative flex items-start w-full">
                            {showcase.desktopVideo && (
                              <div className="w-[85%] aspect-[16/10] bg-[#F6F6F6] rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-lg relative">
                                <OptimizedVideo src={showcase.desktopVideo} className="w-full h-full object-cover relative z-10" />
                              </div>
                            )}
                            {showcase.mobileVideo && (
                              <div className="absolute bottom-[-10%] right-0 w-[30%] aspect-[9/18] bg-[#EAEAEC] rounded-[1rem] md:rounded-[1.5rem] overflow-hidden shadow-2xl border-4 border-white">
                                <OptimizedVideo src={showcase.mobileVideo} className="w-full h-full object-cover relative z-10" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="lg:col-span-5 w-full">
                          <div className="w-full bg-[#EAEAEC] rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-xl border border-gray-200 relative group">
                            <div className="relative w-full h-[60vh] lg:h-[80vh] overflow-y-auto hide-scrollbar bg-white">
                              <img src={showcase.fullpageImg} className="w-full h-auto relative z-10 hover:opacity-95 transition-opacity" alt="" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20 flex items-end justify-center pb-4 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                              <span className="text-white text-xs tracking-widest uppercase font-bold drop-shadow-md">{lang === 'en' ? 'Scroll down to view' : '向下捲動查看'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {activeItem.design.prototypeUrl && (
                  <div>
                    <SubHeading>{I18N[lang].project.prototype}</SubHeading>
                    <div className="w-full aspect-[4/3] md:aspect-video bg-[#EAEAEC] rounded-[2rem] overflow-hidden flex justify-center relative shadow-inner">
                      <OptimizedVideo src={activeItem.design.prototypeUrl} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
                {activeItem.design.usabilityTesting && (
                  <div><SubHeading>{I18N[lang].project.usability}</SubHeading><p className="text-xl text-gray-600 leading-relaxed font-noto max-w-4xl whitespace-pre-line">{t(activeItem.design.usabilityTesting, lang)}</p></div>
                )}
              </div>
            </div>
          )}

          {/* 反思與迭代區塊 */}
          {activeItem.id === 1 && (
            <div 
              ref={reflectionRef}
              className="max-w-[100rem] mx-auto px-4 md:px-12 mb-24 md:mb-40 mt-12"
            >
              <ProjectSectionHeader num={getSectionNum()} title={lang === 'zh' ? '成果與反思' : 'Reflection & Iteration'} />
              <p className="text-sm md:text-base text-gray-500 font-semibold font-noto -mt-6 mb-8 select-none">
                {lang === 'zh' ? '誠實評估，比展示光鮮更有說服力。' : 'Honest assessment is more convincing than a polished showcase.'}
              </p>

              {/* 2x2 Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {REFLECTION_CARDS.map((card, idx) => (
                  <div
                    key={idx}
                    className={`bg-white border border-gray-200 rounded-[12px] p-4 flex gap-4 transition-all duration-700 ease-out transform ${
                      reflectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div className={`p-3 rounded-xl ${card.iconBg} ${card.iconColor} h-fit flex-shrink-0 flex items-center justify-center`}>
                      {card.icon}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-gray-900 font-noto">
                        {t(card.title, lang)}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed font-noto">
                        {t(card.desc, lang)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 06 Mascot Design */}
          {hasMascot && (
            <div className="w-full mb-24 md:mb-40 bg-[#FAFAFA] py-24 md:py-32">
              <div className="max-w-[100rem] mx-auto px-4 md:px-12">
                <ProjectSectionHeader num={getSectionNum()} title={I18N[lang].project.mascot} />
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-noto max-w-4xl mb-12">{t(activeItem.mascotDesign.description, lang)}</p>
                {activeItem.mascotDesign.images && activeItem.mascotDesign.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {activeItem.mascotDesign.images.map((img, i) => (
                      <div key={i} className="bg-white rounded-[2rem] aspect-square overflow-hidden shadow-sm flex items-center justify-center">
                        {img.endsWith('.mp4') ? <OptimizedVideo src={img} className="w-full h-full object-cover" /> : <img src={img} className="w-full h-full object-cover" alt="Mascot" onError={(e) => e.target.style.display = 'none'} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Component Detail Modal */}
          {selectedComponent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedComponent(null)}>
              <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100">
                  <h3 className="text-2xl font-bold font-inter text-gray-900">
                    {selectedComponent.name} {lang === 'zh' ? '規格資訊' : 'Specs'}
                  </h3>
                  <button onClick={() => setSelectedComponent(null)} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900 cursor-pointer">
                    <IconX className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 md:p-10 overflow-y-auto bg-[#FAFAFA] flex-1 flex items-center justify-center min-h-[50vh]">
                  {selectedComponent.specsImg ? (
                    <img src={selectedComponent.specsImg} alt={`${selectedComponent.name} Specs`} className="w-full h-auto object-contain max-h-[70vh] rounded-xl shadow-sm border border-gray-200" />
                  ) : (
                    <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-gray-200/50 shadow-inner flex flex-col items-center justify-center max-w-md mx-auto">
                      <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange-500 animate-pulse">
                        <IconSearch className="w-8 h-8" />
                      </div>
                      <p className="font-bold text-gray-800 text-lg mb-2">
                        {lang === 'zh' ? '規格資訊即將推出' : 'Specs details coming soon'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {lang === 'zh' ? '我們正在整理此元件的詳細設計規格書，敬請期待。' : 'We are preparing the detailed design specs for this component. Stay tuned.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      );
    };

  const BRAINBOX_SECTIONS = [
    {
      id: 'brand-identity',
      num: '01',
      title: { zh: '品牌識別系統', en: 'Brand Identity System' },
      badge: 'Brand Identity',
      subtitle: { zh: '建立品牌核心視覺規範，包含 Logo 設計、標準字與品牌色彩計畫。', en: 'Core brand visual specs including logo, typography, and color schemes.' },
      iconBg: '#EEEDFE',
      iconColor: '#534AB7',
      images: [
        { label: { zh: 'Logo 概念發展', en: 'Logo Concept Development' } },
        { label: { zh: '品牌色彩系統', en: 'Brand Color System' } },
        { label: { zh: '規範文件', en: 'Guidelines Documentation' } }
      ],
      desc: {
        zh: '智慧教育系統的品牌視覺起點。我們以代表智慧的紫色與科技感十足的冷灰色調為核心，設計出俐落具現代感的標誌與標準字。透過嚴格的色彩與應用規範，確保產品在各個接觸點皆能傳遞一致、專業的企業形象。',
        en: 'The start of the smart education brand vision. We used wisdom purple and tech cool grey as our core to design a sleek, modern mark and typography. Strict color and application rules ensure the brand stays consistent and professional across all touchpoints.'
      }
    },
    {
      id: 'brand-mascot',
      num: '02',
      title: { zh: '品牌吉祥物', en: 'Brand Mascot' },
      badge: 'Brand Mascot',
      subtitle: { zh: '設計代表性品牌吉祥物，拉近與使用者的距離，增加互動趣味。', en: 'Create a brand mascot to connect with users and make learning fun.' },
      iconBg: '#FAECE7',
      iconColor: '#993C1D',
      images: [
        { label: { zh: '角色設計稿', en: 'Character Design Drafts' } },
        { label: { zh: '情境插圖', en: 'Contextual Illustrations' } },
        { label: { zh: '吉祥物動畫', en: 'Mascot Animation' } }
      ],
      desc: {
        zh: '為了讓看似冰冷的教育科技系統更具溫度與親和力，我們打造了專屬吉祥物「Pixie」。從初期的草稿設定、三視圖、各類教學情境的插圖應用，到簡單的 UI 反饋動畫，讓吉祥物成為學習旅程中陪伴學生的好夥伴。',
        en: 'To bring warmth and approachability to EdTech software, we crafted our dedicated mascot "Pixie." From sketches, three-view turnarounds, and learning scenario illustrations to simple UI feedback animations, the mascot accompanies students along their journey.'
      }
    },
    {
      id: 'illustration-system',
      num: '03',
      title: { zh: '系統插圖', en: 'Illustration System' },
      badge: 'Illustration System',
      subtitle: { zh: '規劃全站式系統插圖系統，提升畫面美感並傳遞指引資訊。', en: 'Plan a system-wide illustration library to raise aesthetic appeal and deliver guidance.' },
      iconBg: '#E1F5EE',
      iconColor: '#0F6E56',
      images: [
        { label: { zh: 'Empty state', en: 'Empty State Screens' } },
        { label: { zh: 'Onboarding', en: 'Onboarding Flows' } },
        { label: { zh: '功能說明插圖', en: 'Feature Explainers' } }
      ],
      desc: {
        zh: '為提升系統的易用性與視覺層次，我們規劃了一套完整的向量插圖系統。涵蓋了 Onboarding 引導、功能說明，以及各類 Empty States（如無資料、連線中斷等頁面），用圖像化的方式輔助引導使用者進行操作。',
        en: 'To upgrade usability and styling layers, we organized a vector illustration package. This covers onboarding guidance, feature explainers, and various empty states (like no-data or disconnected screens) to assist user actions graphically.'
      }
    },
    {
      id: 'icon-system',
      num: '04',
      title: { zh: 'Icon 設計系統', en: 'Icon System' },
      badge: 'Icon System',
      subtitle: { zh: '統整全站靜態與動態 Icon 規範，維持介面一致性。', en: 'Harmonize static and motion icon rules for interface consistency.' },
      iconBg: '#FAEEDA',
      iconColor: '#854F0B',
      images: [
        { label: { zh: '靜態 Icon 總覽', en: 'Static Icon Library' } },
        { label: { zh: '動態 Icon', en: 'Animated Micro-Icons' } },
        { label: { zh: '規範文件', en: 'Guidelines Documentation' } }
      ],
      desc: {
        zh: '針對教師與學生雙端複雜的功能入口，我們重新梳理並設計了整套 Icon 系統。遵循統一的格線（24x24px）、筆畫粗細與圓角規範，並針對關鍵操作入口加入滑鼠 hover 觸發的微動態 Icon，提升產品的精緻度與回饋感。',
        en: 'Addressing complex dashboard entries for teachers and students, we rebuilt the icon library. Following uniform grids (24x24px), stroke weights, and corner rules, we added hover-triggered micro-animated icons at main actions for premium delight.'
      }
    },
    {
      id: 'motion-design',
      num: '05',
      title: { zh: '系統動畫', en: 'Motion Design' },
      badge: 'Motion Design',
      subtitle: { zh: '規劃關鍵操作微互動與 Loading 動畫，創造流暢介面體驗。', en: 'Plan micro-interactions and loading animations for fluid interactions.' },
      iconBg: '#E6F1FB',
      iconColor: '#185FA5',
      images: [
        { label: { zh: 'Loading 動畫', en: 'Loading Animation' } },
        { label: { zh: '介面轉場', en: 'Interface Transitions' } },
        { label: { zh: '動態規範', en: 'Motion Guidelines' } }
      ],
      desc: {
        zh: '精緻的微交互是卓越產品的關鍵。我們設計了啟動 Loading 動畫、答題反饋、以及頁面與彈窗的過渡轉場動態。透過流暢的貝氏曲線數值設定，使介面動作自然且毫不拖沓，並制定了完整的 Motion Style Guide。',
        en: 'Polished micro-interactions define great products. We designed loading screens, answers feedback, and smooth transitions for popups. Custom Bezier curves keep actions natural and snappy, all documented in our Motion Style Guide.'
      }
    }
  ];



  const BrainBoxVisualProjectView = ({ activeItem, lang, transitionTo, setCurrentPage, setActiveItem, setIsMobileMenuOpen, navigateTo }) => {
    // Interactions state
    const [activeMascotIndex, setActiveMascotIndex] = useState(0);
    const [activeIconIndex, setActiveIconIndex] = useState(0);
    const [activeUiSlide, setActiveUiSlide] = useState(0);

    useEffect(() => {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      const style = document.createElement('style');
      style.innerHTML = `
        .bento-card-focus:focus-visible {
          outline: 2px solid #F2703C !important;
          outline-offset: 4px !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .bento-transition-element {
            transition: none !important;
            animation: none !important;
          }
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(link);
        document.head.removeChild(style);
      };
    }, []);



    // Asset Lists
    const MASCOT_ASSETS = [
      { label: '待機', url: 'projects/brainbox/待機.webm', status: '待機 (Idle)', desc: '吉祥物在無操作、系統休眠或待機時的預設狀態。' },
      { label: '眨眼提醒', url: 'projects/brainbox/眨眼提醒.webm', status: '眨眼提醒 (Blink Reminder)', desc: '吉祥物進行溫馨提示、引導或出現學習指引時的眨眼狀態。' },
      { label: '好棒', url: 'projects/brainbox/好棒.webm', status: '好棒 (Excellent)', desc: '吉祥物在使用者答題正確、取得高分或達成進度時的慶祝狀態。' },
      { label: '結尾', url: 'projects/brainbox/結尾.webm', status: '結尾 (Ending)', desc: '學習任務完成、完成測驗或系統登出結束時的告別狀態。' }
    ];

    const ANIMATED_ICON_ASSETS = [
      { label: '總覽', url: 'projects/brainbox/motion-icon/overview.webm', iconUrl: 'projects/brainbox/icon/overview.svg', desc: '學習主頁總覽與個人數據儀表板的切換微動態。' },
      { label: '課程', url: 'projects/brainbox/motion-icon/course.webm', iconUrl: 'projects/brainbox/icon/course.svg', desc: '進入課程地圖、學習單元或講義下載時的切換動畫。' },
      { label: '考試中心', url: 'projects/brainbox/motion-icon/test-center.webm', iconUrl: 'projects/brainbox/icon/test-center.svg', desc: '管理歷次大型模考、預約實體考場或下載准考證的入口動態。' },
      { label: '錯題複習', url: 'projects/brainbox/motion-icon/review.webm', iconUrl: 'projects/brainbox/icon/review-center.svg', desc: '進入錯題本、查看錯題分析或重新演練題目時的重溫動畫。' },
      { label: '學習報告', url: 'projects/brainbox/motion-icon/report.webm', iconUrl: 'projects/brainbox/icon/report.svg', desc: '分析成績分佈、產出雷達圖與學習盲點診斷時的報告動畫。' },
      { label: '教師中心', url: 'projects/brainbox/motion-icon/educator-hub.webm', iconUrl: 'projects/brainbox/icon/edu-hub.svg', desc: '切換至教師管理後台、查看班級表現與派發作業的切換動態。' },
      { label: '學科', url: 'projects/brainbox/motion-icon/subject.webm', iconUrl: 'projects/brainbox/icon/subject.svg', desc: '自訂考試科目分類、查看弱勢學科或切換領域學分時的動態。' },
      
      { label: '練習', url: 'projects/brainbox/motion-icon/practice.webm', iconUrl: 'projects/brainbox/icon/practice.svg', desc: '開始每日練習、章節測驗與題目解析時的引導動態。', isWhite: true },
      { label: '模擬考試', url: 'projects/brainbox/motion-icon/mock-test.webm', iconUrl: 'projects/brainbox/icon/mock-test.svg', desc: '生成全真模擬考卷、進行倒數計時與提交考卷的儀式動畫。', isWhite: true },
      { label: '測驗', url: 'projects/brainbox/motion-icon/test-history.webm', iconUrl: 'projects/brainbox/icon/test.svg', desc: '快速發起隨堂小測驗、進行即時評分與計時挑戰的反饋動態。', isWhite: true },
      { label: '數學', url: 'projects/brainbox/motion-icon/math.webm', iconUrl: 'projects/brainbox/icon/math.svg', desc: '進入 SAT 數學學科章節、公式卡或專題訓練的切換動態。', isWhite: true },
      { label: '閱讀', url: 'projects/brainbox/motion-icon/reading.webm', iconUrl: 'projects/brainbox/icon/reading.svg', desc: '進入 SAT 閱讀理解、長難句拆解與字彙卡學習的切換動態。', isWhite: true },
      { label: '寫作', url: 'projects/brainbox/motion-icon/writing.webm', iconUrl: 'projects/brainbox/icon/writing.svg', desc: '進入 SAT 語法寫作、作文演練與 AI 批改時的筆觸動態。', isWhite: true },
      { label: '歷次考績', url: 'projects/brainbox/motion-icon/test.webm', iconUrl: 'projects/brainbox/icon/test-history.svg', desc: '回溯歷史成績記錄、分析分數成長曲線或導出歷史記錄的動態。', isWhite: true }
    ];

    const META_CARDS = [
      { label: lang === 'zh' ? '角色' : 'Role', value: 'Visual Designer' },
      { label: lang === 'zh' ? '時程' : 'Timeline', value: '2023–2024' },
      { label: lang === 'zh' ? '工具' : 'Tools', value: 'Figma · After Effects' },
      { label: lang === 'zh' ? '交付物' : 'Deliverables', value: lang === 'zh' ? '5 個系統' : '5 Systems' }
    ];



    return (
      <div className="bg-white animate-in fade-in duration-700 min-h-screen pb-32">
        {/* SECTION 00 — HERO */}
        <div className="max-w-[100rem] mx-auto px-4 md:px-12 pt-32 md:pt-36">
          <BackButton transitionTo={transitionTo} setCurrentPage={setCurrentPage} setActiveItem={setActiveItem} setIsMobileMenuOpen={setIsMobileMenuOpen} lang={lang} />
          <h1 
            className="text-gray-900 font-extrabold tracking-[-2px] leading-[0.95] mb-0 select-none font-inter uppercase md:whitespace-nowrap" 
            style={{ fontSize: 'clamp(32px, 5.5vw, 84px)' }}
          >
            BrainBox 產品視覺設計
          </h1>
        </div>

        {/* METADATA ROW */}
        <div className="max-w-[100rem] mx-auto px-4 md:px-12 pt-5 pb-5 flex flex-wrap items-center text-[13px] text-gray-500 leading-relaxed gap-2 select-none">
          <span>{lang === 'zh' ? '視覺設計師' : 'Visual Designer'}</span>
          <span className="h-3 w-[1px] bg-gray-200 hidden sm:inline-block"></span>
          <span>2023 — 2024</span>
          <span className="h-3 w-[1px] bg-gray-200 hidden sm:inline-block"></span>
          <span>Figma / After Effects</span>
          <span className="h-3 w-[1px] bg-gray-200 hidden sm:inline-block"></span>
          <span>{lang === 'zh' ? '5 大系統設計' : '5 Systems Design'}</span>
        </div>

        <div className="w-full md:w-screen md:relative md:left-1/2 md:-translate-x-1/2 rounded-2xl md:rounded-none bg-gray-100 mt-6 md:mt-8 select-none overflow-hidden h-auto">
          <img
            src="projects/brainbox/brainbox-innerpage-cover.png"
            alt="BrainBox Hero Cover"
            className="w-full h-auto block"
          />
        </div>

        {/* Global Case Study Content */}
        <div className="max-w-[100rem] mx-auto px-4 md:px-12 mt-8">
          
          {/* SECTION 01 — 專案概述 */}
          <div id="project-overview" className="scroll-mt-24">
            <SectionHeader num="01" title={lang === 'zh' ? '專案概述' : 'Project Overview'} />
            
            <div className="space-y-12">
              {/* Problem box */}
              <div 
                className="border-l-[3px] border-[#E8734A] bg-[#FDF6F0] p-6 md:p-10 max-w-6xl rounded-r-2xl"
              >
                <span className="text-xs font-bold text-[#E8734A] uppercase tracking-widest mb-3 block">
                  {lang === 'zh' ? '核心視覺挑戰' : 'CORE VISUAL CHALLENGE'}
                </span>
                <p className="text-xl md:text-3xl font-bold text-gray-900 leading-relaxed font-noto">
                  {lang === 'zh' 
                    ? '如何為全新的 SAT 線上備考系統建立完整視覺語言——從品牌識別到動態設計，讓產品在第一眼就傳遞專業與信任？'
                    : 'How to build a complete visual language for a brand new SAT prep system—from brand identity to motion design—ensuring the product conveys professionalism and trust at first glance?'}
                </p>
              </div>

              {/* 4 meta cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
                {[
                  { label: lang === 'zh' ? '角色' : 'Role', value: 'Visual Designer' },
                  { label: lang === 'zh' ? '時程' : 'Timeline', value: '2023–2024' },
                  { label: lang === 'zh' ? '工具' : 'Tools', value: 'Figma · After Effects' },
                  { label: lang === 'zh' ? '產業' : 'Industry', value: 'EdTech · SaaS' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col justify-center min-h-[100px] select-none">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 leading-none">{item.label}</span>
                    <span className="text-sm md:text-base font-bold text-gray-800 leading-snug">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* 2-column text block */}
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20 max-w-6xl pt-2">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block select-none">
                    {lang === 'zh' ? '專案背景' : 'PROJECT BACKGROUND'}
                  </span>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium font-noto">
                    {lang === 'zh' 
                      ? 'BrainBox 是由 Wisdome.ai 開發，為 SAT 考生打造的個性化線上備考系統。我負責整體視覺設計系統，包含品牌識別、插圖、icon 與動態設計，並與 UI/UX 設計師合作確保視覺與 UI 框架一致。'
                      : 'BrainBox is a personalized online SAT prep system developed by Wisdome.ai. I was responsible for the overall visual design system, including brand identity, illustrations, icons, and motion design, collaborating with UI/UX designers to align the visual system with the UI framework.'}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block select-none">
                    {lang === 'zh' ? '團隊組成' : 'TEAM COMPOSITION'}
                  </span>
                  <ul className="space-y-3 text-sm md:text-base text-gray-600 font-medium font-noto list-none pl-0">
                    <li>• Visual Designer（{lang === 'zh' ? '本人' : 'Me'}）</li>
                    <li>• UI/UX {lang === 'zh' ? '設計師 x1' : 'Designer x1'}</li>
                    <li>• {lang === 'zh' ? '前端工程師 x1' : 'Frontend Engineer x1'}</li>
                    <li>• {lang === 'zh' ? '產品經理 x1' : 'Product Manager x1'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[0.5px] bg-[#e5e5e5] my-10" />

          {/* SECTION 02 — 品牌識別系統 */}
          <div id="brand-identity" className="scroll-mt-24">
            <SectionHeader num="02" title={lang === 'zh' ? '品牌識別系統' : 'Brand Identity System'} />
            
            <p className="text-base md:text-lg text-gray-600 font-medium font-noto leading-relaxed max-w-3xl mb-12">
              {lang === 'zh'
                ? '建立兼具專業感與親和力的視覺識別規範，確保品牌在所有接觸點呈現一致形象。'
                : 'Establish visual identity specs combining professionalism with approachability, ensuring a unified image across all touchpoints.'}
            </p>

            <div className="space-y-12">
              {/* Sub-section 1 — 標誌規範展示 */}
              <div>
                <SubHeading>{lang === 'zh' ? '1. 標誌規範展示' : '1. Logo Standards Display'}</SubHeading>
                
                <div className="relative w-full">
                  {/* Cards Grid container */}
                  <div 
                    className="grid grid-cols-12 gap-6 bento-transition-element"
                    style={{ fontFamily: "'Manrope', 'PingFang TC', 'Noto Sans TC', 'Microsoft JhengHei', sans-serif" }}
                  >
                    
                    {/* Card 1: Logo */}
                    <div 
                      className="group relative bg-[#F5F6F8] hover:bg-[#EFF1F5] rounded-[20px] p-[28px] transition-all duration-300 ease-out border border-[#E7E9EE] flex flex-col justify-between overflow-hidden bento-card-focus focus-visible:outline-none bento-transition-element col-span-12 lg:col-span-4"
                      tabIndex={0}
                    >
                      <div className="w-full bg-white border border-[#E7E9EE] rounded-[16px] flex items-center justify-center overflow-hidden h-[180px] select-none p-6">
                        <img src="projects/brainbox/BrainBox_logo set-01.png" alt="BrainBox Logo Standard" className="max-w-full max-h-full object-contain" />
                      </div>
                      
                      <div className="mt-5 space-y-1.5">
                        <div className="text-[15.5px] font-extrabold text-[#12172B] font-noto">
                          {lang === 'zh' ? '品牌標誌 (Logo)' : 'Brand Logo'}
                        </div>
                        <div className="text-[13px] leading-[1.65] text-[#727C8F] font-medium font-noto">
                          {lang === 'zh' 
                            ? '以六角形作為視覺主體，結合簡潔的無襯線字體，呈現創新且穩健可靠的形象。'
                            : 'Hexagon visual centerpiece combined with a clean sans-serif typeface, conveying a forward-thinking and reliable image.'}
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Graph */}
                    <div 
                      className="group relative bg-[#F5F6F8] hover:bg-[#EFF1F5] rounded-[20px] p-[28px] transition-all duration-300 ease-out border border-[#E7E9EE] flex flex-col justify-between overflow-hidden bento-card-focus focus-visible:outline-none bento-transition-element col-span-12 lg:col-span-8"
                      tabIndex={0}
                    >
                      <div className="flex flex-col sm:flex-row gap-4 w-full h-auto sm:h-[180px]">
                        <div className="w-full sm:w-[45%] bg-white border border-[#E7E9EE] rounded-[16px] flex items-center justify-center overflow-hidden h-[150px] sm:h-full select-none p-4">
                          <img src="projects/brainbox/BrainBox_logo_graph.svg" alt="BrainBox Graph Geometry" className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-grow flex items-center justify-center bg-white border border-[#E7E9EE] rounded-[16px] h-[150px] sm:h-full w-full sm:w-[50%] p-4 select-none">
                          <img src="projects/brainbox/graphic-seperate.svg" alt="BrainBox Graphic Separate Breakdown" className="max-w-full max-h-full object-contain" />
                        </div>
                      </div>

                      <div className="mt-5 space-y-1.5">
                        <div className="text-[15.5px] font-extrabold text-[#12172B] font-noto">
                          {lang === 'zh' ? '圖形與幾何 (Graph & Structure)' : 'Graph & Structure'}
                        </div>
                        <div className="text-[13px] leading-[1.65] text-[#727C8F] font-medium font-noto">
                          {lang === 'zh' 
                            ? '透過分割的六角形構成立體多面箱子，隱藏首字母縮寫「BB」，象徵承載知識的寶箱。'
                            : 'Hexagon divided by intersecting lines forming a 3D multifaceted box hiding the initials "BB", representing a chest of knowledge.'}
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Logotype */}
                    <div 
                      className="group relative bg-[#F5F6F8] hover:bg-[#EFF1F5] rounded-[20px] p-[28px] transition-all duration-300 ease-out border border-[#E7E9EE] flex flex-col justify-between overflow-hidden bento-card-focus focus-visible:outline-none bento-transition-element col-span-12"
                      tabIndex={0}
                    >
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
                        <div className="w-full md:w-[40%] bg-white border border-[#E7E9EE] rounded-[16px] flex items-center justify-center h-[120px] p-4 select-none">
                          <img src="projects/brainbox/BrainBox_logo set-04.png" alt="BrainBox Logotype" className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="w-full md:w-[55%] space-y-2 text-left">
                          <div className="text-[15.5px] font-extrabold text-[#12172B] font-noto">
                            {lang === 'zh' ? '文字標誌 (Logotype)' : 'Brand Logotype'}
                          </div>
                          <div className="text-[13px] leading-[1.65] text-[#727C8F] font-medium font-noto">
                            {lang === 'zh' 
                              ? '在兩個字母「B」上巧妙加入筆畫分割，呼應圖形標誌線條分割的統一設計語彙。'
                              : 'Wordmark featuring split strokes on B\'s, echoing the unified design language of the segmented graphic logo.'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Lockups & Reversed */}
                    <div 
                      className="group relative transition-all duration-300 ease-out border rounded-[20px] p-[28px] flex flex-col justify-between overflow-hidden bento-card-focus focus-visible:outline-none bento-transition-element col-span-12 bg-[#F5F6F8] hover:bg-[#EFF1F5] border-[#E7E9EE] text-[#12172B]"
                      tabIndex={0}
                    >
                      <div className="w-full space-y-6">
                        <div className="space-y-1.5 text-left">
                          <div className="text-[15.5px] font-extrabold text-[#12172B] font-noto">
                            {lang === 'zh' ? '組合形式與應用 (Lockups & Variations)' : 'Lockups & Variations'}
                          </div>
                          <div className="text-[13px] leading-[1.65] text-[#727C8F] font-medium font-noto">
                            {lang === 'zh' 
                              ? '包含橫向、兩行與反白等組合，因應不同應用載體自由調整以確保最佳的適應性與辨識度。'
                              : 'Includes horizontal, two-line, and reversed layouts for flexible adaptation across diverse media viewports.'}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                          <div className="bg-white border border-[#E7E9EE] rounded-[16px] flex flex-col items-center justify-center p-4 h-[140px] select-none">
                            <img src="projects/brainbox/BrainBox_logo set-01.png" alt="Standard Lockup" className="max-w-[85%] max-h-[70%] object-contain" />
                            <span className="text-[10px] font-bold text-[#727C8F] mt-2 font-manrope uppercase tracking-wider">Horizontal</span>
                          </div>
                          <div className="bg-white border border-[#E7E9EE] rounded-[16px] flex flex-col items-center justify-center p-4 h-[140px] select-none">
                            <img src="projects/brainbox/BrainBox_logo set-02.png" alt="Stacked Lockup" className="max-w-[80%] max-h-[70%] object-contain" />
                            <span className="text-[10px] font-bold text-[#727C8F] mt-2 font-manrope uppercase tracking-wider">Two-line Stacked</span>
                          </div>
                          <div className="bg-white border border-[#E7E9EE] rounded-[16px] flex flex-col items-center justify-center p-4 h-[140px] select-none">
                            <img src="projects/brainbox/BrainBox_logo set-03.png" alt="Monochrome Lockup" className="max-w-[85%] max-h-[70%] object-contain" />
                            <span className="text-[10px] font-bold text-[#727C8F] mt-2 font-manrope uppercase tracking-wider">Monochrome</span>
                          </div>
                          {/* Reversed Dark Card on brand blue bg-[#2d308a] */}
                          <div className="bg-[#2d308a] rounded-[16px] flex flex-col items-center justify-center p-4 h-[140px] select-none shadow-inner border border-transparent">
                            <img src="projects/brainbox/BrainBox_logo set-05.png" alt="Reversed Lockup" className="max-w-[80%] max-h-[70%] object-contain" />
                            <span className="text-[10px] font-bold text-white/70 mt-2 font-manrope uppercase tracking-wider">Reversed Dark</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Sub-section 2 — 品牌色彩系統 */}
              <div>
                <SubHeading>{lang === 'zh' ? '2. 品牌色彩系統' : '2. Brand Color System'}</SubHeading>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <p className="text-base md:text-lg text-gray-600 font-medium font-noto leading-relaxed max-w-xl">
                    {lang === 'zh' 
                      ? '為突顯科技感與智慧特質，我們以亮眼的 Primary Blue (#2d308a) 作為視覺重心，搭配醒目的 Accent Yellow (#FFD600) 用於焦點回饋與提示，創造兼具專業度與親和力的備考介面。' 
                      : 'To highlight tech attributes, we use Primary Blue (#2d308a) as our visual anchor, paired with Accent Yellow (#FFD600) for focus feedback and highlights, establishing a friendly and professional interface.'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 max-w-[280px] w-full lg:mx-0 mx-auto">
                    {[
                      { hex: '#2d308a', name: 'Primary Blue' },
                      { hex: '#FFD600', name: 'Accent Yellow' }
                    ].map((color, idx) => (
                      <div key={idx} className="flex flex-col">
                        <div className="rounded-2xl aspect-square w-full border border-gray-100 shadow-sm" style={{ backgroundColor: color.hex }} />
                        <span className="text-sm md:text-base font-bold text-gray-800 mt-3.5 leading-none">{color.name}</span>
                        <span className="text-xs text-gray-400 uppercase mt-1.5 leading-none">{color.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sub-section 3 — 字型階層系統 */}
              <div>
                <SubHeading>{lang === 'zh' ? '3. 字型階層系統 (Typography)' : '3. Typography System'}</SubHeading>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* English Card */}
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col space-y-6 select-none">
                    <span className="text-xs font-bold text-[#E8734A] tracking-[1px] uppercase">ENGLISH TYPEFACE</span>
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block mb-1.5 uppercase">H1 / clamp(24px, 4vw, 36px)</span>
                        <div className="text-3xl md:text-4xl font-extrabold font-inter text-gray-900 leading-tight">Inter</div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block mb-1.5 uppercase">H3 / 16px font-bold</span>
                        <div className="text-lg font-bold font-inter text-gray-800">A modern AI platform</div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block mb-1.5 uppercase">Body / 12px regular</span>
                        <p className="text-sm text-gray-600 font-inter leading-relaxed">
                          A premium intelligence engine designed to customize and accelerate high-stakes test preparation for students and administrators worldwide.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chinese Card */}
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col space-y-6 select-none">
                    <span className="text-xs font-bold text-[#E8734A] tracking-[1px] uppercase">中文字型</span>
                    <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block mb-1.5">大標題 H1 / 28px 特粗</span>
                        <div className="text-3xl md:text-4xl font-extrabold font-['GenYoGothic', 'Noto_Sans_TC', sans-serif] text-gray-900 leading-tight">源樣黑體</div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block mb-1.5">次標題 H3 / 16px 粗體</span>
                        <div className="text-lg font-bold font-[#12172B] leading-[1.65]">個性化備考體驗</div>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 block mb-1.5">內文 Body / 12px 中黑</span>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          為教育機構決策者與考生設計的現代智慧平台，透過數據 analysis 與視覺回饋，將枯燥的學習歷程轉化為直覺流暢的體驗。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[0.5px] bg-[#e5e5e5] my-10" />

          {/* SECTION 03 — Icon 設計系統 */}
          <div id="icon-system" className="scroll-mt-24">
            <SectionHeader num="03" title={lang === 'zh' ? 'Icon 設計系統' : 'Icon Design System'} />
            
            <div className="space-y-12">
              {/* Sub-section 1 — Icon 架構系統 */}
              <div>
                <SubHeading>{lang === 'zh' ? '1. Icon 架構系統' : '1. Icon Architecture System'}</SubHeading>
                <div className="space-y-4">
                  <ImagePlaceholder label="Icon 分類架構圖（Navigation / Action / Status / Subject）" height="200px" icon="icon" />
                  <p className="text-base md:text-lg text-gray-600 font-medium font-noto leading-relaxed max-w-3xl">
                    {lang === 'zh'
                      ? 'Icon 系統分為四大類別，統一使用 24px grid、2px stroke 規範，確保跨尺寸一致性與視覺統一。'
                      : 'The icon library spans 4 key types: Navigation, Action, Status, and Subject. All icons follow a 24px grid layout and 2px stroke grid to maintain aesthetic uniformity.'}
                  </p>
                </div>
              </div>

              {/* Sub-section 2 — 靜態 Icon 總覽 */}
              <div>
                <SubHeading>{lang === 'zh' ? '2. 靜態 Icon 總覽' : '2. Static Icon Overview'}</SubHeading>
                
                {/* SVG Image overview display */}
                <div className="w-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="projects/brainbox/icon-all.svg" 
                    alt="BrainBox Static Icons Overview" 
                    className="w-full h-auto object-contain" 
                  />
                </div>

                {/* Hiding individual grid for future optimization
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 mt-6">
                  {Array.from({ length: 19 }).map((_, idx) => (
                    <div key={idx} className="aspect-square bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center p-3 select-none hover:bg-gray-100/50 transition-colors">
                      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                      </svg>
                    </div>
                  ))}
                  <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center p-2 select-none border border-gray-200">
                    <span className="text-xs md:text-sm font-bold text-gray-500">+99 more</span>
                  </div>
                </div>
                */}
              </div>

              {/* Sub-section 3 — 動態 Icon 與應用展示 */}
              <div>
                <SubHeading>{lang === 'zh' ? '3. 動態 Icon 與應用展示' : '3. Motion Icon & Application Showcase'}</SubHeading>
                
                <div className="grid grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Column (span 4/12): Previewer + Buttons */}
                  <div className="col-span-12 lg:col-span-4 flex flex-col h-full justify-between">
                    {/* Motion Icon Previewer */}
                    <div className={`w-full flex-grow aspect-[1.5/1] lg:aspect-auto min-h-[200px] lg:min-h-0 border rounded-[20px] flex items-center justify-center p-6 select-none shadow-sm relative overflow-hidden transition-all duration-300 ${
                      ANIMATED_ICON_ASSETS[activeIconIndex].isWhite 
                        ? 'bg-[#5E60A3] border-[#5E60A3]' 
                        : 'bg-[#FAFCFF] border-gray-150'
                    }`}>
                      {ANIMATED_ICON_ASSETS[activeIconIndex].url.endsWith('.webm') && !isIOSDevice() ? (
                        <video 
                          key={ANIMATED_ICON_ASSETS[activeIconIndex].url}
                          src={ANIMATED_ICON_ASSETS[activeIconIndex].url} 
                          autoPlay 
                          muted 
                          loop 
                          playsInline 
                          className="w-36 h-36 sm:w-40 sm:h-40 object-contain relative z-10 block" 
                        />
                      ) : (
                        <img 
                          src={ANIMATED_ICON_ASSETS[activeIconIndex].url.replace('.webm', '.gif')} 
                          alt={ANIMATED_ICON_ASSETS[activeIconIndex].label} 
                          className="w-36 h-36 sm:w-40 sm:h-40 object-contain relative z-10" 
                        />
                      )}
                      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-xl pointer-events-none transition-all duration-300 ${
                        ANIMATED_ICON_ASSETS[activeIconIndex].isWhite 
                          ? 'bg-white/10' 
                          : 'bg-gradient-to-br from-indigo-50/30 to-purple-50/20'
                      }`} />
                      <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full blur-xl pointer-events-none transition-all duration-300 ${
                        ANIMATED_ICON_ASSETS[activeIconIndex].isWhite 
                          ? 'bg-white/10' 
                          : 'bg-gradient-to-tr from-cyan-50/20 to-blue-50/30'
                      }`} />
                    </div>

                    {/* Icon buttons grid */}
                    <div className="mt-4">
                      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-2 w-full">
                        {ANIMATED_ICON_ASSETS.map((icon, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveIconIndex(idx)}
                            className={`h-[62px] rounded-xl flex flex-col items-center justify-center p-1 select-none transition-all duration-200 cursor-pointer ${
                              activeIconIndex === idx 
                                ? 'border-2 border-[#2d308a] bg-[#2d308a]/5 text-[#2d308a]' 
                                : 'border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-400'
                            }`}
                          >
                            <img 
                              src={icon.iconUrl} 
                              alt={icon.label} 
                              className={`w-5 h-5 mb-1 object-contain transition-opacity duration-200 ${
                                activeIconIndex === idx ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                              }`} 
                              style={activeIconIndex === idx ? { filter: 'invert(18%) sepia(87%) saturate(2222%) hue-rotate(229deg) brightness(85%) contrast(92%)' } : {}}
                            />
                            <span className="text-[10px] font-bold tracking-wide leading-none">{icon.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (span 8/12): Dynamic Video container */}
                  <div className="col-span-12 lg:col-span-8 flex flex-col">
                    <div className="w-full aspect-[16/9] rounded-[20px] overflow-hidden bg-[#0A0D14] shadow-sm">
                      <iframe
                        src="https://www.youtube.com/embed/rMQwwLHeCM0"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full block"
                      />
                    </div>
                  </div>

                </div>

                <p className="text-xs md:text-sm text-gray-500 font-medium font-noto leading-relaxed mt-6">
                  {lang === 'zh'
                    ? '動態 icon 在觸發時播放一次性動畫，強化操作回饋感。右側影片則展示了微動態 Icon 在系統功能導覽與按鈕互動中的實際執行效果與順暢回饋。'
                    : 'Animated micro-icons execute a snappy one-time animation loop when triggered, adding a tactile feel of UI feedback. The right video demonstrates the micro-interaction animation loop implemented in the live application.'}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[0.5px] bg-[#e5e5e5] my-10" />

          {/* SECTION 04 — 品牌吉祥物 */}
          <div id="brand-mascot" className="scroll-mt-24">
            <SectionHeader num="04" title={lang === 'zh' ? '品牌吉祥物' : 'Brand Mascot'} />
            
            {/* Mascot Introduction Section */}
            <div className="bg-white py-6 select-none font-noto">
              
              {/* BLOCK 1 — CHARACTER INTRO & VIDEO */}
              <div className="py-10 text-left">
                <div className="w-full">
                  <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 font-manrope">
                    Hi! I'm Pixie!
                  </h4>
                  <p className="text-[14px] md:text-[15px] text-gray-600 leading-[1.8] font-medium font-noto mb-6 max-w-[800px]">
                    {lang === 'zh'
                      ? '為了讓原本冷硬的備考系統更具趣味性，我們設計了品牌代表吉祥物 Pixie。Pixie 的臉部顯示屏幕會根據使用者的答題狀況與操作路徑做出即時表情反應，降低考生的考試焦慮，打造貼心無壓力的陪考氛圍。'
                      : 'To make the test prep interface friendly, we designed mascot Pixie. Its face screen dynamically reacts to user actions and scores, mitigating student anxiety and establishing a cozy learning companion.'}
                  </p>
                  
                  {/* Widescreen Video Embed */}
                  <div className="w-full aspect-[13/8] rounded-[20px] overflow-hidden bg-black relative shadow-sm mt-4">
                    <iframe
                      src="https://www.youtube.com/embed/n2GK4KzbwPE"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full block"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full h-[0.5px] bg-[#e5e5e5] my-6" />

              {/* BLOCK 2 — 設計理念 */}
              <div className="py-10 text-left">
                <span className="text-[13px] text-gray-400 font-medium uppercase tracking-widest block mb-8">
                  {lang === 'zh' ? '設計理念' : 'DESIGN CONCEPT'}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {/* Item 1 */}
                  <div className="flex flex-col items-start text-left">
                    <div className="mb-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <h5 className="text-[15px] font-semibold text-gray-800 mb-1">
                      {lang === 'zh' ? '造型由來' : 'Shape Origin'}
                    </h5>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      {lang === 'zh'
                        ? '圓潤球體象徵包容與陪伴，柔和輪廓降低系統帶來的壓迫感。'
                        : 'Spherical base representing inclusion and companion, soft contours reduce user pressure.'}
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="flex flex-col items-start text-left">
                    <div className="mb-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.35857 19.5 5.5 20 5.5 20.5C5.5 21.3284 6.17157 22 7 22H12Z" />
                        <circle cx="7.5" cy="10.5" r="1.5" fill="#7F77DD" />
                        <circle cx="11.5" cy="7.5" r="1.5" fill="#7F77DD" />
                        <circle cx="16.5" cy="9.5" r="1.5" fill="#7F77DD" />
                      </svg>
                    </div>
                    <h5 className="text-[15px] font-semibold text-gray-800 mb-1">
                      {lang === 'zh' ? '色彩寓意' : 'Color Significance'}
                    </h5>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      {lang === 'zh'
                        ? '藍紫漸層象徵智慧與思考，不同情境切換暖冷色調傳遞情感。'
                        : 'Blue-purple gradient stands for intellect and thinking, shifting color tones to convey emotions.'}
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="flex flex-col items-start text-left">
                    <div className="mb-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                        <line x1="7" y1="7" x2="7.01" y2="7" />
                      </svg>
                    </div>
                    <h5 className="text-[15px] font-semibold text-gray-800 mb-1">
                      {lang === 'zh' ? '命名由來' : 'Name Origin'}
                    </h5>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      {lang === 'zh'
                        ? 'Pixie 取自精靈，呼應體積小巧卻充滿魔法能量的陪伴形象。'
                        : 'Named after the fairy sprite, symbolizing a compact companion with magical learning energy.'}
                    </p>
                  </div>

                  {/* Item 4 */}
                  <div className="flex flex-col items-start text-left">
                    <div className="mb-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    </div>
                    <h5 className="text-[15px] font-semibold text-gray-800 mb-1">
                      {lang === 'zh' ? '個性設定' : 'Personality'}
                    </h5>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      {lang === 'zh'
                        ? '溫柔、不評判、有耐心。答對一起開心，答錯溫和鼓勵前行。'
                        : 'Gentle, non-judgmental, patient. Celebrates correct answers and warmly encourages learning.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full h-[0.5px] bg-[#e5e5e5] my-6" />

              {/* BLOCK 3 — 外型分析 */}
              <div className="py-10 text-left">
                <span className="text-[13px] text-gray-400 font-medium uppercase tracking-widest block mb-8">
                  {lang === 'zh' ? '外型分析' : 'APPEARANCE ANALYSIS'}
                </span>

                {/* Desktop layout: Centered video with callout lines pointing to labels */}
                <div className="hidden lg:block relative w-full max-w-[1100px] h-[600px] mx-auto select-none">
                  {/* Central Video Container */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <video
                      src="projects/brainbox/pixie-feature.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-[450px] h-[450px] object-cover rounded-full"
                    />
                  </div>

                  {/* SVG Pointers Overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1100 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Top-Left Pointer */}
                    <line x1="365" y1="185" x2="250" y2="160" stroke="#7F77DD" strokeWidth="1.5" />
                    <circle cx="250" cy="160" r="4" fill="#7F77DD" />
                    
                    {/* Bottom-Left Pointer */}
                    <line x1="365" y1="415" x2="250" y2="440" stroke="#7F77DD" strokeWidth="1.5" />
                    <circle cx="250" cy="440" r="4" fill="#7F77DD" />

                    {/* Top-Right Pointer */}
                    <line x1="735" y1="185" x2="850" y2="160" stroke="#7F77DD" strokeWidth="1.5" />
                    <circle cx="850" cy="160" r="4" fill="#7F77DD" />

                    {/* Bottom-Right Pointer */}
                    <line x1="735" y1="415" x2="850" y2="440" stroke="#7F77DD" strokeWidth="1.5" />
                    <circle cx="850" cy="440" r="4" fill="#7F77DD" />
                  </svg>

                  {/* Callout Text Containers absolute positionings */}
                  {/* Top-Left Callout Box */}
                  <div className="absolute top-[130px] left-[20px] w-[210px] text-right">
                    <h5 className="text-[14px] font-bold text-gray-800 mb-1">
                      {lang === 'zh' ? '漸層球體' : 'Gradient Sphere'}
                    </h5>
                    <p className="text-[12px] text-gray-500 leading-relaxed">
                      {lang === 'zh' ? '藍紫漸層象徵腦部思考與知識能量的流動。' : 'Blue-purple gradient represents knowledge flow and brain thinking.'}
                    </p>
                  </div>

                  {/* Bottom-Left Callout Box */}
                  <div className="absolute top-[410px] left-[20px] w-[210px] text-right">
                    <h5 className="text-[14px] font-bold text-gray-800 mb-1">
                      {lang === 'zh' ? '極簡線條表情' : 'Minimalist Facial Lines'}
                    </h5>
                    <p className="text-[12px] text-gray-500 leading-relaxed">
                      {lang === 'zh' ? '僅用眼睛與嘴型傳遞情緒，避免細節過多造成視覺負擔。' : 'Only eyes and mouth lines are used to convey expressions, avoiding detail clutter.'}
                    </p>
                  </div>

                  {/* Top-Right Callout Box */}
                  <div className="absolute top-[130px] right-[20px] w-[210px] text-left">
                    <h5 className="text-[14px] font-bold text-gray-800 mb-1">
                      {lang === 'zh' ? '狀態符號' : 'State Indicators'}
                    </h5>
                    <p className="text-[12px] text-gray-500 leading-relaxed">
                      {lang === 'zh' ? 'Z字、問號泡泡等輔助圖示即時反映操作情境。' : 'Floating letters, question bubbles reflect interactive state.'}
                    </p>
                  </div>

                  {/* Bottom-Right Callout Box */}
                  <div className="absolute top-[410px] right-[20px] w-[210px] text-left">
                    <h5 className="text-[14px] font-bold text-gray-800 mb-1">
                      {lang === 'zh' ? '無性別、無年齡特徵' : 'Universal Appeal'}
                    </h5>
                    <p className="text-[12px] text-gray-500 leading-relaxed">
                      {lang === 'zh' ? '抽象造型讓所有使用者都能自然建立情感投射。' : 'Genderless, ageless form allows empathy across all users.'}
                    </p>
                  </div>
                </div>

                {/* Mobile view fallback: Stacked video and bullet points */}
                <div className="block lg:hidden space-y-8 select-none">
                  <div className="flex items-center justify-center py-4">
                    <video
                      src="projects/brainbox/pixie-feature.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-[200px] h-[200px] object-cover rounded-full shadow-md"
                    />
                  </div>
                  
                  <div className="space-y-4 px-4">
                    {[
                      { 
                        title: lang === 'zh' ? '漸層球體' : 'Gradient Sphere', 
                        desc: lang === 'zh' ? '藍紫漸層象徵腦部思考與知識能量的流動。' : 'Blue-purple gradient represents knowledge flow and brain thinking.' 
                      },
                      { 
                        title: lang === 'zh' ? '極簡線條表情' : 'Minimalist Facial Lines', 
                        desc: lang === 'zh' ? '僅用眼睛與嘴型傳遞情緒，避免細節過多造成視覺負擔。' : 'Only eyes and mouth lines are used to convey expressions, avoiding detail clutter.' 
                      },
                      { 
                        title: lang === 'zh' ? '狀態符號' : 'State Indicators', 
                        desc: lang === 'zh' ? 'Z字、問號泡泡等輔助圖示即時反映操作情境。' : 'Floating letters, question bubbles reflect interactive state.' 
                      },
                      { 
                        title: lang === 'zh' ? '無性別、無年齡特徵' : 'Universal Appeal', 
                        desc: lang === 'zh' ? '抽象造型讓所有使用者都能自然建立情感投射。' : 'Genderless, ageless form allows empathy across all users.' 
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="w-2 h-2 rounded-full bg-[#7F77DD] mt-1.5 mr-3 flex-shrink-0" />
                        <div className="text-[14px] leading-relaxed text-left">
                          <strong className="text-gray-800 font-semibold">{item.title}</strong> — <span className="text-gray-500 text-[13px]">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="w-full h-[0.5px] bg-[#e5e5e5] my-6" />

            </div>

            <div className="space-y-8 text-left mt-10">
              {/* Header / Title */}
              <div className="mb-6">
                <SubHeading>{lang === 'zh' ? '吉祥物動態展示' : 'Mascot Motion Showcase'}</SubHeading>
              </div>

              {/* Description text aligned full-width */}
              <p className="text-base text-gray-600 font-medium font-noto leading-relaxed max-w-4xl">
                {lang === 'zh'
                  ? '為了讓原本冷硬的備考系統更具趣味性，我們設計了品牌代表吉祥物 Pixie。Pixie 的臉部顯示屏幕會根據使用者的答題狀況與操作路徑做出即時表情反應，降低考生的考試焦慮，打造貼心無壓力的陪考氛圍。'
                  : 'To make the test prep interface friendly, we designed mascot Pixie. Its face screen dynamically reacts to user actions and scores, mitigating student anxiety and establishing a cozy learning companion.'}
              </p>

              {/* Horizontal 3-column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start mt-8">
                {/* Mascot State Switcher Column */}
                <div className="flex flex-col w-full">
                  <div className="w-full bg-[#FAFAFA] border border-gray-200 rounded-[2rem] flex flex-col items-center justify-center p-6 select-none aspect-[16/12] shadow-sm relative overflow-hidden">
                    {MASCOT_ASSETS[activeMascotIndex].url.endsWith('.webm') && !isIOSDevice() ? (
                      <video 
                        key={MASCOT_ASSETS[activeMascotIndex].url}
                        src={MASCOT_ASSETS[activeMascotIndex].url} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="max-w-full max-h-[70%] object-contain relative z-10 block" 
                      />
                    ) : (
                      <img 
                        src={MASCOT_ASSETS[activeMascotIndex].url.replace('.webm', '.gif')} 
                        alt={MASCOT_ASSETS[activeMascotIndex].status} 
                        className="max-w-full max-h-[70%] object-contain relative z-10" 
                      />
                    )}
                    <div className="text-xs md:text-sm text-gray-500 mt-4 text-center font-medium leading-relaxed max-w-[85%] z-10">
                      <span className="font-bold text-gray-800">{lang === 'zh' ? '當前狀態：' : 'Current: '}</span>
                      {MASCOT_ASSETS[activeMascotIndex].status} — {MASCOT_ASSETS[activeMascotIndex].desc}
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50/30 to-purple-50/20 rounded-full blur-xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-50/20 to-blue-50/30 rounded-full blur-xl pointer-events-none" />
                  </div>
                  
                  {/* Thumbnails Row */}
                  <div className="grid grid-cols-4 gap-2 mt-4 w-full">
                    {MASCOT_ASSETS.map((mascot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveMascotIndex(idx)}
                        className={`h-[48px] rounded-xl flex items-center justify-center px-1 py-1 select-none transition-all duration-200 cursor-pointer text-center font-semibold text-[11px] md:text-xs leading-tight ${
                          activeMascotIndex === idx 
                            ? 'border-2 border-[#534AB7] bg-[#F5F3FF] text-[#534AB7] shadow-sm' 
                            : 'border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <span>{mascot.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full page loading Column */}
                <div className="flex flex-col w-full">
                  <div className="w-full aspect-[16/12] bg-[#FAFAFA] border border-gray-200 rounded-[2rem] overflow-hidden flex items-center justify-center shadow-sm">
                    <video src="projects/brainbox/data.webm" autoPlay muted loop playsInline className="w-full h-full object-contain block" />
                  </div>
                  <div className="text-xs md:text-sm font-bold text-gray-700 mt-4 text-center select-none">{lang === 'zh' ? '前測數據分析中' : 'Analyzing Pre-test Data'}</div>
                </div>

                {/* Skeleton Screen Column */}
                <div className="flex flex-col w-full">
                  <div className="w-full aspect-[16/12] bg-[#FAFAFA] border border-gray-200 rounded-[2rem] overflow-hidden flex items-center justify-center shadow-sm">
                    <video src="projects/brainbox/creating-test.webm" autoPlay muted loop playsInline className="w-full h-full object-contain block" />
                  </div>
                  <div className="text-xs md:text-sm font-bold text-gray-700 mt-4 text-center select-none">{lang === 'zh' ? '前測試卷生成中' : 'Generating Pre-test Paper'}</div>
                </div>
              </div>
            </div>

            {/* Mascot Showcase Video at the very bottom of Section 04 */}
            <div className="w-full pt-10 text-left">
              <SubHeading>{lang === 'zh' ? '吉祥物實際應用展示' : 'Mascot Application Showcase'}</SubHeading>
              <p className="text-[14px] text-gray-600 font-medium font-noto leading-relaxed mt-2 max-w-3xl">
                {lang === 'zh'
                  ? '在軟體吉祥物被應用於Onboarding歡迎動畫、前測的回饋、作答後的動畫等區域，為使用者帶入品牌第一印象。'
                  : 'The software mascot is applied across onboarding welcome animations, pre-test feedback, and post-response celebrations, bringing a warm first brand impression to the user.'}
              </p>
              <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black shadow-lg mt-6">
                <iframe
                  src="https://www.youtube.com/embed/WwIA_FHl-E0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full block"
                />
              </div>
            </div>
          </div>

          <div className="w-full h-[0.5px] bg-[#e5e5e5] my-10" />

          {/* SECTION 05 — 系統插圖與動畫 */}
          <div id="illustration-animation" className="scroll-mt-24">
            <SectionHeader num="05" title={lang === 'zh' ? '系統插圖與動畫' : 'Illustration & Animation'} />
            
            <p className="text-base md:text-lg text-gray-600 font-medium font-noto leading-relaxed max-w-3xl mb-12">
              {lang === 'zh'
                ? '涵蓋系統中所有情境插圖與動態內容，以一致的繪圖語言貫穿整個產品體驗。'
                : 'Covers all contextual illustrations and micro-animations, weaving a coherent graphical language into the EdTech application.'}
            </p>

            <div className="space-y-16">
              
              {/* Equal-height two-column layout: Avatars on the left, Loading animation on the right */}
              <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-stretch">
                
                {/* Left Column — 用戶頭像系統 (Larger size) */}
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-4">
                    <SubHeading>{lang === 'zh' ? '1. 用戶頭像系統' : '1. User Avatar Library'}</SubHeading>
                  </div>
                  <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 flex items-center justify-center shadow-sm">
                    <div className="grid grid-cols-4 gap-6 w-full max-w-md">
                      {[
                        'projects/brainbox/red.png',
                        'projects/brainbox/orange.png',
                        'projects/brainbox/yellow.png',
                        'projects/brainbox/green.png',
                        'projects/brainbox/gray-blue.png',
                        'projects/brainbox/purple.png',
                        'projects/brainbox/red-purple.png',
                        'projects/brainbox/pink.png'
                      ].map((src, idx) => (
                        <div 
                          key={idx}
                          className="aspect-square rounded-full bg-white flex items-center justify-center select-none overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                        >
                          <img 
                            src={src} 
                            alt={`Avatar ${idx + 1}`} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column — Loading 動畫 (Constrained & aligned to height) */}
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-4">
                    <SubHeading>{lang === 'zh' ? '2. LOADING 動畫' : '2. Loading Animations'}</SubHeading>
                  </div>
                  <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center justify-center shadow-sm">
                    <div className="w-full max-w-[200px] aspect-square overflow-hidden flex items-center justify-center">
                      <video src="projects/brainbox/box_loading_bright.mp4" autoPlay muted loop playsInline className="w-full h-full object-contain" />
                    </div>
                    <div className="text-xs md:text-sm font-bold text-gray-700 mt-4 text-center select-none">{lang === 'zh' ? '元件 Loading' : 'Component Loading'}</div>
                  </div>
                </div>

              </div>

              <div className="w-full h-[0.5px] bg-[#e5e5e5] my-10" />

              {/* Single desktop UI mockup with slider/slideshow controls */}
              <div>
                <div className="mb-6 text-left">
                  <SubHeading>
                    {lang === 'zh' ? '3. 插圖動畫於系統中應用' : '3. Application of Illustrations & Animations'}
                  </SubHeading>
                </div>

                {/* Main Slideshow Frame */}
                <div className="relative w-full aspect-[16/10] bg-[#FAFAFA] border border-gray-200 rounded-[2rem] overflow-hidden shadow-sm">
                  {/* Slider Control Buttons (floating inside the frame on left and right) */}
                  <button 
                    onClick={() => setActiveUiSlide(prev => prev === 0 ? 2 : prev - 1)}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gray-250 bg-white/95 hover:bg-white flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-md select-none z-20"
                  >
                    <IconChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  <button 
                    onClick={() => setActiveUiSlide(prev => prev === 2 ? 0 : prev + 1)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gray-250 bg-white/95 hover:bg-white flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow-md select-none z-20"
                  >
                    <IconChevronRight className="w-6 h-6 text-gray-700" />
                  </button>

                  {/* Carousel track */}
                  <div 
                    className="w-full h-full flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${activeUiSlide * 100}%)` }}
                  >
                    {[
                      { 
                        title: { zh: '頭像插圖應用於登入頁', en: 'Avatar Illustration on Login Page' }, 
                        type: 'image', 
                        url: 'projects/brainbox/avatar-demo.png' 
                      },
                      { 
                        title: { zh: '系統laoding動畫', en: 'System Loading Animation' }, 
                        type: 'video', 
                        url: 'projects/brainbox/loading-demo.webm' 
                      },
                      { 
                        title: { zh: '用戶個人頁頭像展示', en: 'User Profile Avatar Showcase' }, 
                        type: 'image', 
                        url: 'projects/brainbox/profile.png' 
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="w-full h-full flex-shrink-0 relative bg-white flex items-center justify-center overflow-hidden">
                        {item.type === 'video' ? (
                          <video 
                            src={item.url} 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            className="w-full h-full object-contain" 
                          />
                        ) : (
                          <img 
                            src={item.url} 
                            alt={t(item.title, lang)} 
                            className="w-full h-full object-contain" 
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        )}
                        {/* Slide Caption overlay */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-2.5 bg-black/75 backdrop-blur-md rounded-full shadow-lg z-10">
                          <span className="text-white text-xs md:text-sm font-bold font-noto select-none">
                            {t(item.title, lang)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2.5 z-10">
                    {[0, 1, 2].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveUiSlide(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeUiSlide === idx 
                            ? 'bg-[#534AB7] scale-125 w-6' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full h-[0.5px] bg-[#e5e5e5] my-10" />

          {/* SECTION 06 — 品牌形象動畫 */}
          <div id="brand-film" className="scroll-mt-24 pb-12">
            <SectionHeader num="06" title={lang === 'zh' ? '品牌形象動畫' : 'Brand Film'} />
            
            <p className="text-base md:text-lg text-gray-600 font-medium font-noto leading-relaxed max-w-3xl">
              {lang === 'zh'
                ? '整合 brand 所有視覺元素的動態展示影片，呈現完整視覺語言的一致性與生命力。'
                : 'An integrated promotional film displaying all components of the brand visual language in a lively dynamic video.'}
            </p>

            <div className="w-full aspect-[3820/2160] rounded-2xl overflow-hidden bg-black border border-gray-800 relative mt-8">
              <iframe
                src="https://www.youtube.com/embed/50ZFq8rk77c?rel=0"
                title="BrainBox Brand Film"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-2xl"
              ></iframe>
            </div>
          </div>

        </div>

        <FooterCTA activeItem={activeItem} navigateTo={navigateTo} lang={lang} />
      </div>
    );
  };


  const ProjectView = ({ activeItem, lang, transitionTo, setCurrentPage, setActiveItem, setIsMobileMenuOpen, navigateTo }) => {
    if (!activeItem) return null;

    if (activeItem.id === 3) {
      return (
        <div className="project-page-layout">
          <BrainBoxVisualProjectView activeItem={activeItem} lang={lang} transitionTo={transitionTo} setCurrentPage={setCurrentPage} setActiveItem={setActiveItem} setIsMobileMenuOpen={setIsMobileMenuOpen} navigateTo={navigateTo} />
          <BackToTopButton />
        </div>
      );
    }

    // --- 封裝重複的返回按鈕元件 (直接回到首頁的精選作品區塊) ---




    // --- Product Visual Design 通用版型元件 ---

    // --- 長圖捲動標註元件 ---


    // --- 自訂下拉選單元件 ---



    // --- GSAT App Button 互動展示元件 ---


    // --- GSAT App Navigation Bar 互動展示元件 ---

    // --- GSAT App Dropdown & Menu 互動展示元件 ---

    // --- GSAT App Input 互動展示元件 ---



    // --- Progress Bar & Step Indicator 互動展示元件 ---

    // --- 網站設計長條展示：桌面版＋手機版置中交疊，左右交錯標註 ---


    // --- 長條展示：單一桌面媒體項目 + 右側標註 ---


    // --- 長條展示：影片項目 ---


    // --- 長條展示：圖片項目 ---


    // --- UI/UX 通用版型元件 ---





    // ================= 預設的 Product Visual Design 通用版型 =================
    if (activeItem.visuals) {
      return (
        <div className="project-page-layout">
          <GenericVisualProjectView activeItem={activeItem} lang={lang} transitionTo={transitionTo} setCurrentPage={setCurrentPage} setActiveItem={setActiveItem} setIsMobileMenuOpen={setIsMobileMenuOpen} navigateTo={navigateTo} />
          <BackToTopButton />
        </div>
      );
    }

    // ================= 預設的 UI/UX 通用版型 =================
    if (activeItem.categoryId === 'uiux') {
      if (activeItem.id === 2) {
        return (
          <div className="project-page-layout">
            <MsLinProjectView activeItem={activeItem} lang={lang} transitionTo={transitionTo} setCurrentPage={setCurrentPage} setActiveItem={setActiveItem} setIsMobileMenuOpen={setIsMobileMenuOpen} navigateTo={navigateTo} />
            <FooterCTA activeItem={activeItem} navigateTo={navigateTo} lang={lang} />
            <BackToTopButton />
          </div>
        );
      }
      return (
        <div className="project-page-layout">
          <GenericUIUXProjectView activeItem={activeItem} lang={lang} transitionTo={transitionTo} setCurrentPage={setCurrentPage} setActiveItem={setActiveItem} setIsMobileMenuOpen={setIsMobileMenuOpen} navigateTo={navigateTo} />
          <FooterCTA activeItem={activeItem} navigateTo={navigateTo} lang={lang} />
          <BackToTopButton />
        </div>
      );
    }

    // ================= 預設的其他專案版面 (Fallback) =================
    return (
      <div className="project-page-layout">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 bg-white w-full">
          <div className="pt-40 pb-12 px-6 max-w-[100rem] mx-auto">
            <BackButton transitionTo={transitionTo} setCurrentPage={setCurrentPage} setActiveItem={setActiveItem} setIsMobileMenuOpen={setIsMobileMenuOpen} lang={lang} />
            <header className="px-2 md:px-8">
              <h1 className="text-5xl md:text-[7rem] font-bold tracking-tighter mb-12 leading-none">{activeItem.title}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-gray-100 max-w-6xl">
                <div><p className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Client</p><p className="font-medium text-xl">{activeItem.client}</p></div>
                <div><p className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Year</p><p className="font-medium text-xl">{activeItem.year}</p></div>
                <div><p className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Role</p><p className="font-medium text-xl">{CATEGORIES.find(c => c.id === activeItem.categoryId)?.title}</p></div>
                <div><p className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Services</p><p className="font-medium text-xl">{activeItem.tags.join(', ')}</p></div>
              </div>
            </header>
          </div>
          <div className={`w-full h-[60vh] md:h-[85vh] ${activeItem.thumb} flex items-center justify-center text-gray-400 text-3xl mb-24 md:mb-32 shadow-inner overflow-hidden`}>
            {activeItem.coverMedia?.url ? <img src={activeItem.coverMedia.url} alt={activeItem.title} className="w-full h-full object-cover animate-in zoom-in duration-1000" /> : null}
          </div>
          <div className="max-w-[100rem] mx-auto px-6 pb-32">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 max-w-5xl mx-auto px-2 md:px-8 mb-24">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Project Context</h3>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">{activeItem.description}</p>
            </div>
          </div>
          <FooterCTA activeItem={activeItem} navigateTo={navigateTo} lang={lang} />
          <BackToTopButton />
        </div>
      </div>
    );
  };

  // --- About Page custom utility hooks & components ---

  const useTimelineProgress = (timelineRef) => {
    const [progress, setProgress] = useState(0);
    const [activeNodes, setActiveNodes] = useState([]);

    useEffect(() => {
      const updateProgress = () => {
        if (!timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Start growing when top of timeline is at 60% viewport height
        const startPoint = viewportHeight * 0.6;
        const scrolled = startPoint - rect.top;
        
        // Calculate progress relative to timeline height
        const totalScrollable = rect.height - 100;
        const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 15);
        const p = isAtBottom ? 1 : Math.min(Math.max(scrolled / Math.max(totalScrollable, 1), 0), 1);
        setProgress(p);

        // Calculate active nodes
        const timelineHeight = rect.height;
        const progressLineBottom = timelineHeight * p;
        const nodeElements = timelineRef.current.querySelectorAll('.timeline-node');
        const activeStates = [];
        nodeElements.forEach((node) => {
          let offsetTop = 0;
          let current = node;
          while (current && current !== timelineRef.current) {
            offsetTop += current.offsetTop;
            current = current.offsetParent;
          }
          // Check if progress line has passed the node's top center
          const isPassed = progressLineBottom >= (offsetTop - 2);
          activeStates.push(isPassed);
        });
        setActiveNodes(activeStates);
      };

      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateProgress();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll);
      updateProgress();

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }, [timelineRef]);

    return [progress, activeNodes];
  };

  const ScrollRevealItem = ({ children, index, delayOffset = 0.15 }) => {
    const options = React.useMemo(() => ({ threshold: 0.05, rootMargin: "0px 0px -50px 0px" }), []);
    const [ref, isVisible] = useOnScreen(options);
    
    return (
      <div
        ref={ref}
        style={{
          transitionDelay: isVisible ? `${index * delayOffset}s` : '0s',
        }}
        className={`scroll-animate ${isVisible ? 'is-visible' : ''}`}
      >
        {children}
      </div>
    );
  };

  const AboutAccordion = ({ title, date, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(defaultOpen ? 'auto' : '0px');

    const toggleAccordion = () => {
      if (isOpen) {
        setHeight(`${contentRef.current.scrollHeight}px`);
        // Force reflow
        contentRef.current.offsetHeight;
        setHeight('0px');
        setIsOpen(false);
      } else {
        setIsOpen(true);
        setHeight(`${contentRef.current.scrollHeight}px`);
      }
    };

    const handleTransitionEnd = () => {
      if (isOpen) {
        setHeight('auto');
      }
    };

    const id = `accordion-${title.replace(/\s+/g, '-').toLowerCase()}`;

    return (
      <div className="bg-white dark:bg-[#1A1A1A] border-[0.5px] border-zinc-200 dark:border-zinc-855 rounded-[20px] mb-3 overflow-hidden transition-colors duration-300">
        <button
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={id}
          className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
        >
          <span className="text-[14px] text-zinc-900 dark:text-zinc-100 font-medium font-noto">{title}</span>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-zinc-400 dark:text-zinc-500 font-normal select-none">{date}</span>
            <svg 
              className={`w-3.5 h-3.5 text-[#D85A30] transform transition-transform duration-300 ${isOpen ? 'rotate-[45deg]' : ''}`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" />
              <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
            </svg>
          </div>
        </button>
        <div
          id={id}
          ref={contentRef}
          onTransitionEnd={handleTransitionEnd}
          style={{ 
            maxHeight: height, 
            transition: 'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)' 
          }}
          className="overflow-hidden accordion-content-transition"
        >
          <div className="px-5 pb-5 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const AboutSectionHeader = ({ title, english }) => (
    <div className="flex items-center gap-2 mb-8 select-none font-bold text-[18px] md:text-[20px] tracking-tight text-left">
      <span className="text-[#D85A30] font-black text-xl">*</span>
      <span className="text-[#D85A30] font-noto">{title} — {english}</span>
    </div>
  );

  const AboutView = ({ lang, navigateTo }) => {
    const expTimelineRef = useRef(null);
    const eduTimelineRef = useRef(null);
    const [expProgress, expActiveNodes] = useTimelineProgress(expTimelineRef);
    const [eduProgress, eduActiveNodes] = useTimelineProgress(eduTimelineRef);

    const WHAT_I_DO_DATA = [
      {
        num: '01',
        title: 'Product design',
        desc: lang === 'zh' ? 'UIUX 規劃、wireframe 到高保真介面設計。' : 'UI/UX planning, wireframing, and high-fidelity interface design.',
        tool: 'FIGMA'
      },
      {
        num: '02',
        title: 'Development',
        desc: lang === 'zh' ? 'AI 輔助前端開發與官網建置。' : 'AI-assisted front-end development and website creation.',
        tool: 'FRAMER'
      },
      {
        num: '03',
        title: 'Visual & motion',
        desc: lang === 'zh' ? '識別系統、icon 與形象動畫。' : 'Identity systems, custom iconography, and brand animations.',
        tool: 'AI・AE'
      }
    ];

    return (
      <div className="w-full bg-[#F6F6F6] dark:bg-[#121212] text-zinc-900 dark:text-zinc-100 min-h-screen transition-colors duration-300 pt-32 pb-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          
          {/* 1. Hero 開場 */}
          <section className="mb-16 text-left">
            <ScrollRevealItem index={0}>
              <div className="text-[12px] tracking-[0.2em] text-[#D85A30] uppercase font-bold mb-4 flex items-center gap-1.5 select-none font-sans">
                <span className="text-[#D85A30]">*</span> {lang === 'zh' ? '關於我' : 'ABOUT ME'} — ABOUT
              </div>
              <h1 className="text-[56px] md:text-[80px] lg:text-[96px] font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none select-none uppercase font-sans mb-4" style={{ letterSpacing: '-1.5px' }}>
                TIFFANY LIANG
              </h1>
              <h2 className="text-[18px] md:text-[22px] font-bold text-[#D85A30] font-noto">
                {lang === 'zh' ? '梁庭禎・Product Designer' : 'Tiffany Liang・Product Designer'}
              </h2>
            </ScrollRevealItem>
          </section>

          {/* 2. 照片 + 簡介 */}
          <section className="mb-24">
            <ScrollRevealItem index={1}>
              <div className="grid grid-cols-1 lg:grid-cols-9 gap-10 lg:gap-16 items-stretch">
                {/* Left column: profile photo */}
                <div className="lg:col-span-4">
                  <div className="aspect-square w-full bg-[#202020] rounded-[20px] overflow-hidden shadow-sm relative group flex items-center justify-center">
                    <img 
                      src="projects/me (1).jpg" 
                      alt="Tiffany Liang Profile" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                </div>
                {/* Right column: description + outline tags */}
                <div className="lg:col-span-5 flex flex-col justify-between py-1 text-left">
                  <div className="text-[15px] md:text-[16px] text-zinc-650 dark:text-zinc-400 font-normal leading-[1.8] mb-8 font-noto text-left">
                    {lang === 'zh' ? (
                      <>產品設計師，擁有 3 年以上的產品設計與視覺設計經驗，專注於從 0 到 1 打造產品體驗。曾於 AI 科技公司獨立負責 App 與官網的 UIUX 規劃與介面設計（Figma、Framer），並透過 vibe coding 實作前端與修復 bug，能以工程可行性視角進行設計決策，縮短設計到落地的距離。具備完整的視覺設計背景，涵蓋產品識別系統、icon 系統設計與產品形象動畫，擅長將抽象的產品概念轉化為直覺、一致且具 brand 感的使用體驗。</>
                    ) : (
                      <>Product designer with over 3 years of experience in product and visual design, focusing on crafting product experiences from 0 to 1. Independently led UI/UX planning and interface design (Figma, Framer) for Apps and official websites at an AI tech company. Implemented front-end features and fixed bugs through vibe coding, making design decisions with an engineering feasibility perspective to shorten the distance from design to launch. Equipped with a comprehensive visual design background spanning product identity systems, icon design, and product videos, specializing in translating abstract product concepts into intuitive, consistent, and branded user experiences.</>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {['UI/UX', 'MOTION', 'FRAMER', 'TAOYUAN, TW'].map((tag) => (
                      <span 
                        key={tag} 
                        className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-550 dark:text-zinc-400 rounded-full text-[12px] font-bold tracking-wider select-none font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollRevealItem>
          </section>

          {/* 3. What I Do */}
          <section className="mb-24">
            <ScrollRevealItem index={2}>
              <AboutSectionHeader title={lang === 'zh' ? '我做什麼' : 'WHAT I DO'} english="WHAT I DO" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {WHAT_I_DO_DATA.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#1A1A1A] border-[0.5px] border-zinc-200 dark:border-zinc-800 rounded-[20px] p-6 md:p-8 flex flex-col justify-between min-h-[240px] transition-all duration-300 hover:border-[#D85A30] dark:hover:border-[#D85A30] shadow-sm">
                    <div className="flex flex-col text-left">
                      <span className="text-[34px] md:text-[40px] font-black text-[#D85A30] leading-none mb-4 font-mono select-none">{item.num}</span>
                      <h3 className="text-[17px] font-bold text-zinc-900 dark:text-zinc-100 mb-2 font-noto">{item.title}</h3>
                      <p className="text-[13.5px] text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed font-noto">{item.desc}</p>
                    </div>
                    <div className="mt-6 text-left">
                      <span className="inline-block px-3.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400 rounded-full text-[11px] font-bold tracking-wider select-none font-sans">
                        {item.tool}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollRevealItem>
          </section>

          {/* 4. Experience 工作經歷 */}
          <section className="mb-24">
            <ScrollRevealItem index={3}>
              <AboutSectionHeader title={lang === 'zh' ? '工作經歷' : 'EXPERIENCE'} english="EXPERIENCE" />
            </ScrollRevealItem>

            <div ref={expTimelineRef} className="relative pl-7 md:pl-8 text-left">
              {/* Baseline */}
              <div className="absolute left-[7px] md:left-[8px] top-[10px] bottom-[10px] w-[1px] bg-zinc-200 dark:bg-zinc-800" />
              
              {/* Orange Progress Line */}
              <div 
                className="absolute left-[7px] md:left-[8px] top-[10px] bottom-[10px] w-[1px] bg-[#D85A30] origin-top timeline-progress-line"
                style={{ transform: `scaleY(${expProgress})`, transition: 'transform 0.1s ease-out' }}
              />

              {/* Exp 1 - Key Experience */}
              <div className="relative mb-14">
                <ScrollRevealItem index={4}>
                  {/* Key Node: 16px white center with thick orange border when active */}
                  <div className={`absolute left-[-29px] md:left-[-32px] top-[5px] w-4 h-4 rounded-full bg-white dark:bg-[#121212] border-4 ring-4 ring-[#F6F6F6] dark:ring-[#121212] z-10 timeline-node transition-colors duration-300 ${expActiveNodes[0] ? 'border-[#D85A30]' : 'border-zinc-300 dark:border-zinc-700'}`} />
                  
                  <span className="inline-block px-3.5 py-1 bg-[#FAECE7] text-[#D85A30] rounded-full text-[11px] font-bold tracking-wider select-none mb-3 font-sans">
                    2023.10 – PRESENT
                  </span>
                  
                  <h3 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-100 mb-2 font-noto">
                    Wisdome.AI 聚愢科技
                  </h3>
                  
                  <div className="text-[14px] font-bold text-[#D85A30] mb-4 flex items-center gap-1.5 flex-wrap font-noto">
                    <span className="text-zinc-550 dark:text-zinc-400 font-bold">Visual Effects Designer</span>
                    <span className="text-[#D85A30] font-medium select-none">→</span>
                    <span className="text-[#D85A30] font-black">{lang === 'zh' ? 'Product Designer' : 'Product Designer'}</span>
                  </div>
                  
                  <p className="text-[14px] text-zinc-650 dark:text-zinc-400 font-normal leading-relaxed mb-6 font-noto max-w-3xl">
                    {lang === 'zh' 
                      ? '從品牌視覺與動態設計出發，逐步深入產品核心，轉任後負責產品從設計到前端落地的完整流程。' 
                      : 'Starting from brand visual and motion design, gradually diving into product core. Post-transition, responsible for the end-to-end design to front-end landing.'}
                  </p>

                  {/* Accordion Cards */}
                  <div className="mt-4 max-w-3xl">
                    <AboutAccordion title={lang === 'zh' ? 'Product Designer' : 'Product Designer'} date={lang === 'zh' ? '2024.XX – PRESENT' : '2024.XX – PRESENT'} defaultOpen={true}>
                      <ul className="list-disc pl-4 space-y-2 text-[13.5px] text-zinc-650 dark:text-zinc-400 font-normal leading-relaxed font-noto">
                        {lang === 'zh' ? (
                          <>
                            <li>獨立負責 App 產品設計，從使用者流程、wireframe 到高保真介面（Figma）</li>
                            <li>以 Framer 設計並建置公司官網，整合品牌視覺與產品訊息</li>
                            <li>根據使用者反饋持續迭代介面，優化流程、降低使用門檻</li>
                            <li>透過 AI 輔助開發實作前端並修復 bug，縮短設計到落地的週期</li>
                            <li>以工程可行性視角參與產品決策，減少設計與開發間的溝通成本</li>
                          </>
                        ) : (
                          <>
                            <li>Independently led App product design, from user flows and wireframes to high-fidelity interfaces in Figma.</li>
                            <li>Designed and built the corporate website using Framer, integrating brand identity and product messaging.</li>
                            <li>Iterated interfaces continuously based on user feedback to optimize flows and lower barriers to entry.</li>
                            <li>Implemented front-end features and resolved bugs using AI assistance, shortening design-to-production cycles.</li>
                            <li>Participated in product decisions with engineering feasibility in mind, reducing communication costs between design and development.</li>
                          </>
                        )}
                      </ul>
                    </AboutAccordion>

                    <AboutAccordion title={lang === 'zh' ? 'Visual Effects Designer' : 'Visual Effects Designer'} date={lang === 'zh' ? '2023.10 – 2024.XX' : '2023.10 – 2024.XX'} defaultOpen={false}>
                      <ul className="list-disc pl-4 space-y-2 text-[13.5px] text-zinc-650 dark:text-zinc-400 font-normal leading-relaxed font-noto">
                        {lang === 'zh' ? (
                          <>
                            <li>建構產品識別規範，將核心理念轉化為視覺語言，建立跨介面一致的系統</li>
                            <li>設計 16 個動態圖標與 70 個靜態圖標，建立 icon 系統</li>
                            <li>依目標客群創作品牌角色及 8 種頭像插圖，強化用戶認同感</li>
                            <li>獨立完成 2 部產品形象動畫，涵蓋腳本、分鏡、美術到動態（After Effects）</li>
                            <li>結合插圖與 AI 生成語音製作教學影片，降低新用戶上手門檻</li>
                          </>
                        ) : (
                          <>
                            <li>Built product brand guidelines to translate core concepts into consistent visual language across interfaces.</li>
                            <li>Designed 16 animated icons and 70 static icons to establish the product icon system.</li>
                            <li>Created brand mascot and 8 avatar illustrations tailored to the target audience, enhancing user engagement.</li>
                            <li>Independently produced 2 product videos, covering scripting, storyboarding, art direction, and animation in After Effects.</li>
                            <li>Combined custom illustrations with AI-generated voiceovers for tutorial videos, lowering onboarding friction.</li>
                          </>
                        )}
                      </ul>
                    </AboutAccordion>
                  </div>
                </ScrollRevealItem>
              </div>

              {/* Exp 2 - Secondary Experience */}
              <div className="relative mb-12">
                <ScrollRevealItem index={5}>
                  {/* Grey Secondary Node that turns orange when reached */}
                  <div className={`absolute left-[-26px] md:left-[-29px] top-[7px] w-2.5 h-2.5 rounded-full ring-4 ring-[#F6F6F6] dark:ring-[#121212] z-10 timeline-node transition-colors duration-300 ${expActiveNodes[1] ? 'bg-[#D85A30]' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                  
                  <span className="inline-block px-3.5 py-1 bg-zinc-200/60 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-full text-[11px] font-bold tracking-wider select-none mb-3 font-sans">
                    2021.08 – 2021.09
                  </span>
                  
                  <h3 className="text-[16px] font-bold text-zinc-900 dark:text-zinc-100 mb-2 font-noto">
                    {lang === 'zh' ? '果然癮 ｜ 品牌視覺設計（接案）' : 'Guo Ran Yin ｜ Brand Visual Design (Freelance)'}
                  </h3>
                  
                  <p className="text-[14px] text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed font-noto max-w-3xl">
                    {lang === 'zh' 
                      ? '規劃品牌識別系統，完成 3 組產品外盒與 8 款內包裝設計。' 
                      : 'Designed the brand identity system, completed 3 sets of product boxes and 8 inner packaging designs.'}
                  </p>
                </ScrollRevealItem>
              </div>

              {/* Exp 3 - Secondary Experience */}
              <div className="relative">
                <ScrollRevealItem index={6}>
                  {/* Grey Secondary Node that turns orange when reached */}
                  <div className={`absolute left-[-26px] md:left-[-29px] top-[7px] w-2.5 h-2.5 rounded-full ring-4 ring-[#F6F6F6] dark:ring-[#121212] z-10 timeline-node transition-colors duration-300 ${expActiveNodes[2] ? 'bg-[#D85A30]' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                  
                  <span className="inline-block px-3.5 py-1 bg-zinc-200/60 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-full text-[11px] font-bold tracking-wider select-none mb-3 font-sans">
                    2020.10 – 2021.01
                  </span>
                  
                  <h3 className="text-[16px] font-bold text-zinc-900 dark:text-zinc-100 mb-2 font-noto">
                    {lang === 'zh' ? '遠邦國際品牌顧問 ｜ 設計實習生' : 'Geber Brand Consulting ｜ Design Intern'}
                  </h3>
                  
                  <p className="text-[14px] text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed font-noto max-w-3xl">
                    {lang === 'zh' 
                      ? '參與品牌標誌再造與活動主視覺設計，以社群插畫提升品牌辨識度。' 
                      : 'Participated in brand logo redesign and key visual design for campaigns, enhancing brand recognition via social media illustrations.'}
                  </p>
                </ScrollRevealItem>
              </div>

            </div>
          </section>

          {/* 5. Education 學歷 */}
          <section className="mb-24">
            <ScrollRevealItem index={7}>
              <AboutSectionHeader title={lang === 'zh' ? '學歷' : 'EDUCATION'} english="EDUCATION" />
            </ScrollRevealItem>

            <div ref={eduTimelineRef} className="relative pl-7 md:pl-8 text-left">
              {/* Baseline */}
              <div className="absolute left-[7px] md:left-[8px] top-[10px] bottom-[10px] w-[1px] bg-zinc-200 dark:bg-zinc-800" />
              
              {/* Orange Progress Line */}
              <div 
                className="absolute left-[7px] md:left-[8px] top-[10px] bottom-[10px] w-[1px] bg-[#D85A30] origin-top timeline-progress-line"
                style={{ transform: `scaleY(${eduProgress})`, transition: 'transform 0.1s ease-out' }}
              />

              {/* Edu 1 - Key */}
              <div className="relative mb-14">
                <ScrollRevealItem index={8}>
                  {/* Key Node: 16px white center with thick orange border when active */}
                  <div className={`absolute left-[-29px] md:left-[-32px] top-[5px] w-4 h-4 rounded-full bg-white dark:bg-[#121212] border-4 ring-4 ring-[#F6F6F6] dark:ring-[#121212] z-10 timeline-node transition-colors duration-300 ${eduActiveNodes[0] ? 'border-[#D85A30]' : 'border-zinc-300 dark:border-zinc-700'}`} />
                  
                  <span className="inline-block px-3.5 py-1 bg-[#FAECE7] text-[#D85A30] rounded-full text-[11px] font-bold tracking-wider select-none mb-3 font-sans">
                    2021 – 2023
                  </span>
                  
                  <h3 className="text-[17px] font-bold text-zinc-900 dark:text-zinc-100 mb-3 font-noto">
                    {lang === 'zh' ? '國立臺灣藝術大學 ｜ 視覺傳達設計學系研究所' : 'National Taiwan University of Arts ｜ Graduate School of Visual Communication Design'}
                  </h3>

                  {/* Award Badges */}
                  <div className="flex flex-wrap gap-2.5 mb-5 select-none">
                    {[
                      { zh: '優秀學位論文獎', en: 'Outstanding Thesis Award' },
                      { zh: '連續兩學期優秀研究生獎學金', en: 'Two-Semester Outstanding Graduate Scholarship' }
                    ].map((award, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAECE7] text-[#712B13] rounded-full text-[12px] font-bold font-noto"
                      >
                        <svg className="w-3.5 h-3.5 text-[#D85A30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        {lang === 'zh' ? award.zh : award.en}
                      </span>
                    ))}
                  </div>

                  {/* Exhibition Link Card */}
                  <div className="max-w-3xl">
                    <a 
                      href="#"
                      className="block bg-white dark:bg-[#1A1A1A] border-[0.5px] border-zinc-200 dark:border-zinc-800 hover:border-[#D85A30] dark:hover:border-[#D85A30] rounded-[20px] p-6 transition-all duration-300 shadow-sm hover:shadow-md group"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[#FAECE7] text-[#D85A30] rounded-xl group-hover:scale-105 transition-transform duration-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <h4 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 mb-1.5 font-noto group-hover:text-[#D85A30] transition-colors">
                            {lang === 'zh' ? '個展《Look the Sound of Taipei Metro》' : 'Solo Exhibition "Look the Sound of Taipei Metro"'}
                          </h4>
                          <p className="text-[13px] text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed font-noto">
                            {lang === 'zh' 
                              ? '臺北捷運聲音地景視覺化研究——將城市的聲音轉譯為動態圖像。' 
                              : 'Visualization research of Taipei Metro soundscapes—translating urban sounds into dynamic motion graphics.'}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </ScrollRevealItem>
              </div>

              {/* Edu 2 - Secondary */}
              <div className="relative">
                <ScrollRevealItem index={9}>
                  {/* Grey Secondary Node that turns orange when reached */}
                  <div className={`absolute left-[-26px] md:left-[-29px] top-[7px] w-2.5 h-2.5 rounded-full ring-4 ring-[#F6F6F6] dark:ring-[#121212] z-10 timeline-node transition-colors duration-300 ${eduActiveNodes[1] ? 'bg-[#D85A30]' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                  
                  <span className="inline-block px-3.5 py-1 bg-zinc-200/60 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-full text-[11px] font-bold tracking-wider select-none mb-3 font-sans">
                    2017 – 2021
                  </span>
                  
                  <h3 className="text-[16px] font-bold text-zinc-900 dark:text-zinc-100 font-noto">
                    {lang === 'zh' ? '臺北市立大學 ｜ 視覺藝術學系' : 'University of Taipei ｜ Department of Visual Arts'}
                  </h3>
                </ScrollRevealItem>
              </div>

            </div>
          </section>

        </div>
      </div>
    );
  };

  const ContactView = () => (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 animate-in fade-in duration-700 pt-32 bg-white text-center"><div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-10 transform -rotate-12"><IconMail className="w-8 h-8" /></div><h1 className="text-6xl md:text-[6rem] font-bold tracking-tighter mb-6">Say Hello.</h1><p className="text-xl text-gray-500 mb-12 max-w-lg mx-auto">正在尋找設計師合作嗎？或是想交流交流？<br />期待與你聯繫。</p><a href="mailto:tingchenliang1998@gmail.com" className="text-2xl md:text-4xl font-bold border-b-2 border-black pb-2 hover:text-gray-500 hover:border-gray-500 transition-colors mb-20">tingchenliang1998@gmail.com</a><div className="flex gap-8 text-lg font-medium"><a href="#" className="flex items-center gap-2 hover:text-gray-500 transition-colors"><IconInstagram className="w-5 h-5" /> Instagram</a><a href="#" className="flex items-center gap-2 hover:text-gray-500 transition-colors"><IconLinkedin className="w-5 h-5" /> LinkedIn</a><a href="#" className="flex items-center gap-2 hover:text-gray-500 transition-colors"><IconGlobe className="w-5 h-5" /> Dribbble</a></div></div>
  );

export default function PortfolioApp() {
  const [lang, setLang] = useState('zh');
  const [currentPage, setCurrentPage] = useState('home');
  const [activeItem, setActiveItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [homeSelectedFilter, setHomeSelectedFilter] = useState('UI/UX Design');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTo = (callback) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300); // 配合 CSS duration 300ms
  };

  useEffect(() => {
    const handleScroll = () => { const threshold = currentPage === 'home' ? window.innerHeight * 2.9 : 50; setScrolled(window.scrollY > threshold); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  useEffect(() => { if (isMobileMenuOpen) document.body.style.overflow = 'hidden'; else document.body.style.overflow = 'auto'; }, [isMobileMenuOpen]);

  const navigateTo = (page, item = null) => {
    transitionTo(() => {
      setCurrentPage(page);
      setActiveItem(item);
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  };







  // --- 可水平捲動的 Screens 元件 ---








  const renderContent = () => {
    switch (currentPage) {
      case 'home': return <HomeView lang={lang} homeSelectedFilter={homeSelectedFilter} setHomeSelectedFilter={setHomeSelectedFilter} navigateTo={navigateTo} />;
      case 'works': return <WorksView navigateTo={navigateTo} lang={lang} />;
      case 'category': return <CategoryListView activeItem={activeItem} navigateTo={navigateTo} lang={lang} />;
      case 'project': return <ProjectView activeItem={activeItem} lang={lang} transitionTo={transitionTo} setCurrentPage={setCurrentPage} setActiveItem={setActiveItem} setIsMobileMenuOpen={setIsMobileMenuOpen} navigateTo={navigateTo} />;
      case 'about': return <AboutView lang={lang} navigateTo={navigateTo} />;
      case 'contact': return <ContactView navigateTo={navigateTo} />;
      default: return <HomeView lang={lang} homeSelectedFilter={homeSelectedFilter} setHomeSelectedFilter={setHomeSelectedFilter} navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] text-slate-900 font-sans selection:bg-orange-200 selection:text-orange-900">
      <Navbar
        scrolled={scrolled}
        currentPage={currentPage}
        navigateTo={navigateTo}
        lang={lang}
        setLang={setLang}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main>{renderContent()}</main>
      <div className={`fixed inset-0 bg-white z-[100] pointer-events-none transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
}