import './globals.css';

export const metadata = {
  title: 'Dev Portfolio',
  description: 'Web Developer Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white antialiased">{children}</body>
    </html>
  );
}