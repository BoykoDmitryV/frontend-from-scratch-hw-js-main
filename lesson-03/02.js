// Разработайте функцию isEven, которая определяет, чётное ли число.
// Функция должна возвращать true, если число чётное, и false — в противном случае

function isEven(numb) {
    let number = numb;
    if (Math.floor(number / 2) == number / 2) {
    //Чётное
    return true;
    } else {
    //Нечётное
    return false;
    }
}
