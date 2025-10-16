import type {FC} from 'react'
import type {TableBodyCommonProps} from '@prop'

type TableBodyObjectProps = TableBodyCommonProps & {}

export const TableBodyObject: FC<TableBodyObjectProps> = ({className, style, ...props}) => {
  return (
    <tbody className={`TableBody_Object ${className || ''}`} style={style} {...props}>
      <tr>
        <td>C</td>
      </tr>
    </tbody>
  )
}
