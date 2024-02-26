function generateRandomNumberString(length: number) {
  const digits = "0123456789";
  let randomNumberString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    randomNumberString += digits[randomIndex];
  }
  return randomNumberString;
}

export default generateRandomNumberString;
