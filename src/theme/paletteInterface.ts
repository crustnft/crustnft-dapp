import { Palette as MuiPalette } from '@mui/material/styles/createPalette';

export interface Palette extends MuiPalette {
  menu: TypeMenu;
  themeBackground: String;
  item: TypeItem;
  listArrow: TypeArrow;
  button: TypeButton;
}

export interface TypeMenu {
  background: string;
  hoverOpacity: number;
}

export interface TypeItem {
  selected: string;
}

export interface TypeArrow {
  color: string;
  opacity: number;
}

export interface TypeButton {
  blue: string;
  yellow: number;
}
