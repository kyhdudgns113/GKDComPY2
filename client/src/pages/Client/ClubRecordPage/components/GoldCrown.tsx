import {Crown} from '@component'

import type {CSSProperties, FC} from 'react'
import type {ImageCommonProps} from '@prop'

type GoldCrownProps = ImageCommonProps & {}

export const GoldCrown: FC<GoldCrownProps> = ({className, style, ...props}) => {
  const styleCrown: CSSProperties = {
    ...style,
    color: 'oklch(0.9 0.12 80)'
  }

  return <Crown className={`_gold_crown ${className || ''}`} style={styleCrown} {...props} />
}
