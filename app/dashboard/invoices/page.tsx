import { lusitana } from "@/app/ui/fonts"
import Search from "@/app/ui/search";
import { Createinvoice } from "@/app/ui/invoices/buttons";


export default function Page() {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-beween">
                <h1 className={`${lusitana.className} text-2xl`}>Factures</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Recherche des factures" />
                <Createinvoice />
            </div>

        </div>
       
    );
}