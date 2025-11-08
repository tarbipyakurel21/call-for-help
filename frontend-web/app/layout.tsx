// app/layout.tsx
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

export const metadata = {
  title: "HealthAI Assistant",
  description:
    "Your AI-powered healthcare companion — safe, private, and informative.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
         <Footer />
      </body>
    </html>
  );
}
