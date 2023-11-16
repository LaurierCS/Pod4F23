## Setup
1. Install dependencies with `pip install -r requirements.txt`.
2. Create `.env` file in base directory with `DEBUG` and `SECRET_KEY` variables.

## Migrate Model Changes
When you make changes to `models.py` files, you need to run the following commands to update your local DB:
1. `python manage.py makemigrations`
2. `python manage.py migrate`

## Run
Run `python manage.py runserver` to start the server.