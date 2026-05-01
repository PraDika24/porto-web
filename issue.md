# Bug: ParticlesBg Tidak Terlihat di Mobile Maupun Desktop

## Deskripsi Bug
Komponen `ParticlesBg` berhasil di-render tanpa error (build berhasil, tidak ada console error), namun partikel **tidak terlihat sama sekali** di layar — baik di desktop maupun mobile.

## Root Cause Analysis

Bug ini disebabkan oleh **2 masalah berlapis** pada CSS:

### Masalah 1 — `main-content` menutupi partikel
Di file `globals.css`, class `.main-content` memiliki:
```css
.main-content {
  background-color: var(--bg-primary);  /* ← OPAQUE, menutupi partikel */
}
```
Background ini **solid/opaque** (tidak transparan). Karena `.main-content` berada di lapisan di atas partikel, ia **menutupi seluruh area partikel** sehingga tidak terlihat.

### Masalah 2 — Negative z-index (`-z-10`)
Wrapper `ParticlesBg` menggunakan class `-z-10` yang menempatkan partikel di **belakang** elemen `body`. Dengan `body` juga memiliki `background-color: var(--bg-primary)` yang opaque, partikel menjadi **double-covered** — tertutup oleh body DAN oleh main-content.

## Daftar Perbaikan (To-Do List)

### 1. Fix CSS — Ubah `main-content` Agar Transparan
- [ ] Di file `src/app/globals.css`, ubah background `.main-content` dari `var(--bg-primary)` menjadi `transparent`:
  ```css
  .main-content {
    padding-top: 56px;
    min-height: 100vh;
    background-color: transparent;  /* ← PERBAIKAN: partikel terlihat tembus */
    transition: background-color 0.3s ease;
  }
  ```
- [ ] Pastikan `body` tetap mempertahankan `background-color: var(--bg-primary)` sebagai warna dasar halaman.

### 2. Fix z-index — Ganti Dari Negatif ke Nol
- [ ] Di file `src/components/ParticlesBg.tsx`, ubah class wrapper dari `-z-10` menjadi `z-0`:
  ```tsx
  // SEBELUM (salah)
  <div key={theme} className="fixed inset-0 -z-10 select-none">
  
  // SESUDAH (benar)
  <div key={theme} className="fixed inset-0 z-0 select-none">
  ```
  Ini menempatkan partikel di lapisan dasar (z-index 0) — di atas body background, namun di bawah konten.

### 3. Pastikan Konten Berada Di Atas Partikel
- [ ] Verifikasi bahwa elemen-elemen utama memiliki z-index yang lebih tinggi dari partikel:
  - `.topbar` sudah menggunakan `z-30` ✅
  - `.sidebar-panel` sudah menggunakan `z-50` ✅
  - `.main-content` perlu ditambahkan `position: relative` dan `z-index: 1` agar konten halaman berada di atas partikel:
    ```css
    .main-content {
      position: relative;
      z-index: 1;
      padding-top: 56px;
      min-height: 100vh;
      background-color: transparent;
      transition: background-color 0.3s ease;
    }
    ```

## File Yang Perlu Diubah
1. `src/app/globals.css` — ubah `.main-content` background dan tambahkan z-index
2. `src/components/ParticlesBg.tsx` — ubah `-z-10` menjadi `z-0`

## Cara Verifikasi
- [ ] Buka halaman Home di browser (desktop & mobile)
- [ ] Pastikan partikel terlihat bergerak di belakang konten teks dan tombol
- [ ] Pastikan partikel menyesuaikan warna dengan tema aktif (gelap/terang)
- [ ] Pastikan klik dan hover mouse mempengaruhi partikel (attract/repulse)
- [ ] Pastikan konten utama (teks, tombol) masih bisa diklik dan tidak tertutup partikel
