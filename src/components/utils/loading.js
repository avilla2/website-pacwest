import React from 'react'
import betalogo from '../../images/betaicon.png';

export default function Loading () {
    return (
        <div id="loading">
            <div id="svgframe">
                <svg id="spinlogo" width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="loadingframe">
                    <g id="light-blue" filter="url(#filter0_d_3:6)">
                        <circle cx="200" cy="200" r="150" fill="#69B3E7" fillOpacity="0.65" shapeRendering="crispEdges"/>
                    </g>
                    <path id="dark-blue" d="M350 200C350 221.767 345.263 243.273 336.117 263.026C326.971 282.778 313.636 300.303 297.037 314.385L257.459 267.732C267.288 259.393 275.184 249.016 280.6 237.32C286.016 225.624 288.821 212.889 288.821 200H350Z" fill="#003DA5" fillOpacity="0.65"/>
                </g>
                <defs>
                    <filter id="filter0_d_3:6" x="46" y="50" width="308" height="308" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feOffset dy="4"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3:6"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3:6" result="shape"/>
                    </filter>
                </defs>
            </svg>
                <img src={betalogo} alt="beta" id="betalogo" />
            </div>
        </div>
    )
}