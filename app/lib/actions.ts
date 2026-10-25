"use server"
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'; // permet de vider le cache du navigateur client pour une route donnée
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    date: z.string(),
    status: z.enum(['pending', 'paid'])
})

const CreateInvoice = FormSchema.omit({id: true, date: true});
const UpdateInvoice = FormSchema.omit({id: true, date: true});

export async function createInvoice(formData: FormData) {
    
   const {customerId, amount, status} = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0] ;

    // Enregistrer la facture en BDD
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    // Gestion des erreurs => plus tard


    // Revalider le path (vide le cache de route côté client et le mettre à jour) On verra ainsi la nouvelle facture apparaître sur la page
    revalidatePath('/dashboard/invoices');

    // Redirection après enregistrement en BDD 
    redirect('/dashboard/invoices');
}


export async function updateInvoice(id: string, formData: FormData) {
    
   const {customerId, amount, status} = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0] ;

    // Modifier la facture en BDD avec un ID spécifique
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
    `;

    // Gestion des erreurs => plus tard


    // Revalider le path (vide le cache de route côté client et le mettre à jour) On verra ainsi les modifs de la facture apparaître sur la page
    revalidatePath('/dashboard/invoices');

    // Redirection après enregistrement en BDD 
    redirect('/dashboard/invoices');
}