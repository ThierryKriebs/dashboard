import { Revenue} from "./definitions";

// Le montant est envoyé en centimes (évite de stocker des nombres à virgule)
// Formate ce montant pour un affichage en dollar ex: "$1,999.99"
export const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString('en-US', { // locale anglo-américaine
        style: 'currency',  
        currency: 'USD',
    });
}

export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'fr-FR'
) => {
    
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }

    const date = new Date(dateStr);
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
}

export const generateYAxis = (revenue: Revenue[]) => {
     const highestRecord = Math.max(...revenue.map((month) => month.revenue));
     const topLabel = Math.ceil(highestRecord / 1000) * 1000; // Arrondi au millier supérieur
     return topLabel;
}

export const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({length: totalPages}, (_, i) => i + 1) // retourne un Array de 1 à totalPages
                                                                 // [ 1, 2, 3, 4..., 7]  
                                                                 // Array.from({length: totalPages => tableau de undefined [undefined, undefined, undefined ...]
                                                                 // (_, i) 
                                                                 // _ => valeur de l'élément courant ici undefined 
                                                                 // i => index (0, 1, 2... jusqu'à totalPages)
                                                                 // résultat = index + 1
    
    }
    
    // [1][2][3][...][5][6]
    if (currentPage <= 3) { // Si la page courante est dans les 3 premières
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // [1][2][...][4][5][6]
    if (currentPage >= totalPages -2) { // Si la page courante est dans les 3 dernières
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // [1][...][voisine -1][page actuelle][voisine + 1][...][6]
    return [
        1,
        '...', 
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
    ];
    
}