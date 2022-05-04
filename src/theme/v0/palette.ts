import { alpha } from '@mui/material/styles';

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

interface GradientsPaletteOptions {
  primary: string;
  info: string;
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
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
  interface Palette {
    gradients: GradientsPaletteOptions;
    chart: ChartPaletteOptions;
    header: HeaderColor;
    additional: AdditionalColor;
    customBackground: BackgroundColor;
    collectionSlider: string;
    card: CardOptions;
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
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249'
};

const CUSTOM_PRIMARY = {
  lighter: '#F4F6F8',
  light: '#F4F6F8',
  main: '#454F5B',
  dark: '#212B36',
  darker: '#161C24'
};

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A'
};
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A'
};
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D'
};
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01'
};
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E'
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
  info: createGradient(INFO.light, INFO.main),
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

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...CUSTOM_PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
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
    text: { primary: '#000', secondary: '#637381', disabled: GREY[500] },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action },
    header: {
      background: '#f0f2f5a1',
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
      themeBackground: '#f0f2f5',
      cpCardHeader: '#F4F6F8'
    },
    collectionSlider: '#ffffff',
    card: {
      background: '#ffffff'
    }
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: { primary: '#fff', secondary: '#637381', disabled: GREY[600] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16] },
    action: { active: GREY[500], ...COMMON.action },
    header: {
      background: '#141416a1',
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
    }
  }
} as const;

export default palette;