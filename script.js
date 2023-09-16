let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikal
    [0, 4, 8], [2, 4, 6] // Diagonal
];


let currentPlayer = 'circle'; // Startspieler

function init() {
    render();
}


function handleClick(cell, index) {
    if (fields[index] === null) {
        //der momentane Spieler wird der geklickten array Position zugewiesen
        fields[index] = currentPlayer;
        //Es wird ein Kreis oder ein Kreuz gesetzt
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        //das Klicken auf die Zelle wird entfernt
        cell.onclick = null;
        //der Spieler wird gewechselt
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        
        if (isGameFinished()) { // es wird geprüft ob das Spiel fertig ist
            const winCombination = getWinningCombination(); // es wird die Gewinner Kombination zurück gegeben
            drawWinningLine(winCombination); // Es wird die Gewinner Linie gezogen
        }
    }
}


function render() {
    const contentDiv = document.getElementById('content');
    // Generate table HTML
    let tableHtml = '<table id="board">';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHtml += `<td id="cell-${index}" onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    // Set table HTML to contentDiv
    contentDiv.innerHTML = tableHtml;
}


function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
}


function getWinningCombination() {
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return winPatterns[i];
        }
    }
    return null;
}


function generateCircleSVG() {
    const width = 70;
    const height = 70;
    const color = "rgb(89,70,207)";

    return `
    <svg width="${width}" height="${height}">
        <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="10" fill="none">
            <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.2s" fill="freeze" />
        </circle>
    </svg>`;
}


function generateCrossSVG() {
    const color = '#FFC000';
    const width = 70;
    const height = 70;
    return `
    <svg width="${width}" height="${height}">
        <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${color}" stroke-width="10">
            <animate attributeName="x2" values="0;${width}" dur="200ms" />
            <animate attributeName="y2" values="0;${height}" dur="200ms" />
        </line>
        <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="${color}" stroke-width="10">
            <animate attributeName="x2" values="${width};0" dur="200ms" />
            <animate attributeName="y2" values="0;${height}" dur="200ms" />
        </line>
    </svg>
    `;
  }
  


function drawWinningLine(pattern) {
    if (pattern) {
        const [a, b, c] = pattern;
        const container = document.getElementById('board');
        const cellA = document.getElementById(`cell-${a}`);
        const cellB = document.getElementById(`cell-${b}`);
        const cellC = document.getElementById(`cell-${c}`);

        const svgns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgns, 'svg');
        const line = document.createElementNS(svgns, 'line');

        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('xmlns', svgns);
        svg.style.position = 'absolute'; // Füge den position-Stil hinzu

        line.setAttribute('x1', cellA.offsetLeft + cellA.clientWidth / 2);
        line.setAttribute('y1', cellA.offsetTop + cellA.clientHeight / 2);
        line.setAttribute('x2', cellC.offsetLeft + cellC.clientWidth / 2);
        line.setAttribute('y2', cellC.offsetTop + cellC.clientHeight / 2);
        line.setAttribute('stroke', 'white');
        line.setAttribute('stroke-width', '5');

        svg.appendChild(line);
        // Füge das SVG-Element vor dem ersten Kind von "board" ein
        container.insertBefore(svg, container.firstChild);
    }
}


function restartGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
    currentPlayer = 'circle';
    document.getElementById('content').innerHTML = "";
    render();
}
