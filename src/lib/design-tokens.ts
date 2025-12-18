/**
 * ========================================
 * BOLTINSIGHT DESIGN TOKENS
 * ========================================
 *
 * Tüm tasarım değerlerinin tek kaynağı.
 * Bu dosyayı değiştirerek tüm uygulamadaki stilleri güncelleyebilirsiniz.
 *
 * KULLANIM:
 * import { colors, typography, spacing, ... } from '@/lib/design-tokens';
 */

// ==========================================
// COLORS - Renk Paleti
// ==========================================

export const colors = {
  // Brand Primary - Purple
  brand: {
    purple: {
      900: '#100E28',
      800: '#1A163C',
      700: '#231E51',
      600: '#5B50BD',
      500: '#918AD3',
      400: '#C8C4E9',
      300: '#EDE9F9',
    },
    // Brand Teal
    teal: {
      900: '#0E6B5D',
      800: '#14A08C',
      600: '#1ED6BB',
      400: '#73EBD9',
      200: '#A1F1E6',
      100: '#D0F8F2',
    },
    // Brand Red
    red: {
      900: '#860E24',
      800: '#CA1636',
      600: '#EB3F5F',
      400: '#F38B9F',
      200: '#F7B2BF',
      100: '#FBD8DF',
    },
  },

  // Neutral Grays
  gray: {
    900: '#232323',
    800: '#374151',
    700: '#393939',
    600: '#5A5A5A',
    500: '#919191',
    400: '#9ca3af',
    300: '#C8C8C8',
    200: '#e5e7eb',
    100: '#E9E9E9',
    50: '#f9fafb',
  },

  // Slate
  slate: {
    900: '#252A31',
    800: '#383F4A',
    700: '#334155',
    600: '#4B5563',
    500: '#8C97A8',
    400: '#94a3b8',
    300: '#B1BAC5',
    200: '#e2e8f0',
    100: '#D8DCE2',
  },

  // Semantic Colors
  semantic: {
    success: '#1ED6BB',
    successLight: '#d1fae5',
    successDark: '#059669',
    error: '#EB3F5F',
    errorLight: '#fee2e2',
    errorDark: '#dc2626',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
    warningDark: '#d97706',
    info: '#3b82f6',
    infoLight: '#dbeafe',
    infoDark: '#2563eb',
  },

  // Background Colors
  background: {
    light: {
      primary: '#ffffff',
      secondary: '#F6F8F8',
      tertiary: '#f9fafb',
      card: '#ffffff',
      sidebar: '#F6F8F8',
      input: '#ffffff',
      hover: '#f3f4f6',
    },
    dark: {
      primary: '#100E28',
      secondary: '#1A163C',
      tertiary: '#1e293b',
      card: '#1A163C',
      sidebar: '#1A163C',
      input: '#1e293b',
      hover: '#334155',
    },
  },

  // Text Colors
  text: {
    light: {
      primary: '#231E51',
      secondary: '#5A5A5A',
      tertiary: '#919191',
      muted: '#9ca3af',
      inverse: '#ffffff',
    },
    dark: {
      primary: '#E9E9E9',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
      muted: '#64748b',
      inverse: '#100E28',
    },
  },

  // Border Colors
  border: {
    light: {
      primary: '#C8C4E9',
      secondary: '#e5e7eb',
      tertiary: '#d1d5db',
    },
    dark: {
      primary: '#231E51',
      secondary: '#334155',
      tertiary: '#475569',
    },
  },
};

// ==========================================
// STATUS COLORS - Durum Renkleri
// ==========================================

export const statusColors = {
  // Light Mode (On Light Background)
  light: {
    draft: {
      background: '#e5e7eb',
      text: '#374151',
    },
    pending_approval: {
      background: '#fef3c7',
      text: '#92400e',
    },
    approved: {
      background: '#d1fae5',
      text: '#065f46',
    },
    rejected: {
      background: '#fee2e2',
      text: '#991b1b',
    },
    on_hold: {
      background: '#e2e8f0',
      text: '#334155',
    },
    deleted: {
      background: '#e5e7eb',
      text: '#6b7280',
    },
  },

  // Dark Mode (On Dark Background)
  dark: {
    draft: {
      background: '#4b5563',
      text: '#ffffff',
    },
    pending_approval: {
      background: '#d97706',
      text: '#ffffff',
    },
    approved: {
      background: '#059669',
      text: '#ffffff',
    },
    rejected: {
      background: '#dc2626',
      text: '#ffffff',
    },
    on_hold: {
      background: '#475569',
      text: '#ffffff',
    },
    deleted: {
      background: '#4b5563',
      text: '#ffffff',
    },
  },
};

