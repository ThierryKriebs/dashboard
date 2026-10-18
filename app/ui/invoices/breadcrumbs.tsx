import { clsx } from "clsx";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";


interface Breadcrumb {
    label: string;
    href: string;
    active?: boolean;
}

export default function Breadcrumbs({
    breadcrumbs
} : {
    breadcrumbs: Breadcrumb[];
}) {// breadcrumbs means fil d'ariane
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block"> 
        <ol className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}>
            {breadcrumbs.map((breadcrumb, index) => (
                <li
                    key={breadcrumb.href}
                    aria-current={breadcrumb.active} // Indicates to assistive technology that this is the active link
                    className={clsx(
                        breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
                    )}
                >
                    <Link href={breadcrumb.href}>{breadcrumb.label}</Link>  {/*  Factures / Créer une facture */}
                    { index < breadcrumbs.length - 1 ? (
                        <span className="mx-3 inline-block">/</span>    
                        
                    ): null} {/* mx mean margin-inline */}
                </li>

            ))

            }
        </ol>
    </nav>
  )
}
