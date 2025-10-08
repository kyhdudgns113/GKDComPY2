# Redux Counter 예시 사용법

## 1. 패키지 설치

먼저 Redux Toolkit과 React-Redux를 설치해야 합니다:

```bash
npm install @reduxjs/toolkit react-redux
```

## 2. 파일 구조

```
admin/src/
├── manager/stores/
│   ├── store.ts              # Redux Store 설정
│   ├── counterSlice.ts       # Counter 상태 관리 (액션 + 리듀서)
│   ├── hooks.ts              # TypeScript용 커스텀 hooks
│   └── index.ts              # 통합 export
├── pages/AdminPages/
│   └── CounterExample.tsx    # Counter 컴포넌트 예시
└── main.tsx                  # Provider로 앱 감싸기
```

## 3. 핵심 개념

### 📦 Store (store.ts)
- 애플리케이션의 **전역 상태를 저장**하는 곳
- `configureStore`로 생성
- 여러 개의 slice(reducer)를 결합

### 🔪 Slice (counterSlice.ts)
- **특정 기능의 상태 + 액션 + 리듀서**를 한 곳에서 관리
- `createSlice`로 생성
- 액션과 리듀서를 자동으로 생성해줌

### 🎯 Actions (액션)
- 상태를 **어떻게 변경할지** 설명하는 객체
- 예: `increment()`, `decrement()`, `incrementByAmount(5)`

### ⚙️ Reducers (리듀서)
- 액션을 받아서 **실제로 상태를 변경**하는 함수
- Redux Toolkit은 Immer 라이브러리를 내장하여 직접 수정하는 것처럼 코드 작성 가능

### 🪝 Hooks
- `useAppSelector`: Store에서 상태를 **읽어오기**
- `useAppDispatch`: 액션을 **전달(dispatch)**하기

## 4. 사용 예시

### Counter 컴포넌트에서 사용하기

```tsx
import {useAppDispatch, useAppSelector} from '@/manager/stores/hooks'
import {increment, decrement, selectCount} from '@/manager/stores/counterSlice'

function Counter() {
  // 상태 읽기
  const count = useAppSelector(selectCount)
  
  // 액션 보내기
  const dispatch = useAppDispatch()

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>증가</button>
      <button onClick={() => dispatch(decrement())}>감소</button>
    </div>
  )
}
```

## 5. 데이터 흐름

```
[버튼 클릭]
    ↓
dispatch(increment())  ← 액션 전달
    ↓
[Redux Store]
    ↓
counterSlice의 리듀서가 state.value += 1 실행
    ↓
[Store 상태 업데이트]
    ↓
useAppSelector가 변경 감지
    ↓
[컴포넌트 리렌더링] ← 새로운 count 값 표시
```

## 6. 새로운 Slice 추가 방법

다른 기능(예: 사용자 정보)을 관리하려면:

1. **새 slice 파일 생성** (`userSlice.ts`)
```tsx
export const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', age: 0 },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setAge: (state, action) => {
      state.age = action.payload
    },
  },
})
```

2. **store.ts에 추가**
```tsx
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,  // ← 추가
  },
})
```

## 7. 실행 방법

`CounterExample` 컴포넌트를 원하는 페이지에서 import해서 사용:

```tsx
import {CounterExample} from './pages/AdminPages/CounterExample'

function SomePage() {
  return (
    <div>
      <h1>My Page</h1>
      <CounterExample />
    </div>
  )
}
```

## 8. Redux DevTools

Chrome/Edge 확장 프로그램 "Redux DevTools"를 설치하면:
- 상태 변화를 시각적으로 확인
- 액션 히스토리 추적
- 타임 트래블 디버깅 가능

Redux Toolkit은 자동으로 DevTools를 활성화합니다.

---

## 참고 자료
- [Redux Toolkit 공식 문서](https://redux-toolkit.js.org/)
- [React-Redux 공식 문서](https://react-redux.js.org/)

