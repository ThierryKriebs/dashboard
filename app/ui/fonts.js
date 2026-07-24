import { Inter, Lusitana } from 'next/font/google' ; // gestion des police par NextJS (les télécharge en local au moment du build => page s'ouvre plus vite)

// la police Inter est téléchargée en local par NextJS (au moment du build) et est appliquée à l'ensemble de l'application
export const inter = Inter({   subsets: ['latin'], });
export const lusitana = Lusitana({   subsets: ['latin'], weight: ['400', '700'] });