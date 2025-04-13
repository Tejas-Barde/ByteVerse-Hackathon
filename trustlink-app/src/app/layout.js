export const metadata = {
  title: 'Verify Brand Claims',
  description: 'Don’t trust. Just verify it!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .delay-1 { animation-delay: 0.2s; }
          .delay-2 { animation-delay: 0.4s; }
          .delay-3 { animation-delay: 0.6s; }

          .light body {
            background-color: #f9fafb;
            color: #111827;
          }

          .dark body {
            background-color: #000;
            color: #fff;
          }
        `}</style>
      </head>
      <body className="transition-colors duration-300">{children}</body>
    </html>
  );
}
