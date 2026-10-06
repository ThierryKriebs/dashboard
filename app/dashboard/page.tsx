
import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from '@/app/lib/data';

export default async function Page() {
    const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();

    return (
       <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl `}>
                Tableau de bord
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card title='Collecté' value={totalPaidInvoices} type='collected' />
                <Card title='En attente' value={totalPendingInvoices} type='pending' />
                <Card title='Total facture(s)' value={numberOfInvoices} type='invoices' />
                <Card title='Total client(s)' value={numberOfCustomers} type='customers' />
            </div>
       </main>
    );
}