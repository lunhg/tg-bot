FROM redelivre/alpine-node:8
COPY . /home/hacker
USER hacker
WORKDIR /home/hacker
RUN yarn
CMD npm start
