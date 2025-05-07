import { QrCodeType } from "@/utils/types";
import { fileToBase64 } from '@/utils/base';



const handleQrTypeChange = (type: QrCodeType, setFormData: (prev: any) => void) => {
  setFormData((prev: any) => ({
      ...prev,
      qrType: type
  }));
};

const handleInputChange = (field: string, value: string | boolean, setFormData: (prev: any) => void) => {
  setFormData((prev: any) => ({
      ...prev,
      [field]: value
  }));
};

const handleLogoChange = async (file: File, setFormData: (prev: any) => void) => {
  try {
      const base64 = await fileToBase64(file);
      setFormData((prev: any) => ({
          ...prev,
          logo: base64
      }));
  } catch (error) {
      console.error('Error converting file to base64:', error);
  }
};

const handleBgColorChange = (color: string, setFormData: (prev: any) => void) => {
  setFormData((prev: any) => ({
      ...prev,
      bgColor: color
  }));
};

const handleFgColorChange = (color: string, setFormData: (prev: any) => void) => {
  setFormData((prev: any) => ({
      ...prev,
      fgColor: color
  }));
};

const handleSvgGenerated = (svgCode: string, setQrCodeSvg: (prev: any) => void) => {
  setQrCodeSvg(svgCode);
};

const handleFormatChange = (format: string, setSelectedFormat: (prev: any) => void) => {
  setSelectedFormat(format);
};

const handleDownload = (format: string, qrCodeSvg: string, selectedFormat: string, setIsDownloaded: (prev: any) => void, formData: any) => {
  if (!qrCodeSvg) return;

  const downloadFormat = format || selectedFormat;
  
  let safeSvgString = qrCodeSvg || '';
  if (!safeSvgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
      safeSvgString = safeSvgString.replace(
          '<svg',
          '<svg xmlns="http://www.w3.org/2000/svg"'
      );
  }

  switch (downloadFormat) {
      case 'svg':
          const svgBlob = new Blob([safeSvgString], { type: 'image/svg+xml' });
          const svgUrl = URL.createObjectURL(svgBlob);
          const svgLink = document.createElement('a');
          svgLink.download = 'qr-code.svg';
          svgLink.href = svgUrl;
          svgLink.click();
          URL.revokeObjectURL(svgUrl);
          break;

      case 'png':
      case 'jpg':
      case 'webp':
          // Create a temporary SVG element
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(qrCodeSvg, 'image/svg+xml');
          const svgElement = svgDoc.documentElement;
          
          // Set SVG dimensions
          svgElement.setAttribute('width', formData.size.toString());
          svgElement.setAttribute('height', formData.size.toString());
          
          // Create a new SVG string with the updated dimensions
          const svgString = new XMLSerializer().serializeToString(svgElement);
          // const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);

          // Create image and canvas
          const img = new Image();
          img.crossOrigin = 'anonymous';
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          img.onload = () => {
              // Set canvas size
              canvas.width = formData.size;
              canvas.height = formData.size;

              // Fill background
              if (ctx) {
                  ctx.fillStyle = formData.bgColor;
                  ctx.fillRect(0, 0, canvas.width, canvas.height);
              }

              // Draw the QR code
              ctx?.drawImage(img, 0, 0);

              // Convert to selected format
              const mimeType = {
                  'png': 'image/png',
                  'jpg': 'image/jpeg',
                  'webp': 'image/webp'
              }[downloadFormat];

              canvas.toBlob((blob) => {
                  if (blob) {
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.download = `qr-code.${downloadFormat}`;
                      link.href = url;
                      link.click();
                      URL.revokeObjectURL(url);
                  }
              }, mimeType);
          };

          img.onerror = (e) => {
              console.error('Error loading image:', e);
          };

          const svgDataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(safeSvgString);
          img.src = svgDataUrl;
          break;

      default:
          console.error('Unsupported format:', downloadFormat);
          return;
  }

  setIsDownloaded(true);
  setTimeout(() => setIsDownloaded(false), 2000);
};


export { handleQrTypeChange, handleInputChange, handleLogoChange, handleBgColorChange, handleFgColorChange, handleSvgGenerated, handleFormatChange, handleDownload };