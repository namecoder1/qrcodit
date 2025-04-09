import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import ImagesDropper from './images-dropper'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { FormData } from '@/utils/types'

const QrCodeForm = ({ formData, handleSubmit, handleLinkChange, handleLogoChange, isGenerating }: { 
	formData: FormData, 
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>, 
	handleLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
	handleLogoChange: (file: File) => void, 
	isGenerating: boolean 
}) => {
	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-2">
				<Label htmlFor="link" className="text-gray-700 dark:text-gray-300">URL</Label>
				<Input
					id="link"
					type="url"
					value={formData.link}
					onChange={handleLinkChange}
					placeholder="Enter your URL here"
					className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
					required
				/>
			</div>
			
			<div className="space-y-2">
				<Label className="text-gray-700 dark:text-gray-300">Logo (optional)</Label>
				<ImagesDropper value={formData.logo} onChange={handleLogoChange} />
			</div>

			<Button 
				type="submit" 
				className="w-full bg-[#1E71E8] hover:bg-[#1E71E8]/90 text-white"
				disabled={isGenerating}
			>
				{isGenerating ? (
					<div className="flex items-center gap-2">
						<Loader2 className="h-4 w-4 animate-spin" />
						<span>Generating...</span>
					</div>
				) : (
					"Generate QR Code"
				)}
			</Button>
		</form>
	)
}

export default QrCodeForm