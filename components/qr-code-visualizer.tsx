import { motion } from 'framer-motion'
import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import QrCode from './qr-code'
import { Download } from 'lucide-react'
import { Button } from './ui/button'
import { CheckCircle2 } from 'lucide-react'
import { FormData } from '@/utils/types'

const QrCodeVisualizer = ({ qrCode, formData, handleDownload, isDownloaded }: { qrCode: string | null, formData: FormData, handleDownload: () => void, isDownloaded: boolean }) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.2 }}
		>
			<Card className='w-full shadow-lg border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300'>
				<CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
					<h2 className='text-xl font-semibold'>Your QR Code</h2>
				</CardHeader>
				<CardContent className='flex flex-col items-center gap-6 p-8'>
					<motion.div 
						className="bg-white p-6 rounded-lg shadow-md"
						whileHover={{ scale: 1.02 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<QrCode 
							link={qrCode as string} 
							logo={typeof formData.logo === 'string' ? formData.logo : ''} 
							size={256} 
							isImage={!!formData.logo} 
							bgColor='#ffffff' 
							fgColor='#000000' 
						/>
					</motion.div>
					<div className="text-center">
						<p className="text-sm text-gray-600 mb-4">
							Scan with a QR code reader or download the image
						</p>
						<Button 
							onClick={handleDownload}
							className={`font-medium transition-all duration-200 ${
								isDownloaded 
									? 'bg-green-600 hover:bg-green-700' 
									: 'bg-blue-600 hover:bg-blue-700'
							} text-white`}
						>
							{isDownloaded ? (
								<CheckCircle2 className="mr-2 h-4 w-4" />
							) : (
								<Download className="mr-2 h-4 w-4" />
							)}
							{isDownloaded ? 'Downloaded!' : 'Download QR Code'}
						</Button>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}

export default QrCodeVisualizer