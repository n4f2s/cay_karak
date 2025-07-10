document.addEventListener('DOMContentLoaded', function() {
    const navBtns = document.querySelectorAll('.nav-btn, .tab-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const orderSummary = document.getElementById('orderSummary');
    const orderItems = document.getElementById('orderItems');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const closeOrder = document.getElementById('closeOrder');
    
    let order = [];
    
    // Navigation functionality
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section') || this.getAttribute('data-tab');
            
            // Update active button
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            menuSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // Quantity controls
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            if (this.classList.contains('plus')) {
                input.value = parseInt(input.value) + 1;
            } else {
                if (input.value > 0) {
                    input.value = parseInt(input.value) - 1;
                }
            }
            updateOrder();
        });
    });
    
    // Input change events
    quantityInputs.forEach(input => {
        input.addEventListener('change', updateOrder);
    });
    
    // Close order summary
    closeOrder.addEventListener('click', function() {
        orderSummary.classList.remove('show');
    });
    
    // Update order function
    function updateOrder() {
        order = [];
        
        document.querySelectorAll('.menu-item').forEach(item => {
            const name = item.querySelector('.item-name').textContent;
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            
            if (quantity > 0) {
                order.push({ name, quantity });
            }
        });
        
        // Update order summary UI
        if (order.length > 0) {
            orderItems.innerHTML = '';
            order.forEach(item => {
                const orderItem = document.createElement('div');
                orderItem.className = 'order-item';
                orderItem.innerHTML = `
                    <span>${item.name}</span>
                    <span>${item.quantity}</span>
                `;
                orderItems.appendChild(orderItem);
            });
            
            orderSummary.classList.add('show');
        } else {
            orderItems.innerHTML = '<div class="no-items">لا توجد عناصر في الطلب</div>';
            orderSummary.classList.remove('show');
        }
    }
    
    // WhatsApp order button
    whatsappBtn.addEventListener('click', function() {
        if (order.length === 0) return;
        
        const phoneNumber = "905431075020";
        let message = "السلام عليكم، أريد طلب التالي من مطعم شاي كرك:\n\n";
        
        order.forEach(item => {
            message += `- ${item.name} × ${item.quantity}\n`;
        });
        
        message += "\nشكراً جزيلاً";
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    });
    
    // Show order summary when items are added
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn') || 
            e.target.classList.contains('quantity-input')) {
            if (order.length > 0) {
                orderSummary.classList.add('show');
            }
        }
    });
});
