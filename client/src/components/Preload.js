import React from 'react'

export default function Preload() {
    return (
        <div className="center">
            <div className="preloader-wrapper active">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
            <h5>Carregando...</h5>
        </div>
    )
}
