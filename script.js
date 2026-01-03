
// 1. LOGIN SYSTEM

// Check password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// Login form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Check if correct
        if (username === 'admin' && password === 'admin123') {
            sessionStorage.setItem('artisan_logged_in', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Nom d\'utilisateur ou mot de passe incorrect');
        }
    });
}

// Logout
document.addEventListener('click', function (e) {
    if (e.target.closest('.nav-link')?.textContent.includes('Déconnexion')) {
        e.preventDefault();
        sessionStorage.removeItem('artisan_logged_in');
        window.location.href = 'login.html';
    }
});


// 2. SHOW SUCCESS MESSAGE

function showMessage(text) {
    alert(text);
}


// 3. SIDEBAR NAVIGATION
const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active to clicked link
        this.classList.add('active');
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show clicked section
        const sectionName = this.dataset.section + '-section';
        document.getElementById(sectionName).classList.add('active');
        
        // Update title
        const titles = {
            'overview': 'Tableau de Bord',
            'products': 'Gestion des Produits',
            'clients': 'Gestion des Clients',
            'stock': 'Gestion du Stock',
            'orders': 'Gestion des Commandes',
            'invoices': 'Gestion des Factures'
        };
        document.getElementById('page-title').textContent = titles[this.dataset.section];
    });
});


// 4. MODAL-POPUP

const modal = document.getElementById('crud-modal');
let editingRow = null; // Remember which row we're editing

// Open popup
function openModal(type, data = null) {
    // Set title
    const titles = {
        'product': data ? 'Modifier le Produit' : 'Ajouter un Produit',
        'client': data ? 'Modifier le Client' : 'Ajouter un Client',
        'stock': data ? 'Modifier le Stock' : 'Ajouter un Stock',
        'order': data ? 'Modifier la Commande' : 'Nouvelle Commande',
        'invoice': data ? 'Modifier la Facture' : 'Créer une Facture'
    };
    
    document.getElementById('modal-title').textContent = titles[type];
    
    // Set form-with data if editing
    document.getElementById('modal-body').innerHTML = getForm(type, data);
    
    // Show modal
    modal.classList.add('active');
    
    // When submit form
    document.querySelector('#modal-body form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (editingRow) {
            // Update existing row
            updateRow(type, editingRow, new FormData(this));
        } else {
            // Add new row
            addNewRow(type, new FormData(this));
        }
    });
}

// Close popup
function closeModal() {
    modal.classList.remove('active');
    editingRow = null; // Reset editing row
}

// Click outside to close
modal?.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});


// 5. FORMS FOR EACH TYPE

