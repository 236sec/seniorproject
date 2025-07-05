import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Button variants using CVA
const buttonVariants = cva(
  "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      type: {
        submit:
          "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
        canceled: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
        default: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      type: "submit",
      size: "md",
    },
  }
);

interface AlertButtonProps extends VariantProps<typeof buttonVariants> {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: "default" | "destructive";
  className?: string;
  children: React.ReactNode;
}

export const AlertButton: React.FC<AlertButtonProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  variant = "default",
  className,
  children,
  type = "submit",
  size = "md",
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className={cn(buttonVariants({ type, size }), className)}>
          {children}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn(
              variant === "destructive"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            )}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertButton;
