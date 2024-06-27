function reverseAlphabet(str) {
  const alphabets = str.slice(0, -1).split('').reverse().join('');
  const number = str.slice(-1);
  return alphabets + number;
}

console.log(reverseAlphabet('NEGIE1')); // EIGEN1
