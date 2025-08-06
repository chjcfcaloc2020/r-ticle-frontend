import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import api from "../services/api"

const CommentForm = ({ articleId, onCommentAdded }) => {
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) {
      setError("Comment cannot be empty")
      return
    }

    try {
      const response = await api.post("/comments", {
        content,
        articleId,
      })
      setContent("")
      setError("")
      if (onCommentAdded) onCommentAdded(response.data)
    } catch (err) {
      setError("Failed to post comment")
    }
  }

  if (!user) {
    return (
      <div className="text-center py-4 text-gray-500">
        Please <Link href="/login" className="text-blue-500">login</Link> to comment
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700 mb-2">
          Add Comment as {user.username}
        </label>
        <textarea
          id="comment"
          rows="3"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment here..."
        ></textarea>
      </div>
      
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Post Comment
      </button>
    </form>
  )
}

export default CommentForm
