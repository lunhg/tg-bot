FROM redelivre/alpine-node:8
ARG username
ARG botname
ARG token
ARG domain
COPY . /home/$username/tg-bot
RUN chown -R $username: /home/$username/tg-bot
USER $username
WORKDIR /home/$username/tg-bot
RUN sudo npm install -g express express-graphql atob \
    && yarn
ENV TOKEN $token
ENV NAME $botname
ENV DOMAIN $domain
EXPOSE 3000
ENTRYPOINT npm start
