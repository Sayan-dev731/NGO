// Google Apps Script deployment ID (you'll get this after deploying)
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwthR_SIpYzRipKvg-pfglEHKe9dbNQwyPoFC2lpscvBYokf2rxxm5f00Z_6xAxnHsq/exec';

async function submitToSheet(formData, sheetName) {
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
                data: formData,
                sheet: sheetName
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

function showNotification(type, message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification elements
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const content = document.createElement('div');
    content.className = 'notification-content';

    const icon = document.createElement('div');
    icon.className = 'notification-icon';
    icon.innerHTML = type === 'success' ? '✓' : '!';

    const messageDiv = document.createElement('div');
    messageDiv.className = 'notification-message';
    messageDiv.textContent = message;

    const progress = document.createElement('div');
    progress.className = 'notification-progress';

    const progressBar = document.createElement('div');
    progressBar.className = 'notification-progress-bar';

    // Assemble notification
    content.appendChild(icon);
    content.appendChild(messageDiv);
    notification.appendChild(content);
    progress.appendChild(progressBar);
    notification.appendChild(progress);
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('active'), 10);

    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

function showProcessingState(form, message = 'Processing your submission...') {
    const existingOverlay = form.querySelector('.form-processing');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    const overlay = document.createElement('div');
    overlay.className = 'form-processing';
    overlay.innerHTML = `
        <div class="processing-spinner"></div>
        <div class="processing-text">${message}</div>
    `;

    form.style.position = 'relative';
    form.appendChild(overlay);

    // Trigger animation
    setTimeout(() => overlay.classList.add('active'), 10);
}

function hideProcessingState(form) {
    const overlay = form.querySelector('.form-processing');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
}

async function handleIndividualSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');

    // Show loading state
    submitButton.classList.add('loading');
    showProcessingState(form, 'Processing your registration...');

    const formData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value,
        city: form.city.value,
        timestamp: new Date().toISOString()
    };

    try {
        if (await submitToSheet(formData, 'Individual Registrations')) {
            hideProcessingState(form);
            showNotification('success', 'Registration successful! Welcome to our community.');
            form.reset();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        hideProcessingState(form);
        showNotification('error', 'Registration failed. Please try again later.');
    } finally {
        submitButton.classList.remove('loading');
    }
}

async function handleOrganizationSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');

    // Show loading state
    submitButton.classList.add('loading');
    showProcessingState(form, 'Processing organization registration...');

    const formData = {
        orgName: form.orgName.value,
        orgAddress: form.orgAddress.value,
        orgCity: form.orgCity.value,
        pincode: form.pincode.value,
        contactNo: form.contactNo.value,
        contactEmail: form.contactEmail.value,
        message: form.message.value,
        timestamp: new Date().toISOString()
    };

    try {
        if (await submitToSheet(formData, 'Organization Registrations')) {
            hideProcessingState(form);
            showNotification('success', 'Organization registered successfully! We will review your application.');
            form.reset();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        hideProcessingState(form);
        showNotification('error', 'Registration failed. Please try again later.');
    } finally {
        submitButton.classList.remove('loading');
    }
}

async function handleVolunteerSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');

    // Show loading state
    submitButton.classList.add('loading');
    showProcessingState(form, 'Submitting volunteer application...');

    const formData = {
        fullName: form.fullName.value,
        email: form.email.value,
        phone: form.phone.value,
        city: form.city.value,
        state: form.state.value,
        timestamp: new Date().toISOString()
    };

    try {
        if (await submitToSheet(formData, 'Volunteer Registrations')) {
            hideProcessingState(form);
            showNotification('success', 'Thank you for registering! We will contact you soon.');
            form.reset();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        hideProcessingState(form);
        showNotification('error', 'Registration failed. Please try again later.');
    } finally {
        submitButton.classList.remove('loading');
    }
}
