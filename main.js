const startButton = document.querySelector("#start");
const arrCardsElements = document.querySelectorAll(".card");
const icons = ["computer", "cloud", "sunny", "umbrella", "house", "rocket", "egg", "school"];
let cardIcons = [];
let pairsFound;
let selected = [];


const prepareIcons = () =>
{
    cardIcons = [...icons.slice(0, 8), ...icons.slice(0, 8)];
    shuffle(cardIcons);
}

const shuffle = (array) => {
  let currentIndex = array.length;

  while (currentIndex) {

    let randomIndex = Math.floor(Math.random() * currentIndex--);

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}


const manage = async (card, i) =>
{
    if(card.classList.contains("found") || card.classList.contains("match")) return;

    selected.push(card);
    showCard(card, i);

    await new Promise(r => setTimeout(r, 200));

    if(selected.length < 2) return;

    if(arePairs(selected))
    {
        pairsFound++;
        selected.forEach(card => card.classList.replace("match", "found"));
    }
    else
    {
        selected.forEach(card => card.innerHTML = "");
        selected.forEach(card => card.classList.replace("match", "hidden"));
    }

    if(didWin()) alert("You won!");

    selected = [];
}



const didWin = () => pairsFound === arrCardsElements.length/2;


const arePairs = ([firstCard, secondCard]) => firstCard.innerHTML === secondCard.innerHTML;



const showCard = (card, ind) =>
{
    card.innerHTML = `<i class="material-icons">${cardIcons[ind]}</i>`;
    card.classList.replace("hidden", "match");
}


const initializeCards = () =>
{
    arrCardsElements.forEach((card, i) =>
    { 
        card.innerHTML = "";
        card.classList.remove("found", "match");
        card.classList.add("hidden");
        card.onclick = () => manage(card, i)
    });
}


const startNewGame = () =>
{
    prepareIcons();
    initializeCards();
    pairsFound = 0;
    selected = [];
    startButton.innerText = "Restart";
}

startButton.onclick = startNewGame;