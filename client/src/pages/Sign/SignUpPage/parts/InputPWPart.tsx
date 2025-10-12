import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {Setter} from '@type'

type InputPWPartProps = DivCommonProps & {
  setter: Setter<string>
  value: string
}

export const InputPWPart: FC<InputPWPartProps> = ({setter, value, className, style, ...props}) => {
  return (
    <div className={`InputPW_Part _part_input ${className || ''}`} style={style} {...props}>
      <p className="_category">PW</p>
      <input className="_input" value={value} onChange={e => setter(e.target.value)} type="password" />
    </div>
  )
}
