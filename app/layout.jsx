import "./globals.css";

export const metadata = {
  title: "KOU AI Training Sandbox",
  description: "App-first Codex and GitHub training with a personal budget app."
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
