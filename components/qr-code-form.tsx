'use client'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { FormData, QrCodeType } from '@/utils/types'
import ColorPicker from './color-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import WifiForm from './wifi-form'
import EmailForm from './email-form'
import CustomPhoneInput from './phone-input'
import VCardForm from './v-card-form'
import ImagesDropper from './images-dropper'
import { Checkbox } from './ui/checkbox'

const QrCodeForm = ({ 
	formData, 
	handleQrTypeChange,
	handleInputChange, 
	handleBgColorChange, 
	handleFgColorChange, 
	handleLogoChange
}: { 
	formData: FormData, 
	handleQrTypeChange: (type: QrCodeType) => void,
	handleInputChange: (field: string, value: string | boolean) => void, 
	handleBgColorChange: (color: string) => void,
	handleFgColorChange: (color: string) => void,
	handleLogoChange: (file: File) => void
}) => {

	const [isLogoVisible, setIsLogoVisible] = useState(false);

	const handleIsLogo = () => {
		setIsLogoVisible(prev => !prev)
	}

	const renderQrTypeFields = () => {
		switch (formData.qrType) {
			case 'url':
				return (
					<div className="space-y-2">
						<Label htmlFor="url" className="text-gray-700 dark:text-gray-300">URL</Label>
						<Input
							id="url"
							type="url"
							value={formData.url || ''}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('url', e.target.value)}
							placeholder="Enter your URL here"
							className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
						/>
						<p className="text-sm text-gray-600 dark:text-gray-300">
							You can use <span className="text-blue-500">https://</span> or <span className="text-blue-500">http://</span>
						</p>
					</div>
				);
			case 'wifi':
				return (
					<WifiForm formData={formData} handleInputChange={handleInputChange} />
				);
			case 'text':
				return (
					<div className="space-y-2">
						<Label htmlFor="text" className="text-gray-700 dark:text-gray-300">Text</Label>
						<Textarea
							id="text"
							value={formData.text || ''}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('text', e.target.value)}
							placeholder="Enter your text here"
							className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
						/>
					</div>
				);
			case 'email':
				return (
					<EmailForm formData={formData} handleInputChange={handleInputChange} />
				);
			case 'phone':
				return (
					<div className="space-y-2">
						<Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone Number</Label>
						<CustomPhoneInput value={formData.phone as string} onChange={(value) => handleInputChange('phone', value as string)} />
					</div>
				);
			case 'sms':
				return (
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="smsPhone" className="text-gray-700 dark:text-gray-300">Phone Number</Label>
							<CustomPhoneInput
								id="smsPhone"
								value={formData.smsPhone || ''}
								onChange={(value) => handleInputChange('smsPhone', value as string)}
								placeholder="Enter phone number"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="smsMessage" className="text-gray-700 dark:text-gray-300">Message (optional)</Label>
							<Textarea
								id="smsMessage"
								value={formData.smsMessage || ''}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('smsMessage', e.target.value)}
								placeholder="Enter SMS message"
								className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							/>
						</div>
					</div>
				);
			case 'vcard':
				return (
					<VCardForm formData={formData} handleInputChange={handleInputChange} />
				);
			default:
				return null;
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between bg-gray-50 pb-3 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
				<h2 className='text-xl max-w-[200px] sm:max-w-full font-semibold text-gray-900 dark:text-gray-100'>Create your custom QR Code</h2>
				<Select 
					value={formData.qrType} 
					onValueChange={handleQrTypeChange}
				>
					<SelectTrigger className="w-fit space-x-1 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
						<SelectValue placeholder="Select QR code type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="url">URL</SelectItem>
						<SelectItem value="wifi">WiFi</SelectItem>
						<SelectItem value="text">Text</SelectItem>
						<SelectItem value="email">Email</SelectItem>
						<SelectItem value="phone">Phone</SelectItem>
						<SelectItem value="sms">SMS</SelectItem>
						<SelectItem value="vcard">vCard</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="flex flex-col gap-4">
				<div className='flex items-center gap-2'>
					<Checkbox 
						checked={isLogoVisible}
						title='Logo' 
						onCheckedChange={handleIsLogo} 
					/>
					<Label className="text-gray-700 dark:text-gray-300">Logo (optional)</Label>
				</div>

				{isLogoVisible && (
					<div className="mb-2">
						<ImagesDropper value={formData.logo} onChange={handleLogoChange} />
					</div>
				)}
				
				<div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-gray-200 dark:border-gray-700">
					{renderQrTypeFields()}
				</div>
				
				<div className="grid sm:grid-cols-2 gap-4 mt-auto">
					<ColorPicker 
						color={formData.bgColor} 
						onChange={handleBgColorChange} 
						label="Background Color" 
					/>
					<ColorPicker 
						color={formData.fgColor} 
						onChange={handleFgColorChange} 
						label="Foreground Color" 
					/>
				</div>
			</div>
		</div>
	)
}

export default QrCodeForm