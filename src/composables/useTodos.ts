import { ref } from 'vue'
import { supabase } from '@/utils/supabase'
import type { Todo } from '@/types/todo'

export function useTodos() {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 获取所有任务
  async function fetchTodos() {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      
      todos.value = data || []
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
      const { data, error: createError } = await supabase
        .from('todos')
        .insert([todo])
        .select()
        .single()

      if (createError) throw createError
      
      todos.value.unshift(data)
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create todo'
      console.error('Error creating todo:', err)
      throw err
    }
  }

  // 更新任务
  async function updateTodo(id: number, updates: Partial<Todo>) {
    try {
      const { data, error: updateError } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError
      
      const index = todos.value.findIndex(t => t.id === id)
      if (index !== -1) {
        todos.value[index] = data
      }
      
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update todo'
      console.error('Error updating todo:', err)
      throw err
    }
  }

  // 删除任务
  async function deleteTodo(id: number) {
    try {
      const { error: deleteError } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      
      todos.value = todos.value.filter(t => t.id !== id)
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

  // 实时订阅
  function subscribeToTodos(callback: () => void) {
    const subscription = supabase
      .channel('todos_channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'todos' },
        () => {
          callback()
        }
      )
      .subscribe()

    return subscription
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    subscribeToTodos
  }
}
