// import articles from "../pages/article-content";
import { Link } from "react-router-dom";


const ArticleList = ({ articles }) => {
    return (
        <>
        {articles.map(article => (
            <Link key={article.name} className="article-list-item" to={`/articles/${article.name}`}>
                <h3>{article.title}</h3>
                <p> {article.content[0].substring(0, 151)}...</p>
            </Link>
        ))}
        </>
    );
}

export default ArticleList;