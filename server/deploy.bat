@ECHO Off
ECHO DEPLOY TO DEVELOPMENT WOF-SERVER
CALL pm2 stop wof-express
CALL pm2 delete wof-express
DEL D:\server\Apache24\sites\wof-server\index.js
DEL D:\server\Apache24\sites\wof-server\*.json
DEL D:\server\Apache24\sites\wof-server\.env
RMDIR /S /Q D:\server\Apache24\sites\wof-server\node_modules
COPY index.js D:\server\Apache24\sites\wof-server
COPY package.json D:\server\Apache24\sites\wof-server
COPY .env D:\server\Apache24\sites\wof-server
CALL npm install --prefix D:\server\Apache24\sites\wof-server
CALL pm2 start D:\server\Apache24\sites\wof-server\index.js --name wof-express
ECHO THE DEVELOPMENT WOF-SERVER DEPLOYMENT IS A SUCCESS!