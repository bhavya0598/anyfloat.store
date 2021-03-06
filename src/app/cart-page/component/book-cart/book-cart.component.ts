import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { CartService } from '../../services/cart.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.sass'],
})
export class BookCartComponent implements OnInit {

  books: Book[] = []

  constructor(private cartService: CartService,
              private alertService: AlertService) {}
  

  ngOnInit(): void {
    this.books = this.cartService.getBookCartItems()
  }
  
  removeItem(book: Book) {
    this.alertService.clear()
    while(book.count>0){
    book.count = this.cartService.setBookCount(book.count-1)
    book.quantity = this.cartService.setBookQuantity(book.quantity+1)
    }
    this.cartService.removeFromBookCart(book)
    this.alertService.success('Book removed from cart', true)
    setTimeout(() => {
      this.alertService.end('Book removed from cart', false)
    }, 1000);
  }
}