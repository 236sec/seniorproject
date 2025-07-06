import { login } from "@/services/apis/serverside/login";
import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await login(req);
  if (response.ok) {
    const data = await response.json();
    (await cookies()).set("token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });
    res.status(200).json({ success: true });
  } else {
    const data = await response.json();
    res.status(response.status).json({ message: data.message });
  }
}
