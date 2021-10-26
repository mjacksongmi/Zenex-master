Remove-Item -path bin\build -Force -Recurse;
Remove-Item -path public\build -Force -Recurse;
Remove-Item cli.js -Force

webpack -p --mode=production --env.production --env.development=false > "logs/webpack.txt";

node cli deploy client > "logs/deployment-client.txt"
node cli deploy server > "logs/deployment-server.txt"