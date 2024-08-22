import { pool } from "@/services/mysql/dbConfig";
import { NextResponse } from "next/server";

export async function POST(req: Request, context: any) {
  try {
    // Extraer FormData del request
    const formData = await req.formData();

    // Obtener los valores del FormData
    const dni_cliente = formData.get("dni_cliente");
    const marca = formData.get("marca");
    const modelo = formData.get("modelo");
    const patente = formData.get("patente");
    const anio = formData.get("anio");
    const cobertura = formData.get("cobertura");
    const monto = formData.get("monto");
    const accesorios = formData.get("accesorios");
    const adicionales = formData.get("adicionales");

    // Insertar los datos en la base de datos
    const query = `INSERT INTO bienes (dni_asegurado, marca, modelo, patente, anio, cobertura, monto, accesorios, adicionales) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [rows]: any[] = await pool.query(query, [
      dni_cliente,
      marca,
      modelo,
      patente,
      anio,
      cobertura,
      monto,
      accesorios,
      adicionales,
    ]);

    // Verificar si se insertó algún registro
    if (rows.affectedRows === 0) {
      return NextResponse.error();
    }

    return NextResponse.json({ message: "Bien agregado" });
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
