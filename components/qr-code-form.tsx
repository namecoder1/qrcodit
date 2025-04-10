import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import ImagesDropper from './images-dropper'
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

const QrCodeForm = ({ 
	formData, 
	handleSubmit, 
	handleQrTypeChange,
	handleInputChange, 
	handleBgColorChange, 
	handleFgColorChange, 
	handleLogoChange, 
	isGenerating 
}: { 
	formData: FormData, 
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>, 
	handleQrTypeChange: (type: QrCodeType) => void,
	handleInputChange: (field: string, value: string | boolean) => void, 
	handleBgColorChange: (color: string) => void,
	handleFgColorChange: (color: string) => void,
	handleLogoChange: (file: File) => void, 
	isGenerating: boolean 
}) => {
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
							required
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
							required
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
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-2">
				<Label htmlFor="qrType" className="text-gray-700 dark:text-gray-300">QR Code Type</Label>
				<Select 
					value={formData.qrType} 
					onValueChange={handleQrTypeChange}
				>
					<SelectTrigger className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
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
			
			{renderQrTypeFields()}
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
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