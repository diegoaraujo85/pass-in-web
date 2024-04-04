import { ComponentProps } from "react";

interface CheckboxProps extends ComponentProps<'input'> {
  
}

export function Checkbox(props: CheckboxProps){
  return (
    <input 
      type='checkbox' 
      className='border rounded size-4 bg-black/20 border-white/10 checked:bg-orange-400'
      {...props}
    />
  )
}