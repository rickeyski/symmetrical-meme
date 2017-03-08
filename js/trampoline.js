function done(result) {
  return {
    isDone: true,
    result: result
  };
}
function cont(thunk) {
  return {
    isDone: false,
    thunk: thunk
  };
}
function trampoline(bounce) {
  while (!bounce.isDone) {
    bounce = bounce.thunk();
  }
  return bounce.result;
}

function dict_add(d, tup) {
  function sub(node, t) {
    if (t.length === 1) {
      let n = node[t[0]] || 0;
      node[t[0]] = n + 1;
      return done(0);
    } else {
      node[t[0]] = node[t[0]] || {};
      return cont(
        () => sub(node[t[0]], t.splice(1))
      );
    }
  }
  return trampoline(sub(d, tup));
}

function factorial(n) {
  function loop(a, i) {
    return i === 0 ? done(a) : cont(() => loop(a * i, i - 1));
  }
  return trampoline(loop(1, n));
}

console.log(factorial(10));

let d = {},
    a = ['a', 'b', 'c'];


dict_add(d, a.slice());
dict_add(d, a.slice());
console.log(JSON.stringify(d));
