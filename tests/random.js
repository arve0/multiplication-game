/**
 * test distribution of random numbers
 */

let xs = []
let ys = []
for (let i=0; i<11; ++i) {
  xs.push(0)
  ys.push(0)
}
let r = (min = 0, max = 10) => {
  return {x, y}
}

for (let i=0; i<10000; i+=1) {
  let res = r()
  xs[res.x] += 1
  ys[res.y] += 1
}

console.log('xs')
console.log(xs)
console.log('ys')
console.log(ys)
