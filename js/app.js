let deck = [];
let pointsPlayer = 0;
let pointsComputer = 0;
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'k', 'Q'];
const pedir = document.querySelector('#ask');
const detener = document.querySelector('#stop');
const reset = document.querySelector('#new');
const points = document.querySelectorAll('small');
const cardsPlayer = document.querySelector('#player-cards');
const cardsComputer = document.querySelector('#computer-cards');


// Eventos
pedir.addEventListener('click', () =>{

    const carta = pedirCarta();

    pointsPlayer = pointsPlayer + valorCarta(carta);
    points[0].innerText = pointsPlayer;

    // crear cartas
    const cardsImg = document.createElement('img');
    cardsImg.src = `/cartas/${carta}.png`;
    cardsImg.classList.add('carta');
    //insertar cartas
    cardsPlayer.append(cardsImg);

    if (pointsPlayer > 21) {
        console.warn('Perdiste, jodete');
        pedir.disabled = true;
        detener.disabled = true;
        turnoComputer(pointsPlayer);
    }else if (pointsPlayer === 21){
        console.warn('21, no más');
        pedir.disabled = true;
        detener.disabled = true;
        turnoComputer(pointsPlayer)
    }

})

detener.addEventListener('click', ()=>{
    pedir.disabled = true;
    detener.disabled = true;
    turnoComputer( pointsPlayer)
})

reset.addEventListener('click',()=>{
    deck = crearDeck();

    pointsPlayer = 0;
    pointsComputer = 0;
    points[0].innerHTML = 0;
    points[1].innerHTML = 0;

    cardsPlayer.innerHTML = '';
    cardsComputer.innerHTML = '';

    pedir.disabled = false;
    detener.disabled = false;

    console.clear();
})






//funciones

// crear deck
const crearDeck = () =>{

    for( i= 2; i < 11; i++){
       for( tipo of tipos ){
           deck.push(i + tipo);
       }
    };

    for(tipo of tipos){
        for(esp of especiales){
            deck.push(esp + tipo);
        }
    }
    // libreria underscore
    deck = _.shuffle(deck);
    return deck
}

crearDeck();

//tomar carta
const pedirCarta = () =>{
    if(deck.length == 0){
        throw 'No hay mas cartas';
    }

    const carta = deck.pop();
    return carta;
}

//valor de carta
const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length -1) ;

    return(isNaN(valor)) ? 
        (valor === 'A') ? 11 : 10
        : parseInt(valor);

    
}

//computadora
const turnoComputer = (pointsMin) => {
    do {
        const carta = pedirCarta();

        pointsComputer = pointsComputer + valorCarta(carta);
        points[1].innerText = pointsComputer;

        // crear cartas
        const cardsImg = document.createElement('img');
        cardsImg.src = `/cartas/${carta}.png`;
        cardsImg.classList.add('carta');
        //insertar cartas
        cardsComputer.append(cardsImg);
        
        if(pointsMin > 21){break};

    } while ( (pointsComputer < pointsMin) && (pointsMin <= 21));
    

    setTimeout(()=>{
        if (pointsComputer === pointsMin) {
            alert('empate');
        } else if(pointsMin > 21) {
            alert('Perdiste, Jodete');
        } else if(pointsComputer > 21){
            alert('Ganaste, al fin');
        } else{
            alert('Perdiste, jodete')
        }


    }, 1000);


    
}



