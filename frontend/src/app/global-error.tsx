"use client"; // Error boundaries must be Client Components

import React from "react";
import { AlertTriangle, RefreshCw, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  // Log error for debugging and monitoring
  React.useEffect(() => {
    console.error("Global Error:", error);

    // You can integrate with error monitoring services here
    // Example: Sentry, LogRocket, Bugsnag, etc.
    // logErrorToService(error);
  }, [error]);

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleReset = () => {
    reset();
  };

  return (
    // global-error must include html and body tags
    <html lang="en">
      <head>
        <title>Something went wrong - Error</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-lg mx-auto shadow-lg">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Oops! Something went wrong
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  We encountered an unexpected error. Don&apos;t worry, our team
                  has been notified and is working on a fix.
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Error ID Section */}
              {error.digest && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Error ID:
                    </span>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {error.digest}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Error Type */}
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Error Type:
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {error.name || "Unknown Error"}
                  </Badge>
                </div>
              </div>

              {/* Development Error Details */}
              {process.env.NODE_ENV === "development" && (
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    🔍 Show technical details (Development only)
                  </summary>
                  <div className="mt-3 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
                          Error Message:
                        </h4>
                        <p className="text-sm text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900 p-2 rounded">
                          {error.message}
                        </p>
                      </div>
                      {error.stack && (
                        <div>
                          <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
                            Stack Trace:
                          </h4>
                          <pre className="text-xs text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900 p-3 rounded whitespace-pre-wrap overflow-auto max-h-40 border">
                            {error.stack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              )}

              {/* Help Section */}
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  What can you do?
                </h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Try refreshing the page</li>
                  <li>• Check your internet connection</li>
                  <li>• Return to the homepage</li>
                  <li>• If the problem persists, please contact support</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  onClick={handleReset}
                  className="w-full sm:flex-1"
                  variant="default"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={handleReload}
                  variant="outline"
                  className="w-full sm:flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
              </div>
              <Button onClick={handleGoHome} variant="ghost" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Return to Homepage
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Background decoration */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-red-200 dark:bg-red-900 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-orange-200 dark:bg-orange-900 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        </div>
      </body>
    </html>
  );
}
