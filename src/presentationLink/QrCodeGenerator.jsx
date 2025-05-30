import { useState, useEffect } from "react";
import QRCode from "qrcode";
import Button from "../components/Button";
import { Copy, Download, Share } from "lucide-react";

export default function QRCodeGenerator({ url, title = "QR Code" }) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generateQR = async () => {
      if (!url) {
        setQrCodeUrl("");
        return;
      }

      setIsLoading(true);
      try {
        const qrUrl = await QRCode.toDataURL(url, {
          width: 256,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
          errorCorrectionLevel: "M",
        });
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
      } finally {
        setIsLoading(false);
      }
    };

    generateQR();
  }, [url]);

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openUrl = () => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  if (!url) {
    return (
      <div className="card" style={{ maxWidth: "350px", margin: "0 auto" }}>
        <div className="card-body text-center">
          <p className="text-muted">Nenhuma URL fornecida</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card " style={{ maxWidth: "350px", margin: "0 auto" }}>
      <div className="card-body bg-dark">
        <h5 className="card-title text-center mb-3">{title}</h5>

        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "256px" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : qrCodeUrl ? (
          <>
            <div className="text-center mb-3">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="img-fluid border rounded"
                style={{ maxWidth: "256px" }}
              />
            </div>

            <div className="text-center mb-3">
              <p className="text-muted small mb-2">Escaneie o código ou:</p>
              <div className="d-grid gap-2">
                <Button onClick={openUrl} icon={<Share size={14} />}>
                  Acessar Link
                </Button>

                <Button onClick={downloadQRCode} icon={<Download size={14} />}>
                  Baixar PNG
                </Button>
              </div>
            </div>

            <div className="text-center">
              <small className="text-muted" style={{ wordBreak: "break-all" }}>
                {url.length > 40 ? `${url.substring(0, 40)}...` : url}
              </small>
              <Button onClick={() => navigator.clipboard.writeText(url)} icon={<Copy size={14} />}>
                Copiar link
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center text-danger">
            <p>Erro ao gerar QR Code</p>
          </div>
        )}
      </div>
    </div>
  );
}
