"use client";

export const DashboardModule = () => {
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
            se actualiza cada 1 minuto. Recargar la pagina de ser necesario
          </p>
        </div>
        <img src={"http://john-api.com:3002/qr"} />
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
