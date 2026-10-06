import { sql } from '@vercel/postgres';
import { formatCurrency } from './utils'; // permet le formatage en dollar américaine des montants en centimes

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

        //data => [15, 10, [paid: 118516, pending: 125632]]
        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoicesStatusPromise,
        ]);

        const totalPaidInvoices = formatCurrency(data[2].rows[0].paid);

        return {
            totalPaidInvoices
        }

    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Echec lors de la récupération des données de Card');
    }
}