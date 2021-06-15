let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'k', 'Q'];

// Eventos










//funciones

// crear deck dinamicamente
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
    // libretia underscore
    deck = _.shuffle(deck);
    return deck
}

crearDeck();

// Función de tomar carta
const pedirCarta = () =>{
    if(deck.length == 0){
        throw 'No hay mas cartas';
    }

    const carta = deck.pop();
    return carta;
}

// Determinar valor de carta
const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length -1) ;

    return(isNaN(valor)) ? 
        (valor === 'A') ? 11 : 10
        : parseInt(valor);
}

const valor = valorCarta(pedirCarta());
console.log(valor)