// ==========================================
// TYPOGRAPHY - Tipografi
// ==========================================

export const typography = {
  // Font Family
  fontFamily: {
    sans: "'Montserrat', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
  },

  // Font Sizes
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
  },

  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },

  // Text Hierarchy
  hierarchy: {
    h1: {
      fontSize: '1.5rem',      // 24px
      fontWeight: '600',
      lineHeight: '1.25',
    },
    h2: {
      fontSize: '1.25rem',     // 20px
      fontWeight: '600',
      lineHeight: '1.25',
    },
    h3: {
      fontSize: '1.125rem',    // 18px
      fontWeight: '600',
      lineHeight: '1.375',
    },
    h4: {
      fontSize: '1rem',        // 16px
      fontWeight: '600',
      lineHeight: '1.5',
    },
    body: {
      fontSize: '0.875rem',    // 14px
      fontWeight: '400',
      lineHeight: '1.5',
    },
    bodySmall: {
      fontSize: '0.75rem',     // 12px
      fontWeight: '400',
      lineHeight: '1.5',
    },
    caption: {
      fontSize: '0.625rem',    // 10px
      fontWeight: '400',
      lineHeight: '1.5',
    },
    label: {
      fontSize: '0.875rem',    // 14px
      fontWeight: '500',
      lineHeight: '1.25',
    },
  },
};

// ==========================================
// SPACING - Boşluklar
// ==========================================

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
};

// ==========================================
// BORDER RADIUS - Köşe Yuvarlama
// ==========================================

export const borderRadius = {
  none: '0',
  sm: '0.125rem',    // 2px
  default: '0.25rem', // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
};

// ==========================================
// SHADOWS - Gölgeler
// ==========================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // Custom Shadows
  card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  cardHover: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  dropdown: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  modal: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  button: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  buttonHover: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
};

// ==========================================
// GLOW EFFECTS - Parlaklık Efektleri
// ==========================================

export const glowEffects = {
  none: 'none',
  primary: '0 0 20px rgba(91, 80, 189, 0.3)',
  primaryStrong: '0 0 30px rgba(91, 80, 189, 0.5)',
  success: '0 0 20px rgba(30, 214, 187, 0.3)',
  error: '0 0 20px rgba(235, 63, 95, 0.3)',
  white: '0 0 20px rgba(255, 255, 255, 0.2)',

  // Focus Glow
  focusPrimary: '0 0 0 3px rgba(91, 80, 189, 0.2)',
  focusError: '0 0 0 3px rgba(235, 63, 95, 0.2)',
  focusSuccess: '0 0 0 3px rgba(30, 214, 187, 0.2)',
};

// ==========================================
// MOTION / ANIMATION - Animasyon
// ==========================================

export const motion = {
  // Duration
  duration: {
    instant: '0ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
    slowest: '700ms',
  },

  // Easing
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Transitions
  transition: {
    none: 'none',
    all: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color 200ms, background-color 200ms, border-color 200ms',
    opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Keyframes (for CSS)
  keyframes: {
    pulse: `
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    `,
    bounce: `
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    `,
    slideUp: `
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    `,
    slideIn: `
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    `,
    fadeIn: `
      from { opacity: 0; }
      to { opacity: 1; }
    `,
    scaleIn: `
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    `,
  },
};

// ==========================================
// Z-INDEX - Katman Sıralaması
// ==========================================

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
  dropdown_portal: 9999,
};

// ==========================================
// BUTTON SIZES - Buton Boyutları
// ==========================================

