#!/bin/bash
# Устанавливаем только серверные зависимости
npm install --production
cd server/data
npm install