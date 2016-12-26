init:
	git clone https://github.com/Kickoman/mygithubpage.git static
	cd static && git checkout gh-pages
init-arthur:
	git clone https://github.com/petuhovskiy/mygithubpage.git static
	cd static && git checkout gh-pages
dev:
	npm install
update:
	cd static && git stash
	cd static && git pull
	cd static && git stash pop
run:
	npm start
docker-build:
	docker build . -t mamkame/server:latest
docker-run:
	-docker rm -f mamka
	docker run --name mamka -p 8080:8080 -v $(realpath ./static):/usr/src/app/static -d mamkame/server
.PHONY: init update
