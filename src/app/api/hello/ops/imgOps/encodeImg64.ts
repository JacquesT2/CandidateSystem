import * as fs from "fs"

export function encodeImageToBase64 (filePath: string): string  {
    const image = fs.readFileSync(filePath);
    return image.toString('base64');
  };
  