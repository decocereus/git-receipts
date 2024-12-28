"use client";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

const QrCode = ({ gitprofileLink }: { gitprofileLink: string }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const generateQRCode = async () => {
    try {
      const qrData = JSON.stringify({
        support: gitprofileLink,
      });

      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 128,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      setQrCodeUrl(qrCodeDataUrl);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await generateQRCode();
    };
    init();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {qrCodeUrl && (
        <Image src={qrCodeUrl} alt="Receipt QR Code" width={150} height={150} />
      )}
    </div>
  );
};

export default QrCode;
