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
⚠️ [ *ALL YOU CAN USE* ] ⚠️
Berikut command yang tersedia:

Downloader:
1. *$instagram*
Untuk megunduh foto atau video dari Instagram.
Aliases: *ig*
Penggunaan: *$instagram* <link postingan>

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
It's just a say command, whatd'ya expect?
Aliases: *talk*
Penggunaan: *$say* <teks>

2. *$ask*
Tanya tentang apa saja dan saya akan menjawab secara random.
Aliases: *8ball*
Penggunaan:: *$ask* <pertanyaan>

3. *$reverse*
.nasilut nikilaB
Aliases: - 
Penggunaan: *$reverse* <teks>

4. *$roll*
Roll angka.
Aliases: *dice*
Penggunaan: *$roll*

5. *$coinflip*
Lempar koin.
Aliases: *coin* - *flip*
Penggunaan: *$coinflip*

~6. *$ascii*~
~Buat teks mu menjadi ASCII art.~
~Aliases: -~
~Penggunaan: *$ascii* <teks>~
*WIP*

7. *$randmeme*
Kirim random meme dari reddit.
Aliases: *reddit*
Penggunaan: *$randmeme*

8. *$wait*
What anime is this? Identifikasi anime via foto.
Aliases: -
Penggunaan: kirim foto lalu tambahkan caption *$wait*

Utilities:
1. *$ping*
Cek kecepatan respon bot.
Alias: *speed*
Penggunaan: *$ping*

2. *$server*
Cek spesifikasi server.
Aliases: -
Penggunaan: *$server*

3. *$eval*
Buat evaluate JavaScript arbitary.
Alias: *ev*
Penggunaan: *$eval* <string>

4. *$clock*
Cek waktu Indonesia sekitar.
Aliases: *waktu* - *jam*
Penggunaan: *$clock*

5. *$readme*
Isinya copyright buat source code doang.
Alias: *tnc*
Penggunaan: *$readme*

6. *$menu*
List command.
Aliases: *help* - *h*
Penggunaan: *$menu*
`
}

exports.textAdmin = () => {
    return `
⚠️ [ *ADMIN ONLY* ] ⚠️
Gunakan command ini jika admin terlalu malas:

1. *$kick*
Untuk kick member rese.
Aliases: -
Penggunaan: *$kick* @member

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

7. *$linkgroup*
Memberikan link group yang disinggahi.
Aliases: *linkgrup*
Penggunaan: *$linkgroup*
`
}

exports.hiddenMenu = () => {
    return `
🔞 [ *NSFW* ] 🔞
Command untuk ( ͡° ͜ʖ ͡°):

1. *$lewd*
Kirim foto lewd secara random.
Aliases: -
Penggunaan: *$lewd*

2. *$fetish*
Yang tersedia: *armpits*, *feets*, *thighs*, *booty*, *boobs*, *necks*, *belly*, *sideboobs*, dan *ahegao*.
Aliases: -
Penggunaan: *$fetish* <tag>
    `
}
