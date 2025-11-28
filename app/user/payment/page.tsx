"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./payment.css";

export default function PaymentPage() {
  const [valor] = useState("0.00"); // valor a ser exibido no titulo do pagamento, fazer fetch futuramente
  const [copyTextStatus, setCopyTextStatus] = useState<"idle" | "copied">("idle");
  const chavePayment = "avenncourt@gmail.com"; // chave pix a ser copiada, fazer fetch futuramente

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(chavePayment);
      setCopyTextStatus("copied");
      setTimeout(() => setCopyTextStatus("idle"), 2000);
    } catch (err) {
      console.error(err);
      alert("Não foi possível copiar o texto para a área de transferência.");
    }
  };

  return (
      <main className="payment-page">
        <header className="payment-header">
          <h1>Pagamento: {valor}</h1>
        </header>

        <div className="payment-content">
        <img src="/Payment.jpeg" alt="QR Code / instruções de pagamento" className="payment-image" />

          <div className="payment-controls" aria-hidden={false}>
            <div className="left-controls">
              <button
                className="btn copy-btn"
                onClick={handleCopyText}
                aria-label="Copiar leitura do QR-Code"
              >
                {copyTextStatus === "copied" ? "Chave copiada" : "Copiar"}
              </button>
            </div>

            <div className="right-controls">
              <Link href="/dashboard" className="btn back-btn" aria-label="Voltar para o dashboard">
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </main>
  );
}
