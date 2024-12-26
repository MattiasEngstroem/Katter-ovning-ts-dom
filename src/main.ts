import './style.css'
import { addDropdown, addInputField, catsPerColorFunction, averageAge, averageAgePerRace, mostCommonColorPerRace, renderCards } from './func';
import { cats, colorOptions, raceOptions } from './arrays';
import catObject from './types';

// skärmens olika sektioner läggs in i DOM

const body = document.querySelector("body") as HTMLBodyElement;
const container = document.createElement("div") as HTMLDivElement;
container.setAttribute("class", "container");
body.appendChild(container);

const formSection = document.createElement("aside") as HTMLElement;
formSection.setAttribute("class", "form-section");
container.appendChild(formSection);

const cardsSection = document.createElement("main") as HTMLElement;
cardsSection.setAttribute("class", "cards-section");
container.appendChild(cardsSection);

const statsSection = document.createElement("section") as HTMLElement;
statsSection.setAttribute("class", "stats-section");
container.appendChild(statsSection);

const raceFormSection = document.createElement("section") as HTMLElement;
raceFormSection.setAttribute("class", "race-form-section");
container.appendChild(raceFormSection);

// Kattformuläret

const catForm = document.createElement("form") as HTMLFormElement;
catForm.setAttribute("id", "cat-form");
formSection.appendChild(catForm);

const nameInput = addInputField("cat-form", "name", "Namn:", "text") as HTMLInputElement;

const ageInput = addInputField("cat-form", "age", "Ålder:", "number") as HTMLInputElement;

const colorInput = addDropdown("cat-form", "color", "Färg:", colorOptions) as HTMLSelectElement;

const raceInput = addDropdown("cat-form", "race", "Ras:", raceOptions) as HTMLSelectElement;

const submitButton = document.createElement("button");
submitButton.setAttribute("type", "submit");
submitButton.innerHTML = "Skicka";
catForm.appendChild(submitButton);

catForm.addEventListener("submit", (e) => {
  e.preventDefault();
  cats.push({name: nameInput.value, age: Number(ageInput.value), color: colorInput.value, race: raceInput.value});
  nameInput.value = "";
  ageInput.value = "";
  console.log(cats);
  catsPerColorFunction();
  averageAge();
  averageAgePerRace();
  mostCommonColorPerRace();
  renderCards(cats);
});

// formulär för att lägga till kattraser

const raceForm = document.createElement("form") as HTMLFormElement;
raceForm.setAttribute("id", "race-form");
raceFormSection.appendChild(raceForm);

const newRaceInput = addInputField("race-form", "new-race", "Lägg till en kattras:", "text") as HTMLInputElement;

const raceSubmitButton = document.createElement("button");
raceSubmitButton.setAttribute("type", "submit");
raceSubmitButton.innerHTML = "Skicka";
raceForm.appendChild(raceSubmitButton);

raceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  raceOptions.push(newRaceInput.value);
  const selectElement = document.querySelector("#race") as HTMLSelectElement;
  const optionElement = document.createElement("option") as HTMLOptionElement;
  optionElement.setAttribute("value", newRaceInput.value);
  optionElement.innerHTML = newRaceInput.value;
  selectElement.appendChild(optionElement);
  newRaceInput.value = "";
});

// stats

// Antal katter per färg

const catsPerColor = document.createElement("div") as HTMLDivElement;
catsPerColor.setAttribute("class", "cats-per-color");
statsSection.appendChild(catsPerColor);
catsPerColorFunction();

// Medelålder

const average = document.createElement("div") as HTMLDivElement;
average.setAttribute("class", "average-age");
statsSection.appendChild(average);

// Medelålder per ras

const averace = document.createElement("div") as HTMLDivElement;
averace.setAttribute("class", "average-age-per-race");
statsSection.appendChild(averace);
averageAgePerRace();

// vanligaste färgen per ras

const common = document.createElement("div") as HTMLDivElement;
common.setAttribute("class", "most-common-color-per-race");
statsSection.appendChild(common);
mostCommonColorPerRace();