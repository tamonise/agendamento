let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// 0 - 6
function getCurrentWeekDay() {
   return date.getDay();
}

function getCurrentDayOfMounth() {
    return date.getDate();
}

function calculateTotalWeeksOfMounth() {
    return  (daysInMonth(month, year) / 7);
}

// function preenchimentoCalendario() {
//     let objetoSemanas = document.querySelector(".semanas");
//     let ultimoIndexDias = 0;
//     for (let indexSemana = 0; indexSemana < calculateTotalWeeksOfMounth(); indexSemana++) {
//         var componenteSemana = document.createElement("tr");
//         for (let index = 0; index < 7; index++) {
//             var diaSemana = document.createElement("td");
            
//             diaSemana.innerText = ultimoIndexDias >= 7 ? ultimoIndexDias + index  : index + 1;
//             componenteSemana.append(diaSemana);

//             if(index == 6) {
//                 ultimoIndexDias = 7 * indexSemana;
//             }
//         }
//         objetoSemanas.append(componenteSemana);
//     }
// }

function preenchimentoCalendario() {
    let objetoSemanas = document.querySelector(".semanas");
    let ultimoIndexDias = 1;
    
    for (let indexSemana = 0; indexSemana < calculateTotalWeeksOfMounth(); indexSemana++) {
        var componenteSemana = document.createElement("tr");
           
       
            for (let index = 0; index < 7; index++) {

                var diaSemana = document.createElement("td");
                diaSemana.innerText =  ultimoIndexDias;
                componenteSemana.append(diaSemana);
                ultimoIndexDias ++;

                if(ultimoIndexDias == 31) {
                    break;
                }
            }               
        
       objetoSemanas.append(componenteSemana);
    }
    
}

preenchimentoCalendario();


