import React from 'react'
import { Button } from './ui/button'
import { QrCodeIcon, Image, LinkIcon } from 'lucide-react'
import ImagesDropper from './images-droppper'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { motion } from 'framer-motion'
import { FormData } from '@/utils/types'

const QrCodeForm = ({ formData, handleSubmit, handleLinkChange, handleLogoChange, isGenerating }: { 
	formData: FormData, 
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>, 
	handleLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
	handleLogoChange: (file: File) => void, 
	isGenerating: boolean 
}) => {
	return (
		<form className='flex flex-col gap-5' onSubmit={handleSubmit}>
			<div className='flex flex-col gap-2'>
				<Label htmlFor="url" className="flex items-center text-sm font-medium">
					<LinkIcon className="h-4 w-4 mr-2" />
					URL
				</Label>
				<Input 
					type="url" 
					id="url" 
					name="url" 
					placeholder="https://example.com" 
					value={formData.link} 
					onChange={handleLinkChange}
					className="focus:ring-2 focus:ring-blue-500 transition-all duration-200"
					required
				/>
			</div>
			
			<div className='flex flex-col gap-2'>
				<Label htmlFor="logo" className="flex items-center text-sm font-medium">
					<Image className="h-4 w-4 mr-2" />
					Logo (optional)
				</Label>
				<ImagesDropper value={formData.logo} onChange={handleLogoChange} />
				<p className="text-xs text-gray-500 mt-1">Add your logo to customize the QR code</p>
			</div>
			
			<Button 
				className='w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition-all duration-200'
				type='submit'
				disabled={isGenerating}
			>
				{isGenerating ? (
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
					>
						<QrCodeIcon className="mr-2 h-4 w-4" />
					</motion.div>
				) : (
					<QrCodeIcon className="mr-2 h-4 w-4" />
				)}
				{isGenerating ? 'Generating...' : 'Generate QR Code'}
			</Button>
		</form>
	)
}

export default QrCodeForm