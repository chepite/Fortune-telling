const bases = [{ name: "lemon", value: "0.65" }, { name: "vanilla", value: "0.8" }, { name: "chocolate chip", value: "1" }, { name: "chocolate", value: "1.3" }];
const toppings = [{ name: "blueberry", value: "0.65" }, { name: "vanilla", value: "0.8" }, { name: "peanut", value: "1" }, { name: "chocolate", value: "1.1" }, { name: "salted caramel", value: "1.3" }, { name: "cuberdon", value: "1.5" }];
const wrappings = [{ name: "yellow", value: "0.65" }, { name: "pink", value: "0.8" }, { name: "red", value: "1" }, { name: "blue", value: "1.3" }];

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const handleSubmit = e => {
    e.preventDefault();
    //makes the result border visible
    const $result = document.querySelector(`.result`);
    $result.classList.remove(`hidden`);

    appendLuck(determineLuck());
}

const determineLuck = () => {

    const question = document.forms["cupcakeForm"]["question"].value;

    //gets the objects out of the form filled by js
    let topping = "";
    toppings.forEach(element => {
        if (element.name === document.forms["cupcakeForm"]["topping"].value) {

            topping = element;
        }
    });

    console.log(topping);

    let base = "";
    bases.forEach(element => {
        if (element.name === document.forms["cupcakeForm"]["base"].value) {

            base = element;
        }
    });
    console.log(base);
    let wrapping = ""
    wrappings.forEach(element => {
        if (element.name === document.forms["cupcakeForm"]["wrapping"].value) {
            wrapping = element;
        }
    });
    console.log(wrapping);

    // end of fetching objects

    let positives = ["As I see it, Yes.", "It is certain.", "It is decidedly so.", "Outlook good.", "Signs point to yes.", "Without a doubt.", "Yes.", "Yes – definitely.", "You may rely on it."];
    let negatives = ["Better not tell you now.", "Don’t count on it.", "My reply is no.", "My sources say no.", "Outlook not so good."];
    let doubts = ["Ask again later.", "Cannot predict now", "Reply hazy, try again.", "Very doubtful."];
    let answer = "";

    let factor = 48 * topping.value * base.value * wrapping.value;

    //determining luck based on the factor --> the more unhealthy the badder your luck shall be 
    //-> color blue is sadder than yellow for example if it has nothing to do with the fat level

    if (factor < 40) {
        answer = positives[getRandomNumber(positives.length)];
    }
    else if (factor >= 40 && factor < 80) {
        answer = doubts[getRandomNumber(doubts.length)];
    }
    else if (factor >= 80) {
        answer = negatives[getRandomNumber(negatives.length)];
    }
    //MAX is 121.68 == 120 --> 3 sections of 40


    const object = { theQuestion: question, theAnswer: answer };
    return object;
}

//appending the luck li's
const appendLuck = (object) => {

    const question = object.theQuestion
    const answer = object.theAnswer
    const $location = document.querySelector(`.resultUl`);
    $location.innerHTML = "";
    const $li = document.createElement(`li`);
    $location.appendChild($li);

    const $elementQuestion = document.createElement(`p`);
    $elementQuestion.textContent = question;

    const $elementAnswer = document.createElement(`h2`);
    $elementAnswer.textContent = answer;
    $elementAnswer.classList.add(`subtitle`);

    $li.appendChild($elementQuestion);
    $li.appendChild($elementAnswer);
}


//fills the form dynamically, if you want to add options add it in the arrays
const fillForm = () => {

    const $locationbases = document.querySelector(`.form__section--base select`);
    bases.forEach(element => {

        const $option = document.createElement(`option`);
        $option.innerHTML = "";
        $option.innerHTML = `<option value=${element.value}>${element.name}</option>`;
        $locationbases.appendChild($option);
    });

    const $locationtoppings = document.querySelector(`.form__section--topping select`);
    toppings.forEach(element => {
        const $option = document.createElement(`option`);
        $option.innerHTML = "";
        $option.innerHTML = `<option value=${element.value}>${element.name}</option>`;
        $locationtoppings.appendChild($option);
    });

    const $locationwrappings = document.querySelector(`.form__section--wrapping select`);
    wrappings.forEach(element => {
        const $option = document.createElement(`option`);
        $option.innerHTML = "";
        $option.innerHTML = `<option value=${element.value}>${element.name}</option>`;
        $locationwrappings.appendChild($option);
    });
}


const init = () => {
    const $form = document.querySelector(`.form`);
    $form.addEventListener(`submit`, handleSubmit);
    fillForm();
}

init();



