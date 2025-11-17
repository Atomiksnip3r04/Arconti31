const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Leggi tutti i file markdown nella cartella beers
const beersDir = path.join(__dirname, '../beers');
const beers = [];

if (fs.existsSync(beersDir)) {
  const files = fs.readdirSync(beersDir).filter(f => f.endsWith('.md'));
  
  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(beersDir, file), 'utf8');
      
      // Estrai i dati dal frontmatter usando yaml
      const match = content.match(/---\n([\s\S]*?)\n---/);
      if (match) {
        const frontmatter = match[1];
        const beer = yaml.load(frontmatter);
        
        // Converti i tipi
        if (beer.prezzo) beer.prezzo = parseFloat(beer.prezzo);
        if (beer.disponibile !== undefined) beer.disponibile = beer.disponibile === true || beer.disponibile === 'true';
        if (beer.order) beer.order = parseInt(beer.order);
        
        // Assicurati che tags e allergeni siano array
        if (beer.tags && !Array.isArray(beer.tags)) {
          beer.tags = [beer.tags];
        }
        if (beer.allergeni && !Array.isArray(beer.allergeni)) {
          beer.allergeni = [beer.allergeni];
        }
        
        beers.push(beer);
      }
    } catch (error) {
      console.error(`Errore nel processare ${file}:`, error.message);
    }
  });
}

// Ordina per campo order
beers.sort((a, b) => (a.order || 0) - (b.order || 0));

// Scrivi il file JSON
const output = { beers };
fs.writeFileSync(
  path.join(__dirname, '../beers/beers.json'),
  JSON.stringify(output, null, 2)
);

console.log(`✅ Generato beers.json con ${beers.length} birre`);
