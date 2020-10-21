exports.textRules = () => {
    return `
>>> *THE RULES!* <<<

1. Dilarang menyalahgunakan bot seperti menyebarkan hoax. Block permanent.
2. Dilarang spam. Warn atau block.
3. Dilarang ngajak call/video call. Auto block.
4. Gak usah ajak chat bot. Gak akan dibales.
5. Hanya menerima grup dengan member >= 20 orang. Kurang dari itu, bot akan keluar secara otomatis.

Ketik *$menu* untuk melihat list command.

Untuk request command, pertanyaan, kritik dan saran bisa chat owner:
wa.me/6281294958473

Terima kasih! 🙏

- Kal
    `
}

exports.donate = () => {
    return `
    🎉 *TERIMA KASIH!* 🎉

Merasa terbantu saat menggunakan bot ini? Atau sekedar kasihan sama owner yang jarang makan ini?
Kamu bisa merealisasikan perasaan itu dengan cara donasi! Uang yang kalian pakai akan saya gunakan untuk memperpanjang masa aktif bot dan sisanya buat makan.
Uang yang kalian pakai akan saya gunakan yang baik-baik kok.

Donasi yang didukung:
081294958473 (Telkomsel/OVO/GoPay)

Untuk request command, pertanyaan, kritik dan saran bisa chat owner:
wa.me/6281294958473

Terima kasih! 🙏

- Kal
    `
}

exports.textMenuAll = () => {
    return `
    ⚠️ *ALL COMMANDS* ⚠️

*ABAIKAN TANDA <>*
Downloader:
1. *$facebook*
Untuk megunduh foto atau video dari Facebook.
Aliases: *fb*
Penggunaan: *$facebook https://www.facebook.com/...*

2. *$instagram*
Untuk megunduh foto atau video dari Instagram.
Aliases: *ig*
Penggunaan: *$instagram https://www.instagram.com/p/...*

3. *$tiktok*
Untuk mengunduh video dari TikTok.
Aliases: -
Penggunaan: *$tiktok https://www.tiktok.com/@xxxxx/video/...*

4. *$twitter*
Untuk megunduh foto atau video dari Twitter.
Aliases: *twt*
Penggunaan: *$twitter https://www.twitter.com/xxxxx/status/...*

5. *$ytmp3*
Untuk mengkonversi video YouTube ke MP3. 50 MB limit.
Aliases: -
Penggunaan: *$ytmp3 https://youtu.be/9lBTqHdgerY*

6. *$ytmp4*
Untuk mengunduh video YouTube. 50 MB limit.
Aliases: -
Penggunaan: *$ytmp4 https://youtu.be/9lBTqHdgerY*

Sticker:
1. *$sticker*
Membuat custom sticker dari foto yang diberikan atau di-reply.
Aliases: *stiker*
Penggunaan: kirim gambar/link dengan caption *$sticker* atau balas gambar yang sudah dikirim dengan *$sticker*.

Fun:
1. *$ask*
Tanya tentang apa saja dan saya akan menjawab secara random.
Aliases: *8ball*
Penggunaan: *$ask* <pertanyaan>

2. *$bapack*
S4PI apHa YanG b1S4 nUL1S? sap1doL, XIX1X1Xi,,,,
Aliases: -
Penggunaan: *$bapack* <teks>

3. *$binary*
Ubah input teks mu ke dalam kode biner.
Aliases: *biner* - *bin*
Penggunaan: *$binary* <teks>

4. *$coinflip*
Lempar koin.
Aliases: *coin* - *flip*
Penggunaan: *$coinflip*

5. *$curse*
Bikin teks menjadi demonic style.
Aliases: -
Penggunaan: *$curse* <teks>

6. *$lenny*
( ͡° ͜ʖ ͡°)
Aliases: -
Penggunaan: *$lenny*

7. *$md5*
Enkripsi/hash teks mu ke MD5.
Aliases: -
Penggunaan: *$md5* <teks>

8. *$mocking*
iNi AdAlAh SeBuAh CoNtOh.
Aliases: *mock*
Penggunaan: *$mocking* <teks>

9. *$randomeme*
Kirim random meme dari reddit.
Aliases: *reddit*
Penggunaan: *$randomeme*

10. *$reverse*
.nasilut nikilaB
Aliases: - 
Penggunaan: *$reverse* <teks>

11. *$roll*
Roll angka.
Aliases: *dice*
Penggunaan: *$roll*

12. *$say*
It's just a say command, whatd'ya expect?
Aliases: *talk*
Penggunaan: *$say* <teks>

Utility:
1. *$brainly*
Cari jawaban di Brainly.
Aliases: -
Penggunaan: *$brainly* <soal> <.jumlah jawaban>

2. *$clock*
Cek waktu Indonesia sekitar.
Aliases: *waktu* - *jam*
Penggunaan: *$clock*

3. *$corona*
Mengirim data terkini COVID-19 di Indonesia.
Aliases: -
Penggunaan: *$corona*

4. *$cuaca*
Cek cuaca di lokasi yang diberikan.
Aliases: -
Penggunaan: *$cuaca* <daerah>

5. *$delete*
Hapus pesan yang saya kirim.
Aliases: *del*
Penggunaan: reply pesan yang mau dihapus lalu ketik command *$delete*

6. *$faq*
Pertanyaan yang sering diajukan.
Aliases: -
Penggunaan: *$faq*

7. *$infogempa*
Mengambil info gempa terkini dari BMKG.
Aliases: *gempa*
Penggunaan: *$infogempa*

8. *$igstalk*
Mengambil info akun Instagram dari username yang diberikan.
Aliases: *igs*
Penggunaan: *$igstalk* <username>

9. *$jadwalshalat*
Menampilkan jadwal shalat dari daerah yang diberikan.
Aliases: *jadwalsholat* - *shalat* - *sholat*
Penggunaan: *$jadwalshalat* <daerah>

10. *$menu*
Buka menu.
Aliases: *help* - *h*
Penggunaan: *$menu*

11. *$ping*
Cek kecepatan respon bot.
Alias: *speed* - *p*
Penggunaan: *$ping*

12. *$rules*
Baca peraturan bot!
Alias: *rule*
Penggunaan: *$rules*

13. *$server*
Cek spesifikasi server.
Aliases: -
Penggunaan: *$server*

14. *$status*
Untuk cek status bot.
Aliases: *stats*
Penggunaan: *$status*

15. *$toidr*
Konversikan kurensi luar negeri ke IDR.
Aliases: -
Penggunaan: *$toidr* <kurensi> <jumlah uang>

16. *$wikipedia*
Mencari apapun di Wikipedia.
Aliases: *wiki*
Penggunaan: *$wikipedia* <sesuatu>

Weeb Zone:
1. *$waifu*
Kirim foto waifu random.
Aliases: -
Penggunaan: *$waifu*

2. *$wait*
What anime is this? Identifikasi anime via foto.
Aliases: -
Penggunaan: kirim foto lalu tambahkan caption *$wait*
    `
}

