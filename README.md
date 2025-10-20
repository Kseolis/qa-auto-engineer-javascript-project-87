# Вычислитель отличий (Difference Calculator)

[![Hexlet Check](https://github.com/Kseolis/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Kseolis/qa-auto-engineer-javascript-project-87/actions)
[![CI](https://github.com/Kseolis/qa-auto-engineer-javascript-project-87/actions/workflows/ci.yml/badge.svg)](https://github.com/Kseolis/qa-auto-engineer-javascript-project-87/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-lcov-blue)](./coverage/lcov.info)
[![ESLint](https://img.shields.io/badge/lint-eslint-4B32C3)](https://eslint.org)

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
├── parsers.js           # Парсинг JSON/YAML файлов
├── diff/
│   ├── builder.js       # Алгоритм построения diff-модели
│   └── index.js         # Экспорт diff-функций
├── formatters/
│   ├── index.js         # Выбор и вызов форматтеров
│   ├── stylish.js       # Stylish форматтер
│   ├── plain.js         # Plain форматтер
│   └── json.js          # JSON форматтер
└── utils/
    ├── file.js          # Работа с файлами
    ├── path.js          # Работа с путями
    ├── string.js        # Строковые утилиты
    ├── type.js          # Проверки типов
    └── index.js         # Экспорт всех утилит

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
const diff = genDiff('file1.json', 'file2.json', 'stylish');
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
{
  "summary": {
    "total": 5,
    "added": 1,
    "removed": 2,
    "updated": 1,
    "unchanged": 1
  },
  "changes": {
    "added": {
      "verbose": true
    },
    "removed": {
      "follow": false,
      "proxy": "123.234.53.22"
    },
    "updated": {
      "timeout": {
        "oldValue": 50,
        "newValue": 20
      }
    },
    "unchanged": {
      "host": "hexlet.io"
    }
  }
}
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

## Обработка ошибок

Утилита предоставляет информативные сообщения об ошибках:

- **Файл не найден**: `Error: Cannot read file: path/to/file`
- **Неподдерживаемый формат**: `Error: Unsupported file extension: .txt`
- **Ошибка парсинга**: `Error: Failed to parse json: Unexpected token`
- **Неизвестный формат вывода**: `Error: Unknown format: invalid`

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
├── diff.flat.test.js      # Тесты для плоских JSON
├── diff.flat.yaml.test.js # Тесты для плоских YAML
├── diff.plain.test.js     # Тесты формата plain
└── diff.json.test.js      # Тесты формата json
```

## CI/CD

- **Hexlet Check**: Автоматическая проверка заданий
- **CI Pipeline**: Линтинг, тесты, покрытие кода
- **SonarQube**: Анализ качества кода (при наличии токенов)
