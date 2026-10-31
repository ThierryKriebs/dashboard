import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/login', //route relative à la page de connexion personnalisée
                          // si l'authentification échoue, => redirige automatiquement sur la route /login  
    },

    // Middleware de NextJs pour protéger nos routes
    callbacks: {
        authorized({ auth, request: { nextUrl }}) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            // Si on est sur dashboard et qu'on est connecté, => authorise l'accès
            if (isOnDashboard) {
                if (isLoggedIn) return true; //true provoque l'affichage de la page demandée
                
                // Pas connecté => refuse l'accès + redirige sur la route cablée pour effectuer le signIn (/login => voir plus haut)
                return false;
                
            // Si la personne est bien authentifié, => on redirige vers le dashboard
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            // L'utilisateur n'est pas sur Dashboard et n'est pas connecté => on authorise l'accès (pages publiques!)
            return true;
        }
    },
    providers: [], // tableau contenant les providers (méthodes de connexion) autorisées ()
                   // Google, GitHub, Discord, Apple... | L'utilisateur clique sur « Se connecter avec Google », est renvoyé chez Google, et revient avec un compte déjà vérifié |
                   // | Credentials | Credentials({...}) | Login + mot de passe classiques, que toi tu vérifies (souvent dans ta BDD) |
                   // | Email (magic link) | Resend, Nodemailer... | L'utilisateur reçoit un lien par mail, clique, et est connecté |
                   // providers est vide car le fichier est importé dans middleware.ts qui tourne sur le runtime Edge 
                   // un environnement léger qui n'a pas accès à la base de données ni à certaines librairies Node (Prisma, bcrypt...). 
                   // Or, un provider comme Credentials a justement besoin de consulter la BDD pour vérifier le mot de passe.
                   // C'est pour ça qu'on sépare la config en deux fichiers :
                   // auth.config.ts → la partie « edge-safe » (pages, callbacks, providers vide) → utilisable par le middleware
                   // auth.ts → la config complète, qui importe auth.config.ts et ajoute les vrais providers (avec Prisma) → utilisée côté serveur, là où la BDD est accessible

} satisfies NextAuthConfig;
// satisfies => opérateur TypeScript permettant de vérifier que  authConfig est conforme à NextAuthConfig ()
//  S'il manque une propriété obligatoire ou s'il y a une faute de frappe => Erreur à la compilation.