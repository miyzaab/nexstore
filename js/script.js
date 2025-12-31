document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const menuButton = document.querySelector('button.lg\\:hidden');

    if (menuButton) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'fixed inset-0 z-40 bg-background-light dark:bg-background-dark transform transition-transform duration-300 ease-in-out translate-x-full lg:hidden flex flex-col pt-20 px-6 gap-6';
        mobileMenu.innerHTML = `
        <nav class="flex flex-col gap-6 text-lg font-medium">
          <a class="text-text-main dark:text-white hover:text-primary transition-colors" href="index.html">Beranda</a>
          <a class="text-text-main dark:text-white hover:text-primary transition-colors" href="catalog.html">Katalog</a>
          <a class="text-text-main dark:text-white hover:text-primary transition-colors" href="about.html">Tentang Kami</a>
          <a class="text-text-main dark:text-white hover:text-primary transition-colors" href="contact.html">Hubungi Kami</a>
        </nav>
      `;

        document.body.appendChild(mobileMenu);

        let isMenuOpen = false;
        menuButton.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('translate-x-full');
                menuButton.innerHTML = '<span class="material-symbols-outlined">close</span>';
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.add('translate-x-full');
                menuButton.innerHTML = '<span class="material-symbols-outlined">menu</span>';
                document.body.style.overflow = '';
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('translate-x-full');
                menuButton.innerHTML = '<span class="material-symbols-outlined">menu</span>';
                document.body.style.overflow = '';
            });
        });
    }

    // --- Animation Observer Logic ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll, .scale-in, .fade-in');
    animatedElements.forEach(el => observer.observe(el));

    // --- Walker Animation Observer ---
    const walkerContainer = document.querySelector('.walker-container');
    if (walkerContainer) {
        const walkerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-walking');
                } else {
                    entry.target.classList.remove('is-walking');
                }
            });
        }, { rootMargin: '100px' }); // Load slightly before view

        walkerObserver.observe(walkerContainer);
    }
});
