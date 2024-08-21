import { pool } from "@/services/mysql/dbConfig";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, context: any) {
  const { idBien } = context.params;
  if (!idBien) {
    return {
      status: 400,
      body: { message: "Falta el id del bien" },
    };
  }

  try {
    const query = `DELETE FROM bienes WHERE id_bien = ?`;
    const [rows]: any[] = await pool.query(query, [idBien]);

    if (rows.affectedRows === 0) {
      return NextResponse.error();
    }

    return NextResponse.json({ message: "Bien eliminado" });
  } catch (error) {
    console.error("Error al eliminar datos:", error);
    return NextResponse.error();
  }
}
