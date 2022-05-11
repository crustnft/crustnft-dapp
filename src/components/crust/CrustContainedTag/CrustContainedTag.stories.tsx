import CrustContainedTag from './CrustContainedTag';
const CrustContainedTagStories = {
  title: 'CrustContainedTag',
  component: CrustContainedTag
};
export default CrustContainedTagStories;
export const Default = () => (
  <CrustContainedTag
    label="A simple tag"
    onClick={() => {
      alert('a simple tag was clicked');
    }}
  />
);
