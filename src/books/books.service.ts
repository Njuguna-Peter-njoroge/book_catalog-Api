import { Books } from "./interfaces/createinterface.books";
import { createBooksDto } from "./dtos/createbooks.dtos";
import { updateBooksDto } from "./dtos/updatebooks.dtos";
import { DatabaseService } from "src/Database/connection.service";
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class BooksService {
  findByTitle(title: string) {
    throw new Error('Method not implemented.');
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly databaseService: DatabaseService) {}

  // Create
  async create(createBooksDto: createBooksDto): Promise<Books> {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM SP_CREATE_BOOKS($1, $2, $3, $4, $5)`,
        [
          createBooksDto.title,
          createBooksDto.author,
          createBooksDto.published_year,
          createBooksDto.isbn,
          createBooksDto.isAvailable,
        ],
      );

      if (result.rows.length === 0) {
        throw new NotFoundException('Failed to create a book');
      }

      return result.rows[0];
    } catch (error) {
      if (error.message.includes('already exists')) {
        throw new ConflictException(
          `Book with ISBN ${createBooksDto.isbn} already exists`,
        );
      }
      console.error('Database error:', error);
      throw new InternalServerErrorException('Failed to create book');
    }
  }

  // Find all books
  async findAll(): Promise<Books[]> {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM sp_get_all_books()`,
      );

      return result.rows;
    } catch (error) {
      console.error('Database error:', error);
      throw new InternalServerErrorException('Failed to fetch books');
    }
  }

  // Find one book by ID
  async findOne(id: number): Promise<Books> {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM sp_get_book_by_id($1)`,
        [id],
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }

      return result.rows[0];
    } catch (error) {
      console.error('Database error:', error);
      throw new InternalServerErrorException('Failed to fetch book');
    }
  }

  // Update
  async update(id: number, updateBooksDto: updateBooksDto): Promise<Books> {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM sp_update_books($1, $2, $3, $4, $5, $6)`,
        [
          id,
          updateBooksDto.title,
          updateBooksDto.author,
          updateBooksDto.published_year,
          updateBooksDto.isbn,
          updateBooksDto.isAvailable,
        ],
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(`Book with ID ${id} not found for update`);
      }

      return result.rows[0];
    } catch (error) {
      console.error('Database error:', error);
      throw new InternalServerErrorException('Failed to update book');
    }
  }

  // Delete
  async remove(id: number): Promise<{ message: string }> {
    try {
      const result = await this.databaseService.query(
        `SELECT * FROM sp_delete_books($1)`,
        [id],
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(`Book with ID ${id} not found for deletion`);
      }

      return { message: `Book with ID ${id} deleted successfully` };
    } catch (error) {
      console.error('Database error:', error);
      throw new InternalServerErrorException('Failed to delete book');
    }
  }
}
