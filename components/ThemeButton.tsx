"use client";
export default function ThemeButton() {
  return (
    <button
      className="themebtn"
      type="button"
      onClick={() => {
        const r = document.documentElement;
        const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
        r.dataset.theme = dark ? "light" : "dark";
      }}
    >
      Ljust/mörkt läge
    </button>
  );
}
