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
        deskripsi: "Layanan sirkulasi adalah layanan untuk administrasi peminjaman, perpanjangan, pengembalian buku, pendaftaran keanggotaan, penerbitan surat bebas pustaka dan penyerahan tugas akhir atau karya ilmiah bagi mahasiswa yang menyelesaikan kuliah, cuti kuliah, mengundurkan diri.",
        items: [
            {
                title: "Peminjaman Buku",
                desc: {
                    type: "mix",
                    text: "Proses peminjaman buku",
                    src: "/image/peminjaman_buku.jpg",
                }
            },
            {
                title: "Perpanjangan Buku",
                desc: {
                    type: "mix",
                    text: "Proses perpanjangan buku",
                    src: "/image/perpanjangan_buku.jpg"
                }
            },
            {
                title: "Pengembalian Buku",
                desc: {
                    type: "mix",
                    text: "Proses pengembalian buku",
                    src: "/image/pengembalian_buku.jpg"
                }
            },
            {
                title: "Peminjaman Komputer",
                desc: {
                    type: "mix",
                    text: "Proses peminjaman komputer",
                    src: "/image/peminjaman_komputer.jpg"
                }
            },
            {
                title: "Peminjaman Ruang Diskusi",
                desc: {
                    type: "mix",
                    text: "Proses peminjaman ruang diskusi",
                    src: "/image/peminjaman_ruangdiskusi.jpg"
                }
            }
        ]
    },

    referensi: {
        deskripsi: " Layanan referensi adalah layanan yang diberikan untuk membantu pemustaka menemukan informasi yang diperlukan dengan menjawab pertanyaan menggunakan koleksi referensi yang dimiliki Perpustakaan UPNVJ, serta memberikan bimbingan kepada pemustaka untuk menemukan koleksi referesi yang dibutuhkan.",
        items: [
            {
                title: "Rekomendasi Buku",
                desc: {
                    type: "mix",
                    text: "Informasi rekomendasi buku.",
                    src: "/image/rekomendasi_buku.jpg"
                }
            },
            {
                title: "Ulasan Buku",
                desc: {
                    type: "mix",
                    text: "Informasi ringkasan dan evaluasi isi buku.",
                    src: "/image/ulasan_buku.jpg"
                }
            }
        ]
    },

    digital: {
        deskripsi: "Layanan digital adalah layanan yang disediakan UPA. Perpustakaan meliputi koleksi elektronik seperti Jurnal, Prosiding, E-Paper, E-Megazine yang dapat diakses (full text) baik yang diterbitkan oleh UPNVJ maupun yang diterbitkan penerbit lainnya",
        items: [
            {
                title: "E-Paper Magazine",
                desc: {
                    type: "mix",
                    text: "E-Paper dan E-Megazine merupakan koleksi surat kabar dan majalah yang dilanggan oleh UPT. Perpustakaan dalam format elektronik (digital) yang dapat diakses dengan menggunakan komputer yang telah disediakan diruangan perpustakaan lantai 4.",
                    src: "/image/magazine.png",
                }
            },
            {
                title: "E-Journal",
                desc: {
                    type: "image",
                    src: "/image/journal.png",
                }
            },
            {
                title: "Prosiding",
                desc: {
                    type: "image",
                    src: "/image/prosiding.png",
                }
            }
        ]
    },

    pendidikan: {
        deskripsi: "Layanan pendidikan pengguna adalah layanan jasa pemanduan dari UPA. Perpustakaan yang memberikan ilmu keterampilan dan tata cara untuk menggunakan perpustakaan sehingga pemustaka lebih cepat, tepat, dan optimal dalam menggunakan perpustakaan.",
        items: [
            {
                title: "Pencarian Koleksi",
                desc: {
                    type: "mix",
                    text: "OPAC (Untuk Pencarian Koleksi Lebih Cepat)",
                    src: "/image/pencarian_koleksi.jpg"
                }
            },
            {
                title: "Sosialisasi",
                desc: {
                    type: "image",
                    src: "/image/sosialisasi.jpg",
                }
            },
            {
                title: "Video Tutorial",
                desc: {
                    type: "image",
                    src: "/image/video_tutorial.jpg",
                }
            }
        ]
    },

    audiovisual: {
        deskripsi: "Layanan audio visual adalah koleksi berbentuk non buku seperti: CD/VCD, video, slide..",
        items: [
            {
                title: "Pemutaran Video",
                desc: {
                    type: "text",
                    content: "Fasilitas untuk menonton materi pembelajaran berbasis video.",
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
            <h3>TATA TERTIB</h3>

<p><strong>Pada waktu masuk gedung/ruang UPT. Perpustakaan, pemustaka wajib:</strong></p>
<ul>
    <li>Mahasiswa membawa Kartu Tanda Mahasiswa yang masih berlaku;</li>
    <li>Dosen dan tenaga kependidikan membawa Kartu Identitas Pegawai;</li>
    <li>Masyarakat umum membawa KTP atau kartu identitas lainnya;</li>
    <li>Mengisi daftar hadir;</li>
    <li>Berpakaian rapi, sopan, dan bersepatu;</li>
    <li>Tidak makan, minum (kecuali air mineral), dan tidak merokok;</li>
    <li>Menyimpan tas di loker (kecuali barang berharga);</li>
</ul>

<p><strong>Selama di dalam perpustakaan, dilarang:</strong></p>
<ul>
    <li>Merusak, merobek, atau mencoret bahan pustaka;</li>
    <li>Merusak sarana dan prasarana;</li>
    <li>Mencoret peralatan atau dinding;</li>
    <li>Mengotori ruangan;</li>
    <li>Membawa keluar koleksi tanpa proses peminjaman;</li>
    <li>Membuat gaduh yang mengganggu;</li>
</ul>

<p><strong>Pada waktu keluar perpustakaan:</strong></p>
<ul>
    <li>Bersedia diperiksa oleh petugas;</li>
    <li>Menunjukkan bahan pustaka yang dibawa keluar;</li>
</ul>

<hr>

<h3>PERATURAN PEMINJAMAN, PERPANJANGAN, DAN PENGEMBALIAN</h3>

<p><strong>Koleksi yang boleh dipinjam:</strong></p>
<ul>
    <li>Buku teks: 7 hari;</li>
    <li>Peminjaman singkat: 1 hari;</li>
</ul>

<p><strong>Koleksi yang tidak boleh dipinjam:</strong></p>
<ul>
    <li>Referensi (kode R, label oranye: kamus, ensiklopedia, dll);</li>
    <li>Tugas akhir, skripsi, tesis, disertasi;</li>
    <li>Karya ilmiah sivitas akademika;</li>
    <li>Terbitan berseri (majalah, jurnal, koran);</li>
    <li>Koleksi tertentu yang dijaga (kecuali izin Kepala UPT);</li>
</ul>

<p>
Saat peminjaman, anggota wajib menunjukkan kartu identitas kepada petugas.
</p>

<p>
Perpanjangan hanya bisa dilakukan sebelum jatuh tempo.
</p>

<p>
Saat pengembalian, buku harus sesuai judul dan kondisi awal.
</p>

<hr>

<h3>SANKSI DAN PELANGGARAN</h3>

<ul>
    <li>Pemanfaatan koleksi berdasarkan prinsip keadilan dan tanggung jawab;</li>
    <li>Terlambat 1 hari → tidak boleh meminjam selama 7 hari (berlaku kelipatan);</li>
    <li>Merusak/menghilangkan buku → wajib mengganti;</li>
    <li>Merusak saat penggunaan → wajib mengganti;</li>
    <li>Penyalahgunaan kartu menjadi tanggung jawab pemilik;</li>
    <li>Masih punya pinjaman → tidak bisa meminjam lagi;</li>
</ul>
        `
    },
    keanggotaan: {
        deskripsi: `
            <h3>KEANGGOTAAN</h3>

<p>
Seluruh sivitas akademika aktif UPN Veteran Jakarta secara otomatis menjadi anggota Perpustakaan UPNVJ.
</p>

<h3>HAK DAN KEWAJIBAN ANGGOTA</h3>

<p><strong>Hak peminjaman buku:</strong></p>
<ul>
    <li>
        Mahasiswa dapat meminjam maksimal 3 buku:
        <ul>
            <li>Buku teks: 7 hari;</li>
            <li>Koleksi peminjaman singkat: 1 hari;</li>
            <li>Dapat diperpanjang 1 kali untuk durasi yang sama;</li>
        </ul>
    </li>
    <li>
        Dosen dan tenaga kependidikan dapat meminjam maksimal 5 buku:
        <ul>
            <li>Buku teks: 14 hari;</li>
            <li>Koleksi peminjaman singkat: 1 hari;</li>
            <li>Dapat diperpanjang 1 kali untuk durasi yang sama;</li>
        </ul>
    </li>
    <li>
        Masyarakat umum hanya diperbolehkan membaca di dalam gedung perpustakaan sesuai ketentuan.
    </li>
</ul>

<p><strong>Kewajiban anggota:</strong></p>
<ul>
    <li>Mahasiswa yang cuti, mengundurkan diri, atau lulus wajib mengurus bebas pustaka;</li>
    <li>Mahasiswa lulus wajib menyerahkan Tugas Akhir, Skripsi, Tesis, dan Artikel Jurnal;</li>
    <li>Dosen dan tenaga kependidikan yang mengundurkan diri wajib mengurus bebas pustaka;</li>
    <li>Seluruh pemustaka wajib mematuhi peraturan perpustakaan;</li>
</ul>

<h3>CEK KEANGGOTAAN DAN BEBAS PUSTAKA</h3>

<p>
Anda dapat melihat status keanggotaan dan peminjaman buku melalui sistem yang tersedia.
Gunakan username dan password SIAKAD Anda untuk login.
</p>

<p><strong>Cek Status</strong></p>
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