export const buttonSizes = {
  xs: {
    height: '1.75rem',      // 28px
    paddingX: '0.5rem',     // 8px
    fontSize: '0.75rem',    // 12px
    iconSize: '0.875rem',   // 14px
  },
  sm: {
    height: '2rem',         // 32px
    paddingX: '0.75rem',    // 12px
    fontSize: '0.875rem',   // 14px
    iconSize: '1rem',       // 16px
  },
  md: {
    height: '2.5rem',       // 40px
    paddingX: '1rem',       // 16px
    fontSize: '0.875rem',   // 14px
    iconSize: '1.25rem',    // 20px
  },
  lg: {
    height: '2.75rem',      // 44px
    paddingX: '1.5rem',     // 24px
    fontSize: '1rem',       // 16px
    iconSize: '1.25rem',    // 20px
  },
  xl: {
    height: '3rem',         // 48px
    paddingX: '2rem',       // 32px
    fontSize: '1rem',       // 16px
    iconSize: '1.5rem',     // 24px
  },
};

// ==========================================
// BUTTON VARIANTS - Buton Varyantları
// ==========================================

export const buttonVariants = {
  primary: {
    light: {
      background: '#5B50BD',
      text: '#ffffff',
      border: 'transparent',
      hoverBackground: '#4A41A0',
      activeBackground: '#3D3688',
    },
    dark: {
      background: '#5B50BD',
      text: '#ffffff',
      border: 'transparent',
      hoverBackground: '#6B5FD3',
      activeBackground: '#7B6FE3',
    },
  },
  secondary: {
    light: {
      background: '#f3f4f6',
      text: '#374151',
      border: 'transparent',
      hoverBackground: '#e5e7eb',
      activeBackground: '#d1d5db',
    },
    dark: {
      background: '#374151',
      text: '#f3f4f6',
      border: 'transparent',
      hoverBackground: '#4b5563',
      activeBackground: '#6b7280',
    },
  },
  outline: {
    light: {
      background: 'transparent',
      text: '#374151',
      border: '#d1d5db',
      hoverBackground: '#f9fafb',
      activeBackground: '#f3f4f6',
    },
    dark: {
      background: 'transparent',
      text: '#e5e7eb',
      border: '#4b5563',
      hoverBackground: '#1f2937',
      activeBackground: '#374151',
    },
  },
  ghost: {
    light: {
      background: 'transparent',
      text: '#374151',
      border: 'transparent',
      hoverBackground: '#f3f4f6',
      activeBackground: '#e5e7eb',
    },
    dark: {
      background: 'transparent',
      text: '#e5e7eb',
      border: 'transparent',
      hoverBackground: '#374151',
      activeBackground: '#4b5563',
    },
  },
  destructive: {
    light: {
      background: '#dc2626',
      text: '#ffffff',
      border: 'transparent',
      hoverBackground: '#b91c1c',
      activeBackground: '#991b1b',
    },
    dark: {
      background: '#dc2626',
      text: '#ffffff',
      border: 'transparent',
      hoverBackground: '#ef4444',
      activeBackground: '#f87171',
    },
  },
};

// ==========================================
// INPUT FIELD SIZES - Input Boyutları
// ==========================================

export const inputSizes = {
  sm: {
    height: '2rem',         // 32px
    paddingX: '0.75rem',    // 12px
    fontSize: '0.875rem',   // 14px
  },
  md: {
    height: '2.5rem',       // 40px
    paddingX: '1rem',       // 16px
    fontSize: '0.875rem',   // 14px
  },
  lg: {
    height: '2.75rem',      // 44px
    paddingX: '1rem',       // 16px
    fontSize: '1rem',       // 16px
  },
};

// ==========================================
// INPUT VARIANTS - Input Varyantları
// ==========================================

export const inputVariants = {
  default: {
    light: {
      background: '#ffffff',
      text: '#374151',
      placeholder: '#9ca3af',
      border: '#d1d5db',
      borderFocus: '#5B50BD',
      ring: 'rgba(91, 80, 189, 0.2)',
    },
    dark: {
      background: '#1e293b',
      text: '#f1f5f9',
      placeholder: '#64748b',
      border: '#475569',
      borderFocus: '#5B50BD',
      ring: 'rgba(91, 80, 189, 0.2)',
    },
  },
  error: {
    light: {
      background: '#ffffff',
      text: '#374151',
      placeholder: '#9ca3af',
      border: '#dc2626',
      borderFocus: '#dc2626',
      ring: 'rgba(220, 38, 38, 0.2)',
    },
    dark: {
      background: '#1e293b',
      text: '#f1f5f9',
      placeholder: '#64748b',
      border: '#dc2626',
      borderFocus: '#dc2626',
      ring: 'rgba(220, 38, 38, 0.2)',
    },
  },
};

