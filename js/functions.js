const slice = [].slice;

// Allow functions to be curried, eg f(x, y) == f(x)(y)
// Currying allows partial application of functions
function curry(f) {
  let params = slice.call(arguments, 1);
  return function() {
    return f.apply(this, params.concat(slice.call(arguments)));
  };
}

// Call function with arguments in reverse order
// Useful for currying
function flip(f) {
  return function() {
    return f.apply(this, slice.call(arguments).reverse());
  };
}

// A partially applied function with its arguments flipped
function flipPartial(f) {
  return (a) => ((b) => f(b,a));
}

// Basic function composition
// if f(g(x)) == f . g (x)
function compose(f, g) {
  return function() {
    return f(g.apply(this, slice.call(arguments)));
  };
}


// demo function
function add(a, b) {
  return a + b;
}

// add is now partially applied
let add5 = curry(add, 5);


function sub2(n) {
  return n - 2;
}

const iArr = '123456789'.split('');

// parseInt has a hidden param, why does it have to be flipped?
let myParseInt = flipPartial(parseInt)(10);


// Results
console.log(compose(sub2, add5)(10));
console.log(add('a', 'b'));
console.log(flip(add)('a', 'b'));
console.log(flipPartial(add)('a')('b'));
console.log(iArr.map(myParseInt));
