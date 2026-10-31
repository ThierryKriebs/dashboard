import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt';


async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error("Echec de la récupération de l'utilisateur", error);
        throw new Error("Echec de la récupération de l'utilisateur");
    }

}

// NextAuth(config) donne 3 outils tout faits — auth (lire la session, utilisé par le middleware), 
// signIn (se connecter), signOut (se déconnecter) On n'a plus qu'à les utiliser quand on en a besoin!
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6)})
            .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;

                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) return user;
            }

            console.log('Identifiants invalides');
            return null;
        }

    })]
})