/*
* Создать программный код, который определяет, может ли пользователь получить доступ к ресурсу на основе его роли и наличия разрешений.
* Полученное булево значение сохраните в переменной isAccess.

* Условия доступа:
* - Пользователь должен иметь статус администратора (isAdmin) или быть подтвержденным пользователем (isVerifiedUser)
* - А также пользователь должен обладать специальным разрешением (hasSpecialPermission) или временным пропуском (hasTemporaryPass)
*/

// тестовые данные (значения можно менять)
const isAdmin = false
const isVerifiedUser = false
const hasSpecialPermission = true
const hasTemporaryPass = true

let isAccess

if ((isVerifiedUser != false) && (hasSpecialPermission != false || hasTemporaryPass != false)) {
    isAccess = true
} else if (isAdmin == true) {
    isAccess = true
} else {
    isAccess = false
}