import React, { createContext, useReducer, useEffect} from "react";
import { BookReducer } from "../reducers/BookReducer";

export const BookContext = createContext();

const BookContextProvider = (props) => {
    const [books, dispatch] = useReducer(BookReducer, [], () => {
        const localData = localStorage.getItem("books");
        return localData ? JSON.parse(localData) : [];
    });

    //useeffect to add the books to localstorage
    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books))
    }, [books]);
    /*
    //add a book
    const addBook = (title, author) => {
        setBooks([...books, {title: title, author: author, id: uuidv4() }])
    }
    //remove a book - filter the book based on the id
    const removeBook = (id) => {
        setBooks(books.filter(book => book.id !== id)) //if the book id is not equal to the id entered/passed in, keep the book(returns true), otherwise delete it
    }
    */
    return (
        <BookContext.Provider value={{books, dispatch}}>
            {props.children /*rep the components that the provider is going to wrap*/} 
        </BookContext.Provider>
    );
}

export default BookContextProvider;