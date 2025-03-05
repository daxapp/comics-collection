import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleComicPage.scss';
import AppBanner from '../appBanner/AppBanner';

const SingleCharPage = () => {

    const { charId } = useParams();

    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => { // імітування фрагмента життєвого циклу componentDidMount()
        updateChar();
    }, [charId]);

    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharacterLoaded)   
            .then(() => setProcess('configmed'))        
    }

    const onCharacterLoaded = (char) => {
        setChar(char);  
    }



    return (
        <>
            <AppBanner/>
            {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail} = data;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">X{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to='/' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharPage;