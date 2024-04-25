// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]


// ============= Your Code Here =============
// type Includes<T extends readonly any[], U> = U extends T[number] ? true : false  // 简单类型的元组匹配，不满足对象，联合类型
// type Includes<T extends readonly any[], U> = { [Key in T[number]]: true }[U] extends true ? true : false // 不能对联合类型，以及，无法做接口key的泛型T做校验

// type MyEqual<X, Y> = X extends Y ? Y extends X ? true : false : false  //直接通过extends 来判断类型，无法判断类型前只读的限制 !!!!!!!!!!!!
type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false
type Includes<T extends readonly any[], U> = T extends [infer First, ...infer Last] ?  // 递归实现遍历类型，通过现成Equal类型实现对于类型的匹配
  MyEqual<U, First> extends true ?
  true :
  Includes<Last, U> :
  false

type test = Includes<['kars', 'wammu'], 'kars'>
type test2 = Includes<[1], 1 | 2>
type test3 = Includes<[1 | 2], 1>
type test4 = Includes<[{ a: 'A' }], { readonly a: 'A' }>
type test5 = Includes<[1 | 2], 1>
