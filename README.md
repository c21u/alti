# ALTI

0a. Try it as a GitHub template repository! Or,

0b. Clone this repo, replacing `<project>` with the new project name.
 * `git clone -o alti -b master --single-branch git@github.gatech.edu:c21u/alti.git <project>`
 
1. rename project
 * find and replace `alti` in the project (4 places, including changing the name for the Docker repo, and excluding this readme.)

2. Run `yarn install`

3. ensure all env variables are set
 * copy or rename `example.env` to `.env`
 * fill out the required variables.
 * check config.js for other vars to set.

4. Replace `CHANGELOG.md` and `README.md` for the new project.

# Create Developer Key

1. Go to Admin > Developer Keys > Create new LTI Key
2. Put following values in the form. (Modify app url as per actual)
 * Redirect URI: https://dev.127.0.0.1.nip.io/lti
 * Target Link URI: https://dev.127.0.0.1.nip.io/lti
 * OpenID Connect Initiation URL: https://dev.127.0.0.1.nip.io/login
 * JWK Method: Public JWK URL
 * Public JWK URL: https://dev.127.0.0.1.nip.io/keys
3. Configure the client id while adding the app