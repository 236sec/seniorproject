import "server-only";
import { ApiPath } from "@/constants/api-path";
import { NextRequest } from "next/server";

export async function register(req: NextRequest): Promise<Response> {
  try {
    const baseUrl = ApiPath.AUTH.REGISTER;
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch register:", error);
    throw error instanceof Error
      ? error
      : new Error("Unknown error occurred while fetching register");
  }
}
