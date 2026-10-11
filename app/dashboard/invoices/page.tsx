import { lusitana } from "@/app/ui/fonts"
import Search from "@/app/ui/search";
import { Createinvoice } from "@/app/ui/invoices/buttons";
import Table from '@/app/ui/invoices/table'; // export par défaut on peut donc le nommer comme on veut
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";

export default function Page({
    searchParams,
}: {
    searchParams?: {            //Cette page peut (à cause du champ recherche) être appelée avec des paramètres d'url
        query?: string;
        page?: string;
    }
}) {

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-beween">
                <h1 className={`${lusitana.className} text-2xl`}>Factures</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Recherche des factures" />
                <Createinvoice />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                < Table query={query} currentPage={currentPage}/>
            </Suspense>

        </div>
       
    );
}