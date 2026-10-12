/* =========================================
   WIB - Waktunya Indonesia Biologi
========================================= */

// ===== PENGATURAN =====
const R = 15, C = 18;
const JUMLAH_TIM = 5;
const POIN = 10;

// ===== DAFTAR FOTO KARAKTER DI DALAM GAME =====
const FOTO_DEFAULT = "WhatsApp_Image_2026-10-12_at_13.54.33-removebg-preview.png"; // Foto nempel di game
const FOTO_SALAH   = "WhatsApp_Image_2026-10-12_at_13.54.29-removebg-preview.png"; // Foto saat salah (silang tangan)
const FOTO_BENAR   = "WhatsApp_Image_2026-10-12_at_13.54.29__1_-removebg-preview.png"; // Foto saat benar / selesai soal
const FOTO_HINT    = "WhatsApp_Image_2026-10-12_at_13.54.30-removebg-preview.png"; // Foto saat tombol petunjuk diklik

let fotoModeHint = false; // Status apakah sedang menampilkan mode petunjuk

// Fungsi pembantu untuk animasi ganti foto perlahan (Fade In & Fade Out)
function triggerGameChar(newSrc, duration = 2000) {
  const imgEl = document.getElementById("game-char");
  if (!imgEl) return;

  // Fade out
  imgEl.style.opacity = "0";

  setTimeout(() => {
    imgEl.src = newSrc;
    // Fade in
    imgEl.style.opacity = "1";

    // Jika bukan mode hint, kembalikan ke foto default setelah durasi tertentu
    if (newSrc !== FOTO_HINT && !fotoModeHint) {
      setTimeout(() => {
        imgEl.style.opacity = "0";
        setTimeout(() => {
          imgEl.src = FOTO_DEFAULT;
          imgEl.style.opacity = "1";
        }, 300);
      }, duration);
    }
  }, 300);
}

