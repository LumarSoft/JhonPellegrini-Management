import { enableCors, pool } from "@/services/mysql/dbConfig";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const { dni } = context.params;
  try {
    const query = "SELECT * FROM bienes WHERE dni_asegurado = ?";
    const [rows] = await pool.query(query, [dni]);
    let response = NextResponse.json(rows);
    return enableCors(response);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
