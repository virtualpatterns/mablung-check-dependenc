
ifeq ($(origin mablung-makefile-path),undefined)
export mablung-makefile-path := $(shell npx mablung-makefile get-path)
endif

include $(mablung-makefile-path)

test::
	@npx mkdir -p ../Shared/mablung-check-dependency
	@npx shx rm -Rf ../Shared/mablung-check-dependency/coverage
	@npx shx cp -R coverage ../Shared/mablung-check-dependency
