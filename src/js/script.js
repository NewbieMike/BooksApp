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
    function render() {
        const thisBooks = this;
        thisBooks.data = dataSource.books // Dostęp do danych z data.js
    
        //3. Wewnątrz niej przejdź po każdym elemencie z dataSource.books.
        for (let book of thisBooks.data) {

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

    filters = [];
    favoriteBooks = [];
    function initActions() {
        const thisBooks = this;
        const booksContainer = document.querySelector(select.containerOf.bookList);
        const imgFavorite = classNames.bookCart.imageFavorite;
        const bookFilter = document.querySelector('.filters');


        booksContainer.addEventListener('dblclick', function (event){
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
            console.log('Books fltered:');
            const filterValue = event.target.value;
            if(event.target.tagName == 'INPUT' 
            && event.target.type == 'checkbox' 
            && event.target.name == 'filter') {
                console.log('Filter by: ', filterValue)
                if (!event.target.classList.contains('checked') == true) {
                    event.target.classList.add(classNames.bookCart.checkedClass);
                    filters.push(filterValue);
          
          
                  } else {
                    event.target.classList.remove(classNames.bookCart.checkedClass);
                    const indexOfFilters = filters.indexOf(filterValue);
                    filters.splice(indexOfFilters, 1);
          
                  }
                filteredBooks(filters);
            }
       }); 
       

    }

    function filteredBooks() {
        for(const book of dataSource.books){
            let shouldBeHidden = false;

            for (const filter of filters){
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

    initActions();
    render();
}