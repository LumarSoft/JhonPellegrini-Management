import { pool } from "@/services/mysql/dbConfig";
import { NextResponse } from "next/server";

export async function PUT(req: Request, context: any) {
  const { idBien } = context.params;

  try {
    // Extraer FormData del request
    const formData = await req.formData();

    // Obtener los valores del FormData
    const marca = formData.get("marca");
    const modelo = formData.get("modelo");
    const patente = formData.get("patente");
    const anio = formData.get("anio");
    const cobertura = formData.get("cobertura");
    const monto = formData.get("monto");
    const accesorios = formData.get("accesorios");
    const adicionales = formData.get("adicionales");

    // Actualizar los datos en la base de datos
    const query = `UPDATE bienes SET marca = ?, modelo = ?, patente = ?, anio = ?, cobertura = ?, monto = ?, accesorios = ?, adicionales = ? WHERE id_bien = ?`;
    const [rows]: any[] = await pool.query(query, [
      marca,
      modelo,
      patente,
      anio,
      cobertura,
      monto,
      accesorios,
      adicionales,
      idBien,
    ]);

    // Verificar si se actualizó algún registro
    if (rows.affectedRows === 0) {
      return NextResponse.error();
    }

    return NextResponse.json({ message: "Datos actualizados" });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
