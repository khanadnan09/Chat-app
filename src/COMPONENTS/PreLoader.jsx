import React from 'react'

const PreLoader = () => {
    return (
        <div className="container ">
            <div className="row">
                <div className="col-12 spinner__col">
                    <div className="spinner-border text-secondary" role="status"></div>
                </div>
            </div>
        </div>
    )
}

export default PreLoader