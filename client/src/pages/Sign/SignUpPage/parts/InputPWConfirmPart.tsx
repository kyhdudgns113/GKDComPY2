import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {Setter} from '@type'

type InputPWConfirmPartProps = DivCommonProps & {
  setter: Setter<string>
  value: string
}

export const InputPWConfirmPart: FC<InputPWConfirmPartProps> = ({setter, value, className, style, ...props}) => {
  return (
    <div className={`InputPWConfirm_Part _part_input ${className || ''}`} style={style} {...props}>
      <p className="_category">PW2</p>
      <input className="_input" value={value} onChange={e => setter(e.target.value)} type="password" />
    </div>
  )
}
