# TravelZync Full-Stack Development Server Launcher
Write-Host "===================================================" -ForegroundColor Red
Write-Host "  Starting TravelZync Full-Stack Development Servers" -ForegroundColor White
Write-Host "===================================================" -ForegroundColor Red

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python manage.py runserver 127.0.0.1:8000"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm.cmd run dev"

Write-Host "Servers initiated!" -ForegroundColor Green
Write-Host "Frontend:    http://localhost:5173" -ForegroundColor Yellow
Write-Host "Backend API: http://127.0.0.1:8000" -ForegroundColor Yellow
Write-Host "Django Admin: http://127.0.0.1:8000/admin/" -ForegroundColor Yellow
Write-Host "Admin Portal Key: travelzync_admin_2026" -ForegroundColor Cyan
