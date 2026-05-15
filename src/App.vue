<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTodos } from '@/composables/useTodos'
import type { Todo } from '@/types/todo'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const { todos, loading, error, fetchTodos, createTodo, deleteTodo, toggleTodo } = useTodos()

const newTodoTitle = ref('')
const newTodoPriority = ref(1) // 默认优先级：1=低
const showDeleteDialog = ref(false)
const todoToDelete = ref<number | null>(null)

// 添加新任务
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
    newTodoPriority.value = 1 // 重置为默认优先级
  } catch (err) {
    console.error('Failed to add todo:', err)
  }
}

// 切换完成状态
async function handleToggleTodo(todo: Todo) {
  try {
    await toggleTodo(todo.id, !todo.completed)
  } catch (err) {
    console.error('Failed to toggle todo:', err)
  }
}

// 删除任务
function handleDeleteTodo(id: number) {
  todoToDelete.value = id
  showDeleteDialog.value = true
}

// 确认删除
async function confirmDelete() {
  if (todoToDelete.value === null) return
  
  try {
    await deleteTodo(todoToDelete.value)
    todoToDelete.value = null
  } catch (err) {
    console.error('Failed to delete todo:', err)
  }
}

// 获取优先级标签
function getPriorityLabel(priority: number): string {
  const labels: Record<number, string> = {
    1: '低',
    2: '中',
    3: '高'
  }
  return labels[priority] || '低'
}

// 获取优先级颜色
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
  <div class="container">
    <h1>📝 Todo List</h1>
    
    <!-- 添加新任务 -->
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

    <!-- 加载状态 -->
    <div v-if="loading" class="loading">加载中...</div>

    <!-- 错误提示 -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- 任务列表 -->
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

    <!-- 空状态 -->
    <div v-if="!loading && todos.length === 0" class="empty-state">
      <p>暂无任务，添加一个吧！✨</p>
    </div>
  </div>

  <!-- 删除确认对话框 -->
  <ConfirmDialog
    v-model="showDeleteDialog"
    title="确认删除"
    message="确定要删除这个任务吗？此操作不可撤销。"
    @confirm="confirmDelete"
  />
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #1f2937;
  margin-bottom: 2rem;
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
  border-color: #3b82f6;
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
  border-color: #3b82f6;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #2563eb;
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
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: box-shadow 0.2s;
}

.todo-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
