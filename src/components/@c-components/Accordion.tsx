import { Accordion as AccordionMUI, AccordionProps } from '@mui/material';

const Accordion = ({ children, ...other }: AccordionProps) => {
  return <AccordionMUI {...other}>{children}</AccordionMUI>;
};
export default Accordion;
