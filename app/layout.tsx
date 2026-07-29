import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "大众点评 · 发现城市好生活",
  description: "发现值得一去的店，记录真实的城市生活体验。",
  openGraph: {
    title: "大众点评 · 发现城市好生活",
    description: "城市很大，好店在身边。",
    images: [{ url: "/og.png", width: 1792, height: 918, alt: "大众点评城市好店推荐" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
