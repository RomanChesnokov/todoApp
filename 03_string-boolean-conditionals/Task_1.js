// ЗАДАНИЕ №1

// В переменную password запишите строку с любым произвольным паролем. Проверьте надёжность пароля с помощью условного оператора if.


// Задаем пароль
let password = '_-a';

// Проверяем надежность
if (password.length >= 4 && (password.includes('-') || password.includes('_') )) {
    console.log('Пароль надежный');
} else {
    console.log('Пароль ненадежный');
}