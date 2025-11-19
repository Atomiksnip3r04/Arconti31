// Icon mapping per Tags e Allergeni
const ICONS = {
    tags: {
        'Novità': '✨',
        'Senza Glutine': '🌾🚫',
        'Vegetariano': '🌿',
        'Vegano': '🌱',
        'Piccante': '🌶️',
        'Specialità': '⭐',
        'Biologico': 'bio',
        'default': '🏷️'
    },
    allergeni: {
        'Glutine': '🌾',
        'Lattosio': '🥛',
        'Uova': '🥚',
        'Frutta a Guscio': '🥜',
        'Pesce': '🐟',
        'Soia': '🫘',
        'Senza Glutine': '✅', // Caso speciale
        'Solfiti': '🍷',
        'Sedano': '🥬',
        'default': '⚠️'
    }
};

let beersData = null;
let beveragesData = null;
let foodData = null;
let currentView = 'home';

// Carica tutte le bevande e il cibo
async function loadAllBeverages() {
    try {
        const [beersResponse, beveragesResponse, foodResponse] = await Promise.all([
            fetch('beers/beers.json'),
            fetch('beverages/beverages.json').catch(() => ({ json: async () => ({ beverages: [], beveragesByType: {} }) })),
            fetch('food/food.json').catch(() => ({ json: async () => ({ food: [], foodByCategory: {} }) }))
        ]);
        
        beersData = await beersResponse.json();
        beveragesData = await beveragesResponse.json();
        foodData = await foodResponse.json();
        
        showCategoriesView();
    } catch (error) {
        console.error('Errore nel caricamento:', error);
        document.getElementById('categories-view').innerHTML = 
            '<p class="loading">Errore nel caricamento. Riprova più tardi.</p>';
    }
}

function showCategoriesView() {
    currentView = 'home';
    document.getElementById('breadcrumb').style.display = 'none';
    document.getElementById('categories-view').style.display = 'block';
    document.getElementById('detail-view').style.display = 'none';
    
    const categoriesView = document.getElementById('categories-view');
    let html = '';
    
    // Sezioni Food
    if (foodData && foodData.foodByCategory) {
        const foodOrder = [
            { name: 'Hamburger di bufala', icon: '🍔' },
            { name: 'Hamburger Fassona e Street food', icon: '🥩' },
            { name: 'OKTOBERFEST', icon: '🥨' },
            { name: 'Panini', icon: '🥪' },
            { name: 'Griglieria', icon: '🔥' },
            { name: 'Piatti Speciali', icon: '🍽️' },
            { name: 'Piadine', icon: '🥯' },
            { name: 'Fritti', icon: '🍟' },
            { name: 'Dolci', icon: '🍰' },
            { name: 'Aperitivo', icon: '🥜' }
        ];
        
        const hasFood = foodOrder.some(cat => foodData.foodByCategory[cat.name]);
        if (hasFood) {
            html += '<h2 class="section-header">Cucina</h2><div class="categories-grid">';
            foodOrder.forEach(cat => {
                const items = foodData.foodByCategory[cat.name];
                if (items && items.length > 0) {
                    html += createCategoryCard(cat.name, items.length, cat.icon, 'food');
                }
            });
            html += '</div>';
        }
    }

    // Sezioni Beverage
    if ((beersData && beersData.beersBySection) || (beveragesData && beveragesData.beveragesByType)) {
        html += '<h2 class="section-header">Beverage</h2><div class="categories-grid">';
        
        if (beersData && beersData.beersBySection) {
            const sectionOrder = [
                { name: 'Birre artigianali alla spina a rotazione', icon: '🍺' },
                { name: 'Birre alla spina', icon: '🍻' },
                { name: 'Birre speciali in bottiglia', icon: '🍾' },
                { name: 'Frigo Birre', icon: '❄️' }
            ];
            
            sectionOrder.forEach(section => {
                const items = beersData.beersBySection[section.name];
                if (items && items.length > 0) {
                    html += createCategoryCard(section.name, items.length, section.icon, 'beer');
                }
            });
        }
        
        if (beveragesData && beveragesData.beveragesByType) {
            const typeOrder = [
                { name: 'Cocktails', icon: '🍹' },
                { name: 'Analcolici', icon: '🥤' },
                { name: 'Bibite', icon: '🥫' },
                { name: 'Caffetteria', icon: '☕' },
                { name: 'Bollicine', icon: '🥂' },
                { name: 'Bianchi fermi', icon: '🍷' },
                { name: 'Vini rossi', icon: '🍷' }
            ];
            
            typeOrder.forEach(type => {
                const items = beveragesData.beveragesByType[type.name];
                if (items && items.length > 0) {
                    html += createCategoryCard(type.name, items.length, type.icon, 'beverage');
                }
            });
        }
        html += '</div>';
    }
    
    categoriesView.innerHTML = html || '<p class="loading">Nessuna categoria disponibile.</p>';
}

