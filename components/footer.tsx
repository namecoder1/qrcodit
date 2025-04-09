import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
	return (
		<footer className='w-full bg-gray-100 dark:bg-gray-900 py-6 px-4 border-t border-gray-200 dark:border-gray-800'>
			<div className='max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4'>
				<p className='text-gray-600 dark:text-gray-300 font-medium'>
					&copy; {new Date().getFullYear()} qrcodit. All rights reserved.
				</p>
				<div className='flex items-center gap-1 text-gray-600 dark:text-gray-300'>
					Made with <Heart className='text-red-500 h-4 w-4 mx-1 animate-pulse' /> by 
					<Link 
						href='https://tob.codes' 
						target='_blank' 
						className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium ml-1 transition-colors duration-200 hover:underline underline-offset-4'
					>
						tobi
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default Footer