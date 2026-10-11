
import { fetchFilteredInvoices } from '@/app/lib/data'
import DeuxTables from '@/app/ui/invoices/deux-tables'


export default async function InvoiceTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {

    const invoices = await fetchFilteredInvoices (query, currentPage) //Recherche des données
   console.log(invoices);
   
   
// return <p>Tableau</p>
    return (
        <div className='mt-6 flow-root'>
            <div className='inline-block min-w-full align-middle'>
                <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
                    <DeuxTables  invoices={invoices}  />
                </div>
            </div>
        </div>

    )
}

