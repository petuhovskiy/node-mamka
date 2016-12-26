init:
	git clone https://github.com/Kickoman/mygithubpage.git static
	cd static && git checkout gh-pages
init-arthur:
	git clone https://github.com/petuhovskiy/mygithubpage.git static
	cd static && git checkout gh-pages
update:
	cd static && git pull
run:
	npm start
.PHONY: init update
