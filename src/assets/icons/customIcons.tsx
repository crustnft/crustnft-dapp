const ArrowDownSquare = ({ width = 13, height = 14, fill = 'none' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0.2 0.7 13 14"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.91135 0.98062C11.2843 1.16195 12.338 2.21565 12.5194 3.58865C12.644 4.53255 12.75 5.7133 12.75 7C12.75 8.2867 12.644 9.46745 12.5194 10.4114C12.338 11.7843 11.2843 12.838 9.91135 13.0194C8.96745 13.144 7.7867 13.25 6.5 13.25C5.2133 13.25 4.03255 13.144 3.08865 13.0194C1.71565 12.838 0.661953 11.7843 0.480621 10.4113C0.35596 9.46745 0.250001 8.2867 0.250001 7C0.250001 5.7133 0.35596 4.53255 0.480621 3.58865C0.661954 2.21565 1.71565 1.16195 3.08865 0.98062C4.03255 0.855958 5.2133 0.75 6.5 0.75C7.7867 0.75 8.96745 0.855959 9.91135 0.98062ZM8.24556 5.62056C8.48964 5.37648 8.88536 5.37648 9.12944 5.62056C9.37352 5.86464 9.37352 6.26036 9.12944 6.50444L6.94194 8.69194C6.69786 8.93602 6.30214 8.93602 6.05806 8.69194L3.87056 6.50444C3.62648 6.26036 3.62648 5.86464 3.87056 5.62056C4.11464 5.37648 4.51036 5.37648 4.75444 5.62056L6.5 7.36612L8.24556 5.62056Z"
        fill="#919EAB"
      />
    </svg>
  );
};

const FloatingBalloon = ({ width = 35, height = 42, fill = 'none' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 35 42"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.5 17.1818C34.5 30.5455 17.5 42 17.5 42C17.5 42 0.5 30.5455 0.5 17.1818C0.5 12.6249 2.29107 8.25465 5.47918 5.03244C8.6673 1.81022 12.9913 0 17.5 0C22.0087 0 26.3327 1.81022 29.5208 5.03244C32.7089 8.25465 34.5 12.6249 34.5 17.1818Z"
        fill="#E3EBF3"
      />
    </svg>
  );
};

const PlusIcon = ({ width = 94, height = 74, fill = 'none' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 94 74"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_899_590)">
        <path
          d="M20 35C20 20.0883 32.0883 8 47 8C61.9117 8 74 20.0883 74 35C74 49.9117 61.9117 62 47 62C32.0883 62 20 49.9117 20 35Z"
          fill="#DFE3E8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48 28.75C48 28.1977 47.5523 27.75 47 27.75C46.4477 27.75 46 28.1977 46 28.75V34H40.75C40.1977 34 39.75 34.4477 39.75 35C39.75 35.5523 40.1977 36 40.75 36H46V41.25C46 41.8023 46.4477 42.25 47 42.25C47.5523 42.25 48 41.8023 48 41.25V36H53.25C53.8023 36 54.25 35.5523 54.25 35C54.25 34.4477 53.8023 34 53.25 34H48V28.75Z"
          fill="#161C24"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_899_590"
          x="0"
          y="0"
          width="94"
          height="94"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="4"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_899_590"
          />
          <feOffset dy="12" />
          <feGaussianBlur stdDeviation="12" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.568627 0 0 0 0 0.619608 0 0 0 0 0.670588 0 0 0 0.16 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_899_590" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_899_590"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export { ArrowDownSquare, FloatingBalloon, PlusIcon };