exports.textMenu = () => {
    return `
    ⚠️ *DILARANG SPAM* ⚠️

            *LIST MENU*

*$menu1* = Downloader
*$menu2* = Sticker
*$menu3* = Fun
*$menu4* = Utility - *NEW UPDATE*
*$menu5* = Weeb Zone
*$menuall* = Tampilkan semua command
*$group* = Menu khusus grup - *NEW UPDATE*
*$donate* = Kasian bang ga ada duit
~_*$hidden*_~ = NSFW, jangan pake!

*COOLDOWN COMMAND 5 DETIK*

Untuk request command, pertanyaan, kritik dan saran bisa chat owner:
wa.me/6281294958473

Beliin saya nasi buat makan hari ini:
081294958473 (Telkomsel/OVO/GoPay)
    `
}

exports.textMenu1 = () => {
    return `
> _Menu Page 1_

Downloader:
1. *$facebook*
Untuk megunduh foto atau video dari Facebook.
Aliases: *fb*
Penggunaan: *$facebook https://www.facebook.com/...*

2. *$instagram*
Untuk megunduh foto atau video dari Instagram.
Aliases: *ig*
Penggunaan: *$instagram https://www.instagram.com/p/...*

3. *$tiktok*
Untuk mengunduh video dari TikTok.
Aliases: -
Penggunaan: *$tiktok https://www.tiktok.com/@xxxxx/video/...*

4. *$twitter*
Untuk megunduh foto atau video dari Twitter.
Aliases: *twt*
Penggunaan: *$twitter https://www.twitter.com/xxxxx/status/...*

5. *$ytmp3*
Untuk mengkonversi video YouTube ke MP3. 50 MB limit.
Aliases: -
Penggunaan: *$ytmp3 https://youtu.be/9lBTqHdgerY*

6. *$ytmp4*
Untuk mengunduh video YouTube. 50 MB limit.
Aliases: -
Penggunaan: *$ytmp4 https://youtu.be/9lBTqHdgerY*
`
}

