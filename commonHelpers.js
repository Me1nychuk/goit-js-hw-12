import{S as L,i,a as g}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const h=document.querySelector(".formForSearch"),u=h.querySelector(".inputForSearch");h.querySelector(".btnForSearch");const y=document.querySelector(".gallery");let f=new L(".gallery a.lightbox");const p=document.querySelector(".loader"),n=document.querySelector(".load"),b="41507262-89b1b811a4183d0df8899cf35";h.addEventListener("submit",function(a){a.preventDefault();const t=u.value.trim();w(),t!==""?S(t):(i.error({title:"Error",message:"Please enter a search term."}),m())});n.addEventListener("click",I);let l=1,d;async function S(a){l=1;const t=`https://pixabay.com/api/?key=${b}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true&page=${l}&per_page=40`;try{const s=(await g.get(t)).data;s.hits.length>0?(i.success({title:"OK",message:"We were able to fetch some data.!"}),y.innerHTML="",v(s.hits),f.refresh(),s.hits.length<40&&(n.style.display="none"),d=document.querySelector(".gallery-item").getBoundingClientRect().height,window.scrollBy({top:d*.55,behavior:"smooth"})):i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again."})}catch{i.error({title:"Error",message:"Sorry, An error occurred while fetching images, Please try again later."})}finally{m()}}function v(a){const t=a.map(r=>`<div class="gallery-item">
        <a href="${r.largeImageURL}" class="lightbox" data-lightbox="gallery">
        <img class="gallery-image" src="${r.webformatURL}" alt="${r.tags}">
        </a>
        <div class="info">
            <div class="stat">
                <h3>Likes</h3>
                <p>${r.likes}</p>
            </div>
            <div class="stat">
                <h3>Views</h3>
                <p>${r.views}</p>
            </div>
            <div class="stat">
                <h3>Comments</h3>
                <p>${r.comments}</p><p></p>
            </div>
            <div class="stat">
                <h3>Downloads</h3>
                <p>${r.downloads}</p>
            </div>
        </div>
        </div>`).join("");y.insertAdjacentHTML("beforeend",t),n.style.display="block"}async function I(){l++;const a=u.value.trim();w();try{const t=`https://pixabay.com/api/?key=${b}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true&page=${l}&per_page=40`,s=(await g.get(t)).data;s.hits.length>0?(i.success({title:"OK",message:"We were able to fetch some data.!"}),v(s.hits),f.refresh(),s.hits.length<40&&(n.style.display="none"),window.scrollBy({top:d*2.5,behavior:"smooth"})):(i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}),n.style.display="none")}catch{i.error({title:"Error",message:"Error loading more images. Please try again later."})}finally{m()}}function w(){p.style.display="block"}function m(){p.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
