'use client'
import React, { forwardRef } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput, { Value } from 'react-phone-number-input'

const CustomInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const { className, ...rest } = props
  return (
    <input 
      ref={ref}
      className={`${className} w-full outline-none bg-transparent`} 
      {...rest} 
    />
  )
})
CustomInput.displayName = 'CustomInput'

const CustomPhoneInput = ({ value, onChange, id, placeholder }: { value: string, onChange: (value?: Value) => void, id?: string, placeholder?: string }) => {
  return (
    <div className="relative">
      <PhoneInput
				id={id}
				placeholder={placeholder}
        value={value}
        defaultCountry='IT'
        onChange={onChange}
        className="custom-phone-input w-full h-10 px-3 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200"
        international
        countrySelectProps={{ unicodeFlags: true }}
        inputComponent={CustomInput}
      />
    </div>
  )
}

export default CustomPhoneInput