// import { Link } from "react-router-dom";
import ArticleList from "../Component/ArticleList";
import articles from "./article-content";


const ArticleListPage = () => {
    return (
        <>
        <h1>Articles</h1>
        <ArticleList articles={articles} />
        </>
    );
}


export default ArticleListPage;