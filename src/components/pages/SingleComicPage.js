import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import './singleComicPage.scss';
import { Helmet } from 'react-helmet';
import setContent from '../../utils/setContent';

const SingleComicPage = () => {

    const { comicId } = useParams();

    const [comic, setComic] = useState(null);

    const {getComic, clearError, process, setProcess} = useMarvelService();

    useEffect(() => { // імітування фрагмента життєвого циклу componentDidMount()
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)   
            .then(() => setProcess('configmed'))        
    }

    const onComicLoaded = (comic) => {
        setComic(comic);  
    }



    return (
        <>
            <AppBanner></AppBanner>
            {setContent(process, View, comic)}
        </>
    )
}

const View = ({data}) => {
    const {title, description, pageCount, thumbnail, price} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content="page our comics"
                    />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail + '.jpg'} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">X{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;