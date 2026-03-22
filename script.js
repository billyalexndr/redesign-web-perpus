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
            const el = document.getElementById(id);
            if (el) el.innerHTML = data;
        })
        .catch(error => console.error(error));
}


// ===============================
// BOOTSTRAP COLLAPSE (FAQ)
// ===============================
function initBootstrapCollapse() {
    document.querySelectorAll('.collapse').forEach(el => {
        new bootstrap.Collapse(el, {
            toggle: false
        });
    });
}


// ===============================
// ACCORDION ICON (FAQ ARROW)
// ===============================
function initAccordionIcon() {
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
// FILTER BERITA
// ===============================
function initBeritaFilter() {
    const buttons = document.querySelectorAll('.btn-category');
    const items = document.querySelectorAll('.news-item');

    if (!buttons.length || !items.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            const category = button.dataset.category;

            // reset button
            buttons.forEach(btn => {
                btn.classList.remove('btn-dark', 'active');
                btn.classList.add('btn-outline-dark');
            });

            // active button
            button.classList.add('btn-dark', 'active');
            button.classList.remove('btn-outline-dark');

            // filter
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
// DATA LAYANAN
// ===============================
const layananData = {
    sirkulasi: {
        deskripsi: "Layanan sirkulasi meliputi peminjaman, pengembalian, dan perpanjangan koleksi buku.",
        items: [
            "Peminjaman Buku",
            "Perpanjangan Buku",
            "Pengembalian Buku"
        ]
    },
    referensi: {
        deskripsi: "Layanan referensi membantu pengguna dalam menemukan dan memahami informasi yang dibutuhkan.",
        items: [
            "Rekomendasi Buku",
            "Ulasan Buku"
        ]
    },
    digital: {
        deskripsi: "Layanan digital menyediakan akses ke berbagai sumber elektronik seperti e-journal dan prosiding.",
        items: [
            "E-Journal",
            "Prosiding"
        ]
    },
    pendidikan: {
        deskripsi: "Layanan pendidikan mendukung kegiatan pembelajaran melalui pelatihan dan sosialisasi.",
        items: [
            "Pencarian Koleksi",
            "Sosialisasi"
        ]
    },
    audiovisual: {
        deskripsi: "Layanan audio visual menyediakan fasilitas multimedia untuk menunjang kegiatan belajar.",
        items: [
            "Pemutaran Video",
            "Ruang Multimedia"
        ]
    }
};



// ===============================
// RENDER LAYANAN
// ===============================
function renderLayanan(kategori) {
    const container = document.getElementById("layananList");
    const deskripsiEl = document.getElementById("deskripsi");

    if (!container || !deskripsiEl) return;

    const data = layananData[kategori];
    if (!data) return;

    // ✅ UPDATE DESKRIPSI
    deskripsiEl.innerText = data.deskripsi;

    // ✅ UPDATE LIST
    container.innerHTML = "";

    data.items.forEach(item => {
        container.innerHTML += `
            <div class="layanan-item">
                <div class="layanan-header">
                    <span>${item}</span>
                    <span class="icon">></span>
                </div>
                <div class="layanan-body">
                    Detail tentang ${item}
                </div>
            </div>
        `;
    });

    // re-init accordion
    initLayananAccordion();
}


// ===============================
// DATA TATA TERTIB
// ===============================
const tatibData = {
    tatib: {
        deskripsi: `
            Tata tertib perpustakaan mencakup aturan penggunaan fasilitas, 
            kewajiban menjaga ketenangan, larangan merusak koleksi, serta 
            ketentuan dalam peminjaman dan pengembalian buku.
        `
    },
    keanggotaan: {
        deskripsi: `
            Keanggotaan perpustakaan memberikan akses ke berbagai layanan, 
            termasuk peminjaman buku, akses digital, dan fasilitas lainnya. 
            Pendaftaran dilakukan sesuai prosedur yang berlaku.
        `
    }
};

// ===============================
// DATA E-DOKUMEN
// ===============================
const edokumenData = {
    internal: [
        {
            title: "Panduan Perpustakaan",
            file: "files/panduan.pdf",
            category: "Internal",
            date: "2025-01-10"
        },
        {
            title: "SOP Layanan",
            file: "files/sop.pdf",
            category: "Internal",
            date: "2025-02-15"
        }
    ],
    eksternal: [
        {
            title: "Jurnal Nasional",
            file: "files/jurnal.pdf",
            category: "Eksternal",
            date: "2025-03-01"
        },
        {
            title: "Prosiding Seminar",
            file: "files/prosiding.pdf",
            category: "Eksternal",
            date: "2025-03-20"
        }
    ]
};

// ===============================
// DATA FASILITAS
// ===============================
const fasilitasData = [
    {
        title: "Bahan Pustaka",
        desc: "Koleksi buku, jurnal, dan referensi yang tersedia untuk dibaca maupun dipinjam.",
        img: "image/tester.png"
    },
    {
        title: "Bahan Elektronik",
        desc: "Akses ke e-book, e-journal, dan sumber digital lainnya.",
        img: "image/fasilitas2.jpg"
    },
    {
        title: "Komputer",
        desc: "Fasilitas komputer untuk pencarian informasi dan pengerjaan tugas.",
        img: "image/fasilitas3.jpg"
    },
    {
        title: "OPAC",
        desc: "Online Public Access Catalog untuk mencari koleksi perpustakaan.",
        img: "image/fasilitas4.jpg"
    },
    {
        title: "Bahan Pustaka",
        desc: "Koleksi buku, jurnal, dan referensi yang tersedia untuk dibaca maupun dipinjam.",
        img: "image/tester.png"
    },
    {
        title: "Bahan Elektronik",
        desc: "Akses ke e-book, e-journal, dan sumber digital lainnya.",
        img: "image/fasilitas2.jpg"
    },
    {
        title: "Komputer",
        desc: "Fasilitas komputer untuk pencarian informasi dan pengerjaan tugas.",
        img: "image/fasilitas3.jpg"
    },
    {
        title: "OPAC",
        desc: "Online Public Access Catalog untuk mencari koleksi perpustakaan.",
        img: "image/fasilitas4.jpg"
    }
];


// ===============================
// RENDER TATA TERTIB
// ===============================
function renderTatib(kategori) {
    const deskripsiEl = document.getElementById("deskripsi");
    if (!deskripsiEl) return;

    const data = tatibData[kategori];
    if (!data) return;

    deskripsiEl.innerHTML = data.deskripsi;
}

// ===============================
// RENDER TABLE E-DOKUMEN
// ===============================
function renderEDokumen(kategori) {
    const container = document.getElementById("dokumenTable");
    if (!container) return;

    const data = edokumenData[kategori];
    if (!data) return;

    container.innerHTML = `
        <div class="table-responsive">
            <table class="table table-bordered align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Title</th>
                        <th>Categories</th>
                        <th>Update Date</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                        <tr>
                            <td>
                                <i class="bi bi-file-earmark-pdf text-danger me-2"></i>
                                ${item.title}
                            </td>
                            <td>${item.category}</td>
                            <td>${item.date}</td>
                            <td>
                                <a href="${item.file}" class="btn btn-sm btn-dark" download>
                                    Download
                                </a>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

// ===============================
// RENDER FASILITAS
// ===============================
function renderFasilitas() {
    const container = document.getElementById("fasilitasContainer");
    if (!container) return;

    container.innerHTML = fasilitasData.map(item => `
        <div class="col-md-3 col-sm-6">
            <div class="fasilitas-card h-100">
                
                <h6 class="fw-bold mb-2">${item.title}</h6>

                <p class="text-muted small">
                    ${item.desc}
                </p>

                <div class="fasilitas-img mt-auto">
                    <img src="${item.img}" alt="${item.title}">
                </div>

            </div>
        </div>
    `).join("");
}


// ===============================
// CUSTOM ACCORDION (LAYANAN)
// ===============================
function initLayananAccordion() {
    const headers = document.querySelectorAll('.layanan-header');

    if (!headers.length) return;

    headers.forEach(header => {
        header.addEventListener('click', () => {

            const item = header.parentElement;

            // tutup semua kecuali yg diklik
            document.querySelectorAll('.layanan-item').forEach(i => {
                if (i !== item) i.classList.remove('active');
            });

            // toggle current
            item.classList.toggle('active');
        });
    });
}

// ===============================
// INIT KATEGORI TATA TERTIB
// ===============================
function initKategoriTatib() {
    const buttons = document.querySelectorAll('.btn-kategori');
    if (!buttons.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            const kategori = button.dataset.kategori;

            // reset button
            buttons.forEach(btn => {
                btn.classList.remove('btn-dark', 'active');
                btn.classList.add('btn-outline-dark');
            });

            // active button
            button.classList.add('btn-dark', 'active');
            button.classList.remove('btn-outline-dark');

            // render deskripsi
            renderTatib(kategori);
        });
    });

    // default pertama
    renderTatib("tatib");
}

// ===============================
// INIT KATEGORI DOKUMEN
// ===============================
function initKategoriEDokumen() {
    const buttons = document.querySelectorAll('.btn-edok');
    if (!buttons.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            const kategori = button.dataset.kategori;

            // reset button
            buttons.forEach(btn => {
                btn.classList.remove('btn-dark', 'active');
                btn.classList.add('btn-outline-dark');
            });

            // active button
            button.classList.add('btn-dark', 'active');
            button.classList.remove('btn-outline-dark');

            renderEDokumen(kategori);
        });
    });

    // default
    renderEDokumen("internal");
}

// ===============================
// INIT FASILITAS
// ===============================
function initFasilitas() {
    const container = document.getElementById("fasilitasContainer");

    // ❗ jika bukan halaman fasilitas → stop
    if (!container) return;

    renderFasilitas();
}


// ===============================
// KATEGORI LAYANAN
// ===============================
function initKategoriLayanan() {
    const buttons = document.querySelectorAll('.btn-kategori');

    if (!buttons.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            const kategori = button.dataset.kategori;

            // reset button
            buttons.forEach(btn => {
                btn.classList.remove('btn-dark', 'active');
                btn.classList.add('btn-outline-dark');
            });

            // active button
            button.classList.add('btn-dark', 'active');
            button.classList.remove('btn-outline-dark');

            // render layanan
            renderLayanan(kategori);
        });
    });

    // default pertama
    renderLayanan("sirkulasi");
}


// ===============================
// INIT ALL
// ===============================
function initAll() {
    initBootstrapCollapse();   // FAQ collapse
    initAccordionIcon();       // arrow FAQ
    initBeritaFilter();        // filter berita
    initKategoriLayanan();     // layanan
    initKategoriTatib();       // tatib
    initKategoriEDokumen();    // e-dokumen
    initFasilitas();            // fasilitas
}


// ===============================
// MAIN EXECUTION
// ===============================
document.addEventListener("DOMContentLoaded", () => {

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
            initAll();
        })
        .catch(err => console.error("Error loading components:", err));

});
