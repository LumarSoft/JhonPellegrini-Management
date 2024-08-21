import { pool } from "@/services/mysql/dbConfig";
import { NextResponse } from "next/server";

export async function PUT(req: Request, context: any) {
  const { dni } = context.params;

  try {
    // Extraer FormData del request
    const formData = await req.formData();

    // Obtener los valores del FormData
    const nya_razonsocial = formData.get("nya_razonsocial");
    const celular = formData.get("celular");
    const email = formData.get("email");
    const direccion = formData.get("direccion");
    const agenda = formData.get("agenda");

    // Actualizar los datos en la base de datos
    const query = `UPDATE clientes SET nya_razonsocial = ?, celular = ?, email = ?, direccion = ?, agenda = ? WHERE dni = ?`;
    const [rows]: any[] = await pool.query(query, [
      nya_razonsocial,
      celular,
      email,
      direccion,
      agenda,
      dni,
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
