document.addEventListener('DOMContentLoaded', function () {
    // Map route paths to their corresponding HTML files
    const routeMap = {
        '/': 'index.html',
        '/about-us': 'about.html',
        '/donate': 'donate.html',
        '/blog': 'blog.html',
        '/contact': 'contact.html',
        '/volunteer': 'volunteer.html'
    };

    // Handle all clicks on the document
    document.addEventListener('click', function (e) {
        // Find closest anchor tag if clicked element is inside one
        const link = e.target.closest('a');

        if (link) {
            const href = link.getAttribute('href');

            // Check if the href exists in our route map
            if (routeMap[href]) {
                e.preventDefault(); // Prevent default navigation
                window.location.href = routeMap[href];
            }
        }
    });
});
