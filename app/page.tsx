import React from 'react'
import QrCodeGenerator from '@/components/qr-code-generator'

export default function Home() {
	return (
		<div className="flex-1 flex flex-col">
			<div className="flex-1 overflow-auto py-4 md:py-6">
				<div className="mx-auto px-3 py-4 md:px-4 md:py-8">
					<div className="hidden sm:block">
						<h1 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-8 text-gray-900 dark:text-gray-100">
							QR Code Generator
						</h1>
						<p className="text-center text-gray-600 dark:text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto px-3 md:px-4">
							Create custom QR codes with your logo. Perfect for businesses, personal use, and marketing materials.
						</p>
					</div>
					<QrCodeGenerator />
				</div>
			</div>
		</div>
	)
}