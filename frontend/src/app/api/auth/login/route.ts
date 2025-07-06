import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { login } from "@/services/apis/serverside/login";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Proxy request to backend
    const response = await login(request);

    const data = await response.json();

    if (response.ok && data.access_token) {
      // Set HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set("token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      // Return success response without the token
      return NextResponse.json({
        success: true,
        user: data.user,
        message: "Login successful",
      });
    } else {
      // Return error from backend
      return NextResponse.json(
        { message: data.message || "Login failed" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
