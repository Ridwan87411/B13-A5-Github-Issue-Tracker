const container = document.getElementById("issues")
const issueCount = document.getElementById("issueCount")

// LOGIN

function login(){

const user = document.getElementById("username").value
const pass = document.getElementById("password").value

if(user==="admin" && pass==="admin123"){

document.getElementById("loginPage").style.display="none"
document.getElementById("mainPage").style.display="block"

loadIssues()

}
else{
alert("Invalid credentials")
}

}

// ACTIVE BUTTON

function setActive(event){

const buttons=document.querySelectorAll(".tab-btn")

buttons.forEach(btn=>btn.classList.remove("active"))

event.target.classList.add("active")

}

// LOAD ALL ISSUES

function loadIssues(){

container.innerHTML=`<div class="loading">Loading...</div>`

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

.then(res=>res.json())

.then(data=>displayIssues(data.data))

}

// DISPLAY ISSUES

function displayIssues(issues){

container.innerHTML=""

issueCount.innerText = issues.length

issues.forEach(issue=>{

const div=document.createElement("div")

div.classList.add("card")

if(issue.status==="closed"){
div.classList.add("closed")
}

div.innerHTML=`

<h3>${issue.title}</h3>
<p>${issue.description}</p>
<p><b>Status:</b> ${issue.status}</p>
<p><b>Author:</b> ${issue.author}</p>
<p><b>Priority:</b> ${issue.priority}</p>
<p>${issue.createdAt}</p>

`

div.onclick=()=>openModal(issue)

container.appendChild(div)

})

}

// OPEN ISSUES

function loadOpen(){

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

.then(res=>res.json())

.then(data=>{

const openIssues=data.data.filter(issue=>issue.status==="open")

displayIssues(openIssues)

})

}

// CLOSED ISSUES

function loadClosed(){

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

.then(res=>res.json())

.then(data=>{

const closedIssues=data.data.filter(issue=>issue.status==="closed")

displayIssues(closedIssues)

})

}

// SEARCH

function searchIssue(){

const text=document.getElementById("searchInput").value

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

.then(res=>res.json())

.then(data=>displayIssues(data.data))

}

// MODAL

function openModal(issue){

document.getElementById("modal").style.display="flex"

document.getElementById("modalTitle").innerText=issue.title
document.getElementById("modalDesc").innerText=issue.description
document.getElementById("modalAuthor").innerText="Author: "+issue.author
document.getElementById("modalPriority").innerText="Priority: "+issue.priority
document.getElementById("modalDate").innerText="Created: "+issue.createdAt

}

function closeModal(){

document.getElementById("modal").style.display="none"

}