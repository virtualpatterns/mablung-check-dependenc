
ifndef mablung-makefile-path
export mablung-makefile-path := $(shell npx mablung-makefile get-path)
endif

include $(mablung-makefile-path)

ifndef current-build-folder
ifndef current-clean-folder

pre-clean::
	$(info - pre-clean ----------------------------)
	@echo delete .... release/test/library/resource/make
	@npx shx rm -Rf release/test/library/resource/make
	
endif
endif