// ===== DAFTAR SOAL =====
const W = [
  ["JARINGAN",7,3,"A",9,"Kumpulan sel yang memiliki struktur dan fungsi serupa serta bekerja sama menjalankan tugas tertentu disebut apa?","Jaringan adalah kumpulan sel yang bekerja sama menjalankan fungsi tertentu. Pada hewan, jaringan dasar meliputi jaringan epitel, ikat, otot, dan saraf."],
  ["LAMBUNG",6,4,"D",8,"Organ pencernaan yang mengaduk makanan dan mencampurnya dengan asam lambung serta enzim untuk membantu pencernaan protein disebut apa?","Lambung melakukan pencernaan mekanik melalui gerakan otot dan pencernaan kimiawi menggunakan asam lambung serta enzim pepsin. Pepsin berfungsi memecah protein menjadi bagian yang lebih kecil."],
  ["JANTUNG",5,7,"D",6,"Organ yang memompa darah menuju paru-paru dan seluruh tubuh dalam sistem peredaran darah disebut apa?","Jantung berfungsi memompa darah ke seluruh tubuh. Jumlah ruang jantung berbeda pada setiap kelompok hewan: ikan memiliki dua ruang, amfibi umumnya tiga ruang, sedangkan burung dan mamalia memiliki empat ruang."],
  ["ALVEOLUS",7,9,"D",10,"Kantong udara kecil di paru-paru yang menjadi tempat pertukaran oksigen dan karbon dioksida disebut apa?","Alveolus merupakan tempat pertukaran gas di paru-paru. Oksigen berdifusi dari alveolus ke darah, sedangkan karbon dioksida berdifusi dari darah ke alveolus untuk dikeluarkan saat mengembuskan napas."],
  ["ERITROSIT",10,9,"A",12,"Apa nama sel darah merah yang mengandung hemoglobin dan berfungsi utama mengangkut oksigen ke jaringan tubuh?","Eritrosit atau sel darah merah mengandung hemoglobin yang mengikat oksigen. Sel ini membantu mengangkut oksigen dari paru-paru menuju jaringan tubuh melalui aliran darah."],
  ["INSANG",11,0,"A",15,"Organ pernapasan ikan yang berfungsi mengambil oksigen terlarut dari air dan melepaskan karbon dioksida disebut apa?","Insang merupakan organ pernapasan ikan. Pertukaran gas terjadi antara air dan darah pada permukaan insang. Pada banyak ikan, aliran air berlawanan arah dengan aliran darah sehingga pertukaran oksigen berlangsung efektif."],
  ["INSULIN",1,10,"D",3,"Hormon yang membantu menurunkan kadar gula darah dengan meningkatkan penyerapan glukosa oleh sel disebut apa?","Insulin dihasilkan oleh sel beta pada pankreas. Hormon ini membantu glukosa masuk ke sel dan mendukung penyimpanan glukosa sehingga kadar gula darah dapat menurun."],
  ["KAPILER",4,13,"D",5,"Pembuluh darah kecil berdinding tipis yang menjadi tempat pertukaran oksigen, zat makanan, dan zat sisa antara darah dan jaringan disebut apa?","Kapiler adalah pembuluh darah berukuran sangat kecil dengan dinding tipis. Struktur ini memungkinkan pertukaran gas, zat makanan, dan zat sisa antara darah dan jaringan tubuh."],
  ["ORGAN",10,14,"D",13,"Tingkat organisasi kehidupan yang terbentuk dari beberapa jaringan berbeda yang bekerja sama menjalankan fungsi tertentu disebut apa?","Organ adalah kumpulan beberapa jenis jaringan yang bekerja sama menjalankan fungsi tertentu. Contohnya adalah jantung, lambung, paru-paru, dan ginjal."],
  ["ESOFAGUS",14,2,"A",16,"Saluran yang menghubungkan faring dengan lambung dan mendorong makanan melalui gerakan peristaltik disebut apa?","Esofagus atau kerongkongan merupakan bagian saluran pencernaan yang menghubungkan faring dengan lambung. Gerakan peristaltik pada dinding esofagus membantu mendorong makanan menuju lambung."],
  ["HOMEOSTASIS",0,15,"D",1,"Proses yang menjaga kondisi internal tubuh, seperti suhu dan kadar gula darah, agar tetap stabil disebut apa?","Homeostasis adalah kemampuan tubuh mempertahankan kestabilan kondisi internal meskipun lingkungan berubah. Proses ini antara lain mengatur suhu tubuh, kadar gula darah, dan keseimbangan cairan."],
  ["PANKREAS",3,3,"A",4,"Organ yang menghasilkan enzim pencernaan serta hormon insulin dan glukagon untuk mengatur kadar gula darah disebut apa?","Pankreas memiliki dua fungsi utama. Fungsi eksokrin menghasilkan enzim pencernaan, sedangkan fungsi endokrin menghasilkan hormon, termasuk insulin dan glukagon, yang membantu mengatur kadar gula darah."],
  ["GINJAL",9,11,"D",11,"Organ yang menyaring darah, membuang zat sisa melalui urine, serta mengatur keseimbangan air dan elektrolit disebut apa?","Ginjal menyaring darah dan membantu membuang zat sisa metabolisme melalui urine. Ginjal juga mengatur keseimbangan air dan elektrolit serta menghasilkan hormon seperti eritropoietin dan renin."],
  ["NEFRON",6,1,"D",7,"Unit struktural dan fungsional ginjal yang berperan dalam penyaringan darah dan pembentukan urine disebut apa?","Nefron merupakan unit fungsional ginjal. Di dalamnya berlangsung proses filtrasi, reabsorpsi, dan sekresi yang berperan dalam pembentukan urine."],
  ["TIMUS",10,17,"D",14,"Organ yang menjadi tempat pematangan limfosit T dalam sistem kekebalan tubuh disebut apa?","Timus berperan dalam sistem kekebalan tubuh. Organ ini menjadi tempat pematangan limfosit T, yaitu sel yang berperan dalam respons imun untuk melawan zat asing."],
  ["ADRENALIN",1,3,"A",2,"Hormon yang membantu tubuh menghadapi keadaan darurat dengan meningkatkan kesiagaan dan denyut jantung disebut apa?","Adrenalin dihasilkan oleh medula kelenjar adrenal. Hormon ini membantu tubuh merespons stres atau keadaan darurat dengan meningkatkan kesiagaan, denyut jantung, dan ketersediaan energi."]
];

// ===== MEMBUAT PAPAN =====
const g = document.getElementById("grid");
const cells = {};
const shown = new Set();

let sel = -1;
let animTimer = null;
let animToken = 0;

const wrong = new Set();

g.style.gridTemplateColumns = `repeat(${C}, var(--s))`;

W.forEach((w, i) => {
  for (let k = 0; k < w[0].length; k++) {
    const r = w[1] + (w[3] === "D" ? k : 0);
    const c = w[2] + (w[3] === "A" ? k : 0);
    const key = r + "," + c;

    if (!cells[key]) {
      cells[key] = {
        ch: w[0][k],
        ws: [],
        num: 0,
        r,
        c
      };
    }

    cells[key].ws.push(i);

    if (k === 0) {
      cells[key].num = w[4];
    }
  }
});

