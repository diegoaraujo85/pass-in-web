import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<'button'> {
  transparent?: boolean
  icon?: LucideIcon
}

export function IconButton({ transparent, icon: Icon, ...props}: IconButtonProps) {
  return (
    <button
      {...props}
      // className={transparent 
      //   ? 'p-1.5 border rounded-md bg-black/20 border-white/10 disabled:cursor-not-allowed'
      //   : 'p-1.5 border rounded-md bg-white/10 border-white/10 disabled:cursor-not-allowed'}
      className={twMerge(
        'p-1.5 border rounded-md border-white/10',
        transparent ? 'bg-black/20' : 'bg-white/10',
        props.disabled ? 'cursor-not-allowed opacity-50': null,
      )}
    >
      {Icon && <Icon className="size-4" />}
      {props.children}
    </button>
  )
}