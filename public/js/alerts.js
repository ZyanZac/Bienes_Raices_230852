document.addEventListener('DOMContentLoaded', function() {
    function closeAlert(alertId) {
        const alertToRemove = document.querySelector(`.alert-item[data-alert-id="${alertId}"]`);
        if (alertToRemove) {
            // Reemplazar clases de animación
            alertToRemove.classList.remove('animate-fade-in-right');
            alertToRemove.classList.add('animate-fade-out-right');
            
            setTimeout(() => {
                alertToRemove.remove();
                const container = document.getElementById('alertContainer');
                if (container && container.children.length === 0) {
                    container.remove();
                }
            }, 500); // Ajustar el tiempo para que coincida con la duración de la animación
        }
    }
    
    const closeButtons = document.querySelectorAll('.close-alert');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const alertId = this.getAttribute('data-alert-id');
            closeAlert(alertId);
        });
    });
    
    // Auto-cerrar después de 5 segundos
    const alerts = document.querySelectorAll('.alert-item');
    alerts.forEach(alert => {
        const alertId = alert.getAttribute('data-alert-id');
        setTimeout(() => {
            closeAlert(alertId);
        }, 5000);
    });
});

