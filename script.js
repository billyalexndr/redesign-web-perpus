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

            items.forEach(item => {
                const itemCategory = item.dataset.category;
                const parent = item.parentElement; // <-- ambil <a>

                if (category === 'all' || itemCategory === category) {
                    parent.style.display = "block"; // tampilkan <a>
                } else {
                    parent.style.display = "none"; // hide <a>
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
                    type: "image",
                   // text: "Proses peminjaman buku",
                    src: "/image/peminjaman_buku.jpg",
                }
            },
            {
                title: "Perpanjangan Buku",
                desc: {
                    type: "image",
                   // text: "Proses perpanjangan buku",
                    src: "/image/perpanjangan_buku.jpg"
                }
            },
            {
                title: "Pengembalian Buku",
                desc: {
                    type: "image",
                   // text: "Proses pengembalian buku",
                    src: "/image/pengembalian_buku.jpg"
                }
            },
            {
                title: "Peminjaman Komputer",
                desc: {
                    type: "image",
                   // text: "Proses peminjaman komputer",
                    src: "/image/peminjaman_komputer.jpg"
                }
            },
            {
                title: "Peminjaman Ruang Diskusi",
                desc: {
                    type: "image",
                   // text: "Proses peminjaman ruang diskusi",
                    src: "/image/peminjaman_ruangdiskusi.jpg"
                }
            }
        ]
    },

    referensi: {
        deskripsi: `
                <p>Layanan referensi adalah layanan yang diberikan untuk membantu pemustaka menemukan informasi yang diperlukan dengan menjawab pertanyaan menggunakan koleksi referensi yang dimiliki Perpustakaan UPNVJ, serta memberikan bimbingan kepada pemustaka untuk menemukan koleksi referesi yang dibutuhkan.</p>

                <p>Ada 2 metode yang tersedia pada pencarian katalog perpustakaan.</p>

                <ol>
                <li>
                    <strong>Pencarian Sederhana</strong>, yang merupakan metode paling sederhana pada pencarian katalog. Anda hanya memasukkan kata kunci apapun pada kotak pencarian sederhana yang disediakan, baik itu yang terkandung dalam judul dokumen, nama penulis atau subyek. Anda dapat menyediakan lebih dari satu kata kunci dan akan memperluas hasil pencarian Anda.
                </li>

                <li>
                    <strong>Pencarian Spesifik</strong>, memungkinkan Anda menentukan kata kunci di bidang yang lebih spesifik. Jika Anda ingin hanya berisi kata kunci dalam bidang Judul, maka sistem akan mencari berdasarkan Judul saja. Kolom lain seperti Pengarang, Subjek, ISBN/ISSN, GMD, Tipe Koleksi, dan Lokasi dapat digunakan untuk mempersempit hasil pencarian.
                </li>
                </ol>
                `,
        items: [
            {
                title: "Rekomendasi Buku",
                desc: {
                    type: "image",
                   // text: "Informasi rekomendasi buku.",
                    src: "/image/rekomendasi_buku.jpg"
                }
            },
            {
                title: "Ulasan Buku",
                desc: {
                    type: "image",
                   // text: "Informasi ringkasan dan evaluasi isi buku.",
                    src: "/image/ulasan_buku.jpg"
                }
            }
        ]
    },

    digital: {
        deskripsi: `
            <p>Layanan digital adalah layanan yang disediakan UPA. Perpustakaan meliputi koleksi elektronik seperti Jurnal, Prosiding, E-Paper, E-Megazine yang dapat diakses (full text) baik yang diterbitkan oleh UPNVJ maupun yang diterbitkan penerbit lainnya</p>

            <div style="text-align:center;">
            <img src="image/layanandigital.png" 
                alt="Katalog Perpustakaan" 
                style="max-width:60%; border-radius:8px; margin:15px 0;">
            </div>
            `,
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
                    src: "/image/ejurnal.png",
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
                    type: "image",
                   // text: "OPAC (Untuk Pencarian Koleksi Lebih Cepat)",
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
// DATA TATA TERTIB
// ===============================
const tatibData = {
    tatib: {
        deskripsi: `
            <h2 class="text-center">TATA TERTIB</h2>
            <hr style="border:none; height:3px; background:#458f54; width:250px; margin:10px auto; opacity:1;">

            <br>
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

            <br>
            <h2 class="text-center">PERATURAN PEMINJAMAN, PERPANJANGAN, DAN PENGEMBALIAN</h2>
            <hr style="border:none; height:3px; background:#458f54; width:1050px; margin:10px auto; opacity:1;">

            <br>
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

            <p>Saat peminjaman, anggota wajib menunjukkan kartu identitas kepada petugas.</p>
            <p>Perpanjangan hanya bisa dilakukan sebelum jatuh tempo.</p>
            <p>Saat pengembalian, buku harus sesuai judul dan kondisi awal.</p>

            <br>
            <h2 class="text-center">SANKSI DAN PELANGGARAN</h2>
            <hr style="border:none; height:3px; background:#458f54; width:500px; margin:10px auto; opacity:1;">

            <br>
            <p>Pemanfaatan koleksi yang dipinjam berdasarkan prinsip keadilan oleh petugas layanan dan prinsip pertanggungjawaban oleh peminjam;</p>
                <ol>
                    <li>Anggota yang terlambat mengembalikan buku dikenakan sanksi administrasi berupa larangan meminjam buku dengan rincian 1 (satu) hari tidak mengembalikan buku maka 7 (tujuh) hari tidak boleh meminjam buku, berlaku untuk kelipatan sanksi keterlambatan berikutnya;</li>
                    <li>Anggota yang merusak atau menghilangkan buku waktu dipinjam, wajib mengganti buku dengan judul yang sama atau judul yang sejenis;</li>
                    <li>Setiap Pemustaka yang merusak buku pada waktu digunakan wajib mengganti buku yang sesuai dengan judul;</li>
                    <li>Penyalahgunaan kartu anggota perpustakaan oleh pihak lain untuk peminjaman adalah tanggungjawab atas nama pemilik kartu tersebut;</li>
                    <li>Anggota yang masih mempunyai tanggungan peminjaman tidak dapat meminjam buku sebelum buku tersebut dikembalikan</li>
                </ol>
                        `
            },
        keanggotaan: {
        deskripsi: `
            <h2 class="text-center">KEANGGOTAAN</h2>
            <hr style="border:none; height:3px; background:#458f54; width:300px; margin:10px auto; opacity:1;">
            <br>

            <p>Seluruh sivitas akademika aktif UPN Veteran Jakarta secara otomatis menjadi anggota Perpustakaan UPNVJ.</p>
            <br> 

            <h2 class="text-center">HAK DAN KEWAJIBAN ANGGOTA</h2>
            <hr style="border:none; height:3px; background:#458f54; width:550px; margin:10px auto; opacity:1;">
            <br>

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

            <br>  
            <h2 class="text-center">CEK KEANGGOTAAN DAN BEBAS PUSTAKA</h2>
            <hr style="border:none; height:3px; background:#458f54; width:700px; margin:10px auto; opacity:1;">

            <br>
            <p class="text-center">
            Anda dapat melihat status keanggotaan dan peminjaman buku melalui sistem yang tersedia.
            Gunakan username dan password SIAKAD Anda untuk login.</p>

            <p class="text-center">
            <strong>
                    <a href="https://library.upnvj.ac.id/index.php?p=member" target="_blank" rel="noopener noreferrer"
                    style="color:#198754; text-decoration:none;">
                    Cek Status
                    </a>
            </strong>
            </p>
            <br>
                `
            }
        };

// ===============================
// DATA E-DOKUMEN
// ===============================
const edokumenData = {
    internal: [
        {
            title: "POB UPA. Perpustakaan Universitas Pembangunan Nasional “Veteran” Jakarta",
            file: "/docs/POB-PERPUSTAKAAN-UPNVJ-FULL-.pdf",
            category: "Internal",
            date: "24 October 2024"
        },
        {
            title: "Peraturan Rektor Tentang Wajib Serah Simpan Karya Ilmiah Sivitas Akademika UPN “Veteran” Jakarta (2019)",
            file: "/docs/peraturan_wajib_serah_simpan_ki (1).pdf",
            category: "Internal",
            date: "22 October 2024"
        },
        {
            title: "PANDUAN UNGGAH MANDIRI KARYA ILMIAH Karya Ilmiah Artikel Jurnal",
            file: "/docs/Buku Panduan Uggah Mandiri Karya Ilmiah Mahasiswa Bentuk Artikel Jurnal.pdf",
            category: "Internal",
            date: "28 Januari 2022"
        },
        {
            title: "Surat Edaran Rektor Tentang Pencegahan dan Penanggulangan Plagiat di Lingkungan UPN “Veteran” Jakarta (2019)",
            file: "docs/se_turnitin.pdf",
            category: "Internal",
            date: "21 September 2021"
        }
    ],
    eksternal: [
        {
            title: "Undang-Undang Nomor 43 Tahun 2007 Tentang Perpustakaan",
            file: "/docs/uu_no_43_2007.pdf",
            category: "Eksternal",
            date: "27 Februari 2025"
        }
    ]
};

// ===============================
// DATA FASILITAS
// ===============================
const fasilitasData = [
    {
        title: "Bahan Pustaka",
        desc: "Bahan pustaka tercetak terdiri atas buku teks, buku referensi, buku Koleksi Peminjaman Singkat (KPS), jurnal tercetak, majalah, koran.",
        img: "image/fasil_bahanpustaka.jpg"
    },
    {
        title: "Bahan Elektronik",
        desc: "Bahan elektronik/digital terdiri atas database jurnal (e-journal), buku elektronik (e-book), dan jurnal elektronik (artikel jurnal).",
        img: "image/fasil_bahanelektronik.jpg"
    },
    {
        title: "Komputer",
        desc: "Sarana yang dapat digunakan untuk mengakses sumber kepustakaan elektronik serta keperluan pemustaka mengerjakan tugas-tugas akademika lainnya.",
        img: "image/fasil_komputer.jpg"
    },
    {
        title: "OPAC",
        desc: "Online Public Access Catalog (OPAC) yaitu sarana untuk pencarian informasi atau bibliografi koleksi;",
        img: "image/fasil_opac.jpg"
    },
    {
        title: "Ruang Baca",
        desc: "Ruang yang digunakan untuk membaca berbagai koleksi yang tersedia",
        img: "image/fasil_ruangbaca.jpg"
    },
    {
        title: "Loker",
        desc: "Tempat untuk menyimpan tas/barang dan dilengkapi dengan kunci serta nomor pada loker.",
        img: "image/fasil_loker.jpg"
    },
    {
        title: "Tablet",
        desc: "Fasilitas yang dapat disediakan di dalam perpustakaan.",
        img: "image/fasil_tablet.jpg"
    },
    {
        title: "Mushola",
        desc: "Tempat yang nyaman untuk beribadah di lingkungan perpustakaan.",
        img: "image/fasil_mushola.jpeg"
    }
];

// ===============================
// DATA E-RESOURCES
// ===============================
const eResourcesData = {
    database_ejournal: {
      deskripsi: `
                <h4 class="text-center mb-4">Database E-Journal</h4>
                <hr style="border:none; height:3px; background:#458f54; width:250px; margin:10px auto; margin-top: -10px; opacity:1;">
                `,        
            items: [
            {
                title: "Wiley Online Library",
                img: "image/ejournal_wiley.png",
                link1: "https://library.upnvj.ac.id/pdf/info_perpus/panduan-e-journal-wiley-online-library-2024.pdf",
                link2: "https://onlinelibrary.wiley.com/"
            },
            {
                title: "Proquest Library",
                img: "image/ejournal_proquest.png",
                link1: "https://perpustakaan.upnvj.ac.id/wp-content/uploads/2025/09/Panduan-e-journal-Proquest-Library.pdf",
                link2: "https://www.proquest.com/"
            }
        ]
    },

    database_ebook: {
        deskripsi: `
                <h4 class="text-center mb-4">Database E-Book</h4>
                <hr style="border:none; height:3px; background:#458f54; width:250px; margin:10px auto; margin-top: -10px; opacity:1;">
                `,
        items: [
            {
                title: "Proquest Ebook Central",
                img: "image/ebook_proquest.png",
                link1: "https://perpustakaan.upnvj.ac.id/wp-content/uploads/2025/09/Panduan-ebook-central-proquest.pdf",
                link2: "https://ebookcentral.proquest.com/auth/lib/upnvjakarta/login.action?returnURL=https%3A%2F%2Febookcentral.proquest.com%2Flib%2Fupnvjakarta%2Fhome.action"
            },
            {
                title: "Wiley etext",
                img: "image/ebook_wiley.png",
                link1: "https://perpustakaan.upnvj.ac.id/wp-content/uploads/2025/09/Panduan-e-book-Wiley-Etext.pdf",
                link2: "https://wileysgp.ipublishcentral.net/explore"
            },
            {
                title: "Emerald Insight",
                img: "image/ebook_emerald.png",
                link1: "https://library.upnvj.ac.id/pdf/info_perpus/panduan-eresources/Panduan-e-journal-dan-e-book-emerald-insight-2024.pdf",
                link2: "https://www.emerald.com/"
            }
        ]
    },

    researchtools: {
        deskripsi: `
                <h4 class="text-center mb-4">Research Tools</h4>
                <hr style="border:none; height:3px; background:#458f54; width:250px; margin:10px auto; margin-top: -10px; opacity:1;">
                `,
        items: [
            {
                title: "Scopus",
                img: "image/research_scopus.png",
                link1: "https://library.upnvj.ac.id/pdf/info_perpus/Panduan-database-scopus-2024.pdf",
                link2: "https://www.scopus.com/pages/home"
            },
            {
                title: "Indonesia Onesearch",
                img: "image/research_onesearch.png",
                link1: "https://onesearch.id/"
            },
            {
                title: "RAMA REPOSITORY",
                img: "image/research_rama.png",
                link1: "https://rama.kemdikbud.go.id/#"
            },
            {
                title: "Turnitin",
                img: "image/research_turnitin.png",
                link1: "https://www.turnitin.com/"
            }
        ]
    },

    ourresources: {
        deskripsi: `
                <h4 class="text-center mb-4">Our Resources</h4>
                <hr style="border:none; height:3px; background:#458f54; width:250px; margin:10px auto; margin-top: -10px; opacity:1;">
                `,
        items: [
            {
                title: "E-Resources PERPUSNAS RI",
                img: "image/eresource_perpusnas.png",
                link1: "https://e-resources.perpusnas.go.id/assets/terbitan/panduan/1636954622_53e02575d553fd64d85c.pdf",
                link2: "https://e-resources.perpusnas.go.id/"
            },
            {
                title: "Repository Kemdikbud",
                img: "image/eresource_kemdikbud.png",
                link1: "http://repositori.kemdikbud.go.id/"
            },
            {
                title: "PIJAR OALIB UPI",
                img: "image/eresource_pijar.png",
                link1: "https://perpustakaan.upi.edu/pijar-oalib/"
            }
        ]
    }
};

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
                                <a href="${item.file}" class="btn btn-sm btn-download">
                                    Download
                                </a>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;

    initDownloadButton();
}

