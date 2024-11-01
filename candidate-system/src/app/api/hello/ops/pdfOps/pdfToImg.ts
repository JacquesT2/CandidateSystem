import { fromPath } from "pdf2pic";
import { getPdfDimensions } from "./getPdfSize";
import fs from 'fs';
import path from "path";

export async function pdfToImg(pathIn: string, pathOut: string) {
    const dimension = await getPdfDimensions(pathIn)
    const options = {
        density: 100,
        saveFilename: pathOut,
        savePath: "",
        format: "png",
        width:  dimension["width"]*4,
        height: dimension["height"]*4
    };
    const convert = fromPath(pathIn, options);
    const pageToConvertAsImage = 1;

    await convert(pageToConvertAsImage, { responseType: "image" },)
        .then((resolve) => {
            console.log("Page 1 is now converted as image");
            const generatedFile = `${pathOut}.1.png`;
            if (fs.existsSync(generatedFile)) {
                // Rename the generated file to the desired output path
                fs.renameSync(generatedFile, pathOut);
            }
            return resolve;
        });
}