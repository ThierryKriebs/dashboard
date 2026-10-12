'use client';

import { useSearchParams } from "next/navigation"; //recherche des paramètres dans la barre de recherche
import { generatePagination } from '@/app/lib/utils';

export default function Pagination({totalPages}: { totalPages: number}) {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page') || 1)
    
    const allPages = generatePagination(currentPage, totalPages); // renvoie un tableau avec l'ensemble des pnuméros de page pour la pagination
    console.log(allPages);

    return <p>Pagination</p>
}