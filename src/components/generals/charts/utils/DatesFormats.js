//suma o resta dias
export function sumarDias(fecha, dias) {
    let fechaReturn = fecha.setDate(fecha.getDate() + dias);
    return fechaReturn;
}

//diferencia de días
export function dateDiff(day, days, operation) {
    let date = currentAndPreviousDate(days, operation);
    let previosDate = date[1];
    let today = date[0];

    if(day.getTime() >= previosDate.getTime()){
        let t1 = day.getTime();
        let t2 = today.getTime();
        return (Math.floor((t2 - t1)/(1000 * 60 * 60 * 24)));
    }   
}

//diferencia de tiempo entre dos fechas
export function differenceTime(d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return (t2 > t1 ? Math.floor((t2 - t1) / 1000) : Math.floor((t1 - t2) / 1000) );
}

//formatea un array con los dias de la semana
export function ArrayWeek(week, days) {
    let cantDays = week.length;
    let daysNum = days.getDay() - 1;
    return week.map((days, index) => {
        daysNum = daysNum + 1;
        if (daysNum > cantDays - 1) {
            daysNum = 0;
            return week[0];
        }
        return week[daysNum];
    });
}

export function formatDate(date) {
    if(date === null){
        return date; 
    } else {
        let fecha = new Date(date);
        let formatdate = fecha.toLocaleString("es-AR");
        return formatdate;
    }
}

//Obtener en formato Date la fecha actual y una fecha anterior o posterior
export function currentAndPreviousDate(days, operation){
    let today = new Date();
    let day;
    if(operation === "-"){
        day = today.getDate() - days;
    } else if(operation === "+"){
        day = today.getDate() + days;
    }
    let month = today.getMonth();
    let year = today.getFullYear();
    let date = new Date(year, month, day, 0, 0, 0, 0);

    return [today, date];
}

//invertir el string de la fecha
export function reverseDateString(date){

    let day = date.split("-");
    let response = day[2]+"-"+day[1]+"-"+day[0];
    return (response);
}