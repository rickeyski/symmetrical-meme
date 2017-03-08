// JS transcription of HS demo code

function highestRank(xs) {
  // Determine which number appears the most
  // store the result
  let result = {};

  // Helper function to determine max
  let max = (obj) => Object.keys(obj).reduce((m, k) => obj[k] > m ? obj[k] : m , -Infinity);

  xs.forEach((arg) => result.hasOwnProperty(arg) ? result[arg]+=1 : result[arg] = 1);
  return max(result);
}

let xs = [1,34,1,54,1,124,24,123,4,4,1,345,56,26,56,4,4,62,4,534,345,3,53,5];
console.log(highestRank(xs));

function merge(a, b) {
  // merge the 2 arrays
  let iter = a.length + b.length;
  let retval = [];

  for (let i = 0; i < iter; i += 1) {
    if (a[0] <= b[0])
      retval.push(a.splice(0,1));
    else
      retval.push(b.splice(0,1));
  }
  return retval.map(function(xs) { let [x] = xs; return x;});
}

console.log(merge([2, 4, 6, 8], [1, 3, 5, 7]));
