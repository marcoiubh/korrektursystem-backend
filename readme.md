### github

- add repository to github
- clone repository
- check git remote -v
- check .git/config for user credentials

### heroku

heroku > app > deploy from main branch
heroku > app > settings > config vars:

- kms_jwtPrivateKey = 1234
- MONGODB_URI = mongodb+srv://vidly:1234@vidly.kiogyac.mongodb.net/database

heroku-cli:

heroku -a <appname>

heroku logs --tail -a <appname>
heroku domains -a <appname>

### nodejs app

> .env.production

- REACT_APP_API_URL=https://korrektursystem-backend.herokuapp.com/
- change heroku frontend config vars to this API_URL !!

- package.json > scripts, add:
  "start": "index.js",
- do not forget to set port to environment variable:
  const port = process.env.NODE_ENV || 3000
