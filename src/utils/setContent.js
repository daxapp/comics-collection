import Spinner from '../components/spiner/Spiner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton'


const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting': 
            return <Skeleton/>;
        case 'loading': 
            return <Spinner/>;
        case 'configmed':
            return <Component data={data}/>
        case 'error': 
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;