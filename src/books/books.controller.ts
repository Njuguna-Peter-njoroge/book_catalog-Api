import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';

import { Books } from './interfaces/createinterface.books'; 
import { createBooksDto } from './dtos/createbooks.dtos'; 
import { updateBooksDto } from './dtos/updatebooks.dtos'; 
import { BooksService } from './books.service';




@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: createBooksDto): ApiResponse<Books> {
    try {
      const book = this.booksService.create(data);
      return {
        success: true,
        message: 'Book added successfully',
        data: book,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to add a book',
        error: error.message,
      };
    }
  }

  @Get()
  findAll(@Query('available') available?: string): ApiResponse<Books[]> {
    try {
      let books: Books[];

      if (available === 'true') {
        books = this.booksService.findAvailable();
      } else {
        books = this.booksService.findAll();
      }

      return {
        success: true,
        message: `${books.length}  retrieved successfully`,
        data: books,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve books',
        error: error.message,
      };
    }
  }

/***
 * get book by id
 * 
 * GET /books/:id
 */
@Get(':id')
   async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Books>> {
    try {
      const user =await  this.booksService.findOne(id);
      return {
        success: true,
        message: ' book found',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: 'book Not found',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }

  /**
   * Find book by title
   * GET /users/title/:title
   */
  @Get('title/:title')
   async findBytitle(@Param('title') title: string): Promise<ApiResponse<Books>> {
    try {
      const books = await  this.booksService.findBytitle(title);
      return {
        success: true,
        message: 'book By title found',
        data: books,
      };
    } catch (error) {
      return {
        success: false,
        message: 'book with title not found',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }

  /**
   * Update book 
   * PATCH users/:id
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data:updateBooksDto,
  ): ApiResponse<Books> {
    try {
      const user = this.booksService.update(id, data);
      return {
        success: true,
        message: 'book info updated succesfully',
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update books info',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }

  /**
   * Checkout a user (soft delete)
   * DELETE /book/:id
   */
  @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<null>> {
    try {
      const result =await  this.booksService.remove(id);
      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to remove book',
        error: error instanceof Error ? error.message : ' Unknown error',
      };
    }
  }

  /**
   * Permanently delete a book (hard delete)
   * DELETE /books/:id/permanent
   */
  @Delete(':id/permanent')
   async delete(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<null>> {
    try {
      const result =await this.booksService.delete(id);

      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to hard delete book',
        error: error instanceof Error ? error.message : 'Unknown Error',
      };
    }
  }
}
