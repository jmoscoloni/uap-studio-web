// Go to /(pages)/[locale]/layout.tsx for the main layout

import './globals.css';

export default async function Layout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// Favicon / icons for the app (use the SVG in /public/favicon.svg)
export const icons = {
  icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.svg' }],
  apple: '/favicon.svg'
};
