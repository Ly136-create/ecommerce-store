@echo off
echo ========================================
echo ShopHub Backend Server
echo ========================================
echo.

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    echo.
)

echo Activating virtual environment...
call venv\Scripts\activate

if not exist "venv\Lib\site-packages\flask" (
    echo Installing dependencies...
    pip install -r requirements.txt
    echo.
)

if not exist "ecommerce.db" (
    echo Seeding database...
    python seed_data.py
    echo.
)

echo Starting Flask server...
echo Server will be available at: http://localhost:5000
echo.
python app.py
