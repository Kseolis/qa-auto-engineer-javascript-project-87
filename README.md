# Вычислитель отличий (Difference Calculator)

[![Hexlet Check](https://github.com/Kseolis/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Kseolis/qa-auto-engineer-javascript-project-87/actions)
[![CI](https://github.com/Kseolis/qa-auto-engineer-javascript-project-87/actions/workflows/ci.yml/badge.svg)](https://github.com/Kseolis/qa-auto-engineer-javascript-project-87/actions/workflows/ci.yml)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Kseolis_qa-auto-engineer-javascript-project-87&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Kseolis_qa-auto-engineer-javascript-project-87)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Kseolis_qa-auto-engineer-javascript-project-87&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Kseolis_qa-auto-engineer-javascript-project-87)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Kseolis_qa-auto-engineer-javascript-project-87&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Kseolis_qa-auto-engineer-javascript-project-87)

Утилита командной строки для сравнения конфигурационных файлов в форматах JSON и YAML.

## Установка и запуск

```bash
# Установка зависимостей
make install

# Линтинг
make lint

# Тесты
make test

# Покрытие кода
make coverage

# Создание глобальной ссылки
make link
```

## Архитектура проекта

```
src/
├── diff.js              # Главный API
├── parser.js           # Парсинг JSON/YAML файлов
├── formatter/
│   ├── index.js         # Выбор и вызов форматтеров
│   ├── stylish.js       # Stylish форматтер
│   ├── plain.js         # Plain форматтер
│   └── json.js          # JSON форматтер

bin/
└── gendiff.js           # CLI точка входа
```


## Использование

### CLI

```bash
# Базовое использование (формат stylish по умолчанию)
gendiff file1.json file2.json

# С указанием формата
gendiff -f plain file1.json file2.json
gendiff -f json file1.json file2.json
gendiff -f stylish file1.json file2.json

# С YAML файлами
gendiff file1.yml file2.yml
gendiff -f plain file1.yml file2.yml
```

### API

```javascript
import genDiff from '@hexlet/code';

// Сравнение файлов
const diff = genDiff('file1.json', 'file2.json', 'formatStylish');
console.log(diff);
```

## Поддерживаемые форматы

### Входные форматы
- **JSON** (`.json`)
- **YAML** (`.yml`, `.yaml`)

### Форматы вывода

#### 1. Stylish (по умолчанию)
```bash
gendiff file1.json file2.json
```

Вывод:
```
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

#### 2. Plain
```bash
gendiff -f plain file1.json file2.json
```

Вывод:
```
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```

#### 3. JSON
```bash
gendiff -f json file1.json file2.json
```

Вывод:
```json
[
  {
    "type": "removed",
    "key": "follow",
    "value": false
  },
  {
    "type": "unchanged",
    "key": "host",
    "value": "hexlet.io"
  },
  {
    "type": "removed",
    "key": "proxy",
    "value": "123.234.53.22"
  },
  {
    "type": "updated",
    "key": "timeout",
    "value1": 50,
    "value2": 20
  },
  {
    "type": "added",
    "key": "verbose",
    "value": true
  }
]
```

## Примеры файлов

### file1.json
```json
{
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false,
  "host": "hexlet.io"
}
```

### file2.json
```json
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```

## Разработка

### Команды разработки

```bash
# Установка зависимостей
npm ci

# Линтинг
npm run lint

# Тесты
npm test

# Тесты в режиме наблюдения
npm run test:watch

# Покрытие кода
npm run coverage

# Создание глобальной ссылки
npm link

# Публикация (dry-run)
npm publish --dry-run
```

### Структура тестов

```
__tests__/
├── genDiff.test.js     # Тесты форматтеров
```

## CI/CD

- **Hexlet Check**: Автоматическая проверка заданий
- **CI Pipeline**: Линтинг, тесты, покрытие кода
- **SonarQube**: Анализ качества кода (при наличии токенов)
