import React from "react";
import {BigNews} from "./BigNews.js";
export const BigNewsBox = ({heading, articles, indexStart, indexEnd}) => {
    return (
        <div className="news-cards">
            <h2 className="news-cards__heading">{heading}</h2>
            <div className="news-cards__box">
                {articles.items.splice(indexStart, indexEnd).map((item) => {
                    return (
                        <BigNews key={item.id}
                                 title={item.title}
                                 image={item.image ? item.image : './img/app-logo-short.svg'}
                                 category={articles.categories.find(({id}) => item.category_id === id).name}
                                 description={item.description}
                                 source={articles.sources.find(({id}) => item.source_id === id).name}
                        />
                    )
                })}
            </div>
        </div>
    )
}