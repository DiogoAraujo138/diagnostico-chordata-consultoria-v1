@echo off
title Servidor Diagnostico Chordata
cd /d "C:\diagnostico-chordata-consultoria-v1"
set PATH=C:\Program Files\nodejs;%PATH%
echo.
echo  Iniciando servidor de desenvolvimento...
echo  Aguarde alguns segundos e acesse: http://localhost:8080
echo.
start "" "http://localhost:8080"
"C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev
pause
