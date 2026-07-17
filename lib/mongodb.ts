import { MongoClient, type Db } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable')
}

// Reuse the client across hot reloads in dev and across invocations in prod.
let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>
}

const options = {}

let clientPromise: Promise<MongoClient>

if (!globalWithMongo._mongoClientPromise) {
  const client = new MongoClient(uri, options)
  globalWithMongo._mongoClientPromise = client.connect()
}
clientPromise = globalWithMongo._mongoClientPromise

export async function getDb(): Promise<Db> {
  const client = await clientPromise
  // Use the database from the connection string, or fall back to a default.
  return client.db(process.env.MONGODB_DB || undefined)
}

export default clientPromise