exports.textMenu2 = () => {
    return `
> _Menu Page 2_

Sticker:
1. *$sticker*
Membuat custom sticker dari foto yang diberikan atau di-reply.
Aliases: *stiker*
Penggunaan: kirim gambar/link dengan caption *$sticker* atau balas gambar yang sudah dikirim dengan *$sticker*.
    `
}

exports.textMenu3 = () => {
    return `
> _Menu Page 3_

*ABAIKAN TANDA <>*
Fun:
1. *$ask*
Tanya tentang apa saja dan saya akan menjawab secara random.
Aliases: *8ball*
Penggunaan: *$ask* <pertanyaan>

2. *$bapack*
S4PI apHa YanG b1S4 nUL1S? sap1doL, XIX1X1Xi,,,,
Aliases: -
Penggunaan: *$bapack* <teks>

3. *$binary*
Ubah input teks mu ke dalam kode biner.
Aliases: *biner* - *bin*
Penggunaan: *$binary* <teks>

4. *$coinflip*
Lempar koin.
Aliases: *coin* - *flip*
Penggunaan: *$coinflip*

5. *$curse*
Bikin teks menjadi demonic style.
Aliases: -
Penggunaan: *$curse* <teks>

6. *$lenny*
( ͡° ͜ʖ ͡°)
Aliases: -
Penggunaan: *$lenny*

7. *$md5*
Enkripsi/hash teks mu ke MD5.
Aliases: -
Penggunaan: *$md5* <teks>

8. *$mocking*
iNi AdAlAh SeBuAh CoNtOh.
Aliases: *mock*
Penggunaan: *$mocking* <teks>

9. *$randomeme*
Kirim random meme dari reddit.
Aliases: *reddit*
Penggunaan: *$randomeme*

10. *$reverse*
.nasilut nikilaB
Aliases: - 
Penggunaan: *$reverse* <teks>

11. *$roll*
Roll angka.
Aliases: *dice*
Penggunaan: *$roll*

12. *$say*
It's just a say command, whatd'ya expect?
Aliases: *talk*
Penggunaan: *$say* <teks>
    `
}

exports.textMenu4 = () => {
    return `
> _Menu Page 4_

*ABAIKAN TANDA <>*
Utility:
1. *$brainly*
Cari jawaban di Brainly.
Aliases: -
Penggunaan: *$brainly* <soal> <.jumlah jawaban>

2. *$clock*
Cek waktu Indonesia sekitar.
Aliases: *waktu* - *jam*
Penggunaan: *$clock*

3. *$corona*
Mengirim data terkini COVID-19 di Indonesia.
Aliases: -
Penggunaan: *$corona*

4. *$cuaca*
Cek cuaca di lokasi yang diberikan.
Aliases: -
Penggunaan: *$cuaca* <daerah>

5. *$delete*
Hapus pesan yang saya kirim.
Aliases: *del*
Penggunaan: reply pesan yang mau dihapus lalu ketik command *$delete*

6. *$faq*
Pertanyaan yang sering diajukan.
Aliases: -
Penggunaan: *$faq*

7. *$infogempa*
Mengambil info gempa terkini dari BMKG.
Aliases: *gempa*
Penggunaan: *$infogempa*

8. *$igstalk*
Mengambil info akun Instagram dari username yang diberikan.
Aliases: *igs*
Penggunaan: *$igstalk* <username>

9. *$jadwalshalat*
Menampilkan jadwal shalat dari daerah yang diberikan.
Aliases: *jadwalsholat* - *shalat* - *sholat*
Penggunaan: *$jadwalshalat* <daerah>

10. *$menu*
Buka menu.
Aliases: *help* - *h*
Penggunaan: *$menu*

11. *$ping*
Cek kecepatan respon bot.
Alias: *speed* - *p*
Penggunaan: *$ping*

12. *$rules*
Baca peraturan bot!
Alias: *rule*
Penggunaan: *$rules*

13. *$server*
Cek spesifikasi server.
Aliases: -
Penggunaan: *$server*

14. *$status*
Untuk cek status bot.
Aliases: *stats*
Penggunaan: *$status*

15. *$toidr*
Konversikan kurensi luar negeri ke IDR.
Aliases: -
Penggunaan: *$toidr* <kurensi> <jumlah uang>

16. *$wikipedia*
Mencari apapun di Wikipedia.
Aliases: *wiki*
Penggunaan: *$wikipedia* <sesuatu>
    `
}

