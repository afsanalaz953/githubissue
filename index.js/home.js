const cardsContainer = document.getElementById("cardsContainer")
let currentTab = "all";
 let allIssues = [];  

const filterBtnAll = document.getElementById("btnAll")
const filterBtnOpen = document.getElementById("btnOpen")
const filterBtnClosed = document.getElementById("btnClosed")


// ai

function filterAndDisplayIssues() {
    let filteredIssues = []
    
    if (currentTab === 'open') {
        filteredIssues = allIssues.filter(data => data.status === 'open')
    } else if (currentTab === 'closed') {
        filteredIssues = allIssues.filter(data => data.status === 'closed')
    } else {
        filteredIssues = allIssues // 'all' tab
    }
    
    displayIssues({ data: filteredIssues });
}




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
// from ai





function displayIssues(datas) {
    console.log(datas);
        datas.data.forEach(data => {
        console.log(data)
const card = document.createElement("div")
 let borderClass = '';
        if (data.status === 'open') {
            borderClass = 'status-open-card';
        } else if (data.status === 'closed') {
            borderClass = 'status-closed-card';
        }
card.className = `bg-white shadow-2xs mt-2 p-2 rounded-2xl space-y-2 ${borderClass}`.trim();
card.innerHTML =`
<div class="bg-white rounded-xl ">
<div class="flex gap-6 justify-between ">
            <div>
                    ${data.status === 'open' 
                        ? '<img src="./assets/Open-Status.png" alt="Open" class="w-5 h-5">' 
                        : '<img src= "./assets/Closed- Status .png" alt="Closed" class="w-5 h-5">'
                    }
                </div>
           <button class="btn rounded-full ${getPriorityClasses(data.priority)}">
            ${data.priority.toUpperCase()}</button>
        </div>
        <h2 class="line-clamp-2 font-bold">${data.title}</h2>
        <p class="line-clamp-2 text-[#64748B]">${data.description}</p>
        <div class="flex gap-2 labels-container">
            <button class=" w-15 p-0 gap-0 btn rounded-full bg-pink-100 text-red-400">
                <span><i class="fa-solid fa-bug"></i></span>BUG</button>
            <button class="w-30 p-0 btn rounded-full bg-pink-100 text-red-400"> <span><i class="fa-solid fa-life-ring"></i></span>
                help wanted</button>
        </div>
        <div><hr></div>
        <div class="gap-2">
        <p class=" text-[#64748B]">#${data.id} <span>by ${data.author}</span></p>
       <p class=" text-[#64748B]">${data.createdAt}</p>
        </div>
        </div>
`
 cardsContainer.appendChild(card);
})
}
loadCards();


function getPriorityClasses(priority) {
  const classes = {
    'high': 'bg-pink-100 text-red-400',
    'medium': 'bg-yellow-100 text-yellow-600',
    'low': 'bg-green-100 text-green-600'
  };
  
  return classes[priority.toLowerCase()] || 'bg-gray-100 text-gray-600';
}



