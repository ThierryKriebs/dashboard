import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';

export default async function Page({
    searchParams
}: {
    searchParams?: {            //Cette page peut (à cause du champ recherche) être appelée avec des paramètres d'url
        query?: string;
        page?: string;
    }
}) {

  const query = searchParams?.query || '';  
  const customers = await fetchFilteredCustomers(query);

  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}
