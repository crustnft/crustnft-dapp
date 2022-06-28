import { alpha } from '@mui/material/styles';
import { HTMLAttributes } from 'react';

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

export type ColorSchema =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error';

interface GradientsPaletteOptions {
  primary: string;
  accent: string;
  tertiary: string;
  success: string;
  warning: string;
  error: string;
}

interface ChartPaletteOptions {
  violet: string[];
  blue: string[];
  green: string[];
  yellow: string[];
  red: string[];
}

interface HeaderColor {
  background: string;
  menuText: string;
  menuTextHover: string;
  walletPopoverBackground: string;
  walletPopoverBoxShadow: string;
  walletPopoverBorderRadius: string;
  walletButtonBorder: string;
  yellowBorder: string;
}

interface AdditionalColor {
  button: number;
  menuHoverOpacity: number;
  itemSelected: string;
  listArrowColor: string;
  listArrowOpacity: number;
  yellowButton: string;
  blueButton: string;
}

interface BackgroundColor {
  menu: string;
  themeBackground: string;
  cpCardHeader: string;
}

interface CardOptions {
  background: string;
}

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    neutral: string;
  }
  interface PaletteColor {
    lighter: string;
    neutral: string;
  }

  interface CustomCSS {
    [key: string]: CustomCSS;
  }
  interface Palette {
    gradients: GradientsPaletteOptions;
    chart: ChartPaletteOptions;
    header: HeaderColor;
    additional: AdditionalColor;
    customBackground: BackgroundColor;
    collectionSlider: string;
    card: CardOptions;
    textField: HTMLAttributes<HTMLElement>;
    tertiary: PaletteColor;
    accent: PaletteColor;
    customCSS: CustomCSS;
  }
  interface PaletteOptions {
    gradients?: GradientsPaletteOptions;
    chart?: ChartPaletteOptions;
    header?: HeaderColor;
    additional?: AdditionalColor;
    customBackground?: BackgroundColor;
    collectionSlider?: string;
    card?: CardOptions;
  }
}

declare module '@mui/material' {
  interface Color {
    0: string;
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
  }
}

// SETUP COLORS
const PRIMARY = {
  lighter: '#FBEDDD',
  light: '#FBC27C',
  main: '#FF8C00',
  neutral: '#FDA232',
  dark: '#DF7B00'
};

const SECONDARY = {
  lighter: '#E3EBF3',
  light: '#9EB6CE',
  main: '#143F6B',
  neutral: '#58799B',
  dark: '#0E2E4E'
};
const TERTIARY = {
  lighter: '#F8EDEC',
  light: '#FABBB2',
  main: '#FE7E6D',
  neutral: '#FC9789',
  dark: '#DC6C5D'
};
const ACCENT = {
  lighter: '#E5F2F8',
  light: '#ACDDF1',
  main: '#3CB3E7',
  neutral: '#75C8ED',
  dark: '#329BC9'
};
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  neutral: '#229A16',
  dark: '#08660D'
};
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  neutral: '#B78103',
  dark: '#7A4F01'
};
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  neutral: '#B72136',
  dark: '#7A0C2E'
};

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8)
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  accent: createGradient(ACCENT.light, ACCENT.main),
  tertiary: createGradient(TERTIARY.light, TERTIARY.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main)
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4']
};

export const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  tertiary: { ...TERTIARY, contrastText: '#fff' },
  accent: { ...ACCENT, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[200],
  customCSS: {
    buttonHeader: {
      minWidth: '111px',
      height: '44px',
      borderRadius: '8px',
      p: '11px 22px !important'
    }
  },
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  },
  additional: {
    button: 0.2,
    menuHoverOpacity: 0.63,
    itemSelected: '#FF8C00',
    listArrowColor: '#000000',
    listArrowOpacity: 0.28,
    yellowButton: '#FFC107',
    blueButton: '#3772FF'
  }
};

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    text: { primary: GREY[800], secondary: GREY[700], header: SECONDARY.main, disabled: GREY[500] },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action },
    header: {
      background: GREY[0],
      menuText: '#0000004d',
      menuTextHover: '#000000',
      walletPopoverBackground: '#FCFCFD',
      walletPopoverBoxShadow: '0px 0px 95px rgba(0, 0, 0, 0.25)',
      walletPopoverBorderRadius: '30px',
      walletButtonBorder: '2px solid',
      yellowBorder: '3.5px solid #FF8C00'
    },
    customBackground: {
      menu: '#F2F4FA',
      themeBackground: '#fff',
      cpCardHeader: '#F4F6F8'
    },
    collectionSlider: '#ffffff',
    card: {
      background: '#ffffff'
    },
    textField: {
      borderColor: GREY[300]
    }
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: { primary: GREY[0], secondary: GREY[300], header: SECONDARY.light, disabled: GREY[600] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16] },
    action: { active: GREY[500], ...COMMON.action },
    header: {
      background: '#161C24',
      menuText: '#ffffff4d',
      menuTextHover: '#000000',
      walletPopoverBackground: '#23262F',
      walletPopoverBoxShadow: '0px 0px 95px rgba(0, 0, 0, 0.25)',
      walletPopoverBorderRadius: '30px',
      walletButtonBorder: '2px solid',
      yellowBorder: '3.5px solid #FF8C00'
    },
    customBackground: {
      menu: '#141416',
      themeBackground: '#141416',
      cpCardHeader: '#161C24'
    },
    collectionSlider: '#23262F',
    card: {
      background: '#1d1f25'
    },
    textField: {
      borderColor: GREY[600]
    }
  }
} as const;

export default palette;
