// --- Database (LocalStorage) ---
let db = JSON.parse(localStorage.getItem('FirebirdDB')) || { Files: [], Backups: [] };
const saveDB = () => localStorage.setItem('FirebirdDB', JSON.stringify(db));

// --- UI Logic ---
let FileNumber = 0;

const showView = (viewId, title) => {
    document.getElementById('window').style.display = 'block';
    document.getElementById('windowTitle').innerText = title;
    // Hide all views
    ['ExplorerView', 'EditorView', 'TimerView'].forEach(id => document.getElementById(id).classList.add('hidden'));
    // Show selected
    document.getElementById(viewId).classList.remove('hidden');
};

const closeWindow = () => document.getElementById('window').style.display = 'none';

// --- Events ---
document.getElementById('Close').onclick = closeWindow;

document.getElementById('Files').onclick = () => {
    showView('ExplorerView', 'File Explorer');
    refreshFiles();
};

document.getElementById('text').onclick = () => showView('EditorView', 'Text Editor');

document.getElementById('clock').onclick = () => showView('TimerView', 'Timer');

// Save Text
document.getElementById('SaveText').onclick = () => {
    const newFile = {
        name: document.getElementById('TextTitle').value || 'Untitled',
        data: document.getElementById('TextData').value,
        type: 'text',
        date: Date.now()
    };
    db.Files.push(newFile);
    saveDB();
    alert("File Saved to Firebird Storage!");
    document.getElementById('TextTitle').value = "";
    document.getElementById('TextData').value = "";
};

// Refresh/Navigation
function refreshFiles() {
    const files = db.Files;
    const nameEl = document.getElementById('FileName');
    const contentEl = document.getElementById('FileContent');
    const numEl = document.getElementById('FileNumber');

    if (files.length === 0) {
        nameEl.innerText = "No Files Found";
        contentEl.innerText = "Create a text file to see it here.";
        return;
    }

    if (FileNumber >= files.length) FileNumber = files.length - 1;
    if (FileNumber < 0) FileNumber = 0;

    let current = files[FileNumber];
    nameEl.innerText = current.name + ".txt";
    contentEl.innerText = current.data;
    numEl.innerText = `${FileNumber + 1} / ${files.length}`;
}

document.getElementById('FileForward').onclick = () => { FileNumber++; refreshFiles(); };
document.getElementById('FileBackward').onclick = () => { FileNumber--; refreshFiles(); };

document.getElementById('DeleteFile').onclick = () => {
    db.Files.splice(FileNumber, 1);
    saveDB();
    refreshFiles();
};

// Timer Logic
document.getElementById('Starttimer').onclick = () => {
    let mins = document.getElementById('timerinput').value;
    alert(`Timer set for ${mins} minutes!`);
    setTimeout(() => {
        new Audio('https://studio.code.org/blockly/media/category_notifications/lighthearted_notification_3.mp3').play();
        alert("FIREBIRD ALERT: Time is up!");
    }, mins * 60000);
};

console.log("idk some engine thing loaded LOLLLLLLL");
