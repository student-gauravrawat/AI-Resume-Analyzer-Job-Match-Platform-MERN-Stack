import React, { useId } from 'react';
import { forwardRef } from 'react';

function Input({
    label, 
    type = "text", 
    classname = "", 
    icon: Icon, // Accepts a React Icon component
    ...props
}, ref) {
    const id = useId();

    return (
        <div className="w-full mb-4">
            {label && (
                <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className="relative flex items-center">
                <input
                    id={id}
                    type={type}
                    autoComplete={type === "password" ? "current-password" : "on"}
                    className={`w-full px-4 py-3 bg-white/40 border border-blue-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/60 transition-all placeholder:text-gray-400 ${classname}`}
                    ref={ref}
                    {...props}
                />
                {Icon && (
                    <div className="absolute right-4 text-gray-400">
                        <Icon size={20} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.forwardRef(Input);