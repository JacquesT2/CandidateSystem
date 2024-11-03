import { Candidate } from "./type";
import { MongoClient } from 'mongodb';

function jaccardSimilarity(query: string, document: string): number {
    const queryWords = query.toLowerCase().split(" ");
    const documentWords = document.toLowerCase().split(" ");
    
    const intersection = new Set(queryWords.filter(word => documentWords.includes(word)));
    const union = new Set([...queryWords, ...documentWords]);
    
    return intersection.size / union.size;
}





export async function returnTopResponses(query: string, n: number): Promise<Candidate[]> {

    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);


    try {
        await client.connect();
        const db = client.db("CVs");
        const collection = db.collection("CVsTheReturn");
        
        // Fetch all candidates
        const data = await collection.find().toArray();
        const collectionOfCandidates:  Candidate[]   = data as  Candidate[] 
        if (n > collectionOfCandidates.length) {
            n = collectionOfCandidates.length
        }
        // Calculate similarity score for each candidate's profile
        const scoredCandidates = collectionOfCandidates.map(candidate => ({
            candidate,
            score: jaccardSimilarity(query, candidate.profile)
        }));

        // Sort candidates by score in descending order and take the top `n` results
        scoredCandidates.sort((a, b) => b.score - a.score);

        // Extract just the candidate data for the top `n` candidates
        const topCandidates = scoredCandidates.slice(0, n).map(scored => scored.candidate);

        return topCandidates;

    } finally {
        await client.close();
    }
}