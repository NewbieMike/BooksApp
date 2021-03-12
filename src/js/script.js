/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
    'use strict';

    //1. Przygotuj referencję do szablonu oraz listy .books-list.
    const select = {
        templateOf: {
            bookCart: '#template-book'
        },
        containerOf: {
            bookList: '.books-list'
        },
        imageOf: {
            imageBook: '.book__image'
        }
    };
    const classNames = {
        bookCart: {
          imageFavorite: 'favorite',
          bookClass: 'book__image',
          checkedClass: 'checked',
          hiddenClass: 'hidden'
        }
    };
    //2. Dodaj nową funkcję render.
    
    class BooksList {
        constructor(data){
            const thisBooks = this;
            thisBooks.data = data;

            thisBooks.filters = [];
            

            thisBooks.render();
            thisBooks.getElements();
            thisBooks.initActions();
        }
        render() {
            const thisBooks = this;
            thisBooks.data = dataSource.books // Dostęp do danych z data.js
        
            //3. Wewnątrz niej przejdź po każdym elemencie z dataSource.books.
            for (let book of thisBooks.data) {
                const rating = book.rating;
                //const ratingBgc = determineRatingBgc(rating);
                
                book.ratingBgc = thisBooks.determineRatingBgc(rating);
                console.log(book.ratingBgc);
                book.ratingWidth = rating*10;
                console.log(book.ratingWidth);
                //4. Generowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce.
                const booksTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML);
                
                //5.Na postawie kodu HTML wygeneruj element DOM.
                const generatedHTML = booksTemplate(book);
            
                //6.element DOM dołącz jako nowe dziecko DOM do listy .books-list
                const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            
                const booksContainer = document.querySelector(select.containerOf.bookList);
            
                booksContainer.appendChild(generatedDOM);
            }
        }
        getElements(){
            const thisBooks = this;

            thisBooks.booksContainer = document.querySelector(select.containerOf.bookList);

        }
        
        initActions() {
            const thisBooks = this;
            
            const imgFavorite = classNames.bookCart.imageFavorite;
            const bookFilter = document.querySelector('.filters');
            const favoriteBooks = [];
    
            thisBooks.booksContainer.addEventListener('dblclick', function (event){
                event.preventDefault();
                if (event.target.offsetParent.classList.contains('book__image')) {
    
                    let id = event.target.offsetParent.getAttribute('data-id');
                    if (!favoriteBooks.includes(id)) {
                      event.target.offsetParent.classList.add(imgFavorite);
                      favoriteBooks.push(id);
                    } else {
                      event.target.offsetParent.classList.remove(imgFavorite);
                      const indexId = favoriteBooks.indexOf(id);
                      favoriteBooks.splice(indexId, 1);
                    }
                  }
            });
    
           bookFilter.addEventListener('change', function(event){
                event.preventDefault();
                
                const filterValue = event.target.value;
                if(event.target.tagName == 'INPUT' 
                && event.target.type == 'checkbox' 
                && event.target.name == 'filter') {
                    
                    if (!event.target.classList.contains('checked') == true) {
                        event.target.classList.add(classNames.bookCart.checkedClass);
                        thisBooks.filters.push(filterValue);
              
              
                      } else {
                        event.target.classList.remove(classNames.bookCart.checkedClass);
                        const indexOfFilters = thisBooks.filters.indexOf(filterValue);
                        thisBooks.filters.splice(indexOfFilters, 1);
              
                      }
                      thisBooks.filteredBooks();
                }
           }); 
           
    
        }

        filteredBooks() {
            const thisBooks = this;

            for(const book of dataSource.books){
                let shouldBeHidden = false;
    
                for (const filter of thisBooks.filters){
                    if(!book.details[filter]) {
                        shouldBeHidden = true;
                        break;
                    }
                }
                const bookImg = document.querySelector(`${select.imageOf.imageBook}[data-id="${book.id}"]`);
                const hiddenImg = classNames.bookCart.hiddenClass;
    
                if (shouldBeHidden) bookImg.classList.add(hiddenImg);
                    else bookImg.classList.remove(hiddenImg);
            }
        }

        determineRatingBgc(rating) {
            const thisBooks = this;
            
            if (rating < 6){
                thisBooks.ratingBgc = "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);"}  
                else if (rating > 6 && rating <= 8){
                    thisBooks.ratingBgc = "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);"}
                else if (rating > 8 && rating <= 9) {
                    thisBooks.ratingBgc = "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);"}
                else if (rating > 9 ) {
                    thisBooks.ratingBgc = "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);"}
        
            return thisBooks.ratingBgc;


        }
      }
    
    
    const app = {
        initProjects: function(){
            new BooksList();
        }
    };


    app.initProjects();

}