// Fungsi untuk memuat komponen dengan dukungan callback
function loadComponent(elementId, filePath, callback) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            
            // Jika ada fungsi tambahan (seperti inisialisasi menu), jalankan di sini
            if (callback) {
                callback();
            }
        })
        .catch(error => console.error(`Gagal memuat ${filePath}:`, error));
}

// Fungsi untuk mengaktifkan tombol menu mobile
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

// Fungsi untuk menandai menu aktif berdasarkan URL
function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('#desktop-menu a, #mobile-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        let isActive = false;
        
        if (href === '/') {
            isActive = currentPath === '/' || currentPath === '/index.html' || currentPath === '';
        } else {
            // Normalisasi path agar match, misal /projects dan /projects/
            const cleanPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
            const cleanHref = href.endsWith('/') ? href.slice(0, -1) : href;
            isActive = cleanPath === cleanHref || cleanPath.startsWith(cleanHref + '/');
        }
        
        if (isActive) {
            link.classList.remove('text-slate-300', 'hover:text-blue-400');
            link.classList.add('text-blue-400');
        } else {
            link.classList.remove('text-blue-400');
            link.classList.add('text-slate-300', 'hover:text-blue-400');
        }
    });
}

// Jalankan saat halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
    // Muat header, lalu jalankan fungsi inisialisasi menu dan active state
    loadComponent("header-placeholder", "/assets/header.html", () => {
        initMobileMenu();
        highlightActiveNav();
    });
    
    // Muat footer (menggunakan absolute path)
    loadComponent("footer-placeholder", "/assets/footer.html");
});