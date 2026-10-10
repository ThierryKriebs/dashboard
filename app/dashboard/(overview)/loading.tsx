
import DashboardSkeleton from "@/app/ui/skeletons"

export default function Loading() {
  // Or a custom loading skeleton component
  // return <p>Loading...</p>  // Méthode 1, simple message pour patienter, peut être remplacé par un spinner, plus estétique
  return <DashboardSkeleton /> // Méthode 2 => Squelette factice de toute la page (impose de créer un squelette factice (div vide...))
  
}