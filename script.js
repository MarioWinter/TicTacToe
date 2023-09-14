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

let currentPlayer = 'circle'; // Startspieler

function init() {
    render();
}


function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikal
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return pattern;
        }
    }
    return null;
}

function drawWinLine(pattern) {
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


function handleCellClick(index) {
    // Überprüfen, ob das Feld bereits belegt ist
    if (fields[index] === null) {
        // Das Feld ist frei, wir setzen den Spielstein und den HTML-Code
        fields[index] = currentPlayer;
        const cell = document.getElementById(`cell-${index}`);
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVGCode() : generateCrossSVGCode();
        
        // Entfernen des onclick-Attributs, um weitere Klicks zu verhindern
        cell.removeAttribute('onclick');

        // Überprüfen, ob das Spiel vorbei ist
        const winPattern = checkWin();
        if (winPattern) {
            drawWinLine(winPattern);
        } else {
            // Wechseln zum nächsten Spieler
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        }
    }
}


function render() {
    const container = document.getElementById('content');

    // Erstellen des HTML-Codes für die Tabelle
    let tableHtml = '<table id="board">';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            tableHtml += `<td id="cell-${index}" class="${fields[index] || ''}"`;
            if (fields[index] === null) {
                tableHtml += ` onclick="handleCellClick(${index})"`;
            }
            tableHtml += '>';
            if (fields[index] === 'circle') {
                tableHtml += generateCircleSVGCode();
            } else if (fields[index] === 'cross') {
                tableHtml += generateCrossSVGCode();
            }
            tableHtml += '</td>';
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    // Rendern der Tabelle im Container mit innerHTML
    container.innerHTML = tableHtml;
}


function generateCircleSVGCode() {
    const width = 70;
    const height = 70;
    const color = "#00B0EF";

    const svgCode = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) / 2 - 5}" fill="none" stroke="${color}" stroke-width="10">
                <animate attributeName="r" begin="0s" dur="200ms" values="0;${Math.min(width, height) / 2 - 5}" calcMode="linear" repeatCount="1" />
            </circle>
        </svg>
    `;

    return svgCode;
}

function generateCrossSVGCode() {
    const width = 50;
    const height = 50;
    const color = "#FFC000";

    const svgCode = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${color}" stroke-width="10" stroke-dasharray="${Math.sqrt(width * width + height * height)} 0" stroke-linecap="round">
                <animate attributeName="stroke-dasharray" begin="0s" dur="200ms" values="0 ${Math.sqrt(width * width + height * height)};${Math.sqrt(width * width + height * height)} ${Math.sqrt(width * width + height * height)}" calcMode="linear" repeatCount="1" />
            </line>
            <line x1="0" y1="${height}" x2="${width}" y2="0" stroke="${color}" stroke-width="10" stroke-dasharray="${Math.sqrt(width * width + height * height)} 0" stroke-linecap="round">
                <animate attributeName="stroke-dasharray" begin="0s" dur="200ms" values="0 ${Math.sqrt(width * width + height * height)};${Math.sqrt(width * width + height * height)} ${Math.sqrt(width * width + height * height)}" calcMode="linear" repeatCount="1" />
            </line>
        </svg>
    `;

    return svgCode;
}

