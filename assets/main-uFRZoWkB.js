import{a as p,i as g}from"./vendor-Cbhu4xvy.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();const V="https://your-energy.b.goit.study/api",oe={mobile:9,tablet:12,desktop:12},ce={mobile:8,tablet:10,desktop:10};p.defaults.baseURL=V;const le=(t,e,s)=>{const a={filter:t,page:e,limit:s};return p.get("/filters",{params:a})},de=t=>p.get(`/exercises/${t}`),ue=t=>p.get("/exercises",{params:t}),me=(t,e,s,a)=>{const i={rate:e,email:s,review:a};return p.patch(`/exercises/${t}/rating`,i)},m="/your-energy/assets/sprite-D8xu5p1j.svg",ge="/your-energy/assets/no-image-B2yyVwMF.jpg";function pe(t,e){const s="#EEA10C",a="#F4F4F4";let r="";for(let n=0;n<5;n++){const d=`starGradient${n}`,o=n+1<=t?100:n<t?t%1*100:0,l=[{offset:"0%",color:s,opacity:"1"},{offset:`${o}%`,color:s,opacity:"1"},{offset:`${o+1}%`,color:a,opacity:"0.20"}],u=`
            <linearGradient id="${d}" x1="0%" y1="0%" x2="100%" y2="0%">
              ${l.map(h=>`<stop offset="${h.offset}" style="stop-color:${h.color};stop-opacity:${h.opacity}" />`).join("")}
            </linearGradient>
          `,c=`url(#${d})`;r+=`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">${u}<path d="M6.04894 0.927052C6.3483 0.0057416 7.6517 0.00574088 7.95106 0.927052L8.79611 3.52786C8.92999 3.93989 9.31394 4.21885 9.74717 4.21885H12.4818C13.4505 4.21885 13.8533 5.45846 13.0696 6.02786L10.8572 7.63525C10.5067 7.8899 10.3601 8.34127 10.494 8.75329L11.339 11.3541C11.6384 12.2754 10.5839 13.0415 9.80017 12.4721L7.58779 10.8647C7.2373 10.6101 6.7627 10.6101 6.41222 10.8647L4.19983 12.4721C3.41612 13.0415 2.36164 12.2754 2.66099 11.3541L3.50604 8.75329C3.63992 8.34127 3.49326 7.8899 3.14277 7.63525L0.930391 6.02787C0.146677 5.45846 0.549452 4.21885 1.51818 4.21885H4.25283C4.68606 4.21885 5.07001 3.93989 5.20389 3.52786L6.04894 0.927052Z" fill="${c}" fill-opacity="1"/></svg>`}return r}const z=document.querySelector(".loader"),T=()=>{z.classList.remove("hidden")},A=()=>{z.classList.add("hidden")},L="favorite-exercises";function he(t){try{const e=JSON.parse(localStorage.getItem(L)||"[]");return e.includes(t)?!1:(e.push(t),localStorage.setItem(L,JSON.stringify(e)),!0)}catch(e){return console.error("Error adding ID to localStorage:",e),!1}}function fe(t){try{const e=JSON.parse(localStorage.getItem(L)||"[]"),s=e.indexOf(t);return s!==-1?(e.splice(s,1),localStorage.setItem(L,JSON.stringify(e)),!0):!1}catch(e){return console.error("Error removing ID from localStorage:",e),!1}}function K(t){try{return JSON.parse(localStorage.getItem(L)||"[]").includes(t)}catch(e){return console.error("Error checking ID in localStorage:",e),!1}}class x{constructor(e,s,a,i,r,n,d,o,l,u,c){this.id=e,this.bodyPart=s,this.equipment=a,this.gifUrl=i,this.name=r,this.target=n,this.description=d,this.rating=o,this.burnedCalories=l,this.time=u,this.popularity=c}setRatingVisible(e){this.ratingVisible=e}setTrashVisible(e){this.trashVisible=e}static async fetchById(e){try{T();const a=(await de(e)).data;return new x(a._id,a.bodyPart,a.equipment,a.gifUrl,a.name,a.target,a.description,a.rating,a.burnedCalories,a.time,a.popularity)}catch(s){throw console.error("Error fetching exercise:",s),s}finally{A()}}render(e=!0,s=!1){const a=document.createElement("div");return a.className="exercise-card",a.innerHTML=`  
        <div class="exercise-header">
          <div class="badge">workout</div>
          <div class="rating ${e?"":"hidden"}">
            ${this.formatRating()}
            <svg width="18" height="18">
              <use href="${m}#star-active"></use>
            </svg>
          </div>
          <button type="button" data-exerciseid="${this.id}" class="exercise-card-trash ${s?"":"hidden"}">
            <svg width="16" height="16">
              <use href="${m}#trash"></use>
            </svg>
          </button>
          <button type="button" data-exerciseid="${this.id}" class="exercise-start-btn">
            Start
            <svg width="16" height="16">
              <use href="${m}#arrow"></use>
            </svg>
          </button>
        </div>
        <div class="exercise-title-container">
          <div class="exercise-icon">
            <svg width="18" height="18">
              <use href="${m}#group"></use>
            </svg>
          </div>
          <div class="exercise-title">${this.name}</div>
        </div>
        <ul class="exercise-details">
          <li class="exercise-details-item">Burned calories: <span class="exercise-details-item-value">${this.burnedCalories}</span></li>
          <li class="exercise-details-item">Body Part: <span class="exercise-details-item-value">${this.bodyPart}</span></li>
          <li class="exercise-details-item">Target: <span class="exercise-details-item-value">${this.target}</span></li>
        </ul>
      `,a}renderCard(){const e=document.createElement("div");e.className="exercise-modal-card";const a=[{name:"Target",value:this.target},{name:"Body Part",value:this.bodyPart},{name:"Equipment",value:this.equipment},{name:"Popular",value:this.popularity},{name:"Burned Calories",value:this.burnedCalories}].filter(r=>r.value).map(r=>`
        <div class="modal-card-property">
        <span class="modal-card-property-name">${r.name}</span>
          <span class="modal-card-property-value">${r.value}</span>
          
        </div>`).join("");var i=K(this.id);return e.innerHTML=`
      <button type="button" class="modal-card-close-button">
       <svg width="24" height="24">
              <use href="${m}#close"></use>
            </svg>
        </button>
      <div class="modal-card-header">
      
      <div class="image-container">
        <img 
          src="${this.gifUrl}"
          alt="${this.name}"
          onerror="this.src='${ge}'"
          loading="lazy" />
      </div>
      <div class="modal-card-data">

      <h3 class="modal-card-title">${this.name}</h3>
      <div class="modal-card-rating">
        <span class="rating-value">${this.formatRating()}</span>
       ${pe(this.rating)}            
      </div>
      <hr class="divider" />
      <div class="modal-card-properties">
        ${a}
      </div>
      <hr class="divider" />
      <p class="modal-card-description">${this.description}</p>
      <div class="modal-card-buttons">
        <button type="button" data-exerciseid="${this.id}" class="modal-card-button favorite-button">
        <span>${i?"Remove favorite":"Add to favorites"}</span>
        <svg width="18" height="18">
            <use href="${m}#heart" fill="${i?"black":"none"}"></use>
          </svg>
        </button>
        <button type="button" data-exerciseid="${this.id}"class="modal-card-button rating-button">Give a rating</button>
      </div>
      </div>
      </div>
    `,e}formatRating(){return this.rating.toFixed(1)}getStarRatingHTML(){let e="";const s='<svg width="18" height="18"><use href="${sprite}#star-active"></use></svg>',a='<svg width="18" height="18"><use href="${sprite}#star-inactive"></use></svg>';return e+=s.repeat(this.rating.toFixed(0)),e+=a.repeat(5-this.rating.toFixed(0)),e}}const ve=()=>new URLSearchParams(window.location.search).get("exerciseId");document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector(".modal-overlay"),e=document.querySelector(".modal-page"),s=document.body;document.addEventListener("click",a=>{if(a.target.closest(".exercise-start-btn")){const i=a.target.closest(".exercise-start-btn").dataset.exerciseid||ve();i&&x.fetchById(i).then(r=>{e.innerHTML="",e.append(r.renderCard()),t.classList.remove("hidden"),e.classList.remove("hidden"),s.classList.add("no-scroll")}).catch(r=>{console.error("Error fetching exercise:",r)})}(a.target.classList.contains("modal-overlay")||a.target.closest(".modal-card-close-button"))&&(t.classList.add("hidden"),e.classList.add("hidden"),e.innerHTML="",s.classList.remove("no-scroll"))})});document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector(".modal-page");document.addEventListener("click",e=>{const s=t.querySelector(".favorite-button");if(s&&(e.target===s||s.contains(e.target))){const c=s.getAttribute("data-exerciseid");c&&(K(c)?(fe(c),s.querySelector("span").textContent="Add to favorites",s.querySelector("use").setAttribute("fill","none")):(he(c),s.querySelector("span").textContent="Remove favorite",s.querySelector("use").setAttribute("fill","black")))}if(!e.target.matches(".rating-button"))return;const a=e.target.dataset.exerciseid,i=document.querySelector(".exercise-modal-card"),r=be();ye(i),t.append(r);const n=r.querySelectorAll(".rating-modal__stars span"),d=r.querySelector(".rating-modal__value"),o=r.querySelector(".rating-modal__hidden-rating"),l=r.querySelector(".rating-modal__form");let u=0;n.forEach(c=>{c.addEventListener("mouseenter",()=>q(n,parseInt(c.dataset.value,10))),c.addEventListener("mouseleave",()=>q(n,u)),c.addEventListener("click",()=>{u=parseInt(c.dataset.value,10),o.value=u,d.textContent=u.toFixed(1),q(n,u)})}),l.addEventListener("submit",async c=>{var j,F;c.preventDefault();const h=parseInt(o.value),R=l.querySelector(".rating-modal__email").value.trim(),B=l.querySelector(".rating-modal__comment").value.trim();if(!h||!R||!B){g.error({title:"Помилка",message:"Всі поля повинні бути заповнені"});return}try{await me(a,h,R,B),g.success({title:"Успіх",message:"Ви упсішно відправили рейтинг"}),r.remove(),i.style.display="block"}catch(ne){g.error({title:"Помилка",message:((F=(j=ne.response)==null?void 0:j.data)==null?void 0:F.message)||"Щось пішло не так"})}})})});function ye(t,e){t.style.display="none"}function q(t,e){t.forEach(s=>{const a=parseInt(s.dataset.value,10);s.querySelector("svg use").setAttribute("href",`${m}#${a<=e?"star-active":"star-inactive"}`)})}function be(){const t=document.createElement("div");return t.className="rating-modal-card",t.innerHTML=`
      <button type="button" class="modal-card-close-button">
        <svg width="24" height="24">
          <use href="${m}#close"></use>
        </svg>
      </button>
      <div class="rating-modal">
        <h2 class="rating-modal__title">Rating</h2>
        <form class="rating-modal__form">
          <div class="rating-modal__mark">
            <div class="rating-modal__value">0.0</div>
            <div class="rating-modal__stars">
              ${[1,2,3,4,5].map(e=>`
                  <span data-value="${e}">
                    <svg class="rating-modal__stars__item" width="18" height="18">
                      <use href="${m}#star-inactive"></use>
                    </svg>
                  </span>`).join("")}
            </div>
          </div>
          <input type="hidden" name="rate" class="rating-modal__hidden-rating" value="0">
          <input type="email" class="rating-modal__email" placeholder="Email" required />
          <textarea class="rating-modal__comment" placeholder="Your comment" required></textarea>
          <button type="submit" class="rating-modal__submit-btn">Send</button>
        </form>
      </div>
    `,t}async function Le(){const t=JSON.parse(localStorage.getItem("quoteDay")),e=new Date().toISOString().split("T")[0];if((t==null?void 0:t.currentDate)===e){D(t.data);return}try{const{data:s}=await p.get(`${V}/quote`),a={data:s,currentDate:e};localStorage.setItem("quoteDay",JSON.stringify(a)),D(s)}catch(s){console.error("Error fetching the quote:",s)}}function D({quote:t,author:e}){document.querySelector(".js-quote").innerHTML=`
    <p class="quote-text">"${t}"</p>
    <p class="quote-signature">- ${e}</p>
  `}document.addEventListener("DOMContentLoaded",Le);const H={0:m+"#two-angle-left",1:m+"#one-angle-left",6:m+"#one-angle-right",7:m+"#two-angle-right"},Se=(t,e)=>{const s=[];if(t<4)for(let a=0;a<4;a++)s.push(1+a);if(e-t<3&&s.length===0)for(let a=0;a<4;a++)s.unshift(e-a);if(s.length===0)for(let a=-1;a<3;a++)s.push(t+a);s[3]<e&&(s[3]=0),s[3]===e&&s[0]!=1&&(s[0]=0);for(let a=0;a<4;a++)s[a]>e&&(s[a]=-1);return s.unshift(t>1?t-1:-1),s.unshift(t>1?1:-1),s.push(t<e?t+1:-1),s.push(t<e?e:-1),s},Ee=(t,e)=>{const s=Se(t,e),a=new Set([0,1]),i=new Set([6,7]),r=a.union(i);return s.map((n,d)=>[d,n,r.has(d)?"":n===0?"...":n>0?n:"",n===t||a.has(d)&&t!=1||i.has(d)&&t!=e,r.has(d)||n===t])},we=t=>H.hasOwnProperty(t)?`<svg width="20" height="20"><use href="${H[t]}"></use></svg>`:"",xe=(t,e,s,a,i)=>`<li class="pagination-item${a?" accent":""}${i?" outline":""}${e===-1&&!i?" hidden-btn":""}" data-page="${e}">${s}${we(t)}</li>`,$e=(t,e)=>Ee(t,e).reduce((a,i)=>a+xe(...i),""),qe=(t,e)=>`<ul class="pagination">${$e(t,e)}</ul>`,Ie=(t,...e)=>s=>{s.preventDefault();const a=s.currentTarget;if(s.target===s.currentTarget)return;const i=Number(s.target.closest("li").getAttribute("data-page"));if(i==-1)return;a.remove();let r=Array.from(...e);r.splice(-1,1,i),t.apply(null,r)},W=(t,e,s,a,...i)=>{const r=document.querySelector(t);r.innerHTML=qe(e,s),r.firstChild.addEventListener("click",Ie(a,i))},Y=t=>{const e=document.querySelector(t);e.firstChild&&e.firstChild.remove()},Q=()=>{const t=window.innerWidth;return t<768?"mobile":t<1440?"tablet":"desktop"},Ce=()=>oe[Q()],_e=()=>ce[Q()];class ${constructor(){this.exercises=[],this.page=0,this.perPage=10,this.totalPages=0}addExercise(e){this.exercises.push(e)}static async fetchWithFilters(e){const a=(await ue(e.toParams())).data,i=new $;return i.page=a.page,i.perPage=a.perPage,i.totalPages=a.totalPages,a.results.forEach(r=>{const n=new x(r._id,r.bodyPart,r.equipment,r.gifUrl,r.name,r.target,r.description,r.rating,r.burnedCalories,r.time,r.popularity);i.addExercise(n)}),i}render(e=!0,s=!1){const a=document.createElement("div");return a.className="exercise-list",this.exercises.forEach(i=>{a.appendChild(i.render(e,s))}),a}}const y=Object.freeze({MUSCLES:"muscles",BODY_PART:"bodypart",EQUIPMENT:"equipment"});class ke{constructor({bodypart:e,muscles:s,equipment:a,keyword:i,page:r=1,limit:n=10}={}){this.bodypart=e,this.muscles=s,this.equipment=a,this.keyword=i,this.page=r,this.limit=n}addFilter(e,s){switch(e){case y.MUSCLES:this.muscles=s;break;case y.BODY_PART:this.bodypart=s;break;case y.EQUIPMENT:this.equipment=s;break}}addKeyword(e){this.keyword=e}toParams(){const e={};return this.bodypart&&(e.bodypart=this.bodypart),this.muscles&&(e.muscles=this.muscles),this.equipment&&(e.equipment=this.equipment),this.keyword&&(e.keyword=this.keyword),e.page=this.page,e.limit=this.limit,e}}const f=document.querySelector(".exercise-container");let v=new $;const Z=async(t,e=1)=>{try{T(),t.page=e,v=await $.fetchWithFilters(t);const s=v.render(!0,!1);f.innerHTML="",f.appendChild(s),W(".pagination-container",v.page,v.totalPages,Z,t,v.page)}catch(s){console.error(s)}finally{A()}};function X(t,e,s=null){const a=new ke({page:1,limit:_e()});s&&a.addKeyword(s),a.addFilter(t,e),Z(a),f.classList.add("active")}function Pe(){f.innerHTML="",f.classList.contains("active")&&f.classList.remove("active"),Y(".pagination-container")}const b=document.querySelector(".category-list"),ee=document.querySelector(".category-container"),Te=t=>t.reduce((e,s)=>e+`<li class="category-card" data-name="${s.name}" data-filter="${s.filter}">
      <img class="gallery-image"
           src="${s.imgURL}"
           alt="${s.name}"
           loading="lazy"
           width="335"
           height="225"
           />
            <div class="category-title">
              <h3>${s.name}</h3>
              <p>${s.filter}</p>
            </div>
          </li>`,""),M=async(t,e)=>{try{T();const s=await le(t,e,Ce()),{page:a,totalPages:i,results:r}=s.data;r.length===0&&(b.innerHTML=""),b.innerHTML=Te(r),b.addEventListener("click",te),ee.classList.add("active"),Pe(),W(".pagination-container",e,i,M,t,a)}catch(s){console.log(s)}finally{A()}},Ae=()=>{b.innerHTML="",Y(".pagination-container"),b.removeEventListener("click",te),ee.classList.remove("active")},te=t=>{if(t.preventDefault(),t.target===t.currentTarget)return;const e=t.target.closest("li"),s=e.getAttribute("data-filter"),a=e.getAttribute("data-name");Ae(),X(Me(s),a),je(s,a)},Me=t=>{const e=t.toLowerCase();return Object.values(y).find(s=>s===e)};M("Muscles",1);const U=document.querySelectorAll(".filter-tab-button"),se=document.querySelector(".filter-form-container"),G=document.querySelector(".search-button"),C=document.querySelector(".cansel-search-button"),S=document.querySelector(".search-string"),ae=document.querySelector(".additional-title-filter"),re=document.querySelector(".slash-in-filter");var O="",N="",_="";const Oe={"button-muscles":"Muscles","button-bodypart":"Body parts","button-equipment":"Equipment"};S&&S.addEventListener("input",function(){C.style.display=this.value.length>0?"block":"none"});C&&C.addEventListener("click",function(){S.value="",this.style.display="none"});U.forEach(t=>{t.addEventListener("click",e=>{if(e.preventDefault(),Be(),e.target&&e.target.matches("button.filter-tab-button")){U.forEach(i=>{i.classList.remove("active")}),t.classList.add("active");const s=e.target.id,a=Oe[s];M(a,1)}})});G&&G.addEventListener("click",t=>{t.preventDefault(),_=S.value,X(Ne(O),N,_)});function Ne(t){var e=t.toLowerCase();return e==="body parts"&&(e="bodypart"),Object.values(y).find(s=>s===e)}function Re(t){re.style.display="inline",ae.textContent=t}function Be(){re.style.display="none",se.style.display="none",ae.textContent="",De()}function je(t,e){Fe(t,e),Re(e),se.style.display="block"}function Fe(t,e){O=t,N=e}function De(){O="",N="",S.value="",_=""}const He=async t=>await p.get(`https://your-energy.b.goit.study/api/exercises/${t}`),ie=t=>t.map(e=>`<li class="list-card-item" data-id="${e._id}">
        <div class="list-card-wrapper">
          <div class="box-buttons">
            <div class="trash-box">
              <div class="card-name-box">
                <p class="list-card-name">Workout</p>
              </div>
              <button class="btn-trash" type="button">
              <svg class="icon-trash" width="16px" height="16px">
                <use href="./img/sprite.svg#trash"></use>
              </svg>
              </button>
            </div>
            <button class="btn-start" type="button">
              Start
              <svg width="16px" height="16px">
                <use href="./img/sprite.svg#arrow"></use>
              </svg>
            </button>
          </div>
          <div class="icon-run-box">
          <div class="icon-run-wrapper">
          <svg class="icon-run" width="14px" height="16px">
              <use href="./img/sprite.svg#group"></use>
          </svg>
          </div>
          <h3 class="list-title-card">${e.name}</h3>
          </div>
          <div class="info-text-box">
            <p class="list-info-about-body">
              Burned calories:
              <span class="info-text-body"
                >${e.burnedCalories} / ${e.time} min</span
              >
            </p>
            <p class="list-info-about-body">
              Body part: <span class="info-text-body">${e.bodyPart}</span>
            </p>
            <p class="list-info-about-body">
              Target: <span class="info-text-body">${e.target}</span>
            </p>
          </div>
        </div>
      </li>`).join(""),w=document.querySelector(".fav-list-card"),I=document.querySelector(".fav-text-default"),Ue=document.querySelector(".fav-list-card");let J="",k=[],E=[];Ue.addEventListener("click",t=>{if(t.target.nodeName==="use"){const e=t.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.id,s=k.filter(r=>r._id!==e),a=s.filter(r=>r._id),i=ie(s);w.innerHTML=i,localStorage.setItem("keyID",JSON.stringify(a))}});const Ge=async()=>{if(listID=JSON.parse(locale.storage("keyID")),E===null&&(E=[]),E.length===0){I.classList.contains("is-visible")&&I.classList.remove("is-visible");return}else try{k=(await Promise.all(E.map(e=>He(e)))).map(e=>e.data),J=ie(k),w&&(I.classList.add("is-visible"),w.insertAdjacentHTML("beforeend",J))}catch(t){g.error({title:"Error",message:`${t.message}`,position:"topRight"})}};w&&Ge();function Je(){const t=document.querySelector(".js-header-nav-list"),e=document.querySelector(".logo"),s=document.querySelector(".menu-btn"),a=document.querySelector(".close-btn-menu"),i=document.querySelector(".mobile-menu-backdrop"),r=document.querySelectorAll(".menu-item");s&&s.addEventListener("click",()=>{i.classList.add("is-open")}),a&&a.addEventListener("click",()=>{i.classList.remove("is-open")}),r&&r.forEach(o=>{o.addEventListener("click",()=>{i.classList.remove("is-open")})});const n=localStorage.getItem("activePath"),d=window.location.pathname;t.querySelectorAll(".nav-link").forEach(o=>{const l=o.closest(".nav-item");o.getAttribute("href")===n||o.getAttribute("href")===d||d==="/"&&o.getAttribute("href")==="./index.html"?(o.classList.add("js-nav-link-active"),l.classList.add("js-nav-item-active")):(o.classList.remove("js-nav-link-active"),l.classList.remove("js-nav-item-active"))}),t.addEventListener("click",o=>{const l=o.target.closest(".nav-link");if(!l)return;const u=l.closest(".nav-item");t.querySelectorAll(".js-nav-link-active").forEach(c=>{c.classList.remove("js-nav-link-active")}),t.querySelectorAll(".js-nav-item-active").forEach(c=>{c.classList.remove("js-nav-item-active")}),l.classList.add("js-nav-link-active"),u.classList.add("js-nav-item-active"),localStorage.setItem("activePath",l.getAttribute("href"))}),e.addEventListener("click",()=>{t.querySelectorAll(".js-nav-link-active").forEach(u=>{u.classList.remove("js-nav-link-active")}),t.querySelectorAll(".js-nav-item-active").forEach(u=>{u.classList.remove("js-nav-item-active")});const o=t.querySelector('.nav-link[href="./index.html"]'),l=o==null?void 0:o.closest(".nav-item");o&&l&&(o.classList.add("js-nav-link-active"),l.classList.add("js-nav-item-active")),localStorage.setItem("activePath","./index.html")})}Je();document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector(".footer__form");t&&t.addEventListener("submit",async function(e){e.preventDefault();const s=document.querySelector(".footer__input"),a=s.value.trim();if(!/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(a)){g.error({title:"Помилка",message:"Будь ласка, введіть коректну email адресу.",position:"bottomRight"});return}try{const r=await fetch("https://your-energy.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a})}),n=await r.json();r.status===201?g.success({title:"Успіх",message:n.message||"Ви успішно підписались на розсилку!",position:"topRight"}):r.status===400?g.warning({title:"Увага",message:n.message||"Некоректні дані. Перевірте ваш email.",position:"topRight"}):r.status===409?g.warning({title:"Увага",message:n.message||"Цей email вже підписаний.",position:"topRight"}):g.error({title:"Помилка",message:n.message||"Сталася помилка. Спробуйте пізніше.",position:"topRight"})}catch{g.error({title:"Помилка",message:"Не вдалося підключитися до сервера. Спробуйте пізніше.",position:"topRight"})}s.value=""})});const P=document.querySelector(".scroll-up-btn");window.addEventListener("scroll",()=>{window.scrollY>0?P.classList.add("visible"):P.classList.remove("visible")});P.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=main-uFRZoWkB.js.map
