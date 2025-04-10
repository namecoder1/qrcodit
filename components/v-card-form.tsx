import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { FormData } from '@/utils/types'
import CustomPhoneInput from './phone-input'

const VCardForm = ({ formData, handleInputChange }: { formData: FormData, handleInputChange: (field: string, value: string) => void }) => {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="vcardName" className="text-gray-700 dark:text-gray-300">Name</Label>
					<Input
						id="vcardName"
						type="text"
						value={formData.vcardName || ''}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('vcardName', e.target.value)}
						placeholder="Enter name"
						className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="vcardOrg" className="text-gray-700 dark:text-gray-300">Organization (optional)</Label>
					<Input
						id="vcardOrg"
						type="text"
						value={formData.vcardOrg || ''}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('vcardOrg', e.target.value)}
						placeholder="Enter organization"
						className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="vcardPhone" className="text-gray-700 dark:text-gray-300">Phone (optional)</Label>
					<CustomPhoneInput
						id="vcardPhone"
						value={formData.vcardPhone || ''}
						onChange={(value) => handleInputChange('vcardPhone', value as string)}
						placeholder="Enter phone number"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="vcardEmail" className="text-gray-700 dark:text-gray-300">Email (optional)</Label>
					<Input
						id="vcardEmail"
						type="email"
						value={formData.vcardEmail || ''}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('vcardEmail', e.target.value)}
						placeholder="Enter email"
						className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="vcardAddress" className="text-gray-700 dark:text-gray-300">Address (optional)</Label>
					<Input
						id="vcardAddress"
						type="text"
						value={formData.vcardAddress || ''}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('vcardAddress', e.target.value)}
						placeholder="Enter address"
						className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="vcardWebsite" className="text-gray-700 dark:text-gray-300">Website (optional)</Label>
					<Input
						id="vcardWebsite"
						type="url"
						value={formData.vcardWebsite || ''}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('vcardWebsite', e.target.value)}
						placeholder="Enter website URL"
						className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
					/>
				</div>
			</div>
		</div>
	)
}

export default VCardForm