function getForm(type, data = null) {
    
    // Get existing data or empty
    const d = data || {};
    
    if (type === 'product') {
        return `
            <form>
                <div class="form-group">
                    <label>Nom du produit *</label>
                    <input type="text" name="name" value="${d.name || ''}" required>
                </div>
                <div class="form-group">
                    <label>Catégorie *</label>
                    <select name="category" required>
                        <option value="">Sélectionner</option>
                        <option value="Céramique" ${d.category === 'Céramique' ? 'selected' : ''}>Céramique</option>
                        <option value="Bijoux" ${d.category === 'Bijoux' ? 'selected' : ''}>Bijoux</option>
                        <option value="Maroquinerie" ${d.category === 'Maroquinerie' ? 'selected' : ''}>Maroquinerie</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Prix (DH) *</label>
                    <input type="number" name="price" value="${d.price || ''}" required>
                </div>
                <div class="form-group">
                    <label>Stock *</label>
                    <input type="number" name="stock" value="${d.stock || ''}" required>
                </div>
                <div class="form-group">
                    <label>Artisan *</label>
                    <input type="text" name="artisan" value="${d.artisan || ''}" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Annuler</button>
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                </div>
            </form>
        `;
    }
    
    if (type === 'client') {
        return `
            <form>
                <div class="form-group">
                    <label>Nom complet *</label>
                    <input type="text" name="name" value="${d.name || ''}" required>
                </div>
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" value="${d.email || ''}" required>
                </div>
                <div class="form-group">
                    <label>Téléphone *</label>
                    <input type="tel" name="phone" value="${d.phone || ''}" required>
                </div>
                <div class="form-group">
                    <label>Ville *</label>
                    <select name="city" required>
                        <option value="">Sélectionner</option>
                        <option value="Casablanca" ${d.city === 'Casablanca' ? 'selected' : ''}>Casablanca</option>
                        <option value="Rabat" ${d.city === 'Rabat' ? 'selected' : ''}>Rabat</option>
                        <option value="Marrakech" ${d.city === 'Marrakech' ? 'selected' : ''}>Marrakech</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Annuler</button>
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                </div>
            </form>
        `;
    }
    
    if (type === 'stock') {
        return `
            <form>
                <div class="form-group">
                    <label>Nom du produit *</label>
                    <input type="text" name="product" value="${d.product || ''}" required>
                </div>
                <div class="form-group">
                    <label>Quantité *</label>
                    <input type="number" name="quantity" value="${d.quantity || ''}" required>
                </div>
                <div class="form-group">
                    <label>Seuil Minimum *</label>
                    <input type="number" name="min_threshold" value="${d.min_threshold || ''}" required>
                </div>
                <div class="form-group">
                    <label>Emplacement *</label>
                    <input type="text" name="location" value="${d.location || ''}" placeholder="Ex: A-12-03" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Annuler</button>
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                </div>
            </form>
        `;
    }
    
    if (type === 'order') {
        return `
            <form>
                <div class="form-group">
                    <label>Client *</label>
                    <input type="text" name="client" value="${d.client || ''}" required>
                </div>
                <div class="form-group">
                    <label>Date *</label>
                    <input type="date" name="order_date" value="${d.order_date || ''}" required>
                </div>
                <div class="form-group">
                    <label>Nombre d'articles *</label>
                    <input type="number" name="items" value="${d.items || ''}" required>
                </div>
                <div class="form-group">
                    <label>Montant (DH) *</label>
                    <input type="number" name="amount" value="${d.amount || ''}" required>
                </div>
                <div class="form-group">
                    <label>Statut *</label>
                    <select name="status" required>
                        <option value="Préparation" ${d.status === 'Préparation' ? 'selected' : ''}>Préparation</option>
                        <option value="En cours" ${d.status === 'En cours' ? 'selected' : ''}>En cours</option>
                        <option value="Livrée" ${d.status === 'Livrée' ? 'selected' : ''}>Livrée</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Paiement *</label>
                    <select name="payment_status" required>
                        <option value="En attente" ${d.payment_status === 'En attente' ? 'selected' : ''}>En attente</option>
                        <option value="Payé" ${d.payment_status === 'Payé' ? 'selected' : ''}>Payé</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Annuler</button>
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                </div>
            </form>
        `;
    }
    
    if (type === 'invoice') {
        return `
            <form>
                <div class="form-group">
                    <label>N° Commande *</label>
                    <input type="text" name="order_num" value="${d.order_num || ''}" required>
                </div>
                <div class="form-group">
                    <label>Client *</label>
                    <input type="text" name="client" value="${d.client || ''}" required>
                </div>
                <div class="form-group">
                    <label>Date émission *</label>
                    <input type="date" name="issue_date" value="${d.issue_date || ''}" required>
                </div>
                <div class="form-group">
                    <label>Date échéance *</label>
                    <input type="date" name="due_date" value="${d.due_date || ''}" required>
                </div>
                <div class="form-group">
                    <label>Montant HT (DH) *</label>
                    <input type="number" name="amount_ht" value="${d.amount_ht || ''}" required>
                </div>
                <div class="form-group">
                    <label>Montant TTC (DH) *</label>
                    <input type="number" name="amount_ttc" value="${d.amount_ttc || ''}" required>
                </div>
                <div class="form-group">
                    <label>Statut *</label>
                    <select name="status" required>
                        <option value="En attente" ${d.status === 'En attente' ? 'selected' : ''}>En attente</option>
                        <option value="Payée" ${d.status === 'Payée' ? 'selected' : ''}>Payée</option>
                        <option value="En retard" ${d.status === 'En retard' ? 'selected' : ''}>En retard</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Annuler</button>
                    <button type="submit" class="btn btn-primary">Créer</button>
                </div>
            </form>
        `;
    }
}


// 6.5 UPDATE EXISTING ROW

