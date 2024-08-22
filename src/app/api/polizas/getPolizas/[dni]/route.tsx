import { enableCors, pool } from "@/services/mysql/dbConfig";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const { dni } = context.params;


  try {
    const query =
      "select distinct p.certificado, p.articulo, p.descripcion, p.rama from polizas p inner JOIN operaciones o on p.certificado = o.certificado WHERE o.dni = ?";
    const [rows] = await pool.query(query, [dni]);
    let response = NextResponse.json(rows);
    return enableCors(response);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
