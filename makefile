.PHONY: default refresh upgrade debug build clean node test release

default: build

refresh:
	@npx shx rm -rf node_modules package-lock.json
	@npm install

upgrade:
	@npx shx rm -f package-lock.json
	@npx npm-check-updates --upgrade
	@npm install

# _contentOf	 =	$(filter-out $(1)/., \
# 											$(filter-out $(1)/.., \
# 												$(strip \
# 													$(wildcard $(1)/.*) $(wildcard $(1)/*))))

# contentOf					 =	$(if $(call _contentOf,$(1)),$(foreach path,$(call _contentOf,$(1)),$(call contentOf,$(path))),$(1))

# sourcePath				:=	$(call contentOf,source)
# releasePath 			:=	$(sort \
# 												$(patsubst source/%, release/%, \
# 													$(sourcePath)))

# release/%.js: source/%.js
# 	@npx shx echo Transpile $< ...
# 	@npx eslint --fix $<
# 	@npx babel $< --out-file $@ --source-maps

# release/%: source/%
# 	@shx echo Copy $< ...
# 	@shx mkdir -p $(dir $@)
# 	@shx cp $< $@

debug: export rootPath = $(CURDIR)
debug:
	@$(MAKE) --directory=source debug

build: export rootPath = $(CURDIR)
build:
	@$(MAKE) --directory=source --jobs build

clean:
	@npx shx rm -rf coverage process release

node: build
	@node --no-warnings --unhandled-rejections=strict $(argument)

test: build
	@npx shx rm -rf coverage process
	@npx c8 ava $(argument)
	@git add coverage release package-lock.json
	@git commit --message="post-test" --quiet

release: upgrade refresh clean test
	@npm version prerelease
	@git push origin master
