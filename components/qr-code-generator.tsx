'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import QrCodeForm from './qr-code-form';
import QrCodeVisualizer from './qr-code-visualizer';
import { FormData } from '@/utils/types';
import CopyCode from './copy-code';
import { 
  handleQrTypeChange, 
  handleInputChange, 
  handleBgColorChange, 
  handleFgColorChange, 
  handleLogoChange, 
  handleSvgGenerated, 
  handleFormatChange, 
  handleDownload 
} from '@/lib/handling';

const QrCodeGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    qrType: 'url',
    url: '',
    logo: '',
    bgColor: '#ffffff',
    fgColor: '#000000',
    size: 256,
  });

  const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('svg');

    

  const generateQrCodeContent: () => string = () => {
    const { qrType } = formData;
    
    switch (qrType) {
      case 'url':
        return formData.url || '?';
      case 'wifi':
        const { wifiSSID, wifiPassword, wifiHidden, wifiEncryption } = formData;
        return `WIFI:T:${wifiEncryption || 'WPA'};S:${wifiSSID || ''};P:${wifiPassword || ''};${wifiHidden ? 'H:true;' : ''};`;
      case 'text':
        return formData.text || '?';
      case 'email':
        const { email, emailSubject, emailBody } = formData;
        return `mailto:${email || ''}?subject=${encodeURIComponent(emailSubject || '')}&body=${encodeURIComponent(emailBody || '')}`;
      case 'phone':
        return `tel:${formData.phone || ''}`;
      case 'sms':
        const { smsPhone, smsMessage } = formData;
        return `smsto:${smsPhone || ''}:${smsMessage || ''}`;
      case 'vcard':
        const { vcardName, vcardOrg, vcardPhone, vcardEmail, vcardAddress, vcardWebsite } = formData;
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName || ''}\nORG:${vcardOrg || ''}\nTEL:${vcardPhone || ''}\nEMAIL:${vcardEmail || ''}\nADR:${vcardAddress || ''}\nURL:${vcardWebsite || ''}\nEND:VCARD`;
      default:
        return '?';
    }
  };

    

  return (
    <section className='flex-1 flex flex-col items-center justify-center gap-8 p-4'>
      <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-7xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className='w-full h-fit shadow-lg border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800'>
            <CardContent className="p-6">
              <QrCodeForm 
                formData={formData} 
                handleQrTypeChange={(type) => handleQrTypeChange(type, setFormData)}
                handleInputChange={(field, value) => handleInputChange(field, value, setFormData)}
                handleBgColorChange={(color) => handleBgColorChange(color, setFormData)}
                handleFgColorChange={(color) => handleFgColorChange(color, setFormData)}
                handleLogoChange={(file) => handleLogoChange(file, setFormData)} 
              />
            </CardContent>
          </Card>
      
          <AnimatePresence mode="wait">
            <div className='flex flex-col gap-4'>
              <QrCodeVisualizer 
                qrCode={generateQrCodeContent()} 
                formData={formData} 
                handleDownload={(format) => handleDownload(format, qrCodeSvg || '', selectedFormat, setIsDownloaded, formData)} 
                isDownloaded={isDownloaded} 
                onSvgGenerated={(svgCode) => handleSvgGenerated(svgCode, setQrCodeSvg)}
                onFormatChange={(format) => handleFormatChange(format, setSelectedFormat)}
              />
              <CopyCode imageUrl={qrCodeSvg || ''} />
            </div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

export default QrCodeGenerator;
