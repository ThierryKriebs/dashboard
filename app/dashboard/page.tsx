
import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData, fetchRevenue } from '@/app/lib/data';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';

export default async function Page() {
    
    const revenue = await fetchRevenue();

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
            <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
                <RevenueChart revenue={revenue} />
            </div>

       </main>
    );
}