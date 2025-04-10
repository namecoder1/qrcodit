'use client';

import {QRCodeSVG} from 'qrcode.react';
import { useRef, useEffect } from 'react';

type QrCodeProps = {
	link: string,
	logo: string,
	size: number,
	isImage: boolean,
	bgColor: string,
	fgColor: string,
	onSvgGenerated?: (svgCode: string) => void,
}

export default function QrCode({link, logo, size, bgColor, fgColor, isImage, onSvgGenerated}: QrCodeProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrRef.current && onSvgGenerated) {
      const svgElement = qrRef.current.querySelector('svg');
      if (svgElement) {
        onSvgGenerated(svgElement.outerHTML);
      }
    }
  }, [link, logo, size, bgColor, fgColor, isImage, onSvgGenerated]);

  return (
    <div ref={qrRef}>
      <QRCodeSVG
        value={link}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level="H"
        imageSettings={isImage ? {
          src: logo,
          height: size * 0.2,
          width: size * 0.2,
          excavate: true,
        } : undefined}
      />
    </div>
  );
}
