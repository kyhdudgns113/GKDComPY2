import {useCallback, useState} from 'react'

import type {ChangeEvent, FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Card.scss'

type CardProps = DivCommonProps & {}

export const Card: FC<CardProps> = ({className, style, ...props}) => {
  const [cardName, setCardName] = useState<string>('')
  const [cardNumStr, setCardNumStr] = useState<string>('')

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCardName(e.currentTarget.value)
  }, [])

  const onChangeCardNumStr = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCardNumStr(e.currentTarget.value)
  }, [])

  return (
    <div className={`Card ${className || ''}`} style={style} {...props}>
      {/* 1. 포지션 */}
      <p className="_card_pos">SP1</p>

      {/* 2. 이름 */}
      <input
        className="_card_name"
        maxLength={5}
        onChange={onChangeName}
        placeholder="카드 이름"
        value={cardName} // ::
      />

      {/* 3. 출소 번호 */}
      <input
        className="_card_number"
        onChange={onChangeCardNumStr}
        placeholder="출소 번호"
        value={cardNumStr} // ::
      />

      {/* 4. 스킬 정보 */}
      {Array.from({length: 3}, (_, idx) => {
        return (
          <div className="_card_skill_row" key={idx}>
            {/* 4-1. 스킬 이름 */}
            <select className="_card_skill_name">
              <option value={0}>닥터 K</option>
              <option value={1}>라패</option>
              <option value={2}>슈퍼스타</option>
            </select>

            {/* 4-2. 스킬 레벨 */}
            <select className="_card_skill_level">
              <option value={0}>E</option>
              <option value={1}>D</option>
              <option value={2}>C</option>
              <option value={3}>B</option>
              <option value={4}>A</option>
              <option value={5}>S</option>
            </select>
          </div>
        )
      })}
    </div>
  )
}
