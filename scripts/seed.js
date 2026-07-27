const { db } = require('@vercel/postgres') // destructuration, on ne récupère que l'objet db de tous les objets renvoyés par vercel

// Nos fonctions

async function main () {
    const client  = await db.connect();
    console.log(client);

    // Fonction pour créer la table users et lui injecter la data

    await client.end();
}

main().catch((err) => {
    console.error( 
        "Une erreur s'est produite: ",
        err
    );
})