import { getJsonMixtrale } from "./mistral/getJsonMistral"
import { sendPixtraleCV } from "./mistral/sendImageToMistral"
import fs from 'fs';
import path from 'path';


export async function initDB(apiKey: string) {
  // Path to the folder
  const folderPath = 'src/app/api/hello/data/Input';

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    files.forEach((file: string) => {
      const filePath = path.join(folderPath, file);

      fs.readFile(filePath, async (err, buffer) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }
        const name = await setDB(buffer, apiKey);
        const newFileName = folderPath+`${name}.pdf`
        fs.rename(filePath, newFileName, (err) => {
          if (err) {
            console.error(`Error renaming file ${file} to ${newFileName}:`, err);
          } else {
            console.log(`Renamed ${file} to ${newFileName}`);
          }
        });
      });
    });
  });
}

export async function setDB(pdfBuffer: Buffer, apiKey: string) {
  // Handle the POST request
  const response = await sendPixtraleCV(pdfBuffer, apiKey)
  const json = await getJsonMixtrale(response, apiKey)
  
  const { MongoClient } = require('mongodb');

  const url = 'mongodb://localhost:27017';

  // Create a new MongoClient instance
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db("CVs");
  const collection = db.collection("CVsTheReturn");

  await collection.insertOne(json);
  const noDoc = await collection.countDocuments()

  if (noDoc == 1){
    await initDB(apiKey)
  }
  await client.disconnect;

}