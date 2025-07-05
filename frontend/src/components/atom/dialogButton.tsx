import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Enhanced button variants using CVA with modern styling
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm",
  {
    variants: {
      type: {
        primary: [
          "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
          "focus-visible:ring-blue-500 shadow-blue-200/50",
          "dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700",
        ],
        success: [
          "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
          "focus-visible:ring-green-500 shadow-green-200/50",
          "dark:bg-green-500 dark:hover:bg-green-600 dark:active:bg-green-700",
        ],
        danger: [
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
          "focus-visible:ring-red-500 shadow-red-200/50",
          "dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700",
        ],
        warning: [
          "bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800",
          "focus-visible:ring-yellow-500 shadow-yellow-200/50",
          "dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:active:bg-yellow-700",
        ],
        secondary: [
          "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300",
          "focus-visible:ring-gray-500 border border-gray-300",
          "dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:border-gray-700",
        ],
        outline: [
          "border-2 bg-transparent hover:bg-gray-50 active:bg-gray-100",
          "text-gray-700 border-gray-300 focus-visible:ring-gray-500",
          "dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 dark:active:bg-gray-700",
        ],
        ghost: [
          "bg-transparent hover:bg-gray-100 active:bg-gray-200",
          "text-gray-700 focus-visible:ring-gray-500",
          "dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700",
        ],
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-lg",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      type: "primary",
      size: "md",
      rounded: "lg",
    },
  }
);

interface DialogButtonProps extends VariantProps<typeof buttonVariants> {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  className?: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const DialogButton: React.FC<DialogButtonProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  className,
  children,
  type = "primary",
  size = "md",
  rounded = "lg",
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button
          className={cn(buttonVariants({ type, size, rounded }), className)}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-lg font-semibold leading-6">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-5">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 sm:gap-0 pt-4">
          <DialogClose asChild>
            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {cancelText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={onConfirm}
              variant={type === "danger" ? "destructive" : "default"}
              className="w-full sm:w-auto"
            >
              {confirmText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogButton;
