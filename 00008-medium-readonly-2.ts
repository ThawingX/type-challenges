// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description'>, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}


// ============= Your Code Here =============
type MyReadonly2<T, K extends keyof T = keyof T> = { readonly [Key in keyof T as Key extends K ? Key : never]: T[Key] } & { [Key in keyof T as Key extends K ? never : Key]: T[Key] }

type test = MyReadonly2<Todo1>
type test2 = MyReadonly2<Todo1, 'title' | 'description'>

// ============== description =============\
// 1.  as 断言得是Key
// 2.  泛型可选，可以通过给默认值实现  K extends keyof T = keyof T
// 3. 通过&运算符，可以将两个interface连接