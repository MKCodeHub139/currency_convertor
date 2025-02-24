let url = `https://2025-02-24.currency-api.pages.dev/v1/currencies/`;
let fromOptions = document.querySelector(".selectFrom");
let toOptions = document.querySelector(".selectTo");
let amount = document.querySelector(".amount input");
let msg = document.querySelector(".msg");
let btn = document.querySelector("button");
let selectContainer = document.querySelector(".select-container");
let img = document.querySelector("img");

function fetchCountryName(ThisOption) {
  Object.keys(countryList).map((key) => {
    countryImg = key;

    let option = document.createElement("option");
    option.innerHTML = countryImg;
    option.value = countryImg;

    img.src = `https://flagsapi.com/${countryImg}/flat/64.png`;
    ThisOption.appendChild(option);
  });
}
fetchCountryName(fromOptions);
fetchCountryName(toOptions);

function changeImageByCountry(ThisOption) {
  let newImg = ThisOption.previousElementSibling;
  ThisOption.addEventListener("change", (e) => {
    e.preventDefault();
    let selectOption = e.target;
    let selectedValue = selectOption.value;
    for (let option of selectOption.options) {
      option.removeAttribute("selected");
    }
    ThisOption.querySelector(`option[value="${selectedValue}"]`).setAttribute(
      "selected",
      "selected"
    );
    let countryCode = selectedValue.substring(0, 2);

    newImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  });
}

changeImageByCountry(fromOptions);
changeImageByCountry(toOptions);
async function fetchData(e) {
  e.preventDefault();
  try {
    for (let fOption of fromOptions) {
      if (fOption.selected) {
        for (let toOption of toOptions) {
          if (toOption.selected) {
            let from = fOption.value.toLowerCase();
            let to = toOption.value.toLowerCase();

            let response = await fetch(`${url}${from}.json`);
            let data = await response.json();
            let convertedValue = data[from][to].toFixed(2);
            total = (convertedValue * amount.value).toFixed(2);

            msg.innerHTML = total;
            if (!response.ok) {
              throw new Error("no result");
            }
          }
        }
      }
    }
  } catch (err) {
    msg.innerHTML = err;
  }
}

btn.addEventListener("click", fetchData);
