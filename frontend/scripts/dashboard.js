const token = localStorage.getItem("token")
console.log(token)

// fetch("http://localhost:5000/user/todos", {
//     method: "GET",
//     headers: { 'Authorization': `Bearer ${token}` },
// })
// .then(async res => {
//         const data = await res.json();
//         const container = document.getElementById("h1");
// container.innerHTML = ""; 

// data.result.forEach(todo => {
//     container.innerHTML += `
//             Title : ${todo.title}<br>
//             Description : ${todo.description}<br>
//             Due time: ${todo.due_time}<br>
//             Status : ${todo.status}<br>
//     `;
// });

// });




// Data model
let tasks = [];
let editedTaskId = null;
let currentStatus = 'todo';
let currentView = 'kanban';

// ------ Render Kanban
function renderKanban() {
  ['todo','doing','done'].forEach(status=>{
    let col = document.getElementById(status);
    col.innerHTML = '';
    tasks.filter(t=>t.status === status).forEach(task=>{
      let el = document.createElement('div');
      el.className = 'kanban-task';
      el.style.setProperty('--task-bg', task.color);
      el.innerHTML = `
        <strong>${task.title}</strong> 
        <div>${task.description}</div>
        <div>${task.due_time}</div>
        <div class="actions">
          <button onclick="editTask(${task.id})" aria-label="Modifier">✏️</button>
          <button onclick="deleteTask(${task.id})" aria-label="Supprimer">🗑</button>
        </div>`;
      el.draggable = true;
      el.ondragstart = (e)=>{
        e.dataTransfer.setData("text/plain", JSON.stringify({id: task.id, status: status}));
      };
      col.appendChild(el);
    });
    col.ondragover = (e)=>{ e.preventDefault(); };
    col.ondrop = (e)=>{
      let data = JSON.parse(e.dataTransfer.getData("text/plain"));
      moveTask(data.id, status);
    };
  });
}

// ------ Render Timeline
function renderTimeline() {
  let board = document.getElementById('timeline');
  board.innerHTML = '';
  tasks.forEach(task=>{
    let el = document.createElement('div');
    el.className = 'timeline-item';
    el.style.setProperty('--task-bg', task.color);
    el.innerHTML = `
      <strong>${task.title}</strong> 
      <div>${task.description}</div>
      <div>${task.due_time}</div>
      <div class="actions">
        <button onclick="editTask(${task.id})" aria-label="Modifier">✏️</button>
        <button onclick="deleteTask(${task.id})" aria-label="Supprimer">🗑</button>
      </div>`;
    board.appendChild(el);
  });
}

// ------ Modals
function openTaskModal(status, id=null) {
  currentStatus = status;
  const modal = document.getElementById('taskModal');
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDesc').value = '';
  document.getElementById('taskDue_time').value = '';
  document.getElementById('taskColor').value = '#6b00ff';
  editedTaskId = null;
  document.getElementById('modalTitle').innerText = id ? "Modifier tâche" : "Nouvelle tâche";
  if(id){
    const task = tasks.find(t=>t.id===id);
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.description;
    document.getElementById('taskDue_time').value = task.due_time;
    document.getElementById('taskColor').value = task.color;
    editedTaskId = id;
    currentStatus = task.status;
  }
  modal.style.display = 'flex';
}
function closeTaskModal(){ document.getElementById('taskModal').style.display='none'; }

// ------ Save, Edit, Delete, Move, Feedback
function saveTask(){
  let title = document.getElementById('taskTitle').value.trim();
  let description = document.getElementById('taskDesc').value.trim();
  let due_time = document.getElementById('taskDue_time').value.trim();
//   let status = document.getElementById('')
  let color = document.getElementById('taskColor').value;
  if(!title) return showToast("Titre obligatoire !", false);
  if(editedTaskId){
    let t = tasks.find(t=>t.id===editedTaskId);
    t.title = title; t.description = description; t.color = color; t.due_time = due_time
    showToast("Tâche modifiée !");
    renderAll();
  } else {
    fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description,
            due_time: due_time,
            status: currentStatus
        })
    })
            .then(async res => {
                const data = await res.json();
                console.log(data)
                showToast("Tâche ajoutée !");
                tasks.push(data);
                renderAll();

            })
}
closeTaskModal();
}
function editTask(id){ openTaskModal(null, id);}
function deleteTask(id){
  tasks = tasks.filter(t=>t.id!==id);
  showToast("Tâche supprimée !");
  renderAll();
}
function moveTask(id, newStatus){
  let t = tasks.find(t=>t.id===id);
  t.status = newStatus;
  showToast("Tâche déplacée !");
  renderAll();
}
function renderAll(){
  renderKanban();
  renderTimeline();
}

// ------ Vue Dashboard
document.getElementById('kanbanBtn').onclick = ()=>{
  currentView='kanban';
  document.getElementById('kanbanView').style.display = '';
  document.getElementById('timelineView').style.display = 'none';
};
document.getElementById('timelineBtn').onclick = ()=>{
  currentView='timeline';
  document.getElementById('kanbanView').style.display = 'none';
  document.getElementById('timelineView').style.display = '';
};
document.getElementById('styleBtn').onclick = ()=>{ document.getElementById('styleModal').style.display = 'flex'; };
function closeStyleModal(){ document.getElementById('styleModal').style.display = 'none'; }
function applyStyle(){
  let color=document.getElementById('mainColorInput').value;
  document.querySelectorAll('.kanban-task,.timeline-item,.add-task-btn,.kanban-column h2').forEach(el=>{
    el.style.setProperty('--task-bg',color);
    el.style.color='#fff';
  });
  document.body.style.setProperty('--main-color',color);
  document.body.style.fontFamily = document.getElementById('fontSelect').value;
  closeStyleModal();
}

// Theme / Mode sombre
document.getElementById('themeToggle').onchange = ()=> {
  document.body.classList.toggle('dark');
};

// Toaster notification bloc note
function showToast(message, ok=true){
  let toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.right = "18px";
  toast.style.bottom = "18px";
  toast.style.background = ok ? "#e7fbe7" : "#ffecec";
  toast.style.color = ok ? "#168054" : "#c52c2c";
  toast.style.padding = "9px 17px";
  toast.style.borderRadius = "8px";
  toast.style.border = "1.2px dashed " + (ok ? "#4be1b1" : "#c52c2c");
  toast.style.fontFamily = "'Fira Mono', 'Roboto Mono', monospace";
  toast.style.boxShadow = "0 2px 16px rgba(60,88,32,0.13)";
  toast.style.zIndex = 1200;
  toast.style.opacity = "0.96";
  document.body.appendChild(toast);
  setTimeout(()=>{ toast.remove(); },1500);
}

// Init
window.onload = renderAll;