// ==========================================
// ICON SIZES - İkon Boyutları
// ==========================================

export const iconSizes = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  md: '1rem',        // 16px
  lg: '1.25rem',     // 20px
  xl: '1.5rem',      // 24px
  '2xl': '2rem',     // 32px
  '3xl': '2.5rem',   // 40px
  '4xl': '3rem',     // 48px
};

// ==========================================
// BREAKPOINTS - Responsive Kırılım Noktaları
// ==========================================

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ==========================================
// SIDEBAR - Sidebar Boyutları
// ==========================================

export const sidebar = {
  width: {
    collapsed: '4rem',      // 64px
    expanded: '18rem',      // 288px
  },
  mobileWidth: '85%',
  maxMobileWidth: '320px',
};

// ==========================================
// DARK THEME SPECS - Dark Mode Özellikleri
// ==========================================

export const darkTheme = {
  // Override Colors
  background: {
    page: '#100E28',
    card: '#1A163C',
    cardHover: '#231E51',
    input: '#1e293b',
    dropdown: '#1e293b',
    modal: '#1A163C',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
  },

  // Text Colors
  text: {
    primary: '#E9E9E9',
    secondary: '#cbd5e1',
    tertiary: '#94a3b8',
    muted: '#64748b',
    link: '#918AD3',
    linkHover: '#C8C4E9',
  },

  // Border Colors
  border: {
    primary: '#231E51',
    secondary: '#334155',
    focus: '#5B50BD',
  },

  // Scrollbar
  scrollbar: {
    track: '#1e293b',
    thumb: '#475569',
    thumbHover: '#64748b',
  },

  // Specific Component Overrides
  components: {
    sidebar: {
      background: '#1A163C',
      itemHover: '#231E51',
      itemActive: '#231E51',
    },
    header: {
      background: '#1A163C',
      border: '#231E51',
    },
    tooltip: {
      background: '#1e293b',
      text: '#f1f5f9',
    },
  },
};

// ==========================================
// CARD VARIANTS - Kart Stilleri
// ==========================================

export const cardVariants = {
  default: {
    light: {
      background: '#ffffff',
      border: '#e5e7eb',
      text: '#374151',
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      hoverShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    dark: {
      background: '#1e293b',
      border: '#334155',
      text: '#f1f5f9',
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.3)',
      hoverShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
    },
  },
};

// ==========================================
// MODAL VARIANTS - Modal Stilleri
// ==========================================

export const modalVariants = {
  default: {
    light: {
      background: '#ffffff',
      border: '#e5e7eb',
      text: '#374151',
      titleText: '#111827',
      overlay: 'rgba(0, 0, 0, 0.5)',
      shadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    },
    dark: {
      background: '#1e293b',
      border: '#334155',
      text: '#e5e7eb',
      titleText: '#f9fafb',
      overlay: 'rgba(0, 0, 0, 0.7)',
      shadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
    },
  },
};

// ==========================================
// SELECT VARIANTS - Select Stilleri
// ==========================================

export const selectVariants = {
  default: {
    light: {
      background: '#ffffff',
      border: '#d1d5db',
      text: '#374151',
      placeholder: '#9ca3af',
      focusBorder: '#5B50BD',
      focusRing: 'rgba(91, 80, 189, 0.2)',
      optionBackground: '#ffffff',
      optionHover: '#f3f4f6',
      optionSelected: '#EDE9F9',
    },
    dark: {
      background: '#1e293b',
      border: '#475569',
      text: '#f1f5f9',
      placeholder: '#64748b',
      focusBorder: '#5B50BD',
      focusRing: 'rgba(91, 80, 189, 0.2)',
      optionBackground: '#1e293b',
      optionHover: '#334155',
      optionSelected: '#231E51',
    },
  },
};

// ==========================================
// TEXTAREA VARIANTS - Textarea Stilleri
// ==========================================

