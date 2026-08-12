import { Rubik, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["500", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "ABHIN JOE SAJI — Creative Developer & AI Engineer",
  description:
    "A developer in a world of ordinary websites. Creative developer, AI engineer and full-stack builder crafting immersive interfaces with modern web technology.",
  keywords: [
    "Abhin Joe Saji",
    "AJS",
    "Creative Developer",
    "AI Engineer",
    "Full Stack Developer",
    "Three.js",
    "WebGL",
  ],
};

export const viewport = {
  themeColor: "#ed0000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg font-body text-ink antialiased">{children}</body>
    </html>
  );
}
