// Se você mudou o main.js como sugeri acima, isso vai funcionar:
const { ipcRenderer } = require('electron');

function updateCalendar(){
    const now = new Date();
    const day = now.getDate();
    const monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", 
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

    const month = monthNames[now.getMonth()];

    // Usando textContent para garantir a exibição
    document.getElementById('day-number').textContent = day;
    document.getElementById('month').textContent = month;
}

// Inicializa
updateCalendar();

// Botão fechar
document.getElementById('close-btn').addEventListener('click', () => {
    ipcRenderer.send('close-app');
});

