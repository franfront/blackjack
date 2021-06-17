(() =>{
    'use strict';
    let deck = [];
    
    let pointsPlayers = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'k', 'Q'];
    const pedir = document.querySelector('#ask');
    const detener = document.querySelector('#stop');
    const reset = document.querySelector('#new');
    const points = document.querySelectorAll('small');
    const divCardsPLayers = document.querySelectorAll('.divCards');


    // Eventos
    pedir.addEventListener('click', () =>{

        const card = pedirCarta();

        const pointsPlayer = accumulatePoints(card, 0);

        createCard(card, 0); 

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
        turnoComputer( pointsPlayers[0])
    })

    reset.addEventListener('click',()=>{
       game();
    })






    //funciones

    //inicia
    const game = (numPlayers = 2) =>{
       deck = crearDeck();
       pointsPlayers = [];
       for (let i = 0; i < numPlayers; i++) {
           pointsPlayers.push(0);
           
       }

       points.forEach( elem => elem.innerText = 0);

       divCardsPLayers.forEach(elem => elem.innerHTML = '');
       pedir.disabled = false;
       detener.disabled = false;
    }

    // crear deck
    const crearDeck = () =>{

        for( let i= 2; i < 11; i++){
            for( let tipo of tipos ){
                deck.push(i + tipo);
            }
        };

        for( let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }
        // libreria underscore
        return _.shuffle(deck);
    }

    

    //tomar carta
    const pedirCarta = () =>{
        if(deck.length == 0){
            throw 'No hay mas cartas';
        }

        return deck.pop();
    }

    //valor de carta
    const valorCarta = (card) =>{
        const valor = card.substring(0, card.length -1) ;

        return(isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10
            : parseInt(valor);

        
    }
    



    const accumulatePoints = (card ,turn) =>{
        pointsPlayers[turn] =  pointsPlayers[turn] + valorCarta(card);
        points[turn].innerText =  pointsPlayers[turn] ;
        return pointsPlayers[turn];
    }

    const createCard = (card, turn) =>{
        const cardsImg = document.createElement('img');
        cardsImg.src = `cartas/${card}.png`;
        cardsImg.classList.add('carta');
        //insertar cartas
        divCardsPLayers[turn].append(cardsImg);
    } 


    const determineWinner = () =>{

        const [pointsMin, pointsComputer] = pointsPlayers;


        setTimeout(()=>{
            if (pointsComputer === pointsMin) {
                alert('empate');
            } else if(pointsMin > 21) {
                alert('Perdiste, Jodete');
            } else if(pointsComputer > 21){
                alert('Ganaste, al fin');
            } else if(pointsMin > pointsComputer){
                alert('Ganaste')
            }else{
                alert('Perdiste, jodete');

            }


        }, 1000);

    }


    //computadora
    const turnoComputer = (pointsMin) => {
        let pointsComputer = 0;
        do {
            const card = pedirCarta();
            pointsComputer = accumulatePoints(card, pointsPlayers.length - 1);
            createCard(card,pointsPlayers.length - 1 );

        } while ( (pointsComputer < pointsMin) && (pointsMin <= 21));
        
        determineWinner();
        


        
    };

})();