exports.textMenu5 = () => {
    return `
> _Menu Page 5_

*ABAIKAN TANDA <>*
Weeb Zone:
1. *$waifu*
Kirim foto waifu random.
Aliases: -
Penggunaan: *$waifu*

2. *$wait*
What anime is this? Identifikasi anime via foto.
Aliases: -
Penggunaan: kirim foto lalu tambahkan caption *$wait*
    `
}

exports.textGroup = () => {
    return `
    ⚠️ *GROUP COMMANDS* ⚠️

*ABAIKAN TANDA <>*
Group only:
1. *$add*
Tambahkan orang ke grup.
Aliases:-
Penggunaan: *$add* 62812xxxxxxxx

2. *$demote*
Lengserin admin.
Aliases: -
Penggunaan: *$demote* @member

3. *$groupinfo*
Mengambil data info group.
Aliases: -
Penggunaan: *$groupinfo*

4. *$kick*
Untuk kick member rese.
Aliases: -
Penggunaan: *$kick* @member

5. *$leave*
Keluarkan saya dari grup.
Aliases: *out* - *bye*
Penggunaan: *$leave*

6. *$linkgroup*
Memberikan link group yang disinggahi.
Aliases: *linkgrup*
Penggunaan: *$linkgroup*

7. *$promote*
Naikin jabatan member ke admin.
Aliases: -
Penggunaan: *$promote* @member
    `
}

exports.hiddenMenu = () => {
    return `
    🔞 *NSFW* 🔞

*ABAIKAN TANDA <>*
Command untuk ( ͡° ͜ʖ ͡°):
1. *$multifetish*
Kirim foto fetish sebanyak 5 foto dalam 1 request.
Yang tersedia: *armpits*, *feets*, *thighs*, *booty*, *boobs*, *necks*, *belly*, *sideboobs*, dan *ahegao*.
Command ini bersifat _case-sensitive_, jadi pastikan tag harus sesuai huruf besar kecilnya dan pengejaannya!
Aliases: *mfetish*
Penggunaan: *$multifetish <tag>*

2. *$multilewds*
Kirim random foto lewd sebanyak 5 foto dalam 1 request.
Aliases: *mlewds* - *mlewd*
Penggunaan: *$multilewds*
    `
}

exports.textFaq = () => {
    return `
    *Frequently Asked Question (FAQ)*

Q: Cara bikin bot ini gimana?
A: Ngoding

Q: Tutor bikinnya dong bro?
A: Belajar JS dan node.js, gak ada yang simple hidup ini

Q: Kok bot kadang gak respon kalau banyak command?
A: Cooldown command 5 detik, di bawah itu bakal terbaca spam sama bot

Q: Bikin bot bayar ga?
A: Gak, tapi buat jadi online 24/7 harus sewa server kayak gw, donate pls

Q: Bikin bot kayak gini bakal kena banned gak?
A: Mungkin aja, soalnya bot kayak gini unofficial

Q: Ini bot kalau download pake kuota siapa?
A: Kuota server

Q: Kok command $ask gak nyambung?
A: Karena responnya udah gw ketik dan si bot cuman milih random respon doang

Q: Bro kalau misalnya bot maintenance ceknya di mana ya?
A: Di info kontak si bot aja, kan ada tuh

Q: Kalau mau donate harus berapa minimal?
A: Sebelumnya, makasih udah mau donate. Gak ada minimal buat donate, berapa pun gw terima agar si bot ini online terus

Q: Update-nya tiap kapan aja?
A: Gak tentu sih, kadang 1 Minggu sekali atau 2 Minggu sekali

Q: Kok bot-nya gak bisa diajak chat?
A: Karena ini bukan chat bot
    `
}