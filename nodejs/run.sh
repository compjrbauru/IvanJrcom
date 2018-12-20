#!/bin/sh
node -v
npm -v

echo ''
echo 'Instalação dos pacotes do projeto'
echo ''

npm i

echo ''
echo "Executando no ambiente ${ENVIRONMENT}"
echo ''

if [ "${ENVIRONMENT}" = 'dev' ]; then
  npm start
else
  npm run build:prod:aot
  npm run server:prod ${NGINX_WEB_PORT}
fi
