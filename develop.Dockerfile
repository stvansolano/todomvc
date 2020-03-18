FROM node:lts-alpine

# ** [Optional] Uncomment this section to install additional packages. **
#
# RUN apk update \
#     && apk add --no-cache <your-package-list-here>

# install simple http server for serving static content

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

RUN npm install

EXPOSE 8000
EXPOSE 3000

CMD [ "npm", "run", "dev" ]

# docker run -v ${PWD}:/app -p 3000:3000 -t todomvc-vuejs:latest
