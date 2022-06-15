export function H1({ children, className }) {
    return (
        <h1 className={`${className} text-3xl font-bold text-neutral-900 dark:text-neutral-50`}>
            {children}
        </h1>
    )
}

export function H2({ children, className }) {
    return (
        <h2 className={`${className} text-2xl font-bold text-neutral-800 dark:text-neutral-100`}>
            {children}
        </h2>
    )
}

export function H3({ children, className }) {
    return (
        <h3 className={`${className} text-xl font-bold text-neutral-800 dark:text-neutral-100`}>
            {children}
        </h3>
    )
}

export function P({ children, className }) {
    return (
        <p className={`${className} text-lg text-neutral-700 dark:text-neutral-200`}>
            {children}
        </p>
    )
}

export function Ul({ children, className }) {
    return (
        <ul className={`${className} text-lg text-neutral-700 dark:text-neutral-200`}>
            {children}
        </ul>
    )
}

export function Li({ children, className }) {
    return (
        <li className={`${className} text-lg text-neutral-700 dark:text-neutral-200`}>
            {children}
        </li>
    )
}

export function Label({ children, labelFor, className }) {
    return (
        <label htmlFor={labelFor} className={`${className} text-xl text-neutral-700 dark:text-neutral-200`}>
            {children}
        </label>
    )
}

export function Input({ className, type, id, name, placeholder, value, onChange }) {
    return (
        <input type={type} id={id} name={name} placeholder={placeholder} value={value} onChange={onChange}
            className={`${className} px-1 rounded-md bg-neutral-700 placeholder:text-neutral-400 text-neutral-100 outline-none border-transparent focus:border-neutral-500 border-2`} />
    )
}

export function Button({ className, onClick, children }) {
    return (
        <button onClick={onClick}
            className={`${className} px-2 m-1 rounded-md bg-neutral-700 text-neutral-100 outline-none`}>
            { children }
        </button>
    )
}