import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { DatabaseService } from 'src/Database/connection.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService,DatabaseService]
})
export class BooksModule {}