function createCategoryCard(name, count, icon, type) {
    return `
        <div class="category-card" onclick="showCategory('${name}', '${type}')">
            <div class="category-icon-wrapper">${icon}</div>
            <div class="category-info">
                <div class="category-title">${name}</div>
                <div class="category-count">${count} prodotti</div>
            </div>
            <div class="category-arrow">→</div>
        </div>
    `;
}

function showCategory(categoryName, type) {
    currentView = 'detail';
    document.getElementById('breadcrumb').style.display = 'flex';
    document.getElementById('categories-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'block';
    
    const detailContent = document.getElementById('detail-content');
    let items = [];
    
    if (type === 'beer' && beersData && beersData.beersBySection) {
        items = beersData.beersBySection[categoryName] || [];
    } else if (type === 'beverage' && beveragesData && beveragesData.beveragesByType) {
        items = beveragesData.beveragesByType[categoryName] || [];
    } else if (type === 'food' && foodData && foodData.foodByCategory) {
        items = foodData.foodByCategory[categoryName] || [];
    }
    
    let html = `
        <h2 class="section-title">${categoryName}</h2>
        <div class="beer-grid">
            ${items.map((item, index) => renderCard(item, index, type)).join('')}
        </div>
    `;
    
    detailContent.innerHTML = html;
    window.scrollTo(0, 0);
}

function goHome() {
    showCategoriesView();
    window.scrollTo(0, 0);
}

function renderCard(item, index, type) {
    const hasFullImage = item.immagine && !item.logo;
    const hasLogo = item.logo;
    const hasAnyImage = item.immagine || false;
    
    // Se non c'è immagine copertina, NON renderizzare placeholder
    const imageHtml = hasAnyImage 
        ? `<div class="card-image-container"><img src="${item.immagine}" alt="${item.nome}" class="beer-image" loading="lazy"></div>`
        : ''; // Stringa vuota se non c'è immagine
    
    // Classe speciale se non c'è immagine per adattare layout CSS
    const noImageClass = !hasAnyImage ? 'no-image-card' : '';
    
    const logoHtml = hasLogo 
        ? `<img src="${item.logo}" alt="${item.nome}" class="beer-logo">`
        : '';
    
    const categoryLabel = type === 'beer' ? item.categoria : (type === 'food' ? item.category : item.tipo);
    
    // Generazione Badges (Tags) con icone
    let tagsHtml = '';
    if (item.tags) {
        let tagsList = Array.isArray(item.tags) ? item.tags : [item.tags];
        tagsList = tagsList.filter(t => t && t !== 'Nessuno');
        if (tagsList.length > 0) {
            tagsHtml = `<div class="card-badges">
                ${tagsList.map(tag => {
                    const icon = ICONS.tags[tag] || ICONS.tags['default'];
                    // Rimuoviamo "Novità" se presente in favore dell'icona
                    const label = tag === 'Novità' ? 'Novità' : tag;
                    const className = tag.toLowerCase().replace(/\s+/g, '-');
                    return `<span class="badge badge-${className}">${icon} ${label}</span>`;
                }).join('')}
            </div>`;
        }
    }

    // Descrizione troncata
    const description = item.descrizione ? `<p class="beer-description">${item.descrizione}</p>` : '';
    
    return `
        <div class="beer-card ${noImageClass}" style="animation-delay: ${(index % 10) * 0.05}s" onclick="openModal(${index}, '${type}', '${item.nome.replace(/'/g, "\\'")}')">
            ${imageHtml}
            <div class="beer-content">
                <div class="card-header">
                    <div class="header-left">
                        ${logoHtml}
                        <div class="title-group">
                            ${categoryLabel ? `<span class="tiny-category">${categoryLabel}</span>` : ''}
                            <h3 class="beer-name">${item.nome}</h3>
                        </div>
                    </div>
                    <div class="price-tag">€${item.prezzo}</div>
                </div>
                
                ${description}
                
                <div class="card-footer">
                     ${tagsHtml}
                    <div class="availability-dot ${item.disponibile ? 'available' : 'unavailable'}" title="${item.disponibile ? 'Disponibile' : 'Non disponibile'}"></div>
                </div>
            </div>
        </div>
    `;
}

function openModal(index, type, itemName) {
    let items = [];
    if (type === 'beer' && beersData) {
        Object.values(beersData.beersBySection).forEach(l => items = items.concat(l));
    } else if (type === 'beverage' && beveragesData) {
        Object.values(beveragesData.beveragesByType).forEach(l => items = items.concat(l));
    } else if (type === 'food' && foodData) {
        Object.values(foodData.foodByCategory).forEach(l => items = items.concat(l));
    }
    
    const item = items.find(i => i.nome === itemName.replace(/\\'/g, "'"));
    if (!item) return;
    
    const modal = document.getElementById('beer-modal');
    const modalBody = document.getElementById('modal-body');
    
    const imageHtml = item.immagine ? `<div class="modal-hero-wrapper"><img src="${item.immagine}" class="modal-hero-img"></div>` : '';
    
    // Tags Completi
    let tagsHtml = '';
    if (item.tags) {
        let tagsList = Array.isArray(item.tags) ? item.tags : [item.tags];
        tagsList = tagsList.filter(t => t && t !== 'Nessuno');
        if(tagsList.length > 0) {
             tagsHtml = `<div class="modal-tags-list">
                ${tagsList.map(tag => {
                    const icon = ICONS.tags[tag] || ICONS.tags['default'];
                    return `<span class="modal-tag">${icon} ${tag}</span>`;
                }).join('')}
             </div>`;
        }
    }

    // Allergeni con Icone
    let allergeniHtml = '';
    if (item.allergeni) {
        let allList = Array.isArray(item.allergeni) ? item.allergeni : [item.allergeni];
        allList = allList.filter(a => a);
        if(allList.length > 0) {
            allergeniHtml = `
            <div class="modal-allergens-section">
                <h4>Allergeni</h4>
                <div class="allergens-grid">
                    ${allList.map(a => {
                        const icon = ICONS.allergeni[a] || ICONS.allergeni['default'];
                        return `<div class="allergen-item"><span class="allergen-icon">${icon}</span> ${a}</div>`;
                    }).join('')}
                </div>
            </div>`;
        }
    }
    
    modalBody.innerHTML = `
        ${imageHtml}
        <div class="modal-content-scroll">
            <div class="modal-header-row">
                <h2 class="modal-title">${item.nome}</h2>
                <span class="modal-price-big">€${item.prezzo}</span>
            </div>
            ${item.logo ? `<img src="${item.logo}" class="modal-logo-small" alt="Logo">` : ''}
            
            <div class="modal-desc-text">
                ${item.descrizione_dettagliata || item.descrizione || 'Nessuna descrizione aggiuntiva.'}
            </div>
            
            ${tagsHtml}
            
            <div class="modal-meta-info">
                ${item.gradazione ? `<div class="meta-box"><strong>Alcol</strong> ${item.gradazione}</div>` : ''}
                ${item.formato ? `<div class="meta-box"><strong>Formato</strong> ${item.formato}</div>` : ''}
            </div>

            ${allergeniHtml}
        </div>
        <div class="modal-close-btn-wrapper">
            <button onclick="closeModal()" class="modal-close-action">Chiudi</button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('beer-modal').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('beer-modal').addEventListener('click', (e) => {
    if (e.target.id === 'beer-modal') closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

function toggleCompactView() {
    const grid = document.querySelector('.beer-grid');
    const toggleText = document.querySelector('.toggle-text');
    grid.classList.toggle('compact-view');
    toggleText.textContent = grid.classList.contains('compact-view') ? 'Lista' : 'Griglia';
}

document.addEventListener('DOMContentLoaded', loadAllBeverages);
