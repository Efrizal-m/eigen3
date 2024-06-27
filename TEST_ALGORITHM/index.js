/* eslint-disable @typescript-eslint/no-var-requires */
const reverseAlphabet = require('./reverseAlphabet');
const longestWord = require('./longestWord');
const queryOccurrences = require('./queryOccurrences');
const diagonalDifference = require('./diagonalDifference');

console.log(reverseAlphabet('NEGIE1')); // EIGEN1

const sentence = 'Saya sangat senang mengerjakan soal algoritma';
console.log(longestWord(sentence)); // mengerjakan: 11 characters

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
console.log(queryOccurrences(INPUT, QUERY)); // [1, 0, 2]

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(diagonalDifference(matrix)); // 3
