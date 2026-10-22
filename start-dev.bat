@echo off
echo ===================================================
echo   Starting TravelZync Full-Stack Development Servers
echo ===================================================

echo [1/2] Launching Django Backend Server (Port 8000)...
start "TravelZync Backend" cmd /k "cd backend && python manage.py runserver 127.0.0.1:8000"

echo [2/2] Launching React Vite Frontend Server (Port 5173)...
start "TravelZync Frontend" cmd /k "cd frontend && npm.cmd run dev"

echo.
echo Servers started successfully!
echo Frontend: http://localhost:5173
echo Backend API: http://127.0.0.1:8000
echo Django Admin: http://127.0.0.1:8000/admin/
echo Admin Key: travelzync_admin_2026
echo ===================================================
