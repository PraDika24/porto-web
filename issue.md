# Feature Plan: Gamified Navigation & Theming (RPG Style)

## Deskripsi Tugas
Tugas ini bertujuan untuk mengimplementasikan sistem navigasi (Sidebar), theming (Dark/Light Mode), custom cursor, serta efek audio visual terintegrasi. Tujuannya adalah menciptakan pengalaman pengguna yang terasa seperti memainkan game RPG dengan estetika developer (NeoVim + Cyber style). Dokumen ini dirancang sebagai panduan high-level untuk diimplementasikan.

## Spesifikasi Kebutuhan

### 1. Navigasi Utama (Sidebar)
- **Fungsi**: Bertindak sebagai navigasi utama pada website portofolio.
- **Posisi & Layout**: Berada di sebelah kiri layar.
- **Kondisi Default**: *Hidden* (tersembunyi). Hanya menampilkan tombol toggle (hamburger/breadcrumb) di layar.
- **Kondisi Aktif**: Saat tombol toggle diklik, sidebar akan muncul dari kiri menggunakan efek animasi *slide-in* yang *smooth*.
- **Style Visual**: Desain harus mencerminkan antarmuka developer (seperti editor NeoVim dipadukan dengan gaya *cyberpunk*) yang mendukung konsep gamifikasi (RPG portfolio).
- **Brand**: Tampilkan nama website **PraDika.dev** di bagian atas sidebar atau navbar.

### 2. Daftar Menu Sidebar
Sidebar harus memuat daftar menu navigasi berikut:
1. Home
2. About Me
3. Skills
4. Projects
5. Activity
6. Terminal
7. Contact

### 3. Theming & Typography
- **Mode Tema**: Harus mendukung transisi antara Gelap (Dark Mode) dan Terang (Light Mode).
- **Typography Global**: Gunakan Font Monospace (direkomendasikan **Fira Code** atau **JetBrains Mono**).
- **Tombol Toggle Tema (Dark/Light Mode)**:
  - **Bentuk**: Bulat (*Round*).
  - **Posisi**: Berada di Top Navbar sebelah kanan atas (*Top Right*).

### 4. Efek Audio (SFX)
Untuk memperkuat nuansa game RPG, tambahkan efek suara (*sound effects*) yang akan diputar pada saat event berikut terjadi:
- Saat klik tombol toggle/hamburger (membuka sidebar).
- Saat klik tombol *close* (menutup sidebar).
- Saat klik salah satu menu navigasi di dalam sidebar.
- Saat klik tombol toggle DarkMode/LightMode.

### 5. Custom Cursor
- Ganti cursor bawaan sistem dengan cursor kustom yang terlihat unik (misalnya gaya pixel, crosshair, atau cyber).
- **Syarat Mutlak**: Cursor harus tetap *usable*, artinya *hitbox* atau titik kliknya harus akurat sehingga tidak menyulitkan pengguna saat berinteraksi dengan elemen UI.

---

## Panduan Implementasi (Tech Stack yang Digunakan)
Untuk yang akan mengimplementasikan fitur ini, gunakan stack yang sudah disiapkan di *project*:
- **Framer Motion**: Gunakan untuk menangani animasi *slide-in* sidebar dan transisi *smooth* antar halaman/tema.
- **use-sound**: Gunakan untuk *trigger* pemutaran audio/SFX pada interaksi tombol. (Siapkan aset audio pendek di folder `public/assets/sounds`).
- **Zustand**: Gunakan untuk menyimpan *global state* dari Sidebar (terbuka/tertutup).
- **Lucide React**: Gunakan sebagai sumber icon untuk tombol hamburger, tombol close, menu sidebar, dan ikon Dark/Light mode.
- **Tailwind CSS & clsx**: Gunakan untuk *styling*, mengatur transisi mode gelap/terang, dan membuat tombol membulat.
