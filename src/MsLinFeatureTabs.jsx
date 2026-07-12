import React, { useState, useRef, useEffect } from 'react';

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

export const SinglePhoneSlider = ({ steps, lang, themeColor = '#7F77DD' }) => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    if (width > 0) {
      const index = Math.round(scrollLeft / width);
      if (index !== activeStep && index >= 0 && index < steps.length) {
        setActiveStep(index);
      }
    }
  };

  const currentStep = steps[activeStep] || {};
  const stepImg = currentStep.img || currentStep.src;
  const stepTitle = currentStep.title || currentStep.label;
  const stepDesc = currentStep.desc;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', width: '100%', marginTop: '20px', marginBottom: '20px' }}>
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '200px',
          margin: '0 auto'
        }}
      >
        {/* Horizontal Scroll Area */}
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="hide-scrollbar"
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            width: '100%',
            WebkitOverflowScrolling: 'touch',
            padding: '8px 0'
          }}
        >
          {steps.map((step, idx) => {
            const imgUrl = step.img || step.src;
            const titleVal = step.title || step.label;
            const stepNum = step.num || `0${idx + 1}`;
            return (
              <div 
                key={idx}
                style={{
                  flexShrink: 0,
                  width: '100%',
                  scrollSnapAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '190px' }}>
                  <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                    {imgUrl && (imgUrl.endsWith('.webm') || imgUrl.endsWith('.mp4') || step.type === 'video') ? (
                      <video 
                        src={imgUrl} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : imgUrl ? (
                      <img 
                        src={imgUrl} 
                        alt={titleVal} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9' }}>
                        <span style={{ fontSize: '28px', fontWeight: 'bold', color: themeColor, opacity: 0.15 }}>
                          {stepNum}
                        </span>
                      </div>
                    )}
                  </PhoneMockup>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step Text Label */}
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#E8734A',
          textAlign: 'center',
          lineHeight: '1.4',
          minHeight: '44px',
          marginTop: '8px'
        }}>
          <div>{stepTitle}</div>
          {stepDesc && (
            <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', fontWeight: '400', marginTop: '4px' }}>
              {stepDesc}
            </div>
          )}
        </div>

        {/* Premium Dot Indicators */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginTop: '4px' }}>
          {steps.map((_, idx) => {
            const isActive = activeStep === idx;
            return (
              <div 
                key={idx}
                style={{
                  width: isActive ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: isActive ? '#E8734A' : '#D1D5DB',
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
  const [activeOuter, setActiveOuter] = useState('1a');
  const [displayOuter, setDisplayOuter] = useState('1a');
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

  const mathScrollRef = useRef(null);
  const [activeMathType, setActiveMathType] = useState('steps');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleMathScroll = () => {
    if (mathScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = mathScrollRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    if (mathScrollRef.current) {
      mathScrollRef.current.scrollLeft = 0;
      setShowLeftArrow(false);
      setShowRightArrow(true);
    }
  }, [activeMathType]);

  const loopScrollRef = useRef(null);
  const [showLoopLeftArrow, setShowLoopLeftArrow] = useState(false);
  const [showLoopRightArrow, setShowLoopRightArrow] = useState(true);

  const handleLoopScroll = () => {
    if (loopScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = loopScrollRef.current;
      setShowLoopLeftArrow(scrollLeft > 5);
      setShowLoopRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    if (loopScrollRef.current) {
      loopScrollRef.current.scrollLeft = 0;
      setShowLoopLeftArrow(false);
      setShowLoopRightArrow(true);
    }
  }, [activeOuter]);

  const mathSteps = [
    {
      num: '1',
      title: lang === 'zh' ? '步驟一：題目解析' : 'Step 1: Problem Analysis',
      desc: lang === 'zh' ? '解析題目找出關鍵考點' : 'Analyze the problem to find key points',
      img: '/projects/mslin-app/screens/math/解析題目找出關鍵考點.jpg'
    },
    {
      num: '2',
      title: lang === 'zh' ? '步驟二：觀念連結' : 'Step 2: Concept Connection',
      desc: lang === 'zh' ? '點出重點觀念' : 'Highlight key concepts',
      img: '/projects/mslin-app/screens/math/點出重點觀念.jpg'
    },
    {
      num: '3',
      title: lang === 'zh' ? '步驟二：觀念連結' : 'Step 2: Concept Connection (Cont.)',
      desc: lang === 'zh' ? '即時解答協助觀念釐清' : 'Instant feedback to clarify concepts',
      img: '/projects/mslin-app/screens/math/即時解答協助觀念釐清.jpg'
    },
    {
      num: '4',
      title: lang === 'zh' ? '步驟三：列式' : 'Step 3: Formula Setup',
      desc: lang === 'zh' ? '列式開始計算' : 'Setup formula to start calculation',
      img: '/projects/mslin-app/screens/math/列式開始計算.jpg'
    },
    {
      num: '5',
      title: lang === 'zh' ? '步驟四：選出正確答案' : 'Step 4: Select Correct Answer',
      desc: lang === 'zh' ? '選出最終答案' : 'Select the final answer',
      img: '/projects/mslin-app/screens/math/選出最終答案.jpg'
    },
    {
      num: '6',
      title: lang === 'zh' ? '公布解答' : 'Publish Answer',
      desc: lang === 'zh' ? '公布解答' : 'Publish answer',
      img: '/projects/mslin-app/screens/math/公布解答.jpg'
    }
  ];

  const mathJudgementSteps = [
    {
      num: '1',
      title: lang === 'zh' ? '步驟一' : 'Step 1',
      desc: lang === 'zh' ? '逐項判斷第 1 步' : 'Item-by-item analysis step 1',
      img: '/projects/mslin-app/screens/math/逐項判斷1.jpg'
    },
    {
      num: '2',
      title: lang === 'zh' ? '步驟二' : 'Step 2',
      desc: lang === 'zh' ? '逐項判斷第 2 步' : 'Item-by-item analysis step 2',
      img: '/projects/mslin-app/screens/math/逐項判斷2.jpg'
    },
    {
      num: '3',
      title: lang === 'zh' ? '步驟三' : 'Step 3',
      desc: lang === 'zh' ? '逐項判斷第 3 步' : 'Item-by-item analysis step 3',
      img: '/projects/mslin-app/screens/math/逐項判斷3.jpg'
    },
    {
      num: '4',
      title: lang === 'zh' ? '步驟四' : 'Step 4',
      desc: lang === 'zh' ? '逐項判斷第 4 步' : 'Item-by-item analysis step 4',
      img: '/projects/mslin-app/screens/math/逐項判斷4.jpg'
    }
  ];

  const mathBlankSteps = [
    {
      num: '1',
      title: lang === 'zh' ? '步驟一' : 'Step 1',
      desc: lang === 'zh' ? '填空解答第 1 步' : 'Fill-in-the-blank step 1',
      img: '/projects/mslin-app/screens/math/填空題1.jpg'
    },
    {
      num: '2',
      title: lang === 'zh' ? '步驟二' : 'Step 2',
      desc: lang === 'zh' ? '填空解答第 2 步' : 'Fill-in-the-blank step 2',
      img: '/projects/mslin-app/screens/math/填空題2.jpg'
    },
    {
      num: '3',
      title: lang === 'zh' ? '步驟三' : 'Step 3',
      desc: lang === 'zh' ? '填空解答第 3 步' : 'Fill-in-the-blank step 3',
      img: '/projects/mslin-app/screens/math/填空題3.jpg'
    }
  ];

  const mathConceptSteps = [
    {
      num: '1',
      title: lang === 'zh' ? '步驟一' : 'Step 1',
      desc: lang === 'zh' ? '選擇符合題意的核心觀念' : 'Select the core concept matching the question',
      img: '/projects/mslin-app/screens/math/觀念選擇1.PNG'
    },
    {
      num: '2',
      title: lang === 'zh' ? '步驟二' : 'Step 2',
      desc: lang === 'zh' ? '檢視相關概念的連結關係' : 'Check the connection of related concepts',
      img: '/projects/mslin-app/screens/math/觀念選擇2.PNG'
    },
    {
      num: '3',
      title: lang === 'zh' ? '步驟三' : 'Step 3',
      desc: lang === 'zh' ? '確認對應的解題定理' : 'Confirm the corresponding solving theorem',
      img: '/projects/mslin-app/screens/math/觀念選擇3.PNG'
    },
    {
      num: '4',
      title: lang === 'zh' ? '步驟四' : 'Step 4',
      desc: lang === 'zh' ? '完成觀念連結，準備列式計算' : 'Complete concept connection, ready for formula',
      img: '/projects/mslin-app/screens/math/觀念選擇4.PNG'
    }
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
      num: '1',
      title: lang === 'zh' ? '字音字型' : 'Phonetic Spelling',
      train: lang === 'zh' ? '注音與字形辨識' : 'Phonetic & Character Recognition',
      interact: lang === 'zh' ? '左右連線配對' : 'Connect left and right matching',
      screens: [
        '/projects/mslin-app/screens/Chinese/字音字型1.png',
        '/projects/mslin-app/screens/Chinese/字音字型2.png',
        '/projects/mslin-app/screens/Chinese/字音字型3.png'
      ]
    },
    {
      id: 'typo',
      num: '2',
      title: lang === 'zh' ? '錯字辨識' : 'Typo Recognition',
      train: lang === 'zh' ? '錯別字偵測與用字精準度' : 'Typo detection and character precision',
      interact: lang === 'zh' ? '點選句子中的錯別字' : 'Tap the typo in sentences',
      screens: [
        '/projects/mslin-app/screens/Chinese/錯字辨識1.png',
        '/projects/mslin-app/screens/Chinese/錯字辨識2.png',
        '/projects/mslin-app/screens/Chinese/錯字辨識3.png'
      ]
    },
    {
      id: 'idiom',
      num: '3',
      title: lang === 'zh' ? '成語釋義' : 'Idiom Definition',
      train: lang === 'zh' ? '成語語意理解與應用' : 'Idiom meaning understanding and application',
      interact: lang === 'zh' ? '點選成語填入正確空格' : 'Tap idioms to fill in blanks',
      screens: [
        '/projects/mslin-app/screens/Chinese/成語釋義1.png',
        '/projects/mslin-app/screens/Chinese/成語釋義2.png',
        '/projects/mslin-app/screens/Chinese/成語釋義3.png'
      ]
    },
    {
      id: 'reading',
      num: '4',
      title: lang === 'zh' ? '閱讀測驗' : 'Reading Comprehension',
      train: lang === 'zh' ? '篇章閱讀理解與主旨推論' : 'Paragraph reading comprehension and inference',
      interact: lang === 'zh' ? '閱讀後單選題' : 'Post-reading multiple-choice questions',
      screens: [
        '/projects/mslin-app/screens/Chinese/閱讀測驗1.png',
        '/projects/mslin-app/screens/Chinese/閱讀測驗2.png',
        '/projects/mslin-app/screens/Chinese/閱讀測驗3.png'
      ]
    },
    {
      id: 'translation',
      num: '5',
      title: lang === 'zh' ? '文言文翻譯' : 'Classical Chinese Translation',
      train: lang === 'zh' ? '文言文語感與詞彙對譯' : 'Classical sense and vocabulary translation',
      interact: lang === 'zh' ? '文言文關鍵詞與逐句填空' : 'Classical keywords and line translation fills',
      screens: [
        '/projects/mslin-app/screens/Chinese/文言文翻譯1.png',
        '/projects/mslin-app/screens/Chinese/文言文翻譯12.png',
        '/projects/mslin-app/screens/Chinese/文言文翻譯3.png'
      ]
    }
  ];

  const englishTypes = [
    {
      id: 'vocab',
      num: '1',
      title: lang === 'zh' ? '單字選擇' : 'Vocabulary',
      train: lang === 'zh' ? '字彙量與詞彙辨義' : 'Vocabulary range and word differentiation',
      interact: lang === 'zh' ? '4 選 1 單選題' : '4-Option MCQ',
      screens: [
        '/projects/mslin-app/screens/English/單字選擇1.PNG',
        '/projects/mslin-app/screens/English/單字選擇2.PNG',
        '/projects/mslin-app/screens/English/單字選擇3.PNG'
      ]
    },
    {
      id: 'spelling',
      num: '2',
      title: lang === 'zh' ? '拼字' : 'Spelling',
      train: lang === 'zh' ? '單字拼寫與聽力書寫' : 'Word spelling and audio transcription',
      interact: lang === 'zh' ? '聽音與提示拼字輸入' : 'Audio with hints spelling input',
      screens: [
        '/projects/mslin-app/screens/English/拼字1.PNG',
        '/projects/mslin-app/screens/English/拼字2.PNG',
        '/projects/mslin-app/screens/English/拼字3.PNG'
      ]
    },
    {
      id: 'forms',
      num: '3',
      title: lang === 'zh' ? '詞性變化' : 'Word Forms',
      train: lang === 'zh' ? '文法結構與詞性轉換' : 'Grammar syntax and word transformation',
      interact: lang === 'zh' ? '依句意輸入正確詞性單字' : 'Input correct form word in context',
      screens: [
        '/projects/mslin-app/screens/English/詞性變化填空1.PNG',
        '/projects/mslin-app/screens/English/詞性變化填空2.PNG',
        '/projects/mslin-app/screens/English/詞性變化填空3.PNG'
      ]
    },
    {
      id: 'sentence',
      num: '4',
      title: lang === 'zh' ? '句子建構' : 'Sentence Reordering',
      train: lang === 'zh' ? '英文句型結構與語序重組' : 'Sentence structure and syntax reordering',
      interact: lang === 'zh' ? '拖選/點擊單字塊重組句子' : 'Tap/drag word blocks to rebuild sentence',
      screens: [
        '/projects/mslin-app/screens/English/文法造句1.PNG',
        '/projects/mslin-app/screens/English/文法造句2.PNG',
        '/projects/mslin-app/screens/English/文法造句3.PNG'
      ]
    },
    {
      id: 'translation',
      num: '5',
      title: lang === 'zh' ? '引導翻譯' : 'Guided Translation',
      train: lang === 'zh' ? '中英翻譯思維與常用片語' : 'CN-EN translation thinking & key phrases',
      interact: lang === 'zh' ? '引導式關鍵字詞組拼裝' : 'Guided keywords and phrases assembly',
      screens: [
        '/projects/mslin-app/screens/English/引導式翻譯1.PNG',
        '/projects/mslin-app/screens/English/引導式翻譯2.PNG',
        '/projects/mslin-app/screens/English/引導式翻譯3.PNG'
      ]
    },
    {
      id: 'reading',
      num: '6',
      title: lang === 'zh' ? '閱讀測驗' : 'Reading Comprehension',
      train: lang === 'zh' ? '長文脈絡理解與資訊檢索' : 'Long text context understanding and info search',
      interact: lang === 'zh' ? '長篇閱讀後單選題' : 'Post-reading multiple choice questions',
      screens: [
        '/projects/mslin-app/screens/English/閱讀測驗1.PNG',
        '/projects/mslin-app/screens/English/閱讀測驗2.PNG',
        '/projects/mslin-app/screens/English/閱讀測驗3.PNG'
      ]
    },
    {
      id: 'discourse',
      num: '7',
      title: lang === 'zh' ? '篇章結構' : 'Discourse Structure',
      train: lang === 'zh' ? '段落連貫性與邏輯架構' : 'Paragraph coherence and logical structure',
      interact: lang === 'zh' ? '句型段落拖選嵌入' : 'Drag and insert sentence paragraph slots',
      screens: [
        '/projects/mslin-app/screens/English/篇章結構1.PNG',
        '/projects/mslin-app/screens/English/篇章結構2.PNG',
        '/projects/mslin-app/screens/English/篇章結構3.PNG'
      ]
    },
    {
      id: 'cloze',
      num: '8',
      title: lang === 'zh' ? '克漏字／文意選填' : 'Cloze Test',
      train: lang === 'zh' ? '綜合文意理解與語法配合' : 'Context comprehension and syntax coordination',
      interact: lang === 'zh' ? '挖空填詞下拉選單' : 'Blank slot drop-down words fill',
      screens: [
        '/projects/mslin-app/screens/English/文意選填1.PNG',
        '/projects/mslin-app/screens/English/文意選填2.PNG',
        '/projects/mslin-app/screens/English/文意選填3.PNG'
      ]
    }
  ];

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 639px) {
          .feature-mockup-grid {
            display: none !important;
          }
        }
        @media (min-width: 640px) {
          .feature-mockup-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-top: 16px;
            margin-bottom: 24px;
            width: 100%;
            box-sizing: border-box;
          }
        }
        .loop-mockup-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 16px;
          margin-bottom: 24px;
          width: 100%;
          box-sizing: border-box;
        }
        @media (min-width: 768px) {
          .loop-mockup-grid {
            grid-template-columns: repeat(5, 1fr);
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
          width: fit-content;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
          box-sizing: border-box;
        }
        .outer-tab-button {
          text-align: center;
          padding: 8px 16px;
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
          font-size: 12px;
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
            padding: 10px 28px;
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
                ? '五題是刷題閉環的預設輪次，也是整個設計最關鍵的數字決策。太少（1–2 題）沒有儀式感；太多（10 題以上）容易中途放棄。五題對應一次短時間的專注週期，做完剛好有點累又覺得「差點就更多」，這個微妙的張力是讓人想再開一輪的關鍵。對於想多刷幾題的用戶，我們依然提供了多題數10/15題題數選擇滿足不同用戶需求。'
                : 'Five questions is the default round of the practice loop, which is also the most critical numeric decision in the design. Too few (1-2 questions) feels unceremonious; too many (10+ questions) leads to mid-way abandonment. Five questions corresponds to a short focus cycle, finishing just when slightly fatigued but feeling \'almost more\'—this subtle tension is key to motivating another round. For users who want to practice more, we also offer 10 and 15 question choices to meet different user needs.'}
            </p>
            
            {/* Desktop View: FIVE-PHONE HORIZONTAL SCROLL CAROUSEL */}
            <div className="hidden md:block" style={{ position: 'relative', width: '100%', marginTop: '24px' }}>
              {/* Left Scroll Arrow (prev button) */}
              {showLoopLeftArrow && (
                <button 
                  onClick={() => {
                    if (loopScrollRef.current) {
                      loopScrollRef.current.scrollBy({ left: -258, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    position: 'absolute',
                    left: '-24px',
                    top: '250px',
                    transform: 'translateY(-50%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(148, 163, 184, 0.15)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    color: '#1E293B',
                    transition: 'all 200ms ease',
                    outline: 'none',
                    padding: '0',
                    lineHeight: '0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', display: 'block', margin: '0 auto' }}>
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              )}

              {/* Scrollable Track */}
              <div 
                ref={loopScrollRef}
                onScroll={handleLoopScroll}
                className="hide-scrollbar"
                style={{
                  display: 'flex',
                  gap: '28px',
                  overflowX: 'auto',
                  scrollBehavior: 'smooth',
                  width: '100%',
                  padding: '12px 0px',
                  boxSizing: 'border-box',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {[
                  {
                    type: 'image',
                    src: '/projects/mslin-app/screens/loop/刷題loop5題.PNG',
                    label: lang === 'zh' ? '刷題畫面 — 5題Loop' : 'Practice Screen - 5 Qs Loop'
                  },
                  {
                    type: 'video',
                    src: '/projects/mslin-app/screens/loop/完成頁面.webm',
                    label: lang === 'zh' ? '練習完成頁面' : 'Practice Complete Page'
                  },
                  {
                    type: 'video',
                    src: '/projects/mslin-app/screens/loop/xp結算頁.webm',
                    label: lang === 'zh' ? 'XP結算頁' : 'XP Settlement Page'
                  },
                  {
                    type: 'image',
                    src: '/projects/mslin-app/screens/loop/刷題loop10題.PNG',
                    label: lang === 'zh' ? '10題練習' : '10 Questions Practice'
                  },
                  {
                    type: 'image',
                    src: '/projects/mslin-app/screens/loop/刷題loop15題.PNG',
                    label: lang === 'zh' ? '15題練習' : '15 Questions Practice'
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      width: '230px', 
                      flexShrink: 0, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center' 
                    }}
                  >
                    <PhoneMockup screenStyle={{ backgroundColor: '#EEEDFE' }}>
                      {item.type === 'video' ? (
                        <video 
                          src={item.src} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      ) : (
                        <img 
                          src={item.src} 
                          alt={item.label} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      )}
                    </PhoneMockup>
                    
                    {/* Step label & desc */}
                    <div style={{ marginTop: '12px', textAlign: 'center', minHeight: '36px', width: '100%' }}>
                      <span style={{
                        fontSize: '11px',
                        color: 'var(--color-text-secondary)',
                        textAlign: 'center',
                        lineHeight: '1.4',
                        display: 'block'
                      }}>
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Scroll Arrow (next button) */}
              {showLoopRightArrow && (
                <button 
                  onClick={() => {
                    if (loopScrollRef.current) {
                      loopScrollRef.current.scrollBy({ left: 258, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    position: 'absolute',
                    right: '-24px',
                    top: '250px',
                    transform: 'translateY(-50%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(148, 163, 184, 0.15)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    color: '#1E293B',
                    transition: 'all 200ms ease',
                    outline: 'none',
                    padding: '0',
                    lineHeight: '0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', display: 'block', margin: '0 auto' }}>
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              )}
            </div>

            {/* Mobile View: SinglePhoneSlider for 刷題 Loop */}
            <div className="block md:hidden" style={{ width: '100%', marginTop: '16px' }}>
              <SinglePhoneSlider 
                steps={[
                  {
                    type: 'image',
                    src: '/projects/mslin-app/screens/loop/刷題loop5題.PNG',
                    label: lang === 'zh' ? '步驟一：5題預設輪次' : 'Step 1: 5-Question Default Round',
                    desc: lang === 'zh' ? '刷題畫面 — 5題Loop' : 'Practice Screen - 5 Qs Loop'
                  },
                  {
                    type: 'video',
                    src: '/projects/mslin-app/screens/loop/完成頁面.webm',
                    label: lang === 'zh' ? '步驟二：完成頁面' : 'Step 2: Practice Complete Page',
                    desc: lang === 'zh' ? '完成練習並獲得獎勵' : 'Finish practice and get rewards'
                  },
                  {
                    type: 'video',
                    src: '/projects/mslin-app/screens/loop/xp結算頁.webm',
                    label: lang === 'zh' ? '步驟三：XP結算頁' : 'Step 3: XP Settlement Page',
                    desc: lang === 'zh' ? 'XP點數與進度結算' : 'XP and progress settlement'
                  },
                  {
                    type: 'image',
                    src: '/projects/mslin-app/screens/loop/刷題loop10題.PNG',
                    label: lang === 'zh' ? '步驟四：10題練習' : 'Step 4: 10 Questions Practice',
                    desc: lang === 'zh' ? '中等長度自主選擇' : 'Medium length custom choice'
                  },
                  {
                    type: 'image',
                    src: '/projects/mslin-app/screens/loop/刷題loop15題.PNG',
                    label: lang === 'zh' ? '步驟五：15題練習' : 'Step 5: 15 Questions Practice',
                    desc: lang === 'zh' ? '高強度自主練習' : 'High intensity custom practice'
                  }
                ]}
                lang={lang}
              />
            </div>
          </div>
        )}

        {displayOuter === '1b' && (
          <div style={{ marginBottom: '64px' }}>

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
                  borderBottomColor: activeInner === 'math' ? '#E8734A' : 'transparent',
                  marginBottom: '-0.5px',
                  color: activeInner === 'math' ? '#E8734A' : 'var(--color-text-secondary)',
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
                  borderBottomColor: activeInner === 'chinese' ? '#E8734A' : 'transparent',
                  marginBottom: '-0.5px',
                  color: activeInner === 'chinese' ? '#E8734A' : 'var(--color-text-secondary)',
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
                  borderBottomColor: activeInner === 'english' ? '#E8734A' : 'transparent',
                  marginBottom: '-0.5px',
                  color: activeInner === 'english' ? '#E8734A' : 'var(--color-text-secondary)',
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
              {displayInner === 'math' && (() => {
                let currentMathSteps = mathSteps;
                if (activeMathType === 'judgement') {
                  currentMathSteps = mathJudgementSteps;
                } else if (activeMathType === 'blank') {
                  currentMathSteps = mathBlankSteps;
                } else if (activeMathType === 'concept') {
                  currentMathSteps = mathConceptSteps;
                }

                return (
                  <div>
                    {/* Math sub-type capsule tabs */}
                    <div 
                      className="hide-scrollbar"
                      style={{
                        display: 'flex',
                        gap: '8px',
                        marginBottom: '24px',
                        overflowX: 'auto',
                        padding: '4px 4px 12px 4px',
                        width: '100%',
                        WebkitOverflowScrolling: 'touch'
                      }}
                    >
                      {[
                        { id: 'steps', label: lang === 'zh' ? '步驟解題' : 'Step-by-Step Solving' },
                        { id: 'concept', label: lang === 'zh' ? '觀念選擇' : 'Concept Selection' },
                        { id: 'judgement', label: lang === 'zh' ? '逐項判斷' : 'Item-by-Item Judgement' },
                        { id: 'blank', label: lang === 'zh' ? '填空題' : 'Fill-in-the-Blank' }
                      ].map((tab) => {
                        const isActive = activeMathType === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={(e) => {
                              setActiveMathType(tab.id);
                              const child = e.currentTarget;
                              const parent = child.parentElement;
                              if (parent) {
                                const targetScrollLeft = child.offsetLeft - (parent.clientWidth - child.clientWidth) / 2;
                                parent.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
                              }
                            }}
                            style={{
                              flexShrink: 0,
                              padding: '8px 16px',
                              borderRadius: '9999px',
                              border: '1px solid',
                              borderColor: isActive ? '#1D1D1F' : 'rgba(148, 163, 184, 0.15)',
                              backgroundColor: isActive ? '#1D1D1F' : 'transparent',
                              color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                              fontSize: '13px',
                              fontWeight: isActive ? 600 : 400,
                              cursor: 'pointer',
                              transition: 'all 200ms ease',
                              outline: 'none'
                            }}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
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

                    {/* DESKTOP/TABLET ONLY: Horizontal Scroll Row with Navigation Arrows */}
                    <div className="hidden md:block" style={{ position: 'relative', width: '100%', marginTop: '24px' }}>
                      {/* Left Scroll Arrow (prev button) */}
                      {currentMathSteps.length > 4 && showLeftArrow && (
                        <button 
                          onClick={() => {
                            if (mathScrollRef.current) {
                              mathScrollRef.current.scrollBy({ left: -258, behavior: 'smooth' });
                            }
                          }}
                        style={{
                          position: 'absolute',
                          left: '-24px',
                          top: '280px',
                          transform: 'translateY(-50%)',
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid rgba(148, 163, 184, 0.15)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          zIndex: 10,
                          color: '#1E293B',
                          transition: 'all 200ms ease',
                          outline: 'none',
                          padding: '0',
                          lineHeight: '0'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', display: 'block', margin: '0 auto' }}>
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                      </button>
                      )}

                      {/* Scrollable Track */}
                      <div 
                        ref={mathScrollRef}
                        onScroll={handleMathScroll}
                        className="hide-scrollbar"
                        style={{
                          display: 'flex',
                          gap: '28px',
                          overflowX: 'auto',
                          scrollBehavior: 'smooth',
                          width: '100%',
                          padding: '12px 0px',
                          boxSizing: 'border-box',
                          WebkitOverflowScrolling: 'touch'
                        }}
                      >
                        {currentMathSteps.map((step, idx) => (
                          <div 
                            key={idx} 
                            style={{ 
                              width: '230px', 
                              flexShrink: 0, 
                              display: 'flex', 
                              flexDirection: 'column', 
                              alignItems: 'center' 
                            }}
                          >
                            <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                              <img 
                                src={step.img} 
                                alt={step.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              />
                            </PhoneMockup>
                            
                            {/* Step label & desc */}
                            <div style={{ marginTop: '12px', textAlign: 'center', minHeight: '52px', width: '100%' }}>
                              <h4 style={{
                                fontSize: '12.5px',
                                fontWeight: '600',
                                color: '#E8734A',
                                margin: '0 0 4px 0'
                              }}>
                                {step.title}
                              </h4>
                              <p style={{
                                fontSize: '11.5px',
                                color: 'var(--color-text-secondary)',
                                lineHeight: '1.4',
                                margin: 0
                              }}>
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Right Scroll Arrow (next button) */}
                      {currentMathSteps.length > 4 && showRightArrow && (
                        <button 
                          onClick={() => {
                            if (mathScrollRef.current) {
                              mathScrollRef.current.scrollBy({ left: 258, behavior: 'smooth' });
                            }
                          }}
                        style={{
                          position: 'absolute',
                          right: '-24px',
                          top: '280px',
                          transform: 'translateY(-50%)',
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid rgba(148, 163, 184, 0.15)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          zIndex: 10,
                          color: '#1E293B',
                          transition: 'all 200ms ease',
                          outline: 'none',
                          padding: '0',
                          lineHeight: '0'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', display: 'block', margin: '0 auto' }}>
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                      )}
                    </div>

                    {/* MOBILE/TABLET ONLY: Single Phone Mockup Horizontal Slider */}
                    <div className="block md:hidden">
                      <SinglePhoneSlider steps={currentMathSteps} lang={lang} themeColor="#534AB7" />
                    </div>
                  </div>
                );
              })()}

              {displayInner === 'chinese' && (
                <div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#E8734A',
                    paddingBottom: '8px',
                    borderBottom: '0.5px solid var(--color-border-tertiary)',
                    marginBottom: '16px'
                  }}>
                    {lang === 'zh' ? '依題目性質設計互動形式' : 'Custom Interaction per Subject'}
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

                  {/* DESKTOP/TABLET VIEW: Split Onboarding Switcher Layout */}
                  <div className="hidden md:flex" style={{ gap: '24px', alignItems: 'flex-start', marginTop: '24px' }}>
                    {/* Left Column: Question Types Tabs in Onboarding style */}
                    <div style={{ width: '260px', flexShrink: 0 }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        backgroundColor: '#F4F4F6',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        borderRadius: '24px',
                        padding: '8px'
                      }}>
                        {chineseTypes.map((type, index) => {
                          const isActive = activeChineseType === index;
                          return (
                            <div 
                              key={index}
                              onClick={() => setActiveChineseType(index)}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '14px',
                                padding: '12px 16px',
                                cursor: 'pointer',
                                transition: 'all 200ms ease',
                                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                                borderRadius: '16px',
                                border: isActive ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
                                boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.03)' : 'none'
                              }}
                            >
                              {/* Number Bubble */}
                              <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '6px',
                                backgroundColor: isActive ? '#E8734A' : '#E5E7EB',
                                color: isActive ? '#FFFFFF' : '#8E97A6',
                                fontSize: '10px',
                                fontWeight: '700',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: '2px',
                                transition: 'all 200ms ease'
                              }}>
                                {type.num}
                              </div>
                              {/* Text Info */}
                              <div>
                                <h4 style={{
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: isActive ? '#E8734A' : 'var(--color-text-primary)',
                                  margin: '0 0 1px 0',
                                  transition: 'all 200ms ease'
                                }}>
                                  {type.title}
                                </h4>
                                <p style={{
                                  fontSize: '11px',
                                  color: 'var(--color-text-secondary)',
                                  lineHeight: '1.4',
                                  margin: 0
                                }}>
                                  {lang === 'zh' ? `訓練：${type.train} ｜ 互動：${type.interact}` : `Train: ${type.train} | Interact: ${type.interact}`}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: 3 Phone Mockups side-by-side */}
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
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
                  </div>

                  {/* MOBILE VIEW: Horizontal Tabs Switcher + SinglePhoneSlider */}
                  <div className="block md:hidden">
                    {/* Horizontal capsule tabs */}
                    <div 
                      className="hide-scrollbar"
                      style={{
                        display: 'flex',
                        gap: '8px',
                        overflowX: 'auto',
                        padding: '4px 4px 12px 4px',
                        marginBottom: '16px',
                        width: '100%',
                        WebkitOverflowScrolling: 'touch'
                      }}
                    >
                      {chineseTypes.map((type, index) => {
                        const isActive = activeChineseType === index;
                        return (
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
                            style={{
                              flexShrink: 0,
                              padding: '8px 16px',
                              borderRadius: '9999px',
                              backgroundColor: isActive ? '#1D1D1F' : '#F1F5F9',
                              color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                              fontSize: '12px',
                              fontWeight: isActive ? 600 : 400,
                              cursor: 'pointer',
                              transition: 'all 200ms ease'
                            }}
                          >
                            {type.title}
                          </div>
                        );
                      })}
                    </div>

                    {/* SinglePhoneSlider */}
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
              )}

              {displayInner === 'english' && (
                <div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#E8734A',
                    paddingBottom: '8px',
                    borderBottom: '0.5px solid var(--color-border-tertiary)',
                    marginBottom: '16px'
                  }}>
                    {lang === 'zh' ? '依技能類型分流練習' : 'Split Skill Practice'}
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

                  {/* DESKTOP/TABLET VIEW: Split Onboarding Switcher Layout */}
                  <div className="hidden md:flex" style={{ gap: '24px', alignItems: 'flex-start', marginTop: '24px' }}>
                    {/* Left Column: Question Types Tabs in Onboarding style */}
                    <div style={{ width: '260px', flexShrink: 0 }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        backgroundColor: '#F4F4F6',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        borderRadius: '24px',
                        padding: '8px'
                      }}>
                        {englishTypes.map((type, index) => {
                          const isActive = activeEnglishType === index;
                          return (
                            <div 
                              key={index}
                              onClick={() => setActiveEnglishType(index)}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '14px',
                                padding: '12px 16px',
                                cursor: 'pointer',
                                transition: 'all 200ms ease',
                                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                                borderRadius: '16px',
                                border: isActive ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
                                boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.03)' : 'none'
                              }}
                            >
                              {/* Number Bubble */}
                              <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '6px',
                                backgroundColor: isActive ? '#E8734A' : '#E5E7EB',
                                color: isActive ? '#FFFFFF' : '#8E97A6',
                                fontSize: '10px',
                                fontWeight: '700',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: '2px',
                                transition: 'all 200ms ease'
                              }}>
                                {type.num}
                              </div>
                              {/* Text Info */}
                              <div>
                                <h4 style={{
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: isActive ? '#E8734A' : 'var(--color-text-primary)',
                                  margin: '0 0 1px 0',
                                  transition: 'all 200ms ease'
                                }}>
                                  {type.title}
                                </h4>
                                <p style={{
                                  fontSize: '11px',
                                  color: 'var(--color-text-secondary)',
                                  lineHeight: '1.4',
                                  margin: 0
                                }}>
                                  {lang === 'zh' ? `訓練：${type.train} ｜ 互動：${type.interact}` : `Train: ${type.train} | Interact: ${type.interact}`}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: 3 Phone Mockups side-by-side */}
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
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
                  </div>

                  {/* MOBILE VIEW: Horizontal Tabs Switcher + SinglePhoneSlider */}
                  <div className="block md:hidden">
                    {/* Horizontal capsule tabs */}
                    <div 
                      className="hide-scrollbar"
                      style={{
                        display: 'flex',
                        gap: '8px',
                        overflowX: 'auto',
                        padding: '4px 4px 12px 4px',
                        marginBottom: '16px',
                        width: '100%',
                        WebkitOverflowScrolling: 'touch'
                      }}
                    >
                      {englishTypes.map((type, index) => {
                        const isActive = activeEnglishType === index;
                        return (
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
                            style={{
                              flexShrink: 0,
                              padding: '8px 16px',
                              borderRadius: '9999px',
                              backgroundColor: isActive ? '#1D1D1F' : '#F1F5F9',
                              color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                              fontSize: '12px',
                              fontWeight: isActive ? 600 : 400,
                              cursor: 'pointer',
                              transition: 'all 200ms ease'
                            }}
                          >
                            {type.title}
                          </div>
                        );
                      })}
                    </div>

                    {/* SinglePhoneSlider */}
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
              )}
            </div>
          </div>
        )}

        {displayOuter === '1c' && (
          <div style={{ marginBottom: '64px' }}>

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

            {/* Desktop View: Grid of 4 Phones */}
            <div className="hidden sm:grid feature-mockup-grid">
              {/* 1. 收藏庫 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                  <img 
                    src="projects/mslin-app/screens/question-bank/base1.png" 
                    alt="收藏庫" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </PhoneMockup>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                  {lang === 'zh' ? '收藏庫 — 主動儲存給予自主感' : 'Saved Library - Active saving yields sense of autonomy'}
                </span>
              </div>

              {/* 2. 錯題庫 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                  <img 
                    src="projects/mslin-app/screens/question-bank/base2.png" 
                    alt="錯題庫" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </PhoneMockup>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                  {lang === 'zh' ? '錯題庫 — 中性語言取代負面標籤' : 'Incorrect Library - Neutral language replaces negative labels'}
                </span>
              </div>

              {/* 3. 刷題題目詳情頁 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                  <img 
                    src="projects/mslin-app/screens/question-bank/base3.png" 
                    alt="刷題題目詳情頁" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </PhoneMockup>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                  {lang === 'zh' ? '刷題題目詳情頁 — 提供步驟拆解與標準答案' : 'Practice Details - Step-by-step solving & answers'}
                </span>
              </div>

              {/* 4. 拍照解題題目詳情頁 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PhoneMockup screenStyle={{ backgroundColor: '#D0CCEA' }}>
                  <img 
                    src="projects/mslin-app/screens/question-bank/base4.png" 
                    alt="拍照解題題目詳情頁" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </PhoneMockup>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '8px', lineHeight: '1.4' }}>
                  {lang === 'zh' ? '拍照解題題目詳情頁 — AI 觀念連結與即時解析' : 'Photo Details - AI concept mapping & analysis'}
                </span>
              </div>
            </div>

            {/* Mobile View: SinglePhoneSlider */}
            <div className="block sm:hidden" style={{ width: '100%' }}>
              <SinglePhoneSlider 
                steps={[
                  {
                    src: 'projects/mslin-app/screens/question-bank/base1.png',
                    label: lang === 'zh' ? '收藏庫' : 'Saved Questions',
                    desc: lang === 'zh' ? '主動儲存給予自主感' : 'Active saving yields sense of autonomy'
                  },
                  {
                    src: 'projects/mslin-app/screens/question-bank/base2.png',
                    label: lang === 'zh' ? '錯題庫' : 'Incorrect Questions',
                    desc: lang === 'zh' ? '中性語言取代負面標籤' : 'Neutral language replaces negative labels'
                  },
                  {
                    src: 'projects/mslin-app/screens/question-bank/base3.png',
                    label: lang === 'zh' ? '刷題題目詳情頁' : 'Practice Question Details',
                    desc: lang === 'zh' ? '提供步驟拆解與標準答案' : 'Step-by-step solving & answers'
                  },
                  {
                    src: 'projects/mslin-app/screens/question-bank/base4.png',
                    label: lang === 'zh' ? '拍照解題題目詳情頁' : 'Photo Solved Question Details',
                    desc: lang === 'zh' ? 'AI 觀念連結與即時解析' : 'AI concept mapping & analysis'
                  }
                ]}
                lang={lang}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MsLinFeatureTabs;
