import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {

    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    
    const _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';
    
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const result = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(result.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description, 
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            price: comics.prices[0].price ? comics.prices[0].price : 'not availble',
            thumbnail: comics.thumbnail.path,
            description: comics.description,
            pageCount: comics.pageCount,
            // language: comics.textObjects[0].language ? comics.textObjects[0].language : 'en-US'
        }
    }

    return {process,
            getAllCharacters,
            getCharacter, 
            clearError,
            getAllComics, 
            getComic, 
            getCharacterByName,
            setProcess}
}

export default useMarvelService;


