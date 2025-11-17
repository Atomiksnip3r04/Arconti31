# 🚀 Guida Completa al Deploy

## Prerequisiti

- Account GitHub (gratuito)
- Account Netlify (gratuito)
- Browser moderno

## 📝 Step 1: Preparazione Repository GitHub

### 1.1 Crea Account GitHub

1. Vai su [github.com](https://github.com)
2. Clicca "Sign up"
3. Inserisci email, password, username
4. Verifica email
5. Completa setup

### 1.2 Crea Nuovo Repository

1. Clicca il pulsante "+" in alto a destra
2. Seleziona "New repository"
3. Compila:
   - **Repository name**: `menu-birre-ristorante`
   - **Description**: "Menù birre con CMS"
   - **Public**: Seleziona (necessario per free tier)
   - **Initialize**: NON spuntare nulla
4. Clicca "Create repository"

### 1.3 Carica i File

**Opzione A: Via Web (Più Facile)**

1. Nella pagina del repository, clicca "uploading an existing file"
2. Trascina tutti i file e cartelle del progetto
3. Scrivi commit message: "Initial commit"
4. Clicca "Commit changes"

**Opzione B: Via Git (Per Sviluppatori)**

```bash
cd menu-birre-ristorante
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/menu-birre-ristorante.git
git push -u origin main
```

## 🌐 Step 2: Deploy su Netlify

### 2.1 Crea Account Netlify

1. Vai su [netlify.com](https://www.netlify.com)
2. Clicca "Sign up"
3. Scegli "Sign up with GitHub" (consigliato)
4. Autorizza Netlify ad accedere a GitHub

### 2.2 Importa Progetto

1. Nel dashboard Netlify, clicca "Add new site"
2. Seleziona "Import an existing project"
3. Clicca "Deploy with GitHub"
4. Autorizza Netlify (se richiesto)
5. Cerca e seleziona `menu-birre-ristorante`

### 2.3 Configura Build

Netlify dovrebbe rilevare automaticamente le impostazioni da `netlify.toml`, ma verifica:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `.`

Clicca "Deploy site"

### 2.4 Attendi Deploy

- Vedrai il log di build in tempo reale
- Tempo stimato: 1-2 minuti
- Quando vedi "Site is live", è pronto!

### 2.5 Verifica Sito

1. Clicca sul link generato (es. `random-name-123.netlify.app`)
2. Dovresti vedere la pagina delle birre
3. Verifica che le birre di esempio siano visibili

## 🔐 Step 3: Configura Netlify Identity

### 3.1 Abilita Identity

1. Nel dashboard del sito, vai su "Identity"
2. Clicca "Enable Identity"
3. Attendi conferma (pochi secondi)

### 3.2 Configura Registrazione

1. Vai su "Identity" → "Settings and usage"
2. In "Registration preferences":
   - Seleziona "Invite only" (sicurezza)
3. In "External providers":
   - Abilita "GitHub" (opzionale ma consigliato)
4. Salva modifiche

### 3.3 Abilita Git Gateway

1. Sempre in "Identity" → "Settings and usage"
2. Scorri fino a "Services"
3. Trova "Git Gateway"
4. Clicca "Enable Git Gateway"
5. Conferma

### 3.4 Invita Te Stesso

1. Torna su "Identity" tab principale
2. Clicca "Invite users"
3. Inserisci la TUA email
4. Clicca "Send"
5. Controlla la tua casella email

### 3.5 Completa Registrazione

1. Apri l'email di invito da Netlify
2. Clicca "Accept the invite"
3. Verrai reindirizzato al sito
4. Crea una password sicura
5. Conferma

## 🎨 Step 4: Testa il Pannello Admin

### 4.1 Accedi al CMS

1. Vai su `https://tuo-sito.netlify.app/admin`
2. Fai login con email e password
3. Dovresti vedere "Birre" nella sidebar

### 4.2 Aggiungi una Birra di Test

1. Clicca "New Birre"
2. Compila:
   - Nome: "Birra Test"
   - Descrizione: "Questa è una prova"
   - Prezzo: 5.00
   - Categoria: "Chiara"
   - Disponibile: ✓
   - Ordine: 99
3. Clicca "Publish"
4. Attendi 30-60 secondi
5. Vai sulla homepage del sito
6. Ricarica → Dovresti vedere la nuova birra!

### 4.3 Carica un'Immagine

1. Modifica la "Birra Test"
2. Nel campo "Immagine", clicca o trascina una foto
3. Attendi upload
4. Clicca "Publish"
5. Verifica sul sito

## ✅ Step 5: Personalizzazione

### 5.1 Cambia Nome Sito

1. Nel dashboard Netlify, vai su "Site settings"
2. Clicca "Change site name"
3. Inserisci nome personalizzato (es. `ristorante-mario-birre`)
4. Salva
5. Ora il sito è su `ristorante-mario-birre.netlify.app`

### 5.2 Aggiungi Dominio Personalizzato (Opzionale)

1. Vai su "Domain settings"
2. Clicca "Add custom domain"
3. Inserisci il tuo dominio (es. `www.ristorantemario.it`)
4. Segui le istruzioni per configurare DNS
5. Netlify fornisce SSL gratuito automaticamente

### 5.3 Personalizza Contenuti

1. Modifica titolo in `index.html`
2. Cambia colori in `css/style.css`
3. Commit e push su GitHub
4. Netlify rebuilda automaticamente

## 🔄 Step 6: Workflow Quotidiano

### Per il Ristoratore

1. Vai su `tuosito.netlify.app/admin`
2. Login
3. Gestisci birre
4. Logout

### Per Modifiche al Codice

1. Modifica file localmente
2. Commit su GitHub
3. Netlify rebuilda automaticamente
4. Sito aggiornato in 1-2 minuti

## 🐛 Troubleshooting

### Il sito non si carica

**Problema**: Errore 404 o pagina bianca

**Soluzione**:
1. Verifica che il deploy sia completato (Netlify dashboard)
2. Controlla i log di build per errori
3. Verifica che `index.html` sia nella root

### Non riesco ad accedere a /admin

**Problema**: Errore "Unable to load config"

**Soluzione**:
1. Verifica che `admin/config.yml` esista
2. Controlla che Identity sia abilitato
3. Verifica che Git Gateway sia attivo
4. Svuota cache browser (Ctrl+Shift+Del)

### Le modifiche non si vedono

**Problema**: Modifico dal CMS ma il sito non cambia

**Soluzione**:
1. Attendi 1-2 minuti (tempo di build)
2. Controlla deploy in corso su Netlify
3. Svuota cache browser (Ctrl+F5)
4. Verifica che il commit sia su GitHub

### Le immagini non si caricano

**Problema**: Immagini rotte o non visibili

**Soluzione**:
1. Verifica che la cartella `images/beers` esista
2. Controlla che `media_folder` in `config.yml` sia corretto
3. Ricarica l'immagine dal CMS
4. Verifica dimensione file (< 5MB)

### Build fallisce

**Problema**: Deploy failed su Netlify

**Soluzione**:
1. Leggi i log di build
2. Verifica che `package.json` sia corretto
3. Controlla che `scripts/generate-json.js` esista
4. Prova a fare un nuovo deploy manualmente

## 📊 Monitoring

### Verifica Deploy

1. Dashboard Netlify → "Deploys"
2. Vedi storia di tutti i deploy
3. Clicca su uno per vedere log dettagliati

### Rollback

Se qualcosa va storto:
1. Vai su "Deploys"
2. Trova un deploy funzionante
3. Clicca "Publish deploy"
4. Il sito torna alla versione precedente

## 🎓 Prossimi Passi

1. ✅ Elimina le birre di esempio
2. ✅ Aggiungi le tue birre reali
3. ✅ Carica foto di qualità
4. ✅ Personalizza colori e testi
5. ✅ Condividi il link con i clienti
6. ✅ Forma il personale sull'uso del CMS

## 📞 Supporto

- **Netlify Status**: [status.netlify.com](https://status.netlify.com)
- **Netlify Support**: [answers.netlify.com](https://answers.netlify.com)
- **GitHub Support**: [support.github.com](https://support.github.com)

## 🎉 Congratulazioni!

Il tuo sito è online e funzionante! Ora puoi gestire il menù birre in totale autonomia, senza costi e senza complicazioni.
