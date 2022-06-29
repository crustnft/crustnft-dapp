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

const AddCollectionIcon = ({ width = 260, height = 260, fill = 'none' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 260 260"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="258"
        height="258"
        rx="5.5"
        fill="#F9FAFB"
        stroke="#C4CDD5"
        strokeWidth="2"
        strokeDasharray="5 10"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M115.445 104.317C109.587 105.091 105.091 109.586 104.317 115.445C103.785 119.472 103.333 124.51 103.333 130C103.333 135.49 103.785 140.527 104.317 144.555C105.091 150.413 109.587 154.909 115.445 155.682C119.472 156.214 124.51 156.666 130 156.666C135.49 156.666 140.528 156.214 144.555 155.682C150.413 154.909 154.909 150.413 155.683 144.555C156.215 140.527 156.667 135.49 156.667 130C156.667 124.51 156.215 119.472 155.683 115.445C154.909 109.586 150.413 105.091 144.555 104.317C140.528 103.785 135.49 103.333 130 103.333C124.51 103.333 119.472 103.785 115.445 104.317ZM130 116.666C128.527 116.666 127.333 117.86 127.333 119.333V127.333H119.333C117.861 127.333 116.667 128.527 116.667 130C116.667 131.472 117.861 132.666 119.333 132.666H127.333V140.666C127.333 142.139 128.527 143.333 130 143.333C131.473 143.333 132.667 142.139 132.667 140.666V132.666H140.667C142.139 132.666 143.333 131.472 143.333 130C143.333 128.527 142.139 127.333 140.667 127.333H132.667V119.333C132.667 117.86 131.473 116.666 130 116.666Z"
        fill="#C4CDD5"
      />
    </svg>
  );
};

const RegularArrowLeftIcon = ({ width = 24, height = 24, fill = 'none' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C10.0478 4 8.24816 4.161 6.80371 4.35177C5.50372 4.52346 4.52346 5.50372 4.35177 6.80371C4.16101 8.24816 4 10.0478 4 12C4 13.9522 4.161 15.7518 4.35177 17.1963C4.52346 18.4963 5.50372 19.4765 6.80371 19.6482C8.24816 19.839 10.0478 20 12 20C13.9522 20 15.7518 19.839 17.1963 19.6482C18.4963 19.4765 19.4765 18.4963 19.6482 17.1963C19.839 15.7518 20 13.9522 20 12C20 10.0478 19.839 8.24816 19.6482 6.80371C19.4765 5.50372 18.4963 4.52346 17.1963 4.35177C15.7518 4.16101 13.9522 4 12 4ZM6.54184 2.36899C4.34504 2.65912 2.65912 4.34504 2.36899 6.54184C2.16953 8.05208 2 9.94127 2 12C2 14.0587 2.16953 15.9479 2.36899 17.4582C2.65912 19.655 4.34504 21.3409 6.54184 21.631C8.05208 21.8305 9.94127 22 12 22C14.0587 22 15.9479 21.8305 17.4582 21.631C19.655 21.3409 21.3409 19.655 21.631 17.4582C21.8305 15.9479 22 14.0587 22 12C22 9.94127 21.8305 8.05208 21.631 6.54184C21.3409 4.34504 19.655 2.65912 17.4582 2.36899C15.9479 2.16953 14.0587 2 12 2C9.94127 2 8.05208 2.16953 6.54184 2.36899Z"
        fill="#919EAB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2071 7.79289C14.5976 8.18342 14.5976 8.81658 14.2071 9.20711L11.4142 12L14.2071 14.7929C14.5976 15.1834 14.5976 15.8166 14.2071 16.2071C13.8166 16.5976 13.1834 16.5976 12.7929 16.2071L9.29289 12.7071C8.90237 12.3166 8.90237 11.6834 9.29289 11.2929L12.7929 7.79289C13.1834 7.40237 13.8166 7.40237 14.2071 7.79289Z"
        fill="#919EAB"
      />
    </svg>
  );
};

