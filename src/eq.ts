
// interface MatchPair {}

import { exp } from "./core";
// import { some } from "./option";

// export function match<T>(value: T, arms: (value: T) => MatchPair) {

// }

// const _ = "_";
// const x = 1;

// match(x, () => [
//   [ 2, 3, () => {} ],
//   [ _, () => {} ],
// ])


export function cmp<T>(lhsValue: T, rhsValue: T) {
  if ((typeof lhsValue !== typeof rhsValue) || (typeof lhsValue === "function" || typeof rhsValue === "function")) {
    return 0;
  }
    
  const cmpResult = lhsValue === rhsValue ? 1 : -1;

  switch (typeof lhsValue) {
    case "number": return typeof rhsValue === "number" ? cmpResult : 0;
    case "string": return  typeof rhsValue === "string" ? cmpResult : 0;
    case "boolean": return typeof rhsValue === "boolean" ? cmpResult : 0;
    case "object": return typeof rhsValue === "object" ? exp(() => {
      
        const lArr = Array.isArray(lhsValue);
        const rArr = Array.isArray(rhsValue);
      
        if ((!lArr && rArr) || (lArr && !rArr)) {
          return 0;
        }

        if (lArr && rArr) {

          if (lhsValue.length === rhsValue.length) {
            
            if (lhsValue.length === 0 && rhsValue.length === 0) {
              return 1;
            } else {
              const matchedTimes: number = lhsValue.reduce<number>((tot, cur, i) => tot + cmp(cur, rhsValue[i]), 0);
              
              return matchedTimes === rhsValue.length ? 1 : -1;
            }

          } else { return -1 }

        } else {
            const lhsKeys = Object.keys(lhsValue!);
            const rhsKeys = Object.keys(rhsValue!);
      
            if (lhsKeys.length === 0 && rhsKeys.length === 0) {
              return 1;
            }

            const matchedKeysTimes = lhsKeys.reduce((tot, cur, i) => tot + cmp(cur, rhsKeys[i]), 0);

            if (matchedKeysTimes !== rhsKeys.length) {
              return -1
            }

            const lhsValues = Object.values(lhsValue!);
            const rhsValues = Object.values(rhsValue!);
            
            const matchedValuesTimes: number = lhsValues.reduce((tot, cur, i) => tot + cmp(cur, rhsValues[i]), 0);
            
            return matchedValuesTimes === rhsValues.length ? 1 : -1;
        }
        
      }) : 0;
    case "symbol": return typeof rhsValue === "symbol" ? cmpResult : 0;
    case "bigint": return typeof rhsValue === "bigint" ? cmpResult : 0;
    default: return 0;
  }
}
