"use strict";
/**
 * Program TypeScript CLI Interaktif - Self-Service Londri Dewe 24 Jam
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
function tanya(rl, pertanyaan) {
    return new Promise((resolve) => rl.question(pertanyaan, resolve));
}
function tampilkanErrorKosong(namaVariabel) {
    console.log(`\n[ERROR] Variabel "${namaVariabel}" tidak ditemukan (input kosong).`);
    console.log("Program dihentikan. Silakan jalankan ulang dan isi semua data.\n");
}
async function jalankanProgramLaundry() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    console.log("==================================================");
    console.log("   SELAMAT DATANG DI LONDRI DEWE KALPATARU 24 JAM ");
    console.log("==================================================\n");
    try {
        const nama = (await tanya(rl, "Masukkan Nama Pelanggan: ")).trim();
        if (nama === "") {
            tampilkanErrorKosong("nama pelanggan");
            return;
        }
        console.log("\nPilih Jenis Layanan:");
        console.log("1. Cuci Saja (Rp 10.000 / mesin)");
        console.log("2. Keringkan Saja (Rp 10.000 / mesin)");
        console.log("3. Paket Cuci & Keringkan (Rp 20.000 / mesin)");
        const pilihanStr = (await tanya(rl, "Masukkan pilihan layanan (1 / 2 / 3): ")).trim();
        if (pilihanStr === "") {
            tampilkanErrorKosong("pilihan layanan");
            return;
        }
        const beratStr = (await tanya(rl, "Masukkan berat cucian (dalam kg): ")).trim();
        if (beratStr === "") {
            tampilkanErrorKosong("berat cucian");
            return;
        }
        const jamStr = (await tanya(rl, "Masukkan jam transaksi (Format 24 jam, contoh: 14 atau 3): ")).trim();
        if (jamStr === "") {
            tampilkanErrorKosong("jam transaksi");
            return;
        }
        const pilihanLayanan = parseInt(pilihanStr);
        const beratCucianKg = parseFloat(beratStr.replace(",", "."));
        const jamTransaksi = parseInt(jamStr);
        prosesPerhitunganLaundry({
            namaPelanggan: nama,
            pilihanLayanan: isNaN(pilihanLayanan) ? 1 : pilihanLayanan,
            beratCucianKg: isNaN(beratCucianKg) || beratCucianKg <= 0 ? 1 : beratCucianKg,
            jamTransaksi: isNaN(jamTransaksi) || jamTransaksi < 0 || jamTransaksi > 23 ? 12 : jamTransaksi,
        });
    }
    finally {
        rl.close();
    }
}
function prosesPerhitunganLaundry(data) {
    const KAPASITAS_MAX_MESIN = 10;
    const TARIF_CUCI_NORMAL = 10000;
    const TARIF_KERING_NORMAL = 10000;
    let tarifPerMesinNormal = 0;
    let namaLayanan = "";
    let keteranganTarif = "";
    const jumlahMesin = Math.max(1, Math.ceil(data.beratCucianKg / KAPASITAS_MAX_MESIN));
    switch (data.pilihanLayanan) {
        case 1:
            namaLayanan = "Cuci Saja (Self-Service)";
            tarifPerMesinNormal = TARIF_CUCI_NORMAL;
            break;
        case 2:
            namaLayanan = "Keringkan Saja (Self-Service)";
            tarifPerMesinNormal = TARIF_KERING_NORMAL;
            break;
        case 3:
            namaLayanan = "Cuci & Keringkan (Paket Self-Service)";
            tarifPerMesinNormal = TARIF_CUCI_NORMAL + TARIF_KERING_NORMAL;
            break;
        default:
            namaLayanan = "Cuci Saja (Default)";
            tarifPerMesinNormal = TARIF_CUCI_NORMAL;
            break;
    }
    let tarifPerMesinFinal = 0;
    if (data.jamTransaksi >= 0 && data.jamTransaksi <= 7) {
        tarifPerMesinFinal = tarifPerMesinNormal * 0.5;
        keteranganTarif = "Tarif Khusus Shift Malam/Pagi (Diskon 50% dari Normal)";
    }
    else {
        tarifPerMesinFinal = tarifPerMesinNormal;
        keteranganTarif = "Tarif Normal Reguler";
    }
    const totalBayar = tarifPerMesinFinal * jumlahMesin;
    console.log("\n==================================================");
    console.log("       STRUK TRANSAKSI LONDRI DEWE 24 JAM         ");
    console.log("==================================================");
    console.log(`Nama Pelanggan    : ${data.namaPelanggan}`);
    console.log(`Berat Cucian      : ${data.beratCucianKg} kg`);
    console.log(`Kebutuhan Mesin   : ${jumlahMesin} Unit (Maks. 10 kg / mesin)`);
    console.log(`Jenis Layanan     : ${namaLayanan}`);
    console.log(`Jam Transaksi     : Pukul ${data.jamTransaksi}:00 WIB`);
    console.log(`Tarif Normal      : Rp ${tarifPerMesinNormal.toLocaleString("id-ID")} / mesin`);
    console.log(`Keterangan Waktu  : ${keteranganTarif}`);
    console.log("--------------------------------------------------");
    console.log(`Tarif Dikenakan   : Rp ${tarifPerMesinFinal.toLocaleString("id-ID")} / mesin`);
    console.log(`Total Bayar       : Rp ${totalBayar.toLocaleString("id-ID")}`);
    console.log("==================================================\n");
}
jalankanProgramLaundry();
