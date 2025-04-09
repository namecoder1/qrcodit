import { motion } from 'framer-motion'
import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import QrCode from './qr-code'
import { Download, Check } from 'lucide-react'
import { Button } from './ui/button'
import { FormData } from '@/utils/types'

const QrCodeVisualizer = ({ qrCode, formData, handleDownload, isDownloaded }: { qrCode: string | null, formData: FormData, handleDownload: () => void, isDownloaded: boolean }) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="w-full"
		>
			<Card className="w-full shadow-lg border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800">
				<CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
					<h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Your QR Code</h2>
				</CardHeader>
				<CardContent className="p-6">
					<div className="flex flex-col items-center gap-6">
						{qrCode && (
							<div className="p-4 bg-white rounded-lg shadow-inner">
								<QrCode
									link={qrCode}
									size={256}
									logo={formData.logo ? (typeof formData.logo === 'string' ? formData.logo : URL.createObjectURL(formData.logo)) : ''}
									isImage={!!formData.logo}
									bgColor='#ffffff'
									fgColor='#000000'
								/>
							</div>
						)}
						
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