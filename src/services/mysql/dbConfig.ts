import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Configura la conexión a la base de datos
export const dbConfig = {
  host: "200.58.106.236",
  port: 3306,
  user: "Lumar",
  password: "lumar123",
  database: "johnpellegrini",
};

// Función para habilitar CORS
export function enableCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Permite todas las solicitudes
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export const pool = mysql.createPool(dbConfig);
