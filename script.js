document.addEventListener("DOMContentLoaded", () => {
    let convert = document.getElementById("buttons");
    convert.addEventListener("click", convertcurrency);

    function buildlist() {
      let list;
      return fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
        .then((res) => res.json())
        .then((data) => {
          list = data;

          let fromcountry = document.getElementById("fromcountry");
          let tocountry = document.getElementById("tocountry");

          for (let i in list) {
            let fromoption = document.createElement("option");
            fromoption.id = `${i}_from`;
            fromoption.value = i;
            fromoption.textContent = list[i];
            fromcountry.append(fromoption);

            let tooption = document.createElement("option");
            tooption.id = `${i}_to`;
            tooption.textContent = list[i];
            tooption.value = i;
            tocountry.append(tooption);
          }
        });
    }

    let currencyInfo;

    function loadCurrencyValues() {
      fetch(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"
      )
        .then((res) => res.json())
        .then((data) => (currencyInfo = data));
    }

    loadCurrencyValues();
    buildlist();

    function convertcurrency() {
      let fromcountry = document.getElementById("fromcountry").value;
      let tocountry = document.getElementById("tocountry").value;
      let amounttoconvert = document.getElementById("amount").value;
      let result = document.getElementById("result");

      if (fromcountry && tocountry) {
        let { eur } = currencyInfo;
        let convertedamount = eur[tocountry] / eur[fromcountry];
        if ((fromcountry == "1000sats" || tocountry == "1000sats") && amounttoconvert) {
          alert("Select the valid options..");
          result.value = " ";
          location.reload();
        } else if (amounttoconvert) {
          result.value =(amounttoconvert * convertedamount).toFixed(2);
          console.log(fromcountry);
          console.log(tocountry);
        } else {
          result.value = " ";
          alert("Please Select the valid options...");
        }
      }
    }
  });