#!/bin/bash

echo "🚀 Деплой на GitHub Pages..."

# Переходим в папку frontend
cd frontend

# Устанавливаем зависимости если нужно
if [ ! -d "node_modules" ]; then
    echo "📦 Установка зависимостей..."
    npm install
fi

# Собираем проект
echo "🔨 Сборка проекта..."
npm run build

# Устанавливаем gh-pages если нужно
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Установка gh-pages..."
    npm install --save-dev gh-pages
fi

# Деплоим
echo "🌐 Деплой на GitHub Pages..."
npm run deploy

echo "✅ Готово! Приложение доступно по адресу:"
echo "https://Yabuzuk.github.io/delivery-app"