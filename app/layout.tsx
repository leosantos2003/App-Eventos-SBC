import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import "./payment/payment.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/ui/header";
import { cn } from "@/lib/utils";

const font = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SBC Eventos",
  description: "Sistema de Controle de Reserva de Hotéis para Eventos da SBC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={cn(
          font.className,
          "flex flex-col justify-center min-h-full bg-background text-foreground"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="grow flex flex-col p-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
