install:
	npm ci
link:
	npm link
publish:
	npm publish --dry-run
lint:
	npm run lint
fixLint:
	npx esLint --fix
test:
	npm test
coverage:
	npm run coverage