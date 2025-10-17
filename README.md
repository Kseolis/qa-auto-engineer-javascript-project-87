### Hexlet tests and linter status:
[![Hexlet Check](https://github.com/Kseolis/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Kseolis/qa-auto-engineer-javascript-project-87/actions)

### CI Status and Quality
[![CI](https://github.com/Kseolis/qa-auto-engineer-javascript-project-87/actions/workflows/ci.yml/badge.svg)](https://github.com/Kseolis/qa-auto-engineer-javascript-project-87/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-lcov-blue)](./coverage/lcov.info)
[![ESLint](https://img.shields.io/badge/lint-eslint-4B32C3)](https://eslint.org)

## Установка и запуск

```bash
make install       # npm ci
make lint          # npm run lint
npm test           # запустить тесты Jest
npm run coverage   # тесты с генерацией покрытия
```

## Пример использования

Входные файлы (`__fixtures__/file1.json`, `__fixtures__/file2.json`):

```json
{"timeout": 50, "proxy": "123.234.53.22", "follow": false, "host": "hexlet.io"}
```

```json
{"timeout": 20, "verbose": true, "host": "hexlet.io"}
```

Ожидаемый вывод сравнения плоских JSON/YAML (формат stylish по умолчанию):

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

### Сравнение YAML-файлов

Теперь поддерживаются не только JSON, но и YAML-файлы (`.yml`, `.yaml`).

```bash
# Пример запуска для YAML
gendiff __fixtures__/file1.yml __fixtures__/file2.yml
```

Ожидаемый вывод для плоских YAML-данных идентичен JSON-примеру выше:

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

### Демонстрация (asciinema)

[Демонстрация работы пакета с YAML на asciinema](https://asciinema.org/)

## Примечания по CI и SonarQube

- CI запускается на каждый push/pull request в ветку `main` и выполняет: `npm ci`, `npm run lint`, `npm test`.
- Интеграция с SonarQube/Cloud выполняется через секреты репозитория: `SONAR_TOKEN`, `SONAR_ORG`, `SONAR_PROJECT`. Ключи не хранятся в коде.
- Отчет покрытия (`coverage/lcov.info`) автоматически отправляется в Sonar при наличии секретов.