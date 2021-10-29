webpack -p --mode=production --env.production --display-modules --env.development=false > "bin/logs/webpack.production.txt"

node bin/build/server.bundle > "bin/logs/nodemon.production.txt"