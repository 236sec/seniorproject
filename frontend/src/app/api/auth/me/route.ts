import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface JWTPayload {
  sub: string;
  email: string;
  username?: string;
  iat?: number;
  exp?: number;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { message: "JWT secret not configured" },
        { status: 500 }
      );
    }

    try {
      const payload = jwt.verify(token, secret) as JWTPayload;

      // Return user info from token
      return NextResponse.json({
        user: {
          _id: payload.sub,
          email: payload.email,
          username: payload.username || payload.email?.split("@")[0],
        },
      });
    } catch {
      // Token is invalid
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
