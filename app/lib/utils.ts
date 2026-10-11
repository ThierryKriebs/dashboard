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