exports.textTnC = () => {
    return `
    MIT License

    Copyright (c) 2020 Heikal Syah Shiddiq
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
`
}

exports.textMenu = (pushname) => {
    return `
⚠ [ *ALL YOU CAN USE* ] ⚠ 
Berikut command yang tersedia:

Downloader (TWITTER DAN FACEBOOK UPDATE):
1. *$instagram* _<URL Instagram>_
Untuk megunduh foto atau video dari Instagram.
Aliases: *ig*
Penggunaan: gunakan command dengan format *$instagram* <link postingan>

2. *$facebook*
Untuk megunduh foto atau video dari Facebook.
Aliases: *fb*
Penggunaan: *$facebook* <link postingan>

3. *$twitter*
Untuk megunduh foto atau video dari Twitter.
Aliases: *twt*
Penggunaan: *$twitter* <link tweet>

Sticker maker:
1. *$sticker*
Membuat custom sticker dari foto yang diberikan atau di-reply.
Aliases: *stiker*
Penggunaan: kirim gambar dengan caption *$sticker* atau balas gambar yang sudah dikirim dengan *$sticker*. Link juga bisa.

Fun:
1. *$say*
Bikin gw mengatakan apa yang lu katakan. <> Abaikan.
Aliases: *talk*
Penggunaan: *$say* <teks lu>

2. *$ask*
Tanya gw tentang apa aja, gw jawab sebisanya. <> Abaikan.
Aliases: *8ball*
Penggunaan:: *$ask* <pertanyaan lu>

3. *$reverse*
.nasilut nikilaB
Aliases: - 
Penggunaan: *$reverse* <teks lu>

4. *$roll*
Buat ngeroll dadu.
Aliases: *dice*
Penggunaan: *$roll*

5. *$coinflip*
Lempar koin.
Aliases: *coin* - *flip*
Penggunaan: *$coinflip*

Utilities:
1. *$ping*
Buat ngecek respon bot.
Alias: *speed*
Penggunaan: *$ping*

2. *$server*
Liat spesifikasi server.
Aliases: -
Penggunaan: *$server*

3. *$eval*
Buat evaluates string JavaScript tanpa terminal anjay canggih. <> Abaikan.
Alias: *ev*
Penggunaan: *$eval* <string>

4. *$clock*
Buat ngecek waktu Indonesia.
Aliases: *waktu* - *jam*
Penggunaan: *$clock*

5. *$readme*
Isinya copyright buat source code doang.
Alias: *tnc*
Penggunaan: *$readme*

6. *$menu*
Ya buat cek command.
Aliases: *help* - *h*
Penggunaan: *$menu*
`
}

exports.textAdmin = () => {
    return `
⚠ [ *ADMIN ONLY* ] ⚠ 
Gunakan command ini jika admin terlalu malas:

1. *$kick*
Buat kick member rese. Bisa lebih dari satu.
Aliases: -
Penggunaan: *$kick* @member @member

2. *$promote*
Naikin jabatan member ke admin.
Aliases: -
Penggunaan: *$promote* @member

3. *$demote*
Lengserin admin.
Aliases: -
Penggunaan: *$demote* @member

4. *$delete*
Hapus pesan yang saya kirim.
Aliases: *del*
Penggunaan: reply pesan yang mau dihapus lalu ketik command *$delete*

5. *$status*
Untuk cek status bot.
Aliases: *stats*
Penggunaan: *$status*

6. *$bye*
Keluarkan saya dari grup.
Aliases: *out*
Penggunaan: *$bye*
`
}