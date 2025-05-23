import { motion } from 'framer-motion'
import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import QrCode from './qr-code'
import { Download, Check, Images } from 'lucide-react'
import { Button } from './ui/button'
import { FormData } from '@/utils/types'
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select'

const QrCodeVisualizer = ({ qrCode, formData, handleDownload, isDownloaded, onSvgGenerated, onFormatChange }: { qrCode: string | null, formData: FormData, handleDownload: (format: string) => void, isDownloaded: boolean, onSvgGenerated: (svgCode: string) => void, onFormatChange: (format: string) => void }) => {
	const [selectedFormat, setSelectedFormat] = React.useState('svg');

	const handleFormatSelect = (format: string) => {
		setSelectedFormat(format);
		onFormatChange(format);
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="w-full"
		>
			<Card className="w-full shadow-lg border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800">
				<CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-lg py-3">
					<h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Your QR Code</h2>
				</CardHeader>
				<CardContent className="p-4">
					<div className="flex flex-col items-center gap-4">
						<div className="p-2 rounded-lg shadow-inner" style={{ backgroundColor: formData.bgColor }}>
							<QrCode
								link={qrCode || '?'}
								size={formData.size}
								logo={formData.logo ? (typeof formData.logo === 'string' ? formData.logo : URL.createObjectURL(formData.logo)) : ''}
								isImage={!!formData.logo}
								bgColor={formData.bgColor}
								fgColor={formData.fgColor}
								onSvgGenerated={onSvgGenerated}
							/>
						</div>
						
						<div className='flex items-center gap-2'>
							<Select onValueChange={handleFormatSelect} defaultValue="svg">
								<SelectTrigger className='flex items-center gap-2'>
									<Images size={16} />
									<p className='w-full'>{selectedFormat.toUpperCase()}</p>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='png'>PNG</SelectItem>
									<SelectItem value='svg'>SVG</SelectItem>
									<SelectItem value='webp'>WEBP</SelectItem>
									<SelectItem value='jpg'>JPG</SelectItem>
								</SelectContent>
							</Select>

						<Button
							onClick={() => handleDownload(selectedFormat)}
							className="w-full bg-[#1E71E8] hover:bg-[#1E71E8]/90 text-white"
						>
							{isDownloaded ? (
								<div className="flex items-center gap-2">
									<Check className="h-4 w-4" />
									<span>Downloaded!</span>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<Download className="h-4 w-4" />
									<span>Download QR Code</span>
								</div>
								)}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}

export default QrCodeVisualizer