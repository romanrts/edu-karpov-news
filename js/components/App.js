import {options} from "../options.js";
import {Navigation} from "./Navigation.js";
import {NewsFeed} from "./NewsFeed.js";

export const App = () => {
    const [category, setCategory] = React.useState('index');
    const [articles, setArticles] = React.useState({items: [], category: [], sources: []});

    const onNavClick = ((evt) => {
        evt.preventDefault();
        setCategory(evt.currentTarget.dataset.href);
    })

    React.useEffect(() => {
        fetch(`https://frontend.karpovcourses.net/api/v2/ru/news/${options.category[category].id || ''}`)

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
                    <NewsFeed articles={articles}/>
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