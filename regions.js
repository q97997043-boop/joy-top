const UZ_REGIONS={
 'Toshkent shahri':['Toshkent'],
 'Toshkent viloyati':['Angren','Bekobod','Chirchiq','Olmaliq','Ohangaron','Yangiyo‘l','Nurafshon'],
 'Andijon viloyati':['Andijon','Asaka','Shahrixon','Xonobod','Marhamat','Paxtaobod'],
 'Buxoro viloyati':['Buxoro','G‘ijduvon','Kogon','Qorako‘l','Romitan','Vobkent'],
 'Jizzax viloyati':['Jizzax','G‘allaorol','Dashtobod','Do‘stlik','Paxtakor'],
 'Qashqadaryo viloyati':['Qarshi','Shahrisabz','Kitob','Koson','Muborak','Chiroqchi','Yakkabog‘'],
 'Navoiy viloyati':['Navoiy','Zarafshon','Uchquduq','Karmana','Nurota'],
 'Namangan viloyati':['Namangan','Chortoq','Chust','Kosonsoy','Pop','To‘raqo‘rg‘on','Uchqo‘rg‘on'],
 'Samarqand viloyati':['Samarqand','Kattaqo‘rg‘on','Urgut','Jomboy','Bulung‘ur','Payariq','Chelak'],
 'Sirdaryo viloyati':['Guliston','Yangiyer','Shirin','Boyovut','Sardoba'],
 'Surxondaryo viloyati':['Termiz','Denov','Boysun','Sherobod','Sho‘rchi','Jarqo‘rg‘on'],
 'Farg‘ona viloyati':['Farg‘ona','Qo‘qon','Marg‘ilon','Quva','Rishton','Oltiariq','Beshariq'],
 'Xorazm viloyati':['Urganch','Xiva','Hazorasp','Shovot','Gurlan','Yangibozor'],
 'Qoraqalpog‘iston Respublikasi':['Nukus','Mo‘ynoq','Xo‘jayli','Beruniy','To‘rtko‘l','Qo‘ng‘irot','Chimboy']
};
const allCities=Object.values(UZ_REGIONS).flat();
function fillCities(r){$('#cityFilter').innerHTML='<option value="all">Barcha shaharlar</option>'+(r==='all'?allCities:UZ_REGIONS[r]).map(c=>`<option>${c}</option>`).join('')}
function populateLocationSelectors(){const region=$('#regionFilter'),city=$('#cityFilter');
 region.innerHTML='<option value="all">Barcha viloyatlar</option>'+Object.keys(UZ_REGIONS).map(r=>`<option>${r}</option>`).join('');
 fillCities('all');city.value='Toshkent';
 region.addEventListener('change',()=>{fillCities(region.value);city.value=region.value==='all'?'Toshkent':'all';render()});
 city.addEventListener('change',render)}
/* ---------- Egasi ro'yxatdan o'tishi ---------- */
function ownerProfile(){return LS('ownerProfile',null)}
function openOwnerAccess(){ownerProfile()?openOwner():openOwnerRegistration()}
function openOwnerRegistration(){
 show(`<span class="eyebrow">Egasi sifatida ro‘yxatdan o‘tish</span><h2>Mehmonxonam bor</h2><p class="modal-intro">Obyekt turini tanlang va ma’lumotlaringizni kiriting.</p><div class="modal-grid"><label class="full">Faoliyat turi<select id="ownerType"><option value="Mehmonxona">Mehmonxona</option><option value="Hostel">Hostel</option><option value="Kvartira">Kvartira ijarasi</option></select></label><label>F.I.Sh.<input id="ownerFullName" placeholder="Ali Valiyev"></label><label>Telefon raqami<input id="ownerPhone" placeholder="+998 90 123 45 67"></label><label>Pasport seriya va raqami<input id="ownerPassport" placeholder="AA 1234567"></label><label>Obyekt nomi<input id="ownerHotelName" placeholder="Navruz Hotel"></label><label>Gmail <span class="optional">(ixtiyoriy)</span><input id="ownerEmail" type="email" placeholder="siz@gmail.com"></label><label>Litsenziya raqami <span class="optional">(ixtiyoriy)</span><input id="licenseNo"></label></div><div class="privacy-box">Pasport raqami brauzer xotirasida saqlanmaydi, faqat tekshiruv uchun so‘raladi.</div><button class="primary-btn modal-submit" onclick="saveOwnerProfile()">Ro‘yxatdan o‘tish →</button>`)}
function saveOwnerProfile(){
 let ph=$('#ownerPhone').value.replace(/[\s()-]/g,'');if(/^\d{9}$/.test(ph))ph='+998'+ph;else if(/^998\d{9}$/.test(ph))ph='+'+ph;
 const pp=$('#ownerPassport').value.toUpperCase().replace(/\s/g,''),name=$('#ownerFullName').value.trim(),hotel=$('#ownerHotelName').value.trim();
 if(!name||!hotel){toast('F.I.Sh. va obyekt nomini kiriting');return}
 if(!/^\+998\d{9}$/.test(ph)){toast('Telefon raqami noto‘g‘ri (+998 XX XXX XX XX)');return}
 if(!/^[A-Z]{2}\d{7}$/.test(pp)){toast('Pasport noto‘g‘ri. Masalan: AA 1234567');return}
 if(!save('ownerProfile',{type:$('#ownerType').value,fullName:name,phone:ph,passportMasked:pp.slice(0,2)+' •••••'+pp.slice(-2),email:$('#ownerEmail').value.trim(),hotel,license:$('#licenseNo').value.trim(),verified:false}))return;
 toast('Ro‘yxatdan o‘tdingiz! Endi obyektingizni qo‘shing');openPropForm()}
populateLocationSelectors();render();
