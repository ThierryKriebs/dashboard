'use client' // Pour pouvoir utiliser le hook usepathname de next/navigation
import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


const links = [
    { name: 'Accueil', href: '/dashboard', icon: HomeIcon },
    { name: 'Factures', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
    { name: 'Clients', href: '/dashboard/customers', icon: UserGroupIcon }
];


export default function NavLinks() {

    const pathname = usePathname();

    return (
        <>
        {
            links.map((link) => {

                const LinkIcon = link.icon;

                return (
                    <Link 
                        key={link.name}
                        href={link.href}
                        //clsx => fonction utilitaire qui permet d’ajouter des classes CSS de façon propre et conditionnelles.
                        className={clsx (
                            // classes de base, toujours présentes
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                // ajout d'une class si la conditione est vraie
                                'bg-sky-100 text-blue-600' : pathname === link.href, 
                            }
                        )}
                    >
                        <LinkIcon className='w-6' />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })
        }
        </>
    )
}