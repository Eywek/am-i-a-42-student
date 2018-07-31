# Am I a 42 student ?

This little web app let you check if a 42 login is a student or not.

## How to use it 

### Use hosted version

You can use it here: https://42student.eywek.fr

### Deploy your own version

You just need to configure env variables `PORT`, `CLIENT_ID` and `CLIENT_SECRET` and start the app like this:

```
node app.js
```

#### Get application credentials

To use this app you need to create an app [here](https://profile.intra.42.fr/oauth/applications/new) and you will get `client_id` and `client_secret` credentials

#### Use pm2

You can use `pm2` to deploy this app (you need to configure `ecosystem.json`) just with this command:

```
pm2 start ecosystem.json
```