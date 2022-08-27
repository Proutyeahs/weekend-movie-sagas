import { useSelector } from 'react-redux';

function Details() {

    const details = useSelector(store => store.details);
    const genres = useSelector(store => store.genres);

    return(
        <>

        </>
    )
}

export default Details