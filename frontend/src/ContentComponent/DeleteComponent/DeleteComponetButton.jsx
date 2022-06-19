import "./DeleteComponenetButton.css";

import * as React from "react";
import axios from "axios";

export default function deleteComponent(props) {

    const deleteImage = () => {
        axios.delete(`http://127.0.0.1:4000/file/images/${props.number}`)
            .then((success) => {
                console.log(success);
                axios.get('http://127.0.0.1:4000/file')
                    .then((success) => {
                        props.getlengthImageNew(success.data.length)
                    })
                    .catch((error) => {

                    })
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={`option inset-0 absolute inline-block rounded-lg`}>
            <button onClick={deleteImage} className={"delete-image p-2 rounded-xl font-bold mt-1.5 ml-1.5"}>
                Delete
            </button>
        </div>
    )
}