function initDownloadButton() {
    const buttons = document.querySelectorAll('.btn-download');

    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const fileUrl = this.getAttribute('href');

            fetch(fileUrl)
                .then(res => res.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);

                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileUrl.split('/').pop();
                    document.body.appendChild(a);
                    a.click();
                    a.remove();

                    window.URL.revokeObjectURL(url);
                });

            // active 
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
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
// RENDER ERESOURCE
// ===============================
function renderEResources(kategori) {
    const container = document.querySelector('.container.my-5');
    const deskripsiEl = document.getElementById('deskripsi');

    const data = eResourcesData[kategori];
    if (!data) return;

    // update deskripsi
    deskripsiEl.innerHTML = data.deskripsi;

    // delete old content
    const oldRow = document.getElementById('eresourceRow');
    if (oldRow) oldRow.remove();

    let html = `<div class="row g-4 mt-3 justify-content-center" id="eresourceRow">`;

    data.items.forEach(item => {

        // check button
        const hasSecondButton = item.link2 && item.link2 !== "";

        html += `
            <div class="col-12 col-sm-6 col-md-3 d-flex">
                <div class="card h-100 shadow-sm text-center p-3 w-100">
                    <img src="${item.img}" class="img-fluid mb-3" style="height:120px; object-fit:contain;">
                    
                    <h6 class="fw-bold">${item.title}</h6>

                    ${
                        hasSecondButton
                        ? `
                        <div class="d-flex justify-content-center gap-2 mt-2">
                            <a href="${item.link1}" target="_blank" class="btn btn-outline-success btn-sm">
                                Panduan
                            </a>
                            <a href="${item.link2}" target="_blank" class="btn btn-outline-success btn-sm">
                                Tautan
                            </a>
                        </div>
                        `
                        : `
                        <div class="d-flex justify-content-center mt-2">
                            <a href="${item.link1}" target="_blank" class="btn btn-outline-success btn-sm">
                                Tautan
                            </a>
                        </div>
                        `
                    }

                </div>
            </div>
        `;
    });

    html += `</div>`;

    container.insertAdjacentHTML('beforeend', html);
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

    deskripsiEl.innerHTML = data.deskripsi;

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
// CUSTOM ACCORDION (LAYANAN)
// ===============================
function initLayananAccordion() {
    const headers = document.querySelectorAll('.layanan-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;

            document.querySelectorAll('.layanan-item').forEach(i => {
                if (i !== item) i.classList.remove('active');
            });

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

    // first default 
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

    // default pertama
    renderEDokumen("internal");
}

// ===============================
// INIT FASILITAS
// ===============================
function initFasilitas() {
    const container = document.getElementById("fasilitasContainer");

    // jika bukan halaman fasilitas → stop
    if (!container) return;

    renderFasilitas();
}

// ===============================
// INIT KATEGORI LAYANAN
// ===============================
function initKategoriLayanan() {
    const buttons = document.querySelectorAll(".btn-layanan");

    buttons.forEach(button => {
        button.addEventListener("click", function () {

            const kategori = this.getAttribute("data-kategori");

            // reset active state button
            buttons.forEach(btn => {
                btn.classList.remove("active", "btn-dark");
                btn.classList.add("btn-outline-dark");
            });

            this.classList.add("active", "btn-dark");
            this.classList.remove("btn-outline-dark");

            // render based on kategori
            renderLayanan(kategori);
        });
    });
}

// ===============================
// INIT E-RESOURCES
// ===============================
function initEResource() {
    const buttons = document.querySelectorAll('.btn-eresource');
    if (!buttons.length) return; // ⬅️ penting!

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {

            const kategori = btn.dataset.kategori;

            buttons.forEach(b => {
                b.classList.remove('btn-dark', 'active');
                b.classList.add('btn-outline-dark');
            });

            btn.classList.add('btn-dark', 'active');
            btn.classList.remove('btn-outline-dark');

            renderEResources(kategori);
        });
    });

    const activeBtn = document.querySelector('.btn-eresource.active');
    if (activeBtn) {
        renderEResources(activeBtn.dataset.kategori);
    }
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
    initEResource();             // e-resource
    renderLayanan("sirkulasi"); // layanan sirkulasi
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
