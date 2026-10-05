import { sql } from '@vercel/postgres';


export async function fetchCardData() {
    try {

        
    } catch (error) {
        console.error('Database Error', error);
        throw new Error('Echec lors de la récupération des données de Card');
    }
}