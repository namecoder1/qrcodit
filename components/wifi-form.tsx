import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { FormData } from '@/utils/types'
import PasswordInput from './password-input'

const WifiForm = ({ formData, handleInputChange }: { formData: FormData, handleInputChange: (field: string, value: string | boolean) => void }) => {
	return (
			<div className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
					<div className="space-y-2">
						<Label htmlFor="wifiSSID" className="text-gray-700 dark:text-gray-300">WiFi SSID</Label>
						<Input
							id="wifiSSID"
							type="text"
							value={formData.wifiSSID || ''}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('wifiSSID', e.target.value)}
							placeholder="Enter WiFi network name"
							className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="wifiEncryption" className="text-gray-700 dark:text-gray-300">Encryption</Label>
						<Select 
							value={formData.wifiEncryption || 'WPA'} 
							onValueChange={(value: string) => handleInputChange('wifiEncryption', value)}
						>
							<SelectTrigger className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
								<SelectValue placeholder="Select encryption type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="WPA">WPA/WPA2</SelectItem>
								<SelectItem value="WEP">WEP</SelectItem>
								<SelectItem value="nopass">No Password</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="wifiPassword" className="text-gray-700 dark:text-gray-300">WiFi Password</Label>
					<PasswordInput
						value={formData.wifiPassword || ''}
						onChange={(value: string) => handleInputChange('wifiPassword', value)}
					/>
				</div>
				<div className="flex items-center space-x-2">
					<Checkbox 
						id="wifiHidden" 
						checked={formData.wifiHidden || false}
						onCheckedChange={(checked: boolean | 'indeterminate') => handleInputChange('wifiHidden', checked as boolean)}
					/>
					<Label htmlFor="wifiHidden" className="text-gray-700 dark:text-gray-300">Hidden Network</Label>
				</div>
			</div>
	)
}

export default WifiForm