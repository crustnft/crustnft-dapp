import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import { changeQRCardGeneralInfo, initialQRCard } from '../../../../redux/reducerCustomizeQRCard';
import ToggleButtonGroupScrollbar, { stringAndNumber } from './ToggleButtonGroupScrollbar';
const iconNames = ['switchswap', 'crust', 'polygon'];
const srcArray = iconNames.map((iconName) => {
  return `./static/icons/shared/middleIconQR/${iconName}.png`;
});

const MidIconSelection = () => {
  const { icon, iconAuthorRegister, changeQRFile } = useAppSelector((state) => ({
    icon: (state.reducerCustomizeQRCard.icon || initialQRCard.icon) as string,
    iconAuthorRegister: (state.reducerCustomizeQRCard.iconAuthorRegister ||
      initialQRCard.iconAuthorRegister) as string,
    changeQRFile: state.reducerCustomizeQRCard.changeQRFile as boolean
  }));
  const dispatch = useAppDispatch();
  const handleSelectMidIcon = (name: stringAndNumber) => {
    if (changeQRFile) {
      icon !== name
        ? dispatch(changeQRCardGeneralInfo({ icon: name as string }))
        : dispatch(changeQRCardGeneralInfo({ icon: '' }));
    } else {
      iconAuthorRegister !== name
        ? dispatch(changeQRCardGeneralInfo({ iconAuthorRegister: name as string }))
        : dispatch(changeQRCardGeneralInfo({ iconAuthorRegister: '' }));
    }
  };

  return (
    <ToggleButtonGroupScrollbar
      label="Icon"
      value={changeQRFile ? icon : iconAuthorRegister}
      nameArray={iconNames}
      srcArray={srcArray}
      handleSelect={handleSelectMidIcon}
      buttonDim="50px"
    />
  );
};

export default MidIconSelection;
