import {Crown} from '@component'

import type {CSSProperties, FC} from 'react'
import type {ImageCommonProps} from '@prop'

type GoldCrownProps = ImageCommonProps & {}

export const GoldCrown: FC<GoldCrownProps> = ({className, style, ...props}) => {
  const styleCrown: CSSProperties = {
    ...style,
    color: 'oklch(0.975 0.016 270.8)'
  }

  return <Crown className={`_gold_crown ${className || ''}`} style={styleCrown} {...props} />
}
