import React,{useState} from 'react'

function Grid({source, handleClick, dataNsId}) {

    const [isClicked, setClick] = useState(false);

    return (
        <div className={`grid ${isClicked ? "show": ""}`} 
        onClick={(event) => {
            setClick(true);
            handleClick(event);
            }}>
            <img className={`image ${isClicked ? "show": ""}`} data-ns-id={dataNsId} src={source} alt="img" />
        </div>
    )
}

export default Grid
