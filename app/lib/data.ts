import { sql } from '@vercel/postgres';
import { formatCurrency } from './utils'; // permet le formatage en dollar américaine des montants en centimes
import { Revenue, LatestInvoiceRaw } from './definitions';

export async function fetchRevenue() {
    try {

        const data = await sql<Revenue>`SELECT * FROM revenue`;
        return data.rows;

    } catch(error) {
        console.error('database Error:', error);
        throw new Error('Echec lors de la récupération des données de revenus');
    }
}

export async function fetchLatestInvoices() {
    try {
        const data = await sql<LatestInvoiceRaw>`
        SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id 
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY invoices.date DESC
        LIMIT 5`;

        const latestInvoices = data.rows.map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount),
        }));
        
        return latestInvoices;

    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Echec lors de la récupération des factures');
    }
}

export async function fetchCardData() {
    try {
        const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
        const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;

        const invoicesStatusPromise =sql`SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) As "pending"
        FROM invoices`;
        // si la ligne en cours à un status à paid, alors on exécute le SUM sur la colonne amount
        // si la ligne en cours à un status à pending, alors on exécute le SUM sur la colonne amount

        //data => [count: 15, count: 10, [paid: 118516, pending: 125632]]
        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoicesStatusPromise,
        ]);

        const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
        const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');
        const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
        const numberOfCustomers = Number(data[1].rows[0].count ?? '0');

        return {
            totalPaidInvoices,
            totalPendingInvoices,
            numberOfInvoices,
            numberOfCustomers
        }

    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Echec lors de la récupération des données de Card');
    }
}