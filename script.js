/* ====== EDIT DATA DI SINI ====== */
var C={
  sheet:"https://script.google.com/macros/s/AKfycbyv_oNURtRKoTy2ytkT1tc0XDiSQIlwkwTfWIh6InR0daW6Y2jtvWevbhLZpA8sqhypuw/exec", // URL Apps Script ("" jika tidak dipakai)
  fotoCover:"foto/cover.jpg",
  fotoCoverPos:"center",
  foto:"foto/latar.jpg",
  fotoPos:"center",
  musik:"music/lagu.mp3",
  mulai:0,
  kecepatan:1,
  galeri:["foto/galeri1.jpg","foto/galeri2.jpg","foto/galeri3.jpg","foto/galeri4.jpg","foto/galeri5.jpg","foto/galeri6.jpg"],
  pria:{foto:"foto/pria.jpg",pos:"center 20%",pendek:"Lukman",lengkap:"Ahmad Lukman Hakim S.S",ortu:"Putra dari Bapak Subawi S.Pd.I & Ibu Siti Zulaihah S.Pd.I"},
  wanita:{foto:"foto/wanita.jpg",pos:"center 20%",pendek:"Cinta",lengkap:"Sisilia Cinta Nilarosa S.Kep",ortu:"Putri dari Bapak Wawan Setiawan (alm.) & Ibu Dwi Sari"},
  tanggal:"2026-12-12", tanggalTeks:"Sabtu, 12 Desember 2026",
  acara:[
    {judul:"Akad Nikah",jam:"09.00 WIB",dibalik:false},
    {judul:"Resepsi",jam:"12.00 – 15.00 WIB",dibalik:true}
  ],
  /* WAJIB: isi alamat lengkap */
  lokasi:{nama:"Balai Desa Gulon",alamat:"Jl. Raya Magelang No.KM.25, Lojirejo, Gulon, Kec. Salam, Yogyakarta, Jawa Tengah 56484",maps:"https://www.google.com/maps/place/Kantor+Pemerintah+Desa+Gulon,+Jl.+Raya+Magelang+No.KM.25,+Lojirejo,+Gulon,+Salam,+Yogyakarta,+Central+Java+56484/data=!4m2!3m1!1s0x2e7a8af9df9605db:0x9631517ae4544f34!18m1!1e1?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI2LjQzLjAYACCIJyrHASw5NDI2NzcyNyw5NDI5MjE5NSw5NDI5OTUzMiwxMDA3OTY0OTgsMTAwNzk3NzYxLDEwMDc5NjUzNSw5NDIwNzM5NCw5NDIwNzUwNiw5NDIwODUwNiw5NDIxODY1Myw5NDIyOTgzOSw5NDI3NTE2OCw5NDI3OTYxOSwxMDA4NDgwOTYsMTAwODI1MDI1LDEwMDgyMDIzNywxMDA4MjI0OTQsMTAwODI3OTc1LDEwMDgzODM1OSwxMjE4MTY0NjFCAklE&skid=4fdbc7dc-ee3b-4f7c-827f-8861245b5f69"},
  alamatAcara:"Jl. Raya Magelang No.KM.25, Lojirejo, Gulon, Kec. Salam",
  rekening:[
    {bank:"BANK MANDIRI",logo:"foto/mandiri.png",no:"1370021703075",an:"a.n. AHMAD LUKMAN HAKIM"},
    {bank:"BNI",logo:"foto/bni.png",no:"1450483247",an:"a.n. SISILIA CINTA NILAROSA"}
  ]
};
/* ================================= */
(function(){
  var $=function(i){return document.getElementById(i)};
  var root=document.documentElement;
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

  // Nama & teks utama
  var nm=C.pria.pendek+'<br>&amp; '+C.wanita.pendek;
  $('cvNames').textContent=C.pria.pendek+' & '+C.wanita.pendek;
  ['hNames','pNames'].forEach(function(i){$(i).innerHTML=nm});
  $('hTgl').innerHTML=esc(C.tanggalTeks)+'<span>'+esc(C.lokasi.nama)+'</span>';

  $('nP').textContent=C.pria.pendek;$('fP').textContent=C.pria.lengkap;$('oP').textContent=C.pria.ortu;
  $('nW').textContent=C.wanita.pendek;$('fW').textContent=C.wanita.lengkap;$('oW').textContent=C.wanita.ortu;

  // Kartu acara
  var tgl=new Date(C.tanggal+'T12:00:00+07:00');
  var hari=new Intl.DateTimeFormat('id-ID',{weekday:'long',timeZone:'Asia/Jakarta'}).format(tgl);
  var bulan=new Intl.DateTimeFormat('id-ID',{month:'long',timeZone:'Asia/Jakarta'}).format(tgl);
  $('acaraList').innerHTML=C.acara.map(function(a){
    return '<article class="event-card rv'+(a.dibalik?' event-card-reverse':'')+'">'+
      '<div class="event-label">'+esc(a.judul)+'</div>'+
      '<div class="event-content">'+
        '<div class="event-date"><span class="event-date-label">Tanggal Acara</span><time datetime="'+esc(C.tanggal)+'" aria-label="'+esc(C.tanggalTeks)+'"><span class="event-date-weekday">'+esc(hari)+',</span><strong>'+tgl.getUTCDate()+'</strong><span class="event-date-month">'+esc(bulan)+' '+tgl.getUTCFullYear()+'</span></time></div>'+
        '<div class="event-divider"></div>'+
        '<p class="event-time"><span aria-hidden="true">◷</span>'+esc(a.jam)+'</p>'+
        '<p class="event-location-title">Lokasi Acara</p>'+
        '<p class="event-address"><b>'+esc(C.lokasi.nama)+'</b><br>'+esc(C.alamatAcara)+'</p>'+
        '<a class="btn event-map" href="'+esc(C.lokasi.maps)+'" target="_blank" rel="noopener"><span aria-hidden="true">📍</span> Google Maps</a>'+
      '</div></article>';
  }).join('');

  // Simpan di kalender
  var mulaiKal=new Date(C.tanggal+'T09:00:00+07:00');
  var akhirKal=new Date(mulaiKal.getTime()+6*36e5);
  function fmt(d){return d.toISOString().replace(/[-:]|\.\d{3}/g,'')}
  $('kal').href='https://calendar.google.com/calendar/render?action=TEMPLATE'+
    '&text='+encodeURIComponent('Pernikahan '+C.pria.pendek+' & '+C.wanita.pendek)+
    '&dates='+fmt(mulaiKal)+'/'+fmt(akhirKal)+
    '&location='+encodeURIComponent(C.lokasi.nama+', '+C.lokasi.alamat);

  // Rekening
  $('rekList').innerHTML=C.rekening.map(function(r){
    var logo=r.logo?'<img src="'+esc(r.logo)+'" alt="'+esc(r.bank)+'" loading="lazy">':'<span>'+esc(r.bank)+'</span>';
    return '<div class="rek"><div class="rek-logo">'+logo+'</div><b>'+esc(r.no)+'</b><p>'+esc(r.an)+'</p><br><button class="btn s" data-no="'+esc(r.no)+'">Salin Nomor</button></div>'}).join('');
  document.querySelectorAll('.rek-logo img').forEach(function(im){
    function ganti(){var s=document.createElement('span');s.textContent=im.alt;im.replaceWith(s)}
    im.onerror=ganti;
    if(im.complete&&im.naturalWidth===0)ganti();
  });
  var gb=$('giftBtn'),rl=$('rekList');
  gb.onclick=function(){
    var buka=rl.hidden;
    rl.hidden=!buka;
    gb.setAttribute('aria-expanded',buka);
    gb.textContent=buka?'Sembunyikan Rekening':'🎁 Lihat Rekening';
  };
  document.querySelectorAll('[data-no]').forEach(function(b){b.onclick=function(){
    if(!navigator.clipboard){b.textContent=b.dataset.no;return}
    navigator.clipboard.writeText(b.dataset.no).then(
      function(){b.textContent='Tersalin ✓'},
      function(){b.textContent=b.dataset.no});
  }});

  // Galeri (lazy load; foto yang tidak ada otomatis dibuang)
  $('gal').innerHTML=C.galeri.map(function(u,i){
    return '<button class="f" type="button" style="--i:'+i+'" data-gallery-index="'+i+'" aria-label="Buka Galeri '+(i+1)+'"><img src="'+esc(u)+'" alt="Galeri '+(i+1)+'" loading="lazy" decoding="async"></button>'}).join('');
  document.querySelectorAll('#gal img').forEach(function(im){im.onerror=function(){im.parentNode.remove()}});

  // Popup galeri
  var modal=$('galleryModal'),modalImage=$('galleryImage'),zoomLabel=$('galleryZoomLabel');
  var galleryCount=$('galleryCount');
  var galleryIndex=0,zoomScale=1,touchX=0;
  function tampilGallery(i){
    var img=document.querySelectorAll('#gal img');
    if(!img.length)return;
    galleryIndex=(i+img.length)%img.length;
    zoomScale=1;
    modalImage.style.setProperty('--gallery-scale',zoomScale);
    modalImage.style.animation='none';
    void modalImage.offsetWidth;
    modalImage.style.animation='';
    modalImage.src=img[galleryIndex].src;
    modalImage.alt=img[galleryIndex].alt;
    zoomLabel.textContent='100%';
    galleryCount.textContent=(galleryIndex+1)+' / '+img.length;
  }
  function bukaGallery(i){
    tampilGallery(i);modal.hidden=false;modal.classList.add('open');
    document.body.classList.add('gallery-open');
  }
  function tutupGallery(){modal.classList.remove('open');modal.hidden=true;document.body.classList.remove('gallery-open')}
  function ubahZoom(delta){
    zoomScale=Math.max(1,Math.min(3,Math.round((zoomScale+delta)*10)/10));
    modalImage.style.setProperty('--gallery-scale',zoomScale);
    zoomLabel.textContent=Math.round(zoomScale*100)+'%';
  }
  document.querySelectorAll('#gal .f').forEach(function(el){
    el.onclick=function(){bukaGallery(Number(el.dataset.galleryIndex))}
  });
  modal.querySelector('.gallery-close').onclick=tutupGallery;
  modal.querySelector('.gallery-prev').onclick=function(){tampilGallery(galleryIndex-1)};
  modal.querySelector('.gallery-next').onclick=function(){tampilGallery(galleryIndex+1)};
  $('galleryZoomOut').onclick=function(){ubahZoom(-.25)};
  $('galleryZoomIn').onclick=function(){ubahZoom(.25)};
  modal.onclick=function(e){if(e.target===modal)tutupGallery()};
  document.addEventListener('keydown',function(e){
    if(modal.hidden)return;
    if(e.key==='Escape')tutupGallery();
    if(e.key==='ArrowLeft')tampilGallery(galleryIndex-1);
    if(e.key==='ArrowRight')tampilGallery(galleryIndex+1);
  });
  modal.addEventListener('touchstart',function(e){touchX=e.changedTouches[0].clientX},{passive:true});
  modal.addEventListener('touchend',function(e){
    var jarak=e.changedTouches[0].clientX-touchX;
    if(Math.abs(jarak)>55)tampilGallery(galleryIndex+(jarak<0?1:-1));
  },{passive:true});

  // Background
  root.style.setProperty('--foto','url("'+C.foto+'")');
  root.style.setProperty('--pos',C.fotoPos||'center');
  root.style.setProperty('--fotoCover','url("'+(C.fotoCover||C.foto)+'")');
  root.style.setProperty('--posCover',C.fotoCoverPos||C.fotoPos||'center');

  // Foto mempelai
  [['pria',C.pria.foto,C.pria.pos],['wanita',C.wanita.foto,C.wanita.pos]].forEach(function(p){
    var el=document.querySelector('[data-slot="'+p[0]+'"]');
    if(!el||!p[1])return;
    var im=new Image();
    im.onload=function(){el.style.backgroundImage='url("'+p[1]+'")';el.style.backgroundPosition=p[2]||'center';el.textContent=''};
    im.src=p[1];
  });

  // Nama tamu: ?to=Budi+Santoso
  var tamu=new URLSearchParams(location.search).get('to');
  if(tamu){tamu=tamu.trim();if(tamu){$('tamu').textContent=tamu;$('nama').value=tamu}}

  // Musik (baru dimuat setelah undangan dibuka agar halaman awal ringan)
  var au=new Audio();au.preload='none';
  var adaLagu=!!C.musik,srcSet=false,sudahSeek=false;
  au.defaultPlaybackRate=C.kecepatan||1;au.playbackRate=C.kecepatan||1;
  function titikMulai(){var m=C.mulai||0;return(au.duration&&m>=au.duration)?0:m}
  function seek(){if(!sudahSeek&&au.readyState>=1){au.currentTime=titikMulai();sudahSeek=true}}
  function muatLagu(){if(!srcSet&&C.musik){au.src=C.musik;srcSet=true}}
  au.addEventListener('loadedmetadata',seek);
  au.addEventListener('ended',function(){au.currentTime=titikMulai();au.play().catch(function(){})});
  au.addEventListener('play',function(){$('mus').classList.add('on')});
  au.addEventListener('pause',function(){$('mus').classList.remove('on')});
  au.addEventListener('error',function(){if(srcSet&&C.musik&&au.src.indexOf('blob:')!==0){adaLagu=false}$('mus').classList.remove('on')});
  $('mus').onclick=function(){
    if(adaLagu){muatLagu();au.paused?au.play().catch(function(){}):au.pause()}
    else $('fMus').click();
  };
  $('fMus').onchange=function(e){
    var f=e.target.files[0];
    if(f){adaLagu=true;sudahSeek=true;srcSet=true;au.src=URL.createObjectURL(f);au.play().catch(function(){})}
  };

  // Buka undangan
  $('open').onclick=function(){
    document.body.classList.remove('locked');
    $('cover').classList.add('hide');
    window.scrollTo(0,0);
    document.body.classList.add('opened');
    if(adaLagu){muatLagu();au.play().catch(function(){})}
  };

  // Hitung mundur (berhenti saat tab tidak terlihat)
  var t0=new Date(C.tanggal+'T09:00:00+07:00').getTime();
  var timer;
  function tick(){
    var t=Math.max(0,t0-Date.now());
    if(t===0){
      $('count').innerHTML='<p class="done">Alhamdulillah, acara telah berlangsung.<br>Terima kasih atas doa dan kehadiran Anda.</p>';
      $('eventDays').parentNode.innerHTML='<span>Alhamdulillah, acara telah berlangsung</span>';
      clearInterval(timer);return;
    }
    var hr=Math.floor(t/864e5);
    $('eventDays').textContent=hr;
    $('d').textContent=hr;$('h').textContent=Math.floor(t%864e5/36e5);
    $('m').textContent=Math.floor(t%36e5/6e4);$('s').textContent=Math.floor(t%6e4/1e3);
  }
  function mulaiTimer(){clearInterval(timer);tick();timer=setInterval(tick,1000)}
  mulaiTimer();
  document.addEventListener('visibilitychange',function(){
    if(document.hidden)clearInterval(timer);else mulaiTimer();
  });

  // Animasi muncul saat digulir
  ['section:not(#home)>p','section:not(#home)>h2','section:not(#home)>.names','.event-countdown'].forEach(function(q){
    document.querySelectorAll(q).forEach(function(el){el.classList.add('rv')});
  });
  document.querySelectorAll('.grid>.box').forEach(function(el){el.classList.add('rv')});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting||e.boundingClientRect.top<0){e.target.classList.add('on');io.unobserve(e.target)}
  })},{rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});

  // Menu bawah: tandai bagian aktif
  var navA=document.querySelectorAll('nav a');
  var sio=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){navA.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)})}
  })},{rootMargin:'-45% 0px -50% 0px'});
  ['home','mempelai','cerita','acara','galeri','hadiah','rsvp'].forEach(function(id){var el=$(id);if(el)sio.observe(el)});

  // Garis kemajuan gulir
  var prog=$('prog'),menunggu=false;
  function saatGulir(){
    if(menunggu)return;menunggu=true;
    requestAnimationFrame(function(){
      var h=root.scrollHeight-window.innerHeight;
      prog.style.transform='scaleX('+(h>0?Math.min(1,(window.scrollY||0)/h):0)+')';
      menunggu=false;
    });
  }
  window.addEventListener('scroll',saatGulir,{passive:true});

  // Konfirmasi kehadiran + buku tamu (Google Sheets)
  var daftar=[];
  function render(){
    if(!daftar.length)return;
    $('list').innerHTML=daftar.map(function(d){
      return '<div class="msg"><b>'+esc(d.n)+'</b><em>'+esc(d.s)+'</em><p>'+esc(d.u||'—')+'</p></div>'}).join('');
  }
  // buku tamu dimuat saat bagian ucapan hampir terlihat
  var dimuat=false;
  function muat(){
    if(dimuat||!C.sheet)return;dimuat=true;
    fetch(C.sheet).then(function(r){return r.json()}).then(function(arr){
      if(Array.isArray(arr)){daftar=arr;render()}
    }).catch(function(){dimuat=false});
  }
  new IntersectionObserver(function(es,o){
    if(es[0].isIntersecting){muat();o.disconnect()}
  },{rootMargin:'600px 0px'}).observe($('rsvp'));

  $('kirim').onclick=function(){
    var n=$('nama').value.trim(),st=$('status');
    if(!n){alert('Silakan tulis nama lengkap Anda.');return}
    if(!C.sheet){alert('Pengiriman belum diatur.');return}
    var item={n:n,s:document.querySelector('input[name=hd]:checked').value,u:$('ucap').value.trim()};
    var btn=$('kirim');
    btn.disabled=true;btn.textContent='Mengirim...';
    fetch(C.sheet,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(item)})
    .then(function(){
      daftar.unshift(item);render();
      $('ucap').value='';
      st.textContent='Terima kasih, konfirmasi dan doa Anda sudah kami terima. ♡';
    })
    .catch(function(){st.textContent='Gagal mengirim. Periksa koneksi internet lalu coba lagi.'})
    .then(function(){btn.disabled=false;btn.textContent='Kirim Konfirmasi'});
  };
})();