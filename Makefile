.PHONY: run
run:
	$(MAKE) -j2 run-jekyll watch-wordcounts

.PHONY: run-jekyll
run-jekyll:
	-rm .jekyll-metadata
	bundle exec jekyll serve -w -H 0.0.0.0

.PHONY: watch-wordcounts
watch-wordcounts:
	while true; do \
		for i in `find _posts -name "*.md"`; do \
			if [ -n "`git status --porcelain $$i`" ]; then \
				echo; \
				prose-wc -u $$i; \
				echo; \
				sleep 30; \
			fi; \
		done; \
	done

.PHONY: clean
clean:
	rm -rf _site
