import AppBanner from "../appBanner/AppBanner";
import ComicsList from '../comicsList/ComicsList';
import { Helmet } from "react-helmet";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="page with list of our comics"
                    />
                <title>COmics page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage;