import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';
import setContent from '../../utils/setContent';

import PropTypes  from 'prop-types';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const [prevProps, setPrevProps] = useState(props);
    
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => { // імітування фрагмента життєвого циклу componentDidMount()
        updateChar();
    }, [])

    useEffect(() => { // імітування фрагмента життєвого циклу componentDidUpdate()
        if(props !== prevProps) {
            updateChar();
        }
    }, [props, prevProps])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded) 
            .then(() => setProcess('configmed'))          
    }

    const onCharLoaded = (char) => {
        setChar(char);  
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
    
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    let classNameImg = 'char__img';

    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        classNameImg += ' char__contain'
    }

    const messageAboutComics = 'There is no comics about this character'


    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} className={classNameImg}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}            
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length === 0 ? messageAboutComics : comics.map((item, index) => {
                        if (index > 9) {
                            // eslint-disable-next-line
                            return;
                        }
                        return (
                            <li key={index} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;