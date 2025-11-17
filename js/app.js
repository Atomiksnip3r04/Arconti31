let allItems = [];
let currentFilter = 'all';

// Carica tutte le bevande
async function loadAllBeverages() {
    try {
        const [beersResponse, beveragesResponse] = await Promise.all([
            fetch('beers/beers.json'),
            fetch('beverages/beverages.json').catch(() => ({ json: async () => ({ beverages: [], beveragesByType: {} }) }))
        ]);
        
        const beersData = await beersResponse.json();
        const beveragesData = await beveragesResponse.json();
        
        allItems = [...(beersData.beers || []), ...(beveragesData.beverages || [])];
        
        displayContent(beersData, beveragesData);
        setupFilters();
    } catch (error) {
        console.error('Errore nel caricamento:', error);
        document.getElementById('content').innerHTML = 
            '<p class="loading">Errore nel caricamento. Riprova più tardi.</p>';
    }
}

function displayContent(beersData, beveragesData) {
    const content = document.getElementById('content');
    let html = '';
    
    // Mostra sezioni birre
    if (beersData.beersBySection) {
        const sectionOrder = [
            'Birre artigianali alla spina a rotazione',
            'Birre alla spina',
            'Birre speciali in bottiglia',
            'Frigo Birre'
        ];
        
        sectionOrder.forEach(sectionName => {
            const items = beersData.beersBySection[sectionName];
            if (items && items.length > 0) {
                html += `
                    <h2 class="section-title">${sectionName}</h2>
                    <div class="beer-grid">
                        ${items.map((item, index) => renderCard(item, index, 'beer')).join('')}
                    </div>
                `;
            }
        });
    }
    
    // Mostra altre bevande
    if (beveragesData.beveragesByType) {
        const typeOrder = ['Cocktails', 'Analcolici', 'Bibite', 'Caffetteria', 'Bollicine', 'Bianchi fermi', 'Vini rossi'];
        
        typeOrder.forEach(typeName => {
            const items = beveragesData.beveragesByType[typeName];
            if (items && items.length > 0) {
                html += `
                    <h2 class="section-title">${typeName}</h2>
                    <div class="beer-grid">
                        ${items.map((item, index) => renderCard(item, index + 1000, 'beverage')).join('')}
                    </div>
                `;
            }
        });
    }
    
    content.innerHTML = html || '<p class="loading">Nessun contenuto disponibile.</p>';
}

