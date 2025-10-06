import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type SignInPageProps = DivCommonProps & {}

export const SignInPage: FC<SignInPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`SignIn_Page ${className}`} style={style} {...props}>
      <p>SignInPage</p>
    </div>
  )
}
