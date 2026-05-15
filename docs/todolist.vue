<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTodos } from '../src/composables/useTodos'
import type { Todo } from '../src/types/todo'
import ConfirmDialog from '../src/components/ConfirmDialog.vue'

const { todos, loading, error, fetchTodos, createTodo, deleteTodo, toggleTodo } = useTodos()

const newTodoTitle = ref('')
const newTodoPriority = ref(1)
const showDeleteDialog = ref(false)
const todoToDelete = ref<number | null>(null)

async function handleAddTodo() {
  if (!newTodoTitle.value.trim()) return
  
  try {
    await createTodo({
      title: newTodoTitle.value.trim(),
      description: '',
      completed: false,
      priority: newTodoPriority.value
    })
    newTodoTitle.value = ''
    newTodoPriority.value = 1
  } catch (err) {
    console.error('Failed to add todo:', err)
  }
}

async function handleToggleTodo(todo: Todo) {
  try {
    await toggleTodo(todo.id, !todo.completed)
  } catch (err) {
    console.error('Failed to toggle todo:', err)
  }
}

function handleDeleteTodo(id: number) {
  todoToDelete.value = id
  showDeleteDialog.value = true
}

async function confirmDelete() {
  if (todoToDelete.value === null) return
  
  try {
    await deleteTodo(todoToDelete.value)
    todoToDelete.value = null
  } catch (err) {
    console.error('Failed to delete todo:', err)
  }
}

function getPriorityLabel(priority: number): string {
  const labels: Record<number, string> = {
    1: '低',
    2: '中',
    3: '高'
  }
  return labels[priority] || '低'
}

function getPriorityColor(priority: number): string {
  const colors: Record<number, string> = {
    1: '#9ca3af',
    2: '#f59e0b',
    3: '#ef4444'
  }
  return colors[priority] || '#9ca3af'
}

onMounted(() => {
  fetchTodos()
})
</script>

<template>
  <div class="todolist-page">
    <div class="todolist-container">
      <h1>📝 Todo List</h1>
      
      <div class="add-todo">
        <input
          v-model="newTodoTitle"
          @keyup.enter="handleAddTodo"
          type="text"
          placeholder="添加新任务..."
          class="todo-input"
        />
        <select v-model="newTodoPriority" class="priority-select">
          <option :value="1">🟢 低</option>
          <option :value="2">🟡 中</option>
          <option :value="3">🔴 高</option>
        </select>
        <button @click="handleAddTodo" class="add-btn">添加</button>
      </div>

      <div v-if="loading" class="loading">加载中...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <ul v-if="!loading && todos.length > 0" class="todo-list">
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
          <div class="todo-content">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="handleToggleTodo(todo)"
              class="todo-checkbox"
            />
            <div class="todo-info">
              <span :class="{ completed: todo.completed }" class="todo-title">
                {{ todo.title }}
              </span>
              <span 
                class="priority-badge" 
                :style="{ backgroundColor: getPriorityColor(todo.priority) }"
              >
                {{ getPriorityLabel(todo.priority) }}
              </span>
            </div>
          </div>
          <button @click="handleDeleteTodo(todo.id)" class="delete-btn">
            删除
          </button>
        </li>
      </ul>

      <div v-if="!loading && todos.length === 0" class="empty-state">
        <p>暂无任务，添加一个吧！✨</p>
      </div>
    </div>

    <ConfirmDialog
      v-model="showDeleteDialog"
      title="确认删除"
      message="确定要删除这个任务吗？此操作不可撤销。"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style>
.todolist-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.todolist-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: center;
  color: #1f2937;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.add-todo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.priority-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.2s;
  background-color: white;
  min-width: 100px;
}

.priority-select:focus {
  outline: none;
  border-color: #667eea;
}

.todo-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.todo-input:focus {
  outline: none;
  border-color: #667eea;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.loading,
.error,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.error {
  color: #ef4444;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.todo-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateX(4px);
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.todo-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
}

.todo-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.todo-title {
  font-size: 1rem;
  color: #1f2937;
}

.todo-title.completed {
  text-decoration: line-through;
  color: #9ca3af;
}

.priority-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
}

.delete-btn {
  padding: 0.5rem 1rem;
  background-color: #fee2e2;
  color: #ef4444;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: #fecaca;
}
</style>
