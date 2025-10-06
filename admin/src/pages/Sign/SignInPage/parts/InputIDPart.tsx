import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {Setter} from '@type'

type InputIDPartProps = DivCommonProps & {
  setter: Setter<string>
  value: string
}

export const InputIDPart: FC<InputIDPartProps> = ({setter, value, className, style, ...props}) => {
  return (
    <div className={`InputID_Part _part_input ${className || ''}`} style={style} {...props}>
      <p className="_category">ID</p>
      <input autoFocus className="_input" value={value} onChange={e => setter(e.target.value)} />
    </div>
  )
}
