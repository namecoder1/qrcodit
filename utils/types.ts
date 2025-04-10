export type QrCodeType = 'url' | 'wifi' | 'text' | 'email' | 'phone' | 'sms' | 'vcard';

export type FormData = {
	qrType: QrCodeType;
	// URL specific
	url?: string;
	// WiFi specific
	wifiSSID?: string;
	wifiPassword?: string;
	wifiHidden?: boolean;
	wifiEncryption?: 'WPA' | 'WEP' | 'nopass';
	// Text specific
	text?: string;
	// Email specific
	email?: string;
	emailSubject?: string;
	emailBody?: string;
	// Phone specific
	phone?: string;
	// SMS specific
	smsPhone?: string;
	smsMessage?: string;
	// vCard specific
	vcardName?: string;
	vcardOrg?: string;
	vcardPhone?: string;
	vcardEmail?: string;
	vcardAddress?: string;
	vcardWebsite?: string;
	// Common fields
	logo: string | File;
	bgColor: string;
	fgColor: string;
	size: number;
}