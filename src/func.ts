// funktion för att skapa dropdown, 
// argument: id för aktuellt formulär, id för selectfältet, fältets label, array som ska utgöra fältets options

import { colorOptions, cats, raceOptions } from "./arrays";
import catObject from "./types";

export const addDropdown = (formId: string, fieldId: string, label: string, options: string[]): HTMLSelectElement => {
    const form = document.querySelector(`#${formId}`) as HTMLFormElement;
    const selectLabel = document.createElement("label") as HTMLLabelElement;
    selectLabel.setAttribute("for", fieldId);
    selectLabel.innerHTML = label;
    form.appendChild(selectLabel);
    const selectField = document.createElement("select") as HTMLSelectElement;
    selectField.setAttribute("id", fieldId);
    selectField.setAttribute("name", fieldId);
    form.appendChild(selectField);
    options.forEach((o) => {
        const option = document.createElement("option") as HTMLOptionElement;
        option.setAttribute("value", o);
        option.innerHTML = o;
        selectField.appendChild(option);
    });
    return selectField;
}

// skapa inputfält
// argument: id för aktuellt formulär, id för inputfältet, fältets label, inputtyp (text eller number)

export const addInputField = (formId: string, fieldId: string, label: string, type: string): HTMLInputElement => {
    const form = document.querySelector(`#${formId}`) as HTMLFormElement;
    const inputLabel = document.createElement("label") as HTMLLabelElement;
    inputLabel.setAttribute("for", fieldId);
    inputLabel.innerHTML = label;
    form.appendChild(inputLabel);
    const inputField = document.createElement("input") as HTMLInputElement;
    inputField.setAttribute("id", fieldId);
    inputField.setAttribute("type", type);
    inputField.setAttribute("name", fieldId);
    if (type === "number") {
        inputField.setAttribute("min", "0");
    }
    form.appendChild(inputField);
    return inputField;
}

// Antal katter per färg

export const catsPerColorFunction = (): void => {
    const element = document.querySelector(".cats-per-color") as HTMLDivElement;
    element.replaceChildren();
    const header = document.createElement("h3") as HTMLHeadingElement;
    header.innerHTML = "Antal katter per färg:";
    element.appendChild(header);
    colorOptions.forEach((color) => {
        let count = 0;
        cats.forEach((cat) => {
            if (color === cat.color) {
                count ++;
            }
        });
        const paragraph = document.createElement("p") as HTMLParagraphElement;
        paragraph.innerHTML = `${color}: ${count}`;
        element.appendChild(paragraph);
    });
}

// medelålder på alla katter

export const averageAge = ():void => {
    const element = document.querySelector(".average-age") as HTMLDivElement;
    element.replaceChildren();
    const paragraph = document.createElement("h3") as HTMLHeadingElement;
    let count: number = 0;
    cats.forEach((c) => {
        count += c.age;
    });
    paragraph.innerHTML = `Medelålder på alla katter är ${count/cats.length}.`;
    element.appendChild(paragraph);
}

// Medelålder per ras

export const averageAgePerRace = ():void => {
    const element = document.querySelector(".average-age-per-race") as HTMLDivElement;
    element.replaceChildren();
    const header = document.createElement("h3") as HTMLHeadingElement;
    header.innerHTML = "Medelålder per ras:";
    element.appendChild(header);

    let ages: number;
    let count: number;
    raceOptions.forEach((r) => {
        ages = 0;
        count = 0;
        cats.forEach((c) => {
            if (r === c.race) {
                ages += c.age;
                count ++;
            }
        });
        if (count > 0) {
            const paragraph = document.createElement("p") as HTMLParagraphElement;
            paragraph.innerHTML = `${r}: ${ages/count}`;
            element.appendChild(paragraph);
        }
    });
}

// vanligaste färgen per ras

export const mostCommonColorPerRace = (): void => {
    const element = document.querySelector(".most-common-color-per-race") as HTMLDivElement;
    element.replaceChildren();
    const header = document.createElement("h3") as HTMLHeadingElement;
    header.innerHTML = "Vanligaste färgen per ras:";
    element.appendChild(header);

    const mostCommonColor: number[] = [];
    colorOptions.forEach((c) => {
        mostCommonColor.push(0);
    });
    let match: boolean;
    raceOptions.forEach((r) => {
        match = false;
        cats.forEach((c) => {
            if (r === c.race) {
                match = true;
                colorOptions.forEach((value, index) => {
                    if (value === c.color) {
                        mostCommonColor[index] ++;
                    }
                })
            }
        });
        if (match) {
            const maxValue: number = Math.max(...mostCommonColor); // de tre punkterna sprider ut en array som separata värden
            const maxIndex: number = mostCommonColor.indexOf(maxValue);
            const paragraph = document.createElement("p") as HTMLParagraphElement;
            paragraph.innerHTML = `${r}: ${colorOptions[maxIndex]}`;
            element.appendChild(paragraph);
        }
        mostCommonColor.fill(0); // fyll arrayen med noll-värden
    });
}

// rendera kattkort

export const renderCards = (cats:catObject[]): void => {
const cardsSection = document.querySelector("main") as HTMLElement;
cardsSection.replaceChildren();
cats.forEach((c) => {
    const card = document.createElement("div") as HTMLDivElement;
    card.setAttribute("class", "card");
    cardsSection.appendChild(card);
    const name = document.createElement("h3") as HTMLHeadingElement;
    name.innerHTML = c.name;
    if (c.name === "") {
        name.innerHTML = "Undefined";
    }
    card.appendChild(name);
    const age = document.createElement("p") as HTMLParagraphElement;
    age.innerHTML = `ålder: ${c.age}`;
    card.appendChild(age);
    const color = document.createElement("p") as HTMLParagraphElement;
    color.innerHTML = `färg: ${c.color}`;
    card.appendChild(color);
    const race = document.createElement("p") as HTMLParagraphElement;
    race.innerHTML = `ras: ${c.race}`;
    card.appendChild(race);
});
}