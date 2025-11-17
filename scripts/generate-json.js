const fs = require('fs');
const path = require('path');

// Leggi tutti i file markdown nella cartella beers
const beersDir = path.join(__dirname, '../beers');
const beers = [];

if (fs.existsSync(beersDir)) {
  const files = fs.readdirSync(beersDir).filter(f => f.endsWith('.md'));
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(beersDir, file), 'utf8');
    
    // Estrai i dati dal frontmatter
    const match = content.match(/---\n([\s\S]*?)\n---/);
    if (match) {
      const frontmatter = match[1];
      const beer = {};
      
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          const value = valueParts.join(':').trim();
          beer[key.trim()] = value.replace(/^["']|["']$/g, '');
        }
      });
      
      // Converti i tipi
      if (beer.prezzo) beer.prezzo = parseFloat(beer.prezzo);
      if (beer.disponibile) beer.disponibile = beer.disponibile === 'true';
      if (beer.order) beer.order = parseInt(beer.order);
      
      beers.push(beer);
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
