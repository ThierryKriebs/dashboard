
export default async function page( { params } : { params: {id: string }}) {
  const id = params.id;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers()
  ])
  
  
  return <h1>Edit</h1>
}

