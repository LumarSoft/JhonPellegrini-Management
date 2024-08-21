import { pool } from "@/services/mysql/dbConfig";
import { NextResponse } from "next/server";

export async function PUT(req: Request, context: any) {
  const { dni } = context.params;

  try {
    // Extraer FormData del request
    const formData = await req.formData();

    // Obtener los valores del FormData
    const newState = formData.get("newState");

    // Actualizar los datos en la base de datos
    const query = `UPDATE clientes SET estado = ? WHERE dni = ?`;
    const [rows]: any[] = await pool.query(query, [newState, dni]);

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
