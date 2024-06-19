"use client";

import { useEffect, useState } from "react";

export const DashboardModule = () => {
  const [qrImageUrl, setQrImageUrl] = useState<string>(""); // Estado para almacenar la URL de la imagen QR

  const url = "https://filly-emerging-lately.ngrok-free.app";

  const fetchQr = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      if (response.ok) {
       
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setQrImageUrl(imageUrl); 
      } else {
        console.error("Error al obtener la imagen:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    fetchQr(url);
    const interval = setInterval(() => {
      fetchQr(url); // Refresca la imagen cada 1 minuto
    }, 60000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <main className="w-full h-full flex flex-col items-center justify-between py-10 gap-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl font-semibold">BIENVENIDO</h1>
        <div className="text-center">
          <h3 className="text-xl">
            QR para conectar al bot de{" "}
            <span className="text-green-500 font-semibold">Whatsapp</span>
          </h3>
          <p>
            <span className="text-red-600 font-bold">RECORDATORIO:</span> El QR
            se actualiza cada 1 minuto. Recargar la página de ser necesario.
          </p>
        </div>
        {qrImageUrl && <img src={qrImageUrl} alt="QR Code" />} {/* Mostrar la imagen si qrImageUrl tiene valor */}
      </div>
      <div>
        <p>
          En caso de requerir asistencia: Enviar mensaje a LumarSoft (341
          569-0470)
        </p>
      </div>
    </main>
  );
};
