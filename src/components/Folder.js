import React, { useState } from 'react';

const Folder = (props) => {
    const [type, setType] = useState();
    console.log(props);

    return (
        <React.Fragment>
            <p>{props.couponTitle}</p>
        </React.Fragment>
    );
};

export default Folder;