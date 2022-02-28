export function loggerMiddleware(storeAPI: any) {
  return function wrapDispatch(next: any) {
    return function handleAction(action: any) {
      console.log('DISPATCH -> ', action);
      const result = next(action);
      console.log('NEXT STATE -> ', storeAPI.getState());
      return result;
    };
  };
}

// dispatch(async function ({ dispatch, getState }) {
//   adsfklasdjfkl;
//   asjfkl;
//   sdjfklsf;
//   asfajfasf;
// });

// const asyncFunctionMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
//   if (typeof action === 'function') {
//     return action(storeAPI.dispatch, storeAPI.getState);
//   }

//   return next(action);
// };

// function asyncFunctionMiddleware(storeAPI) {
//   return function ()
// }

// asdfadsfads - [m1] -> [m2] -> [m3] -> dispatch -> reducer -> state
// dispatch({ type })
