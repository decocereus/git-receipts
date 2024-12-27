import React, { ComponentPropsWithoutRef, ReactNode, Ref, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    intent: {
      body: "text-sm",
      headline: "text-xl",
    },
    color: {
      black: "text-black",
    },
    opacity: {
      "opacity-50": "opacity-50",
      "opacity-60": "opacity-60",
    },
    weight: {
      bold: "font-bold",
      semibold: "font-semibold",
      medium: "font-medium",
      normal: "font-normal",
      light: "font-light",
    },
    textTransform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
    },
    align: {
      center: "text-center",
      left: "text-left",
      right: "text-right",
      justify: "text-justify",
    },
    fontFamily: {
      geistSans: "text-geistSans",
      geistMono: "text-geistMono",
    },
  },
  defaultVariants: {
    intent: "body",
    color: "black",
    fontFamily: "geistSans",
  },
});

interface TextProps<T extends React.ElementType>
  extends VariantProps<typeof textVariants> {
  as?: T;
  className?: string;
  children?: ReactNode;
}

const Text = <T extends React.ElementType>(
  {
    className,
    intent,
    weight,
    color,
    as,
    align,
    opacity,
    textTransform,
    fontFamily,
    ...props
  }: TextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>>,
  ref: Ref<HTMLElement>
) => {
  const localRef = useRef(null);
  const textRef = ref || localRef;
  const Component = as ?? "span";
  return (
    <Component
      className={cn(
        textVariants({
          intent,
          color,
          weight,
          opacity,
          fontFamily,
          textTransform,
          align,
        }),
        className
      )}
      {...props}
      ref={textRef}
    />
  );
};

Text.displayName = "Button";

export default Text;
