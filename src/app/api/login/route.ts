import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    // connect to MySQL
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root', // your MySQL user
      database: 'digifarm' // your DB name
    });

    // find user by email and role
    const [rows]: any = await db.execute(
      'SELECT * FROM users WHERE email = ? AND role = ? LIMIT 1',
      [email, role]
    );

    await db.end();

    const user = rows[0];
    if (!user) {
      return NextResponse.json({ error: 'User not found for this role' }, { status: 404 });
    }

    // compare password (plain text or bcrypt)
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
