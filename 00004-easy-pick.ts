// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}


// ============= Your Code Here =============
type MyPick<T, K extends keyof T> = { [Key in K]: T[Key] }

// ============= Description ================
/*
  MyPick
  实现一个通用MyPick<T, K>，它返回一个仅包含一些指定属性的子集类型。

  1. in 运算符 遍历联合类型
  2. keyof 将interface转为一个联合类型
  3. T[Key]  返回T类型Key的类型
  4. extends 用于约束K必须是 keyof T的子集，确保K的每个分量都在T存在
*/
