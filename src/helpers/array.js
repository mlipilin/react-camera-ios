export const getNextArrayItem = (array = [], currentItem = null) => {
  const currentIndex = array.indexOf(currentItem);
  const nextIndex = currentIndex < 0 || currentIndex === array.length - 1 ? 0 : currentIndex + 1;
  return array[nextIndex];
};

export default { getNextArrayItem };
