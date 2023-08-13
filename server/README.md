env variables required to run as of Jul 20, 2023:

```
MONGO_URL="mongodb://localhost:27017"

ACCESS_TOKEN_SECRET="secret to encode jwt access tokens"
REFRESH_TOKEN_SECRET="secret to encode jwt refresh tokens"

PRODUCTION_ACCESS_TOKEN_EXPIRES_IN="15m"
PRODUCTION_REFRESH_TOKEN_EXPIRES_IN="90d"

DEVELOPMENT_ACCESS_TOKEN_EXPIRES_IN="3s"
DEVELOPMENT_REFRESH_TOKEN_EXPIRES_IN="10s"

RECAPTCHA_SECRET_KEY="your recaptcha key"
RECAPTCHA_BYPASS_TOKEN="secret"

PORT=3001 (optional, defaults to 3000)
```
