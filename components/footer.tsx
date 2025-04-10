import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
	return (
		<footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
			<div className="container mx-auto px-4 py-4">
				<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
					<p className="text-sm text-gray-600 dark:text-gray-300">
						© 2024 qrcodit. All rights reserved.
					</p>
					<p className='text-gray-600 dark:text-gray-300'>
					Maded with <Heart className='inline-block text-red-500 p-1 mb-0.5' /> by{' '}
					<Link href='https://tob.codes' target='_blank' className='text-blue-500 hover:underline underline-offset-2'>
						tobi
					</Link>
				</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer