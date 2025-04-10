import React from 'react'
import { HexColorPicker, HexColorInput } from "react-colorful";

interface ColorPickerProps {
	color: string;
	onChange: (color: string) => void;
	label: string;
}

const ColorPicker = ({ color, onChange, label }: ColorPickerProps) => {
	return (
		<div className="space-y-2">
			<label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
			<div className="flex flex-col gap-2">
				<HexColorPicker color={color} onChange={onChange} className='min-w-full' />
				<div className="flex items-center gap-2">
					<div 
						className="w-6 h-6 rounded-lg border border-gray-300" 
						style={{ backgroundColor: color }}
					/>
					<HexColorInput 
						color={color} 
						onChange={onChange} 
						className="w-24 px-2 py-1 border border-gray-300 rounded text-sm bg-transparent"
						prefixed
					/>
				</div>
			</div>
		</div>
	)
}

export default ColorPicker