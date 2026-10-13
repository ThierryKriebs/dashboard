'use client';

import { generatePagination } from '@/app/lib/utils';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams, usePathname } from "next/navigation"; //recherche des paramètres dans la barre de recherche
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({totalPages}: { totalPages: number}) {
    
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page') || 1)
    
    // Modifie l'URL en fonction de la page sur laquelle l'utilisateur a cliqué
    //dashboard/invoices?page=NuméroDeLaPageSurLAquelleOnACliqué
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString()); //modifie la page actuelle dans l'URL
        return `${pathname}?${params.toString()}`
    }


    const allPages = generatePagination(currentPage, totalPages); // renvoie un tableau avec l'ensemble des numéros de page pour la pagination
   
    return (
        <>
            <div className='inline-flex'>
                <PaginationArrow 
                    href={createPageURL(currentPage - 1)}
                    direction="left"
                    isDisabled={currentPage <= 1}
                />
                <div className='flex -space-x-px'>
                    {
                        allPages.map((page, index) => {
                            
                            let position: 'first' | 'last' | 'single' | 'middle' | undefined;
                            if (index === 0) position = 'first';
                            if (index === allPages.length -1) position = 'last';
                            if (allPages.length === 1) position = 'single';
                            if (page === '...') position = 'middle';
                            
                            return (
                                <PaginationNumber 
                                    key={page} 
                                    page={page}
                                    href={createPageURL(page)}
                                    isActive={currentPage === page}
                                    position={position}
                                />
                            )
                        })
                    }
                </div>
                <PaginationArrow 
                    href={createPageURL(currentPage + 1)}
                    direction="right"
                    isDisabled={currentPage >= totalPages}
                />
            </div>
        </>
    )
}


function PaginationNumber({
    page,
    href,
    isActive,
    position
}: {
    page: number | string;
    href: string;
    isActive: Boolean;
    position?: 'first' | 'last' | 'middle' | 'single';

}) {
    // clsx is a tiny utility for constructing className strings conditionally in JavaScript and React applications. It is similar to classnames, but smaller and faster.
    // https://medium.com/@surya.tplm/understanding-clsx-in-react-simplifying-conditional-class-names-ba8e0a4fe699
    // injecte des class conditionnellements à celles déjà existantes: 'flex h-10 w-10 items-center justify-center text-sm border'
    const className = clsx(
        'flex h-10 w-10 items-center justify-center text-sm border',
        {
            'rounded-l-md': position === 'first' || position === 'single',
            'rounded-r-md': position === 'last' || position === 'single',
            'z-10 bg-blue-600 border-blue-600 text-white': isActive,   //si c'est la page en cours, le texte doit être blanc
            'hover:bg-gray-100': !isActive && position !== 'middle',
            'text-gray-300': position === 'middle'
        }
    )

    // Si la page courante à afficher dans le composant pagination est la page active, affiche juste le numéro de la page
    // Sinon affiche un lien pour se rendre sur une autre page
    return isActive || position === 'middle' ? (
        <div className = {className}>{page}</div>
    ) : (
        <Link
            href={href}
            className={className}
        >
            { page }
        </Link>
    )
}

// Création d'un bouton <- ou -> (Page suivante ou Page précédente)
function PaginationArrow({
    href,
    direction,
    isDisabled
}: {
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
}){

    const className = clsx(
        'flex h-10 w-10 items-center justify-center rounded-md border',
        {
            'pointer-events-none text-gray-300': isDisabled, 
            'hover:bg-gray-100': !isDisabled,
            'mr-2 md:mr-4': direction === 'left', //si direction vaut left alors à partir du breakpoint md (768px) margin-right: 1rem, en-dessous margin-right: 0.5rem
            'ml-2 md:ml-4': direction === 'right'
        }
    )

    const icon = direction === 'left' ? (
        <ArrowLeftIcon className='w-4' />
    ) : (
        <ArrowRightIcon className='w-4' />
    );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link
            className = {className}
            href={href}
        >
            {icon}
        </Link>
    );
}