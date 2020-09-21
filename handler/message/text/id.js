exports.textTnC = () => {
    return `
Pertama-tama gw mau makasih ama Yoga Sakti yang udah mau minjemin source code, serius lu the best dah. Ngke lamun urang ameng deui ka Bandung ku urang traktir batagor kuah hareupeun imah lah.
Lalu, gw Slavyan ngoding dan merevisi beberapa line agar mudah dicerna. Apaan sih gaje.

GitHub Slavyan: https://github.com/HungXiao007/
GitHub Yoga: https://github.com/YogaSakti/
`
}

exports.textMenu = (pushname) => {
    return `
Ada beberapa hal yang bisa gw lakuin:

Downloader (Baru ini doang):
1. *$instagram* _<URL Instagram>_
Buat download gambar atau video dari IG. Nih buat lu Bil anj.
Aliases: ig
Penggunaan: pake command dengan format *$ig https://www.instagram.com/p/xxxxxxxx/*

Bikin stiker:
1. *$sticker*
Bikin gambar lu jadi stiker.
Aliases: stiker
Penggunaan: kirim gambar dengan caption *$sticker* atau balas gambar yang udah dikirim dengan *$sticker*

2. *$sticker* _<URL Gambar>_
Bikin stiker juga, tapi lewat image link.
Aliases: stiker
Penggunaan: kirim URL dengan command *$sticker* atau balas URL yang udah dikirim dengan *$sticker*

Gak guna:
1. *$readme*
Isinya copyright buat source code doang.
Alias: tnc
Penggunaan: *$readme*

2. *$say*
Bikin gw mengatakan apa yang lu katakan. <> Abaikan.
Alias: talk
Penggunaan: *$say* <teks lu>

3. *$ask*
Tanya gw tentang apa aja, gw jawab sebisanya. <> Abaikan.
Aliases: 8ball
Penggunaan:: *$ask* <pertanyaan lu>

4. *$menu*
Ya buat cek command.
Aliases: help
Penggunaan: *$menu*

5. *$reverse*
.nasilut nikilaB
Aliases: - 
Penggunaan: *$reverse* <teks lu>

Utilities:
1. *$ping*
Buat ngecek respon bot.
Alias: speed
Penggunaan: *$ping*

2. *$server*
Liat spesifikasi server.
Alias: -
Penggunaan: *$server*

3. *$eval*
Buat evaluates string JavaScript tanpa terminal anjay canggih. <> Abaikan.
Alias: ev
Penggunaan: *$eval* <string>
`
}

exports.textAdmin = () => {
    return `
⚠ [ *ADMIN ONLY* ] ⚠ 
Lo males ke sana ke mari jadi admin? Gw bisa bantu dengan command berikut:

1. *$kick*
Buat kick member rese, lebih dari satu? Boleeeeeh.
Penggunaan: *$kick* @member

2. *$promote*
Buat naikin jabatan member ke admin.
Penggunaan: *$promote* @member

3. *$demote*
Buat lengserin admin ke rakyat jelata.
Penggunaan: *$demote* @member

4. *$del*
Buat hapus pesan dari gw.
Penggunaan: reply pesan yang mau dihapus lalu ketik command *$del*

5. *$status*
Buat cek status bot.
Penggunaan: *$status*

6. *$bye*
Keluarin gw dari grup.
Aliases: out
Penggunaan: *$bye*
`
}