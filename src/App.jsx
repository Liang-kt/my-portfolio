import React, { useState, useEffect, useRef } from 'react';

// --- 內嵌 SVG 圖示組件 ---
const IconArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>;
const IconArrowUpRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>;
const IconMail = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const IconInstagram = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
const IconLinkedin = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>;
const IconGlobe = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" /></svg>;
const IconPlus = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="M12 5v14" /></svg>;
const IconMenu = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;

// --- 優化版影片播放器 ---
const OptimizedVideo = ({ src, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative bg-gray-100 overflow-hidden flex items-center justify-center ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100/50 backdrop-blur-sm">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center z-10 text-gray-400 font-bold tracking-widest text-xs">
          [ Media Missing ]
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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

// --- 分類與專案資料庫 ---
const CATEGORIES = [
  { id: 'uiux', title: 'UIUX DESIGN', subtitle: 'App / Web', description: '打造直覺且具備商業價值的數位產品體驗。從使用者研究、線框圖規劃到高保真介面設計，為品牌建立完美的數位接觸點。' },
  { id: 'motion', title: '2D MOTION GRAPHIC', subtitle: 'Animation', description: '透過動態設計賦予品牌與介面生命力。包含產品解說動畫、UI 微互動、品牌形象宣傳與短影音特效製作。' },
  { id: 'brand', title: 'BRANDING DESIGN', subtitle: 'Identity', description: '從零建立具備記憶點的品牌視覺系統。涵蓋標誌設計、色彩計畫、品牌規範與延伸實體包裝設計。' }
];

const PROJECTS = [
  {
    id: 1,
    categoryId: 'uiux',
    title: 'Wisdome.ai 企業官網設計',
    thumb: 'bg-[#0f172a]',
    coverMedia: { type: 'image', url: '/wisdome.ai_web/cover.jpg' },
    heroVideoUrl: '/wisdome.ai_web/cover-video.mp4',
    tags: ['UI/UX', 'Web Design'],
    description: 'Wisdome.ai is a startup focused on creating a comprehensive online education platform using AI, machine learning, and education as its core. This promotional video uses sleek lines and fast-paced animation to showcase Wisdome.ai’s innovative and tech-driven identity.',
    descriptionZh: 'Wisdome.ai 是一家致力於使用ai 技術打造全方位線上教育平台的新創公司，以AI、機器學習以及教育為公司核心概念。在這支形象動畫中利用俐落的線條元素搭配快節奏的動態串接，完整Wisdome.ai 創新及科技導向的企業風格。',
    client: 'WISDOME.AI',
    clientLogoUrl: '/wisdome.ai_web/wisdomeai_logo.svg',
    year: '2023 - 2024',
    services: ['VIS Design', 'Web Design', 'Corporate Identity Animation'],
    iaMapUrl: '/wisdome.ai_web/ia-map.png',
    motionVideoUrl: '/wisdome.ai_web/wisdome.ai_motion-brading.mp4',
    brandColors: [
      { hex: '#282828', label: 'Primary Dark' },
      { hex: '#00D2E2', label: 'Accent Cyan' }
    ],
    webDesignDesc: 'The website is designed with a clean, modern aesthetic that emphasizes usability and accessibility. We focused on creating an intuitive user journey that clearly communicates the value of the AI education platform.',
    webDesignDescZh: '網站採用乾淨、現代的美學設計，強調可用性與無障礙體驗。我們專注於打造直覺的使用者旅程，透過清晰的資訊架構，精準傳達 AI 教育平台的核心價值與功能。',
    gallery: []
  },
  {
    id: 2,
    categoryId: 'uiux',
    title: 'Ms. Line 學測刷題app',
    thumb: 'bg-[#F2EFE9]',
    coverMedia: { type: 'image', url: '' },
    tags: ['UI/UX', 'App Design'],
    description: '專為高中生打造的學測刷題 App，提供流暢的測驗體驗與個人化錯題本功能。',
    client: 'Ms. Line',
    year: '2023',
    gallery: []
  },
  {
    id: 3,
    categoryId: 'uiux',
    title: 'BrainBox UI Visual Design',
    thumb: 'bg-[#EAE8F2]',
    coverMedia: { type: 'image', url: '' },
    tags: ['UI/UX', 'System Design'],
    description: '智慧教育系統的視覺介面設計，優化教師與學生的操作流程，提升數位學習體驗。',
    client: 'BrainBox',
    year: '2024',
    gallery: []
  },
  {
    id: 4,
    categoryId: 'motion',
    title: 'BrainBox 智慧刷題系統',
    thumb: 'bg-black',
    coverMedia: { type: 'video', url: '' },
    tags: ['Motion', 'Explainer'],
    description: '透過生動的 2D 動畫，清楚傳達 BrainBox 產品的核心價值與功能優勢。',
    client: 'BrainBox',
    year: '2024',
    gallery: []
  },
  {
    id: 5,
    categoryId: 'motion',
    title: 'Look the Sound of Taipei',
    thumb: 'bg-[#1a1a1a]',
    coverMedia: { type: 'video', url: '' },
    tags: ['Motion', 'Data Visual'],
    description: '將臺北捷運的聲音地景進行視覺化，轉化為具備節奏感與幾何美學的動態圖像創作。',
    client: '國立臺灣藝術大學',
    year: '2023',
    gallery: []
  },
  {
    id: 6,
    categoryId: 'motion',
    title: 'How to Use BrainBox',
    thumb: 'bg-[#0f172a]',
    coverMedia: { type: 'video', url: '' },
    tags: ['Motion', 'Tutorial'],
    description: '結合 AI 語音製作的軟體操作教學影片，引導使用者快速掌握系統功能。',
    client: 'BrainBox',
    year: '2024',
    gallery: []
  },
  {
    id: 7,
    categoryId: 'motion',
    title: 'Wisdome.ai 首頁形象動畫',
    thumb: 'bg-[#F2EFE9]',
    coverMedia: { type: 'video', url: '' },
    tags: ['Motion', 'Web Animation'],
    description: '為 Wisdome.ai 官網首頁製作的形象動畫，強化品牌科技感與專業形象。',
    client: 'Wisdome.Al 聚愢科技',
    year: '2024',
    gallery: []
  },
  {
    id: 8,
    categoryId: 'brand',
    title: '果然癮品牌識別設計',
    thumb: 'bg-[#EAF2ED]',
    coverMedia: { type: 'image', url: '' },
    tags: ['Branding', 'Packaging'],
    description: '完成品牌識別系統設計，並延伸設計 3 組產品外盒及 8 款內包裝，提升視覺吸引力。',
    client: '果然癮',
    year: '2021',
    gallery: []
  },
  {
    id: 9,
    categoryId: 'brand',
    title: 'MindGap 企業識別系統',
    thumb: 'bg-[#F2EFE9]',
    coverMedia: { type: 'image', url: '' },
    tags: ['Branding', 'CIS'],
    description: '為 MindGap 打造全新的企業識別系統，建立一致且專業的品牌形象。',
    client: 'MindGap',
    year: '2023',
    gallery: []
  },
  {
    id: 10,
    categoryId: 'brand',
    title: 'BrainBox 產品識別設計',
    thumb: 'bg-[#EAE8F2]',
    coverMedia: { type: 'image', url: '' },
    tags: ['Branding', 'Product'],
    description: '為 BrainBox 智慧系統設計專屬的產品識別，包含標誌、色彩規範與應用範例。',
    client: 'BrainBox',
    year: '2024',
    gallery: []
  },
  {
    id: 11,
    categoryId: 'brand',
    title: 'Wisdome.ai 企業識別系統',
    thumb: 'bg-[#0f172a]',
    coverMedia: { type: 'image', url: '' },
    tags: ['Branding', 'CIS'],
    description: '設計企業標誌、名片及簡報模板，並整合品牌理念製作完整的識別系統手冊。',
    client: 'Wisdome.Al 聚愢科技',
    year: '2023 - 2024',
    gallery: []
  }
];

// --- 輔助組件：時間軸項目 ---
const TimelineItem = ({ year, title, subtitle, children, isLast }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div ref={ref} className={`flex flex-col md:flex-row transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="w-full md:w-36 flex-shrink-0 text-sm md:text-base text-gray-400 font-bold tracking-wider pt-1.5 mb-2 md:mb-0">
        {year}
      </div>
      <div className="hidden md:flex flex-col items-center mx-4 md:mx-8">
        <div className="w-3 h-3 rounded-full bg-black ring-4 ring-white z-10 mt-2"></div>
        {!isLast && <div className={`w-px h-full bg-gray-200 -mt-2 origin-top transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] delay-300 ${isVisible ? 'scale-y-100' : 'scale-y-0'}`}></div>}
      </div>
      <div className="pb-12 md:pb-20 flex-1 border-l-2 border-gray-100 md:border-none pl-4 md:pl-0 ml-1.5 md:ml-0 relative">
        {!isLast && <div className={`md:hidden absolute left-[-2px] top-3 w-[2px] h-full bg-gray-200 origin-top transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] delay-300 ${isVisible ? 'scale-y-100' : 'scale-y-0'}`}></div>}
        <h3 className="text-xl md:text-3xl font-bold mb-2 text-gray-900 tracking-wide">{title}</h3>
        <h4 className="text-base md:text-xl text-gray-500 mb-4 md:mb-6 font-medium tracking-wide">{subtitle}</h4>
        <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-lg">{children}</div>
      </div>
    </div>
  );
};

// --- 橫向捲動 IA Map 組件 ---
const HorizontalMapScroll = ({ url }) => {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const imgRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      if (window.innerWidth < 768) return;
      if (!sectionRef.current || !imgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      let p = 0;
      if (rect.top <= 0) {
        p = Math.min(1, Math.max(0, -rect.top / totalHeight));
      }
      setProgress(p);
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const translateX = imgRef.current
    ? (imgRef.current.scrollWidth - window.innerWidth) * progress
    : 0;

  return (
    <section ref={sectionRef} className="md:h-[300vh] relative w-full bg-white z-20">
      <div ref={stickyRef} className="md:sticky md:top-0 md:h-screen w-full overflow-hidden flex items-center">
        {/* 手機版：原生橫向滾動 */}
        <div className="md:hidden w-full overflow-x-auto hide-scrollbar py-12 px-6 snap-x snap-mandatory">
          <img src={url} alt="Information Architecture Map" className="h-[50vh] w-auto max-w-none snap-center" onError={(e) => e.target.style.display = 'none'} />
        </div>
        {/* 電腦版：JS 滾輪橫移 */}
        <div
          style={{ transform: window.innerWidth >= 768 ? `translateX(${-translateX}px)` : 'none' }}
          className="hidden md:flex h-full items-center will-change-transform"
        >
          <img
            ref={imgRef}
            src={url}
            alt="Information Architecture Map"
            className="h-[80vh] md:h-[85vh] w-auto max-w-none px-[10vw] object-contain"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
        {/* 進度指示器 */}
        <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 items-center gap-4">
          <div className="h-1 w-48 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${progress * 100}%` }} />
          </div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Scroll to explore Map</span>
        </div>
      </div>
    </section>
  );
};

