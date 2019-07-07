# AdaKerja Interview Task

This is a simple Messenger chat bot to calculate user birthday days. This bot save all sent user messages to MongoDB

## How to Start

### Configuring Messenger Webhook

You can read how to configure it in [here](https://developers.facebook.com/docs/messenger-platform/).
Make sure built-in NLP is on.

### Configuring .env

```.env
PAGE_ACCESS_TOKEN=<fill with token that you got from Messenger Platform>
VERIFY_TOKEN=<fill with token that you use to verifiy webhook Messenger>

MONGO_USERNAME=<mongo db username>
MONGO_PASSWORD=<mongo db password>
MONGO_DB_NAME=<mongo db database name>
MONGO_HOST=<mongo db host>
MONGO_PORT=<mongo db port>
```

### Scripts

1. Run `yarn install` to download depedencies
2. Run `yarn start` to run the bot
