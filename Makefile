IMAGE_NAME=a0000

build: rmi
	docker build -t $(IMAGE_NAME) .

run:
	docker run\
	 --rm\
	 -it\
	 -v "$(CURDIR)/index.js":/app/index.js\
	 -v "$(CURDIR)/test.js":/app/test.js\
	 $(IMAGE_NAME)\
	 sh

rmi:
	-docker rmi `docker images -q -a $(IMAGE_NAME)`

prune:
	docker system prune -a
