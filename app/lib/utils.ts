
// Le montant est envoyé en centimes (évite de stocker des nombres à virgule)
// Formate ce montant pour un affichage en dollar ex: "$1,999.99"
export const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString('en-US', { // locale anglo-américaine
        style: 'currency',  
        currency: 'USD',
    });
}