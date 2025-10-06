import type {FC} from 'react'
import type {InputCommonProps} from '../../typesAndValues'

type InputProps = InputCommonProps & {
  disabled?: boolean
  maxLength?: number
  placeholder?: string
  type?: string
  value: string | number
}

/**
 * 1. outline 제거
 * 2. 숫자 입력시 화살표 제거
 */
export const Input: FC<InputProps> = ({
  disabled,
  maxLength,
  placeholder,
  type,
  value,
  // ::
  className,
  ...props
}) => {
  return (
    <>
      <style>
        {`
            /* Chrome, Safari, Edge, Opera */
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            /* Firefox */
            input[type="number"] {
              -moz-appearance: textfield;
            }
          `}
      </style>
      <input
        className={'outline-none ' + ` ${className || ''}`}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder || ''}
        style={{
          ...props.style,
          appearance: 'textfield',
          MozAppearance: 'textfield',
          WebkitAppearance: 'none'
        }}
        type={type || 'text'}
        value={value}
        {...props}
      />
    </>
  )
}
