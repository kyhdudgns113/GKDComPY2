import {Crown} from '@component'

import type {CSSProperties, FC} from 'react'
import type {ImageCommonProps} from '@prop'

type SilverCrownProps = ImageCommonProps & {}

export const SilverCrown: FC<SilverCrownProps> = ({className, style, ...props}) => {
  const styleCrown: CSSProperties = {
    ...style,
    color: 'oklch(0.925 0.016 270.8)'
  }

  return <Crown className={`_silver_crown ${className || ''}`} style={styleCrown} {...props} />
}
