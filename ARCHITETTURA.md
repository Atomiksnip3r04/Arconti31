# 🏗️ Architettura Tecnica del Progetto

## 📋 Panoramica

Sistema di gestione contenuti (CMS) headless per menù birre, completamente statico e gratuito.

## 🔧 Stack Tecnologico

### Frontend
- **HTML5**: Struttura semantica
- **CSS3**: Styling responsive con CSS Grid e Flexbox
- **JavaScript Vanilla**: Nessuna dipendenza, caricamento dinamico

### Backend/CMS
- **Netlify CMS**: Interfaccia amministrativa
- **Git Gateway**: Autenticazione e gestione contenuti
- **GitHub**: Storage e versioning

### Hosting
- **Netlify**: Hosting statico con CI/CD automatico
- **GitHub Pages**: Alternativa gratuita

## 📁 Struttura del Progetto

```
menu-birre/
├── admin/
│   ├── index.html          # Pannello CMS
│   └── config.yml          # Configurazione Netlify CMS
├── beers/
│   ├── beers.json          # Database JSON delle birre
│   └── *.md                # File markdown generati dal CMS
├── css/
│   └── style.css           # Stili responsive
├── images/
│   └── beers/              # Immagini caricate dal CMS
├── js/
│   └── app.js              # Logica frontend
├── scripts/
│   └── generate-json.js    # Script build per JSON
├── index.html              # Pagina principale
├── netlify.toml            # Configurazione Netlify
├── package.json            # Dipendenze e script
└── README.md               # Documentazione
```

## 🔄 Flusso di Lavoro

### 1. Modifica Contenuti (Ristoratore)

```
Ristoratore → /admin → Netlify CMS
                ↓
        Modifica/Aggiungi Birra
                ↓
        Clicca "Publish"
                ↓
        Netlify CMS crea commit
                ↓
        Push su GitHub
```

### 2. Build e Deploy Automatico

```
GitHub riceve commit
        ↓
Netlify rileva modifiche
        ↓
Esegue build command: npm run build
        ↓
Script genera beers.json da file .md
        ↓
Deploy automatico
        ↓
Sito aggiornato (30-60 sec)
```

### 3. Visualizzazione (Utente)

```
Utente visita sito
        ↓
Browser carica index.html
        ↓
JavaScript fetch beers.json
        ↓
Rendering dinamico cards
        ↓
Lazy loading immagini
```

## 🗂️ Gestione Dati

### Formato Dati

**File Markdown (generato dal CMS)**
```markdown
---
nome: "Birra Moretti"
immagine: "/images/beers/moretti.jpg"
descrizione: "Lager italiana dal gusto equilibrato"
prezzo: 4.50
categoria: "Chiara"
disponibile: true
order: 1
---
```

**File JSON (generato dallo script)**
```json
{
  "beers": [
    {
      "nome": "Birra Moretti",
      "immagine": "/images/beers/moretti.jpg",
      "descrizione": "Lager italiana dal gusto equilibrato",
      "prezzo": 4.50,
      "categoria": "Chiara",
      "disponibile": true,
      "order": 1
    }
  ]
}
```

### Perché Due Formati?

1. **Markdown**: Facile da gestire per Netlify CMS, versionabile
2. **JSON**: Veloce da leggere per JavaScript, ottimizzato per frontend

## 🔐 Autenticazione e Sicurezza

### Netlify Identity
- Autenticazione gestita da Netlify
- Nessun database utenti da gestire
- OAuth con GitHub
- Invite-only per sicurezza

### Git Gateway
- Proxy tra CMS e GitHub
- Permessi gestiti da Netlify
- Commit automatici con nome utente
- Nessuna esposizione token GitHub

### Sicurezza
- HTTPS automatico (certificato SSL gratuito)
- Nessun database da proteggere
- Nessuna API esposta
- File statici = superficie d'attacco minima

## ⚡ Performance

### Ottimizzazioni Frontend

1. **CSS Minimalista**
   - Nessun framework pesante
   - CSS Grid nativo
   - Variabili CSS per temi

2. **JavaScript Leggero**
   - Vanilla JS (no jQuery, no React)
   - Fetch API nativa
   - Event delegation

