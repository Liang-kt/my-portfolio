import React, { useState, useEffect, useRef } from 'react';

// --- 內嵌 SVG 圖示組件 (完全封裝) ---
const IconArrowLeft = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>;
const IconArrowUpRight = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>;
const IconArrowUp = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>;
const IconMail = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const IconInstagram = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
const IconLinkedin = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>;
const IconGlobe = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" /></svg>;
const IconPlus = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="M12 5v14" /></svg>;
const IconMenu = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>;
const IconSearch = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
const IconX = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;
const IconChevronLeft = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6" /></svg>;
const IconChevronRight = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6" /></svg>;
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
    title: 'Wisdome.ai 企業官網設計',
    thumb: 'bg-[#0f172a]',
    coverMedia: { type: 'image', url: '/projects/wisdome.ai_web/cover.jpg' },
    heroMedia: { type: 'video', url: '/projects/wisdome.ai_web/cover-video.mp4' },
    tags: ['UI/UX', 'Web Design'],
    client: 'WISDOME.AI',
    year: '2023 - 2024',
    projectOverview: {
      clientLogoUrl: '/projects/wisdome.ai_web/wisdomeai_logo.svg',
      backgroundAndGoals: 'Wisdome.ai 是一家致力於使用ai 技術打造全方位線上教育平台的新創公司，以AI、機器學習以及教育為公司核心概念。在這支形象動畫中利用俐落的線條元素搭配快節奏的動態串接，完整Wisdome.ai 創新及科技導向的企業風格。',
      challenge: 'Wisdome.ai is a startup focused on creating a comprehensive online education platform using AI, machine learning, and education as its core. This promotional video uses sleek lines and fast-paced animation to showcase Wisdome.ai’s innovative and tech-driven identity.',
      myRole: 'UI/UX Designer & Motion Designer',
      service: 'VIS Design, Web Design, Corporate Identity Animation'
    },
    strategyAndArchitecture: {
      description: '',
      iaImage: '/projects/wisdome.ai_web/ia-map.png'
    },
    brandIdentity: {
      motionVideoUrl: '/projects/wisdome.ai_web/wisdome.ai_motion-brading.mp4',
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
          imageUrl: '/projects/wisdome.ai_web/graph-logo.png'
        },
        {
          type: 'Logotype',
          title: '[ 標準字設計理念 ]',
          description: '此處可以說明文字 Logo 的筆畫細節、字型選擇原因與微調...',
          imageUrl: '/projects/wisdome.ai_web/logotype.png'
        }
      ],
      colors: [
        { hex: '#282828', name: 'Primary Dark' },
        { hex: '#00D2E2', name: 'Accent Cyan' }
      ]
    },
    design: {
      designSystemDesc: '網站採用乾淨、現代的美學設計，強調可用性與無障礙體驗。我們專注於打造直覺的使用者旅程，透過清晰的資訊架構，精準傳達 AI 教育平台的核心價值與功能。',
      componentsImages: ['/projects/wisdome.ai_web/components-1.jpg', '/projects/wisdome.ai_web/components-2.jpg'],
      webShowcaseStrip: [
        { type: 'video', url: '/projects/wisdome.ai_web/hero page.mov', title: 'Hero Page', desc: '首頁主視覺區塊，以動態影片與品牌標語傳遞 AI 教育平台的創新形象與科技感。', mobile: { type: 'video', url: '/projects/wisdome.ai_web/mobile-hero.mov' } },
        { type: 'video', url: '/projects/wisdome.ai_web/service.mov', title: 'Service', desc: '服務介紹區塊，透過清晰的圖文排版逐一呈現平台核心功能與解決方案。', mobile: { type: 'video', url: '/projects/wisdome.ai_web/mobile-service.mov' } },
        { type: 'video', url: '/projects/wisdome.ai_web/why-wisdome.mov', title: 'Why Wisdome', desc: '品牌差異化區塊，說明選擇 Wisdome.ai 的關鍵優勢與競爭力。', mobile: { type: 'video', url: '/projects/wisdome.ai_web/mobile-why-wisdome.mov' } },
        { type: 'image', url: '/projects/wisdome.ai_web/success-stories.png', title: 'Success Stories', desc: '成功案例區塊，以數據與客戶回饋建立信任感，強化轉換說服力。', mobile: { type: 'image', url: '/projects/wisdome.ai_web/mobile-sucsess-stories.jpg' } },
        { type: 'video', url: '/projects/wisdome.ai_web/cta-area.mov', title: 'CTA Area', desc: '行動呼籲區塊，引導訪客進行下一步操作，如免費試用或聯繫諮詢。', mobile: { type: 'video', url: '/projects/wisdome.ai_web/mobile-cta-area.mov' } },
        { type: 'image', url: '/projects/wisdome.ai_web/about-us.png', title: 'About Us', desc: '關於我們區塊，介紹團隊背景與企業願景，拉近與用戶的距離。', mobile: { type: 'image', url: '/projects/wisdome.ai_web/mobile-last-part.jpg' } },
        { type: 'image', url: '/projects/wisdome.ai_web/contact-us.png', title: 'Contact Us', desc: '聯絡資訊區塊，提供多元聯繫管道，降低用戶溝通門檻。' },
        { type: 'image', url: '/projects/wisdome.ai_web/footer.png', title: 'Footer', desc: '頁尾區塊，統整網站導航、社群連結與版權資訊。' }
      ]
    }
  },
  {
    id: 2,
    categoryId: 'uiux',
    platform: 'app',
    title: 'Ms. Lin 學測刷題app',
    thumb: 'bg-[#F2EFE9]',
    coverMedia: { type: 'image', url: '' },
    heroMedia: { type: 'image', url: '/projects/msline/hero.jpg' },
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
      images: ['/projects/msline/research-1.jpg', '/projects/msline/research-2.jpg']
    },
    strategyAndArchitecture: {
      description: '將 App 核心分為三大模塊：每日任務、題庫測驗、學習報表。簡化註冊流程，讓使用者下載後能最快進入第一場測驗。',
      iaImage: '/projects/msline/ia-map.jpg'
    },
    /* brandIdentity: {
      logoImage: '/projects/msline/logo.png',
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
        { name: 'Modals & Dialogs', previewImg: '', specsImg: '', colSpan: 2 },
        { name: 'Subject Cards', previewImg: '', specsImg: '', colSpan: 1, liveComponent: 'subject' }
      ],
      componentsImages: ['/projects/msline/components-1.jpg'],
      flowImages: ['/projects/msline/user-flow.jpg'],
      screenGroups: [
        { title: 'Onboarding ＋ 首頁', screens: ['/projects/msline/onboarding-1.jpg', '/projects/msline/onboarding-2.jpg', '/projects/msline/onboarding-3.jpg', '/projects/msline/onboarding-4.jpg', '/projects/msline/onboarding-5.jpg'] },
        { title: '題庫', screens: ['/projects/msline/bank-1.jpg', '/projects/msline/bank-2.jpg', '/projects/msline/bank-3.jpg', '/projects/msline/bank-4.jpg', '/projects/msline/bank-5.jpg'] },
        { title: '我的', screens: ['/projects/msline/profile-1.jpg', '/projects/msline/profile-2.jpg', '/projects/msline/profile-3.jpg', '/projects/msline/profile-4.jpg', '/projects/msline/profile-5.jpg'] },
        {
          title: '各科練習頁面',
          tabs: [
            { title: '數學練習', screens: ['/projects/msline/math-1.jpg', '/projects/msline/math-2.jpg', '/projects/msline/math-3.jpg', '/projects/msline/math-4.jpg', '/projects/msline/math-5.jpg'] },
            { title: '國文練習', screens: ['/projects/msline/chinese-1.jpg', '/projects/msline/chinese-2.jpg', '/projects/msline/chinese-3.jpg', '/projects/msline/chinese-4.jpg', '/projects/msline/chinese-5.jpg'] },
            { title: '英文練習', screens: ['/projects/msline/english-1.jpg', '/projects/msline/english-2.jpg', '/projects/msline/english-3.jpg', '/projects/msline/english-4.jpg', '/projects/msline/english-5.jpg'] }
          ]
        }
      ],
      prototypeUrl: '/projects/msline/prototype.mp4',
      usabilityTesting: '在第一版 Prototype 完成後，邀請 5 位高中生進行易用性測試，根據回饋優化了「結束測驗」的防呆提示設計。'
    },
    mascotDesign: {
      description: '設計了象徵智慧與陪伴的貓頭鷹吉祥物「Line 醬」，在使用者答對連續題目時給予動態鼓勵，增加學習趣味。',
      images: ['/projects/msline/mascot-1.mp4', '/projects/msline/mascot-2.mp4']
    }
  },
  {
    id: 3,
    categoryId: 'uiux',
    platform: 'web', // 可以設定為 'web' 或 'app'
    title: 'BrainBox UI Visual Design',
    thumb: 'bg-[#EAE8F2]',
    coverMedia: { type: 'image', url: '/projects/brainbox_ui/cover.jpg' },
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
  { id: 4, categoryId: 'motion', title: 'BrainBox 智慧刷題系統：賦能學生，解放教師。', thumb: 'bg-black', coverMedia: { type: 'video', url: '' }, tags: ['Motion', 'Explainer'], description: '透過生動的 2D 動畫，清楚傳達 BrainBox 產品的核心價值與功能優勢。', client: 'BrainBox', year: '2024', gallery: [] },
  { id: 5, categoryId: 'motion', title: 'Look the Sound of Taipei Metro', thumb: 'bg-[#1a1a1a]', coverMedia: { type: 'video', url: '' }, tags: ['Motion', 'Data Visual'], description: '將臺北捷運的聲音地景進行視覺化，轉化為具備節奏感與幾何美學的動態圖像創作。', client: '國立臺灣藝術大學', year: '2023', gallery: [] },
  { id: 6, categoryId: 'motion', title: 'How to Use BrainBox: A Step-by-Step Tutorial', thumb: 'bg-[#EAE8F2]', coverMedia: { type: 'video', url: '' }, tags: ['Motion', 'Tutorial'], description: 'BrainBox 教學影片，一步步引導使用者了解系統操作。', client: 'BrainBox', year: '2024', gallery: [] },
  { id: 7, categoryId: 'motion', title: 'Wisdome.ai 公司官網首頁形象動畫', thumb: 'bg-[#0f172a]', coverMedia: { type: 'video', url: '' }, tags: ['Motion', 'Web Animation'], description: '結合品牌理念製作的首頁形象動畫，以動態視覺強化品牌科技感。', client: 'WISDOME.AI', year: '2024', gallery: [] },
  { id: 8, categoryId: 'brand', title: '果然癮品牌識別設計', thumb: 'bg-[#EAF2ED]', coverMedia: { type: 'image', url: '' }, tags: ['Branding', 'Packaging'], description: '完成品牌識別系統設計，並延伸設計 3 組產品外盒及 8 款內包裝，提升視覺吸引力。', client: '果然癮', year: '2021', gallery: [] },
  { id: 9, categoryId: 'brand', title: 'MindGap 企業識別系統', thumb: 'bg-[#F2EFE9]', coverMedia: { type: 'image', url: '' }, tags: ['Branding', 'Corporate Identity'], description: '從零建立企業品牌視覺系統，涵蓋標誌設計與色彩規範。', client: 'MindGap', year: '2024', gallery: [] },
  { id: 10, categoryId: 'brand', title: 'BrainBox 產品識別設計', thumb: 'bg-[#EAE8F2]', coverMedia: { type: 'image', url: '' }, tags: ['Branding', 'Product Identity'], description: '打造專屬的產品識別系統，提升產品在市場上的辨識度與專業感。', client: 'BrainBox', year: '2024', gallery: [] },
  { id: 11, categoryId: 'brand', title: 'Wisdome.ai 企業識別系統', thumb: 'bg-[#0f172a]', coverMedia: { type: 'image', url: '' }, tags: ['Branding', 'Corporate Identity'], description: '整合品牌理念與科技感，打造完整的企業視覺規範系統。', client: 'WISDOME.AI', year: '2023', gallery: [] }
];

// ========================= 核心架構：主應用程式 =========================

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
    const handleScroll = () => { const threshold = currentPage === 'home' ? window.innerHeight * 2.4 : 50; setScrolled(window.scrollY > threshold); };
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
            <button onClick={() => navigateTo('home')} className={`px-3 py-1.5 rounded-full transition-all ${currentPage === 'home' ? 'bg-black text-white' : 'text-gray-600 hover:text-black hover:bg-gray-100'}`}>{I18N[lang].nav.home}</button>
            <button onClick={() => navigateTo('works')} className={`px-3 py-1.5 rounded-full transition-all ${['works', 'category', 'project'].includes(currentPage) ? 'bg-black text-white' : 'text-gray-600 hover:text-black hover:bg-gray-100'}`}>{I18N[lang].nav.works}</button>
            <button onClick={() => navigateTo('about')} className={`px-3 py-1.5 rounded-full transition-all ${currentPage === 'about' ? 'bg-black text-white' : 'text-gray-600 hover:text-black hover:bg-gray-100'}`}>{I18N[lang].nav.about}</button>
            <button onClick={() => navigateTo('contact')} className={`px-3 py-1.5 rounded-full transition-all ${currentPage === 'contact' ? 'bg-black text-white' : 'text-gray-600 hover:text-black hover:bg-gray-100'}`}>{I18N[lang].nav.contact}</button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className="pointer-events-auto px-3 py-1 rounded-full text-xs font-bold border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all">
              {lang === 'zh' ? 'EN' : '繁中'}
            </button>
            <button className="md:hidden text-gray-800 p-1" onClick={() => setIsMobileMenuOpen(true)}><IconMenu className="w-6 h-6" /></button>
          </div>
        </nav>
      </div>
      <div className={`fixed inset-0 bg-white z-[60] transform transition-transform duration-500 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
        <div className="flex justify-between items-center p-6"><div className="text-2xl font-bold tracking-wide">T<span className="text-orange-500">.</span></div><button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-800"><IconX className="w-6 h-6" /></button></div>
        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-3xl font-black uppercase tracking-widest">
          <button onClick={() => navigateTo('home')} className={`${currentPage === 'home' ? 'text-orange-500' : 'text-gray-900'}`}>{I18N[lang].nav.home}</button>
          <button onClick={() => navigateTo('works')} className={`${['works', 'category', 'project'].includes(currentPage) ? 'text-orange-500' : 'text-gray-900'}`}>{I18N[lang].nav.works}</button>
          <button onClick={() => navigateTo('about')} className={`${currentPage === 'about' ? 'text-orange-500' : 'text-gray-900'}`}>{I18N[lang].nav.about}</button>
          <button onClick={() => navigateTo('contact')} className={`${currentPage === 'contact' ? 'text-orange-500' : 'text-gray-900'}`}>{I18N[lang].nav.contact}</button>
        </div>
        <div className="p-8 pb-12 text-center text-sm text-gray-400 font-bold tracking-widest">tingchenliang1998@gmail.com</div>
      </div>
    </>
  );

  const FooterCTA = () => (
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

  const HomeView = () => {
    const [scrollY, setScrollY] = useState(0);
    const [vh, setVh] = useState(800);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      setVh(window.innerHeight); setIsMobile(window.innerWidth < 768);
      const handleScroll = () => { window.requestAnimationFrame(() => { setScrollY(window.scrollY); }); };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => { window.removeEventListener('scroll', handleScroll); };
    }, []);

    const rawProgress = scrollY / (vh * 1.5); const progress = Math.min(Math.max(rawProgress, 0), 1);
    const easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const textTranslateX = easeProgress * -120;

    const filteredProjects = PROJECTS.filter(p => {
      if (homeSelectedFilter === 'UI/UX Design') return p.categoryId === 'uiux';
      if (homeSelectedFilter === '2D Motion Graphic Design') return p.categoryId === 'motion';
      if (homeSelectedFilter === 'Branding Design') return p.categoryId === 'brand';
      return true;
    });

    return (
      <div className="animate-in fade-in duration-700 bg-[#F6F6F6]">
        <div className="h-[250vh] w-full relative">
          <section className="sticky top-0 h-[100svh] w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 overflow-hidden bg-[#F6F6F6] z-0">
            <div className="w-full md:w-[75%] pt-40 md:pt-0 z-30 pointer-events-none will-change-transform" style={{ transform: `translateX(${textTranslateX}vw)` }}>
              <h2 className="text-xl md:text-2xl text-orange-600 mb-6 font-medium flex items-center gap-2"><span className="text-4xl leading-none -mt-2">*</span> We are digital design</h2>
              <h1 className="text-[12vw] md:text-[6.5rem] lg:text-[8.5rem] xl:text-[9.5rem] leading-[0.8] font-black tracking-tighter text-[#252525] mb-8 whitespace-nowrap">TIFFANY LIANG</h1>
              <p className="text-lg md:text-xl text-gray-500 max-w-md leading-relaxed font-medium mt-8 whitespace-normal">
                {lang === 'en' ? 'Beautiful design has the power to captivate audiences. Translating brand philosophies and abstract concepts into visual narratives.' : 'Beautiful design has the power to captivate audiences. 轉化品牌理念與抽象概念為視覺敘事。'}
              </p>
            </div>
            <div className="absolute bottom-0 right-0 z-20 flex items-center justify-center bg-[#EAEAEC] shadow-2xl overflow-hidden will-change-[width,height,border-radius]" style={{ width: isMobile ? '100%' : `${50 + (50 * easeProgress)}%`, height: isMobile ? `${40 + (60 * easeProgress)}vh` : '100%', borderTopLeftRadius: `${isMobile ? 3 * (1 - easeProgress) : 6 * (1 - easeProgress)}rem`, borderTopRightRadius: isMobile ? `${3 * (1 - easeProgress)}rem` : '0', }}>
              <video src="/hero-page_showreel.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover absolute inset-0" />
            </div>
          </section>
        </div>
        <div id="featured-works" className="relative z-30 bg-white rounded-t-[3rem] md:rounded-t-[4rem] w-full mt-[-2rem] md:mt-[-4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.08)]">
          <div className="py-24 md:py-32 px-6 md:px-12 max-w-[100rem] mx-auto bg-white rounded-t-[3rem] md:rounded-t-[4rem]">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">{I18N[lang].home.selectedWorks}</h2>
                <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed font-['Noto_Sans_TC']">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {filteredProjects.map(p => (
                <div key={p.id} onClick={() => navigateTo('project', p)} className="group cursor-pointer">
                  <div className={`aspect-square md:aspect-[4/3] rounded-[1.5rem] md:rounded-[2.5rem] ${p.thumb} overflow-hidden relative transition-all duration-500 shadow-sm hover:shadow-xl`}>
                    <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out">
                      {p.coverMedia?.type === 'video' ? <OptimizedVideo src={p.coverMedia.url} className="w-full h-full" /> : p.coverMedia?.url ? <img src={p.coverMedia.url} className="w-full h-full object-cover" alt={p.title} /> : null}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-2/3 md:h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="hidden md:flex bg-white text-black px-6 py-3 rounded-full font-bold items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform tracking-wider uppercase">View Project <IconArrowUpRight className="w-4 h-4 ml-1" /></div>
                    </div>
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col items-start transform group-hover:translate-y-0 md:group-hover:translate-y-[-4px] transition-transform duration-500 z-10 pointer-events-none pr-6">
                      <h3 className="text-white text-2xl md:text-4xl font-bold tracking-tight mb-4 drop-shadow-md leading-tight">{t(p.title, lang)}</h3>
                      <div className="flex flex-wrap gap-2">{p.tags.map(tag => (<span key={tag} className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-sm font-bold tracking-wide uppercase">{tag}</span>))}</div>
                    </div>
                  </div>
                </div>
              ))}
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
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4"><h2 className="text-white text-4xl sm:text-5xl md:text-[6rem] lg:text-[7rem] font-black tracking-wider uppercase text-center leading-[1.1] md:leading-none group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-[1.5s] ease-out drop-shadow-2xl">{t(cat.title, lang)}</h2><div className="hidden md:flex items-center gap-2 text-white font-bold tracking-widest uppercase mt-6 md:mt-10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 drop-shadow-lg">Explore Projects <IconArrowUpRight className="w-6 h-6 ml-2" /></div></div>
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

  // --- 可水平捲動的 Screens 元件 ---
  const ScrollableScreenRow = ({ screens, groupTitle }) => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
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
        <div ref={scrollRef} onScroll={checkScroll} className="w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory flex gap-4 md:gap-6 pb-6 pt-2 scroll-smooth">
          {screens && screens.map((screen, i) => (
            <div key={`${groupTitle}-${i}`} className="flex-none w-[70%] sm:w-[45%] md:w-[23%] bg-[#F6F6F6] rounded-[2rem] aspect-[9/16] overflow-hidden flex items-center justify-center shadow-sm snap-start animate-in fade-in zoom-in-95 duration-500">
              <img src={screen} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={`${groupTitle} Screen ${i + 1}`} onError={(e) => e.target.style.display = 'none'} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProjectView = () => {
    if (!activeItem) return null;

    // --- 封裝重複的返回按鈕元件 (直接回到首頁的精選作品區塊) ---
    const BackButton = () => {
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
          className="flex items-center text-sm font-medium text-gray-400 hover:text-black mb-12 transition-colors"
        >
          <IconArrowLeft className="w-4 h-4 mr-2" />
          <span className="uppercase">{I18N[lang].project.backTo} HOME</span>
        </button>
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

    // --- Product Visual Design 通用版型元件 ---
    const GenericVisualProjectView = () => {
      let sectionIndex = 1;
      const getSectionNum = () => String(sectionIndex++).padStart(2, '0');
      const hasMascot = activeItem.mascotDesign && activeItem.mascotDesign.description;

      return (
        <div className="bg-white animate-in fade-in duration-700 min-h-screen pb-32">
          <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-[100rem] mx-auto mb-12">
            <BackButton />
            <h1 className="text-4xl md:text-6xl lg:text-[7rem] font-black mb-8 md:mb-12 tracking-wide uppercase leading-tight md:leading-none font-bold text-gray-900">{t(activeItem.title, lang)}</h1>
          </div>

          {/* Hero Section */}
          {activeItem.heroMedia && (
            <div className="w-full mb-16 md:mb-24 bg-[#F6F6F6] relative flex items-center justify-center overflow-hidden">
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
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24 md:mb-40 mt-12">
              <div className="flex flex-col mb-12 border-b border-gray-100 pb-10"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">{I18N[lang].project.overview}</h3></div>
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
                <div className="space-y-12 text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-['Noto_Sans_TC'] whitespace-pre-line">
                  {activeItem.projectOverview.backgroundAndGoals && (
                    <div><h4 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-l-4 border-orange-500 pl-4">{I18N[lang].project.background}</h4><p>{t(activeItem.projectOverview.backgroundAndGoals, lang)}</p></div>
                  )}
                  {activeItem.projectOverview.challenge && (
                    <div><h4 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-l-4 border-orange-500 pl-4">{I18N[lang].project.challenge}</h4><p>{t(activeItem.projectOverview.challenge, lang)}</p></div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 02 Brand Identity */}
          {activeItem.brandIdentity && (
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24 md:mb-40 mt-12">
              <div className="flex flex-col mb-12 border-b border-gray-100 pb-10"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">{I18N[lang].project.brand}</h3></div>
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
                    <div><h4 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-l-4 border-orange-500 pl-4">{I18N[lang].project.typography}</h4><div className="bg-[#FAFAFA] rounded-2xl p-8 border border-gray-100"><div className="text-[80px] font-bold leading-none mb-6 text-gray-900 font-['Inter']">Aa</div><p className="text-xl text-gray-600 font-medium whitespace-pre-line">{t(activeItem.brandIdentity.typography, lang)}</p></div></div>
                  )}
                  {activeItem.brandIdentity.colors && activeItem.brandIdentity.colors.length > 0 && (
                    <div><h4 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-l-4 border-orange-500 pl-4">{I18N[lang].project.colors}</h4><div className="flex flex-wrap gap-4">{activeItem.brandIdentity.colors.map(color => (<div key={color} className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-inner border border-gray-200" style={{ backgroundColor: color }}></div>))}</div></div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 03 Mascot Design */}
          {hasMascot && (
            <div className="w-full mb-24 md:mb-40 bg-[#FAFAFA] py-24 md:py-32">
              <div className="max-w-[100rem] mx-auto px-6 md:px-12">
                <div className="flex flex-col mb-16 border-b border-gray-200 pb-10"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">{I18N[lang].project.mascot}</h3></div>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-['Noto_Sans_TC'] max-w-4xl mb-12">{t(activeItem.mascotDesign.description, lang)}</p>
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
              <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-16 border-b border-gray-100 pb-10">
                <h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2>
                <h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">Icon System</h3>
              </div>
              <div className="max-w-[100rem] mx-auto px-6 md:px-12">
                {activeItem.visuals.iconSystem.description && (
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-['Noto_Sans_TC'] max-w-4xl mb-12">{t(activeItem.visuals.iconSystem.description, lang)}</p>
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
              <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-16 border-b border-gray-200 pb-10">
                <h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2>
                <h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">Illustration & Animation</h3>
              </div>
              <div className="max-w-[100rem] mx-auto px-6 md:px-12">
                {activeItem.visuals.illustrationAnimation.description && (
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-['Noto_Sans_TC'] max-w-4xl mb-12">{t(activeItem.visuals.illustrationAnimation.description, lang)}</p>
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
              <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-16 border-b border-gray-100 pb-10">
                <h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2>
                <h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">Application</h3>
              </div>
              <div className="max-w-[100rem] mx-auto px-6 md:px-12">
                {activeItem.visuals.application.description && (
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-['Noto_Sans_TC'] max-w-4xl mb-12">{t(activeItem.visuals.application.description, lang)}</p>
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

          <FooterCTA />
        </div>
      );
    };
    // --- 長圖捲動標註元件 ---
    const AnnotationItem = ({ annotation, lang }) => {
      const [ref, isVisible] = useOnScreen({ threshold: 0.1, rootMargin: '0px 0px -20% 0px' });
      const { top, left, align, title, desc } = annotation;

      return (
        <div
          ref={ref}
          className="absolute z-20 flex items-center"
          style={{ top, left, transform: 'translate(-50%, -50%)' }}
        >
          {/* 圓點 */}
          <div className="relative">
            <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
            <div className={`absolute inset-0 rounded-full bg-orange-500/30 animate-ping ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>

          {/* 線段與文字框容器 */}
          <div className={`absolute top-1/2 flex items-center ${align === 'right' ? 'left-full flex-row' : 'right-full flex-row-reverse'} -translate-y-1/2`}>
            {/* 線段 */}
            <div className={`h-[1px] bg-orange-500 transition-all duration-700 ease-out ${isVisible ? 'w-12 md:w-32' : 'w-0'}`}></div>

            {/* 文字框 */}
            <div className={`bg-white/95 backdrop-blur-md border border-gray-100 p-4 md:p-5 shadow-2xl rounded-xl w-48 md:w-64 transition-all duration-700 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${align === 'right' ? 'ml-3 md:ml-4' : 'mr-3 md:mr-4'}`}>
              <h4 className="text-sm md:text-base font-bold text-gray-900 mb-1 md:mb-2">{title}</h4>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed break-words whitespace-pre-wrap">{desc}</p>
            </div>
          </div>
        </div>
      );
    };

    // --- 自訂下拉選單元件 ---
    const CustomSelect = ({ label, value, options, onChange, openUp = false }) => {
      const [open, setOpen] = useState(false);
      const ref = useRef(null);

      useEffect(() => {
        const handleClickOutside = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

      return (
        <div ref={ref} className="relative w-full">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">{label.toUpperCase()}</span>
          <button 
            onClick={() => setOpen(!open)}
            className="w-full h-11 px-4 flex items-center justify-between bg-white border border-[#E6E6E6] rounded-2xl text-xs font-bold text-[#0B132B] shadow-sm cursor-pointer outline-none transition-all hover:border-gray-300"
          >
            <span className="truncate">{value}</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div className={`absolute left-0 right-0 w-full bg-white border border-[#0B132B] rounded-2xl shadow-xl z-40 p-2 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-150 ${openUp ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
              {options.map((opt) => {
                const isSelected = value === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => { onChange(opt); setOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${isSelected ? 'bg-[#0B132B] text-white' : 'text-[#0B132B] bg-transparent hover:bg-gray-50'}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    };


    // --- GSAT App Button 互動展示元件 ---
    const GSATButtonShowcase = () => {
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
            <div className="w-full bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner p-1.5 flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0">Size</span>
              <div className="flex bg-gray-100 rounded-lg p-0.5 flex-wrap sm:flex-nowrap justify-end gap-0.5 flex-shrink-0">
                {['L', 'M', 'S', 'Ex S'].map((sz) => {
                  const isCurrent = btnSize === sz;
                  return (
                    <button 
                      key={sz}
                      onClick={() => setBtnSize(sz)} 
                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
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
            <div className="w-full bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner p-1.5 flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0">Style</span>
              <div className="flex bg-gray-100 rounded-lg p-0.5 flex-wrap sm:flex-nowrap justify-end gap-0.5 flex-shrink-0">
                {['Primary', 'Outline', 'Ghost'].map((st) => {
                  const isCurrent = btnStyle === st;
                  return (
                    <button 
                      key={st}
                      onClick={() => setBtnStyle(st)} 
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
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
            <div className="w-full bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner p-1.5 flex items-center justify-between gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0">State</span>
              <div className="flex bg-gray-100 rounded-lg p-0.5 flex-wrap sm:flex-nowrap justify-end gap-0.5 flex-shrink-0">
                {['Default', 'Active', 'Disable'].map((stat) => {
                  const isCurrent = btnStatus === stat;
                  return (
                    <button 
                      key={stat}
                      onClick={() => setBtnStatus(stat)} 
                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
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

    // --- GSAT App Navigation Bar 互動展示元件 ---
    const GSATNavigationShowcase = () => {
      const [activeTab, setActiveTab] = useState('Home'); // Home | Book | Wrong | Saved | Profile

      const tabs = [
        { 
          id: 'Home', 
          zhLabel: '首頁', 
          enLabel: 'Home',
          icon: (isActive) => (
            <svg className={`w-5.5 h-5.5 transition-all duration-200 ${isActive ? 'text-[#7878FF] scale-110' : 'text-[#A4A4A4] group-hover:text-[#5E5E5E]'}`} fill="none" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.3333 107.375V50.875L65 22.625L102.667 50.875V107.375H74.4166V74.4167H55.5833V107.375H27.3333Z" fill="currentColor"/>
            </svg>
          )
        },
        { 
          id: 'Book', 
          zhLabel: '題庫', 
          enLabel: 'Book',
          icon: (isActive) => (
            <svg className={`w-5.5 h-5.5 transition-all duration-200 ${isActive ? 'text-[#7878FF] scale-110' : 'text-[#A4A4A4] group-hover:text-[#5E5E5E]'}`} fill="none" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
              <path d="M99.3999 22H39.2001C32.1051 22 26.3001 27.805 26.3001 34.9V95.0998C26.3001 102.195 32.1051 108 39.2001 108H103.7V99.3998H39.2001C36.8351 99.3998 34.9001 97.4648 34.9001 95.0998C34.9001 92.7348 36.8351 90.7998 39.2001 90.7998H99.3999C101.765 90.7998 103.7 88.8648 103.7 86.4998V26.3C103.7 23.935 101.765 22 99.3999 22ZM86.5 47.7999H47.8001V39.2H86.5V47.7999Z" fill="currentColor"/>
            </svg>
          )
        },
        { 
          id: 'Profile', 
          zhLabel: '我的', 
          enLabel: 'Profile',
          icon: (isActive) => (
            <svg className={`w-5.5 h-5.5 transition-all duration-200 ${isActive ? 'text-[#7878FF] scale-110' : 'text-[#A4A4A4] group-hover:text-[#5E5E5E]'}`} fill="none" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
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
                          ? 'text-[#7878FF] scale-105' 
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
          <div className="w-full mt-auto bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner p-2 flex items-center justify-between gap-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0">Tab</span>
            <div className="flex bg-gray-100 rounded-lg p-0.5 flex-wrap sm:flex-nowrap justify-end gap-0.5 flex-shrink-0">
              {tabs.map((tab) => {
                const isCurrent = activeTab === tab.id;
                return (
                  <button 
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                    }} 
                    className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
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

    // --- GSAT App Dropdown & Menu 互動展示元件 ---
    const GSATDropdownShowcase = () => {
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
                            : 'text-black bg-transparent hover:bg-white/60 hover:text-[#7878FF]'
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
          <div className="w-full mt-auto bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner p-2 flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0">State</span>
            <div className="flex bg-gray-100 rounded-lg p-0.5 flex-shrink-0">
              <button 
                onClick={() => { setDropdownState('Interactive'); }} 
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${dropdownState === 'Interactive' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              >
                {lang === 'zh' ? '預設' : 'Active'}
              </button>
              <button 
                onClick={() => { setDropdownState('Disabled'); setIsOpen(false); }} 
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${dropdownState === 'Disabled' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              >
                {lang === 'zh' ? '禁用' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>
      );
    };

    // --- GSAT App Input 互動展示元件 ---
    const GSATInputShowcase = () => {
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
                            ? 'text-[#7878FF]'
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
                          ? 'bg-white border-2 border-[#7878FF] text-[#7878FF] placeholder-[#7878FF] shadow-sm'
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
          <div className="w-full mt-auto bg-white/70 rounded-2xl border border-gray-100/50 shadow-inner p-2 flex items-center justify-between gap-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex-shrink-0">State</span>
            <div className="flex bg-gray-100 rounded-lg p-0.5 flex-wrap sm:flex-nowrap justify-end gap-0.5 flex-shrink-0">
              {['Default', 'Focus', 'Disable', 'Erro'].map((st) => {
                const isCurrent = inputState === st;
                return (
                  <button 
                    key={st}
                    onClick={() => {
                      setInputState(st);
                    }} 
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
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

    const GSATSubjectCardsShowcase = () => {
      const [activeSubId, setActiveSubId] = useState('mathA');
      const [isSubmitted, setIsSubmitted] = useState(false);

      // Define standard subjects
      const subjects = [
        { id: 'mathA', zhName: '數學 A', enName: 'Math A', illustration: '/projects/mslin-app/illustrations/math-a.svg' },
        { id: 'mathB', zhName: '數學 B', enName: 'Math B', illustration: '/projects/mslin-app/illustrations/math-b.svg' },
        { id: 'english', zhName: '英文', enName: 'English', illustration: '/projects/mslin-app/illustrations/english.svg' },
        { id: 'chinese', zhName: '國文', enName: 'Chinese', illustration: '/projects/mslin-app/illustrations/chinese.svg' }
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
                  <button className="w-full py-2 text-[12px] font-bold rounded-xl bg-transparent text-[#7878FF] hover:bg-[#EEEEFF]/40 transition-all transform active:scale-95 cursor-pointer text-center">
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
                      src="/projects/mslin-app/illustrations/add.svg" 
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
          <div className="w-full mt-auto bg-gray-100/90 rounded-2xl p-1 flex justify-between items-center gap-0.5 select-none border border-gray-200/40">
            {subjects.map((sub) => {
              const isActive = activeSubId === sub.id;
              const name = lang === 'zh' ? sub.zhName : sub.enName;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubId(sub.id)}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap text-center ${
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
              className={`py-1.5 px-3 text-[11px] font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap text-center ${
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

    // --- Progress Bar & Step Indicator 互動展示元件 ---
    const GSATProgressShowcase = () => {
      const [currentState, setCurrentState] = useState(2); // 預設第二狀態 (0-5 中的 2)

      const progressPercents = [0, 20, 30, 70, 100, 100];
      const activePercent = progressPercents[currentState];

      return (
        <div className="flex-1 flex flex-col justify-between gap-6 relative select-none">
          {/* 上半部：精緻毛玻璃展示區域，無文字單純顯示圖表 */}
          <div className="flex-1 flex flex-col justify-center py-8 px-8 bg-white/40 rounded-3xl border border-gray-100/50 shadow-inner relative z-20 min-h-[310px] overflow-hidden gap-12">
            
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
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2px] bg-gray-100 rounded-full z-0">
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
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300 transform active:scale-95 border cursor-pointer ${
                        isActive
                          ? 'bg-white border-2 border-[#7878FF] text-[#7878FF] shadow-[0_0_16px_rgba(120,120,255,0.2)]'
                          : isCompleted
                            ? 'bg-[#7878FF] border-none text-white shadow-sm'
                            : 'bg-white border-2 border-gray-100 text-gray-300 hover:border-gray-200'
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
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
          <div className="w-full mt-auto bg-gray-100/90 rounded-2xl p-1 flex justify-between items-center gap-0.5 border border-gray-200/40 select-none">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2.5 flex-shrink-0">
              {lang === 'zh' ? '進度切換' : 'Select Stage'}
            </span>
            <div className="flex bg-gray-200/20 rounded-xl p-0.5 justify-end gap-0.5 flex-1 max-w-[200px]">
              {[0, 1, 2, 3, 4, 5].map((num) => {
                const isActive = currentState === num;
                return (
                  <button
                    key={num}
                    onClick={() => setCurrentState(num)}
                    className={`flex-1 py-1 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer text-center ${
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

    // --- 網站設計長條展示：桌面版＋手機版置中交疊，左右交錯標註 ---
    const WebShowcaseStrip = ({ items }) => {
      if (!items || items.length === 0) return null;
      const mobileItems = items.filter(item => item.mobile).map(item => item.mobile);

      // 靠左對齊標題橘色圖標：桌面 60% + 手機 20%，重疊 50px
      const desktopLeft = '0';
      const desktopWidth = '60%';
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

    // --- 長條展示：單一桌面媒體項目 + 右側標註 ---
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
                <p className="text-[11px] lg:text-xs text-gray-500 leading-relaxed font-['Noto_Sans_TC']" style={{ lineHeight: 1.6 }}>{item.desc}</p>
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

    // --- 長條展示：影片項目 ---
    const WebShowcaseVideo = ({ src }) => {
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
              className="w-full h-auto block"
              style={{ display: hasError ? 'none' : 'block', verticalAlign: 'top' }}
            />
          )}
        </div>
      );
    };

    // --- 長條展示：圖片項目 ---
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


    // --- UI/UX 通用版型元件 ---
    const GenericUIUXProjectView = () => {
      const isApp = activeItem.platform === 'app';
      const hasMascot = activeItem.mascotDesign && activeItem.mascotDesign.description;
      let sectionIndex = 1;
      const getSectionNum = () => String(sectionIndex++).padStart(2, '0');
      const [selectedComponent, setSelectedComponent] = useState(null);
      const [activeScreenTabs, setActiveScreenTabs] = useState({});

      return (
        <div className="bg-white animate-in fade-in duration-700 min-h-screen pb-32">
          <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-[100rem] mx-auto mb-12">
            <BackButton />
            <h1 className="text-4xl md:text-6xl lg:text-[7rem] font-black mb-8 md:mb-12 tracking-wide uppercase leading-tight md:leading-none font-bold text-gray-900">{t(activeItem.title, lang)}</h1>
          </div>

          {/* Hero Section */}
          {activeItem.heroMedia && (
            <div className="w-full mb-16 md:mb-24 bg-[#F6F6F6] relative flex items-center justify-center overflow-hidden">
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
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24 md:mb-40 mt-12">
              <div className="flex flex-col mb-12 border-b border-gray-100 pb-10"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">{I18N[lang].project.overview}</h3></div>
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
                <div className="space-y-12 text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-['Noto_Sans_TC'] whitespace-pre-line">
                  {activeItem.projectOverview.backgroundAndGoals && (
                    <div><h4 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-l-4 border-orange-500 pl-4">{I18N[lang].project.background}</h4><p>{t(activeItem.projectOverview.backgroundAndGoals, lang)}</p></div>
                  )}
                  {activeItem.projectOverview.challenge && (
                    <div><h4 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-l-4 border-orange-500 pl-4">{I18N[lang].project.challenge}</h4><p>{t(activeItem.projectOverview.challenge, lang)}</p></div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 02 Research */}
          {activeItem.research && (
            <div className="w-full mb-24 md:mb-40 bg-[#FAFAFA] py-24 md:py-32">
              <div className="max-w-[100rem] mx-auto px-6 md:px-12">
                <div className="flex flex-col mb-16 border-b border-gray-200 pb-10"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">{I18N[lang].project.research}</h3></div>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-['Noto_Sans_TC'] max-w-4xl mb-12">{t(activeItem.research.description, lang)}</p>
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
            <div className="w-full mb-24 md:mb-40 mt-12">
              <div className="max-w-[100rem] mx-auto px-6 md:px-12">
                <div className="flex flex-col mb-12 border-b border-gray-100 pb-10"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">{I18N[lang].project.strategy}</h3></div>
                {activeItem.strategyAndArchitecture.description && (
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-['Noto_Sans_TC'] max-w-4xl mb-12">{t(activeItem.strategyAndArchitecture.description, lang)}</p>
                )}
              </div>
              {activeItem.strategyAndArchitecture.iaImage && (
                <HorizontalMapScroll url={activeItem.strategyAndArchitecture.iaImage} />
              )}
            </div>
          )}

          {/* 04 Brand Identity */}
          {activeItem.brandIdentity && (
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24 md:mb-40 mt-12">
              <div className="flex flex-col mb-12 border-b border-gray-100 pb-10"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">{I18N[lang].project.brand}</h3></div>

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
                              <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-['Noto_Sans_TC'] leading-tight">{logo.title}</h4>
                              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium font-['Noto_Sans_TC'] max-w-lg">{logo.description}</p>
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
                            <p className="text-3xl md:text-4xl font-bold text-[#282828] font-['Noto_Sans_TC']">{activeItem.brandIdentity.typography.tc.name}</p>
                          </div>
                        )}
                      </div>
                      {/* Right Column: Previews */}
                      <div className="w-full md:w-2/3 flex flex-col gap-10 justify-center overflow-hidden">
                        {activeItem.brandIdentity.typography?.en && (
                          <p className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[7.5rem] font-bold text-[#282828] uppercase tracking-wide leading-none truncate md:overflow-visible">{activeItem.brandIdentity.typography.en.preview}</p>
                        )}
                        {activeItem.brandIdentity.typography?.tc && (
                          <p className="text-4xl sm:text-6xl md:text-[4rem] lg:text-[5rem] font-bold text-[#282828] tracking-tight leading-tight font-['Noto_Sans_TC']">{activeItem.brandIdentity.typography.tc.preview}</p>
                        )}
                      </div>
                    </div>

                    {/* Colors Section */}
                    <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
                      {/* Left Column: Description */}
                      <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium font-['Noto_Sans_TC']">
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
                        <h4 className="text-2xl font-bold mb-6 font-['Inter'] tracking-tight">{I18N[lang].project.colorPalette}</h4>
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
                        <h4 className="text-2xl font-bold mb-6 font-['Inter'] tracking-tight">{I18N[lang].project.typography}</h4>
                        <div className="space-y-8">
                          <div><p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{I18N[lang].project.primaryType}</p><p className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">{activeItem.brandIdentity.typography.primary}</p></div>
                          {activeItem.brandIdentity.typography.secondary && (<div><p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{I18N[lang].project.secondaryType}</p><p className="text-2xl md:text-4xl font-bold text-gray-900 font-['Noto_Sans_TC']">{activeItem.brandIdentity.typography.secondary}</p></div>)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 05 Design */}
          {activeItem.design && (
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24 md:mb-40 mt-12">
              <div className="flex flex-col mb-12 border-b border-gray-100 pb-10"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">{isApp ? I18N[lang].project.uiDesign : I18N[lang].project.webDesign}</h3></div>
              <div className="space-y-20">
                {activeItem.design.designSystemDesc && (
                  <div className="mb-12"><p className="text-lg md:text-xl text-gray-600 leading-relaxed font-['Noto_Sans_TC'] max-w-4xl">{t(activeItem.design.designSystemDesc, lang)}</p></div>
                )}

                {isApp && (activeItem.design.architectureImg || (activeItem.design.bentoComponents && activeItem.design.bentoComponents.length > 0) || (activeItem.design.componentsImages && activeItem.design.componentsImages.length > 0)) && (
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-l-4 border-orange-500 pl-4">{I18N[lang].project.designSystem}</h4>

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
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
                        {(() => {
                          const comps = activeItem.design.bentoComponents;
                          const hasInputAndNav = comps.some(c => c.liveComponent === 'input') && comps.some(c => c.liveComponent === 'navigation');

                          if (!hasInputAndNav) {
                            return comps.map((comp, idx) => (
                              <div
                                key={idx}
                                className={`relative bg-[#FAFAFA] rounded-[2rem] p-6 shadow-sm border border-gray-100 min-h-[200px] flex flex-col transition-all ${comp.liveComponent ? '' : 'overflow-hidden'} ${comp.colSpan === 2 ? 'col-span-2' : 'col-span-1 md:col-span-1'}`}
                              >
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">{comp.name}</span>

                                {/* Live Component Preview */}
                                {comp.liveComponent === 'navigation' ? (
                                  <GSATNavigationShowcase />
                                ) : comp.liveComponent === 'button' ? (
                                  <GSATButtonShowcase />
                                ) : comp.liveComponent === 'dropdown' ? (
                                  <GSATDropdownShowcase />
                                ) : comp.liveComponent === 'input' ? (
                                  <GSATInputShowcase />
                                ) : comp.liveComponent === 'subject' ? (
                                  <GSATSubjectCardsShowcase />
                                ) : comp.liveComponent === 'progress' ? (
                                  <GSATProgressShowcase />
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
                                  <span className="text-xs font-bold font-['Noto_Sans_TC'] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ease-in-out overflow-hidden whitespace-nowrap ml-2">
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
                          const modalsComp = comps.find(c => c.name === 'Modals & Dialogs');
                          const subjectComp = comps.find(c => c.name === 'Subject Cards' || c.liveComponent === 'subject');

                          const renderCard = (comp, customClassName = '') => {
                            if (!comp) return null;
                            const isLive = !!comp.liveComponent;
                            return (
                              <div
                                key={comp.name}
                                className={`relative bg-[#FAFAFA] rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col transition-all ${isLive ? '' : 'overflow-hidden'} ${customClassName}`}
                              >
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">{comp.name}</span>

                                {/* Live Component Preview */}
                                {comp.liveComponent === 'navigation' ? (
                                  <GSATNavigationShowcase />
                                ) : comp.liveComponent === 'button' ? (
                                  <GSATButtonShowcase />
                                ) : comp.liveComponent === 'dropdown' ? (
                                  <GSATDropdownShowcase />
                                ) : comp.liveComponent === 'input' ? (
                                  <GSATInputShowcase />
                                ) : comp.liveComponent === 'subject' ? (
                                  <GSATSubjectCardsShowcase />
                                ) : comp.liveComponent === 'progress' ? (
                                  <GSATProgressShowcase />
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
                                  <span className="text-xs font-bold font-['Noto_Sans_TC'] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ease-in-out overflow-hidden whitespace-nowrap ml-2">
                                    {lang === 'zh' ? '查看元件資訊' : 'View Component Info'}
                                  </span>
                                </button>
                              </div>
                            );
                          };

                          return (
                            <>
                              {/* 1. Buttons (col-span-1) */}
                              {renderCard(buttonComp, 'col-span-1 md:col-span-1 min-h-[200px]')}

                              {/* 2. Vertical Stack (Inputs & Forms + Navigation Bar) (col-span-1) */}
                              <div className="col-span-1 md:col-span-1 flex flex-col gap-4 md:gap-6 h-full">
                                {renderCard(inputComp, 'flex-1')}
                                {renderCard(navComp, 'flex-1')}
                              </div>

                              {/* 3. Dropdowns & Menus (col-span-1) */}
                              {renderCard(dropdownComp, 'col-span-1 md:col-span-1 min-h-[200px]')}

                              {/* 4. Subject Cards (col-span-1) */}
                              {renderCard(subjectComp, 'col-span-1 md:col-span-1 min-h-[200px]')}

                              {/* 5. Cards & Containers (col-span-2) */}
                              {renderCard(cardsComp, 'col-span-2 md:col-span-2 min-h-[200px]')}

                              {/* 6. Modals & Dialogs (col-span-2) */}
                              {renderCard(modalsComp, 'col-span-2 md:col-span-2 min-h-[200px]')}
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

                {((activeItem.design.screens && activeItem.design.screens.length > 0) || (activeItem.design.screenGroups && activeItem.design.screenGroups.length > 0) || (activeItem.design.flowImages && activeItem.design.flowImages.length > 0) || activeItem.design.longScreenshot || activeItem.design.webShowcaseStrip) && (
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 border-l-4 border-orange-500 pl-4">{I18N[lang].project.screens}</h4>

                    {/* 網站設計長條展示（影片＋圖片無縫拼接） */}
                    {activeItem.design.webShowcaseStrip && (
                      <WebShowcaseStrip items={activeItem.design.webShowcaseStrip} />
                    )}

                    {/* 長圖與標註區域 (如果有設定) */}
                    {activeItem.design.longScreenshot && (
                      <ScrollAnnotationView data={activeItem.design.longScreenshot} lang={lang} />
                    )}

                    {/* User Flow (Moved above screens) */}
                    {activeItem.design.flowImages && activeItem.design.flowImages.length > 0 && (
                      <div className="mb-16">
                        <h5 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 font-['Noto_Sans_TC'] border-b border-gray-100 pb-2 inline-block">{I18N[lang].project.userFlow}</h5>
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
                                <h5 className="text-xl md:text-2xl font-bold text-gray-900 font-['Noto_Sans_TC'] border-b border-gray-100 pb-2 inline-block">{group.title}</h5>
                                {hasTabs && (
                                  <div className="bg-[#F5F5F5] p-1.5 rounded-[1.5rem] md:rounded-full flex flex-wrap gap-2 shadow-inner self-start md:self-end">
                                    {group.tabs.map((tab, tIdx) => (
                                      <button
                                        key={tIdx}
                                        onClick={() => setActiveScreenTabs(prev => ({ ...prev, [gIdx]: tIdx }))}
                                        className={`whitespace-nowrap px-4 md:px-6 py-2.5 rounded-full text-sm md:text-base font-medium font-['Noto_Sans_TC'] transition-all duration-300 ${activeTabIdx === tIdx ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
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
                          <div key={i} className="bg-[#F6F6F6] rounded-[2rem] aspect-[9/16] overflow-hidden flex items-center justify-center shadow-sm">
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
                    <h4 className="text-[24px] md:text-[36px] font-bold font-['Inter'] tracking-tight text-gray-900 mb-10">{t(showcase.title, lang)}</h4>
                    {showcase.description && (
                      <div className="flex flex-col gap-6 mb-12">
                        <p className="text-gray-900 text-lg md:text-xl font-bold border-l-4 border-orange-500 pl-4 font-['Noto_Sans_TC']">{t(showcase.title, lang)} {lang === 'en' ? 'Showcase' : '呈現'}</p>
                        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-3xl font-['Noto_Sans_TC'] whitespace-pre-line">{t(showcase.description, lang)}</p>
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
                    <h4 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 border-l-4 border-orange-500 pl-4">{I18N[lang].project.prototype}</h4>
                    <div className="w-full aspect-[4/3] md:aspect-video bg-[#EAEAEC] rounded-[2rem] overflow-hidden flex justify-center relative shadow-inner">
                      <OptimizedVideo src={activeItem.design.prototypeUrl} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
                {activeItem.design.usabilityTesting && (
                  <div><h4 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-l-4 border-orange-500 pl-4">{I18N[lang].project.usability}</h4><p className="text-xl text-gray-600 leading-relaxed font-['Noto_Sans_TC'] max-w-4xl whitespace-pre-line">{t(activeItem.design.usabilityTesting, lang)}</p></div>
                )}
              </div>
            </div>
          )}

          {/* 06 Mascot Design */}
          {hasMascot && (
            <div className="w-full mb-24 md:mb-40 bg-[#FAFAFA] py-24 md:py-32">
              <div className="max-w-[100rem] mx-auto px-6 md:px-12">
                <div className="flex flex-col mb-16 border-b border-gray-200 pb-10"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">{I18N[lang].project.mascot}</h3></div>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium font-['Noto_Sans_TC'] max-w-4xl mb-12">{t(activeItem.mascotDesign.description, lang)}</p>
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
                  <h3 className="text-2xl font-bold font-['Inter'] text-gray-900">
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




    // ================= 預設的 Product Visual Design 通用版型 =================
    if (activeItem.visuals) {
      return (
        <>
          <GenericVisualProjectView />
          <BackToTopButton />
        </>
      );
    }

    // ================= 預設的 UI/UX 通用版型 =================
    if (activeItem.categoryId === 'uiux') {
      return (
        <>
          <GenericUIUXProjectView />
          <BackToTopButton />
        </>
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
        <BackToTopButton />
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
      <div className={`fixed inset-0 bg-white z-[100] pointer-events-none transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
}