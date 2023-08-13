import React from 'react'
import logo from '../../images/pacwest_logo_lg.png'

export default function Loading () {
  return (
        <div id="loading">
            <div id="loadingframe">
                <img src={logo} alt="logo" id="logo" />
            </div>
        </div>
  )
}
