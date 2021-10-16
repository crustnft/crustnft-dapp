interface QRNormalOtherProps {
  type: 'rect' | 'round' | 'rand';
  size: number;
  opacity: number;
  posType: 'rect' | 'round' | 'planet' | 'roundRect';
  otherColor: string;
  posColor: string;
}

export const defaultQRNormalOtherProps: QRNormalOtherProps = {
  type: 'rect',
  size: 100,
  opacity: 100,
  posType: 'rect',
  otherColor: '#000000',
  posColor: '#000000'
};

interface QRDsjOtherProps {
  scale: number;
  crossWidth: number;
  posWidth: number;
  posType: 'rect' | 'dsj';
}

export const defaultQRDsjOtherProps: QRDsjOtherProps = {
  scale: 70,
  crossWidth: 70,
  posWidth: 90,
  posType: 'rect'
};

interface QR25DOtherProps {
  height: Number;
  posHeight: Number;
  topColor: String;
  leftColor: String;
  rightColor: String;
}

export const defaultQR25DOtherProps: QR25DOtherProps = {
  height: 0.5,
  posHeight: 0.5,
  topColor: '#FF7F89',
  leftColor: '#FFD7D9',
  rightColor: '#FFEBF3'
};

interface QRBubbleOtherProps {
  circleColor: String;
  posColor: String;
}

export const defaultQRBubbleOtherProps: QRBubbleOtherProps = {
  circleColor: '#8ED1FC',
  posColor: '#0693E3'
};

interface QRFuncOtherProps {
  funcType: String;
  type: String;
  posType: String;
  otherColor1: String;
  otherColor2: String;
  posColor: String;
}

export const defaultQRFuncOtherProps: QRFuncOtherProps = {
  funcType: 'A',
  type: 'rect',
  posType: 'rect',
  otherColor1: '#000000',
  otherColor2: '#000000',
  posColor: '#000000'
};

interface QRLineOtherProps {
  funcType: String;
  posType: String;
  posColor: String;
  direction: String;
  lineWidth: Number;
  lineOpacity: Number;
  lineColor: String;
}

export const defaultQRLineOtherProps: QRLineOtherProps = {
  funcType: 'A',
  posType: 'rect',
  posColor: '#000000',
  direction: 'left-right',
  lineWidth: 50,
  lineOpacity: 100,
  lineColor: '#000000'
};
