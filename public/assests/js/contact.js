document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('wf-form-Contact-form');
    const messageContainer = document.getElementById('form-message');

    function showMessage(type, message) {
        messageContainer.className = `form-message ${type}`;
        messageContainer.textContent = message;
        messageContainer.style.display = 'block';

        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 5000);
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        try {
            const formData = {
                name: form.querySelector('#Contact-name').value,
                address: form.querySelector('#Contact-address').value,
                email: form.querySelector('#Contact-email').value,
                phone: form.querySelector('#Contact-phone').value,
                subject: form.querySelector('#Contact-subject').value,
                message: form.querySelector('#Contact-message').value
            };

            // Show loading state
            const submitButton = form.querySelector('input[type="submit"]');
            const originalText = submitButton.value;
            submitButton.value = 'Sending...';
            submitButton.disabled = true;

            // Send data to server
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                showMessage('success', 'Thank you! Your message has been sent successfully.');
                form.reset();
            } else {
                throw new Error(data.message);
            }

        } catch (error) {
            showMessage('error', 'Oops! Something went wrong. Please try again later.');
            console.error('Error:', error);
        } finally {
            // Reset button state
            const submitButton = form.querySelector('input[type="submit"]');
            submitButton.value = 'Send message';
            submitButton.disabled = false;
        }
    });
});
