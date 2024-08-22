import { pool } from "@/services/mysql/dbConfig";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, context: any) {
  const { idBien } = context.params;

  if (!idBien) {
    return NextResponse.json(
      { message: "Falta el id del bien" },
      { status: 400 }
    );
  }

  try {
    const query = `DELETE FROM bienes WHERE id_bien = ?`;
    const [rows]: any[] = await pool.query(query, [idBien]);

    if (rows.affectedRows === 0) {
      return NextResponse.json(
        { message: "Bien no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Bien eliminado" });
  } catch (error) {
    console.error("Error al eliminar datos:", error);
    return NextResponse.json(
      { message: "Error al eliminar el bien" },
      { status: 500 }
    );
  }
}
