// Se você mudou o main.js como sugeri acima, isso vai funcionar:
const { ipcRenderer } = require('electron');

function updateCalendar(){
    const now = new Date();
    const day = now.getDate();
    const dayName = now.toLocaleDateString("pt-BR", { weekday : "long"});
    const month = now.toLocaleDateString ("pt-BR", { month: "long"});

    // Usando textContent para garantir a exibição
    document.getElementById('day-number').textContent = day;
    document.getElementById('month').textContent = month;
    document.getElementById('dayName').textContent = dayName;
}

// Inicializa
updateCalendar();

// Botão fechar
document.getElementById('close-btn').addEventListener('click', () => {
    ipcRenderer.send('close-app');
});

