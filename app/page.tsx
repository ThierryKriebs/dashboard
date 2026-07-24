
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        
        { /* logo */}
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
              <strong>Bienvenue chez ACME</strong>
              <br />
              Application de Next.js proposée par Vercel.
          </p>
          <Link
            href='/login'
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Connexion</span>
            <ArrowRightIcon className='w-5 md:w-6' />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            {/* Image */}
             {/* Avec le composant image de next js
                 elles sont automatiquement mis en cache et converties en webp! 
                 Le placeholder permet d'afficher un flou le temps que l'image soit chargée (évite les décallages lors des rendus!) 
              */}

            {/* Afficher uniquement en mode desktop */}
            <Image
              src="/hero-desktop.png"
              alt="Capture d'écran du dashboard pour la version bureau"
              className="hidden md:block"
              width={1000}
              height={600}
            />

            {/* Afficher uniquement en mode mobile */}
             <Image
              src="/hero-mobile.png"
              alt="Capture d'écran du dashboard pour la version mobile"
              className="block md:hidden"
              width={560}
              height={620}
            />
        </div>
      </div>
    </main>
  );
}
