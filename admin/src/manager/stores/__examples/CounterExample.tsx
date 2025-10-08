import {useAppDispatch, useAppSelector} from 'src/manager/stores/__examples'
import {increment, decrement, incrementByAmount, reset, selectCount} from 'src/manager/stores/__examples'

/**
 * Redux Counter 예시 컴포넌트
 * - 버튼을 클릭하여 숫자를 증가/감소시킵니다
 * - Redux Toolkit을 사용하여 상태를 관리합니다
 */
export function CounterExample() {
  // Redux store에서 counter 값 가져오기
  const count = useAppSelector(selectCount)

  // dispatch 함수 가져오기
  const dispatch = useAppDispatch()

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Redux Counter 예시</h2>

        {/* 현재 카운터 값 표시 */}
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-blue-600 mb-2">{count}</div>
          <p className="text-gray-600">현재 카운터 값</p>
        </div>

        {/* 버튼 그룹 */}
        <div className="space-y-3">
          {/* 기본 증가/감소 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={() => dispatch(decrement())}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              -1 감소
            </button>
            <button
              onClick={() => dispatch(increment())}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              +1 증가
            </button>
          </div>

          {/* 특정 값만큼 증가 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={() => dispatch(incrementByAmount(5))}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              +5 증가
            </button>
            <button
              onClick={() => dispatch(incrementByAmount(10))}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              +10 증가
            </button>
          </div>

          {/* 리셋 버튼 */}
          <button
            onClick={() => dispatch(reset())}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            🔄 리셋 (0으로)
          </button>
        </div>

        {/* 설명 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">💡 Redux 작동 방식:</h3>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>버튼 클릭 → dispatch(액션) 호출</li>
            <li>액션이 Redux Store로 전달됨</li>
            <li>Reducer가 액션을 처리하여 상태 업데이트</li>
            <li>useSelector가 새로운 상태를 감지하여 리렌더링</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
