'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Eye, EyeOff } from 'lucide-react'

const PasswordInput = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<div className="relative">
			<Input
				type={showPassword ? "text" : "password"}
				placeholder="Enter password"
				className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
				value={value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
			/>
			<Button 
				className="absolute right-0 top-0 h-full bg-[#1E71E8] hover:bg-[#1E71E8]/90 text-white" 
				type='button' 
				onClick={() => setShowPassword(!showPassword)}
				aria-label={showPassword ? "Hide password" : "Show password"}
			>
				{showPassword ? <EyeOff /> : <Eye />}
			</Button>
		</div>
	)
}

export default PasswordInput