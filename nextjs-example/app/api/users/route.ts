import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

// Helper function to read and write to db.json
const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeDB = (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET all users
export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json(db.users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();
    const newUser = {
      id: db.users.length + 1,
      ...body,
    };
    db.users.push(newUser);
    writeDB(db);
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

// PUT update user
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = readDB();
    const index = db.users.findIndex((user: any) => user.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    db.users[index] = { ...db.users[index], ...body };
    writeDB(db);
    return NextResponse.json(db.users[index]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    const db = readDB();
    const index = db.users.findIndex((user: any) => user.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    db.users.splice(index, 1);
    writeDB(db);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
