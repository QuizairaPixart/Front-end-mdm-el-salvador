//función para comparar dos objetos
export function compareObj(obj1, obj2){

    let obj1Keys = Object.keys(obj1).sort();
    let obj2Keys = Object.keys(obj2).sort();

    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }
    for (var i = 0; i < obj1Keys.length; i++) {
        if(validateDate(obj1[obj1Keys[i]])){
            if ( obj1[obj1Keys[i]]  !== obj2[obj2Keys[i]]) {
                return false;
            }
        }
    }
    return true;
};

//funcion para validar si es un objeto Date
export function validateDate(date){
    let value = Number.isInteger(date)? null: date;
    let validation = isNaN(Date.parse(value));
    return validation;
}