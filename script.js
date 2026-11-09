/* ====== EDIT DATA DI SINI ====== */
var C={
  fotoCover:"foto/cover.jpg",        // background COVER (sebelum klik "Buka Undangan")
  fotoCoverPos:"center",             // posisi foto cover: "center", "center top", "30% 20%", dll
  foto:"foto/latar.jpg",             // background HALAMAN ISI (sesudah klik "Buka Undangan")
  fotoPos:"center",                  // posisi foto halaman isi
  musik:"music/lagu.mp3",            // alamat lagu (folder: music)
  mulai:0,                         // lagu mulai dari detik ke-100 (60 = menit 1, 0 = dari awal)
  kecepatan:1,                       // 1 = normal, 1.25 = lebih cepat, 0.9 = lebih lambat
  galeri:["foto/galeri1.jpg","foto/galeri2.jpg","foto/galeri3.jpg","foto/galeri4.jpg","foto/galeri5.jpg","foto/galeri6.jpg"],
  pria:{foto:"foto/pria.jpg",pos:"center 20%",pendek:"Lukman",lengkap:"Ahmad Lukman Hakim S.S",ortu:"Putra dari Bapak Subawi S.Pd.I & Ibu Siti Zulaihah S.Pd.I"},
  wanita:{foto:"foto/wanita.jpg",pos:"center 20%",pendek:"Cinta",lengkap:"Sisilia Cinta Nilarosa S.Kep",ortu:"Putri dari Bapak Wawan Setiawan (alm.) & Ibu Dwi Sari"},
  tanggal:"2026-12-12", tanggalTeks:"Sabtu, 12 Desember 2026",
  acara:[
    {judul:"Akad Nikah",jam:"08.00 WIB – selesai"},
    {judul:"Resepsi",jam:"11.00 – 14.00 WIB"}
  ],
  lokasi:{nama:"Balai Desa Gulon",alamat:"Gulon, (isi alamat lengkap di sini)",maps:"https://www.google.com/maps/search/?api=1&query=Balai+Desa+Gulon"},
  rekening:[{bank:"BANK MANDIRI",no:"1370021703075",an:"a.n. AHMAD LUKMAN HAKIM"},{bank:"BNI",no:"1450483247",an:"a.n. SISILIA CINTA NILAROSA"}]
};
/* ================================= */
(function(){
  var $=function(i){return document.getElementById(i)};
  var root=document.documentElement;
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  var nm=C.pria.pendek+'<br>&amp; '+C.wanita.pendek;
  ['cvNames','hNames','pNames'].forEach(function(i){$(i).innerHTML=nm});
  $('cvDate').textContent=C.tanggalTeks+' · '+C.lokasi.nama;
  $('hTgl').innerHTML=esc(C.tanggalTeks)+'<span>'+esc(C.lokasi.nama)+'</span>';
  $('nP').textContent=C.pria.pendek;$('fP').textContent=C.pria.lengkap;$('oP').textContent=C.pria.ortu;
  $('nW').textContent=C.wanita.pendek;$('fW').textContent=C.wanita.lengkap;$('oW').textContent=C.wanita.ortu;
  $('acaraList').innerHTML=C.acara.map(function(a){return '<div class="card"><h2 style="margin-bottom:6px">'+esc(a.judul)+'</h2><p><b>'+esc(C.tanggalTeks)+'</b><br>'+esc(a.jam)+'<br>'+esc(C.lokasi.nama)+'</p></div>'}).join('');
  $('lokNama').textContent=C.lokasi.nama;$('lokAlamat').textContent=C.lokasi.alamat;$('maps').href=C.lokasi.maps;
  $('rekList').innerHTML=C.rekening.map(function(r){return '<div class="rek"><p>'+esc(r.bank)+'</p><b>'+esc(r.no)+'</b><p>'+esc(r.an)+'</p><br><button class="btn s" data-no="'+esc(r.no)+'">Salin Nomor</button></div>'}).join('');
  document.querySelectorAll('[data-no]').forEach(function(b){b.onclick=function(){
    try{navigator.clipboard.writeText(b.dataset.no);b.textContent='Tersalin ✓'}catch(e){b.textContent=b.dataset.no}}});
  // Galeri dari daftar C.galeri
  $('gal').innerHTML=C.galeri.map(function(u){return '<div class="f" style="background-image:url(\''+esc(u)+'\')"></div>'}).join('');
  // Background: --foto = halaman isi, --fotoCover = cover (kosongkan fotoCover untuk memakai foto yang sama)
  root.style.setProperty('--foto','url("'+C.foto+'")');
  root.style.setProperty('--pos',C.fotoPos||'center');
  root.style.setProperty('--fotoCover','url("'+(C.fotoCover||C.foto)+'")');
  root.style.setProperty('--posCover',C.fotoCoverPos||C.fotoPos||'center');
  [['pria',C.pria.foto,C.pria.pos],['wanita',C.wanita.foto,C.wanita.pos]].forEach(function(p){
    var el=document.querySelector('[data-slot="'+p[0]+'"]');
    if(el&&p[1]){el.style.backgroundImage='url("'+p[1]+'")';el.style.backgroundPosition=p[2]||'center';el.textContent=''}});
  // Nama tamu dari link (#Budi-Santoso)
  var h=decodeURIComponent((location.hash||'').slice(1)).replace(/-/g,' ');
  if(h&&!/^[a-z]+$/.test(h))$('tamu').textContent=h;
  // Buka
  $('open').onclick=function(){$('cover').classList.add('hide');window.scrollTo(0,0);if(au.src){seek();au.play().catch(function(){})}};
  // Musik
  var au=new Audio();au.preload='auto';
  au.defaultPlaybackRate=C.kecepatan||1;au.playbackRate=C.kecepatan||1;
  function titikMulai(){var m=C.mulai||0;return(au.duration&&m>=au.duration)?0:m}
  var sudahSeek=false;
  function seek(){if(!sudahSeek&&au.readyState>=1){au.currentTime=titikMulai();sudahSeek=true}}
  au.addEventListener('loadedmetadata',seek);
  au.addEventListener('ended',function(){au.currentTime=titikMulai();au.play().catch(function(){})});
  if(C.musik)au.src=C.musik;
  $('mus').onclick=function(){if(au.src){au.paused?au.play():au.pause()}else $('fMus').click()};
  $('fMus').onchange=function(e){var f=e.target.files[0];if(f){au.src=URL.createObjectURL(f);au.play()}};
  // Hitung mundur
  var t0=new Date(C.tanggal+'T08:00:00+07:00').getTime();
  function tick(){var t=Math.max(0,t0-Date.now());
    $('d').textContent=Math.floor(t/864e5);$('h').textContent=Math.floor(t%864e5/36e5);
    $('m').textContent=Math.floor(t%36e5/6e4);$('s').textContent=Math.floor(t%6e4/1e3)}
  tick();setInterval(tick,1000);
  // Animasi muncul
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('on')})},{threshold:.15});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
  // RSVP
  var data=[];try{data=JSON.parse(localStorage.getItem('rsvp')||'[]')}catch(e){}
  function render(){if(!data.length)return;$('list').innerHTML=data.slice().reverse().map(function(d){
    return '<div class="msg"><b>'+esc(d.n)+'</b><em>'+d.s+'</em><p>'+esc(d.u||'—')+'</p></div>'}).join('')}
  render();
  $('kirim').onclick=function(){var n=$('nama').value.trim();if(!n){alert('Silakan tulis nama lengkap Anda.');return}
    data.push({n:n,s:document.querySelector('input[name=hd]:checked').value,u:$('ucap').value.trim()});
    try{localStorage.setItem('rsvp',JSON.stringify(data))}catch(e){}
    $('nama').value='';$('ucap').value='';render();alert('Terima kasih, konfirmasi Anda sudah terkirim.')};
})();