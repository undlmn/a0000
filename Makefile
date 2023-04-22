IMAGE_NAME=a0000

build: rmi
	docker build -t $(IMAGE_NAME) .
	set -e ;\
	 CONTAINER_ID=`docker create $(IMAGE_NAME)` ;\
	 docker cp $${CONTAINER_ID}:/app/package-lock.json . ;\
	 docker rm -v $${CONTAINER_ID}

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
