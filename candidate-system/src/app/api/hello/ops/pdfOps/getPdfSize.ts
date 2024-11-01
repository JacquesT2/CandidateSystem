const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

export async function getPdfDimensions(pdfPath: string) {
  const pdfBuffer = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0]
    return firstPage.getSize()
  
  pages.forEach((page: { getSize: () => { width: any; height: any; }; }, index: number) => {
    const { width, height } = page.getSize();
    console.log(`Page ${index + 1}: Width = ${width}, Height = ${height}`);
  });
}
