'use strict';
const BootBot = require('bootbot');

module.exports = {
  start: function(chat){
    const endConvo = (convo)=>{
      convo.say('Oke. Mungkin lain kali.');
      convo.end();
    };
    const askNamaPrincipal = (convo)=>{
      convo.ask(`Silahkan ketik Nama Perusahaan:`, (payload, convo) => {
        const nama = payload.message.text;
        convo.set('principal', nama);
        convo.say(`${nama} dicatat.`).then(() => askNamaProyek(convo));
      }, [], {typing: true});
    };
    const askNamaProyek = (convo)=>{
      convo.ask(`Silahkan ketik Nama Proyek/Pekerjaan:`, (payload, convo) => {
        const nama = payload.message.text;
        convo.set('proyek', nama);
        convo.say(`Proyek ${nama} dicatat.`).then(() => confirmAjuan(convo));
      }, [], {typing: true});
    };




    //
    const confirmAjuan = (convo)=>{
      convo.ask({
        text: `Apakah data berikut sudah benar?
          Jenis Jaminan: ${jenis}
          Perusahaan   : ${principal}
          Pekerjaaan   : ${proyek}`,
        quickReplies: ['Benar', 'Koreksi']
      }, (payload, convo) => {
        const confirm = payload.message.text == 'Benar';
        if (confirm){
          convo.say('Pengajuan dicatat untuk diproses...').then(()=> convo.end());
        } else {
          convo.say('Pengajuan perlu dikoreksi.').then(()=> convo.end());
        }
      }, [], {typing: true});
    };
    //
    chat.conversation((convo) => {
      convo.ask({
        text: `Jenis Jaminan yang Diajukan?`,
        quickReplies: ['Penawaran', 'Pelaksanaan', 'Uang Muka', 'Pemeliharaan']
      }, (payload, convo) => {
        const jenis = payload.message.text;
        convo.set('jenis', jenis);
        convo.say(`Oh, your name is ${jenis}`).then(() => askNamaPrincipal(convo));
      }, [], {typing: true});
    });
  }
};