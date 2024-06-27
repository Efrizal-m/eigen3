function queryOccurrences(input, query) {
  return query.map((q) => input.filter((item) => item === q).length);
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

console.log(queryOccurrences(INPUT, QUERY)); // [1, 0, 2]
