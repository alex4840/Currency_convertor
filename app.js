const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select") ; 
const btn = document.querySelector("form button") ;

const fromCurr = document.querySelector(".from select") ;
const ToCurr = document.querySelector(".to select") ;
const msg = document.querySelector(".msg") ;

for(let select of dropdowns){
    for(Currcode in countryList) {
        let NewOption = document.createElement("option") ;
        NewOption.innerText = Currcode ;
        NewOption.value = Currcode ;
        if(select.name === "from" && Currcode === "USD"){
            NewOption.selected = "selected" ;
        }else if(select.name === "To" && Currcode === "INR"){
            NewOption.selected = "selected" ;
        }
        select.append(NewOption) ;
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateFlag = (element) => {
    let Currcode = element.value ; 
    let countryCode = countryList[Currcode] ;
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png` ;
    let img = element.parentElement.querySelector("img") ;
    img.src = newSrc ; 
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault() ;
    let amount = document.querySelector(".amount input") ;
    let amval = amount.value ; 
    if(amval === "" || amval < 1){
        amval = 1 ;
        amount.value  = "1" ;
    }

    const URL  = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${ToCurr.value.toLowerCase()}.json` ;
    let response = await fetch(URL) ;
    let data = await response.json() ;
    let rate = data[ToCurr.value.toLowerCase()] ;

    let finalamount = amval * rate ;
    console.log(finalamount) ;
    msg.innerText = `${amval} ${fromCurr.value} = ${finalamount} ${ToCurr.value}` ;
});

