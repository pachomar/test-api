import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Seeder } from './database/seeders/seeder';
import { SeederModule } from './database/seeders/seeder.module';

async function boostrap() {
  const context = await NestFactory.createApplicationContext(SeederModule);
  const logger = context.get(Logger);
  const seeder = context.get(Seeder);
  try {
    await seeder.seed();
    logger.log('Seeding complete!');
  } catch (err) {
    logger.error('Seeding failed!');
    throw err;
  } finally {
    context.close();
  }
}

boostrap();
