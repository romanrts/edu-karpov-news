import React from "react";
import './BigNews.css';

export const BigNews = ({title, image, category, description, source}) => {
    return (
        <article className="news-card">
            <div className="news-card__image">
                <img src={image} alt="Фото новости"/>
            </div>
            <span className="news-category news-card__category">{category}</span>
            <div className="news-card__content">
                <h3 className="news-card__title news-line-limit">{title}</h3>
                <p className="news-card__desc news-line-limit">{description}</p>
                <span className="news-source news-card__more">{source}</span>
            </div>
        </article>
    )
}