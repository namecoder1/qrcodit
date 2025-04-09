'use client'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { cn } from '@/lib/utils'

const ImagesDropper = ({ value, onChange }: { value: string | File, onChange: (file: File) => void }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles[0]);
  }, [onChange]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  })

  return (
    <div 
      {...getRootProps()} 
      className={cn(
        "w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E71E8] focus-visible:ring-offset-2 focus:ring-2 focus:ring-dotted focus:ring-[#1E71E8]",
        isDragActive 
          ? "border-[#1E71E8] bg-blue-50" 
          : "border-gray-300 hover:border-[#1E71E8]"
      )}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        {value ? (
          <p className="text-sm text-gray-600">
            File selezionato: {typeof value === 'string' 
              ? value.length > 20 ? value.substring(0, 17) + '...' : value 
              : value.name.length > 20 ? value.name.substring(0, 17) + '...' : value.name}
          </p>
        ) : isDragActive ? (
          <p className="text-sm text-blue-500">Rilascia qui il file...</p>
        ) : (
          <p className="text-sm text-gray-600 px-4">
            Trascina qui il tuo logo o <span className="text-blue-500">clicca per selezionarlo</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default ImagesDropper;