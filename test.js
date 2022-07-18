// const stringMiddleware = (store) => (next) => (action) => {
//   if(typeof action === 'string') {
//     return next({
//       type: action
//     })
//   }
//   return next(action)
// }

// function middleWare(store) {
//   return function (next) {
//     return function (action) {
//       if(typeof action === 'string') {
//         return next({
//           type: action
//         })
//       }
//       return next(action)
//     }
//   }
// }

// const curry = f => a => b => f(a,b);
// const sum = (a,b) => a + b;
// const testCurry = curry(sum);

// console.log(testCurry(1)(1))

const curry = f => a => b => c => f(a,b,c);

function logF(date, importance, message) {
  console.log(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

const log = curry(logF);

log(new Date())('DEBUG')('some debug');

let logNow = log(new Date());

logNow('INFO','message')
