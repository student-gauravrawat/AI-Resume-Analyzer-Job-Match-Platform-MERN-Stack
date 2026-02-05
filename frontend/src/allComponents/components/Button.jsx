import React from 'react'

function Button({ 
    text, 
    className,
    w="w-full",
    h="h-auto",
    ...props
 }) {
  return (
    <button 
    className={`${className} ${w} ${h}  py-4 bg-linear-to-r from-[#56ccf2] to-[#2f80ed] text-white font-bold text-lg rounded-full shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform active:scale-95`}
    {...props}
    >
       {text}
    </button>
  )
}

export default Button
