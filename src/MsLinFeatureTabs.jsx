import React, { useState } from 'react';

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

const SubHeading = ({ children }) => (
  <h4 className="border-l-[3px] border-[#E8734A] pl-3 text-base md:text-lg font-bold text-gray-800 uppercase tracking-wider mb-6 select-none">
    {children}
  </h4>
);

const SinglePhoneSlider = ({ steps, lang, themeColor = '#7F77DD' }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    if (width > 0) {
      const index = Math.round(scrollLeft / width);
      if (index !== activeStep) {
        setActiveStep(index);
      }
    }
  };

  return (
    <div style={{ width: '100%', marginTop: '24px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        
        {/* Horizontal scroll track where the entire PhoneMockup slides */}
        <div 
          onScroll={handleScroll}
          className="hide-scrollbar"
          style={{
            display: 'flex',
            width: '100%',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            padding: '12px 0'
          }}
        >
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              style={{ 
                width: '100%', 
                flexShrink: 0, 
                scrollSnapAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '280px' }}>
                <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                  {step.img ? (
                    <img 
                      src={step.img} 
                      alt={step.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9' }}>
                      <span style={{ fontSize: '28px', fontWeight: 'bold', color: themeColor, opacity: 0.15 }}>
                        {step.num}
                      </span>
                    </div>
                  )}
                </PhoneMockup>
              </div>
            </div>
          ))}
        </div>

        {/* Step Text Label */}
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: themeColor,
          textAlign: 'center',
          lineHeight: '1.4',
          minHeight: '18px'
        }}>
          {steps[activeStep].title}
        </div>

        {/* Premium Dot Indicators */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
          {steps.map((_, idx) => {
            const isActive = activeStep === idx;
            return (
              <div 
                key={idx}
                style={{
                  width: isActive ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: isActive ? themeColor : '#D1D5DB',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};

const MsLinFeatureTabs = ({ lang }) => {
  // Loop One tabs configuration
  const loopOneTabs = [
    { id: '1a', num: 'FEATURE 1A', zhLabel: '刷題 Loop', enLabel: 'Practice Loop' },
    { id: '1b', num: 'FEATURE 1B', zhLabel: '多科互動題型', enLabel: 'Interactive Questions' },
    { id: '1c', num: 'FEATURE 1C', zhLabel: '錯題庫與收藏庫', enLabel: 'Incorrect & Saved' }
  ];



  // Outer tabs state ('1a', '1b', '1c')
  const [activeOuter, setActiveOuter] = useState('1b');
  const [displayOuter, setDisplayOuter] = useState('1b');
  const [isOuterTransitioning, setIsOuterTransitioning] = useState(false);

  // Inner tabs state ('math', 'chinese', 'english')
  const [activeInner, setActiveInner] = useState('math');
  const [displayInner, setDisplayInner] = useState('math');
  const [isInnerTransitioning, setIsInnerTransitioning] = useState(false);

  // Grids visibility
  const [chineseGridOpen, setChineseGridOpen] = useState(false);
  const [englishGridOpen, setEnglishGridOpen] = useState(false);

  // Active question type inside expandable grids
  const [activeChineseType, setActiveChineseType] = useState(0);
  const [activeEnglishType, setActiveEnglishType] = useState(0);

  const mathSteps = [
    { img: '/projects/mslin-app/screens/math10.png', title: lang === 'zh' ? '步驟 1：拆解題目與公式' : 'Step 1: Deconstruct Formula' },
    { img: '/projects/mslin-app/screens/math11.png', title: lang === 'zh' ? '步驟 2：填寫中間運算' : 'Step 2: Intermediate Steps' },
    { img: '/projects/mslin-app/screens/math12.png', title: lang === 'zh' ? '步驟 3：得出最終解答' : 'Step 3: Final Numerical Answer' },
    { img: '/projects/mslin-app/screens/math13.png', title: lang === 'zh' ? '步驟 4：觀看完整解析' : 'Step 4: View Full Explanation' }
  ];

  const chineseSteps = [
    { img: '/projects/mslin-app/screens/chinese3.png', title: lang === 'zh' ? '字音字形配對 — 左右連線' : 'Pronunciation & Character Pairing - Connect' },
    { img: '/projects/mslin-app/screens/chinese18.png', title: lang === 'zh' ? '文言文逐句翻譯 — 填空' : 'Classical Chinese - Blank Fills' },
    { num: '3', title: lang === 'zh' ? '成語配對填空 — 點選填入' : 'Idiom Pairing - Tap to Fill' },
    { num: '4', title: lang === 'zh' ? '錯字辨識 — 點選句中錯字' : 'Typo Spotting - Tap Typos' }
  ];

  const englishSteps = [
    { img: '/projects/mslin-app/screens/english-sentence2.png', title: lang === 'zh' ? '文法造句重組 — 點擊排列' : 'Sentence Reordering - Tap to Rebuild' },
    { img: '/projects/mslin-app/screens/english-close2.png', title: lang === 'zh' ? '文意選填 — 空格嵌入段落' : 'Cloze - Slot Words in Paragraphs' },
    { num: '3', title: lang === 'zh' ? '單字選擇題 — 詞彙辨義' : 'Vocabulary MCQs - Meaning' },
    { num: '4', title: lang === 'zh' ? '拼字題 — 鍵盤輸入' : 'Spelling - Keyboard Input' }
  ];



  // Outer tab switch helper
  const handleOuterSwitch = (target) => {
    if (target === activeOuter) return;
    setActiveOuter(target);
    setIsOuterTransitioning(true);
    setTimeout(() => {
      setDisplayOuter(target);
      setIsOuterTransitioning(false);
    }, 100);
  };

  // Inner sub-tab switch helper
  const handleInnerSwitch = (target) => {
    if (target === activeInner) return;
    setActiveInner(target);
    setIsInnerTransitioning(true);
    setTimeout(() => {
      setDisplayInner(target);
      setIsInnerTransitioning(false);
    }, 100);
  };



  const chineseTypes = [
    {
      id: 'pairing',
      title: lang === 'zh' ? '字音字形配對' : 'Phonetic Pairing',
      train: lang === 'zh' ? '注音辨識' : 'Phonetic Recognition',
      interact: lang === 'zh' ? '左右連線操作' : 'Match Left & Right',
      screens: [
        '/projects/mslin-app/screens/chinese3.png',
        '/projects/mslin-app/screens/chinese4.png',
        '/projects/mslin-app/screens/chinese1.png'
      ]
    },
    {
      id: 'typo',
      title: lang === 'zh' ? '錯字辨識' : 'Typo Spotting',
      train: lang === 'zh' ? '用字精準度' : 'Character Precision',
      interact: lang === 'zh' ? '點選句中錯字' : 'Tap Typos in Sentences',
      screens: [
        '/projects/mslin-app/screens/chinese5.png',
        '/projects/mslin-app/screens/chinese6.png',
        '/projects/mslin-app/screens/chinese2.png'
      ]
    },
    {
      id: 'idiom',
      title: lang === 'zh' ? '成語配對填空' : 'Idiom Pairing Fill',
      train: lang === 'zh' ? '成語理解' : 'Idiom Understanding',
      interact: lang === 'zh' ? '點選成語填入空格' : 'Tap Idioms for Blanks',
      screens: [
        '/projects/mslin-app/screens/chinese7.png',
        '/projects/mslin-app/screens/chinese8.png',
        '/projects/mslin-app/screens/chinese9.png'
      ]
    },
    {
      id: 'translation',
      title: lang === 'zh' ? '文言文逐句翻譯' : 'Classical Chinese translation',
      train: lang === 'zh' ? '文言文語感' : 'Classical Context Sense',
      interact: lang === 'zh' ? '關鍵詞填空' : 'Keyword Blank Fills',
      screens: [
        '/projects/mslin-app/screens/chinese18.png',
        '/projects/mslin-app/screens/chinese19.png',
        '/projects/mslin-app/screens/chinese10.png'
      ]
    },
    {
      id: 'reading',
      title: lang === 'zh' ? '閱讀測驗' : 'Reading Comprehension',
      train: lang === 'zh' ? '文章理解推論' : 'Article Comprehension & Inference',
      interact: lang === 'zh' ? '選擇題' : 'Interaction: Multiple-Choice',
      screens: [
        '/projects/mslin-app/screens/chinese11.png',
        '/projects/mslin-app/screens/chinese12.png',
        '/projects/mslin-app/screens/chinese13.png'
      ]
    }
  ];

  const englishTypes = [
    {
      id: 'mcq',
      title: lang === 'zh' ? '單字選擇題' : 'Vocabulary MCQs',
      train: lang === 'zh' ? '詞彙辨義' : 'Vocabulary Differentiation',
      interact: lang === 'zh' ? '4 選 1' : '4-Option MCQ',
      screens: [
        '/projects/mslin-app/screens/english1.png',
        '/projects/mslin-app/screens/english2.png',
        '/projects/mslin-app/screens/english3.png'
      ]
    },
    {
      id: 'spelling',
      title: lang === 'zh' ? '拼字題' : 'Spelling',
      train: lang === 'zh' ? '字母拼寫記憶' : 'Letter Spelling Memory',
      interact: lang === 'zh' ? '鍵盤輸入' : 'Keyboard Input',
      screens: [
        '/projects/mslin-app/screens/english3.png',
        '/projects/mslin-app/screens/english4.png',
        '/projects/mslin-app/screens/english5.png'
      ]
    },
    {
      id: 'reorder',
      title: lang === 'zh' ? '文法造句重組' : 'Sentence Rebuilding',
      train: lang === 'zh' ? '句型結構' : 'Sentence Structure',
      interact: lang === 'zh' ? '字詞點擊排列' : 'Tap Words to Arrange',
      screens: [
        '/projects/mslin-app/screens/english-sentence1.png',
        '/projects/mslin-app/screens/english-sentence2.png',
        '/projects/mslin-app/screens/english6.png'
      ]
    },
    {
      id: 'wordform',
      title: lang === 'zh' ? '詞性變化填空' : 'Word Form Blank Fill',
      train: lang === 'zh' ? '字彙應用' : 'Vocabulary Application',
      interact: lang === 'zh' ? '手動輸入詞形' : 'Manual Form Input',
      screens: [
        '/projects/mslin-app/screens/english5.png',
        '/projects/mslin-app/screens/english6.png',
        '/projects/mslin-app/screens/english1.png'
      ]
    },
    {
      id: 'cloze',
      title: lang === 'zh' ? '文意選填' : 'Cloze',
      train: lang === 'zh' ? '篇章理解' : 'Passage Comprehension',
      interact: lang === 'zh' ? '點空格選詞填入' : 'Tap Blanks to Choose Words',
      screens: [
        '/projects/mslin-app/screens/english-close1.png',
        '/projects/mslin-app/screens/english-close2.png',
        '/projects/mslin-app/screens/english2.png'
      ]
    },
    {
      id: 'reading',
      title: lang === 'zh' ? '閱讀測驗' : 'Reading Comprehension',
      train: lang === 'zh' ? '長文理解' : 'Long Passage Comprehension',
      interact: lang === 'zh' ? '選擇題' : 'Multiple-Choice',
      screens: [
        '/projects/mslin-app/screens/english1.png',
        '/projects/mslin-app/screens/english3.png',
        '/projects/mslin-app/screens/english5.png'
      ]
    },
    {
      id: 'translation',
      title: lang === 'zh' ? '引導式翻譯' : 'Guided Translation',
      train: lang === 'zh' ? '中英對應語感' : 'CN-EN Correspondence Sense',
      interact: lang === 'zh' ? '關鍵詞填空含提示' : 'Fill Keywords with Hints',
      screens: [
        '/projects/mslin-app/screens/english2.png',
        '/projects/mslin-app/screens/english4.png',
        '/projects/mslin-app/screens/english6.png'
      ]
    }
  ];

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .feature-mockup-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 16px;
          margin-bottom: 24px;
          width: 100%;
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          .feature-mockup-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .showcase-split-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding-top: 16px;
          box-sizing: border-box;
        }
        .showcase-buttons-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }
        .showcase-mockups-col {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .showcase-split-container {
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            width: 100%;
          }
          .showcase-buttons-col {
            width: 260px;
            flex-shrink: 0;
          }
          .showcase-mockups-col {
            grid-template-columns: repeat(3, 1fr);
            width: calc(75% - 4px);
            flex-shrink: 0;
            margin: 0;
          }
        }
        
        /* New Responsive Scroll Tab Bar Styles */
        .outer-tab-container {
          display: flex;
          justify-content: flex-start;
          width: 100%;
          margin-bottom: 32px;
          box-sizing: border-box;
        }
        .outer-tab-track {
          display: flex;
          background-color: #F1F5F9;
          border-radius: 9999px;
          padding: 4px;
          border: 1px solid rgba(148, 163, 184, 0.15);
          max-width: 640px;
          width: 100%;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
          box-sizing: border-box;
        }
        .outer-tab-button {
          flex: 1;
          text-align: center;
          padding: 6px 4px;
          border-radius: 9999px;
          border: none;
          outline: none;
          cursor: pointer;
          transition: all 200ms ease;
          background-color: transparent;
          box-sizing: border-box;
        }
        .outer-tab-button.active {
          background-color: #ffffff;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
        }
        .outer-tab-sub {
          display: block;
          font-size: 8px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94A3B8;
          margin-bottom: 2px;
          font-family: 'Inter', sans-serif;
        }
        .outer-tab-button.active .outer-tab-sub {
          color: #534AB7;
        }
        .outer-tab-label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          color: #64748B;
          white-space: nowrap;
        }
        .outer-tab-button.active .outer-tab-label {
          font-weight: 600;
          color: #1E1B4B;
        }
        
        @media (min-width: 640px) {
          .outer-tab-button {
            padding: 10px 16px;
          }
          .outer-tab-sub {
            font-size: 10px;
          }
          .outer-tab-label {
            font-size: 14px;
          }
        }
        

        
        /* Interactive Question Selector styling */
        .showcase-btn-item {
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 200ms ease;
          background-color: transparent;
          border-left: 4px solid transparent;
          box-sizing: border-box;
        }
        .showcase-btn-item.active-chinese {
          background-color: #EEEDFE;
          border-left: 4px solid #7F77DD;
          box-shadow: 0 2px 8px rgba(127, 119, 221, 0.08);
        }
        .showcase-btn-item.active-english {
          background-color: #E5F2FF;
          border-left: 4px solid #378ADD;
          box-shadow: 0 2px 8px rgba(55, 138, 221, 0.08);
        }
        .showcase-btn-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 4px;
        }
        .showcase-btn-item.active-chinese .showcase-btn-title {
          color: #534AB7;
        }
        .showcase-btn-item.active-english .showcase-btn-title {
          color: #2E79C9;
        }
        
        @media (max-width: 767px) {
          .showcase-buttons-col {
            display: flex !important;
            flex-direction: row !important;
            gap: 8px !important;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding: 4px 4px 12px 4px !important;
            margin-bottom: 16px !important;
            width: 100% !important;
          }
          .showcase-buttons-col::-webkit-scrollbar {
            display: none;
          }
          .showcase-btn-item {
            padding: 8px 16px;
            border-radius: 9999px;
            border-left: none !important;
            flex-shrink: 0;
            white-space: nowrap;
          }
          .showcase-btn-item.active-chinese {
            background-color: #534AB7;
            box-shadow: 0 4px 10px rgba(83, 74, 183, 0.25);
          }
          .showcase-btn-item.active-english {
            background-color: #2E79C9;
            box-shadow: 0 4px 10px rgba(46, 121, 201, 0.25);
          }
          .showcase-btn-title {
            margin-bottom: 0;
          }
          .showcase-btn-item.active-chinese .showcase-btn-title {
            color: #FFFFFF;
          }
          .showcase-btn-item.active-english .showcase-btn-title {
            color: #FFFFFF;
          }
        }
      `}} />
      {/* ─── OUTER TAB BAR ─── */}
      <div className="outer-tab-container">
        <div className="outer-tab-track">
          {loopOneTabs.map((tab) => {
            const isActive = activeOuter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleOuterSwitch(tab.id)}
                className={`outer-tab-button ${isActive ? 'active' : ''}`}
              >
                <span className="outer-tab-sub">
                  {tab.num}
                </span>
                <span className="outer-tab-label">
                  {lang === 'zh' ? tab.zhLabel : tab.enLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>



      {/* ─── CONTENT PANELS ─── */}
      <div style={{
        opacity: isOuterTransitioning ? 0 : 1,
        transition: isOuterTransitioning ? 'opacity 100ms ease' : 'opacity 200ms ease',
        boxSizing: 'border-box'
      }}>
        {displayOuter === '1a' && (
          <div style={{ marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#EEEDFE',
              color: '#534AB7',
              borderRadius: '20px',
              fontSize: '12px',
              padding: '3px 12px',
              marginBottom: '12px'
            }}>
              {lang === 'zh' ? '功能 1A' : 'Feature 1A'}
            </div>
            <SubHeading>
              {lang === 'zh' ? '刷題 Loop（5 / 10 / 15 題）' : 'Practice Loop (5 / 10 / 15 Questions)'}
            </SubHeading>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: 'var(--color-text-secondary)',
              maxWidth: '640px',
              marginBottom: '24px',
              textAlign: 'justify'
            }}>
              {lang === 'zh' 
                ? '五題是刷題閉環的預設輪次，也是整個設計最關鍵的數字決策。太少（1–2 題）沒有儀式感；太多（10 題以上）容易中途放棄。五題對應一次短時間的專注週期，做完剛好有點累又覺得「差點就更多」，這個微妙的張力是讓人想再開一輪的關鍵。'
                : 'Five questions is the default round of the practice loop, which is also the most critical numeric decision in the design. Too few (1-2 questions) feels unceremonious; too many (10+ questions) leads to mid-way abandonment. Five questions corresponds to a short focus cycle, finishing just when slightly fatigued but feeling \'almost more\'—this subtle tension is key to motivating another round.'}
            </p>
            
            <div className="feature-mockup-grid">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }} />
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                  {lang === 'zh' ? '刷題畫面 — 進度條顯示第幾題' : 'Practice Screen - Progress bar showing current question'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }} />
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                  {lang === 'zh' ? '結果頁 — XP 動畫結算' : 'Results Page - XP Animation Settlement'}
                </span>
              </div>
            </div>
          </div>
        )}

        {displayOuter === '1b' && (
          <div style={{ marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#EEEDFE',
              color: '#534AB7',
              borderRadius: '20px',
              fontSize: '12px',
              padding: '3px 12px',
              marginBottom: '12px'
            }}>
              {lang === 'zh' ? '功能 1B' : 'Feature 1B'}
            </div>
            <SubHeading>
              {lang === 'zh' ? '多科互動題型' : 'Interactive Questions'}
            </SubHeading>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: 'var(--color-text-secondary)',
              maxWidth: '640px',
              marginBottom: '20px',
              textAlign: 'justify'
            }}>
              {lang === 'zh'
                ? '題型本身就是學習方法，互動形式應該對應認知需求，而不是統一規格。'
                : 'The question type itself is the learning method, and the interaction format should correspond to cognitive needs rather than a uniform specification.'}
            </p>

            {/* ─── INNER SUB-TAB BAR ─── */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-start', 
              width: '100%', 
              borderBottom: '0.5px solid var(--color-border-tertiary)',
              marginBottom: '24px', 
              boxSizing: 'border-box',
              gap: '24px'
            }}>
              {/* Sub-tab 數學 */}
              <button 
                onClick={() => handleInnerSwitch('math')}
                style={{
                  padding: '8px 4px',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid',
                  borderBottomColor: activeInner === 'math' ? '#7F77DD' : 'transparent',
                  marginBottom: '-0.5px',
                  color: activeInner === 'math' ? '#534AB7' : 'var(--color-text-secondary)',
                  fontWeight: activeInner === 'math' ? 600 : 400,
                  transition: 'color 150ms ease, border-color 150ms ease',
                  outline: 'none',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                {lang === 'zh' ? '數學' : 'Math'}
              </button>

              {/* Sub-tab 國文 */}
              <button 
                onClick={() => handleInnerSwitch('chinese')}
                style={{
                  padding: '8px 4px',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid',
                  borderBottomColor: activeInner === 'chinese' ? '#7F77DD' : 'transparent',
                  marginBottom: '-0.5px',
                  color: activeInner === 'chinese' ? '#534AB7' : 'var(--color-text-secondary)',
                  fontWeight: activeInner === 'chinese' ? 600 : 400,
                  transition: 'color 150ms ease, border-color 150ms ease',
                  outline: 'none',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                {lang === 'zh' ? '國文' : 'Chinese'}
              </button>

              {/* Sub-tab 英文 */}
              <button 
                onClick={() => handleInnerSwitch('english')}
                style={{
                  padding: '8px 4px',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid',
                  borderBottomColor: activeInner === 'english' ? '#7F77DD' : 'transparent',
                  marginBottom: '-0.5px',
                  color: activeInner === 'english' ? '#534AB7' : 'var(--color-text-secondary)',
                  fontWeight: activeInner === 'english' ? 600 : 400,
                  transition: 'color 150ms ease, border-color 150ms ease',
                  outline: 'none',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                {lang === 'zh' ? '英文' : 'English'}
              </button>
            </div>

            {/* Inner transition wrapper */}
            <div style={{
              opacity: isInnerTransitioning ? 0 : 1,
              transition: isInnerTransitioning ? 'opacity 100ms ease' : 'opacity 200ms ease',
              boxSizing: 'border-box'
            }}>
              {displayInner === 'math' && (
                <div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#534AB7',
                    paddingBottom: '8px',
                    borderBottom: '0.5px solid var(--color-border-tertiary)',
                    marginBottom: '16px'
                  }}>
                    {lang === 'zh' ? '數學｜步驟解題' : 'Math | Step-by-Step Problem Solving'}
                  </div>
                  
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '20px',
                    textAlign: 'justify'
                  }}>
                    {lang === 'zh'
                      ? '步驟解題改變了學生的角色：題目被拆解成 2–4 個步驟，學生依序填入，最後才呈現完整解題過程。做完的感覺是「我解出來了」，而不是「我看到答案了」——對應 Scaffolding 鷹架理論：有結構的引導比被動接收更能形成長期記憶。'
                      : "Step-by-step problem solving changes the role of the student: questions are broken down into 2-4 steps, filled in sequentially, showing the full process at the end. The feeling is 'I solved it' rather than 'I saw the answer'—aligned with Scaffolding theory: structured guidance forms longer-term memory than passive reception."}
                  </p>

                  {/* DESKTOP/TABLET ONLY: 4-Column Grid Layout */}
                  <div className="hidden sm:grid feature-mockup-grid">
                    {/* Phone 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                        <img 
                          src="/projects/mslin-app/screens/math10.png" 
                          alt="步驟 1" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </PhoneMockup>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                        {lang === 'zh' ? '步驟 1：拆解題目與公式' : 'Step 1: Deconstruct Formula'}
                      </span>
                    </div>

                    {/* Phone 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                        <img 
                          src="/projects/mslin-app/screens/math11.png" 
                          alt="步驟 2" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </PhoneMockup>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                        {lang === 'zh' ? '步驟 2：填寫中間運算' : 'Step 2: Intermediate Steps'}
                      </span>
                    </div>

                    {/* Phone 3 */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                        <img 
                          src="/projects/mslin-app/screens/math12.png" 
                          alt="步驟 3" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </PhoneMockup>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                        {lang === 'zh' ? '步驟 3：得出最終解答' : 'Step 3: Final Numerical Answer'}
                      </span>
                    </div>

                    {/* Phone 4 */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                        <img 
                          src="/projects/mslin-app/screens/math13.png" 
                          alt="步驟 4" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </PhoneMockup>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                        {lang === 'zh' ? '步驟 4：觀看完整解析' : 'Step 4: View Full Explanation'}
                      </span>
                    </div>
                  </div>

                  {/* MOBILE ONLY: Single Phone Mockup Horizontal Slider */}
                  <div className="block sm:hidden">
                    <SinglePhoneSlider steps={mathSteps} lang={lang} themeColor="#534AB7" />
                  </div>
                </div>
              )}

              {displayInner === 'chinese' && (
                <div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#534AB7',
                    paddingBottom: '8px',
                    borderBottom: '0.5px solid var(--color-border-tertiary)',
                    marginBottom: '16px'
                  }}>
                    {lang === 'zh' ? '國文｜依題目性質設計互動形式' : 'Chinese | Custom Interaction per Subject'}
                  </div>
                  
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '20px',
                    textAlign: 'justify'
                  }}>
                    {lang === 'zh'
                      ? '國文的知識點性質差異大，無法用單一題型涵蓋。我們依照每種題目的認知需求，設計了五種對應的互動形式。'
                      : 'Chinese knowledge points vary greatly. According to the cognitive needs of each question type, we designed five corresponding interaction formats.'}
                  </p>

                  {/* DESKTOP/TABLET ONLY: 4-Column Grid Layout */}
                  <div className="hidden sm:grid feature-mockup-grid">
                    {/* Phone 1 (With Image) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                        <img 
                          src="/projects/mslin-app/screens/chinese3.png" 
                          alt="字音字形配對" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </PhoneMockup>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                        {lang === 'zh' ? '字音字形配對 — 左右連線' : 'Pronunciation & Character Pairing - Connect'}
                      </span>
                    </div>

                    {/* Phone 2 (With Image) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                        <img 
                          src="/projects/mslin-app/screens/chinese18.png" 
                          alt="文言文逐句翻譯" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </PhoneMockup>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                        {lang === 'zh' ? '文言文逐句翻譯 — 填空' : 'Classical Chinese - Blank Fills'}
                      </span>
                    </div>

                    {/* Phone 3 (Placeholder) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#534AB7', opacity: 0.15 }}>3</div>
                      </PhoneMockup>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                        {lang === 'zh' ? '成語配對填空 — 點選填入' : 'Idiom Pairing - Tap to Fill'}
                      </span>
                    </div>

                    {/* Phone 4 (Placeholder) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#534AB7', opacity: 0.15 }}>4</div>
                      </PhoneMockup>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                        {lang === 'zh' ? '錯字辨識 — 點選句中錯字' : 'Typo Spotting - Tap Typos'}
                      </span>
                    </div>
                  </div>

                  {/* MOBILE ONLY: Single Phone Mockup Horizontal Slider */}
                  <div className="block sm:hidden">
                    <SinglePhoneSlider steps={chineseSteps} lang={lang} themeColor="#534AB7" />
                  </div>

                  {/* Expandable Grid */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px', width: '100%' }}>
                    <button 
                      onClick={() => setChineseGridOpen(!chineseGridOpen)}
                      style={{
                        border: '0.5px solid var(--color-border-tertiary)',
                        borderRadius: 'var(--border-radius-md)',
                        backgroundColor: 'transparent',
                        fontSize: '13px',
                        padding: '10px 24px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--color-text-primary)',
                        outline: 'none'
                      }}
                    >
                      <span>{lang === 'zh' ? '查看所有國文題型' : 'View All Chinese Question Types'}</span>
                      <i className="ti ti-chevron-down" style={{
                        transition: 'transform 200ms ease',
                        transform: chineseGridOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}></i>
                    </button>
                    
                    <div style={{
                      maxHeight: chineseGridOpen ? '1000px' : '0px',
                      transition: 'max-height 350ms ease',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                      width: '100%'
                    }}>
                      <div className="showcase-split-container">
                        {/* Left Column: switching buttons */}
                        <div className="showcase-buttons-col">
                          {chineseTypes.map((type, index) => (
                            <div 
                              key={index}
                              onClick={(e) => {
                                setActiveChineseType(index);
                                const child = e.currentTarget;
                                const parent = child.parentElement;
                                if (parent) {
                                  const targetScrollLeft = child.offsetLeft - (parent.clientWidth - child.clientWidth) / 2;
                                  parent.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
                                }
                              }}
                              className={`showcase-btn-item ${activeChineseType === index ? 'active-chinese' : ''}`}
                            >
                              <div className="showcase-btn-title">
                                {type.title}
                              </div>
                              <div className="hidden md:block" style={{
                                fontSize: '11px',
                                color: activeChineseType === index ? '#7F77DD' : 'var(--color-text-tertiary)',
                                lineHeight: '1.4'
                              }}>
                                {lang === 'zh' ? '訓練：' : 'Train: '}{type.train} ｜ {lang === 'zh' ? '互動：' : 'Interact: '}{type.interact}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Mobile Active Type Description Subtitle */}
                        <div className="block md:hidden" style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          color: 'var(--color-text-secondary)',
                          padding: '8px 12px',
                          marginBottom: '8px',
                          lineHeight: '1.4',
                          backgroundColor: '#FAFAFE',
                          borderLeft: '3px solid #7F77DD',
                          borderRadius: '4px',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}>
                          {lang === 'zh' ? '訓練：' : 'Train: '}{chineseTypes[activeChineseType].train} ｜ {lang === 'zh' ? '互動：' : 'Interact: '}{chineseTypes[activeChineseType].interact}
                        </div>

                        {/* Right Column: mockups (Desktop/Tablet) */}
                        <div className="hidden md:grid showcase-mockups-col">
                          {chineseTypes[activeChineseType].screens.map((screen, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                                <img 
                                  src={screen} 
                                  alt={chineseTypes[activeChineseType].title} 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                              </PhoneMockup>
                            </div>
                          ))}
                        </div>

                        {/* Mobile slider */}
                        <div className="block md:hidden w-full">
                          <SinglePhoneSlider 
                            steps={chineseTypes[activeChineseType].screens.map((screen, sIdx) => ({
                              img: screen,
                              title: lang === 'zh'
                                ? `${chineseTypes[activeChineseType].title} — ${chineseTypes[activeChineseType].interact} (${sIdx + 1}/${chineseTypes[activeChineseType].screens.length})`
                                : `${chineseTypes[activeChineseType].title} - ${chineseTypes[activeChineseType].interact} (${sIdx + 1}/${chineseTypes[activeChineseType].screens.length})`
                            }))} 
                            lang={lang} 
                            themeColor="#534AB7" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {displayInner === 'english' && (
                <div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#534AB7',
                    paddingBottom: '8px',
                    borderBottom: '0.5px solid var(--color-border-tertiary)',
                    marginBottom: '16px'
                  }}>
                    {lang === 'zh' ? '英文｜依技能類型分流練習' : 'English | Split Skill Practice'}
                  </div>
                  
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '20px',
                    textAlign: 'justify'
                  }}>
                    {lang === 'zh'
                      ? '英文學習涵蓋多種技能——記憶單字、理解篇章、應用文法、中英轉換，各需不同的訓練方式。我們為每種技能設計專屬題型。'
                      : 'English learning covers multiple skills—word memory, reading comprehension, grammar application, and Chinese-English conversion, each requiring different training. We design specific types for each skill.'}
                  </p>

                  {/* DESKTOP/TABLET ONLY: 4-Column Grid Layout */}
                  <div className="hidden sm:grid feature-mockup-grid">
                    {/* Phone 1 (With Image) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                        <img 
                          src="/projects/mslin-app/screens/english-sentence2.png" 
                          alt="文法造句重組" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </PhoneMockup>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                        {lang === 'zh' ? '文法造句重組 — 點擊排列' : 'Sentence Reordering - Tap to Rebuild'}
                      </span>
                    </div>

                    {/* Phone 2 (With Image) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                        <img 
                          src="/projects/mslin-app/screens/english-close2.png" 
                          alt="文意選填" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </PhoneMockup>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                        {lang === 'zh' ? '文意選填 — 空格嵌入段落' : 'Cloze - Slot Words in Paragraphs'}
                      </span>
                    </div>

                    {/* Phone 3 (Placeholder) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#378ADD', opacity: 0.15 }}>3</div>
                      </PhoneMockup>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                        {lang === 'zh' ? '單字選擇題 — 詞彙辨義' : 'Vocabulary MCQs - Meaning'}
                      </span>
                    </div>

                    {/* Phone 4 (Placeholder) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#378ADD', opacity: 0.15 }}>4</div>
                      </PhoneMockup>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                        {lang === 'zh' ? '拼字題 — 鍵盤輸入' : 'Spelling - Keyboard Input'}
                      </span>
                    </div>
                  </div>

                  {/* MOBILE ONLY: Single Phone Mockup Horizontal Slider */}
                  <div className="block sm:hidden">
                    <SinglePhoneSlider steps={englishSteps} lang={lang} themeColor="#378ADD" />
                  </div>

                  {/* Expandable Grid */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px', width: '100%' }}>
                    <button 
                      onClick={() => setEnglishGridOpen(!englishGridOpen)}
                      style={{
                        border: '0.5px solid var(--color-border-tertiary)',
                        borderRadius: 'var(--border-radius-md)',
                        backgroundColor: 'transparent',
                        fontSize: '13px',
                        padding: '10px 24px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--color-text-primary)',
                        outline: 'none'
                      }}
                    >
                      <span>{lang === 'zh' ? '查看所有英文題型' : 'View All English Question Types'}</span>
                      <i className="ti ti-chevron-down" style={{
                        transition: 'transform 200ms ease',
                        transform: englishGridOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}></i>
                    </button>
                    
                    <div style={{
                      maxHeight: englishGridOpen ? '1000px' : '0px',
                      transition: 'max-height 350ms ease',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                      width: '100%'
                    }}>
                      <div className="showcase-split-container">
                        {/* Left Column: switching buttons */}
                        <div className="showcase-buttons-col">
                          {englishTypes.map((type, index) => (
                            <div 
                              key={index}
                              onClick={(e) => {
                                setActiveEnglishType(index);
                                const child = e.currentTarget;
                                const parent = child.parentElement;
                                if (parent) {
                                  const targetScrollLeft = child.offsetLeft - (parent.clientWidth - child.clientWidth) / 2;
                                  parent.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
                                }
                              }}
                              className={`showcase-btn-item ${activeEnglishType === index ? 'active-english' : ''}`}
                            >
                              <div className="showcase-btn-title">
                                {type.title}
                              </div>
                              <div className="hidden md:block" style={{
                                fontSize: '11px',
                                color: activeEnglishType === index ? '#378ADD' : 'var(--color-text-tertiary)',
                                lineHeight: '1.4'
                              }}>
                                {lang === 'zh' ? '訓練：' : 'Train: '}{type.train} ｜ {lang === 'zh' ? '互動：' : 'Interact: '}{type.interact}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Mobile Active Type Description Subtitle */}
                        <div className="block md:hidden" style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          color: 'var(--color-text-secondary)',
                          padding: '8px 12px',
                          marginBottom: '8px',
                          lineHeight: '1.4',
                          backgroundColor: '#F5F9FF',
                          borderLeft: '3px solid #378ADD',
                          borderRadius: '4px',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}>
                          {lang === 'zh' ? '訓練：' : 'Train: '}{englishTypes[activeEnglishType].train} ｜ {lang === 'zh' ? '互動：' : 'Interact: '}{englishTypes[activeEnglishType].interact}
                        </div>

                        {/* Right Column: mockups (Desktop/Tablet) */}
                        <div className="hidden md:grid showcase-mockups-col">
                          {englishTypes[activeEnglishType].screens.map((screen, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                                <img 
                                  src={screen} 
                                  alt={englishTypes[activeEnglishType].title} 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                              </PhoneMockup>
                            </div>
                          ))}
                        </div>

                        {/* Mobile slider */}
                        <div className="block md:hidden w-full">
                          <SinglePhoneSlider 
                            steps={englishTypes[activeEnglishType].screens.map((screen, sIdx) => ({
                              img: screen,
                              title: lang === 'zh'
                                ? `${englishTypes[activeEnglishType].title} — ${englishTypes[activeEnglishType].interact} (${sIdx + 1}/${englishTypes[activeEnglishType].screens.length})`
                                : `${englishTypes[activeEnglishType].title} - ${englishTypes[activeEnglishType].interact} (${sIdx + 1}/${englishTypes[activeEnglishType].screens.length})`
                            }))} 
                            lang={lang} 
                            themeColor="#378ADD" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {displayOuter === '1c' && (
          <div style={{ marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#EEEDFE',
              color: '#534AB7',
              borderRadius: '20px',
              fontSize: '12px',
              padding: '3px 12px',
              marginBottom: '12px'
            }}>
              {lang === 'zh' ? '功能 1C' : 'Feature 1C'}
            </div>
            <SubHeading>
              {lang === 'zh' ? '錯題庫與收藏庫' : 'Incorrect & Saved'}
            </SubHeading>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: 'var(--color-text-secondary)',
              maxWidth: '640px',
              marginBottom: '24px',
              textAlign: 'justify'
            }}>
              {lang === 'zh' 
                ? '視覺語言上，我們刻意避免讓錯題庫看起來像「失敗清單」。空狀態設計成「還沒有題目加入」而非「你還沒犯錯」——這是一個等待被填滿的學習資產，而不是懲罰記錄。收藏庫讓學生主動標記重要題目，「我想記住這題」比被動的「這題你答錯了」更有動力回來複習。'
                : 'Visually, we deliberately avoided making the incorrect question library look like a \'list of failures.\' The empty state is designed as \'no questions added yet\' rather than \'you haven\'t made mistakes yet,\' sending the message that this is a learning asset waiting to be filled. Saved question library lets students actively tag important questions, giving them a sense of learning autonomy—\'I want to remember this question\' creates more motivation to return and review than passive \'you got this wrong\' indicators.'}
            </p>

            <div className="feature-mockup-grid">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                  <img 
                    src="/projects/mslin-app/screens/base2.png" 
                    alt="錯題庫" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </PhoneMockup>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                  {lang === 'zh' ? '錯題庫 — 中性語言取代負面標籤' : 'Incorrect Library - Neutral language replaces negative labels'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                  <img 
                    src="/projects/mslin-app/screens/base1.png" 
                    alt="收藏庫" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </PhoneMockup>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                  {lang === 'zh' ? '收藏庫 — 主動儲存給予自主感' : 'Saved Library - Active saving yields sense of autonomy'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MsLinFeatureTabs;
