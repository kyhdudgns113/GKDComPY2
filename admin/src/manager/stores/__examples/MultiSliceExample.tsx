import {useState} from 'react'
import {useAppDispatch, useAppSelector} from 'src/manager/stores/__examples'
import {
  // Counter 관련
  increment,
  decrement,
  selectCount,
  // User 관련
  setName,
  setAge,
  setEmail,
  resetUser,
  selectUser,
  // Todo 관련
  addTodo,
  toggleTodo,
  removeTodo,
  selectFilteredTodos
} from 'src/manager/stores/__examples'

/**
 * 여러 Slice를 동시에 사용하는 예시
 * 하나의 Store에 counter, user, todo 세 개의 Slice가 통합되어 있습니다
 */
export function MultiSliceExample() {
  const dispatch = useAppDispatch()

  // 각각의 Slice에서 상태 가져오기
  const count = useAppSelector(selectCount)
  const user = useAppSelector(selectUser)
  const todos = useAppSelector(selectFilteredTodos)

  // 로컬 input 상태
  const [todoInput, setTodoInput] = useState('')

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">여러 Slice 동시 사용 예시</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Counter Slice */}
        <div className="bg-blue-50 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Counter Slice</h2>
          <div className="text-4xl font-bold text-center mb-4">{count}</div>
          <div className="space-y-2">
            <button onClick={() => dispatch(increment())} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
              +1
            </button>
            <button onClick={() => dispatch(decrement())} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
              -1
            </button>
          </div>
        </div>

        {/* User Slice */}
        <div className="bg-green-50 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-green-700">User Slice</h2>
          <div className="space-y-3 text-sm">
            <div>
              <label className="block text-gray-700 mb-1">이름:</label>
              <input
                type="text"
                value={user.name}
                onChange={e => dispatch(setName(e.target.value))}
                className="w-full px-3 py-2 border rounded"
                placeholder="이름 입력"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">나이:</label>
              <input
                type="number"
                value={user.age || ''}
                onChange={e => dispatch(setAge(Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded"
                placeholder="나이 입력"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">이메일:</label>
              <input
                type="email"
                value={user.email}
                onChange={e => dispatch(setEmail(e.target.value))}
                className="w-full px-3 py-2 border rounded"
                placeholder="이메일 입력"
              />
            </div>
            <button onClick={() => dispatch(resetUser())} className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mt-2">
              리셋
            </button>
          </div>
        </div>

        {/* Todo Slice */}
        <div className="bg-purple-50 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-purple-700">Todo Slice</h2>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={todoInput}
                onChange={e => setTodoInput(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter' && todoInput.trim()) {
                    dispatch(addTodo(todoInput))
                    setTodoInput('')
                  }
                }}
                className="flex-1 px-3 py-2 border rounded text-sm"
                placeholder="할 일 추가"
              />
              <button
                onClick={() => {
                  if (todoInput.trim()) {
                    dispatch(addTodo(todoInput))
                    setTodoInput('')
                  }
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-sm"
              >
                추가
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {todos.map(todo => (
                <div key={todo.id} className="flex items-center gap-2 bg-white p-2 rounded">
                  <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleTodo(todo.id))} className="w-4 h-4" />
                  <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-400' : ''}`}>{todo.text}</span>
                  <button onClick={() => dispatch(removeTodo(todo.id))} className="text-red-500 hover:text-red-700 text-sm">
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 설명 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-3">🎯 핵심 포인트</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">1.</span>
            <span>
              <strong>하나의 Store</strong>만 사용합니다 (store.ts에서 configureStore 한 번만 호출)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">2.</span>
            <span>
              <strong>여러 개의 Slice</strong>를 만들어 기능별로 상태를 분리합니다 (counterSlice, userSlice, todoSlice)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 font-bold">3.</span>
            <span>
              각 Slice는 <strong>독립적으로</strong> 작동하지만 <strong>하나의 Store</strong>에 통합됩니다
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 font-bold">4.</span>
            <span>
              <strong>동일한 useAppSelector/useAppDispatch</strong>로 모든 Slice에 접근 가능합니다
            </span>
          </li>
        </ul>
      </div>

      {/* Store 구조 시각화 */}
      <div className="bg-gray-50 rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-3">📦 Store 구조</h3>
        <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
          {`{
  counter: {
    value: ${count}
  },
  user: {
    name: "${user.name}",
    age: ${user.age},
    email: "${user.email}"
  },
  todo: {
    todos: [${todos.length}개],
    filter: "all"
  }
}`}
        </pre>
        <p className="mt-3 text-sm text-gray-600">
          ☝️ 위와 같이 <strong>하나의 Store 객체</strong> 안에 모든 Slice의 상태가 통합되어 있습니다!
        </p>
      </div>
    </div>
  )
}
