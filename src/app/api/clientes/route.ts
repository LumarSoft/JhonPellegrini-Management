import { enableCors, pool } from "@/services/mysql/dbConfig";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM clientes");

    let response = NextResponse.json(rows);

    return enableCors(response);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
