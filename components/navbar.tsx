import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.png'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { ThemeToggle } from "./theme-toggle"

const Navbar = () => {
	return (
		<nav className='border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'>
			<div className='container mx-auto px-4 py-4 flex items-center justify-between'>
				<div className='flex items-center gap-2.5'>
					<Image src={logo} alt='logo' width={44} height={44} />
					<h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>qrcodit</h1>
				</div>
				<div className='ml-auto flex items-center space-x-4'>
					<ThemeToggle />
				</div>
				<p className='hidden sm:block text-gray-600 dark:text-gray-300'>
					Maded with <Heart className='inline-block text-red-500 p-1 mb-0.5' /> by{' '}
					<Link href='https://tob.codes' target='_blank' className='text-blue-500 hover:underline underline-offset-2'>
						tobi
					</Link>
				</p>
			</div>
		</nav>
	)
}

export default Navbar