function renderCard(item, index, type) {
    let tags = [];
    if (item.tags) {
        if (Array.isArray(item.tags)) {
            tags = item.tags.filter(t => t && t !== 'Nessuno');
        } else if (typeof item.tags === 'string') {
            tags = [item.tags].filter(t => t && t !== 'Nessuno');
        }
    }
    
    const tagsHtml = tags.length > 0
        ? `<div class="beer-tags">
            ${tags.map(tag => {
                const tagClass = tag.toLowerCase().replace(/\s+/g, '-');
                return `<span class="beer-tag ${tagClass}">${tag}</span>`;
            }).join('')}
           </div>`
        : '';
    
    const hasFullImage = item.immagine && !item.logo;
    const hasLogo = item.logo;
    const cardClass = hasLogo && !hasFullImage ? 'logo-only' : '';
    
    const imageHtml = hasFullImage 
        ? `<img src="${item.immagine}" alt="${item.nome}" class="beer-image" loading="lazy">`
        : '';
    
    const logoHtml = hasLogo 
        ? `<img src="${item.logo}" alt="${item.nome}" class="beer-logo">`
        : '';
    
    const categoryLabel = type === 'beer' ? item.categoria : item.tipo;
    
    return `
        <div class="beer-card ${cardClass}" data-category="${item.categoria || ''}" data-type="${type}" data-index="${index}" style="animation-delay: ${(index % 10) * 0.1}s" onclick="openModal(${index}, '${type}')">
            ${imageHtml}
            <div class="beer-content">
                <div class="beer-header">
                    <div class="beer-name-wrapper">
                        ${logoHtml}
                        <h2 class="beer-name">${item.nome}</h2>
                    </div>
                    <span class="beer-price">€${item.prezzo}</span>
                </div>
                ${categoryLabel ? `<span class="beer-category">${categoryLabel}</span>` : ''}
                ${tagsHtml}
                <p class="beer-description">${item.descrizione}</p>
                <div class="availability ${item.disponibile ? 'available' : 'unavailable'}">
                    ${item.disponibile ? 'Disponibile' : 'Non disponibile'}
                </div>
            </div>
        </div>
    `;
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            currentFilter = filter;
            const cards = document.querySelectorAll('.beer-card');
            
            cards.forEach(card => {
                const category = card.dataset.category?.toLowerCase() || '';
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

function openModal(index, type) {
    const item = allItems.find((it, idx) => {
        if (type === 'beer' && idx < 1000) return idx === index;
        if (type === 'beverage' && idx >= 1000) return idx === index;
        return false;
    }) || allItems[index];
    
    if (!item) return;
    
    const modal = document.getElementById('beer-modal');
    const modalBody = document.getElementById('modal-body');
    
    let tags = [];
    if (item.tags) {
        if (Array.isArray(item.tags)) {
            tags = item.tags.filter(t => t && t !== 'Nessuno');
        } else if (typeof item.tags === 'string') {
            tags = [item.tags].filter(t => t && t !== 'Nessuno');
        }
    }
    
    const tagsHtml = tags.length > 0
        ? `<div class="beer-tags">
            ${tags.map(tag => {
                const tagClass = tag.toLowerCase().replace(/\s+/g, '-');
                return `<span class="beer-tag ${tagClass}">${tag}</span>`;
            }).join('')}
           </div>`
        : '';
    
    let allergeni = [];
    if (item.allergeni) {
        if (Array.isArray(item.allergeni)) {
            allergeni = item.allergeni.filter(a => a);
        } else if (typeof item.allergeni === 'string') {
            allergeni = [item.allergeni].filter(a => a);
        }
    }
    
    const allergeniHtml = allergeni.length > 0
        ? `<div class="modal-section">
            <div class="modal-section-title">Allergeni</div>
            <div class="modal-allergens">
                ${allergeni.map(allergene => 
                    `<span class="allergen-badge">${allergene}</span>`
                ).join('')}
            </div>
           </div>`
        : '';
    
    const metaItems = [];
    if (item.gradazione) {
        metaItems.push(`<div class="modal-meta-item"><strong>Gradazione:</strong> ${item.gradazione}</div>`);
    }
    if (item.formato) {
        metaItems.push(`<div class="modal-meta-item"><strong>Formato:</strong> ${item.formato}</div>`);
    }
    
    const metaHtml = metaItems.length > 0 
        ? `<div class="modal-meta">${metaItems.join('')}</div>`
        : '';
    
    const descrizioneCompleta = item.descrizione_dettagliata || item.descrizione;
    const logoHtml = item.logo ? `<img src="${item.logo}" alt="${item.nome}" class="modal-logo">` : '';
    const categoryLabel = item.categoria || item.tipo || '';
    
    modalBody.innerHTML = `
        ${item.immagine ? `<img src="${item.immagine}" alt="${item.nome}" class="modal-image">` : ''}
        <div class="modal-body">
            <div class="modal-header">
                <div class="modal-title-wrapper">
                    ${logoHtml}
                    <h2 class="modal-title">${item.nome}</h2>
                </div>
                <span class="modal-price">€${item.prezzo}</span>
            </div>
            ${categoryLabel ? `<span class="beer-category">${categoryLabel}</span>` : ''}
            ${tagsHtml}
            ${metaHtml}
            <div class="modal-description">${descrizioneCompleta}</div>
            ${allergeniHtml}
            <div class="availability ${item.disponibile ? 'available' : 'unavailable'}">
                ${item.disponibile ? '✓ Disponibile' : '✗ Non disponibile'}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('beer-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('beer-modal').addEventListener('click', (e) => {
    if (e.target.id === 'beer-modal') {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', loadAllBeverages);
