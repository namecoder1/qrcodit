'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';
import { fileToBase64 } from '@/utils/base';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import QrCodeForm from './qr-code-form';
import QrCodeVisualizer from './qr-code-visualizer';
import { FormData, QrCodeType } from '@/utils/types';

const QrCodeGenerator = () => {
    const [formData, setFormData] = useState<FormData>({
    qrType: 'url',
    url: '',
    logo: '',
    bgColor: '#ffffff',
    fgColor: '#000000',
    size: 256,
  });

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [activeTab, setActiveTab] = useState("create");

  const handleQrTypeChange = (type: QrCodeType) => {
    setFormData(prev => ({
      ...prev,
      qrType: type
    }));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoChange = async (file: File) => {
    try {
      const base64 = await fileToBase64(file);
      setFormData(prev => ({
        ...prev,
        logo: base64
      }));
    } catch (error) {
      console.error('Error converting file to base64:', error);
    }
  };

  const handleBgColorChange = (color: string) => {
    setFormData(prev => ({
      ...prev,
      bgColor: color
    }));
  };

  const handleFgColorChange = (color: string) => {
    setFormData(prev => ({
      ...prev,
      fgColor: color
    }));
  };

  const generateQrCodeContent = () => {
    const { qrType } = formData;
    
    switch (qrType) {
      case 'url':
        return formData.url || '';
      case 'wifi':
        const { wifiSSID, wifiPassword, wifiHidden, wifiEncryption } = formData;
        return `WIFI:T:${wifiEncryption || 'WPA'};S:${wifiSSID || ''};P:${wifiPassword || ''};${wifiHidden ? 'H:true;' : ''};`;
      case 'text':
        return formData.text || '';
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
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    setQrCode(generateQrCodeContent());
    setIsGenerating(false);
    setActiveTab("preview");
  }

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = url;
      link.click();
      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 2000);
    }
  };

  return (
    <section className='flex-1 flex flex-col items-center justify-center gap-8 p-8'>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger 
              value="create" 
              className="data-[state=active]:bg-[#1E71E8] data-[state=active]:text-white dark:data-[state=active]:bg-[#1E71E8]"
            >
              Create QR Code
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              disabled={!qrCode}
              className="data-[state=active]:bg-[#1E71E8] data-[state=active]:text-white dark:data-[state=active]:bg-[#1E71E8]"
            >
              Preview
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E71E8] focus-visible:ring-offset-2 rounded-lg'>
            <Card className='w-full shadow-lg border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800'>
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
                <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Create your custom QR Code</h2>
              </CardHeader>
              <CardContent className="p-6">
                <QrCodeForm 
                  formData={formData} 
                  handleSubmit={handleSubmit} 
                  handleQrTypeChange={handleQrTypeChange}
                  handleInputChange={handleInputChange}
                  handleBgColorChange={handleBgColorChange}
                  handleFgColorChange={handleFgColorChange}
                  handleLogoChange={handleLogoChange} 
                  isGenerating={isGenerating} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            <AnimatePresence mode="wait">
              {qrCode && (
                <QrCodeVisualizer 
                  qrCode={qrCode} 
                  formData={formData} 
                  handleDownload={handleDownload} 
                  isDownloaded={isDownloaded} 
                />
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
}

export default QrCodeGenerator;
