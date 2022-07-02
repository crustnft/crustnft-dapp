export const capitalizeFirstLetter = (string: string) => {
  const newString = string.toLocaleLowerCase();
  return newString.charAt(0).toUpperCase() + newString.slice(1);
};
