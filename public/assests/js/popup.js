const projectData = {
    'divya-deepawali': {
        title: 'DIVYA DEEPAWALI 2021',
        description: "Diwali is just around the corner! On this auspicious day of light, love, and celebration, let's take a step and celebrate this day with those who can't for themselves! ✨\n\nStarlight Foundation brings to you, an opportunity to make this day remarkable by bringing a change through your small act of compassion.\n\n💫Be a part of दिव्य दीपावली 2021. 💫\n\nContribute and donate to this purpose and join us for music, dance, games, awards, and much more that awaits you! ✨",
        image: 'assets/images/projects/deepawali.png'
    },
    'tarang': {
        title: 'TARANG',
        description: 'Support to a worthy cause! On the eve of Starlight Foundation Day TARANG 2021. We are planning to distribute Nutrition Kits to the malnourished children following the \'Vajan Tyohar\' initiative. We oblige you to donate these Nutrition Kits, School Bag & Other Gift Items to the Underprivileged and Malnourished children.\n\nDo give a helping hand to us to fulfill our goal, join hands with us in giving these children a better and healthy life to prosper. ✨\n\nSmallest contribution goes a long way. Your support matters. 🌸✨',
        image: 'assets/images/projects/tarang.png'
    },
    'immunization': {
        title: 'IMMUNIZATION',
        description: 'While the world has all its face towards the vaccine against COVID-19, the unprivileged children in India are at a high risk of facing contracting deadly diseases as they missed their vital childhood vaccinations disrupted by this pandemic.\n\nIn April 2020, 2.9 million infants missed their first dose of the measles vaccine due to this pandemic. Many other vaccines are there having a serious illness that infects and even many children die...',
        image: 'assets/images/projects/immunization.webp'
    },
    'covid-relief': {
        title: 'COVID-19 RELIEF FUND',
        description: 'With most urban areas still on a lockdown and businesses resuming operations slowly, multiple backward communities are yet to find a stable means to provide nutritious food and other necessities for their families. Many Migrant laborers have been forced to move back to their hometown while a large number of Daily Wage Worker continue to live in their Home town with no job in hand...',
        image: 'assets/images/projects/covid-19-releif-fund.webp'
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('projectPopup');
    const popupContent = popup.querySelector('.popup-content');
    const closeBtn = document.querySelector('.close-popup');

    function openPopup() {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Trigger reflow to enable transitions
        void popup.offsetWidth;

        popup.classList.add('active');
        popupContent.classList.add('active');
    }

    function closePopup() {
        popup.classList.remove('active');
        popupContent.classList.remove('active');

        // Wait for animations to finish before hiding
        setTimeout(() => {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300); // Match the transition duration
    }

    // Add click handlers to all project cards
    document.querySelectorAll('.la-feature-card.clickable').forEach(card => {
        card.addEventListener('click', function () {
            const projectId = this.dataset.project;
            const project = projectData[projectId];

            document.getElementById('popupImage').src = project.image;
            document.getElementById('popupTitle').textContent = project.title;
            document.getElementById('popupDescription').textContent = project.description;

            openPopup();
        });
    });

    // Close popup handlers
    closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Close popup on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popup.style.display === 'block') {
            closePopup();
        }
    });
});
