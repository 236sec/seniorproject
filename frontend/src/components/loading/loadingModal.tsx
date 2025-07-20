"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useLoadingState } from "@/lib/hooks";

export const LoadingModal: React.FC = () => {
  const { isLoading, loadingMessage } = useLoadingState();

  return (
    <Dialog open={isLoading}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading
          </DialogTitle>
          <DialogDescription className="text-center">
            {loadingMessage || "Please wait..."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
