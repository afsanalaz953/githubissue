const cardsContainer = document.getElementById("cardsContainer")



let currentTab = "all";
 let allIssues = [];  

const filterBtnAll = document.getElementById("btnAll")
const filterBtnOpen = document.getElementById("btnOpen")
const filterBtnClosed = document.getElementById("btnClosed")
const totalCountElement = document.getElementById("totalCount")
const openAvatar = document.getElementById("openAvatar")
const closedAvatar = document.getElementById("closedAvatar")
const modalContent = document.getElementById("modalContent")
const modalTitle = document.getElementById("modalTitle")
const modalStatus = document.getElementById("modalStatus")
const modalAuthor = document.getElementById("modalAuthor")
const modalDate = document.getElementById("modalDate")
const modalDescription = document.getElementById("modalDescription");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");
const bugButton = document.getElementById("bugButton");
const helpButton = document.getElementById("helpButton");



function filterAndDisplayIssues() {
    let filteredIssues = []
    
    if (currentTab === 'open') {
        filteredIssues = allIssues.filter(data => data.status === 'open')
        totalCountElement.innerText = filteredIssues.length + ' Issues';
    } else if (currentTab === 'closed') {
        filteredIssues = allIssues.filter(data => data.status === 'closed')
        totalCountElement.innerText = filteredIssues.length + ' Issues';
    } else {
        filteredIssues = allIssues // 'all' tab
         totalCountElement.innerText = filteredIssues.length + ' Issues';
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

    if (id === 'btnAll') {
        currentTab = 'all';
    } else if (id === 'btnOpen') {
        currentTab = 'open';
    } else if (id === 'btnClosed') {
        currentTab = 'closed';
    }

    
     filterAndDisplayIssues(); 
}


async function loadCards() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
     allIssues = data.data;
    displayIssues(data);
}
// modal start
  async function openCardModal (issueId) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    const data = await res.json();
    const modalDetails = data.data
    console.log(issueId, "issueId");
    modalTitle.textContent = modalDetails.title
    modalStatus.textContent = modalDetails.status

    const date = new Date(data.createdAt);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
     modalAuthor.textContent = `Opened by ${modalDetails.author}`
    modalDate.textContent = modalDetails.formattedDate;
    modalDescription.textContent = modalDetails.description;
    modalAssignee.textContent = modalDetails.assignee, `${modalDetails.author}`;
    modalPriority.textContent = modalDetails.priority 

modalPriority.className = "px-4 py-1 rounded-2xl capitalize";
    if (modalDetails.priority === "high") {
      modalPriority.classList.add("bg-red-400", "text-white");
    } else if (modalDetails.priority === "medium") {
      modalPriority.classList.add("bg-yellow-400", "text-black", "p-200", "font-bold", "text-2xl");
    } else if (modalDetails.priority === "low") {
      modalPriority.classList.add("bg-green-400", "text-black");
    }
 bugButton.classList.add("hidden");
    helpButton.classList.add("hidden");
    
    if (modalDetails.labels && modalDetails.labels.length > 0) {
      modalDetails.labels.forEach(label => {
        if (label.toLowerCase() === "bug") {
          bugButton.classList.remove("hidden");
        } else if (label.toLowerCase() === "help wanted") {
          helpButton.classList.remove("hidden");
        }
      });
    }
    
     modalContent.showModal();
  }   
  






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
<div class="bg-white rounded-xl" onclick="openCardModal(${data.id})">
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



