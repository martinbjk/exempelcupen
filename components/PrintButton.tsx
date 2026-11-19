"use client";
export default function PrintButton({ label = "Skriv ut / spara som PDF" }: { label?: string }) {
  return (
    <button className="btn" type="button" onClick={() => window.print()}>
      {label}
    </button>
  );
}