3. **Immagini**
   - Lazy loading nativo (`loading="lazy"`)
   - Placeholder durante caricamento
   - Dimensioni ottimizzate

4. **Caching**
   - File statici cachati dal CDN
   - Cache-Control headers automatici
   - Invalidazione automatica su deploy

### Metriche Target

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: > 90
- **Bundle Size**: < 50KB (senza immagini)

## 🌐 CDN e Distribuzione

### Netlify CDN
- 100+ edge locations globali
- Distribuzione automatica
- GZIP/Brotli compression
- HTTP/2 e HTTP/3

### Bandwidth
- 100 GB/mese gratis
- Sufficiente per ~100.000 visite/mese
- Immagini servite dal CDN

## 🔄 CI/CD Pipeline

```
Commit su GitHub
    ↓
Netlify Webhook trigger
    ↓
Clone repository
    ↓
npm install (se necessario)
    ↓
npm run build
    ↓
Deploy su CDN
    ↓
Invalidazione cache
    ↓
Notifica deploy completato
```

### Build Time
- Tipico: 20-40 secondi
- Con immagini: 40-60 secondi

## 📱 Responsive Design

### Breakpoints
```css
Mobile: < 768px (1 colonna)
Tablet: 768px - 1024px (2 colonne)
Desktop: > 1024px (3-4 colonne)
```

### Mobile-First
- CSS scritto per mobile prima
- Media queries per schermi più grandi
- Touch-friendly (pulsanti > 44px)

## 🔌 Estensibilità

### Facile da Estendere

1. **Nuove Collection**
   ```yaml
   # admin/config.yml
   - name: "wines"
     label: "Vini"
     folder: "wines"
   ```

2. **Nuovi Campi**
   ```yaml
   - {label: "Gradazione", name: "abv", widget: "number"}
   - {label: "Paese", name: "country", widget: "string"}
   ```

3. **Nuove Pagine**
   - Duplica `index.html`
   - Crea nuovo JSON
   - Aggiungi link navigazione

### Integrazioni Possibili

- **Netlify Forms**: Form contatti gratuiti
- **Google Analytics**: Tracking visite
- **Cloudinary**: Ottimizzazione immagini avanzata
- **Algolia**: Ricerca full-text (piano free)

## 🧪 Testing

### Test Manuali
1. Aggiungi birra da /admin
2. Verifica apparizione su sito
3. Test filtri categorie
4. Test responsive (Chrome DevTools)

### Test Automatici (Opzionali)
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --collect.url=https://tuosito.netlify.app
```

## 📊 Monitoring

### Netlify Analytics (Opzionale, $9/mese)
- Visite uniche
- Pagine più viste
- Referrer
- Nessun cookie, privacy-friendly

### Alternative Gratuite
- Google Analytics
- Plausible (self-hosted)
- Umami (self-hosted)

## 🔧 Manutenzione

### Zero Manutenzione Richiesta
- ✅ Nessun aggiornamento software
- ✅ Nessun database da ottimizzare
- ✅ Nessun server da patchare
- ✅ Backup automatici (Git)

### Backup
- Ogni modifica = commit Git
- Storia completa su GitHub
- Rollback facile da Netlify dashboard

## 🚀 Scalabilità

### Limiti Netlify Free
- 100 GB bandwidth/mese
- 300 build minutes/mese
- 1000 form submissions/mese

### Quando Scalare?
- > 100.000 visite/mese → Considera piano Pro ($19/mese)
- > 1000 birre → Considera paginazione
- Più ristoranti → Multi-tenancy con sottocartelle

## 🎯 Best Practices Implementate

1. **Semantic HTML**: Tag appropriati per SEO
2. **Accessibility**: Alt text, ARIA labels, contrasto colori
3. **SEO**: Meta tags, structured data ready
4. **Performance**: Lazy loading, minification
5. **Security**: HTTPS, CSP headers, no XSS
6. **UX**: Loading states, error handling, feedback visivo

## 📚 Risorse Utili

- [Netlify CMS Docs](https://www.netlifycms.org/docs/)
- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Docs](https://docs.github.com/)
- [Web.dev Performance](https://web.dev/performance/)
