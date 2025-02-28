<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## First steps

---

Review these steps to better understand how this boilerplate works.

### Set up project repository from template

---

ONLY FOR LINUX BASED SYSTEMS. For Windows, check [this](https://www.mslinn.com/blog/2020/11/30/propagating-git-template-changes.html) to manually perform the steps.

Run the following to update the repository's upstream and new origin urls.

```bash
# Set the upstream and new origin urls

# DO NOT RUN ON WINDOWS
npm run set:upstream
```

### Implement Database

---

You can connect to a Mongo DB or use any of the Nest.JS supported TypeORM SQL databases.

All you need to do is setting up the necessary configuration files located under `config/database/<db_of_your_choice>`

For your convinience, the project is already set up with a MongoDB connection that starts up automatically (provided that you entered the right values in the `.env` file at the root of the project).

If you need to use a SQL database such as MySQL, you'll have to make the corresponding replacements across the project to change the implementations of MongooseModule and use TypeOrmModule instead. Also, don't forget to re-implement the already implemented models.

### Seeders

---

After you finished settting up the database and made corrections (if needed) you can go and run the seeder or add new ones too.
By default, there's only one and it creates a basic user for you.

It serves as a base model for creating new seed files and having a working example. You can adapt it based on your preferences or needs.

The files are located under `database/seeders`

There you have the following structure:

- model-name <- folder for all the model seed related files
  - model-seed.module.ts <- contains the necessary imports and providers for this module's seeder to work.
  - model-seed.service.ts <- logic for running the model seeders.
  - model-seed.ts <- holds any necessary data for the seeder to run.
- seeder.module.ts <- contains the necessary imports and providers for the seeder context.
- seeder.ts <- contains the execution logic of the seeders.

Once you are ready to execute the seeders, run this command

```bash
# run seeders
npm run seed
```

### Stripe webhooks

---

When working with webhooks, we expect Stripe to make requests to our API. By default, our app can’t be accessed from outside while running locally. Because of that, we need an additional step to test webhooks. To perform it, we need [Stripe CLI](https://stripe.com/docs/stripe-cli/webhooks). We can download it [here](https://github.com/stripe/stripe-cli/releases/tag/v1.6.4).

We need to forward received events to our local API. To do it, we need to run the following:

```bash
# Generates the webhook signing secret

$ stripe listen --forward-to localhost:PORT/webhook
```

In response, we receive the webhook signing secret. We will need it in our API to validate requests made to our `/webhook` endpoint.

Finally, let's put the webhook secret in our environment variables.

### Scaffolding

---

You can find more about generating resources in the [documentation](https://docs.nestjs.com/recipes/crud-generator#generating-a-new-resource).

To generate the complete set of files for a new resource, run the following command:

```bash
# Generates the necessary files automatically

$ nest g res modules/resource-name
```

It will ask you to choose a transport layer for it.
If using GraphQL, schema first option is recommended.

As result, these files get created

- src/modules/resource-name/resource-name.graphql
- src/modules/resource-name/resource-name.module.ts
- src/modules/resource-name/resource-name.resolver.spec.ts
- src/modules/resource-name/resource-name.resolver.ts
- src/modules/resource-name/resource-name.service.spec.ts
- src/modules/resource-name/resource-name.service.ts
- src/modules/resource-name/dto/create-resource-name.input.ts
- src/modules/resource-name/dto/update-resource-name.input.ts
- src/modules/resource-name/entities/update-resource.entity.ts

### Auth & Roles Guards

---

Under `auth/resolvers` and `core/guards` you can find necessary guards to implement user and role validations.

### Logging

TODO

## Commits

When you run `git commit` some code checks and validations are run automatically using Husky.

---

**_NOTE:_**
You can read more about [Husky here](https://github.com/typicode/husky)

---

Checks order:

1. `git commit` triggers husky to run.
2. Husky executes pre-commit according to `husky/pre-commit` configs
   1. This in turn executes `precommit` script on `package.json` which runs
      1. `lint-staged` according to the `.lintstagedrc` config file rules
      2. `npm run lint` for Nest.js linting rules
3. Husky executes `husky/commit-msg` to check for a valid commit message according to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
