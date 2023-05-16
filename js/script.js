
var currentPlayer = "player1"
var allowUserInput = true

const table = [
    false, false, false,
    false, false, false,
    false, false, false
]

var tableCount = 0;


const player1 = {
    id: "player1",
    points: 0
}

const player2 = {
    id: "player2",
    points: 0
}


function switchCurrentPlayer() {
    let element = document.getElementById("cplayer-ball")
    
    if (currentPlayer == "player1") {
        currentPlayer = "player2"
        element.style.backgroundImage = 'url(./assets/circle.svg)'
     
    } else {
        currentPlayer = "player1"
        element.style.backgroundImage = 'url(./assets/close.svg)'
    }
}

function clearTable() {
    const minhaDiv = document.getElementById("tabuleiro")

    const elementosFilhos = minhaDiv.querySelectorAll("*");
    elementosFilhos.forEach(elemento => {
        elemento.classList.remove("player1")
        elemento.classList.remove("player2")
        elemento.classList.remove("win")
        elemento.classList.remove("nowinner")
    });

    for (let i = 0; i < table.length; i++) {
        table[i] = false
    }
    tableCount = 0;
}


function setNoWinnerUi() {
    const minhaDiv = document.getElementById("tabuleiro")
    const elementosFilhos = minhaDiv.querySelectorAll("*");
    elementosFilhos.forEach(elemento => {
        elemento.classList.add("nowinner")
    });
}





function checkForWinner() {
    const players = ["player1", "player2"]
    const combinations = [
        [ 0, 1, 2],
        [ 3, 4, 5],
        [ 6, 7, 8],
        [ 0, 3, 6],
        [ 1, 4, 7],
        [ 2, 5, 8],
        [ 2, 4, 6],
        [ 0, 4, 8]
    ]
    for (let i = 0; i < players.length; i++) {
        let cplayer = players[i]
        for( let i = 0 ; i < combinations.length ; i++ ) {
            if (table[combinations[i][0]] == cplayer && table[combinations[i][1]] == cplayer && table[combinations[i][2]] == cplayer) {
                return [cplayer, combinations[i]];
            }
        }
    }
}




function setOldWomanChat(message) {
    document.getElementById("old-woman-chat").innerText = message
}


function play(element) {
    
    if (!allowUserInput) return;
 
    const irmaos = element.parentNode.children;
    const posicao = Array.prototype.indexOf.call(irmaos, element);
    if (table[posicao] != false) return;
    element.classList.add(currentPlayer);

    table[posicao] = currentPlayer
    let combination = checkForWinner()
    
   
    if (combination) {
        let playerWinner = combination[0]
        let sequencia =  combination[1]
        const divChildren = element.parentNode.querySelectorAll('div');

        for( let i = 0 ; i < sequencia.length ; i++) {
          divChildren[sequencia[i]].classList.add("win")
        } 
        let points = 0;
        if (player1.id == playerWinner) {
            player1.points += 1;
            points = player1.points
        }
        if (player2.id == playerWinner) {
            player2.points += 1;
            points = player2.points
        }

        document.getElementById(playerWinner + "-points").innerText = points
        setOldWomanChat("PARABENS !!!\n"+playerWinner +" VOCÊ VENCEU")
        allowUserInput = false
        setTimeout(function () {
            clearTable();
            
            setOldWomanChat("VAMOS VER QUEM VAI SE SAIR MELHOR AGORA")
            setTimeout(function() {
                setOldWomanChat("VALENDO !")
                allowUserInput = true
            },3000)
        }, 3000)
    } else {
        switchCurrentPlayer();
        if ( !combination) {
            setOldWomanChat("VEZ DO JOGADOR "+ currentPlayer.toUpperCase() )
       }
    }

    tableCount = tableCount + 1;
   
    if (tableCount === table.length) {
        if ( !combination  ) {
            setNoWinnerUi();
            setOldWomanChat("È NÂO TEMOS VENCEDORES AQUI VAMOS TENTAR DENOVO")
        }
       
        allowUserInput = false
        setTimeout(function () {
            clearTable();

            allowUserInput = true
            setOldWomanChat("VALENDO !")
        }, 3000)

    }
}