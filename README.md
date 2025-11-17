# 🍺 Menù Birre - Sito con Netlify CMS

Sito web completamente gratuito per gestire il menù delle birre del tuo ristorante, con pannello di amministrazione semplice e intuitivo.

## ✨ Caratteristiche

- ✅ **100% Gratuito** - Hosting su Netlify, nessun costo
- 📱 **Mobile-First** - Perfetto su smartphone e tablet
- ⚡ **Velocissimo** - Sito statico ottimizzato
- 🎨 **Pannello Admin** - Interfaccia grafica per gestire le birre
- 🖼️ **Caricamento Immagini** - Drag & drop diretto
- 🔄 **Aggiornamento Automatico** - Modifiche live in pochi secondi
- 🚀 **Zero Manutenzione** - Nessun database, nessun server

## 🚀 Setup Iniziale (5 minuti)

### 1. Crea Repository GitHub

1. Vai su [GitHub](https://github.com) e crea un account (se non ce l'hai)
2. Clicca su "New Repository"
3. Nome: `menu-birre` (o quello che preferisci)
4. Seleziona "Public"
5. Clicca "Create repository"

### 2. Carica i File

1. Scarica tutti i file di questo progetto
2. Caricali nel repository GitHub (drag & drop o Git)

### 3. Collega Netlify

1. Vai su [Netlify](https://www.netlify.com) e registrati (gratis)
2. Clicca "Add new site" → "Import an existing project"
3. Scegli "GitHub" e autorizza
4. Seleziona il repository `menu-birre`
5. Impostazioni build:
   - Build command: `npm run build`
   - Publish directory: `.`
6. Clicca "Deploy site"

### 4. Abilita Netlify Identity

1. Nel dashboard Netlify, vai su "Identity"
2. Clicca "Enable Identity"
3. Vai su "Settings and usage"
4. In "Registration preferences" → Seleziona "Invite only"
5. In "External providers" → Abilita "GitHub"
6. In "Services" → "Git Gateway" → Clicca "Enable Git Gateway"

### 5. Crea il Tuo Account Admin

1. Vai su "Identity" → "Invite users"
2. Inserisci la tua email
3. Riceverai un'email di invito
4. Clicca sul link e crea la password
5. Ora puoi accedere a `tuosito.netlify.app/admin`

## 📝 Come Gestire le Birre

### Accedere al Pannello

1. Vai su `https://tuosito.netlify.app/admin`
2. Fai login con le tue credenziali
3. Vedrai la lista delle birre

### Aggiungere una Birra

1. Clicca "New Birre"
2. Compila i campi:
   - **Nome Birra**: es. "Peroni Nastro Azzurro"
   - **Immagine**: Trascina una foto o clicca per caricare
   - **Descrizione**: Breve descrizione della birra
   - **Prezzo**: es. 5.50
   - **Categoria**: Scegli dal menu (Chiara, Scura, ecc.)
   - **Disponibile**: Spunta se è disponibile
   - **Ordine**: Numero per ordinare (1, 2, 3...)
3. Clicca "Publish" in alto a destra
4. Aspetta 30-60 secondi → Il sito si aggiorna automaticamente!

### Modificare una Birra

1. Clicca sulla birra dalla lista
2. Modifica i campi che vuoi
3. Clicca "Publish"
4. Fatto!

### Eliminare una Birra

1. Clicca sulla birra
2. Clicca "Delete entry" in alto
3. Conferma
4. La birra sparisce dal sito

### Da Smartphone

Il pannello funziona perfettamente anche da mobile:
1. Apri `tuosito.netlify.app/admin` dal browser
2. Fai login
3. Gestisci tutto con tap e swipe

## 🎨 Personalizzazione

### Cambiare Colori

Modifica il file `css/style.css`, sezione `:root`:

```css
:root {
    --primary: #f59e0b;      /* Colore principale (arancione) */
    --secondary: #1f2937;    /* Colore secondario (grigio scuro) */
    --text: #374151;         /* Colore testo */
    --bg: #f9fafb;          /* Sfondo pagina */
}
```

### Cambiare Titolo

Modifica `index.html`, riga 6 e 16:

```html
<title>Il Tuo Ristorante - Menù Birre</title>
<h1>🍺 Le Nostre Birre</h1>
```

### Aggiungere Categorie

Modifica `admin/config.yml`, riga 19:

```yaml
options: ["Chiara", "Scura", "Rossa", "Artigianale", "IPA", "Lager", "Weiss", "TuaCategoria"]
```

## 💰 Costi

**ZERO €** - Tutto completamente gratuito:
- Netlify: 100 GB bandwidth/mese gratis
- GitHub: Repository pubblici illimitati
- Netlify CMS: Open source gratuito
- Hosting immagini: Incluso nel repository

## 🔧 Manutenzione

**Nessuna manutenzione richiesta!**
- Nessun aggiornamento da fare
- Nessun database da gestire
- Nessun server da monitorare
- Backup automatici su GitHub

## 📈 Espansioni Future

### Facili da Aggiungere

1. **Sezione Vini**: Duplica la configurazione per le birre
2. **Menù Cibo**: Aggiungi una nuova collection nel CMS
3. **Orari/Contatti**: Pagina statica aggiuntiva
4. **Multilingua**: Duplica i contenuti in altre lingue
5. **Prenotazioni**: Integra form gratuito (Netlify Forms)

### Con un Po' di Codice

1. **Ricerca**: Aggiungi un campo di ricerca in JS
2. **Ordinamento**: Ordina per prezzo, nome, ecc.
3. **Filtri Avanzati**: Filtra per gradazione, paese, ecc.
4. **Galleria**: Mostra tutte le immagini in una galleria
5. **Analytics**: Aggiungi Google Analytics gratuito

## 🆘 Supporto

### Problemi Comuni

**Il sito non si aggiorna dopo una modifica**
- Aspetta 1-2 minuti
- Svuota la cache del browser (Ctrl+F5)
- Controlla lo stato del deploy su Netlify

**Non riesco ad accedere a /admin**
- Verifica di aver abilitato Netlify Identity
- Controlla di aver attivato Git Gateway
- Assicurati di aver accettato l'invito via email

**Le immagini non si caricano**
- Usa immagini JPG o PNG
- Dimensione massima: 5MB
- Rinomina file senza spazi o caratteri speciali

## 📱 Performance

Il sito è ottimizzato per:
- ✅ Lighthouse Score > 90
- ✅ Caricamento < 2 secondi
- ✅ Mobile-friendly
- ✅ SEO ottimizzato
- ✅ Immagini lazy-load

## 📄 Licenza

MIT - Usa liberamente per il tuo ristorante!
