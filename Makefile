install:
	npm ci

status: lint
	git status

lint: 
	npx eslint . --fix

publish:
	npm publish --dry-run