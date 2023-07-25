const formatDate = (date, locale = 'ru-RU') => {
    return new Date(date).toLocaleDateString(locale, {day: 'numeric', month: 'long'})
}

const categoryNames = {
    index: 'Главная',
    fashion: 'Мода',
    politics: 'Политика',
    sport: 'Спорт',
    technologies: 'Технологии',
    karpov: 'Karpov'
}

const categoryIDs = {
    index: 0,
    fashion: 3,
    politics: 4,
    sport: 2,
    technologies: 1,
    karpov: 6,
}

const OptionSwitch = ({text, options = []}) => {
    return (
        <React.Fragment>
            <div className="grid-col-1 app-options">
                <button className={"app-options__switch"}>{text}</button>
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

const Navigation = ({onNavClick, currentCategory, className = ''}) => {
    return (
        <nav className={`nav grid-row ${className}`}>

            <a onClick={onNavClick} className="grid-col-2 nav__logo"
               data-href={"./index"}
               href={"./index"}
            >
                <img src="./img/app-logo.svg" alt="News Feed Logo"/>
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
                            >{categoryNames[name]}</a>
                        </li>
                    )
                })}
            </ul>

            <OptionSwitch text={'Язык'} options={['Ru', 'En']} />
            <OptionSwitch text={'Тема'} options={['Auto', 'Light', 'Dark']} />

        </nav>
    )
}

const BigNews = ({title, image, category, description, source}) => {
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

const BigNewsBox = ({heading, articles, indexStart, indexEnd}) => {
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

const SmallNews = ({title, date, source}) => {
    return (
        <li className="news-feed">
            <h3 className="news-feed__title news-line-limit">{title}</h3>
            <time className="news-date news-feed__date">{date}</time>
            <span className="news-source news-feed__more">{source}</span>
        </li>
    )
}

const SmallNewsBox = ({heading, articles, indexStart, indexEnd}) => {
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


const App = () => {
    const [category, setCategory] = React.useState('index');
    const [articles, setArticles] = React.useState({items: [], category: [], sources: []});

    const onNavClick = ((evt) => {
        evt.preventDefault();
        setCategory(evt.currentTarget.dataset.href);
    })

    React.useEffect(() => {
        fetch(`https://frontend.karpovcourses.net/api/v2/ru/news/${categoryIDs[category] || ''}`)

            .then(resp => resp.json())
            .then((newsDataJSON) => {
                setArticles(newsDataJSON)
            })

    }, [category])

    return (
        <React.Fragment>
            <header className="app-header">

                <div className="container app-header__body">
                    <Navigation key={category}
                                currentCategory={category}
                                onNavClick={onNavClick}
                    />
                </div>

            </header>


            <main className="app-main">
                <h1 className="sr-only">Главная</h1>

                <div className="grid-row container">

                    <div className="grid-col-9">
                        <BigNewsBox articles={articles}
                                    heading={'Последние новости'}
                                    indexStart={0}
                                    indexEnd={3}
                        />
                    </div>

                    <div className="grid-col-3">
                        <SmallNewsBox articles={articles}
                                      heading={'Новостная лента'}
                                      indexStart={3}
                                      indexEnd={12}
                        />
                    </div>
                </div>
            </main>


            <footer className="app-footer">

                <div className="container app-footer__body">

                    <Navigation key={category} className={'app-footer__nav'}
                                currentCategory={category}
                                onNavClick={onNavClick}
                    />

                    <div className="app-footer__copyright">
                        <span>Разработано на курсе в <a href="#" className="link"
                                                        target="_blank">Karpov.Courses</a></span>
                        <span>@ 2023</span>
                    </div>

                </div>

            </footer>
        </React.Fragment>
    )
}

ReactDOM.render(
    <App/>
    , document.getElementById('root')
);
