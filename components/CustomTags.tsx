interface BasicProps {
    children?: React.ReactNode;
    className?: string;
}

export function H1({ children, className }: BasicProps) {
    return (
        <h1 className={`${className} text-3xl font-bold`}>
            {children}
        </h1>
    )
}

export function H2({ children, className }: BasicProps) {
    return (
        <h2 className={`${className} text-2xl font-bold`}>
            {children}
        </h2>
    )
}

export function H3({ children, className }: BasicProps) {
    return (
        <h3 className={`${className} text-xl font-bold`}>
            {children}
        </h3>
    )
}

export function P({ children, className }: BasicProps) {
    return (
        <p className={`${className} text-lg`}>
            {children}
        </p>
    )
}

export function Ul({ children, className }: BasicProps) {
    return (
        <ul className={`${className} text-lg`}>
            {children}
        </ul>
    )
}

export function Li({ children, className }: BasicProps) {
    return (
        <li className={`${className} text-lg`}>
            {children}
        </li>
    )
}

interface LabelProps extends BasicProps {
    labelFor?: string;
}

export function Label({ children, labelFor, className }: LabelProps) {
    return (
        <label htmlFor={labelFor} className={`${className} text-xl`}>
            {children}
        </label>
    )
}

interface InputProps extends BasicProps {
    type?: string;
    checked?: any;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: any;
    onChange?: any;
    min?: number;
    max?: number;
    disabled?: boolean;
}

export function Input({ className, type, checked, id, name, placeholder, value, onChange, min, max, disabled }: InputProps) {
    return (
        <input min={min} max={max} checked={checked} type={type} id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled}
            className={`${className} leading-normal rounded-md bg-neutral-700 placeholder:text-neutral-400 text-neutral-100 outline-none border-transparent focus:border-neutral-500 border-2`} />
    )
}

interface TextAreaProps extends BasicProps {
    cols?: number;
    rows?: number;
    wrap?: string;
    id?: string;
    name?: string;
    value?: any;
    onChange?: any;
}

export function TextArea({ className, cols, rows, wrap, id, name, value, onChange }: TextAreaProps) {
    return (
        <textarea id={id} name={name} value={value} onChange={onChange} cols={cols} rows={rows} wrap={wrap}
            className={`${className} leading-normal rounded-md bg-neutral-700 placeholder:text-neutral-400 text-neutral-100 outline-none border-transparent focus:border-neutral-500 border-2`} />
    )
}

interface ButtonProps extends BasicProps {
    onClick?: any;
}

export function Button({ className, onClick, children }: ButtonProps) {
    return (
        <button onClick={onClick}
            className={`${className} px-2 m-1 rounded-md bg-neutral-700 text-neutral-100 outline-none`}>
            { children }
        </button>
    )
}