function updateRow(type, row, formData) {
    const cells = row.querySelectorAll('td');
    
    // UPDATE PRODUCT ROW
    if (type === 'product') {
        const name = formData.get('name');
        const category = formData.get('category');
        const price = formData.get('price');
        const stock = formData.get('stock');
        const artisan = formData.get('artisan');
        
        // Check stock level
        let stockClass = 'in-stock';
        let stockText = 'En stock (' + stock + ')';
        if (stock == 0) {
            stockClass = 'out-stock';
            stockText = 'Rupture';
        } else if (stock < 10) {
            stockClass = 'low-stock';
            stockText = 'Stock faible (' + stock + ')';
        }
        
        cells[2].textContent = name;
        cells[3].innerHTML = `<span class="badge badge-purple">${category}</span>`;
        cells[4].textContent = price + ' DH';
        cells[5].innerHTML = `<span class="stock-status ${stockClass}">${stockText}</span>`;
        cells[6].textContent = artisan;
    }
    
    // UPDATE CLIENT ROW
    if (type === 'client') {
        cells[1].textContent = formData.get('name');
        cells[2].textContent = formData.get('email');
        cells[3].textContent = formData.get('phone');
        cells[4].textContent = formData.get('city');
    }
    
    // UPDATE STOCK ROW
    if (type === 'stock') {
        const quantity = formData.get('quantity');
        const minThreshold = formData.get('min_threshold');
        
        let stockClass = 'in-stock';
        let stockText = 'Normal';
        if (quantity == 0) {
            stockClass = 'out-stock';
            stockText = 'Rupture';
        } else if (quantity < minThreshold) {
            stockClass = 'low-stock';
            stockText = 'Faible';
        }
        
        cells[1].textContent = formData.get('product');
        cells[2].textContent = quantity;
        cells[3].textContent = minThreshold;
        cells[4].textContent = formData.get('location');
        cells[5].innerHTML = `<span class="stock-status ${stockClass}">${stockText}</span>`;
        cells[6].textContent = new Date().toLocaleDateString('fr-FR');
    }
    
    // UPDATE ORDER ROW
    if (type === 'order') {
        cells[1].textContent = formData.get('client');
        cells[2].textContent = new Date(formData.get('order_date')).toLocaleDateString('fr-FR');
        cells[3].textContent = formData.get('items') + ' articles';
        cells[4].textContent = formData.get('amount') + ' DH';
        cells[5].innerHTML = `<span class="badge badge-info">${formData.get('status')}</span>`;
        cells[6].innerHTML = `<span class="badge badge-orange">${formData.get('payment_status')}</span>`;
    }
    
    // UPDATE INVOICE ROW
    if (type === 'invoice') {
        cells[1].textContent = formData.get('order_num');
        cells[2].textContent = formData.get('client');
        cells[3].textContent = new Date(formData.get('issue_date')).toLocaleDateString('fr-FR');
        cells[4].textContent = new Date(formData.get('due_date')).toLocaleDateString('fr-FR');
        cells[5].textContent = formData.get('amount_ht') + ' DH';
        cells[6].textContent = formData.get('amount_ttc') + ' DH';
        cells[7].innerHTML = `<span class="badge badge-orange">${formData.get('status')}</span>`;
    }
    
    // Close modal and show message
    closeModal();
    showMessage('Élément modifié avec succès !');
}


// 7. ADD NEW ROW TO TABLE

