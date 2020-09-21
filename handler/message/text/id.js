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
Ada beberapa hal yang bisa gw lakuin:

Downloader (TWITTER DAN FACEBOOK UPDATE):
1. *$instagram* _<URL Instagram>_
Buat download gambar atau video dari IG.
Aliases: ig
Penggunaan: pake command dengan format *$instagram* <link postingan>

2. *$facebook*
Buat download gambar atau video dari Facebook.
Aliases: fb
Penggunaan: *$facebook* <link postingan>

3. *$twitter*
Buat download gambar atau video dari Twitter.
Aliases: twt
Penggunaan: *$twitter* <link tweet>

Bikin stiker:
1. *$sticker*
Bikin gambar lu jadi stiker, bisa juga pake link.
Aliases: stiker
Penggunaan: kirim gambar dengan caption *$sticker* atau balas gambar yang udah dikirim dengan *$sticker*. Link juga bisa.

Fun:
1. *$say*
Bikin gw mengatakan apa yang lu katakan. <> Abaikan.
Alias: talk
Penggunaan: *$say* <teks lu>

2. *$ask*
Tanya gw tentang apa aja, gw jawab sebisanya. <> Abaikan.
Aliases: 8ball
Penggunaan:: *$ask* <pertanyaan lu>

3. *$reverse*
.nasilut nikilaB
Aliases: - 
Penggunaan: *$reverse* <teks lu>

4. *$roll*
Buat ngeroll dadu.
Aliases: dice
Penggunaan: *$roll*

5. *$coinflip*
Lempar koin.
Aliases: coin, flip
Penggunaan: *$coinflip*

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

4. *$clock*
Buat ngecek waktu Indonesia.
Aliases: waktu, jam
Penggunaan: *$clock*

5. *$readme*
Isinya copyright buat source code doang.
Alias: tnc
Penggunaan: *$readme*

6. *$menu*
Ya buat cek command.
Aliases: help
Penggunaan: *$menu*

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