import { Link } from 'react-router-dom'

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          {article.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.content}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            By {article.authorName}
          </span>
          <Link
            to={`/articles/${article.id}`}
            className="text-blue-500 hover:underline"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
