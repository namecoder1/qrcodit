import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Card } from './ui/card'
import { Button } from './ui/button'

const CopyCode = ({ imageUrl } : { imageUrl: string }) => {
	const svgCode = imageUrl || '<svg>No QR code generated yet</svg>'

	return (
		<Card className="h-fit w-full shadow-lg border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800">
			<div className="p-4">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-sm font-medium">SVG Code</h3>
					<CopyToClipboard text={svgCode}>
						<Button size='sm' className="bg-[#1E71E8] hover:bg-[#1E71E8]/90 text-white text-xs rounded px-2 py-1 cursor-pointer transition-colors">Copy</Button>
					</CopyToClipboard>
				</div>
				<div className="bg-gray-100 dark:bg-gray-900 rounded p-2 max-h-24 overflow-y-auto">
					<pre className='m-0 font-mono text-xs text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap'>{svgCode}</pre>
				</div>
			</div>
		</Card>
	)
}

export default CopyCode