
export BUILD_DIR := build

default: help

.PHONY: deps
deps:		## Install deps

.PHONY: clean
clean:	## Clean!

.PHONY: build
build:	## Build

.PHONY: help
help: ## Help!
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
