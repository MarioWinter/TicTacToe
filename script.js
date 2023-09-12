
let fields = [
    null,
    'circle',
    null,
    'cross',
    null,
    null,
    null,
    null,
    null, 
];

function init() {
    render();
}


function render() {
    const container = document.getElementById('content');

    // Erstellen des HTML-Codes für die Tabelle
    let tableHtml = '<table id="board">';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            tableHtml += '<td class="' + (fields[index] || '') + '">';
            tableHtml += fields[index] === 'circle' ? 'o' : (fields[index] === 'cross' ? 'x' : '');
            tableHtml += '</td>';
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    // Rendern der Tabelle im Container mit innerHTML
    container.innerHTML = tableHtml;
}