import { NextRequest, NextResponse } from "next/server";
import { register } from "@/services/apis/serverside/register";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    // Proxy request to backend
    const response = await register(request);

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: "Registration successful",
        user: data,
      });
    } else {
      return NextResponse.json(
        { message: data.message || "Registration failed" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
