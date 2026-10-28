import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/login', //route relative à la page de connexion personnalisée
    },

    // Middleware de NextJs pour protéger nos routes
    callbacks: {
        authorized({ auth, request: { nextUrl }}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            // Si on est sur dashboard et qu'on est connecté, => authorise l'accès
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                
                // Pas connecté => refuse l'accès
                return false;
                
            // Si la personne est bien authentifié, => on redirige vers le dashboard
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            // L'utilisateur n'est pas sur Dashboard et n'est pas connecté => on authorise l'accès (pages publiques!)
            return true;
        }
    },
    providers: [],

} satisfies NextAuthConfig;