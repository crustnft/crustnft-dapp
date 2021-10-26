import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reduxStore';
import { changeQRCardGeneralInfo } from 'reduxStore/reducerCustomizeQRCard';
import ToggleButtonGroupScrollbar, { stringAndNumber } from './ToggleButtonGroupScrollbar';
const layoutIndexes = [0, 1, 2, 3];
const srcArray = layoutIndexes.map((layoutIndex) => {
  return `./static/mock-images/nft-style/${layoutIndex}.png`;
});

const LayoutSelection = () => {
  const layout = useSelector((state: IRootState) => {
    return state.reducerCustomizeQRCard.layout || 0;
  });
  const dispatch = useDispatch();
  const handleSelect = (name: stringAndNumber) => {
    dispatch(changeQRCardGeneralInfo({ layout: name as number }));
  };

  return (
    <ToggleButtonGroupScrollbar
      label=""
      value={layout}
      nameArray={layoutIndexes}
      srcArray={srcArray}
      handleSelect={handleSelect}
      buttonDim="100px"
      groupWidth="500px"
    />
  );
};

export default LayoutSelection;
