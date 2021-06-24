Для оптимизации креативов
=====================

Подготовил: [Александр Зиновьев](http://uzinok.ru/)
-----------------------------------

Как работает:
-----------------------------------

* Coverage.json переименовываем в Coverage.js помещаем в папку src/coverage/
* * Можно распарсить и в папке build/js/
* Массиву даем название `data`
* Запускаем проект, в файл build.less копируем в необходимом порядке содержимое выбранного кода
* По команде `gulp cssBuild` оптимизируем собравшийся css код
* на выходе получаем `/build/css/build.css` минифицированный css код.
* * код в одну строку, без пустых селекторов и медиа выражений.
* * Одинаковые медиа выражения соединяются (`.pipe(gcmq())` удалить при необходимости)


Команды
-----------------------------------

* gulp - сборка проекта и запуск сервера
* gulp cssBuild - оптимизация css кода из файла src/coverage/build.less
* gulp build - сборка проекта
* gulp webp_convert - конвертация графики в .webp (.jpg, .png => .webp)
* gulp opti_img - оптимизация графики
* gulp fonts - конвертация шрифтов: .ttf => .woff + .woff2 (на выходе смотрим build/fonts/)

особенности
-----------------------------------

* .ttf файлы хранятся в resource/fonts/
* препроцессор стилей less
* стили обновляются без перезагрузки страницы
* преобразовывает код ECMAScript 2015 и выше в совместимую версию JavaScript для более старых браузеров (webpackStream).

перед установкой сборщика необходимо:
-----------------------------------

* [устнаовить node.js](https://nodejs.org/) используется пакет npm
* [глобально установить gulp](https://gulpjs.com/) для работы команд gulp
* [глобально установить browser-sync](https://browsersync.io/) для работы виртуального сервера
