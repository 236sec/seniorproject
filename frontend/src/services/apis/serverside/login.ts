import "server-only";
import { ApiPath } from "@/constants/api-path";
import { NextRequest } from "next/server";

export async function login(req: NextRequest): Promise<Response> {
  try {
    const baseUrl = ApiPath.AUTH.LOGIN;
    const response = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error instanceof Error
      ? error
      : new Error("Unknown error occurred while logging in");
  }
}
