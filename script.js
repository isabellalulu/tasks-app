const { ipcRenderer } = require('electron');


const addBtn = document.getElementById('addBtn');
const newTask = document.getElementById('newTask');
const tasks = document.getElementById('tasks');

function updateCalendar(){
    const now = new Date();
    const day = now.getDate();
    // Formata para pt-BR e remove o ponto que às vezes aparece
    const dayName = now.toLocaleDateString("pt-BR", { weekday : "long"});
    const month = now.toLocaleDateString ("pt-BR", { month: "long"});

    document.getElementById('day-number').textContent = day;
    document.getElementById('month').textContent = month.toUpperCase();
    document.getElementById('dayName').textContent = dayName.toUpperCase();
}

// Lógica de Adicionar Tarefa
addBtn.addEventListener("click", (e) => {
    const taskText = newTask.value.trim();

    if (taskText !== "") {
        const task = document.createElement("div");
        task.className = "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-check";
        checkbox.addEventListener("change", updateProgress);

        const textSpan = document.createElement("span");
        textSpan.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "&times;"; 
        removeBtn.className = "btn-deletar"; 
        
        removeBtn.addEventListener("click", () => {
            task.remove();
            updateProgress();
        });
        
        task.appendChild(checkbox);
        task.appendChild(textSpan);
        task.appendChild(removeBtn);

        tasks.appendChild(task);
        
        newTask.value = "";
        updateProgress();
    }
});

function updateProgress() {
    const checkboxes = document.querySelectorAll('.task-check');
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;

    const progressPercent = total === 0 ? 0 : (checked / total) * 100;
    
    const fill = document.querySelector('.progress-fill');
    if(fill) fill.style.width = `${progressPercent}%`;

    const label = document.getElementById("progress-label");
    if(label) label.textContent = `${checked} / ${total} COMPLETAS`;
}

// Fechar App
document.getElementById('close-btn').addEventListener('click', () => {
    ipcRenderer.send('close-app');
});

// Inicialização
updateCalendar();
updateProgress();