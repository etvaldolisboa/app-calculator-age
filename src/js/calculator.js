const getDay = document.getElementById("day");
const getMonth = document.getElementById("month");
const getYear = document.getElementById("year");

const resultYY = document.getElementById('result-years');
const resultMM = document.getElementById('result-months');
const resultDD = document.getElementById('result-days');

const calculator = document.querySelector("form");

const date = new Date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
    const inputs = document.querySelectorAll("input");

    let validator = true;
    inputs.forEach((i) => {
        const parent = i.parentElement;
        if (!i.value) {
            i.style.borderColor = "var(--alert-red)";
            parent.querySelector("small").innerText = "this field is required.";
            validator = false;
        } else if (getDay.value > 1 && getDay < 31) {
            getDay.style.borderColor = "var(--alert-red)";
            getDay.parentElement.querySelector("small").innerText =
                "must be valid day.";
            validator = false;
        } else if (getMonth < 1 || getMonth.value > 12) {
            getMonth.style.borderColor = "var(--alert-red)";
            getMonth.parentElement.querySelector("small").innerText = "must be valid month.";
            validator = false;
        } else if (getYear <= 1900 || getYear.value > year) {
            getYear.style.borderColor = "var(--alert-red)";
            getYear.parentElement.querySelector("small").innerText =
                "must be valid year.";
            validator = false;
        }
        else {
            i.style.borderColor = "var(--primary)";
            parent.querySelector("small").innerText = "";
            validator = true;
        }


        // veiface se o o mes tem 28, 29 ou 30 dias
        if (getMonth === 2) {
            // O mês de fevereiro tem 29 dias em anos bissextos
            if (getYear % 400 === 0 || (getYear % 4 === 0 && getYear % 100 !== 0)) {
                if (getDay > 29) {
                    return false;
                }
            } else {
                if (getDay > 28) {
                    return false;
                }
            }
        } else if (getMonth === 4 || getMonth === 6 || getMonth === 9 || getMonth === 11) {
            if (getDay > 30) {
                return false;
            }
        }
        return true
    });
    return validator;
}
function submitDates(e) {
    e.preventDefault();
    if (validate()) {
        if (getDay.value > day) {
            day = day + months[month - 1];
            month = month - 1;
        }
        if (getMonth.value > month) {
            month = month + 12;
            year = year - 1;
        }

        const d = day - getDay.value;
        const m = month - getMonth.value;
        const y = year - getYear.value;

        resultDD.innerHTML = d;
        resultMM.innerHTML = m;
        resultYY.innerHTML = y;
    }
}

calculator.addEventListener("submit", submitDates);