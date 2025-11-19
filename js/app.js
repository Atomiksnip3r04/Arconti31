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
    
    // Sezioni Food (NUOVO)
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
        
        // Aggiungi header per il cibo se ci sono elementi
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

    // Sezioni Menù Beverage (Header)
    if ((beersData && beersData.beersBySection) || (beveragesData && beveragesData.beveragesByType)) {
        html += '<h2 class="section-header">Beverage</h2><div class="categories-grid">';
        
        // Sezioni birre
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
        
        // Categorie bevande
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
            <span class="category-icon">${icon}</span>
            <div class="category-title">${name}</div>
            <div class="category-count">${count} prodotti</div>
        </div>
    `;
}

function showCategory(categoryName, type) {
    currentView = 'detail';
    document.getElementById('breadcrumb').style.display = 'flex'; // Changed to flex for alignment
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
    let tags = [];
    if (item.tags) {
        if (Array.isArray(item.tags)) {
            tags = item.tags.filter(t => t && t !== 'Nessuno');
        } else if (typeof item.tags === 'string') {
            tags = [item.tags].filter(t => t && t !== 'Nessuno');
        }
    }
    
    const hasFullImage = item.immagine && !item.logo;
    const hasLogo = item.logo;
    
    const imageHtml = hasFullImage 
        ? `<img src="${item.immagine}" alt="${item.nome}" class="beer-image" loading="lazy">`
        : `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#333; font-size:3rem;">🍽️</div>`;
    
    const logoHtml = hasLogo 
        ? `<img src="${item.logo}" alt="${item.nome}" class="beer-logo">`
        : '';
    
    const categoryLabel = type === 'beer' ? item.categoria : (type === 'food' ? item.category : item.tipo);
    
    return `
        <div class="beer-card" data-category="${item.categoria || item.category || ''}" data-type="${type}" style="animation-delay: ${(index % 10) * 0.1}s" onclick="openModal(${index}, '${type}', '${item.nome.replace(/'/g, "\\'")}')">
            <div class="card-image-container">
                ${imageHtml}
            </div>
            <div class="beer-content">
                <div class="card-header">
                    <h3 class="beer-name">${item.nome}</h3>
                    ${logoHtml}
                </div>
                ${categoryLabel ? `<span class="beer-category-badge">${categoryLabel}</span>` : ''}
                <p class="beer-description">${item.descrizione || ''}</p>
                <div class="card-footer">
                    <div class="availability ${item.disponibile ? 'available' : 'unavailable'}">
                        ${item.disponibile ? 'Disponibile' : 'Esaurito'}
                    </div>
                    <span class="beer-price">€${item.prezzo}</span>
                </div>
            </div>
        </div>
    `;
}

function openModal(index, type, itemName) {
    let items = [];
    
    // Trova gli items della categoria corrente (globale per semplicità)
    if (type === 'beer' && beersData && beersData.beersBySection) {
        Object.values(beersData.beersBySection).forEach(sectionItems => { items = items.concat(sectionItems); });
    } else if (type === 'beverage' && beveragesData && beveragesData.beveragesByType) {
        Object.values(beveragesData.beveragesByType).forEach(typeItems => { items = items.concat(typeItems); });
    } else if (type === 'food' && foodData && foodData.foodByCategory) {
        Object.values(foodData.foodByCategory).forEach(catItems => { items = items.concat(catItems); });
    }
    
    const item = items.find(i => i.nome === itemName.replace(/\\'/g, "'"));
    if (!item) return;
    
    const modal = document.getElementById('beer-modal');
    const modalBody = document.getElementById('modal-body');
    
    // Gestione Tags
    let tags = [];
    if (item.tags) {
        if (Array.isArray(item.tags)) tags = item.tags.filter(t => t && t !== 'Nessuno');
        else if (typeof item.tags === 'string') tags = [item.tags].filter(t => t && t !== 'Nessuno');
    }
    
    const tagsHtml = tags.length > 0
        ? `<div class="modal-tags">
            ${tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
           </div>`
        : '';
    
    // Gestione Allergeni
    let allergeni = [];
    if (item.allergeni) {
        if (Array.isArray(item.allergeni)) allergeni = item.allergeni.filter(a => a);
        else if (typeof item.allergeni === 'string') allergeni = [item.allergeni].filter(a => a);
    }
    
    const allergeniHtml = allergeni.length > 0
        ? `<div class="modal-tags" style="margin-top:20px; border-top:1px solid #333; padding-top:10px;">
            <strong style="color:#888; font-size:0.8rem; display:block; margin-bottom:5px;">ALLERGENI:</strong>
            ${allergeni.map(a => `<span class="tag-pill" style="border-color:#ef4444; color:#ef4444;">${a}</span>`).join('')}
           </div>`
        : '';
    
    const imageHtml = item.immagine ? `<img src="${item.immagine}" alt="${item.nome}" class="modal-hero-img">` : '';
    const categoryLabel = item.categoria || item.category || item.tipo || '';
    
    modalBody.innerHTML = `
        ${imageHtml}
        <div class="modal-body">
            <div class="modal-title-group">
                <span class="beer-category-badge">${categoryLabel}</span>
                <h2 class="modal-title">${item.nome}</h2>
                <div class="modal-price-tag">€${item.prezzo}</div>
            </div>
            
            ${tagsHtml}
            
            <div class="modal-desc">${item.descrizione_dettagliata || item.descrizione || 'Nessuna descrizione disponibile.'}</div>
            
            ${allergeniHtml}
            
            <div style="margin-top: 20px; text-align:center;">
                <button onclick="closeModal()" class="btn-icon" style="width:100%; justify-content:center; background:var(--accent); color:black; border:none; font-weight:700;">CHIUDI</button>
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
        if (document.getElementById('beer-modal').classList.contains('active')) {
            closeModal();
        } else if (currentView === 'detail') {
            goHome();
        }
    }
});

function toggleCompactView() {
    const grid = document.querySelector('.beer-grid');
    const toggleBtn = document.getElementById('toggle-view-btn');
    const toggleText = toggleBtn.querySelector('.toggle-text');
    
    if (grid.classList.contains('compact-view')) {
        grid.classList.remove('compact-view');
        toggleText.textContent = 'Lista';
    } else {
        grid.classList.add('compact-view');
        toggleText.textContent = 'Griglia';
    }
}

document.addEventListener('DOMContentLoaded', loadAllBeverages);