export const textareaVariants = {
  default: {
    light: {
      background: '#ffffff',
      border: '#d1d5db',
      text: '#374151',
      placeholder: '#9ca3af',
      focusBorder: '#5B50BD',
      focusRing: 'rgba(91, 80, 189, 0.2)',
    },
    dark: {
      background: '#1e293b',
      border: '#475569',
      text: '#f1f5f9',
      placeholder: '#64748b',
      focusBorder: '#5B50BD',
      focusRing: 'rgba(91, 80, 189, 0.2)',
    },
  },
};

// ==========================================
// TABS VARIANTS - Tab Stilleri
// ==========================================

export const tabsVariants = {
  default: {
    light: {
      listBackground: '#f3f4f6',
      triggerText: '#6b7280',
      triggerHover: '#374151',
      triggerActive: '#5B50BD',
      triggerActiveBackground: '#ffffff',
      contentBackground: 'transparent',
    },
    dark: {
      listBackground: '#1e293b',
      triggerText: '#9ca3af',
      triggerHover: '#e5e7eb',
      triggerActive: '#918AD3',
      triggerActiveBackground: '#334155',
      contentBackground: 'transparent',
    },
  },
};

// ==========================================
// TOAST VARIANTS - Toast Stilleri
// ==========================================

export const toastVariants = {
  success: {
    light: {
      background: '#ffffff',
      border: '#d1fae5',
      iconColor: '#059669',
      titleColor: '#065f46',
      messageColor: '#047857',
    },
    dark: {
      background: '#1e293b',
      border: '#064e3b',
      iconColor: '#34d399',
      titleColor: '#6ee7b7',
      messageColor: '#a7f3d0',
    },
  },
  error: {
    light: {
      background: '#ffffff',
      border: '#fee2e2',
      iconColor: '#dc2626',
      titleColor: '#991b1b',
      messageColor: '#b91c1c',
    },
    dark: {
      background: '#1e293b',
      border: '#7f1d1d',
      iconColor: '#f87171',
      titleColor: '#fca5a5',
      messageColor: '#fecaca',
    },
  },
  warning: {
    light: {
      background: '#ffffff',
      border: '#fef3c7',
      iconColor: '#d97706',
      titleColor: '#92400e',
      messageColor: '#b45309',
    },
    dark: {
      background: '#1e293b',
      border: '#78350f',
      iconColor: '#fbbf24',
      titleColor: '#fcd34d',
      messageColor: '#fde68a',
    },
  },
  info: {
    light: {
      background: '#ffffff',
      border: '#dbeafe',
      iconColor: '#2563eb',
      titleColor: '#1e40af',
      messageColor: '#1d4ed8',
    },
    dark: {
      background: '#1e293b',
      border: '#1e3a8a',
      iconColor: '#60a5fa',
      titleColor: '#93c5fd',
      messageColor: '#bfdbfe',
    },
  },
};

// ==========================================
// DROPDOWN VARIANTS - Dropdown Stilleri
// ==========================================

export const dropdownVariants = {
  default: {
    light: {
      background: '#ffffff',
      border: '#e5e7eb',
      shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      itemText: '#374151',
      itemHover: '#f3f4f6',
      itemActive: '#EDE9F9',
      separator: '#e5e7eb',
      dangerText: '#dc2626',
      dangerHover: '#fee2e2',
    },
    dark: {
      background: '#1e293b',
      border: '#334155',
      shadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)',
      itemText: '#e5e7eb',
      itemHover: '#334155',
      itemActive: '#231E51',
      separator: '#334155',
      dangerText: '#f87171',
      dangerHover: '#7f1d1d',
    },
  },
};

// ==========================================
// EXPORTS - Tüm Değerlerin Birleşimi
// ==========================================

export const designTokens = {
  colors,
  statusColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  glowEffects,
  motion,
  zIndex,
  buttonSizes,
  buttonVariants,
  inputSizes,
  inputVariants,
  iconSizes,
  breakpoints,
  sidebar,
  darkTheme,
  cardVariants,
  modalVariants,
  selectVariants,
  textareaVariants,
  tabsVariants,
  toastVariants,
  dropdownVariants,
};

export default designTokens;
