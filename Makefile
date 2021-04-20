include common.mk

SUBDIRS = $(dir $(shell find . -maxdepth 2 -mindepth 2 -type f -name Makefile))

deps:
	yarn
	@for dir in $(SUBDIRS); do \
		make -C $$dir deps; \
  done

build:
	@for dir in $(SUBDIRS); do \
		make -C $$dir build BUILD_DIR=../$(BUILD_DIR)/$$dir; \
  done

serve: build
	yarn serve

clean:
	@for dir in $(SUBDIRS); do \
		make -C $$dir clean; \
  done

