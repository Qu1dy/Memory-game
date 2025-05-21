const startButton = document.querySelector("#start");
const arrCardsElements = document.getElementsByClassName("card");
const icons = ["computer", "cloud", "sunny", "umbrella", "house", "rocket", "egg", "school"];
let arr = [];
let pairsFound;
let selected = [];
arr = [...icons.slice(0, 8), ...icons.slice(0, 8)];

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex) {

    let randomIndex = Math.floor(Math.random() * currentIndex--);

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

const replaceClass = (target, removeClass, addClass) => {
    const updateClass = (el) => {
        el.classList.remove(removeClass);
        el.classList.add(addClass);
    }

    Array.isArray(target) ? target.forEach(updateClass) : updateClass(target);
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
        replaceClass(selected, "match", "found");
        console.log(selected.length);
    }
    else
    {
        selected.forEach(card => card.innerHTML = "");
        replaceClass(selected, "match", "hidden");
    }
    if(didWin()) alert("You won!");
    selected = [];
}



const didWin = () =>
{
    return pairsFound == arrCardsElements.length/2;
}


const arePairs = ([firstCard, secondCard]) => {
    return firstCard.innerHTML == secondCard.innerHTML;
}


const showCard = (card, ind) =>
{
    card.innerHTML = `<i class="material-icons">${arr[ind]}</i>`;
    replaceClass(card, "hidden", "match")
}


const initializeButtons = () =>
{
    [...arrCardsElements].forEach((card, i) =>
    { 
        card.innerHTML = null;
        card.classList.remove("found", "match");
        card.classList.add("hidden");
        card.onclick = () => manage(card, i)
    });
}


const startNewGame = () =>
{
    shuffle(arr);
    initializeButtons();
    pairsFound = 0;
    selected = [];
}

startButton.onclick = startNewGame;