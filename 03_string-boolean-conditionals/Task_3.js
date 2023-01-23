// ЗАДАНИЕ №3

// В переменной number записано число. Необходимо с помощью console.log вывести сообщение, указывающее на чётность или нечётность числа.


// Задаем число
let number = 8;

// Ищем остаток от делениея на 2
let resid = number % 2;

console.log(resid);

if (resid == 0) {
  console.log('Число', number, '- четное');
} else {
  console.log('Число', number, '- нечетное');
}
