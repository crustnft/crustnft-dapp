import { Typography, Grid } from '@mui/material';
import { ArgsProps } from './svgArgs';
function SvgComponent({ qrcode, title, others }: ArgsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 725 438"
      {...others}
    >
      <defs>
        {/* Diagonal grid */}
        <linearGradient
          id="prefix__linear-gradient"
          x1={6.79}
          y1={219}
          x2={835.36}
          y2={219}
          gradientTransform="matrix(.87 0 0 .87 -5.94 27.38)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#b48a4e" />
          <stop offset={0.03} stopColor="#c49f60" />
          <stop offset={0.08} stopColor="#e4c884" />
          <stop offset={0.12} stopColor="#f8e29a" />
          <stop offset={0.15} stopColor="#ffeba2" />
          <stop offset={0.39} stopColor="#c9a666" />
          <stop offset={0.45} stopColor="#dbbc74" />
          <stop offset={0.57} stopColor="#ffe790" />
          <stop offset={0.82} stopColor="#b48a4e" />
          <stop offset={0.93} stopColor="#805c38" />
          <stop offset={1} stopColor="#65442d" />
        </linearGradient>
        {/* Central Rectangle border*/}
        <linearGradient
          id="prefix__linear-gradient-2"
          x1={50.5}
          y1={246}
          x2={674.5}
          y2={246}
          gradientTransform="rotate(-90 362.5 246)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#a28b5e" />
          <stop offset={0.25} stopColor="#fee7b5" />
          <stop offset={0.5} stopColor="#a28b5e" />
          <stop offset={0.75} stopColor="#fee7b5" />
          <stop offset={1} stopColor="#a28b5e" />
        </linearGradient>
        {/* Gradient inside central rectangle*/}
        <linearGradient
          id="prefix__linear-gradient-3"
          x1={56.34}
          y1={384.35}
          x2={666.12}
          y2={108.8}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#a28b5e" />
          <stop offset={0.25} stopColor="#fee7b5" />
          <stop offset={0.5} stopColor="#a28b5e" />
          <stop offset={1} stopColor="#fee7b5" />
        </linearGradient>
        {/* Vertical line*/}
        <linearGradient
          id="prefix__linear-gradient-4"
          x1={387.44}
          y1={248.16}
          x2={387.94}
          y2={248.16}
          xlinkHref="#prefix__linear-gradient"
        />
        {/* Horizontal line*/}
        <linearGradient
          id="prefix__linear-gradient-5"
          x1={485.23}
          y1={232.78}
          x2={569.87}
          y2={192.35}
          xlinkHref="#prefix__linear-gradient-3"
        />

        <style>
          {
            '.prefix__cls-1{fill:none}.prefix__cls-2{isolation:isolate}.prefix__cls-4{fill:#4d9cfe}.prefix__cls-60{fill:#fff}.prefix__cls-67{fill:#1c1b1a}'
          }
        </style>
      </defs>
      <g className="prefix__cls-2">
        <g id="prefix__Layer_1" data-name="Layer 1">
          <g clipPath="url(#prefix__clip-path-2)">
            <path d="M1.5 0h725v438H1.5z" />
            <g opacity={0.15}>
              <path
                className="prefix__cls-60"
                d="M64.26 264c79.17 138.52 161 269 255 77.59 12.87-24.62 22.25-72.44 43.24-72.44v.24c21 0 30.37 47.84 43.24 72.44 94 191.42 175.83 60.93 255-77.57 6-10.46 11.68-20.43 16.58-29.09C495.89 350 511.16 3 362.5.24V0C213.84 2.75 229.11 349.72 47.68 234.88c4.9 8.66 10.63 18.63 16.58 29.07M54.53 0a82.13 82.13 0 1082.12 82.13A82.13 82.13 0 0054.53 0zM670.47 0a82.13 82.13 0 1082.13 82.13A82.12 82.12 0 00670.47 0z"
              />
            </g>
            <path
              d="M725 155.31l-7.41 7.41 7.41 7.41v1.34l-8.08-8.08-24.17-24.17h-24l-23.31-23.31v22.64l23.7 23.7h24L716.92 186l8.08 8.08v1.33l-8.08-8.08-24.17-24.17h-24l-24.25-24.25V115l-47.92-48V43l-23.5-23.5-.67-.67.67-.67 23.78-23.72h24l2-2h1.33l-2.94 2.94h-24l-23.5 23.5 23.77 23.78v24l48 48 23.7 23.7h24L717 162.13l8-8.13zM693.42 67l-23.31 23.33h22.64l23.7-23.7V41.71l8.55 8.56v1.33l-7.61-7.6v22.63l7.61 7.61v1.34l-8.08-8.09-23.31 23.31 23.31 23.31L725 106v1.34l-7.61 7.66v24.92l-24.64-24.64h-24L645 91.47 620.55 67V43l-24.64-24.59h24.92l.2-.2 23.5-23.5v-2.27h.94v2.27l24.17 24.17-24.17 24.17V67.3h-.94V43.05l-23.7-23.7h-22.64l23.31 23.31v24L645 90.13l23.5-23.5v-24l23.78-23.78L668.5-4.9v-2.66h.94v2.27L693 18.21l.66.67-.66.67-23.51 23.5V67l-23.82 23.8 23.5 23.5h24l23.31 23.31V115L693 91.47l-.2-.2h-24.97l24.64-24.64v-24l23.78-23.78L692.47-4.9v-2.66h.95v2.27l23.5 23.5 8.08 8.08v1.34l-8.08-8.08-23.5 23.5zm-71.73-48.12L645 42.19l23.3-23.31L645-4.43zm94.76 263.9v-24l-23.7-23.7h-22.64l23.31 23.31v24l23.5 23.5.67.67-24.17 24.17v24L670.11 378h22.64l23.5-23.5.2-.2v-24l8.55-8.55v1.33l-7.61 7.61v22.64l7.61-7.61v1.33l-7.61 7.61-.47.48-23.31 23.3 23.31 23.31.67.66 7.41 7.42v1.33l-8.08-8.08-.67-.67L693 379.15l-.2-.2h-24.97l24.64-24.64v-24l23.78-23.78-23.78-23.78v-24l-23.69-23.7-.48-.47-23.3-23.24-24.17-24.17h-24l-23.78-23.78-23.5 23.5v24l-23.75 23.75 23.78 23.78v24l23.5 23.5 23.5-23.5v-24l23.31-23.31h-22.64l-23.7 23.7v24.25h-.94v-24.25l-24.17-24.17 24.17-24.17v-24.92l24.64 24.65h24L645 234l24.44 24.45v24l24.17 24.17-24.17 24.17v24l-23.77 23.78 23.5 23.5h24l23.78 23.78.67.67 3.24 3.24c-.16.28-.32.57-.49.84l-3.42-3.41-.67-.67-23.5-23.5h-24L645 379.15l-23.78 23.78h-24l-23.7 23.69-.47.48-18.47 18.46h-1.33l19.13-19.13.2-.2v-24l23.77-23.78-23.3-23.3L549.3 379l-23.7 23.7v24l-18.94 18.94h-1.33l19.33-19.33v-24L548 379h-22.67l-24.17 24.17v-1.33L524.94 378h24l.2-.2 24-24 24.11 24.2h24.25v1h-24.25l-23.7 23.7v22.64L596.86 402h24l23.5-23.5-23.53-23.5h-24l-23.75-23.8L549.3 355h-24.64v-1h24.25l23.5-23.51.67-.66.67.66 23.5 23.51h24L645 377.81l23.5-23.5v-24l23.78-23.78-23.78-23.75v-24L645 235.31l-23.5 23.5v24l-23.31 23.31h22.64l23.7-23.7v-24.28h.94v24.25l23.5 23.5.67.67-24 24-.2.2v24.92L620.83 331h-24l-23.78-23.78L549.3 331h-24l-24.17 24.17v-1.34l23.78-23.78h24l23.5-23.5-23.78-23.78v-24l-23.5-23.5-.67-.67 24.17-24.17v-24l24.45-24.45 24.17 24.17h24L645 210l24.17 24.17h24l24.25 24.25v24L725 290v1.34zm-94.76 23.78L645 329.87l23.3-23.31-23.3-23.3zm-25.31-71.92l-23.3-23.3-23.31 23.3L573.08 258zm-22.63 71.92l23.5 23.5h24l23.31 23.31v-22.64L620.83 307h-24.92l24.64-24.64v-24l23.78-23.78-23.5-23.5h-24l-23.31-23.31v22.64l23.7 23.7h24.91l-24.64 24.64v24zm71.92 119.87l-.67-.67-.67.67-19.13 19.13h1.33L645 427.1l18.47 18.46h1.33zm63.1 15.16L693.14 426h-24l-23.5-23.51-.67-.66-.67.66L620.83 426h-24l-19.61 19.6h1.33l18.67-18.66h24L645 403.12l23.78 23.78h24l15.15 15.15zM725 369.73l-8.08 8.08-.67.67.67.67 8.08 8.08v-1.33l-7.41-7.42 7.41-7.41zm-151.25 8.75l-.67-.67-24.45 24.45v24l-19.33 19.3h1.34l18.94-18.94v-24zM22.17-4.9v-1.24l-1 .32v.53L1.47 14.46c-.19.62-.37 1.24-.52 1.86zm262.76-2.66v3.61l3.61-3.61h-1.34l-1.33 1.33v-1.33zm192.73 218.7V186.5l-23.78-23.78 23.78-23.78V115l23.5-23.5.67-.66-.67-.66-23.78-23.82h-24l-24.14-24.17-24.17 24.17h-24L356.65 90.8l.67.67 24.17-24.17h24l23.78-23.78L453 67.3h24l23.5 23.5-23.77 23.78v24l-23.5 23.5-.67.67.67.67 23.5 23.5v24.25zM725 242.06v1.33l-8.08-8.08-.67-.67-23.5-23.5h-24L645 187.36l-24-24-.2-.2h-24l-23.78-23.78-23.31 23.31-24.11 24.2v24l-23.77 23.78 23.77 23.78v24L550.24 307h-24.91l-24.17 24.2-24.64-24.64-23.78-23.78v-24l-24.17-24.17.67-.67 24.45 24.45v24l24.17 24.17 23.3 23.31 23.3-23.31-23.3-23.3v-1.34l24.17 24.17H548l-23.31-23.31v-24l-23.5-23.5-.67-.66.67-.66 23.5-23.5v-24L548 163.19h-22.67l-24.17 24.17-24-24-.67-.67.67-.67 24-24 23.78-23.78h24l23.5-23.5L548.63 67V43l-23.5-23.5-.67-.67.67-.67 23.5-23.5v-2.22h1v2.66L525.8 18.88l23.78 23.78v24l23.5 23.5 24.44 24.45v24l24.17 24.17L645 186l24.17 24.17h24L716.92 234zm-105.11-79.81l-23.31-23.31V115l-23.5-23.5-23.78 23.75h-24l-24.17 24.16-23.3 23.31L501.16 186l23.78-23.78h24l.2-.2 23.5-23.5v-22.61l-23.34 23.31h-24l-24.17 24.17v-1.34l23.78-23.77h24l24.64-24.65v24.92l23.7 23.7zm97 47.75l-23.78-23.78h-24L645 162.05l-23.5-23.5v-24l-24.45-24.42-23.5-23.5v-24l-23.78-23.75L573.55-4.9l2.67-2.66h-1.34l-1.33 1.33v-1.33h-.94v2.27l-23.5 23.5-.67.67.67.67 23.5 23.5V67l24.44 24.45 23.5 23.5v24L645 163.39l23.78 23.78h24l24.17 24.17 8.08 8.08v-1.34zM481.36 445.56h1.33l18.47-18.46v-1.34zM309.57-4.62h24l2.95-2.94h-1.34l-2 2h-24L285.4 18.21l-23.5-23.5v-2.27h-.9v2.66l24.4 24.45zM0 328.92L21.89 307h24.92l-24.64-24.61v-24L0 236.25v1.34l21.22 21.22v24l23.31 23.31H21.89L0 284.2v1.33l21 21-21 21zm142.23 97.51l-.67-.67-.67.67-19.13 19.13h1.33l18.47-18.46L160 445.56h1.33zm47.47-.43h-24l-23.5-23.51-.67-.66-.67.66L117.39 426h-24l-19.61 19.6h1.34l18.69-18.7h24l23.78-23.78 23.78 23.78h24L208 445.56h1.33zm240.21-47.48l-.67-.67-24.44 24.41v24l-19.33 19.33h1.33l18.94-18.94v-24zm47.75-386h-.94v2.27l-24.64 24.56H477l.2.2 24 24v-1.36l-23.3-23.31 23.3-23.31v-1.33L477 18.41h-22.65L477.66-4.9zM0 113.16l21.69-21.69.2-.2h24.92L22.17 66.63v-24l-22-22c0 .41-.08.82-.1 1.23l21.15 21.19V67l23.31 23.33H21.89L0 68.44v1.33l21 21-21 21zm69.64 264.65L45.2 402.26v24l-18.89 18.86 1.16.17 18.67-18.67v-24l24.17-24.17zm407.08-23.11v-24l-24.17-24.17-23.31-23.3-.47-.48-23.7-23.69h-24l-23.78-23.78-23.78 23.78h-24l-24.64 24.64v-24.89l-23.7-23.7h-22.58l23.31 23.31v24l23.5 23.5 23.78-23.77h24l23.5-23.51.67-.66.67.66 23.5 23.51h24l23.78 23.77.67.67 23.78 23.78v24l23.5 23.5.67.67-.67.67-23.5 23.5v24l-18.94 18.94h-1.34l19.33-19.33v-24l23.78-23.78-23.84-23.84v-24l-23.5-23.5-23.78 23.8h-24l-24.64 24.64v-24.91l-.2-.2L333.15 307h-22.64l23.31 23.31v24l23.5 23.5L381.1 354h24l24.64-24.64v24.91l.2.2 23.31 23.3.66.67-.66.67-23.51 23.5v24l-18.94 18.94h-1.33l19.33-19.33v-24l23.78-23.78-23.31-23.3-23.3 23.3-.48.47-23.69 23.7v24l-18.94 18.94h-1.34l19.33-19.33v-24L404.13 379h-22.64L358 402.45l-.2.2v23.58l.2.2-.2.19v.28h-.27l-18.67 18.66h-1.33l19.33-19.33v-22.64l-23.32 23.31h-24l-18.66 18.66h-1.34L309.18 426h24l23.7-23.7.47-.47L381.1 378h24l.2-.2 23.5-23.5v-22.63L405.46 355h-24L358 378.48l-.67.67-23.78 23.78h-24l-23.5 23.5-.67.67-.67-.67-23.5-23.5h-24l-23.78-23.78-.67-.67.67-.67L237.26 354h24l24.64-24.64v24.91l.2.2 23.5 23.5h22.64L308.9 354.7v-24l-23.5-23.5-23.78 23.8h-24L214 354.7l-.47.48-23.3 23.3 23.3 23.31.67.66L237.65 426h24l19.61 19.6h-1.36l-18.67-18.7h-24l-23.78-23.78-.67-.67-23.3-23.3-.2-.2H164.4l24.6-24.64v-24l23.77-23.78L189 282.78v-24l-23.7-23.7-.47-.47-23.31-23.3-24.17-24.17h-24l-23.71-23.75-23.5 23.5v24l-23.78 23.75 23.78 23.78v24l23.5 23.5 23.5-23.5v-24l23.31-23.31H93.81l-23.7 23.7v24.25h-.94v-24.25L45 234.64l24.17-24.17v-24.92l24.64 24.65h24l23.75 23.8L166 258.42v24l24.17 24.17L166 330.73v24l-23.78 23.78 23.5 23.5h24l23.78 23.78.67.67 19.13 19.13H232l-18.52-18.49-.67-.67-23.5-23.5h-24l-23.78-23.78-23.78 23.78h-24l-23.7 23.69-.47.48-18.41 18.46h-1.33L69 426.43l.2-.2v-24L93 378.48l-23.31-23.3L45.86 379l-23.69 23.7v24l-11.25 11.17-.71-.63 11-11v-24L44.53 379H21.89L0 400.84v-1.33L21.5 378h24l.2-.2 24-24L93.81 378h24.25v1H93.81l-23.7 23.7v22.64L93.42 402h24l23.5-23.5-23.53-23.5h-24l-23.75-23.8L45.86 355H21.22v-1h24.25L69 330.53l.67-.66.67.66L93.81 354h24l23.78 23.77 23.5-23.5v-24l23.78-23.78-23.78-23.78v-24l-23.5-23.5-23.5 23.5v24l-23.34 23.38h22.64l23.7-23.7v-24.25h.91v24.25l23.5 23.5.67.67-24 24-.2.2v24.92L117.39 331h-24l-23.75-23.77L45.86 331h-24L0 352.9v-1.34l21.5-21.5h24l23.5-23.5-23.8-23.78v-24l-23.51-23.5-.66-.67 24.17-24.14v-24l24.44-24.45 24.17 24.17h24L141.56 210l24.17 24.17h24L214 258.42v24l23.7 23.7h22.64L237 282.78v-24l-23.5-23.5-.67-.67-23.5-23.5h-24l-23.78-23.78-24-24-.2-.2h-24l-23.71-23.72-23.3 23.31-24.17 24.17v24L0 233v-1.34l21.22-21.22v-24l23.31-23.31H21.89L0 185.08v-1.33l21.5-21.5h24l.2-.2 23.5-23.5v-22.64l-23.34 23.31h-24L0 161.11v-1.34l21.5-21.49h24l24.64-24.65v24.92l23.7 23.7h22.64l-23.34-23.31V115l-23.5-23.5-23.78 23.75h-24L0 137.14v-1.34l21.5-21.5h24L69 90.8 45.2 67V43L21.69 19.55l-.69-.67.66-.67L45.2-5.29v-2.27h.94v2.66L22.36 18.88l23.78 23.78v24l23.5 23.5 24.45 24.45v24l24.17 24.17 23.3 23.22 24.17 24.17h24L213.48 234l24.45 24.45v24L262.57 307h-24.92L214 330.73v22.64l23.31-23.31h24l23.5-23.5L261 282.78v-24l-23.7-23.7-23.78-23.77-24.17-24.17h-24l-23.78-23.78-24.44-24.45V115L93.61 91.47 69.17 67V43l-23.5-23.5-.67-.62.67-.67 23.5-23.5v-2.27h.94v1.33l1.33-1.33h1.34L70.11-4.9 46.34 18.88l23.77 23.78v24l23.5 23.5 24.45 24.45v24l23.5 23.5 24.17 24.17h24L213.48 210l24 24 .16.16h24L285.4 258l23.31-23.31-23.31-23.3-.23-.24-.24-.24-23.7-23.69h-24l-23.78-23.78-24.17-24.17h-24L142 115.91v22.64l23.7 23.7h24L213.48 186l24.17 24.17h24l24.45 24.44-.67.67-24.17-24.17h-24l-23.78-23.78-24.17-24.17h-24l-24.25-24.25V115L93.14 67V43l-23.5-23.5-.64-.62.67-.67L93.42-5.56h24l2-2h1.33l-2.94 2.94h-24l-23.5 23.5 23.78 23.78v24l47.94 48 23.7 23.7h24l23.78 23.77 23.5-23.5v-24l23.31-23.31h-22.67L214 115v24.92l-24.64-24.64h-24l-23.8-23.81L117.12 67V43L92.48 18.41h24.91l.2-.2 23.5-23.5v-2.27h.91v2.27l24.2 24.17L142 43.05V67.3h-.94V43.05l-23.7-23.7H94.75l23.31 23.31v24l23.5 23.5 23.5-23.5v-24l23.78-23.78L165.06-4.9v-2.66h.94v2.27l23.5 23.5.67.67-.67.67-23.5 23.5V67l-23.77 23.8 23.5 23.5h24L213 137.61V115l-23.5-23.5-.2-.2h-24.9L189 66.63v-24l23.77-23.78L189-4.9v-2.66h1v2.27l23.5 23.5 24.17 24.17h24l23.31 23.31V43.05l-23.5-23.5-.2-.2h-24L213-4.9v-2.66h1v2.27l23.7 23.7h22.64L237-4.9v-2.66h1v2.27l23.69 23.7 23.71 23.78 23.78-23.78h24l.2-.2 24-24 1.8-1.8h1.34l-3.14 3.13L334 18.88l-24.15 24.17V67l-23.78 23.8 23.5 23.5h24l23.31 23.31V115l-23.5-23.5-.2-.2h-24.94l24.64-24.64v-24l24.44-24.45L381.1-5.56h24l2-2h1.34l-3 2.94h-24l-24.12 24.17-23.5 23.5V67l-23.31 23.33h22.64l23.7-23.7v-24l24.25-24.22h24l23.7-23.7v-2.27h.94v2.66l-24.28 24.25h-24l-23.7 23.7v22.64l23.34-23.31h24l24.17-24.17 23.5-23.5v-2.27h.95v2.66l-23.81 23.78 23.5 23.5h24l23.78 23.78 24.17 24.17H548L524.66 67V43l-23.5-23.5-.67-.66.67-.66 23.5-23.5v-2.24h.94v2.66l-23.77 23.78 23.77 23.78v24l24.64 24.64h-24.91l-.2.2-24 24v-1.33l23.3-23.31-23.3-23.31L477 43.33h-24l-23.76-23.78-23.78 23.78h-24L357.79 67 334 90.8l23.3 23.31 23.8-23.78h24l.2-.2 24-24 24 24 .19.2h24.92L453.69 115v24l-23.78 23.78 23.78 23.78v24l24.17 24.17 23.3 23.27v1.33l-24-24-24.45-24.45v-24l-23.5-23.5-23.78 23.78h-24l-24.64 24.64v-24.91l-23.7-23.7h-22.58l23.31 23.31v24l23.5 23.5 23.78-23.8h24l24.64-24.65v24.92l24.17 24.17 23.78 23.78v24l23.5 23.5v1.34l-24.44-24.45v-24l-23.5-23.5-24-24-23.3 23.3 23.77 23.78v24l.2.2 23.31 23.3 24.44 24.45v24l23.5 23.5.67.66-.67.67-23.5 23.5v24l-18.94 18.94h-1.33l19.33-19.33v-24l23.77-23.78zM118.26 18.88l23.3 23.31 23.31-23.31-23.31-23.31zm0 287.68l23.3 23.31 23.31-23.31-23.31-23.3zM93 234.64l-23.31-23.3-23.3 23.3L69.64 258zm-22.69 71.92l23.5 23.5h24l23.31 23.31v-22.64L117.39 307H92.48l24.64-24.64v-24l23.77-23.78-23.5-23.5h-24l-23.28-23.25v22.64l23.7 23.7h24.92l-24.64 24.64v24zm166.48 0L213 282.78v-24l-23.7-23.7h-22.63L190 258.42v24l23.5 23.5.67.67L190 330.73v24L166.67 378h22.64l23.5-23.5.2-.2v-24zm48.61 48.62l-23.3 23.3 23.3 23.31 23.31-23.31zm71.92-25.31l23.31-23.31-23.31-23.3-23.32 23.3zm-71.25-23.31l23.78 23.78v24L334.49 379h-24.92l-.19.2-23.31 23.3-.67.67-.67-.67-23.5-23.5H237v-1h24.25l23.7-23.7v-22.63L261.62 355h-24l-23.5 23.5 23.5 23.5h24l23.78 23.78L309.18 402h24l23.5-23.5-23.8-23.8v-24l-24.64-24.64h24.91l.2-.2 23.3-23.3.67-.67.67.67 23.5 23.5h24.25v.94h-24.25l-23.7 23.7v22.64l23.31-23.31h24l23.5-23.5-23.5-23.5h-24l-23.78-23.78-23.78 23.78h-24zM429.71 115v24l-24.25 24.25h-24l-.2.2-23.5 23.5v22.64l23.31-23.31h24l24.17-24.17 23.5-23.5v-24l23.31-23.31h-22.64zm-47.94 0v24l-24.45 24.45-24.17-24.17h-24l-23.31-23.31v22.64l23.51 23.5.19.2h24L357.32 186l23.31-23.31 24.17-24.17v-24l24.44-24.45.67.67L405.74 115v24l-23.31 23.31h22.64l23.7-23.7v-24l23.78-23.81-23.31-23.31-23.3 23.31zM285.4 91.47L261.9 115v24l-23.31 23.31h22.64l23.7-23.7v-24.98l24.64 24.65h24l23.78 23.77 23.5-23.5v-24l23.31-23.31h-22.67L357.79 115v24.92l-24.64-24.64h-24zM213 66.63V41.71l24.64 24.65h24l23.76 23.77 23.5-23.5v-24l23.31-23.31h-22.64l-23.7 23.7V68l-24.64-24.67h-24l-23.75-23.78L190 43.05V67l-23.33 23.33h22.64zm23.79 24.17l-23.31-23.31-23.3 23.31 23.3 23.31zm48.14 96.09l-23.5-23.5-.2-.2h-24.91L261 138.55v-24l23.73-23.75-23.5-23.5h-24L214 44v22.63l23.5 23.5.2.2h24.92L237.93 115v24l-23.78 23.78 23.5 23.5h24l23.31 23.31zm71.72 47.75l-23.77-23.78v-24l-24.17-24.17-23.31-23.28-23.3 23.31 23.77 23.78v24l23.7 23.7h22.64l-23.31-23.34v-24l-24.17-24.17.67-.67 24.45 24.45v24l24.64 24.64h-24.92l-.19.2-23.51 23.5v22.64l23.31-23.31h24zm72.12 24.17l-23.7-23.7h-24.25v-.94h24.25l23.7-23.7v-22.64l-23.31 23.31h-24L358 234.64l23.5 23.5h24l23.31 23.31z"
              fill="url(#prefix__linear-gradient)"
              opacity={0.15}
            />
          </g>
          <path
            className="prefix__cls-60"
            d="M241.57 51.29C248.26 63 255.17 74 263.1 57.84c1.09-2.08 1.88-6.12 3.65-6.12s2.57 4 3.65 6.12c7.94 16.16 14.85 5.16 21.53-6.53.51-.88 1-1.73 1.4-2.46-15.32 9.7-14-19.6-26.58-19.83-12.55.23-11.26 29.53-26.58 19.83l1.4 2.46M240.75 29a6.94 6.94 0 106.93 6.94 6.94 6.94 0 00-6.93-6.94zM292.76 29a6.94 6.94 0 106.93 6.94 6.94 6.94 0 00-6.93-6.94zM234.57 74.76h1.23a.82.82 0 01.51.17.46.46 0 01.22.34.27.27 0 01-.26.26.29.29 0 01-.23-.12.33.33 0 00-.22-.11h-1.22q-.18 0-.18.15a.16.16 0 00.12.15l1.43.64a.88.88 0 01.36.31.86.86 0 01.14.47.82.82 0 01-.25.59.8.8 0 01-.55.23h-1.09a.89.89 0 01-.52-.16c-.16-.12-.25-.23-.25-.33a.27.27 0 01.08-.19.26.26 0 01.21-.08.38.38 0 01.22.11.43.43 0 00.33.12h1a.25.25 0 00.2-.09.32.32 0 00.08-.21.27.27 0 00-.18-.26l-1.44-.65a.86.86 0 01-.32-.27.69.69 0 01.09-.86.65.65 0 01.49-.21zM240.71 76v.64l.35.62.19-.62.06-1.56a.27.27 0 01.08-.19.26.26 0 01.19-.08.29.29 0 01.19.08.22.22 0 01.07.19l-.05 1.67-.29 1a.24.24 0 01-.25.19H241a.26.26 0 01-.24-.14l-.29-.51-.29.5a.3.3 0 01-.24.15h-.28a.26.26 0 01-.17 0 .22.22 0 01-.09-.13l-.28-1L239 75a.29.29 0 01.08-.19.3.3 0 01.2-.08.25.25 0 01.18.08.26.26 0 01.08.19l.06 1.57.18.6.37-.63V76a.27.27 0 01.08-.19.3.3 0 01.2-.08.29.29 0 01.19.08.27.27 0 01.09.19zM246.52 77.84h-1.64a.26.26 0 01-.19-.08.27.27 0 010-.38.26.26 0 01.19-.08h.55v-2h-.54a.26.26 0 01-.19-.08.25.25 0 01-.08-.19.22.22 0 01.08-.19.23.23 0 01.19-.09h.81a.23.23 0 01.19.09.22.22 0 01.11.16v2.3h.54a.27.27 0 01.19.08.27.27 0 010 .38.25.25 0 01-.21.08zm-1.1-4.48h.28a.26.26 0 01.19.08.22.22 0 01.08.19v.23a.24.24 0 01-.08.19.22.22 0 01-.19.08h-.28a.26.26 0 01-.2-.08.28.28 0 01-.07-.19v-.23a.26.26 0 01.08-.19.27.27 0 01.19-.08zM251.5 77.84h-.5a.77.77 0 01-.57-.23.78.78 0 01-.24-.57V75.3h-.28a.29.29 0 01-.19-.08.29.29 0 010-.38.29.29 0 01.19-.08h.29v-.66a.26.26 0 01.07-.19.29.29 0 01.19-.08.27.27 0 01.19.08.25.25 0 01.08.19v.66h1.08a.26.26 0 01.19.08.27.27 0 010 .38.26.26 0 01-.19.08h-1.08V77a.25.25 0 00.08.19.27.27 0 00.19.08h.53a.28.28 0 00.28-.23q.07-.24.27-.24a.28.28 0 01.2.08.27.27 0 01.07.2.72.72 0 01-.23.48.75.75 0 01-.62.28zM257.32 77.84h-1.15a.8.8 0 01-.52-.18l-.52-.45a.72.72 0 01-.25-.56V76a.75.75 0 01.28-.6l.47-.4a.76.76 0 01.49-.19h1.2a.26.26 0 01.19.08.27.27 0 010 .38.26.26 0 01-.19.08h-1.15a.37.37 0 00-.21.08l-.43.37a.3.3 0 00-.1.24v.66a.22.22 0 00.08.18l.47.4a.36.36 0 00.24.08h1.1a.25.25 0 01.19.08.26.26 0 01.08.19.29.29 0 01-.08.19.26.26 0 01-.19.02zM260.13 77.58v-3.72a.25.25 0 01.08-.18.27.27 0 01.19-.08.26.26 0 01.19.08.27.27 0 01.08.19v1.36l.43-.28a1 1 0 01.53-.19h.37a.77.77 0 01.56.23.83.83 0 01.25.58l.07 2a.29.29 0 01-.08.19.26.26 0 01-.19.07.22.22 0 01-.19-.08.25.25 0 01-.08-.18l-.07-2a.27.27 0 00-.27-.27h-.3a.49.49 0 00-.23.08l-.76.5v1.71a.29.29 0 01-.08.19.25.25 0 01-.19.07.26.26 0 01-.19-.07.29.29 0 01-.12-.2zM266.15 74.76h1.24a.8.8 0 01.5.17.46.46 0 01.22.34.22.22 0 01-.08.18.25.25 0 01-.18.08.31.31 0 01-.23-.12.33.33 0 00-.22-.11h-1.22q-.18 0-.18.15a.16.16 0 00.12.15l1.43.64a.77.77 0 01.36.31.86.86 0 01.14.47.78.78 0 01-.25.59.8.8 0 01-.55.23h-1.09a.89.89 0 01-.52-.16q-.24-.18-.24-.33a.24.24 0 01.08-.19.24.24 0 01.2-.08.35.35 0 01.22.11.43.43 0 00.33.12h1a.25.25 0 00.19-.09.28.28 0 00.08-.21.27.27 0 00-.18-.26l-1.44-.65a.86.86 0 01-.32-.27.69.69 0 01.09-.86.65.65 0 01.5-.21zM272.29 76v.64l.36.62.18-.62.06-1.56a.27.27 0 01.08-.19.29.29 0 01.19-.08.27.27 0 01.19.08.26.26 0 01.08.19l-.06 1.67-.29 1a.24.24 0 01-.25.19h-.29a.26.26 0 01-.24-.14l-.29-.51-.29.5a.3.3 0 01-.24.15h-.28a.26.26 0 01-.17 0 .22.22 0 01-.09-.13l-.28-1-.06-1.81a.22.22 0 01.08-.19.27.27 0 01.19-.08.25.25 0 01.18.08.26.26 0 01.08.19l.07 1.57.17.6.37-.63V76a.27.27 0 01.08-.19.3.3 0 01.2-.08.29.29 0 01.19.08.27.27 0 01.08.19zM276.73 75.91h1a.91.91 0 01.25 0v-.38a.26.26 0 00-.08-.19.24.24 0 00-.19-.08h-1a.26.26 0 01-.19-.08.25.25 0 01-.08-.19.22.22 0 01.08-.19.26.26 0 01.19-.08h1a.81.81 0 01.57.23.87.87 0 01.24.58l.07 2a.29.29 0 01-.08.19.26.26 0 01-.19.07.29.29 0 01-.2-.07.29.29 0 01-.08-.19l-.45.26h-.91a.78.78 0 01-.58-.23.82.82 0 01-.23-.58v-.31a.76.76 0 01.24-.57.78.78 0 01.62-.19zm1.34 1v-.22a.3.3 0 00-.08-.2.26.26 0 00-.19-.07h-1.06a.24.24 0 00-.19.08.26.26 0 00-.08.19V77a.29.29 0 00.08.19.27.27 0 00.19.08h.76zM281.74 77.54v1.19a.27.27 0 01-.08.19.24.24 0 01-.19.08.22.22 0 01-.19-.08.25.25 0 01-.09-.19V74.9a.27.27 0 01.08-.19.3.3 0 01.2-.08.29.29 0 01.19.08.27.27 0 01.08.19v.17a1.06 1.06 0 01.77-.43h.12a.79.79 0 01.53.21l.44.38a.82.82 0 01.3.65v.84a.86.86 0 01-.32.67l-.44.37a.73.73 0 01-.55.2h-.11a.72.72 0 01-.53-.21zm.76-.12h.13a.29.29 0 00.21-.1l.42-.37a.27.27 0 00.11-.22v-.87a.29.29 0 00-.12-.23l-.45-.38a.23.23 0 00-.17-.07h-.15a.41.41 0 00-.24.15l-.4.39a.33.33 0 00-.1.24v.69a.35.35 0 00.12.24l.38.39a.42.42 0 00.26.14zM287.53 76.15h.55a.25.25 0 01.18.08.22.22 0 01.08.19v.46a.26.26 0 01-.07.19.29.29 0 01-.19.08h-.55a.26.26 0 01-.19-.08.22.22 0 01-.08-.19v-.46a.22.22 0 01.08-.19.27.27 0 01.19-.08zM293.89 77.84h-1.64a.27.27 0 010-.54h.55v-2h-.54a.26.26 0 01-.19-.08.29.29 0 01-.07-.22.26.26 0 01.08-.19.23.23 0 01.19-.09h.82a.25.25 0 01.19.09.26.26 0 01.08.19v2.3h.53a.3.3 0 01.2.08.27.27 0 010 .38.29.29 0 01-.2.08zm-1.09-4.48h.28a.27.27 0 01.19.08.26.26 0 01.08.19v.23a.27.27 0 01-.08.19.24.24 0 01-.19.08h-.29a.22.22 0 01-.19-.08.25.25 0 01-.08-.19v-.23a.22.22 0 01.08-.19.26.26 0 01.2-.08zM299.69 75.73v1.13a.88.88 0 01-.34.67 1 1 0 01-.7.31H298a1.08 1.08 0 01-.71-.31.92.92 0 01-.33-.67v-1.13a.88.88 0 01.33-.66 1 1 0 01.71-.32h.63a1.06 1.06 0 01.7.3.9.9 0 01.36.68zm-2.17 0v1.09a.28.28 0 00.11.23l.2.17a.27.27 0 00.19.06h.62a.35.35 0 00.25-.1l.16-.14a.25.25 0 00.1-.22v-1.06a.27.27 0 00-.1-.24l-.19-.15a.33.33 0 00-.22-.08h-.56a.41.41 0 00-.28.09l-.18.15a.3.3 0 00-.1.22z"
          />
          <path
            d="M338.46 44.21l14.69-8.48a1.64 1.64 0 011.63 0l9.22 5.34a1.63 1.63 0 01.33 2.57l-3.13 3.16a1.65 1.65 0 01-2 .26l-4.46-2.58a1.66 1.66 0 00-1.67 0l-15.49 9v-7.85a1.63 1.63 0 01.88-1.42z"
            fill="#fa8c16"
          />
          <path
            className="prefix__cls-60"
            d="M364.07 66.91l-9.29 5.36a1.59 1.59 0 01-1.63 0l-14.69-8.48a1.62 1.62 0 01-.82-1.41v-7.15l7.57-4.39V58a1.63 1.63 0 00.81 1.41l7.13 4.11a1.59 1.59 0 001.63 0l4.51-2.6a1.63 1.63 0 012 .26l3.14 3.15a1.63 1.63 0 01-.36 2.58zM423.42 39.46v22.21c0 1.52-.64 1.7-2.06 1.7h-11.27a1.65 1.65 0 01-1.19-.44c-.17-.16-.45-.13-.45-1.52V39.46h-5.7V62a6.33 6.33 0 001.94 4.73 7.18 7.18 0 005.21 1.81h12a7.27 7.27 0 005.1-1.87 6.32 6.32 0 002.07-5.19v-22zM457.9 53.31a5.77 5.77 0 00-4.43-1.82h-10.33a2 2 0 01-1.52-.57 1.71 1.71 0 01-.5-1.42v-3a1.89 1.89 0 01.47-1.43c.21-.21.54-.46 1.76-.46h16v-5.16H441.3a6 6 0 00-5.1 2.66 6.69 6.69 0 00-.77 3.77v5.4a5.22 5.22 0 001.28 3.83 5.54 5.54 0 004.1 1.57h10.86a2.32 2.32 0 011.5.39 1.57 1.57 0 01.7 1.24v2.93c0 1.43-.28 1.41-.44 1.57a2.28 2.28 0 01-1.63.57h-16.4v5.18h17.51a6.63 6.63 0 005-2 6.74 6.74 0 001.69-4.85v-3.4a7.18 7.18 0 00-1.7-5zM466.36 39.46v5.18h9.51v23.91h5.69V44.64h9.63v-5.18h-24.83zM396.88 51.52c.14-1.7 0-5.68 0-5.68a6 6 0 00-3.44-5.71 9.23 9.23 0 00-4.14-.7H371.85l2.57 5.18h14.08c1.25 0 2.68.22 2.68 2v4.24c0 1.36-.69 2-2.22 2h-17.11v15.73h5.69V58h8.66l3.94 10.61h6.79s-4-10.73-4.13-11 1.68-.61 2.82-1.84 1.11-2.56 1.26-4.25z"
          />
          <path
            transform="rotate(90 362.5 246)"
            fill="url(#prefix__linear-gradient-2)"
            d="M220.5-66h284v624h-284z"
          />
          <path fill="url(#prefix__linear-gradient-3)" d="M52.5 106h620v280h-620z" />
          <foreignObject x="50" y="100" width="300" height="300">
            {qrcode}
          </foreignObject>
          <foreignObject x="395" y="110" width="270" height="100">
            <Grid container alignItems="center" height="100%">
              <Typography
                align="center"
                variant="subtitle1"
                sx={{ fontSize: 16, fontFamily: 'Roboto', width: '100%' }}
              >
                {title === '' || undefined ? 'Your title' : title}
              </Typography>
            </Grid>
          </foreignObject>
          <foreignObject x="395" y="210" width="270" height="170">
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              height="100%"
              rowSpacing="1"
            >
              <Grid item width="100%">
                <Typography
                  align="center"
                  variant="body1"
                  sx={{ fontSize: 10, fontFamily: 'Roboto', width: '100%' }}
                >
                  File name: abc.xyz | Size: 123KB
                </Typography>
              </Grid>
              <Grid item width="90%">
                <Typography
                  align="center"
                  style={{ wordWrap: 'break-word' }}
                  sx={{ fontSize: 14, fontFamily: 'Roboto', width: '100%' }}
                >
                  QmaNFdMEfboBAxTy5xxQgvRCYdhDfVqVJHPG1MV3pJtXQH
                </Typography>
              </Grid>

              <Grid item width="100%">
                <Typography
                  align="center"
                  variant="body1"
                  sx={{ fontSize: 10, fontFamily: 'Roboto', width: '100%' }}
                >
                  This NFT is generated by smart contract
                </Typography>
                <Typography
                  align="center"
                  style={{ wordWrap: 'break-word' }}
                  sx={{ fontSize: 10, fontFamily: 'Roboto', width: '100%' }}
                >
                  0x77A80028A50a7504604646EE51586A721F52f07c
                </Typography>
              </Grid>
            </Grid>
          </foreignObject>
          <path
            className="prefix__cls-67"
            d="M346.5 184.21v6.14a.74.74 0 01-.23.53.72.72 0 01-.53.23.74.74 0 01-.54-.23.68.68 0 01-.23-.53v-2.29h-9v2.29a.77.77 0 01-.22.54.73.73 0 01-.54.22.74.74 0 01-.54-.23.71.71 0 01-.22-.53v-6.14a.73.73 0 01.22-.54.76.76 0 011.3.54v2.33h9v-2.33a.73.73 0 01.22-.54.77.77 0 01.53-.22.78.78 0 01.55.22.74.74 0 01.23.54zM346.5 200.93v3a2.1 2.1 0 01-.38 1.14 2.39 2.39 0 01-.89.82l-3 1.5a3.58 3.58 0 01-3.42 0l-3-1.51a2.3 2.3 0 01-.92-.83 2.2 2.2 0 01-.35-1.21v-2.9a.74.74 0 01.23-.54.75.75 0 01.53-.22.82.82 0 01.55.22.73.73 0 01.22.54v.8H345v-.78a.7.7 0 01.23-.54.73.73 0 01.54-.22.71.71 0 01.53.22.74.74 0 01.2.51zm-1.5 2.29h-9v.53a.8.8 0 00.5.76l3 1.5a2.31 2.31 0 001 .28 2.06 2.06 0 00.94-.22l3.08-1.56a.82.82 0 00.47-.79zM345 223.79v-5.37h-3.7v2.31a.75.75 0 01-.76.76.75.75 0 01-.55-.22.73.73 0 01-.22-.54v-2.31H336v5.38a.77.77 0 01-.22.54.73.73 0 01-.54.22.7.7 0 01-.54-.23.73.73 0 01-.22-.54v-6.89h12v6.89a.74.74 0 01-.23.54.73.73 0 01-.55.23.7.7 0 01-.53-.23.73.73 0 01-.17-.54zM345.72 241.26H334.5v-2l9.32-4.09h-8.56a.77.77 0 01-.54-.22.77.77 0 010-1.08.77.77 0 01.54-.22h11.24v2l-9.3 4.09h8.52a.77.77 0 110 1.54zM344.43 250.32h2.05V258h-2.07a.7.7 0 01-.53-.23.73.73 0 01-.22-.53.77.77 0 01.22-.55.74.74 0 01.53-.23h.59v-1.53h-9.71a.74.74 0 01-.54-.23.73.73 0 01-.22-.53.77.77 0 01.76-.78H345v-1.53h-.54a.73.73 0 01-.53-.22.75.75 0 010-1.08.69.69 0 01.5-.24zM346.5 267.8v6.14a.73.73 0 01-.23.52.68.68 0 01-.53.23.73.73 0 01-.54-.22.7.7 0 01-.23-.53v-2.3h-9v2.3a.76.76 0 01-1.52 0v-6.14a.76.76 0 011.3-.54.77.77 0 01.22.54v2.33h9v-2.33a.76.76 0 011.3-.54.74.74 0 01.23.54zM344.43 283.75h2.05v7.66h-2.07a.69.69 0 01-.53-.22.75.75 0 01-.22-.54.73.73 0 01.22-.54.7.7 0 01.53-.23h.59v-1.54h-9.71a.73.73 0 01-.54-.22.79.79 0 010-1.09.73.73 0 01.54-.22H345v-1.54h-.54a.69.69 0 01-.53-.22.74.74 0 01-.23-.54.79.79 0 01.76-.76zM340.26 305.09h-5a.75.75 0 01-.76-.75.78.78 0 01.22-.56.73.73 0 01.54-.22h5l3.87-3.05h1.6a.77.77 0 110 1.53h-1.05l-2.92 2.28 2.92 2.31h1.06a.73.73 0 01.54.22.76.76 0 01.23.54.77.77 0 01-.21.53.75.75 0 01-.57.23h-1.59z"
          />

          <path fill="url(#prefix__linear-gradient-4)" d="M387.44 148.16h.5v200h-.5z" />
          <path fill="url(#prefix__linear-gradient-5)" d="M480.79 210.77h100v.5h-100z" />
        </g>
      </g>
    </svg>
  );
}
export default SvgComponent;
