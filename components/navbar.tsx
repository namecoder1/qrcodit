import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.png'
import Link from 'next/link'
import { Heart } from 'lucide-react'

const Navbar = () => {
	return (
		<nav className='bg-white dark:bg-gray-900 flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700'>
			<div className='flex items-center justify-center gap-2'>
					<div className='flex items-center gap-4'>
						<Image src={logo} alt='logo' width={44} height={44} />
					</div>
				<h1 className='text-3xl font-bold'>qrcodit</h1>
			</div>
			<p className='hidden sm:block'>Maded with <Heart className='inline-block text-red-500 p-1 mb-0.5' /> by <Link href='https://tob.codes' target='_blank' className='text-blue-500 hover:underline underline-offset-2'>tobi</Link></p>
		</nav>
	)
}

export default Navbar