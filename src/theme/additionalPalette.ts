interface AdditionalPalette {
  menu: string;
  menuHoverOpacity: number;
  themeBackground: string;
  itemSelected: string;
  listArrowColor: string;
  listArrowOpacity: number;
  yellowButton: string;
  blueButton: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    additionalPalette: AdditionalPalette;
  }
  interface ThemeOptions {
    additionalPalette?: AdditionalPalette;
  }
}
const COMMONADDITIONAL = {
  button: 0.2,
  menuHoverOpacity: 0.63,
  itemSelected: '#FF8C00',
  listArrowColor: '#000000',
  listArrowOpacity: 0.28,
  yellowButton: '#FFC107',
  blueButton: '##3772FF'
};
const additionalPalette = {
  light: {
    ...COMMONADDITIONAL,
    menu: '#F2F4FA',
    themeBackground: '#F2F4FA'
  },
  dark: {
    ...COMMONADDITIONAL,
    menu: '#141416',
    themeBackground: '#141416'
  }
} as const;

export default additionalPalette;
