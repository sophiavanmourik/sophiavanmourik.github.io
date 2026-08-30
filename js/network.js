const nodes=[...document.querySelectorAll('.node')],bonds=[...document.querySelectorAll('.bonds path')],filters=[...document.querySelectorAll('.filter')],card=document.querySelector('#node-card');let pinned=null;function linked(id){const s=new Set([id]);bonds.forEach(b=>{if(b.dataset.from===id)s.add(b.dataset.to);if(b.dataset.to===id)s.add(b.dataset.from)});return s}function show(n){const ids=linked(n.id);nodes.forEach(x=>x.classList.toggle('muted',!ids.has(x.id)));bonds.forEach(b=>{const a=b.dataset.from===n.id||b.dataset.to===n.id;b.classList.toggle('active',a);b.classList.toggle('muted',!a)});card.innerHTML=`<p class="card-kicker">${n.dataset.category==='all'?'Crosslinker':n.dataset.category}</p><h2>${n.dataset.title}</h2><p>${n.dataset.text}</p>`}function reset(){if(pinned)return;nodes.forEach(n=>n.classList.remove('muted'));bonds.forEach(b=>b.classList.remove('active','muted'))}nodes.forEach(n=>{n.addEventListener('mouseenter',()=>show(n));n.addEventListener('mouseleave',reset);n.addEventListener('focus',()=>show(n));n.addEventListener('blur',reset);n.addEventListener('click',()=>{nodes.forEach(x=>x.classList.remove('selected'));if(pinned===n){pinned=null;reset()}else{pinned=n;n.classList.add('selected');show(n)}})});filters.forEach(btn=>btn.addEventListener('click',()=>{pinned=null;filters.forEach(b=>b.classList.toggle('active',b===btn));nodes.forEach(n=>{n.classList.remove('selected');n.classList.toggle('muted',btn.dataset.filter!=='all'&&n.id!=='sophia'&&!n.dataset.category.split(' ').includes(btn.dataset.filter))});bonds.forEach(b=>{const a=document.getElementById(b.dataset.from),z=document.getElementById(b.dataset.to);b.classList.remove('active');b.classList.toggle('muted',btn.dataset.filter!=='all'&&(a.classList.contains('muted')||z.classList.contains('muted')))});card.innerHTML=`<p class="card-kicker">Network filter</p><h2>${btn.textContent}</h2><p>Select a visible node to trace its crosslinks.</p>`}));document.querySelector('#year').textContent=new Date().getFullYear();const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#main-nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}
