import "./globals.css";
import { metadata } from './metadata';

export { metadata };

export default function RootLayoutServer({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}