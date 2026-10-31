// middleware de NextJS, chaque requête HTTP qui arrive sur le serveur Next traverse ce pipeline:
// Requête entrante
//    → le matcher s'applique-t-il à ce chemin ? (config.matcher)
//       non  → routage direct vers la page/route
//       oui  → votre fonction middleware s'exécute (runtime Edge)
//              → true : la requête continue vers la page
//              → false / redirect : la requête s'arrête là, redirection

// Aucune page n'est rendue tant que le middleware n'a pas rendu son verdict. 
// C'est un "before hook" global du serveur, obtenu uniquement par le nom du fichier.

// Next.js branche un hook qui s'exécute avant chaque requête, sur le runtime Edge.
// Le runtime Edge : signifie que ce code s'exécute sur un serveur ultra-rapide et léger, proche de l'utilisateur, 
// et non sur le serveur Node classique. 
// Conséquence pratique : dans middleware.ts (et donc dans auth.config.ts qu'il importe), interdiction d'utiliser Prisma ou d'accéder à la base de données 
// — d'où le providers: [] vide dans ta config.

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';


export default NextAuth(authConfig).auth;

export const config = {
    // N'importe quelle chaine d'URL qui ne contient pas les sous-chaines définies dedans
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'],

//  Sans matcher, le middleware s'exécuterait sur absolument chaque requête, y compris les fichiers statiques — un gaspillage. Ce matcher est une expression régulière avec un negative lookahead (?!...) qui exclut certains chemims :

// ?! => exclut certains chemins

// api => Routes d'API — pas besoin de vérifier une session pour du JSON
// _next/static => Fichiers statiques de Next.js (JS, CSS compilés)
// _next/image => Images optimisées par Next.js
// .*\.png$  => images PNG

// Tout le reste (/dashboard, /login, /, etc.) passe par le middleware.
}