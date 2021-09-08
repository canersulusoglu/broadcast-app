import React, {useState, useEffect} from 'react';
import { Placeholder, Loader } from 'rsuite';

const Loading: React.FunctionComponent<{delay : any}> = ({delay}) =>{
    const [hidden, setHidden] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setHidden(false);
        }, delay ? delay : 0);
    }, []);

    return (
        hidden == false ? null :
        <Loader size="lg" backdrop content="Loading..." vertical />
    );
}

export default Loading;