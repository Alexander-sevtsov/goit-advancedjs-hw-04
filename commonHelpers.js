import{a as w,i as a,S as L}from"./assets/vendor-da648799.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const d="23308675-3bdf2416796cf281a4ef874ab",v="https://pixabay.com/api/";async function f(i,r=1){const s={key:d,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40};return(await w.get(`${v}?key=${d}`,{params:s})).data}const g={loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};function S(){g.loader.classList.remove("hidden")}function m(){g.loader.classList.add("hidden")}const n={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more"),guard:document.querySelector(".js-guard")};let h,c=1,y;const $=40;n.form.addEventListener("submit",_);const M={root:null,rootMargin:"300px",threshold:1},u=new IntersectionObserver(E,M);function q(){y=new L(".gallery__link",{})}async function _(i){i.preventDefault(),S(),u.unobserve(n.guard),c=1,n.gallery.innerHTML="";const{searchQuery:r}=i.currentTarget.elements,s=r.value.trim().toLowerCase();if(!s)return m(),a.show({title:"Warrning",message:"Write the requset value!",color:"yellow",position:"bottomRight"});try{const e=await f(s,c);if(e.hits.length<=0){a.show({title:"Warrning",message:"Sorry, there are no images matching your search query. Please try again.",color:"yellow",position:"bottomRight"});return}a.show({title:"Success",message:`Hooray! We found ${e.totalHits} images.`,color:"green",position:"bottomRight"}),n.gallery.innerHTML=p(e.hits),q(),h=Math.ceil(e.totalHits/$),e.hits.length<e.totalHits&&u.observe(n.guard)}catch(e){a.show({title:"Error",message:`${e.message}`,color:"red",position:"topRight"})}finally{m()}}function p(i){return i.map(({webformatURL:r,tags:s,largeImageURL:e,likes:t,views:o,comments:l,downloads:b})=>`<div class="photo-card">
        <a class='gallery__link' href=${e}>
    <img src=${r} alt=${s}  loading="lazy" />
    </a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            ${t}
        </p>
            <p class="info-item">
        <b>Views</b>
        ${o}
        </p>
        <p class="info-item">
            <b>Comments</b>
            ${l}
        </p>
        <p class="info-item">
            <b>Downloads</b>
            ${b}
        </p>
    </div>
    
</div>`).join("")}async function E(i){i.forEach(async r=>{if(r.isIntersecting){c+=1;const s=n.form.searchQuery.value.trim().toLowerCase();if(c>h)return u.unobserve(n.guard),a.show({title:"Warrning",message:"No more images to load.",color:"yellow",position:"bottomRight"});try{const e=await f(s,c);n.gallery.insertAdjacentHTML("beforeend",p(e.hits)),y.refresh()}catch(e){a.show({title:"Error",message:`${e.message}`,color:"red",position:"bottomRight"})}}})}
//# sourceMappingURL=commonHelpers.js.map
