import {Modal} from '@component'
import {useAppDispatch} from '@store'
import {closeModal} from '@store'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type ModalAddUserProps = DivCommonProps & {}

export const ModalAddUser: FC<ModalAddUserProps> = ({className, style, ...props}) => {
  const dispatch = useAppDispatch()

  return (
    <Modal onClose={() => dispatch(closeModal())} className={`${className || ''}`} style={style} {...props}>
      <div>
        <p>yes</p>
      </div>
    </Modal>
  )
}
