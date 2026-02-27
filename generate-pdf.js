const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('🚀 Génération du PDF en cours...');
  
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  
  const page = await browser.newPage();
  
  // Chemin vers le fichier HTML
  const htmlPath = path.join(__dirname, 'index.html');
  const fileUrl = `file://${htmlPath.replace(/\\/g, '/')}`;
  
  console.log(`📄 Chargement de: ${fileUrl}`);
  await page.goto(fileUrl, {
    waitUntil: 'networkidle0'
  });
  
  // Générer le PDF
  const pdfPath = path.join(__dirname, 'brochure.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    }
  });
  
  console.log(`✅ PDF généré avec succès: ${pdfPath}`);
  
  await browser.close();
})();
