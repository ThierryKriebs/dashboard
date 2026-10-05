
import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from "@/app/ui/fonts";

export default async function Page() {
    return (
       <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:test-2x1`}>
                tableau de bord
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card title='Collecté' value={} type='collected'>
            </div>
       </main>
    );
}