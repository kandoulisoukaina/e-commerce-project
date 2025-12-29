// Script pour la page de connexion
document.addEventListener('DOMContentLoaded', function() {
    // Toggle visibilité mot de passe
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // Gestion de la soumission du formulaire
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Validation simple
            if (!username || !password) {
                showMessage('Veuillez remplir tous les champs', 'error');
                return;
            }
            
            // Vérification des identifiants (admin/admin123)
            if (username === 'admin' && password === 'admin123') {
                showMessage('Connexion réussie ! Redirection...', 'success');
                
                // Simuler un délai avant redirection
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showMessage('Identifiants incorrects. Essayez admin / admin123', 'error');
            }
        });
    }
    
    // Fonction pour afficher des messages
    function showMessage(message, type) {
        // Supprimer les anciens messages
        const oldMessage = document.querySelector('.message-alert');
        if (oldMessage) oldMessage.remove();
        
        // Créer un nouveau message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-alert message-${type}`;
        messageDiv.textContent = message;
        
        // Styles pour le message
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.right = '20px';
        messageDiv.style.padding = '15px 20px';
        messageDiv.style.borderRadius = 'var(--border-radius)';
        messageDiv.style.color = 'white';
        messageDiv.style.fontWeight = '600';
        messageDiv.style.zIndex = '1000';
        messageDiv.style.boxShadow = 'var(--box-shadow)';
        messageDiv.style.animation = 'slideIn 0.3s ease';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = 'var(--success-color)';
        } else if (type === 'error') {
            messageDiv.style.backgroundColor = 'var(--danger-color)';
        } else {
            messageDiv.style.backgroundColor = 'var(--primary-color)';
        }
        
        document.body.appendChild(messageDiv);
        
        // Supprimer le message après 5 secondes
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
    
    // Ajouter l'animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
