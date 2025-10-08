import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from 'src/manager/stores/__examples'

// Todo 아이템 타입
interface TodoItem {
  id: number
  text: string
  completed: boolean
}

// Todo State 타입 정의
interface TodoState {
  todos: TodoItem[]
  filter: 'all' | 'active' | 'completed'
}

// 초기 상태
const initialState: TodoState = {
  todos: [],
  filter: 'all'
}

// Todo Slice 생성
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: action.payload,
        completed: false
      }
      state.todos.push(newTodo)
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(t => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload)
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload
    },
    clearCompleted: state => {
      state.todos = state.todos.filter(t => !t.completed)
    }
  }
})

// 액션 생성자 export
export const {addTodo, toggleTodo, removeTodo, setFilter, clearCompleted} = todoSlice.actions

// Selectors
export const selectAllTodos = (state: AdminStates) => state.todo.todos
export const selectFilter = (state: AdminStates) => state.todo.filter
export const selectFilteredTodos = (state: AdminStates) => {
  const {todos, filter} = state.todo
  switch (filter) {
    case 'active':
      return todos.filter(t => !t.completed)
    case 'completed':
      return todos.filter(t => t.completed)
    default:
      return todos
  }
}

// 리듀서 export
export default todoSlice.reducer
