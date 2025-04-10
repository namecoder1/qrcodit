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
        height: size * 0.2,
        width: size * 0.2,
        excavate: true,
      } : undefined}
    />
  );
}
