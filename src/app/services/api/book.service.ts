import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// import 'rxjs/add/operator/toPromise';//whats the point?

//Model of Book And endpoints from Api
//redundance in /index ?? by default export index
import { Book, BookApi } from '../sdk/index'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private bookApi: BookApi) { }

  getAllBooks(filtro: any = { deleted_at: null }): Observable<any[]> {
    if (filtro) filtro = { ...filtro, deleted_at: null }; 
    return this.bookApi.find(filtro);
  }
  
  // getAllBooks(filtro: any): Observable<Book[]> {
  //   filtro = { ...filtro, deleted_at: null }; 
  //   return this.bookApi.find(filtro);
  // }
 
  getById(id: number): Observable<Book> {
    return this.bookApi.findById(id);
  }

  getByIsbn(isbn:any): Observable<any> {
    return this.bookApi.getBookInfo(isbn);
  }

  create(book: Book): Observable<Book> {
    return this.bookApi.create(book);
  }

  update(book: Book): Observable<Book> {
    return this.bookApi.patchAttributes(book.id, book);
  }

  //This must be change to Update delete_at column in DB
  // delete(book: Book): Observable<Book>{
  //   return this.bookApi.deleteById(book.id); 
  // }

  delete(id: number): Observable<Book> {
    let book: Book;
    book.deletedAt = new Date(); //Change to handle in the server side
    return this.bookApi.patchAttributes(id, book);
  }
}
