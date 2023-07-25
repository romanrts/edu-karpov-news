import {BigNewsBox} from "./BigNewsBox.js";
import {SmallNewsBox} from "./SmallNewsBox.js";

export const NewsFeed = ({articles}) => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}