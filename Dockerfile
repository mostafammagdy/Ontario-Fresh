FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=America/New_York


RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y \
    software-properties-common curl tzdata curl gnupg nodejs python build-essential

RUN curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -;
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list; 

RUN apt-get update

RUN apt-get install -y yarn


WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app/
RUN yarn install --force
RUN yarn build
