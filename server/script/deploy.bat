@ECHO Off
ECHO HELLO WORLD
pm2 stop wof-express
pm2 delete wof-express
DEL D:/server/Apache24/sites/index.js
DEL D:/server/Apache24/sites/*.json
DEL D:/server/Apache24/sites/.env
RMDIR /s /q D:/server/Apache24/sites/wof-server/node_modules
COPY ../index.js D:/server/Apache24/sites/wof-server
COPY ../package.json D:/server/Apache24/sites/wof-server
COPY ../.env D:/server/Apache24/sites/wof-server
CD D:/server/Apache24/sites/wof-server
npm install
pm2 start index.js --name wof-express
ECHO HELLO WORLD!