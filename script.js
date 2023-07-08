import newsDataJSON from './js/data.mjs';
import {escapeString, getDataByID, dateFormat, getValidData} from './js/utils.mjs';

const newsData = {
    cards: newsDataJSON.items.slice(0, 3),
    feeds: newsDataJSON.items.slice(3, 12),
    categories: newsDataJSON.categories,
    sources: newsDataJSON.sources,
}

const newsDataValues = {
    title: 'title',
    image: 'image',
    source: 'source_id',
    category: 'category_id',
    description: 'description',
    date: 'date',
}

const newsDataFallback = {
    title: 'Название',
    image: './img/app-logo-short.svg',
    source_id: 'Источник',
    category_id: 'Категория',
    description: 'Описание',
    date: 'Дата',
}

const newsParse = {
    title: (item) => getValidData(
        escapeString(item[newsDataValues.title]), newsDataFallback.title
    ),
    image: (item) => getValidData(
        encodeURI(item[newsDataValues.image]), newsDataFallback.image
    ),
    source: (item) => getValidData(
        escapeString(getDataByID(item[newsDataValues.source], newsData.sources).name), newsDataFallback.source_id
    ),
    category: (item) => getValidData(
        escapeString(getDataByID(item[newsDataValues.category], newsData.categories).name), newsDataFallback.category_id
    ),
    description: (item) => getValidData(
        escapeString(item[newsDataValues.description]), newsDataFallback.description
    ),
    date: (item) => getValidData(
        dateFormat(escapeString(item.date)), newsDataFallback.date
    ),
}

const createNewsCard = (item) => {
    const element = document.createElement('template');
    element.innerHTML = `
        <article class="news-card">
            <div class="news-card__image">
                <img src="${newsParse.image(item)}" alt="Фото новости">
            </div>
            <span class="news-category news-card__category">${newsParse.category(item)}</span>
            <div class="news-card__content">
                <h3 class="news-card__title news-line-limit">${newsParse.title(item)}</h3>
                <p class="news-card__desc news-line-limit">${newsParse.description(item)}</p>
                <span class="news-source news-card__more">${newsParse.source(item)}</span>
            </div>
        </article>
    `;

    return element;
}
const createNewsFeed = (item) => {
    const element = document.createElement('template');
    element.innerHTML = `
        <li class="news-feed">
            <h3 class="news-feed__title news-line-limit">${newsParse.title(item)}</h3>
            <time class="news-date news-feed__date">${newsParse.date(item)}</time>
            <span class="news-source news-feed__more">${newsParse.source(item)}</span>
        </li>
    `;

    return element;
}

const addNews = (array, box, createFn) => {
    array.forEach(dataItem => {
        const templateClone = createFn(dataItem, array).content.cloneNode(true);
        box.appendChild(templateClone);
    })
};

const newsCardsBox = document.getElementsByClassName('news-cards__box')[0];
const newsFeedsBox = document.getElementsByClassName('news-feeds__list')[0];

addNews(newsData.cards, newsCardsBox, createNewsCard);
addNews(newsData.feeds, newsFeedsBox, createNewsFeed);
