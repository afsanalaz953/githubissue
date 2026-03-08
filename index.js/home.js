const cardsContainer = document.getElementById("cardsContainer")
let currentTab = "all"

const filterBtnAll = document.getElementById("btnAll")
const filterBtnOpen = document.getElementById("btnOpen")
const filterBtnClosed = document.getElementById("btnClosed")


document.addEventListener('DOMContentLoaded', function() {
  
    filterBtnAll.classList.remove("btn", "btn-outline")
    filterBtnAll.classList.add("btn", "btn-active", "btn-primary", "bg-blue-600")
    
    filterBtnOpen.classList.remove("btn-active" )
    filterBtnOpen.classList.add("btn", "btn-outline")
    
    filterBtnClosed.classList.remove("btn-active" )
    filterBtnClosed.classList.add("btn", "btn-outline")
})

function switchTab(id) {
    console.log(id);
    
    filterBtnAll.classList.remove("btn-active", "btn-primary", "bg-blue-600" )
    filterBtnAll.classList.add("btn", "btn-outline")
    
    filterBtnOpen.classList.remove("btn-active", "btn-primary", "bg-blue-600")
    filterBtnOpen.classList.add("btn", "btn-outline")
    
    filterBtnClosed.classList.remove("btn-active", "btn-primary","bg-blue-600" )
    filterBtnClosed.classList.add("btn", "btn-outline")
    
    const selected = document.getElementById(id)
    selected.classList.remove("btn", "btn-outline")
    selected.classList.add("btn", "btn-active", "btn-primary", "bg-blue-600")
}





async function loadCards() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    displayIssues(data);
}
function displayIssues(datas) {
    console.log(datas);
        datas.data.forEach(data => {
        console.log(data)
const card = document.createElement("div")
card.className = "bg-white shadow-2xs mt-6 p-2 rounded-2xl space-y-2"
card.innerHTML =`
<div class="flex gap-6 justify-between">
            <div><img src="./assets/Open-Status.png" alt=""></div>
           <button class="btn rounded-full bg-pink-100 text-red-400">HIGH</button>
        </div>
        <h2 class="line-clamp-2 font-bold">${data.title}</h2>
        <p class="line-clamp-2 text-[#64748B]">${data.description}</p>
        <div class="flex gap-2">
            <button class=" w-15 p-0 gap-0 btn rounded-full bg-pink-100 text-red-400">
                <span><i class="fa-solid fa-bug"></i></span>BUG</button>
            <button class="w-30 p-0 btn rounded-full bg-pink-100 text-red-400"> <span><i class="fa-solid fa-life-ring"></i></span>
                help wanted</button>
        </div>
        <div><hr></div>
        <div>
            <p class=" text-[#64748B]">#1
by john_doe</p>
            <p class=" text-[#64748B]">1/15/2024</p>
        </div>
        </div>
`
 cardsContainer.appendChild(card);
})
}
loadCards();