// ============= Test Cases =============
import type { Equal, Expect, Debug } from './test-utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const sym1 = Symbol(1)
const sym2 = Symbol(2)
const tupleSymbol = [sym1, sym2] as const
const tupleMix = [1, '2', 3, '4', sym1] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleSymbol>, { [sym1]: typeof sym1;[sym2]: typeof sym2 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4';[sym1]: typeof sym1 }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>


// ============= Your Code Here =============
type TupleToObject<T extends readonly any[]> = { [Key in T[number]]: Key }

// ============= description =============

/*
  1. as const : 断言为常量 即只读，  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const 代表 tuple[1] = 'newTesla' 是报错的 =》  const tuple: readonly ["tesla", "model 3", "model X", "model Y"]\
  2.  tuple 为定长数组，可以理解为 { 1:'tesla', 2:'model 3', 3:'model X', 4:'model Y' }，key为数字的对象， T[number] 返回一个联合类型，即为tuple的所有类型
*/

// const testTuple = [1, 9] as const

// type test = [
//   Debug<testTuple<typeof testTuple>>
// ]

// type testTuple<T extends readonly number[]> = { [Key in keyof T]: number }