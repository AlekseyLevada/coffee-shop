Coffee Shop - Интернет-магазин кофе
О проекте
Полнофункциональный интернет-магазин кофейных напитков с современным интерфейсом и полным циклом покупки.

Технологии
Frontend: React 18, TypeScript, Vite

UI: Material UI (MUI), SCSS Modules

Роутинг: React Router 6

Хостинг: GitHub Pages

Функционал
Каталог товаров
Фильтрация по категориям (горячие/холодные напитки)

Карточки товаров с изображениями

Пагинация и lazy loading

Корзина
Добавление/удаление товаров

Изменение количества

Расчет общей суммы

Очистка корзины

Оформление заказа
Форма с валидацией

Подтверждение заказа

История заказов (в разработке)

Установка и запуск
Клонировать репозиторий:

bash
git clone https://github.com/AlekseyLevada/coffee-shop.git
cd coffee-shop
Установить зависимости:

bash
npm install
Запустить development сервер:

bash
npm run dev
Сборка для production:

bash
npm run build
npm run preview
Деплой на GitHub Pages
Установить gh-pages:

bash
npm install gh-pages --save-dev
Выполнить деплой:

bash
npm run deploy
Структура проекта
text
src/
├── assets/            # Статические ресурсы
├── components/        # UI компоненты
│   ├── Header/        # Шапка сайта
│   ├── Footer/        # Подвал
│   └── Layout/        # Основной layout
├── pages/             # Страницы
│   ├── Home/          # Главная
│   ├── Catalog/       # Каталог
│   ├── Product/       # Страница товара
│   ├── Cart/          # Корзина
│   └── Checkout/      # Оформление
├── contexts/          # Глобальное состояние
├── types/            # Типы TypeScript
├── utils/            # Вспомогательные функции
├── styles/           # Глобальные стили
├── App.tsx           # Главный компонент
└── main.tsx          # Точка входа
Настройка окружения
Создать файл .env в корне проекта:

ini
VITE_API_URL=https://api.sampleapis.com/coffee
Доступные переменные:

VITE_API_URL - базовый URL API

VITE_GH_PAGES_BASE - базовый путь для GitHub Pages

Лицензия
MIT License. Подробнее см. в файле LICENSE.
