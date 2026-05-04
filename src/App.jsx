import React, { useState, useEffect, useRef } from 'react';

// --- 內嵌 SVG 圖示組件 (完全封裝) ---
const IconArrowLeft = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>;
const IconArrowUpRight = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>;
const IconArrowUp = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>;
const IconMail = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const IconInstagram = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
const IconLinkedin = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>;
const IconGlobe = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" /></svg>;
const IconPlus = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="M12 5v14" /></svg>;
const IconMenu = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>;
const IconSearch = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const IconX = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;
const IconChevronLeft = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>;
const IconChevronRight = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>;
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
      typography: { primary: 'Figtree', secondary: 'Noto Sans TC' },
      colors: [
        { hex: '#282828', name: 'Primary Dark' },
        { hex: '#00D2E2', name: 'Accent Cyan' }
      ]
    },
    design: {
      designSystemDesc: '網站採用乾淨、現代的美學設計，強調可用性與無障礙體驗。我們專注於打造直覺的使用者旅程，透過清晰的資訊架構，精準傳達 AI 教育平台的核心價值與功能。',
      componentsImages: ['/projects/wisdome.ai_web/components-1.jpg', '/projects/wisdome.ai_web/components-2.jpg'],
      flowImages: ['/projects/wisdome.ai_web/user-flow.jpg'],
      screens: ['/projects/wisdome.ai_web/screen-1.jpg', '/projects/wisdome.ai_web/screen-2.jpg'],
      showcases: [
        {
          title: 'Hero Page',
          description: '',
          heroVideo: '/projects/wisdome.ai_web/hero-page.mp4'
        },
        {
          title: 'Service',
          description: '清晰展示 Wisdome.ai 的三大核心能力。透過動態視覺引導與直覺的排版，幫助使用者快速理解 AI 如何介入教務流程，實現自動化與規模化。',
          desktopVideo: '/projects/wisdome.ai_web/service-desktop.mp4',
          mobileVideo: '/projects/wisdome.ai_web/service-mobile.mp4'
        },
        {
          title: 'Success Stories',
          description: '將實際客戶的成功故事以清晰、數據化的方式呈現。透過桌機與行動裝置的跨螢幕設計，確保閱讀體驗流暢，並利用長網頁完整展示案例細節與轉換成效。',
          desktopVideo: '/projects/wisdome.ai_web/success-desktop.mp4',
          mobileVideo: '/projects/wisdome.ai_web/success-mobile.mp4',
          fullpageImg: '/projects/wisdome.ai_web/success-fullpage.jpg'
        }
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
        { name: 'Buttons', previewImg: '', specsImg: '', colSpan: 1 },
        { name: 'Inputs & Forms', previewImg: '', specsImg: '', colSpan: 1 },
        { name: 'Cards & Containers', previewImg: '', specsImg: '', colSpan: 2 },
        { name: 'Modals & Dialogs', previewImg: '', specsImg: '', colSpan: 2 },
        { name: 'Dropdowns & Menus', previewImg: '', specsImg: '', colSpan: 1 },
        { name: 'Tags & Badges', previewImg: '', specsImg: '', colSpan: 1 }
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
              <div className="bg-[#F5F5F5] p-1.5 rounded-full flex overflow-x-auto hide-scrollbar gap-1 shadow-inner max-w-full">
                {['UI/UX Design', '2D Motion Graphic Design', 'Branding Design'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setHomeSelectedFilter(filter)}
                    className={`whitespace-nowrap flex-shrink-0 px-4 md:px-6 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${homeSelectedFilter === filter ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
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
              <img src={screen} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={`${groupTitle} Screen ${i+1}`} onError={(e) => e.target.style.display = 'none'} />
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
            <div className="w-full mb-16 md:mb-24 bg-[#F6F6F6] relative flex items-center justify-center overflow-hidden min-h-[40vh] md:min-h-[70vh]">
              {activeItem.heroMedia.type === 'video' ?
                <OptimizedVideo src={activeItem.heroMedia.url} className="w-full h-full object-cover relative z-10" /> :
                <img src={activeItem.heroMedia.url} className="w-full h-full object-cover relative z-10" alt={t(activeItem.title, lang)} onError={(e) => e.target.style.display = 'none'} />
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
            <div className="w-full mb-16 md:mb-24 bg-[#F6F6F6] relative flex items-center justify-center overflow-hidden min-h-[40vh] md:min-h-[70vh]">
              {activeItem.heroMedia.type === 'video' ?
                <OptimizedVideo src={activeItem.heroMedia.url} className="w-full h-full object-cover relative z-10" /> :
                <img src={activeItem.heroMedia.url} className="w-full h-full object-cover relative z-10" alt={t(activeItem.title, lang)} onError={(e) => e.target.style.display = 'none'} />
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div className="bg-[#EAE8F2] rounded-[2rem] p-12 md:p-20 flex items-center justify-center min-h-[300px] overflow-hidden">
                  {activeItem.brandIdentity.motionVideoUrl ? (
                    <OptimizedVideo src={activeItem.brandIdentity.motionVideoUrl} className="w-full h-full object-cover rounded-[1rem]" />
                  ) : (
                    <img src={activeItem.brandIdentity.logoImage} className="w-2/3 h-auto" alt="Logo" onError={(e) => e.target.style.display = 'none'} />
                  )}
                </div>
                <div className="flex flex-col gap-12">
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
                    <div className="bg-gray-50 rounded-[2rem] p-8 md:p-10 border border-gray-100">
                      <h4 className="text-2xl font-bold mb-6 font-['Inter'] tracking-tight">{I18N[lang].project.typography}</h4>
                      <div className="space-y-8">
                        <div><p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{I18N[lang].project.primaryType}</p><p className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">{activeItem.brandIdentity.typography.primary}</p></div>
                        {activeItem.brandIdentity.typography.secondary && (<div><p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{I18N[lang].project.secondaryType}</p><p className="text-2xl md:text-4xl font-bold text-gray-900 font-['Noto_Sans_TC']">{activeItem.brandIdentity.typography.secondary}</p></div>)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 05 Design */}
          {activeItem.design && (
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 mb-24 md:mb-40 mt-12">
              <div className="flex flex-col mb-12 border-b border-gray-100 pb-10"><h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-bold font-['Inter'] leading-none text-gray-900 tracking-tighter">{getSectionNum()}</h2><h3 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold font-['Inter'] tracking-tight mt-2 text-gray-500">{isApp ? I18N[lang].project.uiDesign : I18N[lang].project.webDesign}</h3></div>
              <div className="space-y-20">
                {isApp && (activeItem.design.designSystemDesc || activeItem.design.architectureImg || (activeItem.design.bentoComponents && activeItem.design.bentoComponents.length > 0) || (activeItem.design.componentsImages && activeItem.design.componentsImages.length > 0)) && (
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 border-l-4 border-orange-500 pl-4">{I18N[lang].project.designSystem}</h4>
                    {activeItem.design.designSystemDesc && (
                      <p className="text-xl text-gray-600 leading-relaxed font-['Noto_Sans_TC'] max-w-4xl mb-12">{t(activeItem.design.designSystemDesc, lang)}</p>
                    )}

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
                        {activeItem.design.bentoComponents.map((comp, idx) => (
                          <div key={idx} className={`relative group bg-[#FAFAFA] rounded-[2rem] p-6 shadow-sm border border-gray-100 overflow-hidden min-h-[200px] flex items-center justify-center transition-all hover:shadow-md ${comp.colSpan === 2 ? 'col-span-2' : 'col-span-1 md:col-span-1'}`}>
                            <span className="absolute top-4 left-6 text-sm font-bold text-gray-400 uppercase tracking-wider">{comp.name}</span>
                            <img src={comp.previewImg} className="w-4/5 h-auto object-contain mt-4 group-hover:scale-105 transition-transform duration-500" alt={comp.name} onError={(e) => e.target.style.display = 'none'} />
                            
                            {/* Hover Overlay Button */}
                            <button onClick={() => setSelectedComponent(comp)} className="absolute bottom-4 right-4 bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-900 hover:text-white text-gray-900 flex items-center gap-2">
                              <IconSearch className="w-5 h-5" />
                              <span className="text-sm font-bold hidden md:block px-1">View Specs</span>
                            </button>
                          </div>
                        ))}
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

                {((activeItem.design.screens && activeItem.design.screens.length > 0) || (activeItem.design.screenGroups && activeItem.design.screenGroups.length > 0) || (activeItem.design.flowImages && activeItem.design.flowImages.length > 0)) && (
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 border-l-4 border-orange-500 pl-4">{I18N[lang].project.screens}</h4>
                    
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
                                  <div className="bg-[#F5F5F5] p-1.5 rounded-full flex overflow-x-auto hide-scrollbar gap-1 shadow-inner self-start md:self-end max-w-full">
                                    {group.tabs.map((tab, tIdx) => (
                                      <button 
                                        key={tIdx} 
                                        onClick={() => setActiveScreenTabs(prev => ({ ...prev, [gIdx]: tIdx }))}
                                        className={`whitespace-nowrap flex-shrink-0 px-4 md:px-6 py-2.5 rounded-full text-sm md:text-base font-medium font-['Noto_Sans_TC'] transition-all duration-300 ${activeTabIdx === tIdx ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
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

          <FooterCTA />

          {/* Component Detail Modal */}
          {selectedComponent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedComponent(null)}>
              <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100">
                  <h3 className="text-2xl font-bold font-['Inter'] text-gray-900">{selectedComponent.name} Specs</h3>
                  <button onClick={() => setSelectedComponent(null)} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900">
                    <IconX className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 md:p-10 overflow-y-auto bg-[#FAFAFA] flex-1 flex items-center justify-center min-h-[50vh]">
                  {selectedComponent.specsImg ? (
                    <img src={selectedComponent.specsImg} alt={`${selectedComponent.name} Specs`} className="w-full h-auto object-contain max-h-[70vh] rounded-xl shadow-sm border border-gray-200" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <IconSearch className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="font-medium text-lg">Specs details coming soon</p>
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