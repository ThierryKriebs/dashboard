'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search( { placeholder } : {placeholder :string}) {
   
    function handleSearch(term: string) {
        console.log(term);
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
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" 
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value)
                }}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    )
}