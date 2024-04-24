// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]


// ============= Your Code Here =============
// 1. 通过数组为空，返回never，否则返回数组的第一个元素
// type First<T extends any[]> = T extends [] ? never : T[0]

// 2. 通过数字长度判断
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]

// ============= description ==============
type Test<T extends any[]> = T[0]
type Length<T extends any[]> = T['length']

type t1 = Test<[]> // undefined
type l1 = Length<[{},{}]> // 2
// 1. 空数组的元素类型为undefined
// 2. extends 对前面类型进行约束
// 3. T['length']可以获取该类型的长度

