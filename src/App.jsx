import React, { useState, useEffect, useRef } from 'react';

// --- 內嵌 SVG 圖示組件 (完全封裝) ---
const IconArrowLeft = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>;
const IconArrowUpRight = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>;
const IconMail = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const IconInstagram = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
const IconLinkedin = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>;
const IconGlobe = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" /></svg>;
const IconPlus = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="M12 5v14" /></svg>;
const IconMenu = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>;
const IconX = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;

// ========================= 核心架構：共用元件 =========================

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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
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

// --- 橫向捲動 IA Map 組件 ---
const HorizontalMapScroll = ({ url }) => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [hasError, setHasError] = useState(false);

  const updateMaxScroll = () => { if (imgRef.current && !hasError) setMaxScroll(Math.max(0, imgRef.current.scrollWidth - window.innerWidth)); };

  useEffect(() => {
    const updateScroll = () => {
      if (window.innerWidth < 768 || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      let p = rect.top <= 0 ? Math.min(1, Math.max(0, -rect.top / totalHeight)) : 0;
      setProgress(p);
    };
    window.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateMaxScroll);
    updateScroll();
    setTimeout(updateMaxScroll, 100);
    return () => { window.removeEventListener('scroll', updateScroll); window.removeEventListener('resize', updateMaxScroll); };
  }, [hasError]);

  const translateX = maxScroll * progress;

  return (
    <section ref={sectionRef} className="md:h-[300vh] relative w-full bg-white z-20">
      <div className="md:sticky md:top-0 md:h-screen w-full flex items-center overflow-hidden">
        <div className="md:hidden w-full overflow-x-auto hide-scrollbar py-12 px-6 snap-x snap-mandatory flex">
          {hasError ? <div className="h-[50vh] w-[80vw] bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl mx-auto" /> : <img src={url} alt="" className="h-[50vh] w-auto max-w-none snap-center" onError={() => setHasError(true)} onLoad={updateMaxScroll} />}
        </div>
        <div style={{ transform: window.innerWidth >= 768 ? `translateX(${-translateX}px)` : 'none' }} className="hidden md:flex h-full items-center will-change-transform">
          {hasError ? <div className="h-[70vh] w-[80vw] bg-gray-50 border-2 border-dashed border-gray-200 rounded-[3rem] mx-32 shadow-sm" /> : <img ref={imgRef} src={url} alt="" className="h-[80vh] md:h-[85vh] w-auto max-w-none px-[10vw] object-contain" onLoad={updateMaxScroll} onError={() => setHasError(true)} />}
        </div>
        {!hasError && <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 items-center gap-4"><div className="h-1 w-48 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${progress * 100}%` }} /></div><span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Scroll to explore Map</span></div>}
      </div>
    </section>
  );
};

// ========================= 核心架構：資料庫 =========================

const CATEGORIES = [
  { id: 'uiux', title: 'UI/UX Design', subtitle: 'App / Web Design', description: '打造直覺且具備商業價值的數位產品體驗，包含 App、Web 介面設計與使用者研究。' },
  { id: 'motion', title: 'Motion Graphic Design', subtitle: 'Animation / 2D', description: '透過動態設計賦予品牌與介面生命力，包含解說動畫、UI 微互動與短影音。' },
  { id: 'brand', title: 'Branding Design', subtitle: 'Strategy / Identity', description: '從零建立具備記憶點的品牌視覺系統，涵蓋標誌設計、色彩計畫與品牌規範。' }
];

const PROJECTS = [
  {
    id: 1,
    categoryId: 'uiux',
    title: 'Wisdome.ai 企業官網設計',
    thumb: 'bg-[#0f172a]',
    coverMedia: { type: 'image', url: '/projects/wisdome.ai_web/cover.jpg' },
    coverVideoUrl: '/projects/wisdome.ai_web/cover-video.mp4',
    clientLogoUrl: '/projects/wisdome.ai_web/wisdomeai_logo.svg',
    iaMapUrl: '/projects/wisdome.ai_web/ia-map.png',
    motionVideoUrl: '/projects/wisdome.ai_web/wisdome.ai_motion-brading.mp4',
    heroPageVideoUrl: '/projects/wisdome.ai_web/hero-page.mp4',
    serviceDesktopVideo: '/projects/wisdome.ai_web/service-desktop.mp4',
    serviceMobileVideo: '/projects/wisdome.ai_web/service-mobile.mp4',
    successDesktopVideo: '/projects/wisdome.ai_web/success-desktop.mp4',
    successMobileVideo: '/projects/wisdome.ai_web/success-mobile.mp4',
    successFullpageImg: '/projects/wisdome.ai_web/success-fullpage.jpg',
    tags: ['UI/UX', 'Web Design'],
    description: 'Wisdome.ai is a startup focused on creating a comprehensive online education platform using AI, machine learning, and education as its core. This promotional video uses sleek lines and fast-paced animation to showcase Wisdome.ai’s innovative and tech-driven identity.',
    descriptionZh: 'Wisdome.ai 是一家致力於使用ai 技術打造全方位線上教育平台的新創公司，以AI、機器學習以及教育為公司核心概念。在這支形象動畫中利用俐落的線條元素搭配快節奏的動態串接，完整Wisdome.ai 創新及科技導向的企業風格。',
    client: 'WISDOME.AI',
    year: '2023 - 2024',
    services: ['VIS Design', 'Web Design', 'Corporate Identity Animation'],
    brandColors: [{ hex: '#282828', label: 'Primary Dark' }, { hex: '#00D2E2', label: 'Accent Cyan' }],
    webDesignDesc: 'The website is designed with a clean, modern aesthetic that emphasizes usability and accessibility. We focused on creating an intuitive user journey that clearly communicates the value of the AI education platform.',
    webDesignDescZh: '網站採用乾淨、現代的美學設計，強調可用性與無障礙體驗。我們專注於打造直覺的使用者旅程，透過清晰的資訊架構，精準傳達 AI 教育平台的核心價值與功能。',
    gallery: []
  },
  { id: 2, categoryId: 'uiux', title: 'Ms. Line 學測刷題app', thumb: 'bg-[#F2EFE9]', coverMedia: { type: 'image', url: '' }, tags: ['UI/UX', 'App Design'], description: '專為高中生打造的學測刷題 App，提供流暢的測驗體驗與個人化錯題本功能。', client: 'Ms. Line', year: '2023', gallery: [] },
  {
    id: 3,
    categoryId: 'uiux',
    title: 'BrainBox UI Visual Design',
    thumb: 'bg-[#EAE8F2]',
    coverMedia: { type: 'image', url: '/projects/brainbox_ui/cover.jpg' },
    tags: ['UI/UX', 'System Design'],
    description: '智慧教育系統的視覺介面設計，優化教師與學生的操作流程，提升數位學習體驗。',
    client: 'BrainBox',
    year: '2024',
    gallery: []
  },
  { id: 4, categoryId: 'motion', title: 'BrainBox 智慧刷題系統', thumb: 'bg-black', coverMedia: { type: 'video', url: '' }, tags: ['Motion', 'Explainer'], description: '透過生動的 2D 動畫，清楚傳達 BrainBox 產品的核心價值與功能優勢。', client: 'BrainBox', year: '2024', gallery: [] },
  { id: 5, categoryId: 'motion', title: 'Look the Sound of Taipei Metro', thumb: 'bg-[#1a1a1a]', coverMedia: { type: 'video', url: '' }, tags: ['Motion', 'Data Visual'], description: '將臺北捷運的聲音地景進行視覺化，轉化為具備節奏感與幾何美學的動態圖像創作。', client: '國立臺灣藝術大學', year: '2023', gallery: [] },
  { id: 8, categoryId: 'brand', title: '果然癮品牌識別設計', thumb: 'bg-[#EAF2ED]', coverMedia: { type: 'image', url: '' }, tags: ['Branding', 'Packaging'], description: '完成品牌識別系統設計，並延伸設計 3 組產品外盒及 8 款內包裝，提升視覺吸引力。', client: '果然癮', year: '2021', gallery: [] }
];

// ========================= 核心架構：主應用程式 =========================

export default function PortfolioApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeItem, setActiveItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { const threshold = currentPage === 'home' ? window.innerHeight * 2.4 : 50; setScrolled(window.scrollY > threshold); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  useEffect(() => { if (isMobileMenuOpen) document.body.style.overflow = 'hidden'; else document.body.style.overflow = 'auto'; }, [isMobileMenuOpen]);

  const navigateTo = (page, item = null) => { setCurrentPage(page); setActiveItem(item); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const getFormattedServiceTitle = (title) => {
    if (title.includes('UI/UX')) return { big: 'UIUX', small: 'App / Web Design' };
    if (title.includes('Motion')) return { big: 'MOTION GRAPHIC DESIGN', small: 'Animation / 2D' };
    if (title.includes('Brand')) return { big: 'BRANDING DESIGN', small: 'Strategy / Identity' };
    return { big: title, small: '' };
  };

  const Navbar = () => (
    <>
      <div className={`fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-between md:justify-center px-4 md:px-6 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${scrolled || currentPage !== 'home' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <nav className="pointer-events-auto flex items-center justify-between w-full md:w-auto md:gap-8 px-4 py-2.5 md:px-6 md:py-3 rounded-full bg-white/90 backdrop-blur-xl border border-gray-100 shadow-sm">
          <div className="text-lg md:text-xl font-bold cursor-pointer tracking-wide" onClick={() => navigateTo('home')}>T<span className="text-orange-500">.</span></div>
          <div className="hidden md:flex gap-2 md:gap-6 text-sm font-medium">
            <button onClick={() => navigateTo('home')} className={`px-3 py-1.5 rounded-full transition-all ${currentPage === 'home' ? 'bg-black text-white' : 'text-gray-600 hover:text-black hover:bg-gray-100'}`}>Home</button>
            <button onClick={() => navigateTo('works')} className={`px-3 py-1.5 rounded-full transition-all ${['works', 'category', 'project'].includes(currentPage) ? 'bg-black text-white' : 'text-gray-600 hover:text-black hover:bg-gray-100'}`}>Works</button>
            <button onClick={() => navigateTo('about')} className={`px-3 py-1.5 rounded-full transition-all ${currentPage === 'about' ? 'bg-black text-white' : 'text-gray-600 hover:text-black hover:bg-gray-100'}`}>About</button>
            <button onClick={() => navigateTo('contact')} className={`px-3 py-1.5 rounded-full transition-all ${currentPage === 'contact' ? 'bg-black text-white' : 'text-gray-600 hover:text-black hover:bg-gray-100'}`}>Contact</button>
          </div>
          <button className="md:hidden text-gray-800 p-1" onClick={() => setIsMobileMenuOpen(true)}><IconMenu className="w-6 h-6" /></button>
        </nav>
      </div>
      <div className={`fixed inset-0 bg-white z-[60] transform transition-transform duration-500 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
        <div className="flex justify-between items-center p-6"><div className="text-2xl font-bold tracking-wide">T<span className="text-orange-500">.</span></div><button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-800"><IconX className="w-6 h-6" /></button></div>
        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-3xl font-black uppercase tracking-widest"><button onClick={() => navigateTo('home')} className={`${currentPage === 'home' ? 'text-orange-500' : 'text-gray-900'}`}>Home</button><button onClick={() => navigateTo('works')} className={`${['works', 'category', 'project'].includes(currentPage) ? 'text-orange-500' : 'text-gray-900'}`}>Works</button><button onClick={() => navigateTo('about')} className={`${currentPage === 'about' ? 'text-orange-500' : 'text-gray-900'}`}>About</button><button onClick={() => navigateTo('contact')} className={`${currentPage === 'contact' ? 'text-orange-500' : 'text-gray-900'}`}>Contact</button></div>
        <div className="p-8 pb-12 text-center text-sm text-gray-400 font-bold tracking-widest">tingchenliang1998@gmail.com</div>
      </div>
    </>
  );

  const FooterCTA = () => (
    <div className="w-full mt-24 mb-16 px-6 max-w-[100rem] mx-auto text-center">
      <div className="bg-[#F8F9FA] rounded-[3rem] p-12 md:p-32 flex flex-col items-center">
        <h2 className="text-5xl md:text-[6rem] font-bold tracking-tighter mb-8 text-gray-900 leading-tight">Let's create<br />something amazing.</h2>
        <p className="text-xl text-gray-500 mb-12 max-w-md font-medium tracking-wide">有任何專案合作想法，或是想聊聊設計？隨時歡迎與我聯繫。</p>
        <button onClick={() => navigateTo('contact')} className="bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-600 hover:scale-105 transition-all duration-300 flex items-center gap-2">Get in touch <IconArrowUpRight className="w-5 h-5" /></button>
      </div>
      <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm px-6">
        <p className="font-bold uppercase tracking-wide">© {new Date().getFullYear()} Tiffany Liang.</p>
        <div className="flex gap-6 mt-4 md:mt-0 font-bold uppercase tracking-widest"><a href="#" className="hover:text-black transition-colors">LinkedIn</a><a href="#" className="hover:text-black transition-colors">Instagram</a><a href="#" className="hover:text-black transition-colors">Behance</a></div>
      </div>
    </div>
  );

  const HomeView = () => {
    const [scrollY, setScrollY] = useState(0);
    const [vh, setVh] = useState(800);
    const [isMobile, setIsMobile] = useState(false);
    const horizontalSectionRef = useRef(null);
    const trackRef = useRef(null);
    const currentHScroll = useRef(0);
    const [activeAccordion, setActiveAccordion] = useState(null);

    useEffect(() => {
      setVh(window.innerHeight); setIsMobile(window.innerWidth < 768);
      const handleScroll = () => { window.requestAnimationFrame(() => { setScrollY(window.scrollY); }); };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => { window.removeEventListener('scroll', handleScroll); };
    }, []);

    const rawProgress = scrollY / (vh * 1.5); const progress = Math.min(Math.max(rawProgress, 0), 1);
    const easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const textTranslateX = easeProgress * -120;

    useEffect(() => {
      const updateAnimation = () => {
        if (horizontalSectionRef.current && trackRef.current && window.innerWidth >= 768) {
          const rect = horizontalSectionRef.current.getBoundingClientRect();
          const totalScroll = rect.height - window.innerHeight;
          let targetP = 0;
          if (rect.top <= 0) {
            let rawP = Math.min(1, Math.max(0, -rect.top / totalScroll));
            if (rawP < 0.3) targetP = 0; else if (rawP >= 0.3 && rawP < 0.7) targetP = 0.5; else targetP = 1;
          }
          currentHScroll.current += (targetP - currentHScroll.current) * 0.1;
          const maxTranslate = trackRef.current.scrollWidth - window.innerWidth;
          trackRef.current.style.transform = `translateX(${-currentHScroll.current * maxTranslate}px)`;
        }
        requestAnimationFrame(updateAnimation);
      };
      const reqId = requestAnimationFrame(updateAnimation);
      return () => cancelAnimationFrame(reqId);
    }, []);

    return (
      <div className="animate-in fade-in duration-700 bg-[#F6F6F6]">
        <div className="h-[250vh] w-full relative">
          <section className="sticky top-0 h-[100svh] w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 overflow-hidden bg-[#F6F6F6] z-0">
            <div className="w-full md:w-[75%] pt-40 md:pt-0 z-30 pointer-events-none will-change-transform" style={{ transform: `translateX(${textTranslateX}vw)` }}>
              <h2 className="text-xl md:text-2xl text-orange-600 mb-6 font-medium flex items-center gap-2"><span className="text-4xl leading-none -mt-2">*</span> We are digital design</h2>
              <h1 className="text-[12vw] md:text-[6.5rem] lg:text-[8.5rem] xl:text-[9.5rem] leading-[0.8] font-black tracking-tighter text-[#252525] mb-8 whitespace-nowrap">TIFFANY LIANG</h1>
              <p className="text-lg md:text-xl text-gray-500 max-w-md leading-relaxed font-medium mt-8 whitespace-normal">Beautiful design has the power to captivate audiences. 轉化品牌理念與抽象概念為視覺敘事。</p>
            </div>
            <div className="absolute bottom-0 right-0 z-20 flex items-center justify-center bg-[#EAEAEC] shadow-2xl overflow-hidden will-change-[width,height,border-radius]" style={{ width: isMobile ? '100%' : `${50 + (50 * easeProgress)}%`, height: isMobile ? `${40 + (60 * easeProgress)}vh` : '100%', borderTopLeftRadius: `${isMobile ? 3 * (1 - easeProgress) : 6 * (1 - easeProgress)}rem`, borderTopRightRadius: isMobile ? `${3 * (1 - easeProgress)}rem` : '0', }}>
              <video src="/hero-page_showreel.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover absolute inset-0" />
            </div>
          </section>
        </div>
        <div className="relative z-30 bg-white rounded-t-[3rem] md:rounded-t-[4rem] w-full mt-[-2rem] md:mt-[-4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.08)]">
          <section className="pt-24 md:pt-40 pb-20 px-4 md:px-8 max-w-[100rem] mx-auto">
            <div className="mb-16 md:mb-24 px-4 md:px-8">
              <h3 className="text-orange-500 mb-4 font-medium text-lg tracking-wider uppercase">{'{ Our Services }'}</h3>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900">Explore what we can<br className="hidden md:block" /> do for you</h2>
            </div>
            <div className="border-t border-gray-200 w-full">
              {CATEGORIES.map((cat, idx) => {
                const { big, small } = getFormattedServiceTitle(cat.title);
                const isExpanded = activeAccordion === cat.id;
                return (
                  <div key={cat.id} className="group border-b border-gray-200 py-10 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer hover:bg-[#F8F9FA] transition-colors duration-300 px-4 md:px-12" onClick={() => setActiveAccordion(isExpanded ? null : cat.id)}>
                    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 w-full"><span className="text-orange-500 font-medium text-xl md:text-2xl mt-2 md:mt-0">0{idx + 1}</span><h3 className="text-4xl md:text-5xl lg:text-[5rem] font-black uppercase tracking-tighter text-[#333] group-hover:text-black transition-colors leading-[1.1]">{big}</h3><span className="text-gray-400 text-lg md:text-2xl font-medium hidden md:block ml-2 mb-2">{small}</span></div>
                    <span className="text-gray-400 text-lg font-medium md:hidden mt-4 mb-6">{small}</span>
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300 flex-shrink-0 ${isExpanded ? 'bg-black text-white border-black' : ''}`}><IconPlus className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-500 ${isExpanded ? 'rotate-45' : 'group-hover:rotate-90'}`} /></div>
                    <div className="w-full md:hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden" style={{ maxHeight: isExpanded ? '600px' : '0px', opacity: isExpanded ? 1 : 0 }}><div className="pb-8 pt-4 flex flex-col items-start"><p className="text-lg text-gray-600 leading-relaxed mb-6 font-medium">{cat.description}</p><button onClick={(e) => { e.stopPropagation(); navigateTo('category', cat.id); }} className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-orange-600 transition-colors flex items-center gap-2">View Works <IconArrowUpRight className="w-4 h-4" /></button></div></div>
                  </div>
                );
              })}
            </div>
          </section>
          <div ref={horizontalSectionRef} className="md:h-[500vh] relative bg-white z-30 w-full border-t border-gray-100">
            <div className="md:sticky md:top-0 md:h-[100svh] w-full flex flex-col justify-center overflow-hidden py-16 md:py-24">
              <div className="max-w-[100rem] mx-auto w-full px-6 md:px-12 mb-6 md:mb-12"><h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-wide text-gray-900 uppercase">Recent Projects</h2></div>
              <div ref={trackRef} className="flex md:w-max w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none hide-scrollbar gap-4 md:gap-0 px-6 md:px-0 pb-8 md:pb-0">
                {[1, 5, 8].map(id => PROJECTS.find(p => p.id === id)).map((p, idx) => (
                  <div key={p.id} onClick={() => navigateTo('project', p)} className="group cursor-pointer w-[85vw] md:w-screen flex-shrink-0 snap-center md:px-12 flex justify-center">
                    <div className="w-full max-w-[100rem]">
                      <div className={`h-[50vh] md:h-[70vh] rounded-[1.5rem] md:rounded-[3rem] ${p.thumb} overflow-hidden relative flex items-center justify-center`}>
                        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out">
                          {p.coverMedia?.type === 'video' ? <OptimizedVideo src={p.coverMedia.url} className="w-full h-full" /> : p.coverMedia?.url ? <img src={p.coverMedia.url} className="w-full h-full object-cover" alt={p.title} /> : <span className="text-gray-400 font-medium text-xl">[Cover: {p.title}]</span>}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
                          <div className="transform translate-y-4 md:translate-y-6 group-hover:translate-y-0 transition-transform duration-500 order-2 md:order-1"><h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-4 md:mb-6 text-white leading-tight">{p.title}</h3><div className="flex gap-2 flex-wrap mb-2 md:mb-4">{p.tags.map(tag => (<span key={tag} className="px-3 md:px-5 py-1.5 md:py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] md:text-sm font-medium text-white border border-white/30 tracking-wider uppercase">{tag}</span>))}</div></div>
                          <span className="text-white/30 font-black text-5xl md:text-8xl italic leading-none order-1 md:order-2 self-end md:self-auto tracking-widest uppercase">0{idx + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <FooterCTA />
        </div>
      </div>
    );
  };

  const WorkCategoryCard = ({ cat, idx, isLast, navigateTo, coverUrl, isVideo }) => (
    <div className={`w-full sticky ${isLast ? 'mb-0' : 'mb-[15vh] md:mb-[40vh]'}`} style={{ top: `calc(10vh + ${idx * 1.5}rem)` }}>
      <div onClick={() => navigateTo('category', cat.id)} className="w-full h-[55vh] md:h-[65vh] group cursor-pointer overflow-hidden rounded-[1.5rem] md:rounded-[4rem] relative">
        <div className="absolute inset-0 bg-black transition-colors duration-700"><div className="w-full h-full transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-60 group-hover:opacity-40">{isVideo ? <OptimizedVideo src={coverUrl} className="w-full h-full" /> : coverUrl ? <img src={coverUrl} alt={cat.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-900" />}</div></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4"><h2 className="text-white text-4xl sm:text-5xl md:text-[6rem] lg:text-[7rem] font-black tracking-wider uppercase text-center leading-[1.1] md:leading-none group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-[1.5s] ease-out drop-shadow-2xl">{cat.title}</h2><div className="hidden md:flex items-center gap-2 text-white font-bold tracking-widest uppercase mt-6 md:mt-10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 drop-shadow-lg">Explore Projects <IconArrowUpRight className="w-6 h-6 ml-2" /></div></div>
      </div>
    </div>
  );

  const WorksView = () => (
    <div className="bg-[#F6F6F6] animate-in fade-in duration-700 min-h-screen">
      <div className="bg-white pt-32 md:pt-40 pb-16 md:pb-32 px-6 md:px-12 rounded-b-[2rem] md:rounded-b-[4rem] relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        <div className="max-w-[100rem] mx-auto"><h3 className="text-orange-500 font-bold tracking-widest uppercase mb-2 md:mb-4 text-sm md:text-base">Portfolio</h3><h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-wide text-gray-900 leading-none uppercase">Works</h1><p className="mt-6 md:mt-8 text-base md:text-xl lg:text-2xl text-gray-500 max-w-3xl leading-relaxed tracking-wide font-medium">Explore my selected projects across UI/UX Design, Motion Graphics, and Branding. 透過不同領域的視覺敘事，探索我的精選作品。</p></div>
      </div>
      <div className="max-w-[100rem] mx-auto px-4 md:px-12 pt-16 md:pt-20 pb-20 md:pb-32 relative z-0">{CATEGORIES.map((cat, idx) => { const coverProject = PROJECTS.find(p => p.categoryId === cat.id && p.coverMedia && p.coverMedia.url); return <WorkCategoryCard key={cat.id} cat={cat} idx={idx} isLast={idx === CATEGORIES.length - 1} navigateTo={navigateTo} coverUrl={coverProject?.coverMedia.url} isVideo={coverProject?.coverMedia.type === 'video'} />; })}</div>
    </div>
  );

  const CategoryListView = () => {
    const categoryInfo = CATEGORIES.find(c => c.id === activeItem);
    const filteredProjects = PROJECTS.filter(p => p.categoryId === activeItem);
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
      <div className="min-h-screen bg-[#F6F6F6] pb-20 md:pb-32 animate-in fade-in duration-700">
        <div className="bg-white pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 mb-10 md:mb-16 rounded-b-[2rem] md:rounded-b-[4rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)]"><div className="max-w-[100rem] mx-auto"><button onClick={() => navigateTo('works')} className="flex items-center text-sm md:text-base text-gray-400 hover:text-black transition-colors mb-8 md:mb-12 tracking-wide font-medium"><IconArrowLeft className="w-5 h-5 mr-2" /> <span className="font-medium uppercase">Back to works</span></button><h3 className="text-orange-500 font-bold tracking-widest uppercase mb-2 md:mb-4 text-xs md:text-sm">{categoryInfo?.subtitle} WORKS</h3><h1 className="text-4xl md:text-6xl lg:text-[8rem] font-black tracking-tight leading-none text-gray-900 uppercase">{categoryInfo?.title}</h1><p className="mt-6 md:mt-8 text-base md:text-xl text-gray-500 max-w-3xl leading-relaxed tracking-wide font-medium">{categoryInfo?.description}</p></div></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-[100rem] mx-auto px-4 md:px-8 lg:px-12">{filteredProjects.map(p => (<div key={p.id} onClick={() => navigateTo('project', p)} className="group cursor-pointer"><div className={`aspect-square rounded-[1.5rem] md:rounded-[2.5rem] ${p.thumb} overflow-hidden relative transition-all duration-500 shadow-sm hover:shadow-xl`}><div className="w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out">{p.coverMedia.type === 'video' ? <OptimizedVideo src={p.coverMedia.url} className="w-full h-full" /> : p.coverMedia.url ? <img src={p.coverMedia.url} className="w-full h-full object-cover" alt={p.title} /> : null}</div><div className="absolute inset-x-0 bottom-0 h-2/3 md:h-1/2 bg-gradient-to-t from-black/70 md:from-black/60 to-transparent pointer-events-none"></div><div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"><div className="hidden md:flex bg-white text-black px-6 py-3 rounded-full font-bold items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform tracking-wider uppercase">View Project <IconArrowUpRight className="w-4 h-4 ml-1" /></div></div><div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col items-start transform group-hover:translate-y-0 md:group-hover:translate-y-[-4px] transition-transform duration-500 z-10 pointer-events-none pr-6"><h3 className="text-white text-xl md:text-3xl font-bold tracking-tight mb-3 drop-shadow-md leading-tight">{p.title}</h3><div className="flex flex-wrap gap-2">{p.tags.map(tag => (<span key={tag} className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-wide uppercase">{tag}</span>))}</div></div></div></div>))}</div>
      </div>
    );
  };

  const ProjectView = () => {
    if (!activeItem) return null;

    // --- 封裝重複的返回按鈕元件 (修正邏輯：回到所屬分類) ---
    const BackButton = () => (
      <button
        onClick={() => navigateTo('category', activeItem.categoryId)}
        className="flex items-center text-sm font-medium text-gray-400 hover:text-black mb-12 transition-colors"
      >
        <IconArrowLeft className="w-4 h-4 mr-2" />
        <span className="uppercase">Back to {activeItem.categoryId.toUpperCase()} WORKS</span>
      </button>
    );

    // ================= Wisdome.ai 專屬客製化版面 (ID: 1) =================
    if (activeItem.id === 1) {
      return (
        <div className="bg-white animate-in fade-in duration-700 min-h-screen pb-32">
          <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-[100rem] mx-auto mb-12">
            <BackButton />
            <h1 className="text-4xl md:text-6xl lg:text-[7rem] font-black mb-8 md:mb-12 tracking-wide uppercase leading-tight md:leading-none font-bold">{activeItem.title}</h1>
          </div>
          <div className="w-full aspect-video mb-16 md:mb-24 bg-[#EAEAEC] relative flex items-center justify-center overflow-hidden"><OptimizedVideo src={activeItem.coverVideoUrl} className="w-full h-full" /></div>
          <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-20 md:mb-40 mt-12"><div className="flex flex-col mb-12 border-b border-gray-100 pb-10"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">01</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2">About the Project</h3></div><div className="grid md:grid-cols-[1fr_2fr] gap-12 lg:gap-20"><div className="space-y-8"><div><h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Client</h4><div className="relative min-h-[3rem] flex flex-col justify-center mb-2"><img src={activeItem.clientLogoUrl} alt="Wisdome.ai Logo" className="h-8 md:h-12 w-auto object-contain origin-left" onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'block'; }} /><div className="hidden bg-gray-50 border border-gray-200 p-3 rounded-lg w-max"><p className="text-xl font-medium text-gray-800">{activeItem.client}</p></div></div></div><div><h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Year</h4><p className="text-xl font-medium">{activeItem.year}</p></div><div><h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Services</h4><div className="flex flex-wrap gap-2 mt-2">{activeItem.services?.map(t => (<span key={t} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold">{t}</span>))}</div></div></div><div className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium"><p className="mb-6">{activeItem.description}</p><p className="font-['Noto_Sans_TC']">{activeItem.descriptionZh}</p></div></div></div>
          <HorizontalMapScroll url={activeItem.iaMapUrl} />
          <div className="w-full mt-24 mb-40"><div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-12 md:mb-16"><div className="flex flex-col border-b border-gray-100 pb-10"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">02</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2">Brand Identity</h3></div></div><div className="w-full aspect-video md:aspect-auto md:h-[80vh] bg-[#EAEAEC] mb-16 md:mb-24 relative overflow-hidden flex items-center justify-center"><OptimizedVideo src={activeItem.motionVideoUrl} className="w-full h-full relative z-10" /></div><div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24 md:mb-32"><h4 className="text-[28px] md:text-[48px] font-bold font-['Inter'] mb-6 tracking-tight text-gray-900">Typography & Colors</h4><div className="h-px bg-gray-400 w-full mb-12 md:mb-20"></div><div className="flex flex-col gap-8 md:gap-16 mb-16 md:mb-24"><div className="flex justify-between items-end md:grid md:grid-cols-[1fr_2fr] gap-4 md:gap-16 lg:gap-24"><div className="flex-shrink-0"><p className="text-[10px] md:text-base font-bold text-gray-500 mb-1 md:mb-2 font-['Inter'] whitespace-nowrap">English typography</p><h5 className="text-base sm:text-[36px] md:text-[48px] font-bold text-[#282828] font-['Inter'] tracking-tight whitespace-nowrap">Figtree</h5></div><div className="text-right md:text-left overflow-hidden"><h4 className="text-[22px] sm:text-[6vw] md:text-[80px] lg:text-[100px] font-bold font-['Inter'] text-[#282828] leading-none tracking-tighter uppercase whitespace-nowrap">WISDOME.AI</h4></div></div><div className="flex justify-between items-end md:grid md:grid-cols-[1fr_2fr] gap-4 md:gap-16 lg:gap-24"><div className="flex-shrink-0"><p className="text-[10px] md:text-base font-bold text-gray-500 mb-1 md:mb-2 font-['Inter'] whitespace-nowrap">Chinese typography</p><h5 className="text-base sm:text-[36px] md:text-[48px] font-bold text-[#282828] font-['Noto_Sans_TC'] tracking-tight whitespace-nowrap">Noto Sans TC</h5></div><div className="text-right md:text-left overflow-hidden"><h4 className="text-[14px] sm:text-[4.5vw] md:text-[60px] lg:text-[72px] font-bold font-['Noto_Sans_TC'] text-[#282828] leading-none tracking-tight whitespace-nowrap">聚愢科技股份有限公司</h4></div></div></div><div className="w-full flex flex-row h-[120px] sm:h-[200px] md:h-[400px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden mb-12 md:mb-16">{activeItem.brandColors?.map((color) => (<div key={color.hex} style={{ backgroundColor: color.hex }} className="w-1/2 h-full flex items-end p-4 md:p-12 relative"><span className="text-sm sm:text-xl md:text-[32px] font-bold font-['Inter'] tracking-wider uppercase text-white">{color.hex}</span></div>))}</div><div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"><p className="text-[16px] md:text-[18px] font-normal font-['Inter'] text-gray-900 leading-relaxed md:pr-8">Employing a vibrant blue paired with a solid black as signature colors, representing the integration of technology-driven solutions within a robust and established education system.</p><p className="text-[16px] md:text-[18px] font-normal font-['Noto_Sans_TC'] text-gray-900 leading-relaxed">以明快的藍色及堅實的黑色作為品牌代表色，象徵為穩固的教育體系中增添科技導向的解決方針。</p></div></div></div>
          <div className="w-full mt-24 mb-40"><div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-16 border-b border-gray-100 pb-10"><div className="flex flex-col"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">03</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold tracking-tight text-gray-500 mt-2 font-['Inter']">Web Design</h3></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12"><p className="text-[16px] md:text-[24px] font-normal font-['Inter'] text-gray-500 leading-relaxed font-medium">{activeItem.webDesignDesc}</p><p className="text-[16px] md:text-[24px] font-normal font-['Noto_Sans_TC'] text-gray-800 leading-relaxed font-medium">{activeItem.webDesignDescZh}</p></div></div><div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-10 mt-16 md:mt-24"><h4 className="text-[24px] md:text-[36px] font-bold font-['Inter'] tracking-tight text-gray-900">Hero Page</h4></div><div className="w-full aspect-video bg-[#EAEAEC] relative flex items-center justify-center mb-24 md:mb-32 overflow-hidden"><OptimizedVideo src={activeItem.heroPageVideoUrl} className="w-full h-full relative z-10" /></div><div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24 md:mb-32"><h4 className="text-[24px] md:text-[36px] font-bold font-['Inter'] tracking-tight text-gray-900 mb-10">Service</h4><div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] items-start gap-12 lg:gap-20"><div className="relative flex items-start"><div className="w-4/5 lg:w-[75%] aspect-[16/10] bg-[#F6F6F6] rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-lg relative"><OptimizedVideo src={activeItem.serviceDesktopVideo} className="w-full h-full relative z-10" /></div><div className="absolute top-[15%] right-0 w-[35%] lg:w-[30%] aspect-[9/18] bg-[#EAEAEC] rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white translate-x-[5%] lg:translate-x-0"><OptimizedVideo src={activeItem.serviceMobileVideo} className="w-full h-full relative z-10" /></div></div><div className="flex flex-col gap-6 pt-0 lg:pt-10"><p className="text-gray-900 text-lg md:text-xl font-bold border-l-4 border-orange-500 pl-4 font-['Noto_Sans_TC']">服務介紹介面</p><p className="text-gray-500 text-base md:text-lg leading-relaxed font-['Noto_Sans_TC']">清晰展示 Wisdome.ai 的三大核心能力。透過動態視覺引導與直覺的排版，幫助使用者快速理解 AI 如何介入教務流程，實現自動化與規模化。</p></div></div></div><div className="max-w-[100rem] mx-auto px-6 md:px-12"><h4 className="text-[24px] md:text-[36px] font-bold font-['Inter'] tracking-tight text-gray-900 mb-10">Success Stories</h4><div className="flex flex-col gap-6 mb-16 lg:mb-24"><p className="text-gray-900 text-lg md:text-xl font-bold border-l-4 border-orange-500 pl-4 font-['Noto_Sans_TC']">成功案例呈現</p><p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-3xl font-['Noto_Sans_TC']">將實際客戶的成功故事以清晰、數據化的方式呈現。透過桌機與行動裝置的跨螢幕設計，確保閱讀體驗流暢，並利用長網頁完整展示案例細節與轉換成效。</p></div><div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"><div className="lg:col-span-7 flex flex-col gap-12"><div className="relative flex items-start w-full"><div className="w-[85%] aspect-[16/10] bg-[#F6F6F6] rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-lg relative"><OptimizedVideo src={activeItem.successDesktopVideo} className="w-full h-full relative z-10" /></div><div className="absolute bottom-[-10%] right-0 w-[30%] aspect-[9/18] bg-[#EAEAEC] rounded-[1rem] md:rounded-[1.5rem] overflow-hidden shadow-2xl border-4 border-white"><OptimizedVideo src={activeItem.successMobileVideo} className="w-full h-full relative z-10" /></div></div><div className="mt-8 p-8 md:p-10 bg-gray-50 rounded-[2rem]"><h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 font-['Noto_Sans_TC']">跨裝置的流暢閱讀體驗</h4><p className="text-gray-600 leading-relaxed text-sm md:text-base font-['Noto_Sans_TC']">無論是使用桌機查看詳細的成效數據，或是透過手機快速瀏覽案例重點，響應式排版皆能提供最佳的視覺動線與資訊層次。</p></div></div><div className="lg:col-span-5 w-full"><div className="w-full bg-[#EAEAEC] rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-xl border border-gray-200 relative group"><div className="relative w-full h-[60vh] lg:h-[80vh] overflow-y-auto hide-scrollbar bg-white"><img src={activeItem.successFullpageImg} className="w-full h-auto relative z-10 hover:opacity-95 transition-opacity" alt="" onError={(e) => e.target.style.display = 'none'} /></div><div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20 flex items-end justify-center pb-4 opacity-100 group-hover:opacity-0 transition-opacity duration-500"><span className="text-white text-xs tracking-widest uppercase font-bold drop-shadow-md">Scroll down to view full page</span></div></div></div></div></div></div>
          <FooterCTA />
        </div>
      );
    }

    // ================= BrainBox 專屬客製化版面 (ID: 3) =================
    if (activeItem.id === 3) {
      return (
        <div className="bg-white animate-in fade-in duration-700 min-h-screen pb-32">

          {/* Header (標題與返回按鈕) */}
          <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-[100rem] mx-auto mb-12">
            <BackButton />
            <h1 className="text-4xl md:text-6xl lg:text-[7rem] font-black mb-8 md:mb-12 tracking-wide uppercase leading-tight md:leading-none font-bold text-gray-900">{activeItem.title}</h1>
          </div>

          {/* Hero Video / Cover */}
          <div className="w-full mb-16 md:mb-24 bg-[#F2EFE9] relative flex items-center justify-center overflow-hidden min-h-[30vh] md:min-h-[65vh]">
            <OptimizedVideo src="/projects/brainbox_ui/brainbox-hero.mp4" className="w-full h-auto block relative z-10" />
          </div>

          {/* Intro Section */}
          <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24 md:mb-40 mt-12">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
              <div className="space-y-8">
                <div><p className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Client</p><p className="font-bold text-xl">{activeItem.client}</p></div>
                <div><p className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Year</p><p className="font-bold text-xl">{activeItem.year}</p></div>
                <div><p className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Services</p><p className="font-bold text-xl">{activeItem.tags.join(', ')}</p></div>
              </div>
              <div className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-['Noto_Sans_TC']">
                <p>BrainBox 是一款專為學生與教師打造的智慧教育平台。本次專案不僅重塑了產品的視覺系統，更導入了專屬的品牌吉祥物，透過活潑的動態表情與互動，大幅提升學生的學習動機與軟體親和力。</p>
              </div>
            </div>
          </div>

          {/* ================= 01 產品視覺 (Brand Visuals) ================= */}
          <div className="w-full mb-32 md:mb-48">
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-16 border-b border-gray-100 pb-10">
              <h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">01</h2>
              <h3 className="text-[32px] md:text-[40px] font-bold tracking-tight text-gray-500 mt-2 font-['Inter']">Brand Visuals</h3>
            </div>

            <div className="max-w-[100rem] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div className="bg-[#EAE8F2] rounded-[2rem] p-12 md:p-20 flex items-center justify-center relative min-h-[300px]">
                  <img src="/projects/brainbox_ui/logo-display.svg" className="relative z-10 w-2/3 h-auto" alt="BrainBox Logo" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <div className="flex flex-col gap-12">
                  <div>
                    <h4 className="text-2xl font-bold mb-6 font-['Inter']">Color Palette</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {['#6C5CE7', '#FFB86C', '#00B894', '#2D3436'].map((color) => (
                        <div key={color} className="flex flex-col gap-3">
                          <div className="w-full aspect-square rounded-[1.5rem] shadow-sm" style={{ backgroundColor: color }}></div>
                          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-[2rem] p-8 md:p-10 border border-gray-100">
                    <h4 className="text-2xl font-bold mb-6 font-['Inter']">Typography</h4>
                    <div className="space-y-8">
                      <div><p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Primary / English</p><p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Quicksand</p></div>
                      <div><p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Secondary / Chinese</p><p className="text-3xl md:text-4xl font-bold text-gray-900 font-['Noto_Sans_TC']">源柔黑體</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= 02 品牌吉祥物設計 (Mascot Design) ================= */}
          <div className="w-full bg-[#FAFAFA] py-24 md:py-40 mb-32 md:mb-48">
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-16 border-b border-gray-200 pb-10">
              <h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">02</h2>
              <h3 className="text-[32px] md:text-[40px] font-bold tracking-tight text-gray-500 mt-2 font-['Inter']">Mascot Design</h3>
            </div>
            <div className="max-w-[100rem] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center mb-24 md:mb-32">
                <div className="order-2 lg:order-1">
                  <h4 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 font-['Noto_Sans_TC']">溫暖且充滿智慧的學習夥伴</h4>
                  <p className="text-lg text-gray-600 leading-relaxed font-['Noto_Sans_TC'] mb-6">為了降低學生面對測驗與學習的焦慮感，我們設計了專屬的品牌吉祥物。以幾何圓潤的線條為基礎，象徵系統的包容性與靈活性。</p>
                  <p className="text-lg text-gray-600 leading-relaxed font-['Noto_Sans_TC']">在各種學習情境中，吉祥物會給予適時的反饋與鼓勵，讓數位學習過程充滿人性化的溫度。</p>
                </div>
                <div className="order-1 lg:order-2 w-full aspect-square md:aspect-[4/3] bg-white rounded-[2rem] shadow-xl relative flex items-center justify-center overflow-hidden border border-gray-100">
                  <OptimizedVideo src="/projects/brainbox_ui/mascot-intro.mp4" className="w-full h-full relative z-10" />
                </div>
              </div>
              <div className="mb-24 md:mb-32">
                <h4 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900 font-['Noto_Sans_TC'] border-l-4 border-orange-500 pl-4">動態展示：六種表情</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className="bg-white rounded-[1.5rem] md:rounded-[2rem] aspect-square flex items-center justify-center overflow-hidden relative shadow-sm hover:shadow-xl transition-shadow duration-500">
                      <OptimizedVideo src={`/projects/brainbox_ui/mascot-exp-${num}.mp4`} className="w-full h-full relative z-10" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900 font-['Noto_Sans_TC'] border-l-4 border-orange-500 pl-4">軟體內出場景</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="w-full aspect-[4/3] bg-[#EAEAEC] rounded-[2rem] relative overflow-hidden flex items-center justify-center">
                    <OptimizedVideo src="/projects/brainbox_ui/mascot-scene-1.mp4" className="w-full h-full relative z-10" />
                  </div>
                  <div className="w-full aspect-[4/3] bg-[#EAEAEC] rounded-[2rem] relative overflow-hidden flex items-center justify-center lg:translate-y-12">
                    <OptimizedVideo src="/projects/brainbox_ui/mascot-scene-2.mp4" className="w-full h-full relative z-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= 03 產品視覺設計 (Product Visuals) ================= */}
          <div className="w-full mb-20 md:mb-40">
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-16 border-b border-gray-100 pb-10">
              <h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">03</h2>
              <h3 className="text-[32px] md:text-[40px] font-bold tracking-tight text-gray-500 mt-2 font-['Inter']">Product Visuals</h3>
            </div>
            <div className="max-w-[100rem] mx-auto px-6 md:px-12">
              <div className="mb-24 md:mb-32">
                <h4 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900 font-['Noto_Sans_TC'] border-l-4 border-orange-500 pl-4">情境插圖設計</h4>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                  <div className="md:col-span-8 aspect-[16/10] bg-gray-100 rounded-[2rem] overflow-hidden relative flex items-center justify-center">
                    <img src="/projects/brainbox_ui/illu-1.jpg" className="w-full h-full object-cover relative z-10" alt="" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                  <div className="md:col-span-4 aspect-square md:aspect-auto bg-gray-100 rounded-[2rem] overflow-hidden relative flex items-center justify-center">
                    <img src="/projects/brainbox_ui/illu-2.jpg" className="w-full h-full object-cover relative z-10" alt="" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900 font-['Noto_Sans_TC'] border-l-4 border-orange-500 pl-4">系統圖示設計</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((num) => (
                    <div key={num} className="bg-white border border-gray-100 rounded-2xl aspect-square flex flex-col items-center justify-center relative group hover:border-orange-500 hover:shadow-lg transition-all duration-300">
                      <div className="w-1/2 h-1/2 relative z-10 opacity-70 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-300">
                        <OptimizedVideo src={`/projects/brainbox_ui/icon-${num}.mp4`} className="w-full h-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <FooterCTA />
        </div>
      );
    }

    // ================= 預設的其他專案版面 (Fallback) =================
    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 bg-white">
        <div className="pt-40 pb-12 px-6 max-w-[100rem] mx-auto">
          <BackButton />
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
        <FooterCTA />
      </div>
    );
  };

  const AboutView = () => (
    <div className="animate-in fade-in duration-700 bg-white">
      <div className="pt-40 pb-16 px-6 max-w-[100rem] mx-auto md:px-8"><h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter mb-16 leading-none max-w-6xl mx-auto">Tiffany<br />Liang.</h1><div className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20 items-start mb-32 max-w-6xl mx-auto"><div className="aspect-[3/4] bg-[#F8F9FA] rounded-[2rem] overflow-hidden flex items-center justify-center text-gray-400 w-full max-w-md mx-auto md:mx-0 shadow-sm relative">梁庭禎 的照片</div><div className="pt-4"><h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-snug text-gray-900">將品牌理念與抽象概念，<br />轉化為具備影響力與情感共鳴的視覺敘事。</h2><div className="space-y-6 text-xl text-gray-600 leading-relaxed mb-16"><p>我擁有超過2年的動態圖像與視覺設計經驗。自小培養的美學素養，使我能精確掌握節奏與動態細節，進而獨立負責品牌從概念發想、腳本分鏡到完整動態執行的視覺設計解決方案。</p><p>曾為科技公司成功建構完整的品牌形象動畫、產品形象及介紹動畫、介面轉場動態等。我致力於透過動態設計，解構複雜的概念並創造出生動的視覺呈現。</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-gray-100"><div><h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Motion & Animation</h3><div className="flex flex-wrap gap-2">{['動態圖像設計', '動畫解說影片', '影音剪輯', '腳本撰寫'].map(skill => (<span key={skill} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium text-gray-800">{skill}</span>))}</div></div><div><h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Visual Design</h3><div className="flex flex-wrap gap-2">{['平面設計', '品牌設計', '介面設計', '美術設計'].map(skill => (<span key={skill} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium text-gray-800">{skill}</span>))}</div></div></div></div></div><div className="mb-32 max-w-5xl mx-auto"><h2 className="text-5xl font-bold tracking-tighter mb-20 px-2 md:px-0">Work Experience</h2><div><TimelineItem year="2023.10 - Present" title="Wisdome.Al 聚偲科技股份有限公司" subtitle="視覺效果設計師"><ul className="list-disc pl-5 space-y-4"><li><strong className="text-gray-900">企業識別設計：</strong>設計企業標誌、名片及簡報模板，並整合品牌理念製作識別系統手冊。製作公司官網首頁形象動畫。</li><li><strong className="text-gray-900">產品介面設計：</strong>建構產品品牌識別規範與手冊。設計16個動態圖樣與70個靜態圖標，提升辨識度；繪製插圖與頭像；優化功能介面。</li><li><strong className="text-gray-900">廣告行銷動畫：</strong>獨立完成2部產品形象動畫。結合 AI 語音製作清晰流暢的軟體操作教學影片。</li></ul></TimelineItem></div></div></div>
      <FooterCTA />
    </div>
  );

  const ContactView = () => (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 animate-in fade-in duration-700 pt-32 bg-white text-center"><div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-10 transform -rotate-12"><IconMail className="w-8 h-8" /></div><h1 className="text-6xl md:text-[6rem] font-bold tracking-tighter mb-6">Say Hello.</h1><p className="text-xl text-gray-500 mb-12 max-w-lg mx-auto">正在尋找設計師合作嗎？或是想交流交流？<br />期待與你聯繫。</p><a href="mailto:tingchenliang1998@gmail.com" className="text-2xl md:text-4xl font-bold border-b-2 border-black pb-2 hover:text-gray-500 hover:border-gray-500 transition-colors mb-20">tingchenliang1998@gmail.com</a><div className="flex gap-8 text-lg font-medium"><a href="#" className="flex items-center gap-2 hover:text-gray-500 transition-colors"><IconInstagram className="w-5 h-5" /> Instagram</a><a href="#" className="flex items-center gap-2 hover:text-gray-500 transition-colors"><IconLinkedin className="w-5 h-5" /> LinkedIn</a><a href="#" className="flex items-center gap-2 hover:text-gray-500 transition-colors"><IconGlobe className="w-5 h-5" /> Dribbble</a></div></div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'home': return <HomeView />;
      case 'works': return <WorksView />;
      case 'category': return <CategoryListView />;
      case 'project': return <ProjectView />;
      case 'about': return <AboutView />;
      case 'contact': return <ContactView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] text-slate-900 font-sans selection:bg-orange-200 selection:text-orange-900">
      <Navbar />
      <main>{renderContent()}</main>
    </div>
  );
}