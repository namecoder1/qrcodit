import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.png'
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
			</div>
		</nav>
	)
}

export default Navbar