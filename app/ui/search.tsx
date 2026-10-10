'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation"; // Récupération des paramètres d'URL

export default function Search( { placeholder } : {placeholder :string}) {
   
    const searchParams = useSearchParams(); // Récupération des paramètres d'URL en lecture seule => Source de vérité
    const {replace} = useRouter(); // Permet de changer d'URL sans garder d'historique de chaque modification
    const pathname = usePathname(); //renvoi /dashboard/invoices


    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);   // Copie modifiable des paramètres actuels (le hook est en lecture seule).
                                                            // prépare la prochaine URL"   → new URLSearchParams(searchParams) (brouillon)
                                                            // clone modifiable de l'état actuel de l'URL
        if (term) {
            params.set('query', term)  // prépare un paramètre query qui contiendra la valeur saisie par l'utilisateur
        } else {
            params.delete('query')  // dans le cas où l'utilisateur a saisie une information puis la supprimée. 
                                    // On supprime alors le paramètre qu'on a créé précédemment, afin de ne pas en créer un qui ne contient rien
                                    // Évite les états fantômes. Si query= dans l'URL, un composant qui vérifie if (params.has('query')) croira à tort qu'une recherche est active.
        }

        // Création d'une nouvelle URL qui contiendra la valeur demandée par l'utilisateur (l'URL est modifiée en direct!)
        // L'URL sera mise à jour sans le rechargement de la page (grâce à NextJS clientSide navigation)
        replace(`${pathname}?${params.toString()}`);
    }
   
    return (
        <div className="relative flex flex-1 flex-shrink-0">
            {/* 
            relative            position: relative      Servir d'ancrage aux enfants absolute
            flex                display: flex           Disposer ses enfants en flexbox
            flex-1              flex: 1 1 0%            Remplir l'espace disponible
            flex-shrink-0       flex-shrink: 0          Ne jamais rétrécir 
            */}
            
            <label htmlFor="search" className="sr-only"> {/* sr-only = "screen reader only"  */}
                Rechercher
            </label>
            <input
                id="search"
                autoComplete="off"
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" 
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value)
                }}
                defaultValue={searchParams.get('query')?.toString()}  
                // Si l'utilisateur tape ceci dans l'URL: http://localhost:3000/dashboard/invoices?query=hello
                // grâce à defaultValue, hello va apparaitre dans le champ de recherche
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    )
}