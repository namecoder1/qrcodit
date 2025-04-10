import { motion } from 'framer-motion'
import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import QrCode from './qr-code'
import { Download, Check } from 'lucide-react'
import { Button } from './ui/button'
import { FormData } from '@/utils/types'

const QrCodeVisualizer = ({ qrCode, formData, handleDownload, isDownloaded, onSvgGenerated }: { qrCode: string | null, formData: FormData, handleDownload: () => void, isDownloaded: boolean, onSvgGenerated: (svgCode: string) => void }) => {
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
						
						<Button
							onClick={handleDownload}
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
				</CardContent>
			</Card>
		</motion.div>
	)
}

export default QrCodeVisualizer