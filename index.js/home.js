const cardsContainer = document.getElementById("cardsContainer")



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
        <h2 class="line-clamp-2 font-bold">Fix navigation menu on mobile devices</h2>
        <p class="line-clamp-2 text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices...</p>
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