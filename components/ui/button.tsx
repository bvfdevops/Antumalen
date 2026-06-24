import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[.97]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--brand)] text-primary-foreground shadow-sm hover:brightness-110 hover:shadow-md",
        accent:
          "bg-accent text-accent-foreground shadow-sm hover:brightness-105 hover:shadow-md",
        whatsapp:
          "bg-whatsapp text-white shadow-sm hover:brightness-105 hover:shadow-md",
        outline:
          "border border-border bg-card/60 text-foreground backdrop-blur hover:bg-secondary",
        ghost: "text-foreground hover:bg-secondary",
        secondary:
          "bg-secondary text-secondary-foreground hover:brightness-95",
      },
      size: {
        default: "h-11 px-6 has-[>svg]:px-5",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  if (asChild) {
    // Renderiza el único hijo (p.ej. <a>) con las clases del botón.
    const child = React.Children.only(props.children) as React.ReactElement<{
      className?: string;
    }>;
    return React.cloneElement(child, {
      className: cn(buttonVariants({ variant, size }), child.props.className),
    });
  }
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
