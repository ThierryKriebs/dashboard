
import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from "@/app/ui/fonts";

//import { fetchCardData, fetchRevenue, fetchLatestInvoices } from '@/app/lib/data'; // avant
import { fetchCardData, fetchLatestInvoices } from '@/app/lib/data';  // maintenant les données fetchRevenue ne sont plus récupérées dans le composant parent

import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
    
    // const revenue = await fetchRevenue(); // maintenant les données fetchRevenue ne sont plus récupérées dans le composant parent
    const latestInvoices = await fetchLatestInvoices();

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
                {/* <RevenueChart revenue={revenue} /> */}
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart /> {/* les données de revenus ne sont plus récupérées par le composant parent, mais par le composant */}
                </Suspense>
                <LatestInvoices latestInvoices={latestInvoices} />
            </div>

       </main>
    );
}