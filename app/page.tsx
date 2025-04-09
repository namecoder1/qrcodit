import React from 'react'
import QrCodeGenerator from '@/components/qr-code-generator'  

const Home = () => {
  return (
    <div className='py-10 h-full w-full flex flex-col items-center justify-center gap-8 p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <h2 className='hidden sm:text-4xl font-bold text-center text-gray-800 dark:text-white'>
        Create your custom QR Code
      </h2>
      <QrCodeGenerator />
    </div>
  )
}

export default Home