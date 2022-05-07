import { Theme } from '@mui/material/styles';
import Button from './Button';
import Tab from './Tab';
import Tabs from './Tabs';

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(Button(theme), Tab(theme), Tabs(theme));
}
