"use server"
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'; // permet de vider le cache du navigateur client pour une route donnée
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


// État du formulaire retourné par une Action Serveur après soumission.
// errors  : messages de validation par champ (string[] car un champ peut
//           enfreindre plusieurs règles à la fois). Absent si tout est valide.
// message : message d'erreur global (ex. échec BDD), null sinon.
// Cet état couvre aussi le succès { errors: {}, message: null }
export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
}

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Veuillez sélectionner un client',
    }),
    amount: z.coerce.number()
    .gt(0, { message: 'Veuillez entrer un montant supérieur à 0 $.'}), //gt greater than
    date: z.string(),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Veuillez sélectionner le status de la facture'
    })
})

const CreateInvoice = FormSchema.omit({id: true, date: true});
const UpdateInvoice = FormSchema.omit({id: true, date: true});

export async function createInvoice(prevState: State, formData: FormData) {
   
    // parse => renvoie les données validées, ou lève une ZodError si invalide
    // safeParse => renvoie toujours un objet, ne lève jamais d'exception
    // { success: true, data: {...} }
    // { success: false, error: ZodError }
   const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })

    // Si la validation n'a pas fonctionné on renvoie notre propre objet erreur formate comme nous on a envie
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors, 
            // flatten transforme les données en simple dictionnaire 
            // ex: { amount: ['Veuillez entrer un montant supérieur à 0 $'] }
            message: 'Champ manquants. Echec de la création de la facture.'
        }
    }

    const {customerId, amount, status} = validatedFields.data;

    const amountInCents = amount * 100;

    const date = new Date().toISOString().split('T')[0] ;

    try {
        // Enregistrer la facture en BDD
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;

    }catch (error) {
        return { message: 'Erreur base de données: échec lors de la création de la facture.'}
    }
   
    // Revalider le path (vide le cache de route côté client et le mettre à jour) 
    // On verra ainsi la nouvelle facture apparaître sur la page
    revalidatePath('/dashboard/invoices');

    // Redirection après enregistrement en BDD 
    redirect('/dashboard/invoices');
}


export async function updateInvoice(id: string, preState: State, formData: FormData) {
    
   const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })

    // Si la validation n'a pas fonctionné on renvoie notre propre objet erreur formate comme nous on a envie
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors, 
            // flatten transforme les données en simple dictionnaire 
            // ex: { amount: ['Veuillez entrer un montant supérieur à 0 $'] }
            message: 'Champ manquants. Echec de la modification de la facture.'
        }
    }

    const {customerId, amount, status} = validatedFields.data;
   
    const amountInCents = amount * 100;
    // const date = new Date().toISOString().split('T')[0] ;

    try {
        // Modifier la facture en BDD avec un ID spécifique
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
        `;

    } catch (error) {
        return { message: 'Erreur base de données: échec lors de la mise à jour de la facture.'}
    }
    

    // Revalider le path (vide le cache de route côté client et le mettre à jour) On verra ainsi les modifs de la facture apparaître sur la page
    revalidatePath('/dashboard/invoices');

    // Redirection après enregistrement en BDD 
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id:string) {
    
    // throw new Error("Echec de la suppression de la facture");
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;

        // Revalider le path (vide le cache de route côté client et le mettre à jour) On verra ainsi les modifs de la facture apparaître sur la page
        revalidatePath('/dashboard/invoices');

    } catch (error) {
        return { message: 'Erreur base de données: échec lors de la suppression de la facture.'}
    }
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        
        // Une erreur spécifique à l'authentification s'est produite
        if(error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Identifiants invalides.';
                default:
                    return "Quelque chose s'est mal passé."
            }

        }
        throw error;

    }
}