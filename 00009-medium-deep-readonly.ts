// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }


// ============= Your Code Here =============
// type DeepReadonly<T> = T extends object ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> } : T // 无法处理函数类型
type DeepReadonly<T> = T extends Function ? T : T extends object ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> } : T   // ！！！Function属于object中，如果不提前判断Function，将会导致Function类型被处理为object类型，去递归
// type DeepReadonly<T> = keyof T extends never // 无法处理联合类型
//   ? T
//   : { readonly [k in keyof T]: DeepReadonly<T[k]> };

type test1 = DeepReadonly<X1>
type test2 = DeepReadonly<X2>



// =========== description =================
// 1. Function instanceof object, 需要提前判断，由此延申出 属于object类型的其他不需要特殊处理的类型， 可以参考vue-next中实现    
//   vue-next   =>     type Builtin = Prmitive | Function | Date | Error | RegExp;   代表 第一个Function类型