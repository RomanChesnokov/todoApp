// ЗАДАНИЕ №2
// В переменных userName, userSurname даны имя и фамилия пользователя.
// При этом в строках беспорядок с большими и маленькими буквами, и нужно оформить строки единообразно.
// Для этого первые буквы имени и фамилии приведите к верхнему регистру (большие буквы), а оставшиеся — к нижнему (маленькие буквы).
// Запишите результат в новые переменные и выведите их значения с помощью console.log.
// С помощью тернарных операторов и console.log выведите сообщение «Имя было преобразовано» или «Имя осталось без изменений»
// для имени и фамилии в зависимости от того, были ли исходные строки равны преобразованным.

// Задаем имя и фамилию пользователя
let userName = 'PuTin';
let userSurname = 'Huylo';
let userFullName = userName + ' ' + userSurname;

// Меняем регистр первой и последних букв имени
let userNameFirst = userName.substring(0,1);
let userNameLast = userName.substring(1,userName.length);

let newUserNameFirst = userNameFirst.toUpperCase();
let newUserNameLast = userNameLast.toLowerCase();
let newUserName = newUserNameFirst + newUserNameLast;

// Меняем регистр первой и последних букв фамилии
let userSurnameFirst = userSurname.substring(0,1);
let userSurnameLast = userSurname.substring(1,userSurname.length);

let newUserSurnameFirst = userSurnameFirst.toUpperCase();
let newUserSurnameLast = userSurnameLast.toLowerCase();
let newUserSurname = newUserSurnameFirst + newUserSurnameLast;

// Задаем корректное имя пользователя
let newUserFullName = newUserName + ' ' + newUserSurname;

console.log('Имя введенное пользователем -', userFullName);
console.log('Корректное имя пользователя -', newUserFullName);
userFullName === newUserFullName ? console.log('Имя осталось без изменений') : console.log('Имя было преобразовано');



// Проверки

// console.log(userFullName);
// console.log(newUserFullName);

// console.log(newUserNameFirst);
// console.log(newUserNameLast);
// console.log(newUserName);

// console.log(newUserSurnameFirst);
// console.log(newUserSurnameLast);
// console.log(newUserSurname);
