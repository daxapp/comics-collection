import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import React, { useState, useEffect, useRef, useMemo} from 'react';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';


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

const CharList = (props) => {

    const [cards, setCards] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);


    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => { // useEffect запускається після рендера
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCardLoaded)
            .then(() => {setProcess('configmed')})
    }

    const onCardLoaded = async (newCards) => {

        let ended = false;
        if (newCards.length < 9) {
            ended = true;
        }

        setCards(cards => [...cards, ...newCards])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }


    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const elements = cards.map((item, index) => {
        return (
            <li 
                className="char__item" 
                key={item.id} 
                ref={elem => itemRefs.current[index] = elem}
                onClick={() => {
                    props.onCharSelected(item.id); 
                    focusOnItem(index)
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onCharSelected(item.id); 
                        focusOnItem(index)
                    }
                }}>
                <img src={item.thumbnail} alt="abyss"/>
                <div className="char__name">{item.name}</div>
            </li>
        )
    })

    const renderItems = () => {
        return (
            <ul className="char__grid">
                {elements}
            </ul>
        )
    }

    const element = useMemo(() => {
        return setContent(process, renderItems, newItemLoading)
    }, [process])

    return (
        <div className="char__list">
            {element}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => {onRequest(offset)}}>
                <div className="inner" >load more</div>
            </button>
        </div>
    )
    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;