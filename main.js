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
    console.log("Visitor counter script loaded.");
    const counterElement = document.getElementById("visitor-count");
    if (counterElement) {
        const BASE_URL = "https://api.counterapi.dev/v2/charuls-team-3457/first-counter-3457";

        // Safely check sessionStorage to prevent tracking prevention errors
        let hasVisited = false;
        try {
            hasVisited = sessionStorage.getItem("visited");
        } catch (e) {
            console.warn("sessionStorage access blocked:", e);
        }

        // If already counted in this session → only fetch value
        if (hasVisited) {
            fetch(BASE_URL)
                .then(res => res.json())
                .then(data => {
                    counterElement.innerText = ((data.data.up_count || 0)+10000).toLocaleString();
                })
                .catch(() => {
                    counterElement.innerText = "—";
                });
        } else {
            // First visit → increment counter
            fetch(BASE_URL + "/up")
                .then(res => res.json())
                .then(data => {
                    try {
                        sessionStorage.setItem("visited", "true");
                    } catch (e) {
                        console.warn("sessionStorage set blocked:", e);
                    }

                    let count = 0;
                    const target = data.data.up_count || 0 + 10000;

                    // Smooth animation
                    const interval = setInterval(() => {
                        count += Math.ceil(target / 50);

                        if (count >= target) {
                            count = target + 10000;
                            clearInterval(interval);
                        }

                        counterElement.innerText = count.toLocaleString();
                    }, 20);
                })
                .catch(() => {
                    counterElement.innerText = "—";
                });
        }
    }

    
    // Active nav link highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.header__nav a, .mobile-nav a').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});
