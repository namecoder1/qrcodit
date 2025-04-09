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
      title={"Title for my QR Code"}
      size={size}
      bgColor={bgColor}
      fgColor={fgColor}
      level={"L"}
			imageSettings={isImage ? {
        src: logo,
        x: undefined,
        y: undefined,
        height: 40,
        width: 40,
        opacity: 1,
        excavate: true,
      } : undefined}
    />
  );
}
