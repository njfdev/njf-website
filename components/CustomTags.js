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