const dictionary = ['earth', 'plane', 'crane', 'audio', 'steam']
const dictionaryThree = ['cat', 'hat', 'bat', 'rat', 'fat']

let gameComplete = false
let colAmt = parseInt(document.getElementById("colAmt").value);
let rowAmt = parseInt(document.getElementById("rowAmt").value);


const state = {
    
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    // grid: Array(6).fill().map(() => Array(5).fill('')),
    grid: Array(rowAmt).fill().map(() => Array(colAmt).fill('')),
    currentRow: 0,
    currentCol: 0
};

//console.log(`initial state.grid ${state.grid[0][0]}`)

function clearGrid(){
    document.getElementById("game").innerHTML = "";
    state.grid = Array(rowAmt).fill().map(() => Array(colAmt).fill(''))
    state.currentRow = 0,
    state.currentCol = 0;

    
}

function updateGridSize(){
    if (document.getElementById("colAmt").value != colAmt) {
        state.secret = dictionaryThree[Math.floor(Math.random() * dictionaryThree.length)];
        console.log(state.secret)
    }
    colAmt = document.getElementById("colAmt").value;
    rowAmt = document.getElementById("rowAmt").value;
    
    const root = document.documentElement;
    root.style.setProperty('--colAmt', colAmt)
    root.style.setProperty('--rowAmt', rowAmt)
    
    document.getElementById("colAmt").setAttribute("colChoice", colAmt);
    document.getElementById("rowAmt").setAttribute("rowChoice", rowAmt);

    const game = document.getElementById('game');

    
    clearGrid();
    drawGrid(game);
}


function updateGrid(){
    
    
    if (gameComplete == true){
        return;
    }else {
    for (let i = 0; i < state.grid.length; i++){
        for (let j=0; j < state.grid[i].length; j++){
            const box = document.getElementById(`box${i}${j}`)
            
            box.textContent = state.grid[i][j];
        };
    };
};
};

function drawBox(container, row, col, letter=''){

    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box)
    return box;
};

function drawGrid(container){

    const grid = document.createElement('div')
    grid.className = 'grid';

    colAmt = document.getElementById("colAmt").value;
    rowAmt = document.getElementById("rowAmt").value;

    //Row Creation Loop
    for (let i = 0; i < rowAmt; i++){ 

        //Column Creation Loop
        for (let j=0; j < colAmt; j++){ 

            drawBox(grid, i, j)
        };
    };

    container.appendChild(grid)
};

function registerKeyboardEvents(){
    document.body.onkeydown = (e) => {
        colAmt = document.getElementById("colAmt").value;
        rowAmt = document.getElementById("rowAmt").value;

        const key = e.key
        //console.log(key)
        if (key === 'Enter') {  

            
            //changing 5 to colAmt
            if (state.currentCol == colAmt){
                const word = getCurrentWord();
                console.log("here")
                if (isWordValid(word)){
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                    

                } else{
                    alert("Not a real word")
                }
            }
        }
        if (key === 'Backspace'){          
            removeLetter();
        }
        if (isLetter(key)){
            //console.log(`${state.currentRow}${state.currentCol}`)
            addLetter(key);
        }

        updateGrid();
        
    };
};

function getCurrentWord(){
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word){
    return dictionary.includes(word);
}

function revealWord(guess){
    const row = state.currentRow
    colAmt = document.getElementById("colAmt").value;
    rowAmt = document.getElementById("rowAmt").value;

    //changing 5 to colAmt
    
    for (let i = 0; i < colAmt; i++){
        const box = document.getElementById(`box${row}${i}`)
        const letter = box.textContent

        if (letter === state.secret[i]){
            box.classList.add('right');
        } else if (state.secret.includes(letter)){
            box.classList.add('wrong');
        } else {
            box.classList.add('empty');
        }
    }
    const isWinner = state.secret === guess;

    //changing 5 to colAmt
    
    const isGameOver = state.currentRow === rowAmt;

    if (isWinner) {

        gameComplete = true;
        return;
        //alert('Congratulations!');

    } else if (isGameOver){
        gameComplete = true;
        alert(`Better luck next time! The word was ${state.secret}.`)
    }
    
}

function isLetter(key){
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
    if (state.currentCol == colAmt) return;
    //console.log("intersection: " + `${state.currentRow}${state.currentCol}`)
    // console.log("intersection val: " + state.grid[state.currentRow][state.currentCol])
    // console.log("letter: " + letter)
    console.log(`state.currentRow: ${state.currentRow}`)
    console.log(`state.currentCol: ${state.currentCol}`)
    console.log(`state val: ${state.grid[state.currentRow][state.currentCol]}`)
    state.grid[state.currentRow][state.currentCol] = letter;
    
    //console.log(`${state.currentRow}${state.currentCol}`)
    
    state.currentCol++;
}

function removeLetter(){
    if (state.currentCol === 0) return;    
    state.grid[state.currentRow][state.currentCol-1] = '';
    state.currentCol--;
}
function startup(){
    const game = document.getElementById('game');
    drawGrid(game)

    registerKeyboardEvents();
    console.log(state.secret);
};

startup();