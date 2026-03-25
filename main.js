document.addEventListener('DOMContentLoaded', function () {

    // Mobile menu toggle
    const menuBtn = document.querySelector('.header__menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', function () {
            const isOpen = mobileNav.classList.contains('is-open');
            mobileNav.classList.toggle('is-open');
            menuBtn.setAttribute('aria-expanded', !isOpen);
        });

        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('is-open');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Scroll reveal (Intersection Observer)
    const revealElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealElements.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    // Publication search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const filter = this.value.toLowerCase();
            const rows = document.querySelectorAll('.data-table tbody tr');
            rows.forEach(function (row) {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(filter) ? '' : 'none';
            });
        });
    }

    // ===== VISITOR COUNTER =====
document.addEventListener("DOMContentLoaded", function () {

    fetch('https://api.countapi.xyz/hit/munish-website/visits')
        .then(res => res.json())
        .then(data => {

            let count = 0;
            let target = data.value;

            let counterElement = document.getElementById('visitor-count');

            // Safety check (important for multi-page site)
            if (!counterElement) return;

            let interval = setInterval(() => {
                count += Math.ceil(target / 50);

                if (count >= target) {
                    count = target;
                    clearInterval(interval);
                }

                counterElement.innerText = count.toLocaleString();
            }, 20);

        })
        .catch(err => {
            console.error("Visitor counter error:", err);
        });

});

    
    // Active nav link highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.header__nav a, .mobile-nav a').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});
