// ===============================
// LOAD COMPONENT FUNCTION
// ===============================
function loadComponent(id, file) {
    return fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Gagal load: ${file}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(error));
}

// ===============================
// INIT ACCORDION ICON
// ===============================
function initAccordion() {
    document.querySelectorAll('#jamOperasional .collapse').forEach(collapseEl => {

        collapseEl.addEventListener('show.bs.collapse', function () {
            const trigger = document.querySelector(`[data-bs-target="#${this.id}"]`);
            if (!trigger) return;

            const arrow = trigger.querySelector('.arrow');
            if (arrow) arrow.style.transform = "rotate(90deg)";
        });

        collapseEl.addEventListener('hide.bs.collapse', function () {
            const trigger = document.querySelector(`[data-bs-target="#${this.id}"]`);
            if (!trigger) return;

            const arrow = trigger.querySelector('.arrow');
            if (arrow) arrow.style.transform = "rotate(0deg)";
        });

    });
}

// ===============================
// INIT FILTER BERITA
// ===============================
function initBeritaFilter() {
    const buttons = document.querySelectorAll('.btn-category');
    const items = document.querySelectorAll('.news-item');

    if (!buttons.length || !items.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            const category = button.dataset.category;

            // RESET BUTTON
            buttons.forEach(btn => {
                btn.classList.remove('btn-dark', 'active');
                btn.classList.add('btn-outline-dark');
            });

            // ACTIVE BUTTON
            button.classList.add('btn-dark', 'active');
            button.classList.remove('btn-outline-dark');

            // FILTER ITEM
            items.forEach(item => {
                const itemCategory = item.dataset.category;

                if (category === 'all' || itemCategory === category) {
                    item.classList.remove('d-none');
                } else {
                    item.classList.add('d-none');
                }
            });

        });
    });
}

// ===============================
// INIT BOOTSTRAP COLLAPSE (WAJIB)
// ===============================
function initBootstrapCollapse() {
    document.querySelectorAll('.collapse').forEach(el => {
        new bootstrap.Collapse(el, {
            toggle: false
        });
    });
}

// ===============================
// MAIN EXECUTION
// ===============================
Promise.all([
    loadComponent("navbar", "components/navbar.html"),
    loadComponent("banner", "components/banner.html"),
    loadComponent("informasi", "components/informasi.html"),
    loadComponent("berita", "components/berita.html"),
    loadComponent("faq", "components/faq.html"),
    loadComponent("video", "components/video.html"),
    loadComponent("footer", "components/footer.html")
])
    .then(() => {

        // ⚠️ URUTAN PENTING
        initBootstrapCollapse(); // harus dulu
        initAccordion();
        initBeritaFilter();

    })
    .catch(err => console.error("Error loading components:", err));
