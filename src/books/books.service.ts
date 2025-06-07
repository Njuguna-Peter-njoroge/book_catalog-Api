import { create } from 'domain';
import { Books } from './interfaces/createinterface.books'; 
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { createBooksDto } from './dtos/createbooks.dtos'; 
import { updateBooksDto } from './dtos/updatebooks.dtos'; 
import { rename } from 'fs';

@Injectable()
export class BooksService {
   findBytitle(title: string): Books {
  const book = this.books.find((book) => book.title === title);
  if (!book) {
    throw new NotFoundException(`Book with title "${title}" not found`);
  }
  return book;
}

      private books: Books[]=[
            {   
       id:1,
      title:"The Racher",
      author:"John",
      published_year: new Date("2025-04-07"),
      isbn:56754,
      
 },
          {   
  id:1,
      title:"The Taker",
      author:"James",
      published_year: new Date("2025-05-03"),
      isbn:454354,
         }
      ];

      private nextId = 3;

      create( data: createBooksDto): Books {
        const existingBook = this.books.find(
  (book) => book.title === data.title 
);

            if(existingBook){
                  throw new ConflictException(
                        `book with title ${data.title} already exists`,
                  )
            }
            const newBook : Books = {
                  id: Number(this.nextId++),
                  ...data,
            };
      this.books.push(newBook);
      return newBook;
}
// find all

findAll (): Books[]{
return this.books;
}
// find available

findAvailable():Books[] {
      return this.books.filter((books) =>books.isAvailable);
}
// find one
findOne(id:number): Books{
      const book =this.books.find((books) => book.id===id);
      if(!book){
            throw new NotFoundException(`book with id ${id} not found`);
      }
      return book;

}
findByAuthor(author: string): Books{
      const book = this.books.find((books) => book.
      author===author);
      if(!book){
            throw  new NotFoundException(`book wrote by author${author} not found`);
      }
      return book;
}
//update


update(id:number, data:updateBooksDto): Books {
      const bookIndex = this.books.findIndex((book) => book.id === id);
      if(bookIndex === -1) {
            throw new NotFoundException(`book with id${id} not found`);

      }
    const updatedBooks = {
      ...this.books[bookIndex],
     ... data,

    };
    this.books[bookIndex] = updatedBooks;
    return updatedBooks;
    
    }

    //soft delete

    remove(id:number): {message:string} {
      const bookIndex = this.books.findIndex((book) => book.id === id);
      if(bookIndex===-1){
            throw new NotFoundException(`book with id${id} not found`);
      }
      this.books[bookIndex].isAvailable = false;

      return{
message:`books ${this.books[bookIndex].title} has been checked out successfully`,
      };

    }


    delete(id:number): {message:string} {
      const bookIndex = this.books.findIndex((books) => books.id ===id);
      if(bookIndex === -1){
            throw new NotFoundException(` book with id ${id} not found `);
          
      }
                  const dleleteBook = this.books.splice(bookIndex, 1)[0];
                 return {
                  message: `book ${dleleteBook.title} has been deleted successfully`,
            };
    }
}

 