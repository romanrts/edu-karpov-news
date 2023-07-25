import React from "react";

export const SmallNews = ({title, date, source}) => {
    return (
        <li className="news-feed">
            <h3 className="news-feed__title news-line-limit">{title}</h3>
            <time className="news-date news-feed__date">{date}</time>
            <span className="news-source news-feed__more">{source}</span>
        </li>
    )
}