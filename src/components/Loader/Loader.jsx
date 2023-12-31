import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loader = () => {
    return (
        <Circles
            height="80"
            width="80"
            color="#2469ca"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    );
};

export default Loader;