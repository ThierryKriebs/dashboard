import NextAuth from 'next-auth';
import { authConfig } from './auth.config';


export default NextAuth(authConfig).auth;

export const config = {
    // N'importe quelle chaine d'URL qui ne contient pas les sous-chaines définies dedans
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}