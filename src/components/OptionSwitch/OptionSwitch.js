import React from 'react'
import './OptionSwitch.css'

export const OptionSwitch = ({text, options = []}) => {
    return (
        <React.Fragment>
            <div className="grid-col-1 app-options">
                <button className={'app-options__switch'}>{text}</button>
                <ul className="app-options__list">
                    {options.map(item => {
                        return (
                            <li key={item} className="app-options__item">{item}</li>
                        )
                    })}
                </ul>
            </div>
        </React.Fragment>
    )
}