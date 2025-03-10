import { useState, useEffect } from 'react';

import './randomChar.scss';
import useMarvelService from '../../services/MarvelService'
import mjolnir from '../../resources/img/mjolnir.png';
import setContent from '../../utils/setContent';

const RandomChar = (props) => {

    const [char, setChar] = useState({});

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('configmed'));
    }

    useEffect(() => {
        updateChar();
    }, [])




    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    let {name, description, thumbnail, homepage, wiki} = data;

    if (!description) {
        description = 'There is no description';
    } else if (description.length > 190) {
        description = description.slice(0, 190) + '...';
    }

    let classImg = 'randomchar__img';

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        classImg += ' randomchar__error'
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={classImg}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
