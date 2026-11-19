import QRCode from "qrcode";

/** Riktig QR-kod som SVG, skapas vid byggtid. */
export default async function Qr({ value, label }: { value: string; label: string }) {
  const svg = await QRCode.toString(value, { type: "svg", margin: 0, errorCorrectionLevel: "M" });
  return <div className="cp-qr" role="img" aria-label={label} dangerouslySetInnerHTML={{ __html: svg }} />;
}