// --- 主程式：App ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeItem, setActiveItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = currentPage === 'home' ? window.innerHeight * 2.4 : 50;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isMobileMenuOpen]);

  const navigateTo = (page, item = null) => {
    setCurrentPage(page);
    setActiveItem(item);
    setIsMobileMenuOpen(false);
    setTimeout(() => { window.scrollTo(0, 0); }, 10);
  };

  const Navbar = () => (
    <>
      <div className={`fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-between md:justify-center px-4 md:px-6 pointer-events-none transition-all duration-700 ${scrolled || currentPage !== 'home' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <nav className="pointer-events-auto flex items-center justify-between w-full md:w-auto md:gap-8 px-4 py-2.5 md:px-6 md:py-3 rounded-full bg-white/90 backdrop-blur-xl border border-gray-100 shadow-sm">
          <div className="text-lg md:text-xl font-bold cursor-pointer tracking-wide" onClick={() => navigateTo('home')}>
            T<span className="text-orange-500">.</span>
          </div>
          <div className="hidden md:flex gap-4 text-sm font-medium">
            <button onClick={() => navigateTo('home')} className={`px-4 py-1.5 rounded-full transition-all ${currentPage === 'home' ? 'bg-black text-white' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}>Home</button>
            <button onClick={() => navigateTo('works')} className={`px-4 py-1.5 rounded-full transition-all ${['works', 'category', 'project'].includes(currentPage) ? 'bg-black text-white' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}>Works</button>
            <button onClick={() => navigateTo('about')} className={`px-4 py-1.5 rounded-full transition-all ${currentPage === 'about' ? 'bg-black text-white' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}>About</button>
            <button onClick={() => navigateTo('contact')} className={`px-4 py-1.5 rounded-full transition-all ${currentPage === 'contact' ? 'bg-black text-white' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}>Contact</button>
          </div>
          <button className="md:hidden text-gray-800 p-1" onClick={() => setIsMobileMenuOpen(true)}>
            <IconMenu />
          </button>
        </nav>
      </div>
      <div className={`fixed inset-0 bg-white z-[60] transform transition-transform duration-500 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
        <div className="flex justify-between items-center p-6">
          <div className="text-2xl font-bold tracking-wide">T<span className="text-orange-500">.</span></div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-800"><IconX /></button>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-3xl font-black uppercase tracking-widest">
          <button onClick={() => navigateTo('home')} className={`${currentPage === 'home' ? 'text-orange-500' : 'text-gray-900'}`}>Home</button>
          <button onClick={() => navigateTo('works')} className={`${['works', 'category', 'project'].includes(currentPage) ? 'text-orange-500' : 'text-gray-900'}`}>Works</button>
          <button onClick={() => navigateTo('about')} className={`${currentPage === 'about' ? 'text-orange-500' : 'text-gray-900'}`}>About</button>
          <button onClick={() => navigateTo('contact')} className={`${currentPage === 'contact' ? 'text-orange-500' : 'text-gray-900'}`}>Contact</button>
        </div>
        <div className="p-8 pb-12 text-center text-sm text-gray-400 font-bold tracking-widest">tingchenliang1998@gmail.com</div>
      </div>
    </>
  );

  const HomeView = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);
    const requestRef = useRef();
    const heroTextRef = useRef(null);
    const heroVideoRef = useRef(null);
    const horizontalSectionRef = useRef(null);
    const trackRef = useRef(null);
    const currentHScroll = useRef(0);

    useEffect(() => {
      const updateAnimation = () => {
        currentScroll.current += (targetScroll.current - currentScroll.current) * 0.08;
        const maxScroll = window.innerHeight * 1.5;
        const p = Math.max(0, Math.min(currentScroll.current / maxScroll, 1));
        const isMobile = window.innerWidth < 768;

        if (heroTextRef.current) heroTextRef.current.style.transform = `translateX(${p * -120}vw)`;
        if (heroVideoRef.current) {
          heroVideoRef.current.style.width = isMobile ? '100%' : `${50 + 50 * p}%`;
          heroVideoRef.current.style.height = isMobile ? `${60 + 40 * p}%` : '100%';
          heroVideoRef.current.style.borderTopLeftRadius = isMobile ? `${3 * (1 - p)}rem` : `${6 * (1 - p)}rem`;
          heroVideoRef.current.style.borderTopRightRadius = isMobile ? `${3 * (1 - p)}rem` : `0`;
        }

        if (horizontalSectionRef.current && trackRef.current) {
          if (!isMobile) {
            const rect = horizontalSectionRef.current.getBoundingClientRect();
            const top = rect.top;
            const height = rect.height;
            const totalScroll = height - window.innerHeight;
            let rawTargetP = 0;
            if (top <= 0) rawTargetP = Math.min(1, Math.max(0, -top / totalScroll));
            let targetP = 0;
            if (rawTargetP < 0.25) targetP = 0;
            else if (rawTargetP >= 0.25 && rawTargetP < 0.75) targetP = 0.5;
            else targetP = 1;
            currentHScroll.current += (targetP - currentHScroll.current) * 0.04;
            const maxTranslate = trackRef.current.scrollWidth - window.innerWidth;
            trackRef.current.style.transform = `translateX(${-currentHScroll.current * maxTranslate}px)`;
          } else {
            trackRef.current.style.transform = 'none';
          }
        }
        requestRef.current = requestAnimationFrame(updateAnimation);
      };
      const handleScroll = () => { targetScroll.current = window.scrollY; };
      window.addEventListener('scroll', handleScroll, { passive: true });
      requestRef.current = requestAnimationFrame(updateAnimation);
      return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(requestRef.current); };
    }, []);

    return (
      <div className="animate-in fade-in duration-700">
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div className="h-[250vh] relative">
          <section className="sticky top-0 h-[100svh] w-full flex flex-col md:flex-row items-center px-6 md:px-12 overflow-hidden bg-[#F6F6F6] z-0">
            <div ref={heroTextRef} className="z-30 w-full pt-32 md:pt-0 will-change-transform text-center md:text-left">
              <h1 className="text-[15vw] sm:text-[12vw] md:text-[8rem] lg:text-[10rem] font-black tracking-wide leading-[0.85] md:leading-[0.8] mb-6 md:mb-8 text-gray-900 uppercase">TIFFANY LIANG</h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-500 max-w-md mx-auto md:mx-0 leading-relaxed px-4 md:px-0 tracking-wide font-medium">Beautiful design has the power to captivate audiences. 轉化品牌理念為視覺敘事。</p>
            </div>
            <div ref={heroVideoRef} className="absolute bottom-0 right-0 z-20 flex items-center justify-center bg-black overflow-hidden" style={{ width: `100%`, height: '60%', borderTopLeftRadius: `3rem`, borderTopRightRadius: `3rem` }}>
              <video src="./hero-page_showreel.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80" />
            </div>
          </section>
        </div>

        <div className="relative z-30 bg-white py-16 md:py-32 px-4 sm:px-8 md:px-12">
          <div className="max-w-[100rem] mx-auto pt-8 md:pt-12">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-wide text-gray-900 mb-10 md:mb-16">MY CORE SKILLS</h2>

            <div className="border-t border-gray-200">
              {CATEGORIES.map((cat, idx) => {
                const isExpanded = activeAccordion === cat.id;
                return (
                  <div key={cat.id} className="border-b border-gray-200 overflow-hidden">
                    <div className="py-6 md:py-12 flex items-center justify-between cursor-pointer group" onClick={() => setActiveAccordion(isExpanded ? null : cat.id)}>
                      <div className="flex flex-col lg:flex-row lg:items-baseline gap-1 md:gap-4 lg:gap-6 w-full pr-4">
                        <span className="text-orange-500 font-bold text-lg md:text-2xl">0{idx + 1}</span>
                        <h3 className="text-[2rem] sm:text-4xl md:text-[4rem] lg:text-[5rem] xl:text-[5.5rem] font-black uppercase tracking-wide text-[#252525] group-hover:text-black transition-colors leading-[1.1] md:leading-[0.9]">{cat.title}</h3>
                        <span className="text-gray-400 text-sm md:text-lg lg:text-xl font-medium mt-1 lg:mt-0 lg:ml-2 tracking-wide">{cat.subtitle}</span>
                      </div>
                      <div className={`w-10 h-10 md:w-16 md:h-16 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isExpanded ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-500 group-hover:border-black group-hover:text-black'}`}><IconPlus className={`w-5 h-5 md:w-6 md:h-6 transform transition-transform duration-500 ${isExpanded ? 'rotate-45' : ''}`} /></div>
                    </div>
                    <div className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden" style={{ maxHeight: isExpanded ? '600px' : '0px', opacity: isExpanded ? 1 : 0 }}>
                      <div className="pl-0 lg:pl-[4.5rem] pb-8 md:pb-12 pt-2 md:pt-4 flex flex-col items-start">
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mb-6 md:mb-8 font-medium">{cat.description}</p>
                        <button onClick={(e) => { e.stopPropagation(); navigateTo('category', cat.id); }} className="bg-orange-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-orange-600 transition-colors flex items-center gap-2">View {cat.subtitle} Works <IconArrowUpRight /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Projects 區塊 */}
        <div ref={horizontalSectionRef} className="md:h-[500vh] relative bg-white z-30 w-full border-t border-gray-100">
          <div className="md:sticky md:top-0 md:h-[100svh] w-full flex flex-col justify-center overflow-hidden py-16 md:py-24">
            <div className="max-w-[100rem] mx-auto w-full px-6 md:px-12 mb-6 md:mb-12"><h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-wide text-gray-900 uppercase">Recent Projects</h2></div>

            <div ref={trackRef} className="flex md:w-max w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar gap-4 md:gap-0 px-6 md:px-0 pb-8 md:pb-0">
              {PROJECTS.slice(0, 3).map(p => (
                <div key={p.id} onClick={() => navigateTo('project', p)} className="group cursor-pointer w-[85vw] md:w-screen flex-shrink-0 snap-center md:px-12 flex justify-center">
                  <div className="w-full max-w-[100rem]">
                    <div className={`h-[50vh] md:h-[70vh] rounded-[1.5rem] md:rounded-[3rem] ${p.thumb} overflow-hidden relative`}>
                      {p.coverMedia.type === 'video' ? <video src={p.coverMedia.url} autoPlay muted loop playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" /> : p.coverMedia.url ? <img src={p.coverMedia.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" alt={p.title} /> : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
                        <div className="transform translate-y-4 md:translate-y-6 group-hover:translate-y-0 transition-transform duration-500 order-2 md:order-1">
                          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-4 md:mb-6 text-white leading-tight">{p.title}</h3>
                          <div className="flex gap-2 flex-wrap mb-2 md:mb-4">{p.tags.map(tag => (<span key={tag} className="px-3 md:px-5 py-1.5 md:py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] md:text-sm font-medium text-white border border-white/30 tracking-wider font-bold uppercase">{tag}</span>))}</div>
                        </div>
                        <span className="text-white/30 font-black text-5xl md:text-8xl italic leading-none order-1 md:order-2 self-end md:self-auto tracking-widest uppercase">0{p.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WorkCategoryCard = ({ cat, idx, isLast, navigateTo, coverUrl, isVideo }) => (
    <div className={`w-full sticky ${isLast ? 'mb-0' : 'mb-[15vh] md:mb-[40vh]'}`} style={{ top: `calc(10vh + ${idx * 1.5}rem)` }}>
      <div onClick={() => navigateTo('category', cat.id)} className="w-full h-[55vh] md:h-[65vh] group cursor-pointer overflow-hidden rounded-[1.5rem] md:rounded-[4rem] relative">
        <div className="absolute inset-0 bg-black transition-colors duration-700">
          <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-60 group-hover:opacity-40">
            {isVideo ? (
              <video src={coverUrl} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            ) : coverUrl ? (
              <img src={coverUrl} alt={cat.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-900"></div>
            )}
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4">
          <h2 className="text-white text-4xl sm:text-5xl md:text-[6rem] lg:text-[7rem] font-black tracking-wider uppercase text-center leading-[1.1] md:leading-none group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-[1.5s] ease-out drop-shadow-2xl">{cat.title}</h2>
          <div className="hidden md:flex items-center gap-2 text-white font-bold tracking-widest uppercase mt-6 md:mt-10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 drop-shadow-lg">Explore Projects <IconArrowUpRight /></div>
        </div>
      </div>
    </div>
  );

  const WorksView = () => (
    <div className="bg-[#F6F6F6] animate-in fade-in duration-700 min-h-screen">
      <div className="bg-white pt-32 md:pt-40 pb-16 md:pb-32 px-6 md:px-12 rounded-b-[2rem] md:rounded-b-[4rem] relative z-10">
        <div className="max-w-[100rem] mx-auto">
          <h3 className="text-orange-500 font-bold tracking-widest uppercase mb-2 md:mb-4 text-sm md:text-base font-bold">Portfolio</h3>
          <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-wide text-gray-900 leading-none uppercase">Works</h1>
          <p className="mt-6 md:mt-8 text-base md:text-xl lg:text-2xl text-gray-500 max-w-3xl leading-relaxed tracking-wide font-medium">Explore my selected projects across UI/UX Design, Motion Graphics, and Branding. 透過不同領域的視覺敘事，探索我的精選作品。</p>
        </div>
      </div>
      <div className="max-w-[100rem] mx-auto px-4 md:px-12 pt-16 md:pt-20 pb-20 md:pb-32 relative z-0">
        {CATEGORIES.map((cat, idx) => {
          const coverProject = PROJECTS.find(p => p.categoryId === cat.id && p.coverMedia && p.coverMedia.url);
          return <WorkCategoryCard key={cat.id} cat={cat} idx={idx} isLast={idx === CATEGORIES.length - 1} navigateTo={navigateTo} coverUrl={coverProject?.coverMedia.url} isVideo={coverProject?.coverMedia.type === 'video'} />;
        })}
      </div>
    </div>
  );

  const CategoryListView = () => {
    const categoryInfo = CATEGORIES.find(c => c.id === activeItem);
    const filteredProjects = PROJECTS.filter(p => p.categoryId === activeItem);
    return (
      <div className="min-h-screen bg-white pb-20 md:pb-32 animate-in fade-in duration-700">
        <div className="pt-32 md:pt-40 px-6 md:px-12 mb-10 md:mb-16 max-w-[100rem] mx-auto">
          <button onClick={() => navigateTo('works')} className="flex items-center text-sm md:text-base text-gray-400 hover:text-black transition-colors mb-8 md:mb-12 tracking-wide font-medium"><IconArrowLeft /> <span className="ml-1 md:ml-2 font-medium uppercase">Back to works</span></button>
          <h3 className="text-orange-500 font-bold tracking-widest uppercase mb-2 md:mb-4 text-xs md:text-sm font-bold">{categoryInfo.subtitle} WORKS</h3>
          <h1 className="text-4xl md:text-6xl lg:text-[8rem] font-black tracking-wide leading-none text-[#252525] uppercase">{categoryInfo.title}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-[100rem] mx-auto px-4 md:px-8 lg:px-12">
          {filteredProjects.map(p => (
            <div key={p.id} onClick={() => navigateTo('project', p)} className="group cursor-pointer">
              <div className={`aspect-square rounded-[1.5rem] md:rounded-[2.5rem] ${p.thumb} overflow-hidden relative transition-all duration-500`}>

                <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out">
                  {p.coverMedia.type === 'video' ? (
                    <video src={p.coverMedia.url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                  ) : p.coverMedia.url ? (
                    <img src={p.coverMedia.url} className="w-full h-full object-cover" alt={p.title} />
                  ) : null}
                </div>

                <div className="absolute inset-x-0 bottom-0 h-2/3 md:h-1/2 bg-gradient-to-t from-black/70 md:from-black/60 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"><div className="hidden md:flex bg-white text-black px-6 py-3 rounded-full font-bold items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform tracking-wider uppercase">View Project <IconArrowUpRight /></div></div>
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col items-start transform group-hover:translate-y-0 md:group-hover:translate-y-[-4px] transition-transform duration-500 z-10 pointer-events-none pr-6">
                  <h3 className="text-white text-xl md:text-2xl font-bold tracking-wider mb-3 drop-shadow-md leading-tight uppercase font-bold">{p.title}</h3>
                  <div className="flex flex-wrap gap-2">{p.tags.map(tag => (<span key={tag} className="bg-white text-gray-900 px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-wide uppercase">{tag}</span>))}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AboutView = () => (
    <div className="pt-32 md:pt-40 pb-20 md:pb-32 px-6 md:px-12 max-w-[100rem] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-bold mb-10 md:mb-16 tracking-wide text-center lg:text-left uppercase">Tiffany Liang.</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 md:mb-32">
        <div className="aspect-square bg-gray-100 rounded-[2rem] flex items-center justify-center text-gray-400 text-center px-4 overflow-hidden relative w-full max-w-[600px] mx-auto lg:max-w-none">
          <span className="absolute z-0 font-medium">梁庭禎 的照片<br />(請放檔案至 public/me.jpg)</span>
          <img src="./me.jpg" className="w-full h-full object-cover relative z-10" alt="Profile" />
        </div>
        <div className="text-lg md:text-xl text-gray-600 space-y-6 flex flex-col justify-center">
          <p className="leading-relaxed tracking-wide font-medium font-bold">擁有超過 2 年動態圖像與視覺設計經驗。致力於透過動態設計，解構複雜概念並創造生動視覺呈現。</p>
          <div className="border-t border-gray-200 pt-8 md:pt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div><h4 className="font-bold text-black mb-3 md:mb-4 tracking-widest uppercase text-xs md:text-sm">Motion</h4><p className="text-sm md:text-base leading-relaxed tracking-wide font-medium text-gray-500 font-bold">動態圖像、動畫解說、影音剪輯</p></div>
            <div><h4 className="font-bold text-black mb-3 md:mb-4 tracking-widest uppercase text-xs md:text-sm">Visual</h4><p className="text-sm md:text-base leading-relaxed tracking-wide font-medium text-gray-500 font-bold">平面設計、品牌設計、介面設計</p></div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 md:mb-20 tracking-wide text-center uppercase">Work Experience</h2>
        <TimelineItem year="2023.10 - Present" title="Wisdome.Al 聚愢科技" subtitle="視覺效果設計師">
          <ul className="list-disc pl-5 space-y-2 font-medium text-gray-500 font-bold">
            <li><strong className="text-gray-800">企業識別設計：</strong>標誌、名片、官網形象動畫。</li>
            <li><strong className="text-gray-800">產品介面設計：</strong>品牌識別手冊、插圖與介面優化。</li>
            <li><strong className="text-gray-800">廣告行銷動畫：</strong>獨立完成 2 部產品形象動畫。</li>
          </ul>
        </TimelineItem>
        <TimelineItem year="2021.08 - 2021.09" title="果然癮品牌視覺設計" subtitle="品牌識別與包裝設計">
          <p className="font-medium text-gray-500 font-bold">完成品牌識別系統，並設計 3 組產品外盒及 8 款內包裝。</p>
        </TimelineItem>
        <TimelineItem year="2020.10 - 2021.01" title="遠邦國際品牌顧問" subtitle="設計實習生" isLast={true}>
          <p className="font-medium text-gray-500 font-bold">提升社群貼文互動辨識度，設計活動主視覺及品牌標誌再造。</p>
        </TimelineItem>
        <h2 className="text-4xl md:text-5xl font-bold mt-24 md:mt-32 mb-12 md:mb-20 tracking-wide text-center uppercase">Education</h2>
        <TimelineItem year="2021.09 - 2023.07" title="國立臺灣藝術大學" subtitle="視覺傳達設計研究所">
          <p className="font-medium text-gray-500 font-bold">榮獲優秀學位論文獎。舉辦《Look the Sound of Taipei Metro》個展。</p>
        </TimelineItem>
        <TimelineItem year="2017.09 - 2021.06" title="臺北市立大學" subtitle="視覺藝術學系" isLast={true}>
          <p className="font-medium text-gray-500 font-bold">奠定扎實美學素養與視覺設計基礎。</p>
        </TimelineItem>
      </div>
    </div>
  );

  // --- 專案詳情頁 ---
  const ProjectView = () => {
    if (!activeItem) return null;

    if (activeItem.id === 1) {
      return (
        <div className="bg-white animate-in fade-in duration-700 min-h-screen pb-32 overflow-hidden">
          {/* Header */}
          <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-[100rem] mx-auto mb-12">
            <button onClick={() => navigateTo('category', activeItem.categoryId)} className="flex items-center text-sm text-gray-400 hover:text-black transition-colors mb-8 md:mb-12 tracking-wide font-medium">
              <IconArrowLeft /> <span className="ml-2 font-medium uppercase">Back to category</span>
            </button>
            <h1 className="text-4xl md:text-6xl lg:text-[7rem] font-black mb-8 md:mb-12 tracking-wide uppercase leading-tight md:leading-none font-bold">{activeItem.title}</h1>
          </div>

          {/* Hero Section */}
          <div className="w-full mb-20 md:mb-40 bg-[#EAEAEC] relative flex items-center justify-center overflow-hidden">
            <span className="absolute z-0 text-gray-400 font-bold tracking-widest uppercase text-sm md:text-3xl text-center px-4">
              [ Hero 影片預留位置 : cover-video.mp4 ]
            </span>
            <video src={activeItem.heroVideoUrl} autoPlay muted loop playsInline className="relative z-10 w-full h-auto block" />
          </div>

          {/* 01 About the project Section */}
          <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-20 md:mb-40">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_2fr] gap-x-12 lg:gap-x-20">
              <div className="flex flex-col">
                <div className="mb-10">
                  <h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter mb-2">01</h2>
                  <h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight leading-tight">About the project</h3>
                </div>
                <div className="h-px bg-gray-200 w-full mb-10"></div>
                <div className="mb-10">
                  <h4 className="text-[28px] md:text-[40px] lg:text-[48px] font-bold font-['Inter'] uppercase mb-4 tracking-tight leading-none">Client</h4>
                  <div className="mt-4 w-full max-w-[200px] md:max-w-[250px]">
                    <img src={activeItem.clientLogoUrl} alt="Wisdome.ai Logo" className="w-full h-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                </div>
                <div className="h-px bg-gray-200 w-full mb-10"></div>
                <div>
                  <h4 className="text-[28px] md:text-[40px] lg:text-[48px] font-bold font-['Inter'] uppercase mb-4 tracking-tight leading-none">Service</h4>
                  <ul className="space-y-2">
                    {activeItem.services.map(service => (
                      <li key={service} className="text-[18px] md:text-[24px] lg:text-[28px] font-semibold font-['Inter'] text-gray-800 tracking-tight leading-snug">{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="hidden lg:block w-px bg-gray-200 h-full"></div>
              <div className="flex flex-col pt-8 lg:pt-16">
                <div className="space-y-8 md:space-y-10">
                  <p className="text-[18px] md:text-[24px] lg:text-[32px] font-normal font-['Inter'] text-gray-500 leading-relaxed font-medium">{activeItem.description}</p>
                  <p className="text-[18px] md:text-[24px] lg:text-[32px] font-normal font-['Noto_Sans_TC'] text-gray-800 leading-relaxed font-medium">{activeItem.descriptionZh}</p>
                </div>
              </div>
            </div>
          </div>

          <HorizontalMapScroll url={activeItem.iaMapUrl} />

          {/* 02 Typography & Colors */}
          <div className="w-full mt-24 mb-40">
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-12 md:mb-16">
              <div className="flex flex-col">
                <h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">02</h2>
                <h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2">Brand Identity</h3>
              </div>
            </div>

            <div className="w-full bg-[#EAEAEC] aspect-video md:aspect-auto md:h-[80vh] mb-16 md:mb-24 relative overflow-hidden flex items-center justify-center">
              <video src={activeItem.motionVideoUrl} autoPlay muted loop playsInline className="absolute inset-0 z-10 w-full h-full object-cover" />
              <span className="text-gray-400 font-bold tracking-widest uppercase text-sm md:text-3xl z-0 text-center px-4">Wisdome.ai_motion-branding</span>
            </div>

            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24 md:mb-32">
              <h4 className="text-[28px] md:text-[48px] font-bold font-['Inter'] mb-6 tracking-tight text-gray-900">Typography& Colors</h4>
              <div className="h-px bg-gray-400 w-full mb-12 md:mb-20"></div>

              <div className="flex flex-col gap-8 md:gap-16 mb-16 md:mb-24">
                <div className="flex justify-between items-end md:grid md:grid-cols-[1fr_2fr] gap-4 md:gap-16 lg:gap-24">
                  <div className="flex-shrink-0">
                    <p className="text-[10px] md:text-base font-bold text-gray-500 mb-1 md:mb-2 font-['Inter'] whitespace-nowrap">English typography</p>
                    <h5 className="text-base sm:text-[36px] md:text-[48px] font-bold text-[#282828] font-['Inter'] tracking-tight whitespace-nowrap">Figtree</h5>
                  </div>
                  <div className="text-right md:text-left overflow-hidden">
                    <h4 className="text-[22px] sm:text-[6vw] md:text-[80px] lg:text-[100px] font-bold font-['Inter'] text-[#282828] leading-none tracking-tighter uppercase whitespace-nowrap">WISDOME.AI</h4>
                  </div>
                </div>
                <div className="flex justify-between items-end md:grid md:grid-cols-[1fr_2fr] gap-4 md:gap-16 lg:gap-24">
                  <div className="flex-shrink-0">
                    <p className="text-[10px] md:text-base font-bold text-gray-500 mb-1 md:mb-2 font-['Inter'] whitespace-nowrap">Chinese typography</p>
                    <h5 className="text-base sm:text-[36px] md:text-[48px] font-bold text-[#282828] font-['Noto_Sans_TC'] tracking-tight whitespace-nowrap">Noto Sans TC</h5>
                  </div>
                  <div className="text-right md:text-left overflow-hidden">
                    <h4 className="text-[14px] sm:text-[4.5vw] md:text-[60px] lg:text-[72px] font-bold font-['Noto_Sans_TC'] text-[#282828] leading-none tracking-tight whitespace-nowrap">聚愢科技股份有限公司</h4>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-row h-[120px] sm:h-[200px] md:h-[400px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden mb-12 md:mb-16">
                {activeItem.brandColors.map((color) => (
                  <div key={color.hex} style={{ backgroundColor: color.hex }} className="w-1/2 h-full flex items-end p-4 md:p-12 relative">
                    <span className="text-sm sm:text-xl md:text-[32px] font-bold font-['Inter'] tracking-wider uppercase text-white">{color.hex}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                <p className="text-[16px] md:text-[18px] font-normal font-['Inter'] text-gray-900 leading-relaxed md:pr-8">Employing a vibrant blue paired with a solid black as signature colors, representing the integration of technology-driven solutions within a robust and established education system.</p>
                <p className="text-[16px] md:text-[18px] font-normal font-['Noto_Sans_TC'] text-gray-900 leading-relaxed">以明快的藍色及堅實的黑色作為品牌代表色，象徵為穩固的教育體系中增添科技導向的解決方針。</p>
              </div>
            </div>
          </div>

          {/* ================= 03 Web Design Section ================= */}
          <div className="w-full mt-24 mb-40">
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-16">
              <div className="flex flex-col">
                <h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">03</h2>
                <h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2">Web Design</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12 mb-16 md:mb-20">
                <p className="text-[16px] md:text-[24px] font-normal font-['Inter'] text-gray-500 leading-relaxed">{activeItem.webDesignDesc}</p>
                <p className="text-[16px] md:text-[24px] font-normal font-['Noto_Sans_TC'] text-gray-800 leading-relaxed">{activeItem.webDesignDescZh}</p>
              </div>
            </div>

            {/* 1. 滿版大圖 */}
            <div className="w-full bg-[#EAEAEC] relative flex items-center justify-center min-h-[30vh] md:min-h-[50vh] mb-24 md:mb-40">
              <span className="absolute z-0 text-gray-400 font-bold tracking-widest uppercase text-sm md:text-3xl text-center px-4">[ 大圖預留位置 : web-large.jpg ]</span>
              <img src="/wisdome.ai_web/web-large.jpg" className="relative z-10 w-full h-auto block" alt="Web Design Large View" onError={(e) => e.target.style.display = 'none'} />
            </div>

            {/* 2. Overlapping Showcase (依附圖 image_5379eb.png 重新設計) */}
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24 md:mb-40">
              <div className="flex flex-col gap-10 md:gap-16">
                {/* 小區塊標題 */}
                <h4 className="text-[28px] md:text-[40px] font-bold font-['Inter'] tracking-tight text-gray-900 border-b border-gray-100 pb-6">Hero Page</h4>

                {/* 展示區佈局：Desktop 疊 Mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] items-start gap-12 lg:gap-20">
                  <div className="relative flex items-start">
                    {/* 電腦版截圖 (左側/底層) */}
                    <div className="w-4/5 lg:w-[75%] aspect-[16/10] bg-[#F6F6F6] overflow-hidden flex items-center justify-center relative">
                      <span className="absolute z-0 text-gray-300 font-bold tracking-widest uppercase text-xs text-center px-4">網頁截圖<br />[web-hero-desktop.jpg]</span>
                      <img src="/wisdome.ai_web/web-hero-desktop.jpg" className="relative z-10 w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                    </div>

                    {/* 手機版截圖 (右側/上層重疊) */}
                    <div className="absolute top-[15%] right-0 w-[35%] lg:w-[30%] aspect-[9/18] bg-[#EAEAEC] overflow-hidden flex items-center justify-center translate-x-[10%] lg:translate-x-0">
                      <span className="absolute z-0 text-gray-400 font-bold tracking-widest uppercase text-[10px] text-center px-2">手機版<br />[web-hero-mobile.jpg]</span>
                      <img src="/wisdome.ai_web/web-hero-mobile.jpg" className="relative z-10 w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  </div>

                  {/* 右側說明文字 (垂直排列) */}
                  <div className="flex flex-col gap-6 pt-0 lg:pt-10">
                    <p className="text-gray-900 font-['Noto_Sans_TC'] text-lg md:text-xl font-bold border-l-4 border-orange-500 pl-4">說明文字</p>
                    <p className="text-gray-500 font-['Noto_Sans_TC'] text-base md:text-lg leading-relaxed">首創 AI 教務轉型平台，透過數據可視化呈現管理效能，大幅提升校方決策速度。</p>
                    <p className="text-gray-500 font-['Noto_Sans_TC'] text-base md:text-lg leading-relaxed">手機版介面優化後，操作流程縮短 30%，提供流暢的移動辦公體驗。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 滿版影片 */}
            <div className="w-full bg-[#F6F6F6] relative flex items-center justify-center min-h-[30vh] md:min-h-[50vh] mb-24 md:mb-40">
              <span className="absolute z-0 text-gray-400 font-bold tracking-widest uppercase text-sm md:text-3xl text-center px-4">[ 滿版影片預留位置 : web-video.mp4 ]</span>
              <video src="/wisdome.ai_web/web-video.mp4" autoPlay muted loop playsInline className="relative z-10 w-full h-auto block" />
            </div>

            {/* 4. 長條圖片 */}
            <div className="w-full bg-[#EAEAEC] relative flex items-center justify-center min-h-[30vh] md:min-h-[50vh]">
              <span className="absolute z-0 text-gray-400 font-bold tracking-widest uppercase text-sm md:text-3xl text-center px-4">[ 長條圖片預留位置 : web-long.jpg ]</span>
              <img src="/wisdome.ai_web/web-long.jpg" className="relative z-10 w-full h-auto block" alt="Web Design Long View" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
        </div>
      );
    }

    // 默認專案版面
    return (
      <div className="pt-32 md:pt-40 pb-20 md:pb-32 animate-in fade-in duration-700 bg-[#F6F6F6]">
        <div className="px-6 md:px-12 max-w-[100rem] mx-auto">
          <button onClick={() => navigateTo('home')} className="flex items-center text-sm text-gray-400 hover:text-black transition-colors mb-8 md:mb-12 tracking-wide font-medium font-bold"><IconArrowLeft /> <span className="ml-1 md:ml-2 uppercase">Back to category</span></button>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-black mb-8 md:mb-12 tracking-wide leading-tight md:leading-none uppercase font-bold">{activeItem.title}</h1>
        </div>
        <div className="w-full aspect-video md:aspect-auto md:h-[85vh] mb-12 md:mb-24 bg-gray-200">
          {activeItem.coverMedia.type === 'video' ? <video src={activeItem.coverMedia.url} autoPlay muted loop playsInline className="w-full h-full object-cover" /> : activeItem.coverMedia.url ? <img src={activeItem.coverMedia.url} className="w-full h-full object-cover" alt={activeItem.title} /> : null}
        </div>
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 mb-16 md:mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8 font-bold">
            <div><h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 md:mb-2 font-bold">Client</h4><p className="text-base md:text-xl font-black tracking-tight uppercase text-gray-900 font-bold">{activeItem.client}</p></div>
            <div><h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 md:mb-2 font-bold">Year</h4><p className="text-base md:text-xl font-black tracking-tight uppercase text-gray-900 font-bold">{activeItem.year}</p></div>
            <div className="col-span-2 lg:col-span-1 font-bold"><h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 md:mb-2 font-bold">Services</h4><div className="flex flex-wrap gap-2 mt-2">{activeItem.tags.map(t => (<span key={t} className="px-4 py-1.5 bg-gray-100 rounded-full text-[10px] md:text-xs font-black tracking-tight uppercase text-gray-800 font-bold">{t}</span>))}</div></div>
          </div>
          <div className="text-lg md:text-2xl text-gray-500 leading-relaxed tracking-wide font-medium font-bold"><p>{activeItem.description}</p></div>
        </div>
      </div>
    );
  };

  const ContactView = () => (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 animate-in fade-in duration-700 text-center py-32 bg-white">
      <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-wide mb-8 md:mb-12 leading-none uppercase font-bold">Say Hello.</h1>
      <a href="mailto:tingchenliang1998@gmail.com" className="text-lg sm:text-2xl md:text-4xl font-bold border-b-2 border-black pb-1 md:pb-2 hover:text-gray-400 hover:border-gray-400 transition-all mb-16 md:mb-24 break-all tracking-wide font-bold">tingchenliang1998@gmail.com</a>
      <div className="flex gap-8 md:gap-12 text-black justify-center font-bold">
        <a href="#" className="hover:scale-110 transition-transform"><IconInstagram /></a>
        <a href="#" className="hover:scale-110 transition-transform"><IconLinkedin /></a>
        <a href="#" className="hover:scale-110 transition-transform"><IconGlobe /></a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F6F6F6] text-slate-900 font-sans selection:bg-orange-200">
      <Navbar />
      <main>
        {currentPage === 'home' && <HomeView />}
        {currentPage === 'about' && <AboutView />}
        {currentPage === 'works' && <WorksView />}
        {currentPage === 'category' && <CategoryListView />}
        {currentPage === 'project' && activeItem && <ProjectView />}
        {currentPage === 'contact' && <ContactView />}
      </main>
      <footer className="py-12 md:py-20 px-6 md:px-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs md:text-sm bg-white gap-6 md:gap-0">
        <p className="tracking-wide font-black uppercase font-bold">© {new Date().getFullYear()} Tiffany Liang. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 tracking-widest font-black uppercase font-bold">
          <button onClick={() => navigateTo('home')} className="hover:text-black transition-colors">Works</button>
          <button onClick={() => navigateTo('about')} className="hover:text-black transition-colors">About</button>
          <button onClick={() => navigateTo('contact')} className="hover:text-black transition-colors">Contact</button>
        </div>
      </footer>
    </div>
  );
}