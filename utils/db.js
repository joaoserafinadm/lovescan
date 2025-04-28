import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL; // URI de conexão com o MongoDB
const dbName = 'app'; // Nome do banco de dados

let cachedClient = null; // Armazenar o cliente MongoDB

export async function connect() {
    if (cachedClient) {
        // Se já existir uma conexão, retornar o cliente existente
        return cachedClient;
    }

    // Caso contrário, criar uma nova conexão
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db(dbName);

    // Armazenar o cliente para reutilização futura
    cachedClient = {
        client,
        db,
    };

    return cachedClient;
}