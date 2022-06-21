# User Authentication SPIKE [SNEK-248]

## Getting started

```bash
# Set up server
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Migrate DB
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start server
python manage.py runserver 0.0.0.0:8001  # If using a different port for the server, be sure to change the client's package.json's proxy setting.
```

```bash
# Set up client
cd client
npm install
npm start
```

## Relevant endpoints

- Generates a `CSRF Token`

  > sessions/csrf/ [GET]

- Checks if a user is authenticated/logged in

  > sessions/authenticated/ [GET]

- Registers a new user

  > sessions/register/ [POST]

- Logs in a user

  > sessions/login/ [POST]

- Logs out a user

  > sessions/logout/ [POST]

- Deletes a user
  > sessions/delete/ [DELETE]

## Notes

- Create a user in `Register` page of client.
- Create a user in `/admin` page of Django.
- Create a user in Postman by doing the following:
  1. Generate a CSRF Token
  2. Copy token and submit with `X-CSRFToken` header when registering
