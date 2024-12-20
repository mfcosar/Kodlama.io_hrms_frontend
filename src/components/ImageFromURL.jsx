import React from 'react';

const ImageFromURL = ({ imageUrl}) => {

    return (
        <div>
            <img class="ui circular image" src={imageUrl} width="40px" alt="" />
        </div>
    );
};

export default ImageFromURL;