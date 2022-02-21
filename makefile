
# ifndef mablung-makefile-path
# export mablung-makefile-path := $(shell npx mablung-makefile get-path)
# endif

# include $(mablung-makefile-path)

include node_modules/@virtualpatterns/mablung-makefile/makefile

ifneq ($(is-building),true)
ifneq ($(is-cleaning),true)

pre-clean::
	$(info - pre-clean ----------------------------)
	$(if $(is-verbose),@echo delete .... release/test/library/resource/make)
	@npx shx rm -Rf release/test/library/resource/make
	
endif
endif