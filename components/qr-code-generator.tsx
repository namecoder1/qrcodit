'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { fileToBase64 } from '@/utils/base';
import { motion, AnimatePresence } from "framer-motion";
import QrCodeForm from './qr-code-form';
import QrCodeVisualizer from './qr-code-visualizer';
import { FormData, QrCodeType } from '@/utils/types';
import CopyCode from './copy-code';

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

    const handleSvgGenerated = (svgCode: string) => {
        setQrCodeSvg(svgCode);
    };

    const handleDownload = () => {
        if (qrCodeSvg) {
            const blob = new Blob([qrCodeSvg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'qr-code.svg';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            setIsDownloaded(true);
            setTimeout(() => setIsDownloaded(false), 2000);
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
                                handleQrTypeChange={handleQrTypeChange}
                                handleInputChange={handleInputChange}
                                handleBgColorChange={handleBgColorChange}
                                handleFgColorChange={handleFgColorChange}
                                handleLogoChange={handleLogoChange} 
                            />
                        </CardContent>
                    </Card>
                
                    <AnimatePresence mode="wait">
                        <div className='flex flex-col gap-4'>
                            <QrCodeVisualizer 
                                qrCode={generateQrCodeContent()} 
                                formData={formData} 
                                handleDownload={handleDownload} 
                                isDownloaded={isDownloaded} 
                                onSvgGenerated={handleSvgGenerated}
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