function addNewRow(type, formData) {
    
    // Get the table body
    let tableBody;
    if (type === 'product') {
        tableBody = document.querySelector('#products-table tbody');
    } else {
        tableBody = document.querySelector('#' + type + 's-section table tbody');
    }
    
    // Count rows to make ID
    const rowCount = tableBody.children.length + 1;
    
    // Action buttons (same for all)
    const actionButtons = `
        <div class="action-buttons">
            <button class="btn-action btn-view"><i class="fas fa-eye"></i></button>
            <button class="btn-action btn-edit"><i class="fas fa-edit"></i></button>
            <button class="btn-action btn-delete"><i class="fas fa-trash"></i></button>
        </div>
    `;
    
    let newRow = '';
    
    // CREATE ROW FOR PRODUCT
    if (type === 'product') {
        const id = '#P' + String(rowCount).padStart(3, '0');
        const name = formData.get('name');
        const category = formData.get('category');
        const price = formData.get('price');
        const stock = formData.get('stock');
        const artisan = formData.get('artisan');
        
        // Check stock level
        let stockClass = 'in-stock';
        let stockText = 'En stock (' + stock + ')';
        if (stock == 0) {
            stockClass = 'out-stock';
            stockText = 'Rupture';
        } else if (stock < 10) {
            stockClass = 'low-stock';
            stockText = 'Stock faible (' + stock + ')';
        }
        
        newRow = `
            <tr>
                <td>${id}</td>
                <td><div class="table-image"><i class="fas fa-box"></i></div></td>
                <td>${name}</td>
                <td><span class="badge badge-purple">${category}</span></td>
                <td>${price} DH</td>
                <td><span class="stock-status ${stockClass}">${stockText}</span></td>
                <td>${artisan}</td>
                <td>${actionButtons}</td>
            </tr>
        `;
    }
    
    // CREATE ROW FOR CLIENT
    if (type === 'client') {
        const id = '#C' + String(rowCount).padStart(3, '0');
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const city = formData.get('city');
        
        newRow = `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>${city}</td>
                <td>0</td>
                <td>0 DH</td>
                <td>${actionButtons}</td>
            </tr>
        `;
    }
    
    // CREATE ROW FOR STOCK
    if (type === 'stock') {
        const id = '#S' + String(rowCount).padStart(3, '0');
        const product = formData.get('product');
        const quantity = formData.get('quantity');
        const minThreshold = formData.get('min_threshold');
        const location = formData.get('location');
        
        // Check stock status
        let stockClass = 'in-stock';
        let stockText = 'Normal';
        if (quantity == 0) {
            stockClass = 'out-stock';
            stockText = 'Rupture';
        } else if (quantity < minThreshold) {
            stockClass = 'low-stock';
            stockText = 'Faible';
        }
        
        const today = new Date().toLocaleDateString('fr-FR');
        
        newRow = `
            <tr>
                <td>${id}</td>
                <td>${product}</td>
                <td>${quantity}</td>
                <td>${minThreshold}</td>
                <td>${location}</td>
                <td><span class="stock-status ${stockClass}">${stockText}</span></td>
                <td>${today}</td>
                <td>${actionButtons}</td>
            </tr>
        `;
    }
    
    // CREATE ROW FOR ORDER
    if (type === 'order') {
        const id = '#CMD' + (1000 + rowCount);
        const client = formData.get('client');
        const orderDate = formData.get('order_date');
        const items = formData.get('items');
        const amount = formData.get('amount');
        const status = formData.get('status');
        const paymentStatus = formData.get('payment_status');
        
        const dateFormatted = new Date(orderDate).toLocaleDateString('fr-FR');
        
        newRow = `
            <tr>
                <td>${id}</td>
                <td>${client}</td>
                <td>${dateFormatted}</td>
                <td>${items} articles</td>
                <td>${amount} DH</td>
                <td><span class="badge badge-info">${status}</span></td>
                <td><span class="badge badge-orange">${paymentStatus}</span></td>
                <td>${actionButtons}</td>
            </tr>
        `;
    }
    
    // CREATE ROW FOR INVOICE
    if (type === 'invoice') {
        const year = new Date().getFullYear();
        const id = '#FAC' + year + '-' + String(rowCount).padStart(3, '0');
        const orderNum = formData.get('order_num');
        const client = formData.get('client');
        const issueDate = formData.get('issue_date');
        const dueDate = formData.get('due_date');
        const amountHT = formData.get('amount_ht');
        const amountTTC = formData.get('amount_ttc');
        const status = formData.get('status');
        
        const issueDateFormatted = new Date(issueDate).toLocaleDateString('fr-FR');
        const dueDateFormatted = new Date(dueDate).toLocaleDateString('fr-FR');
        
        newRow = `
            <tr>
                <td>${id}</td>
                <td>${orderNum}</td>
                <td>${client}</td>
                <td>${issueDateFormatted}</td>
                <td>${dueDateFormatted}</td>
                <td>${amountHT} DH</td>
                <td>${amountTTC} DH</td>
                <td><span class="badge badge-orange">${status}</span></td>
                <td>${actionButtons}</td>
            </tr>
        `;
    }
    
    // Add the new row to table
    tableBody.insertAdjacentHTML('beforeend', newRow);
    
    // Close modal and show message
    closeModal();
    showMessage('Élément ajouté avec succès !');
}


