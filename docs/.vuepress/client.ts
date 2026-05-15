import { defineClientConfig } from 'vuepress/client'
import TodoList from '../todolist.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('TodoList', TodoList)
  },
})
