import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader"

const Loader = ({ type = "" }) => {
    return (
        <div className={"loader-page " + type}>
            <img src="/assets/logo/logo.svg"/>
            <PropagateLoader 
                color={'#723BED'} 
                loading={true} 
                size={15} />
        </div>

    )
}

export default Loader
