"use client";
import AlertButton from "@/components/atom/alertDialogButton";
import DialogButton from "@/components/atom/dialogButton";

const typeDialog = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "success",
  "danger",
  "warning",
] as const;

export default function AllComponentsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        All Components
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        This page showcases all the components available in the application.
      </p>
      <div className="flex flex-col gap-10">
        <h1>Alert Dialog Examples</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          <AlertButton
            title="Delete Item"
            type="submit"
            description="Are you sure you want to delete this item?"
            onConfirm={() => console.log("Item deleted")}
            onCancel={() => console.log("Delete canceled")}
            variant="default"
          >
            Delete
          </AlertButton>
        </div>
        <h1>Dialog Examples</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {typeDialog.map((type) => (
            <DialogButton
              key={type}
              title={`${type.charAt(0).toUpperCase() + type.slice(1)} Dialog`}
              description={`This is a ${type} dialog example.`}
              onConfirm={() => console.log(`${type} action confirmed`)}
              onCancel={() => console.log(`${type} action canceled`)}
              type={type}
            >
              {`${type.charAt(0).toUpperCase() + type.slice(1)} Button`}
            </DialogButton>
          ))}
        </div>
      </div>
    </div>
  );
}
