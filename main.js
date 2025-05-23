const startButton = document.querySelector("#start");
const cards = document.querySelectorAll(".card");
const icons = ["computer", "cloud", "sunny", "umbrella", "house", "rocket", "egg", "school"];
const pairsFoundElement = document.querySelector("#pairs-found");
const stopwatchElement = document.querySelector("#stopwatch-text");
const turn = document.querySelector("#turn-text");
const won = document.querySelector("#won")
const pairs = cards.length/2;
let cardIcons = [], selected = [];
let pairsFound, stopwatch;
let minute = 0, sec = 0;

const pad = (num, size) => {
    num = num.toString();
    while(num.length < size) num = "0" + num;
    return num;
}

const prepareIcons = () =>
{
    cardIcons = [...icons.slice(0, 8), ...icons.slice(0, 8)];
    shuffle(cardIcons);
}


const newStopwatch = () => setInterval(
        () => {
            sec++;
            if(sec === 60)
            {
                sec = 0;
                minute++;
            }
            stopwatchElement.innerText = `Time: ${pad(minute,2)}:${pad(sec, 2)}`;
}, 1000);


const updateTurn = () =>
{
    turn_num = turn.innerText.split(": ")[1];
    turn.innerText = `Turn: ${parseInt(turn_num) + 1}`;
}


const shuffle = (array) => {
  let currentIndex = array.length;

  while (currentIndex) {

    let randomIndex = Math.floor(Math.random() * currentIndex--);

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

const initializeInfo = () => 
{
    won.innerText = ""
    stopwatchElement.innerText = "Time: 00:00";
    turn.innerText = "Turn: 0";
    pairsFoundElement.innerText = `Pairs found: 0/${pairs}`;          
}


const markAsFound = cards => cards.forEach(card => card.classList.replace("match", "found"));
const markAsHidden = cards => 
{
    cards.forEach(c => c.innerText = "")
    cards.forEach(c => c.classList.replace("match", "hidden"))
}

const manage = async (card, i) =>
{
    if(card.classList.contains("found") || card.classList.contains("match")) return;

    selected.push(card);
    showCard(card, i);

    await new Promise(r => setTimeout(r, 200));
    if(selected.length < 2) return;

    updateTurn();

    if(arePairs(selected))
    {
        pairsFound++;
        pairsFoundElement.innerText = `Pairs found: ${pairsFound}/${pairs}`
        markAsFound(selected);
    }
    else markAsHidden(selected);

    if(didWin())
    { 
        won.innerText = "You won!";
        stopStopwatch();
    }
    selected = [];
}



const didWin = () => pairsFound === pairs;


const arePairs = ([firstCard, secondCard]) => firstCard.innerText === secondCard.innerText;



const showCard = (card, ind) =>
{
    card.innerHTML = `<i class="material-icons">${cardIcons[ind]}</i>`;
    card.classList.replace("hidden", "match");
}

const initializeCards = () =>
{
    cards.forEach((card, i) =>
    { 
        card.innerHTML = "";
        card.classList.remove("found", "match");
        card.classList.add("hidden");
        card.onclick = () => manage(card, i);
    });
}

const stopStopwatch = () => {
    clearInterval(stopwatch);
    minute = sec = 0;
}


const startNewGame = () =>
{
    stopStopwatch();
    stopwatch = newStopwatch();
    prepareIcons();
    initializeCards();
    initializeInfo();
    pairsFound = 0;
    selected = [];
    startButton.innerText = "Restart";
}

startButton.onclick = startNewGame;