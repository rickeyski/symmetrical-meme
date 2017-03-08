function isodd(n) {
  return n === 0 ? false : iseven(n - 1);
}

function iseven(n) {
  return n === 0 ? true : isodd(n - 1);
}

console.log(isodd(5));
console.log(isodd(10));
console.log(iseven(10));
