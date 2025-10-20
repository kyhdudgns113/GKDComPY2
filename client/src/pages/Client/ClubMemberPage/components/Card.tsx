import {useCallback, useEffect, useState} from 'react'

import {useMemberCallbacksContext} from '@context'
import {positionValue} from '@bases/values/positionValues'
import {batterSkillEntire, batterSkillHero, batterSkillLegend, batterSkillPlatinum, pitcherSkillEntire} from '@bases/values/skillNames'

import type {ChangeEvent, FC, FocusEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {CardType} from '@shareType'

import '../_styles/Card.scss'

type CardProps = DivCommonProps & {card: CardType}

export const Card: FC<CardProps> = ({card, className, style, ...props}) => {
  const {modifyMemberCard} = useMemberCallbacksContext()

  const [cardName, setCardName] = useState<string>('')
  const [cardNumStr, setCardNumStr] = useState<string>('')
  const [skillIdxs, setSkillIdxs] = useState<number[]>([0, 1, 2])
  const [skillLevels, setSkillLevels] = useState<number[]>([0, 0, 0])

  const {posIdx} = card

  const skillNames = posIdx < 11 ? pitcherSkillEntire : batterSkillEntire

  const _executeModify = useCallback(
    (memOId: string, posIdx: number, cardName: string, cardNumber: number | null, skillIdxs: number[], skillLevels: number[]) => {
      modifyMemberCard(memOId, posIdx, cardName, cardNumber, skillIdxs, skillLevels)
    },
    [modifyMemberCard]
  )

  const onBlurInput = useCallback(
    (memOId: string, posIdx: number, cardName: string, cardNumStr: string, skillIdxs: number[], skillLevels: number[]) =>
      (e: FocusEvent<HTMLInputElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const cardNumber = cardNumStr ? parseInt(cardNumStr) : null

        _executeModify(memOId, posIdx, cardName, cardNumber, skillIdxs, skillLevels)
      },
    [_executeModify] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCardName(e.currentTarget.value)
  }, [])

  const onChangeCardNumStr = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCardNumStr(e.currentTarget.value)
  }, [])

  const onChangeSkillIdx = useCallback(
    (memOId: string, posIdx: number, cardName: string, cardNumStr: string, skillIdxs: number[], skillLevels: number[]) =>
      (e: ChangeEvent<HTMLSelectElement>) => {
        const newSkillIdx = parseInt(e.currentTarget.value)
        const newSkillIdxs = [...skillIdxs]
        newSkillIdxs[posIdx] = newSkillIdx
        setSkillIdxs(newSkillIdxs)

        const cardNumber = cardNumStr ? parseInt(cardNumStr) : null
        _executeModify(memOId, posIdx, cardName, cardNumber, newSkillIdxs, skillLevels)
      },
    [_executeModify] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onChangeSkillLevel = useCallback(
    (memOId: string, posIdx: number, cardName: string, cardNumStr: string, skillIdxs: number[], skillLevels: number[]) =>
      (e: ChangeEvent<HTMLSelectElement>) => {
        const newSkillLevel = parseInt(e.currentTarget.value)
        const newSkillLevels = [...skillLevels]
        newSkillLevels[posIdx] = newSkillLevel
        setSkillLevels(newSkillLevels)

        const cardNumber = cardNumStr ? parseInt(cardNumStr) : null
        _executeModify(memOId, posIdx, cardName, cardNumber, skillIdxs, newSkillLevels)
      },
    [_executeModify] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // 초기화: 카드의 정보
  useEffect(() => {
    setCardName(card.cardName || '')
    setCardNumStr(card.cardNumber?.toString() || '')
    setSkillIdxs(card.skillIdxs)
    setSkillLevels(card.skillLevels)
  }, [card])

  return (
    <div className={`Card ${className || ''}`} style={style} {...props}>
      {/* 1. 포지션 */}
      <p className="_card_pos">{positionValue[posIdx]}</p>

      {/* 2. 이름 */}
      <input
        className="_card_name"
        maxLength={5}
        onBlur={onBlurInput(card.memOId, posIdx, cardName, cardNumStr, skillIdxs, skillLevels)}
        onChange={onChangeName}
        placeholder="카드 이름"
        tabIndex={10 + 2 * posIdx}
        value={cardName} // ::
      />

      {/* 3. 출소 번호 */}
      <input
        className="_card_number"
        onBlur={onBlurInput(card.memOId, posIdx, cardName, cardNumStr, skillIdxs, skillLevels)}
        onChange={onChangeCardNumStr}
        placeholder="출소 번호"
        tabIndex={10 + 2 * posIdx + 1}
        value={cardNumStr} // ::
      />

      {/* 4. 스킬 정보 */}
      {Array.from({length: 3}, (_, idx) => {
        const otherIdx1 = (idx + 1) % 3
        const otherIdx2 = (idx + 2) % 3

        const sIdx = skillIdxs[idx]

        const isLegend = sIdx < batterSkillLegend.length
        const isPlatinum = !isLegend && sIdx < batterSkillLegend.length + batterSkillPlatinum.length
        const isHero = !isLegend && !isPlatinum && sIdx < batterSkillLegend.length + batterSkillPlatinum.length + batterSkillHero.length

        const cnBg = isLegend ? '_opt_legend' : isPlatinum ? '_opt_platinum' : isHero ? '_opt_hero' : '_opt_normal'

        return (
          <div className="_card_skill_row" key={idx}>
            {/* 4-1. 스킬 이름 */}
            <select
              className={`_card_skill_name ${cnBg}`}
              value={skillIdxs[idx]}
              onChange={onChangeSkillIdx(card.memOId, posIdx, cardName, cardNumStr, skillIdxs, skillLevels)}
            >
              {skillNames.map((skillName, sIdx) => {
                // 스킬이 겹치면 안된다
                if (sIdx === skillIdxs[otherIdx1] || sIdx === skillIdxs[otherIdx2]) {
                  return null
                }

                const isLegend = sIdx < batterSkillLegend.length
                const isPlatinum = !isLegend && sIdx < batterSkillLegend.length + batterSkillPlatinum.length
                const isHero = !isLegend && !isPlatinum && sIdx < batterSkillLegend.length + batterSkillPlatinum.length + batterSkillHero.length

                const cnBg = isLegend ? '_opt_legend' : isPlatinum ? '_opt_platinum' : isHero ? '_opt_hero' : '_opt_normal'

                return (
                  <option value={sIdx} key={sIdx} className={cnBg}>
                    {skillName}
                  </option>
                )
              })}
            </select>

            {/* 4-2. 스킬 레벨 */}
            <select
              className="_card_skill_level"
              value={skillLevels[idx]}
              onChange={onChangeSkillLevel(card.memOId, posIdx, cardName, cardNumStr, skillIdxs, skillLevels)}
            >
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
