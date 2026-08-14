    @echo off
cd /d "%~dp0"
echo Checking your channel for new streams...
echo.
node sync-videos.js
echo.
pause
