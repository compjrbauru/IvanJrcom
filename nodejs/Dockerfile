FROM node:10-alpine

RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++

WORKDIR ~/Documents/Aplicativo

ARG ENVIRONMENT
ENV ENVIRONMENT ${ENVIRONMENT:-dev}
ARG NGINX_WEB_PORT
ENV NGINX_WEB_PORT ${NGINX_WEB_PORT:-3002}

ADD run.sh /run.sh
RUN chmod -v +x /run.sh

CMD ["/run.sh"]
