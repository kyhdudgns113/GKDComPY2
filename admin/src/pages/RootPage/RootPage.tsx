import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type RootPageProps = DivCommonProps & {}

export const RootPage: FC<RootPageProps> = ({className, style, ...props}) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/signIn')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`Root_Page ${className}`} style={style} {...props}>
      <p>페이지 로딩중이에요...</p>
    </div>
  )
}
