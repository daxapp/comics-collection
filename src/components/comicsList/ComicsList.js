import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spiner/Spiner';
import './comicsList.scss';


const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting': 
            return <Spinner/>;
        case 'loading': 
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'configmed':
            return <Component/>;
        case 'error': 
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
} 

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newComicsLoading, setNewComicsLoading] = useState(false);

    const { getAllComics, error, loading, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => {setProcess('configmed')})
    }

    const onComicsLoaded = (newComics) => {
        setComics(comics => [...comics, ...newComics]);
        setOffset(offset => offset + 9);
        setNewComicsLoading(newComicsLoading => false)
    }

    const elements = comics.map((item, index) => {
        return (
            <li className="comics__item"
                key={index}>
                <Link to={`/comics/${item.id}`}>
                    <img src={`${item.thumbnail}.jpg`} alt="ultimate war" className="comics__item-img" />
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}$</div>
                </Link>
            </li>
        )
    })

    const renderItems = () => {
        return (
            <ul className="comics__grid">
                {elements}
            </ul>
        )
    }

    
    return (
        <div className="comics__list">
            {setContent(process, renderItems, newComicsLoading)}
            <button className="button button__main button__long" onClick={() => onRequest(offset)} disabled={newComicsLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;