for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    const d = document.createElement("div");
    const o = cells[r + "," + c];

    if (!o) {
      d.className = "c e";
    } else {
      d.className = "c";
      d.id = "c" + r + "_" + c;

      d.innerHTML =
        (o.num ? `<i>${o.num}</i>` : "") +
        `<b>${o.ch}</b>`;

      d.onclick = () => {
        const cur = o.ws.indexOf(sel);
        pilih(o.ws[(cur + 1) % o.ws.length]);
      };
    }

    g.appendChild(d);
  }
}

// ===== NOMOR SOAL =====
const chips = document.getElementById("chips");

[...W.keys()]
  .sort((a, b) => W[a][4] - W[b][4])
  .forEach(i => {
    const b = document.createElement("button");

    b.className = "chip";
    b.id = "h" + i;
    b.textContent =
      W[i][4] + (W[i][3] === "A" ? " →" : " ↓");

    b.onclick = () => pilih(i);

    chips.appendChild(b);
  });

// ===== PAPAN SKOR TIM =====
const T = document.getElementById("teams");
const pts = new Array(JUMLAH_TIM + 1).fill(0);

for (let i = 1; i <= JUMLAH_TIM; i++) {
  const d = document.createElement("div");

  d.className = "t";

  d.innerHTML = `
    <span contenteditable="true">Tim ${i}</span>
    <em id="s${i}">0</em>
    <br>
    <button class="g" onclick="sc(${i},-${POIN})">−</button>
    <button onclick="sc(${i},${POIN})">+${POIN}</button>
  `;

  T.appendChild(d);
}

function sc(i, n) {
  pts[i] = Math.max(0, pts[i] + n);
  document.getElementById("s" + i).textContent = pts[i];
}

// ===== DAFTAR KOTAK MILIK SATU SOAL =====
function wc(i) {
  const w = W[i];

  return [...w[0]].map((_, k) =>
    (w[1] + (w[3] === "D" ? k : 0)) +
    "," +
    (w[2] + (w[3] === "A" ? k : 0))
  );
}

// ===== MENGHENTIKAN ANIMASI =====
function stopReveal() {
  animToken++;

  if (animTimer !== null) {
    clearInterval(animTimer);
    animTimer = null;
  }
}

// ===== MEMILIH SOAL =====
function pilih(i) {
  if (i < 0 || i >= W.length) return;

  stopReveal();
  sel = i;

  // Setiap kali pindah soal, kembalikan foto ke default / reset mode hint
  fotoModeHint = false;
  const imgEl = document.getElementById("game-char");
  if (imgEl && imgEl.src.includes("WhatsApp_Image_2026-10-12_at_13.54.30")) {
    imgEl.src = FOTO_DEFAULT;
  }

  const w = W[i];

  document.querySelectorAll(".c.w")
    .forEach(x => x.classList.remove("w"));

  wc(i).forEach(k => {
    const el = document.getElementById(
      "c" + k.replace(",", "_")
    );

    if (el) el.classList.add("w");
  });

  document.querySelectorAll(".chip")
    .forEach(x => x.classList.remove("on"));

  document.getElementById("h" + i).classList.add("on");

  document.getElementById("cn").textContent =
    `${w[4]} ${
      w[3] === "A" ? "MENDATAR →" : "MENURUN ↓"
    } (${w[0].length} huruf)`;

  document.getElementById("cl").textContent = w[5];

  refresh();
}

// ===== MEMPERBARUI TAMPILAN =====
function refresh() {
  shown.forEach(k => {
    const el = document.getElementById(
      "c" + k.replace(",", "_")
    );

    if (el) el.classList.add("v");
  });

  let semuaTerjawabSebelumnya = true;
  W.forEach((w, i) => {
    const chip = document.getElementById("h" + i);

    if (wc(i).every(k => shown.has(k))) {
      if (!chip.classList.contains("d")) {
        // Jika soal ini baru saja komplit/terjawab benar
        if (i === sel) {
          triggerGameChar(FOTO_BENAR, 2500);
        }
      }
      chip.classList.add("d");
    } else {
      chip.classList.remove("d");
      if (i === sel) semuaTerjawabSebelumnya = false;
    }
  });

  const ex = document.getElementById("ex");

  if (sel >= 0 && wc(sel).every(k => shown.has(k))) {
    ex.style.display = "block";
    ex.innerHTML =
      "<b>" + W[sel][0] + "</b><br>" + W[sel][6];
  } else {
    ex.style.display = "none";
    ex.textContent = "";
  }

  // Hapus efek merah sebelumnya
  document.querySelectorAll(".c.x")
    .forEach(el => el.classList.remove("x"));

  // Terapkan efek merah pada soal yang sedang dipilih
  if (sel >= 0 && wrong.has(sel)) {
    wc(sel).forEach(k => {
      const el = document.getElementById(
        "c" + k.replace(",", "_")
      );

      if (el) el.classList.add("x");
    });
  }
}

