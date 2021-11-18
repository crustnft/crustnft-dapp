import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  defaultQR25DOtherProps,
  defaultQRBubbleOtherProps,
  defaultQRDsjOtherProps,
  defaultQRFuncOtherProps,
  defaultQRLineOtherProps,
  defaultQRNormalOtherProps,
  QR25DOtherProps,
  QRBubbleOtherProps,
  QRDsjOtherProps,
  QRFuncOtherProps,
  QRLineOtherProps,
  QRNormalOtherProps,
  QRRandRectOtherProps
} from '../pages/NftMinting/components/qrCardCustomize/defautOtherQRProps';

export const CHANGE_QR_CARD_GENERAL_INFO = 'CHANGE_QR_CARD_GENERAL_INFO';
export const CHANGE_OTHER_QR_PROPS = 'CHANGE_OTHER_QR_PROPS';
export const CHANGE_OTHER_QR_PROPS_AUTHOR_REGISTER = 'CHANGE_OTHER_QR_PROPS_AUTHOR_REGISTER';
export const DOWNLOAD = 'DOWNLOAD';

export type qrStyleNameType =
  | 'qrNormal'
  | 'qrRandRect'
  | 'qrDsj'
  | 'qr25D'
  | 'qrBubble'
  | 'qrFunc'
  | 'qrLine';

export interface OtherQRProps {
  qrNormal?: QRNormalOtherProps;
  qrRandRect?: QRRandRectOtherProps;
  qrDsj?: QRDsjOtherProps;
  qr25D?: QR25DOtherProps;
  qrBubble?: QRBubbleOtherProps;
  qrFunc?: QRFuncOtherProps;
  qrLine?: QRLineOtherProps;
}
export interface InfoQRCard {
  layout?: number;
  qrStyleName?: qrStyleNameType;
  qrStyleNameAuthorRegister?: qrStyleNameType;
  title?: string;
  icon?: string;
  iconAuthorRegister?: string;
  otherQRProps?: OtherQRProps;
  otherQRPropsAuthorRegister?: OtherQRProps;
  download?: boolean;
  changeQRFile?: boolean;
}

// export const changeQRCardGeneralInfo = (state: InfoQRCard) => ({
//   type: CHANGE_QR_CARD_GENERAL_INFO,
//   state: state
// });

// export const changeOtherQRProps = (state: InfoQRCard) => ({
//   type: CHANGE_OTHER_QR_PROPS,
//   state: state
// });

// export const changeOtherQRPropsAuthorRegister = (state: InfoQRCard) => ({
//   type: CHANGE_OTHER_QR_PROPS_AUTHOR_REGISTER,
//   state: state
// });

// export const resetQRCardInfo = () => ({
//   type: RESET_STATE
// });

// export const downloadNFT = (state: InfoQRCard) => ({
//   type: DOWNLOAD,
//   state: state
// });

// init state
export const initialQRCard: InfoQRCard = {
  layout: 0,
  qrStyleName: 'qrNormal',
  qrStyleNameAuthorRegister: 'qrNormal',
  title: '',
  icon: '',
  iconAuthorRegister: '',
  otherQRProps: {
    qrNormal: defaultQRNormalOtherProps,
    qrDsj: defaultQRDsjOtherProps,
    qr25D: defaultQR25DOtherProps,
    qrBubble: defaultQRBubbleOtherProps,
    qrFunc: defaultQRFuncOtherProps,
    qrLine: defaultQRLineOtherProps
  },
  otherQRPropsAuthorRegister: {
    qrNormal: defaultQRNormalOtherProps,
    qrDsj: defaultQRDsjOtherProps,
    qr25D: defaultQR25DOtherProps,
    qrBubble: defaultQRBubbleOtherProps,
    qrFunc: defaultQRFuncOtherProps,
    qrLine: defaultQRLineOtherProps
  },
  download: false,
  changeQRFile: true
};

const initialState = initialQRCard;

export const reducerCustomizeQRCardSlicer = createSlice({
  name: 'reducerCustomizeQRCard',
  initialState,
  reducers: {
    changeQRCardGeneralInfo: (state, action) => ({ ...state, ...action.payload }),
    changeOtherQRProps: (state, action) => {
      const keys = Object.keys(action.payload.otherQRProps ? action.payload.otherQRProps : {});
      let newState = JSON.parse(JSON.stringify(state));
      for (let key of keys) {
        newState.otherQRProps[key] = {
          ...newState.otherQRProps[key],
          ...(action.payload.otherQRProps
            ? action.payload.otherQRProps[key as keyof OtherQRProps]
            : {})
        };
      }
      return newState;
    },
    changeOtherQRPropsAuthorRegister: (state, action) => {
      const keys = Object.keys(action.payload.otherQRProps ? action.payload.otherQRProps : {});
      let newState = JSON.parse(JSON.stringify(state));
      for (let key of keys) {
        newState.otherQRPropsAuthorRegister[key] = {
          ...newState.otherQRPropsAuthorRegister[key],
          ...(action.payload.otherQRProps
            ? action.payload.otherQRProps[key as keyof OtherQRProps]
            : {})
        };
      }
      return newState;
    },
    resetQRCardInfo: (state) => initialQRCard,
    downloadNFT: (state, action) => ({ ...state, ...action.payload })
  }
});

export const {
  changeQRCardGeneralInfo,
  changeOtherQRProps,
  changeOtherQRPropsAuthorRegister,
  resetQRCardInfo,
  downloadNFT
} = reducerCustomizeQRCardSlicer.actions;

export default reducerCustomizeQRCardSlicer.reducer;