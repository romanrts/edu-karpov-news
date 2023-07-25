import React from "react";
import {SmallNews} from "./SmallNews.js";
import {formatDate} from "../utils.js";

export const SmallNewsBox = ({heading, articles, indexStart, indexEnd}) => {
    return (
        <div className="news-feeds">
            <h2 className="news-feeds__heading">{heading}</h2>
            <ul className="news-feeds__list">
                {articles.items.slice(indexStart, indexEnd).map((item) => {
                    return (
                        <SmallNews key={item.id}
                                   title={item.title}
                                   source={articles.sources.find(({id}) => item.source_id === id).name}
                                   date={formatDate(item.date)}
                        />
                    )
                })}
            </ul>
        </div>
    )
}