const isNumber = (num) => {
  const numbers = num.match('[0-9]+');
  if (numbers) {
    return numbers[0] === num;
  }
  return false;
};

export default isNumber;
