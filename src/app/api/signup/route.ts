import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "digifarm",
    });

    // Check if user already exists
    const [existing]: any = await connection.execute(
      "SELECT * FROM users WHERE email = ? AND role = ?",
      [email, role]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "User with this email and role already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
