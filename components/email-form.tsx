import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { FormData } from '@/utils/types'

const EmailForm = ({ formData, handleInputChange }: { formData: FormData, handleInputChange: (field: string, value: string) => void }) => {
	return (
			<div className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
					<div className="space-y-2">
						<Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email Address</Label>
						<Input
							id="email"
							type="email"
							value={formData.email || ''}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
							placeholder="Enter email address"
							className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="emailSubject" className="text-gray-700 dark:text-gray-300">Subject (optional)</Label>
						<Input
							id="emailSubject"
							type="text"
							value={formData.emailSubject || ''}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('emailSubject', e.target.value)}
							placeholder="Enter email subject"
							className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
						/>
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="emailBody" className="text-gray-700 dark:text-gray-300">Body (optional)</Label>
					<Textarea
						id="emailBody"
						value={formData.emailBody || ''}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('emailBody', e.target.value)}
						placeholder="Enter email body"
						className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
					/>
				</div>
			</div>
	)
}

export default EmailForm