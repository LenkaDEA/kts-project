# Food client

[![Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-blue?style=for-the-badge)](https://lenkadea.github.io/kts-project)

SPA для поиска, просмотра и печати рецептов различных блюд. Позволяет пользователям находить рецепты по ключевым словам или категориям. Клиентская часть pet-проекта.

*Этот pet-проект написан в рамках курса "Начинающий React-разработчик" от компании KTS.*

## Функционал

*   **Каталог рецептов:** Просмотр списка рецептов.
*   **Поиск:** Поиск рецептов по ключевому слову.
*   **Фильтрация по категориям:** Поиск рецептов по выбранной категории.
*   **Бесконечная лента:** Автоматическая подгрузка рецептов при скролле.
*   **Авторизация пользователя:** Возможность входа в систему.
*   **Адаптивный интерфейс:** Корректное отображение на мобильных устройствах, планшетах и десктопах.
*   **Печать рецептов:** Удобная функция для печати выбранного рецепта.

## Скриншоты

![Главная страница со списком рецептов](/screenshots/home.png)
*Главная страница со списком рецептов (бесконечный скролл)*

![Страница рецепта](/screenshots/recipe.png)
*Страница детального просмотра рецепта с кнопкой печати*

## Технологический стек

*   [![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) - Сборка проекта
*   [![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/) - Библиотека для UI
*   [![MobX](https://img.shields.io/badge/MobX-%23FF9955.svg?style=for-the-badge&logo=mobx&logoColor=white)](https://mobx.js.org/) - Управление состоянием
*   [![SASS](https://img.shields.io/badge/SASS-%23CC6699.svg?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/) - Стилизация

## Установка и Запуск

1.  **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/lenkadea/kts-project.git
    cd kts-project
    ```
2.  **Установите зависимости:**
    ```bash
    npm install
    # или
    yarn install
    ```
3.  **Запустите сервер разработки:**
    ```bash
    npm run dev
    # или
    yarn dev
    ```
4.  **Откройте в браузере:** Приложение будет доступно по адресу [http://localhost:5173/kts-project/](http://localhost:5173/kts-project/).

## Лицензия

Этот проект распространяется под лицензией [MIT](https://opensource.org/licenses/MIT).
