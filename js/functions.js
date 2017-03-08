const slice = [].slice;

function curry(f) {
  let params = slice.call(arguments, 1);
  return function() {
    return f.apply(this, params.concat(slice.call(arguments)));
  };
}

function flip(f) {
  return function() {
    return f.apply(this, slice.call(arguments).reverse());
  };
}

function flipPartial(f) {
  return (a) => ((b) => f(b,a));
}

function compose(f, g) {
  return function() {
    return f(g.apply(this, slice.call(arguments)));
  };
}


function add(a, b) {
  return a + b;
}

var add5 = curry(add, 5);

function sub2(n) {
  return n - 2;
}

const iArr = '123456789'.split('');

var myParseInt = flipPartial(parseInt)(10);

console.log(compose(sub2, add5)(10));
console.log(add('a', 'b'));
console.log(flip(add)('a', 'b'));
console.log(flipPartial(add)('a')('b'));
console.log(iArr.map(myParseInt));
