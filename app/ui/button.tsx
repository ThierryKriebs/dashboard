import clsx from 'clsx';

//Permet de définir la forme structure d'un objet
// hérite d'une autre interface (extends)
//HTMLButtonElement précise que ces propriétés concernent un élément HTML <button>
interface ButtonProps  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, className, ...rest }:ButtonProps) {
    return (
        <button
            {...rest}
            //clsx() sert à construire dynamiquement une chaîne de classes CSS, notamment selon des conditions.
            className={clsx('flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
            className,
            )}
            
        >
            { children }
        </button>
    )
}