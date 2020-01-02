import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataserviceService } from './dataservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // ****************
  // Variables
  // ****************
  showHome = true;
  booklist: any = [];
  bookListDetails: any;
  serachText: any;

  constructor(private http: HttpClient, private dataService: DataserviceService) { }

  // ****************

  // Get the list of books based on search box input from user

  // ****************
  onEnterSearch(value): void {
    if (value.trim().length === 0) {
      alert('Please Enter the value.');
      return null;
    }
    const url = encodeURI(this.dataService.basicServiceUrl + 'books/?category=' + this.dataService.selectedBookType + '&search=' + value);
    this.http.get(url)
      .subscribe(
        (result: any) => {
          this.showHome = false;
          this.booklist = result.results;
          if (this.booklist.length === 0) {
            alert('Books are not available for given search criteria.');
            return null;
          }
          this.bookListDetails = {
            count: result.count,
            next: result.next,
            previous: result.previous
          };
        },
        error => {
          alert('Opps somethimg went wrong!');
        });
  }

  // ****************

  // to open the available formate of book in new tab

  // ****************
  getbookFormate(book): void {
    const bookFormate = {
      text: 'text/plain; charset=utf-8',
      html: 'text/html; charset=utf-8',
      pdf: 'application/pdf'
    };
    let bookUrl = '';
    const keys = Object.keys(book.formats);
    if (keys.filter(it => it.trim() === bookFormate.html.trim()).length > 0) {
      bookUrl = book.formats[bookFormate.html];
      if (bookUrl.toLowerCase().endsWith('.zip')) {
        alert('Zip files are NOT viewable files.');
        return null;
      }
    } else if (keys.filter(it => it.trim() === bookFormate.pdf.trim()).length > 0) {
      bookUrl = book.formats[bookFormate.pdf];
      if (bookUrl.toLowerCase().endsWith('.zip')) {
        alert('Zip files are NOT viewable files.');
        return null;
      }
    } else if (keys.filter(it => it.trim() === bookFormate.text.trim()).length > 0) {
      bookUrl = book.formats[bookFormate.text];
      if (bookUrl.toLowerCase().endsWith('.zip')) {
        alert('Zip files are NOT viewable files.');
        return null;
      }
    } else {
      alert('No viewable version available.');
      return null;
    }
    window.open(encodeURI(bookUrl), '_blank');
  }

  // ****************

  // Get the list of books based on selected category of book

  // ****************
  getbooks(bookType): void {
    const url = encodeURI(this.dataService.basicServiceUrl + 'books/?category=' + bookType);
    this.http.get(url)
      .subscribe(
        (result: any) => {
          this.showHome = false;
          this.dataService.selectedBookType = bookType.substr(0, 1) + bookType.substr(1).toLowerCase();
          this.booklist = result.results;
          if (this.booklist.length === 0) {
            alert('Books are not available for ' + bookType + ' category');
            return null;
          }
          this.bookListDetails = {
            count: result.count,
            next: result.next,
            previous: result.previous
          };
        },
        error => {
          alert('Opps somethimg went wrong!');
        });

  }

  // ****************

  // To go back to Home page (First Page navigation)

  // ****************
  backToHome(): void {
    this.showHome = true;
    this.booklist = [];
    this.serachText = null;
    this.dataService.selectedBookType = null;
  }

  returnIconClass(type) {
    let icon = '';
    switch (type) {
      case 'FICTION':
        icon = 'fas fa-flask';
        break;
      case 'HUMOUR':
        icon = 'fas fa-grin-beam';
        break;
      case 'DRAMA':
        icon = 'fas fa-theater-masks';
        break;
      case 'PHILOSOPHY':
        icon = 'fas fa-brain';
        break;
      case 'POLITICS':
        icon = 'fas fa-child';
        break;
      case 'ADVENTURE':
        icon = 'fas fa-motorcycle';
        break;
      case 'HISTORY':
        icon = 'fas fa-book-reader';
        break;
    }
    return icon;

  }
}