const RegularArrowRightIcon = ({ width = 24, height = 24, fill = 'none' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C10.0478 4 8.24816 4.161 6.80371 4.35177C5.50372 4.52346 4.52346 5.50372 4.35177 6.80371C4.16101 8.24816 4 10.0478 4 12C4 13.9522 4.161 15.7518 4.35177 17.1963C4.52346 18.4963 5.50372 19.4765 6.80371 19.6482C8.24816 19.839 10.0478 20 12 20C13.9522 20 15.7518 19.839 17.1963 19.6482C18.4963 19.4765 19.4765 18.4963 19.6482 17.1963C19.839 15.7518 20 13.9522 20 12C20 10.0478 19.839 8.24816 19.6482 6.80371C19.4765 5.50372 18.4963 4.52346 17.1963 4.35177C15.7518 4.16101 13.9522 4 12 4ZM6.54184 2.36899C4.34504 2.65912 2.65912 4.34504 2.36899 6.54184C2.16953 8.05208 2 9.94127 2 12C2 14.0587 2.16953 15.9479 2.36899 17.4582C2.65912 19.655 4.34504 21.3409 6.54184 21.631C8.05208 21.8305 9.94127 22 12 22C14.0587 22 15.9479 21.8305 17.4582 21.631C19.655 21.3409 21.3409 19.655 21.631 17.4582C21.8305 15.9479 22 14.0587 22 12C22 9.94127 21.8305 8.05208 21.631 6.54184C21.3409 4.34504 19.655 2.65912 17.4582 2.36899C15.9479 2.16953 14.0587 2 12 2C9.94127 2 8.05208 2.16953 6.54184 2.36899Z"
        fill="#919EAB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.79289 7.79289C9.40237 8.18342 9.40237 8.81658 9.79289 9.20711L12.5858 12L9.79289 14.7929C9.40237 15.1834 9.40237 15.8166 9.79289 16.2071C10.1834 16.5976 10.8166 16.5976 11.2071 16.2071L14.7071 12.7071C15.0976 12.3166 15.0976 11.6834 14.7071 11.2929L11.2071 7.79289C10.8166 7.40237 10.1834 7.40237 9.79289 7.79289Z"
        fill="#919EAB"
      />
    </svg>
  );
};

const UploadIcon = ({ width = 17, height = 16, fill = 'none' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill={fill}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.83333 1.33329C9.83333 0.965103 9.53486 0.666626 9.16667 0.666626H4.5C3.39543 0.666626 2.5 1.56206 2.5 2.66663V13.3333C2.5 14.4379 3.39543 15.3333 4.5 15.3333H12.5C13.6046 15.3333 14.5 14.4379 14.5 13.3333V5.99996C14.5 5.63177 14.2015 5.33329 13.8333 5.33329H11.8333C10.7288 5.33329 9.83333 4.43786 9.83333 3.33329V1.33329ZM8.0286 6.19522C8.09251 6.1313 8.16618 6.08308 8.24481 6.05055C8.48646 5.95056 8.77497 5.99879 8.97141 6.19522L10.9714 8.19522C11.2318 8.45557 11.2318 8.87768 10.9714 9.13803C10.7111 9.39838 10.2889 9.39838 10.0286 9.13803L9.16667 8.2761V11.3333C9.16667 11.7015 8.86819 12 8.5 12C8.13181 12 7.83333 11.7015 7.83333 11.3333V8.2761L6.9714 9.13803C6.71106 9.39838 6.28894 9.39838 6.0286 9.13803C5.76825 8.87768 5.76825 8.45557 6.0286 8.19522L8.0286 6.19522Z"
        fill={fill}
      />
      <path
        d="M11.8182 0.785003C11.4787 0.642619 11.1666 0.965137 11.1666 1.33333V3.33333C11.1666 3.70152 11.4651 3.99999 11.8333 3.99999H13.8333C14.2015 3.99999 14.524 3.68792 14.3816 3.34838C14.32 3.20137 14.2314 3.06477 14.1094 2.9428L12.2238 1.05718C12.1019 0.93522 11.9652 0.846647 11.8182 0.785003Z"
        fill={fill}
      />
    </svg>
  );
};

export {
  ArrowDownSquare,
  FloatingBalloon,
  PlusIcon,
  AddCollectionIcon,
  RegularArrowRightIcon,
  RegularArrowLeftIcon,
  UploadIcon
};
