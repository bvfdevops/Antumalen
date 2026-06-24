"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function Sheet(props: React.ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root {...props} />;
}

function SheetContent({
  className,
  children,
  title,
  description,
}: {
  className?: string;
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <Dialog.Popup
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-card text-card-foreground shadow-2xl outline-none transition-transform duration-300 ease-out data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <Dialog.Title className="font-display text-xl font-semibold">
              {title}
            </Dialog.Title>
            {description ? (
              <Dialog.Description className="mt-0.5 text-sm text-muted-foreground">
                {description}
              </Dialog.Description>
            ) : null}
          </div>
          <Dialog.Close
            aria-label="Cerrar"
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-5" />
          </Dialog.Close>
        </div>
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  );
}

export { Sheet, SheetContent };
