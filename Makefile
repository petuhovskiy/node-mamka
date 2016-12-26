init:
	git clone https://github.com/Kickoman/mygithubpage.git static
	cd static && git checkout gh-pages
update:
	cd static && git pull
.PHONY: init update
