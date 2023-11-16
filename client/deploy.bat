@ECHO Off
ECHO DEPLOY TO DEVELOPMENT WOF-CLIENT
DEL D:\server\Apache24\sites\wof-client\index.html
DEL D:\server\Apache24\sites\wof-client\*.js
ROBOCOPY dist D:\server\Apache24\sites\wof-client /E
RMDIR /S /Q dist
ECHO THE DEVELOPMENT WOF-CLIENT DEPLOYMENT IS A SUCCESS!