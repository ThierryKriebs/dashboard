// middleware de NextJS, chaque requête HTTP qui arrive sur le serveur Next traverse ce pipeline:
// Requête entrante
//    → le matcher s'applique-t-il à ce chemin ? (config.matcher)
//       non  → routage direct vers la page/route
//       oui  → votre fonction middleware s'exécute (runtime Edge)
//              → true : la requête continue vers la page
//              → false / redirect : la requête s'arrête là, redirection

// Aucune page n'est rendue tant que le middleware n'a pas rendu son verdict. 
// C'est un "before hook" global du serveur, obtenu uniquement par le nom du fichier.

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';


export default NextAuth(authConfig).auth;

export const config = {
    // N'importe quelle chaine d'URL qui ne contient pas les sous-chaines définies dedans
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}