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
// SEARCH CONFIG
// ===============================
const searchConfig = {
    library: (q) =>
        `http://library.upnvj.ac.id/index.php?keywords=${q}&search=search`,

    ejournal: (q) =>
        `https://ejournal.upnvj.ac.id/index.php/index/search/search?simpleQuery=${q}&searchField=query`,

    repository: (q) =>
        `https://repository.upnvj.ac.id/cgi/search/simple?q=${q}&_action_search=Search&_order=bytitle&basic_srchtype=ALL&_satisfyall=ALL`
};


// ===============================
// SEARCH INIT
// ===============================
function initSearch() {
    const buttons = document.querySelectorAll(".search-btn");
    const input = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    if (!buttons.length || !input || !searchBtn) return;

    let activeType = "library"; // default

    // =====================
    // HANDLE BUTTON CLICK
    // =====================
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const type = btn.dataset.type;

            // update active state
            buttons.forEach(b => {
                b.classList.remove("active", "btn-primary");
                b.classList.add("btn-outline-light");
            });

            btn.classList.add("active", "btn-primary");
            btn.classList.remove("btn-outline-light");

            activeType = type;
        });
    });

    // =====================
    // HANDLE SEARCH CLICK
    // =====================
    function handleSearch() {
        const keyword = input.value.trim();

        if (!keyword) return;

        const urlBuilder = searchConfig[activeType];
        if (!urlBuilder) return;

        const finalUrl = urlBuilder(encodeURIComponent(keyword));

        // open new tab
        window.open(finalUrl, "_blank");
    }

    searchBtn.addEventListener("click", handleSearch);

    // enter key support
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    });
}


// ===============================
// SOSIAL MEDIA TRIGGER
// ===============================
function initSocialTrigger() {
    const social = document.getElementById("socialFloating");
    const trigger = document.getElementById("informasi");

    if (!social || !trigger) return;

    let hasPassed = false;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    // saat masuk informasi
                    hasPassed = true;
                    social.classList.add("show");
                } else {
                    // kalau keluar ke ATAS (balik ke banner)
                    if (window.scrollY < trigger.offsetTop) {
                        hasPassed = false;
                        social.classList.remove("show");
                    }
                }

            });
        },
        {
            threshold: 0.2
        }
    );

    observer.observe(trigger);
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
            {
                title: "Peminjaman Buku",
                desc: {
                    type: "text",
                    content: "Layanan untuk meminjam buku sesuai ketentuan perpustakaan."
                }
            },
            {
                title: "Perpanjangan Buku",
                desc: {
                    type: "image",
                    src: "/image/perpanjangan.png",
                    caption: "Proses perpanjangan buku"
                }
            },
            {
                title: "Pengembalian Buku",
                desc: {
                    type: "mix",
                    text: "Pengembalian buku dilakukan di meja layanan.",
                    src: "/image/pengembalian.png"
                }
            }
        ]
    },

    referensi: {
        deskripsi: "Layanan referensi membantu pengguna dalam menemukan dan memahami informasi yang dibutuhkan.",
        items: [
            {
                title: "Rekomendasi Buku",
                desc: {
                    type: "text",
                    content: "Memberikan saran buku sesuai kebutuhan pengguna."
                }
            },
            {
                title: "Ulasan Buku",
                desc: {
                    type: "mix",
                    text: "Informasi ringkasan dan evaluasi isi buku.",
                    src: "/image/tester.png"
                }
            }
        ]
    },

    digital: {
        deskripsi: "Layanan digital menyediakan akses ke berbagai sumber elektronik seperti e-journal dan prosiding.",
        items: [
            {
                title: "E-Journal",
                desc: {
                    type: "image",
                    src: "/image/journal.png",
                    caption: "Akses jurnal digital"
                }
            },
            {
                title: "Prosiding",
                desc: {
                    type: "text",
                    content: "Kumpulan makalah ilmiah dari seminar dan konferensi."
                }
            }
        ]
    },

    pendidikan: {
        deskripsi: "Layanan pendidikan mendukung kegiatan pembelajaran melalui pelatihan dan sosialisasi.",
        items: [
            {
                title: "Pencarian Koleksi",
                desc: {
                    type: "text",
                    content: "Pelatihan cara mencari buku dan referensi secara efektif."
                }
            },
            {
                title: "Sosialisasi",
                desc: {
                    type: "image",
                    src: "/image/sosialisasi.png",
                    caption: "Kegiatan sosialisasi perpustakaan"
                }
            }
        ]
    },

    audiovisual: {
        deskripsi: "Layanan audio visual menyediakan fasilitas multimedia untuk menunjang kegiatan belajar.",
        items: [
            {
                title: "Pemutaran Video",
                desc: {
                    type: "mix",
                    text: "Fasilitas untuk menonton materi pembelajaran berbasis video.",
                    src: "/image/video.png"
                }
            },
            {
                title: "Ruang Multimedia",
                desc: {
                    type: "text",
                    content: "Ruangan khusus dengan perangkat multimedia untuk belajar."
                }
            }
        ]
    }
};


function renderDesc(desc) {
    if (!desc || !desc.type) return "";

    switch (desc.type) {
        case "text":
            return `<p>${desc.content}</p>`;

        case "image":
            return `
        <img src="${desc.src}" class="layanan-img mb-2"/>
        <p>${desc.caption || ""}</p>
    `;

        case "mix":
            return `
        <p>${desc.text}</p>
        <img src="${desc.src}" class="layanan-img mt-2"/>
    `;


        default:
            return "";
    }
}



// ===============================
// RENDER LAYANAN
// ===============================
function renderLayanan(kategori) {
    const container = document.getElementById("layananList");
    const deskripsiEl = document.getElementById("deskripsi");

    if (!container || !deskripsiEl) return;

    const data = layananData[kategori];
    if (!data) return;

    // update deskripsi utama
    deskripsiEl.innerText = data.deskripsi;

    // reset list
    container.innerHTML = "";

    data.items.forEach(item => {
        container.innerHTML += `
            <div class="layanan-item">
                <div class="layanan-header">
                    <span>${item.title}</span>
                    <span class="icon">></span>
                </div>
                <div class="layanan-body">
                    ${renderDesc(item.desc)}
                </div>
            </div>
        `;
    });

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
            title: "CV BILLY",
            file: "/files/CV_Billy Alexander.pdf",
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
    initSearch();                // search
    initSocialTrigger();          // sosial media sticky
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
