'use client';

import {QRCodeCanvas} from 'qrcode.react';

type QrCodeProps = {
	link: string,
	logo: string,
	size: number,
	isImage: boolean,
	bgColor: string,
	fgColor: string,
}

export default function QrCode({link, logo, size, bgColor, fgColor, isImage}: QrCodeProps) {
  return (
    <QRCodeCanvas
      value={link}
      size={size}
      bgColor={bgColor}
      fgColor={fgColor}
      level="H"
      imageSettings={isImage ? {
        src: logo,
        height: 50,
        width: 50,
        excavate: true,
      } : undefined}
    />
  );
}