// ===== TOMBOL SALAH =====
let timerTetot = null;

function salah() {
  if (sel < 0) {
    document.getElementById("cn").textContent =
      "Pilih nomor soal terlebih dahulu!";
    return;
  }

  // Panggil animasi foto salah (muncul & hilang perlahan)
  triggerGameChar(FOTO_SALAH, 2000);

  const kotak = wc(sel);

  if (timerTetot !== null) {
    clearTimeout(timerTetot);
    timerTetot = null;
  }

  const elemen = kotak
    .map(k => document.getElementById("c" + k.replace(",", "_")))
    .filter(el => el);

  elemen.forEach(el => el.classList.remove("tetot"));

  void document.getElementById(
    "c" + kotak[0].replace(",", "_")
  ).offsetWidth;

  elemen.forEach(el => el.classList.add("tetot"));

  timerTetot = setTimeout(() => {
    elemen.forEach(el => el.classList.remove("tetot"));
    timerTetot = null;
  }, 450);
}

document.addEventListener("keydown", function(event) {
  if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;
  if (event.target.isContentEditable) return;

  const key = event.key.toLowerCase();

  if (key === "s") {
    event.preventDefault();
    salah();
  }

  if (key === "b") {
    event.preventDefault();
    ans();
  }
});


// ===== PETUNJUK: BUKA SATU HURUF =====
function hint() {
  if (sel < 0) return;

  stopReveal();

  // Saat tombol petunjuk diklik, ubah foto menjadi foto petunjuk secara permanen sampai pindah soal
  fotoModeHint = true;
  triggerGameChar(FOTO_HINT, 0); // Durasi 0 artinya tetap tampil sampai ganti soal

  const k = wc(sel).find(k => !shown.has(k));

  if (k) shown.add(k);

  refresh();
}

// ===== JAWABAN: BUKA HURUF BERTAHAP =====
function ans() {
  if (sel < 0) return;

  stopReveal();

  const token = animToken;
  const keys = wc(sel).filter(k => !shown.has(k));

  let index = 0;

  if (keys.length === 0) {
    refresh();
    return;
  }

  animTimer = setInterval(() => {
    if (token !== animToken) {
      clearInterval(animTimer);
      animTimer = null;
      return;
    }

    if (index >= keys.length) {
      clearInterval(animTimer);
      animTimer = null;
      refresh();
      // Munculkan foto benar saat jawaban terbuka penuh
      triggerGameChar(FOTO_BENAR, 2500);
      return;
    }

    shown.add(keys[index]);
    index++;

    refresh();
  }, 170);
}

// ===== RESET SEMUA JAWABAN =====
function rst() {
  if (!confirm("Reset semua jawaban?")) return;

  stopReveal();

  shown.clear();
  wrong.clear();
  fotoModeHint = false;

  const imgEl = document.getElementById("game-char");
  if (imgEl) imgEl.src = FOTO_DEFAULT;

  document.querySelectorAll(".v, .x")
    .forEach(el => {
      el.classList.remove("v", "x");
    });

  refresh();
}

// ===== FOCUS EVENT =====
document.addEventListener("pointerdown", function(event) {
  const active = document.activeElement;

  if (
    active &&
    active.isContentEditable &&
    !active.contains(event.target)
  ) {
    active.blur();
  }
});

// ===== UKURAN KOTAK OTOMATIS =====
function fit() {
  const nar = innerWidth <= 800;

  const s = Math.floor(Math.min(
    (innerWidth * (nar ? 0.96 : 0.6)) / C,
    nar ? 99 : (innerHeight - 70) / R
  ));

  document.documentElement.style.setProperty(
    "--s",
    Math.max(s, 16) + "px"
  );
}

addEventListener("resize", fit);
fit();

// ===== TOMBOL MULAI =====
document.getElementById("go").onclick = () => {
  document.getElementById("intro").style.display = "none";
};