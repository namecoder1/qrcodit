'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';
import { fileToBase64 } from '@/utils/base';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import QrCodeForm from './qr-code-form';
import QrCodeVisualizer from './qr-code-visualizer';

const QrCodeGenerator = () => {
  const [formData, setFormData] = useState<{
    link: string;
    logo: string | File;
  }>({
    link: '',
    logo: '',
  });

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [activeTab, setActiveTab] = useState("create");

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      link: value
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    setQrCode(formData.link);
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
    <section className='w-full flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="create" className="data-[state=active]:bg-[#A0B7FF] data-[state=active]:text-white">
              Create QR Code
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              disabled={!qrCode}
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Preview
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <Card className='w-full shadow-lg border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300'>
              <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <h2 className='text-xl font-semibold'>Create your custom QR Code</h2>
              </CardHeader>
              <CardContent className="p-6">
                <QrCodeForm 
                  formData={formData} 
                  handleSubmit={handleSubmit} 
                  handleLinkChange={handleLinkChange} 
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
