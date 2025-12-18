
import "@/styles/globals.css";

export const metadata = {
  title: "CTA tools",
  description: "Ranking manual y gestor de mensajes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
