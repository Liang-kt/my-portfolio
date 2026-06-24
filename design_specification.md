# 專案區塊標頭設計規範 (Project Section Header Design Specification)

此規範定義了作品集所有案例研究專案（如 Wisdome.ai、Ms Lin App、BrainBox Visual Design 等）之大區塊標頭（Section Header）的視覺樣式與程式碼工版規格，以確保全站視覺層級與品牌形象的一致性。

---

## 1. 視覺設計規範 (Visual Design Guidelines)

所有專案的區塊標頭必須遵循以下統一視覺特徵：

### A. 區塊大數字 (Section Number)
- **字級大小 (Font Size)**：響應式適配，手機端為 `60px`，平板端為 `96px`，桌面端為 `120px`。
- **字型粗細 (Font Weight)**：超粗體（Black / 900）。
- **字型系列 (Font Family)**：`'Inter'`, system-ui, sans-serif。
- **行高與字距 (Line Height & Letter Spacing)**：緊湊行高（`leading-none`），極窄字距（`tracking-tighter`）。
- **色彩 (Color)**：深碳黑色（`#111827`）。
- **間距 (Margin)**：與下方標題字體保持 `16px` (`mb-4`) 間距。

### B. 區塊標題 (Section Title)
- **字級大小 (Font Size)**：響應式適配，手機端為 `24px`，平板端為 `36px`，桌面端為 `40px`。
- **字型粗細 (Font Weight)**：粗體（Bold / 700）。
- **字型系列 (Font Family)**：`'Inter'`, `'Noto Sans TC'`, system-ui, sans-serif。
- **色彩 (Color)**：中性灰藍色（`#4B5563`）。
- **字距 (Letter Spacing)**：窄字距（`tracking-tight`）。

### C. 全域佈局規則 (Global Layout Rules)
- 區塊標頭整體容器底部間距統一為 `40px` (`mb-10`)。
- 設定為無法被滑鼠選取（`select-none`），避免影響使用者互動體驗。
- **禁用裝飾線**：移除標頭底部的任何實線、虛線、陰影或漸層，保持極簡 borderless 的現代美學。

---

## 2. 程式碼工版規格 (Code Template Specification)

全站應統一調用 React 可複用組件，或使用相同的 HTML 結構與 Tailwind CSS 類別編排。

### React 組件工版 (React Component Template)

```jsx
const ProjectSectionHeader = ({ num, title }) => {
  return (
    <div className="flex flex-col mb-10 select-none">
      {/* 區塊大數字 */}
      <h2 className="text-[60px] md:text-[96px] lg:text-[120px] font-black font-['Inter'] leading-none text-[#111827] tracking-tighter mb-4">
        {num}
      </h2>
      {/* 區塊標題 */}
      <h3 className="text-[24px] md:text-[36px] lg:text-[40px] font-bold font-['Inter'] tracking-tight text-[#4B5563]">
        {title}
      </h3>
    </div>
  );
};
```

### 使用範例 (Example Usage)

```jsx
// 01 專案概述 (Bilingual Support)
<ProjectSectionHeader 
  num="01" 
  title={lang === 'zh' ? '專案概述' : 'Project Overview'} 
/>
```

---

## 3. 已套用專案與區塊 (Applied Case Studies)

此規格目前已 100% 覆蓋並套用至以下專案頁面的所有主要章節：
1. **Wisdome.ai 官網設計案** (Section 01 - 06)
2. **Ms Lin 學測刷題 App 案** (Section 01 - 05)
3. **BrainBox 視覺設計案** (Section 01 - 06)
