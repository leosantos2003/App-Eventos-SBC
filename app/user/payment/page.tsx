"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./payment.css";

export default function PaymentPage() {
  const [valor] = useState("0.00"); // valor a ser exibido no titulo do pagamento, fazer fetch futuramente
  const [copyTextStatus, setCopyTextStatus] = useState<"idle" | "copied">("idle");
  const chavePayment = "29.532.264/0001-78"; // chave pix a ser copiada, fazer de acordo com o evento

  const handleCopyText = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(chavePayment);
        console.log("Chave copiada via navigator.clipboard");
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = chavePayment;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);

        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);

        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);

        if (!successful) throw new Error("Fallback copy failed");
        console.log("Chave copiada via fallback (execCommand)");
      }

      setCopyTextStatus("copied");
      setTimeout(() => setCopyTextStatus("idle"), 2000);
    } catch (err) {
      console.error("Erro ao copiar chave:", err);
      alert("Não foi possível copiar a chave. Verifique se o navegador permite acesso à área de transferência e se a página está em HTTPS.");
    }
  };

  return (
    <main className="payment-page">
      <header className="payment-header">
        <h1>Pagamento: {valor}</h1>
      </header>

      <div className="payment-content">
  <img src="/Payment.png" alt="QR Code / instruções de pagamento" className="payment-image" />

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
