import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CommentForm from "../components/CommentForm"
import api from "../services/api"

const ArticleDetail = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articleRes, commentsRes] = await Promise.all([
          api.get(`/articles/${id}`),
          api.get(`/comments/article/${id}`)
        ])
        setArticle(articleRes.data)
        setComments(commentsRes.data)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }
    fetchData()
  }, [id])

  if (!article) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="mb-12">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center mb-6 text-gray-500">
          <span>By {article.authorName}</span>
          <span className="mx-2">•</span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="prose max-w-none">
          <p>{article.content}</p>
        </div>
      </article>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
        <CommentForm articleId={id} />
        <div className="mt-6 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">{comment.authorName}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-2">{comment.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ArticleDetail