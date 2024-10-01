import * as React from "react"

import { cn } from "@/lib/utils"

export interface SmallInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SmallInput = React.forwardRef<HTMLInputElement, SmallInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-6 w-20 rounded-md border border-input bg-background mx-2 mt-1 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
SmallInput.displayName = "SmallInput"

export { SmallInput }
