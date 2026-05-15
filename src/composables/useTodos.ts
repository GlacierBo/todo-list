import { ref } from 'vue'
import type { Todo } from '@/types/todo'

const STORAGE_KEY = 'todos'

export function useTodos() {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 从 LocalStorage 加载数据
  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        todos.value = JSON.parse(stored)
      }
    } catch (err) {
      error.value = 'Failed to load todos from storage'
      console.error('Error loading todos:', err)
    }
  }

  // 保存数据到 LocalStorage
  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
    } catch (err) {
      error.value = 'Failed to save todos to storage'
      console.error('Error saving todos:', err)
    }
  }

  // 获取所有任务
  async function fetchTodos() {
    loading.value = true
    error.value = null
    
    try {
      loadFromStorage()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error fetching todos:', err)
    } finally {
      loading.value = false
    }
  }

  // 创建新任务
  async function createTodo(todo: Omit<Todo, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const now = new Date().toISOString()
      const id = Date.now() // 使用时间戳作为 ID
      const newTodo: Todo = {
        ...todo,
        id,
        created_at: now,
        updated_at: now
      }
      
      todos.value.unshift(newTodo)
      saveToStorage()
      return newTodo
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create todo'
      console.error('Error creating todo:', err)
      throw err
    }
  }

  // 更新任务
  async function updateTodo(id: number, updates: Partial<Todo>) {
    try {
      const index = todos.value.findIndex(t => t.id === id)
      if (index === -1) {
        throw new Error('Todo not found')
      }
      
      const updatedTodo = {
        ...todos.value[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      
      todos.value[index] = updatedTodo
      saveToStorage()
      return updatedTodo
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update todo'
      console.error('Error updating todo:', err)
      throw err
    }
  }

  // 删除任务
  async function deleteTodo(id: number) {
    try {
      todos.value = todos.value.filter(t => t.id !== id)
      saveToStorage()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete todo'
      console.error('Error deleting todo:', err)
      throw err
    }
  }

  // 切换完成状态
  async function toggleTodo(id: number, completed: boolean) {
    return updateTodo(id, { completed })
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
  }
}
