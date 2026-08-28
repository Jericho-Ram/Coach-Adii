/**
 * Endpoint penangkap nomor WhatsApp untuk landing page Cek Form Gratis.
 * Gratis, tanpa server, tanpa akun tambahan — cukup Google Sheets.
 *
 * CARA PASANG (5 menit):
 * 1. Buka sheets.new, kasih nama misal "Cek Form Gratis — Leads".
 * 2. Menu Extensions → Apps Script. Hapus isinya, tempel seluruh file ini.
 * 3. Klik Deploy → New deployment → pilih tipe "Web app".
 *      Execute as        : Me
 *      Who has access    : Anyone
 *    Klik Deploy, izinkan aksesnya, lalu salin "Web app URL".
 * 4. Tempel URL itu ke FORM_ENDPOINT di index.html.
 * 5. Tes: isi form di landing page, cek barisnya muncul di Sheet.
 *
 * Kalau nanti mau ganti Sheet, ulangi Deploy → Manage deployments → Edit → New version.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Tulis header sekali saja
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Waktu', 'Nomor WhatsApp', 'Sumber', 'Sudah dibalas?', 'Jadi klien?', 'Catatan']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var p = (e && e.parameter) ? e.parameter : {};
    var nomor = String(p.wa || '').replace(/\D/g, '');
    if (!nomor) {
      return ContentService.createTextOutput('no number');
    }

    sheet.appendRow([
      new Date(),
      "'" + nomor,               // apostrof supaya angka 0 di depan nggak hilang
      p.sumber || 'landing-page',
      '',
      '',
      ''
    ]);

    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err);
  }
}

function doGet() {
  return ContentService.createTextOutput('Endpoint aktif.');
}
