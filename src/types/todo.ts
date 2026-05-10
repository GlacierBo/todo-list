// 任务类型定义
export interface Todo {
  id: number
  title: string
  description?: string
  completed: boolean
  priority: number // 1: 低, 2: 中, 3: 高
  due_date?: string
  user_id?: string
  created_at: string
  updated_at: string
}

// 标签类型定义
export interface Tag {
  id: number
  name: string
  color: string
  user_id?: string
  created_at: string
}

// 任务标签关联
export interface TodoTag {
  todo_id: number
  tag_id: number
}
