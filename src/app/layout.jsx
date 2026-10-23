import './globals.css';

export const metadata = {
  title: 'Aditya Singh — Computer Science Undergraduate & Full-Stack Developer',
  description:
    'Personal developer portfolio of Aditya Singh · B.Tech in CSE at KIET Group of Institutions · Full-Stack Web Development, C++, DSA, Node.js, Express, PostgreSQL, Prisma, and React.',
  authors: [{ name: 'Aditya Singh', url: 'https://github.com/Adityasingh909' }],
  creator: 'Aditya Singh',
  keywords: [
    'Aditya Singh',
    'Aditya Singh Portfolio',
    'Software Engineer',
    'Full-Stack Developer',
    'KIET Group of Institutions',
    'React',
    'Node.js',
    'Express.js',
    'PostgreSQL',
    'Prisma',
    'C++',
    'Data Structures and Algorithms',
  ],
  openGraph: {
    title: 'Aditya Singh — Computer Science Undergraduate & Full-Stack Developer',
    description:
      'Portfolio of Aditya Singh · B.Tech CSE at KIET Group of Institutions · Showcasing full-stack projects, architecture case studies, and engineering capabilities.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Aditya Singh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Singh — Computer Science Undergraduate & Full-Stack Developer',
    description:
      'Portfolio of Aditya Singh · B.Tech CSE at KIET · Full-Stack Web Development, C++, DSA, Node.js, Express, PostgreSQL, Prisma, React.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-muted antialiased selection:bg-accent selection:text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
