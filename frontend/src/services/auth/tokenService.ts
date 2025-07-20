"use client";

export class TokenService {
  private static readonly TOKEN_KEY = "access_token";

  static setToken(token: string): void {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  static removeToken(): void {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(this.TOKEN_KEY);
    }
  }

  static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      : {
          "Content-Type": "application/json",
        };
  }
}
