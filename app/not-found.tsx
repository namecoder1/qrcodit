import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
	return (
		<section className='flex-grow flex justify-center items-center'>
			<div className='text-center'>
				<h1 className='text-4xl font-bold mb-2'>Error 404</h1>
				<p className='text-gray-600 dark:text-gray-300 mb-4'>The page you are looking for does not exist.</p>
				<Button asChild>
					<Link href='/'>Go back to the home page</Link>
				</Button>
			</div>
		</section>
	)
}

export default NotFound