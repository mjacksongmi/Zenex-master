Remove-Item -path bin\build -Force -Recurse;
Remove-Item -path public\build -Force -Recurse;

webpack --watch --mode=development 

"bin/logs/webpack.development.txt"