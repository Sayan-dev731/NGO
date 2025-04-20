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

async function handleIndividualSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value,
        city: form.city.value,
        timestamp: new Date().toISOString()
    };

    if (await submitToSheet(formData, 'Individual Registrations')) {
        alert('Registration successful!');
        form.reset();
    } else {
        alert('Registration failed. Please try again.');
    }
}

async function handleOrganizationSubmit(event) {
    event.preventDefault();
    const form = event.target;
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

    if (await submitToSheet(formData, 'Organization Registrations')) {
        alert('Registration successful!');
        form.reset();
    } else {
        alert('Registration failed. Please try again.');
    }
}

async function handleVolunteerSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = {
        fullName: form.fullName.value,
        email: form.email.value,
        phone: form.phone.value,
        city: form.city.value,
        state: form.state.value,
        timestamp: new Date().toISOString()
    };

    if (await submitToSheet(formData, 'Volunteer Registrations')) {
        alert('Registration successful!');
        form.reset();
    } else {
        alert('Registration failed. Please try again.');
    }
}
