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

    render();

    function initActions() {
        console.log('initActions');
    }

    initActions();
}