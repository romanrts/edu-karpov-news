import React from "react";
import {options} from "../options.js";
import {OptionSwitch} from "./OptionSwitch.js";

const categoryNames = options.category;

export const Navigation = ({onNavClick, currentCategory, className = ''}) => {
    return (
        <nav className={`nav grid-row ${className}`}>

            <a onClick={onNavClick} className="grid-col-2 nav__logo"
               data-href={"./index"}
               href={"./index"}
            >
                <img src="../img/app-logo.svg" alt="News Feed Logo"/>
            </a>

            <ul className="grid-col-8 nav__list">
                {Object.keys(categoryNames).map((name) => {
                    return (
                        <li key={name} className="nav__item">
                            <a
                                onClick={onNavClick}
                                data-href={name}
                                href={`./${name}`}
                                className={`link nav__link ${currentCategory === name ? 'nav__link_current' : ''}`}
                            >{categoryNames[name].text}</a>
                        </li>
                    )
                })}
            </ul>

            <OptionSwitch text={'Язык'} options={['Ru', 'En']}/>
            <OptionSwitch text={'Тема'} options={['Auto', 'Light', 'Dark']}/>

        </nav>
    )
}