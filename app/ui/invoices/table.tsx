
import { fetchFilteredInvoices } from '@/app/lib/data'

export default async function InvoiceTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {

    const invoices = await fetchFilteredInvoices (query, currentPage) //Recherche des données
   console.log(invoices);
   return <p>Tableau</p>
}