// 8. DELETE AND EDIT BUTTONS

document.addEventListener('click', function(e) {
    
    // If delete button clicked
    const deleteButton = e.target.closest('.btn-delete');
    if (deleteButton) {
        const confirmDelete = confirm('Supprimer cet élément ?');
        if (confirmDelete) {
            const row = deleteButton.closest('tr');
            row.remove();
            showMessage('Élément supprimé');
        }
    }
    
    // If view button clicked
    if (e.target.closest('.btn-view')) {
        showMessage('Fonctionnalité en développement');
    }
    
    // If edit button clicked
    const editButton = e.target.closest('.btn-edit');
    if (editButton) {
        const row = editButton.closest('tr');
        editingRow = row; // Remember this row
        
        const cells = row.querySelectorAll('td');
        const section = row.closest('.content-section');
        
        let type = '';
        let data = {};
        
        // GET DATA FOR PRODUCT
        if (section.id === 'products-section') {
            type = 'product';
            data = {
                name: cells[2].textContent,
                category: cells[3].textContent.trim(),
                price: cells[4].textContent.replace(' DH', '').trim(),
                stock: cells[5].textContent.match(/\d+/) ? cells[5].textContent.match(/\d+/)[0] : '0',
                artisan: cells[6].textContent
            };
        }
        
        // GET DATA FOR CLIENT
        if (section.id === 'clients-section') {
            type = 'client';
            data = {
                name: cells[1].textContent,
                email: cells[2].textContent,
                phone: cells[3].textContent,
                city: cells[4].textContent
            };
        }
        
        // GET DATA FOR STOCK
        if (section.id === 'stock-section') {
            type = 'stock';
            data = {
                product: cells[1].textContent,
                quantity: cells[2].textContent,
                min_threshold: cells[3].textContent,
                location: cells[4].textContent
            };
        }
        
        // GET DATA FOR ORDER
        if (section.id === 'orders-section') {
            type = 'order';
            // Convert date from FR format (DD/MM/YYYY) to input format (YYYY-MM-DD)
            const dateParts = cells[2].textContent.split('/');
            const dateForInput = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
            
            data = {
                client: cells[1].textContent,
                order_date: dateForInput,
                items: cells[3].textContent.replace(' articles', '').trim(),
                amount: cells[4].textContent.replace(' DH', '').trim(),
                status: cells[5].textContent.trim(),
                payment_status: cells[6].textContent.trim()
            };
        }
        
        // GET DATA FOR INVOICE
        if (section.id === 'invoices-section') {
            type = 'invoice';
            // Convert dates
            const issueParts = cells[3].textContent.split('/');
            const issueForInput = issueParts[2] + '-' + issueParts[1] + '-' + issueParts[0];
            const dueParts = cells[4].textContent.split('/');
            const dueForInput = dueParts[2] + '-' + dueParts[1] + '-' + dueParts[0];
            
            data = {
                order_num: cells[1].textContent,
                client: cells[2].textContent,
                issue_date: issueForInput,
                due_date: dueForInput,
                amount_ht: cells[5].textContent.replace(' DH', '').trim(),
                amount_ttc: cells[6].textContent.replace(' DH', '').trim(),
                status: cells[7].textContent.trim()
            };
        }
        
        // Open modal with data
        openModal(type, data);
    }
});

// 9. SEARCH IN TABLE

document.querySelectorAll('.search-box input').forEach(searchInput => {
    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        
        // Get active table
        const activeTable = document.querySelector('.content-section.active table tbody');
        
        if (activeTable) {
            // Loop through all rows
            activeTable.querySelectorAll('tr').forEach(row => {
                const rowText = row.textContent.toLowerCase();
                
                // Show or hide row
                if (rowText.includes(searchText)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
    });
});
// 10. MAKE FUNCTIONS AVAILABLE-browser
window.openModal = openModal;
window.closeModal = closeModal;