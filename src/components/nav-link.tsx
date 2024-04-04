import { ComponentProps } from "react"

interface NavLinkProps extends ComponentProps<'a'> {
  href: string
  children: string
}

export function NavLink({ href, children, ...props }: NavLinkProps) {
  return (
    <a
      {...props}
      href={href}
      className="text-sm font-medium"
    >
      {children}
    </a>
  )}