import { useState } from 'react'
import { Avatar } from '../Avatar'
import { Comment } from '../Comment'
import { Time } from '../Time'
import type { IComment, IPost } from '../../utils/types'
import styles from './styles.module.css'

type Props = IPost

const initialComments: IComment[] = [
  {
    id: 'first-comment-1232123',
    author: {
      name: 'Lucas Silva',
      avatarUrl: 'https://github.com/lucasspor.png',
      role: 'Desenvolvedor Web'
    },
    content: 'Muito legal esse post!',
    likes: 20,
    publishedAt: new Date(),
    isLiked: true
  }
]

export function Post({ author, publishedAt, content }: Props) {
  const [comments, setComments] = useState<IComment[]>(initialComments)
  const [newComment, setNewComment] = useState<string>('')
  const isNewCommentEmpty = newComment.length === 0

  function handleCreateNewComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setComments([...comments, {
      id: `comment-${comments.length + 1}`,
      likes: 0,
      content: newComment,
      publishedAt: new Date(),
      author: {
        name: 'Carlos Emilio',
        avatarUrl: 'https://github.com/codemilio.png',
        role: 'Desenvolvedor Web'
      },
      isLiked: false
    }])

    setNewComment('')
  }

  function handleChangeComment(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('')
    setNewComment(e.target.value)
  }

  function handleNewCommentInvalid(e: React.InvalidEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('O comentário não pode estar vazio.')
  }

  function handleDeleteComment(id: string) {
    const updatedComments = comments.filter(comment => comment.id !== id)
    setComments([...updatedComments])
  }

  function handleLikeComment(id: string) {
    setComments(prevComments => prevComments.map(
      comment => comment.id === id ? {
        ...comment, 
        likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
        isLiked: !comment.isLiked
      } : comment
    ))
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.info}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <Time publishedAt={publishedAt} />
      </header>

      <div className={styles.content}>
        {content.map(data => data.type === 'PARAGRAPH' ?
          <p key={data.content}>{data.content}</p> : <p key={data.content}><a href='#'> {data.content} </a></p>
        )}
      </div>

      <form className={styles.replies} onSubmit={handleCreateNewComment}>
        <strong> Deixe um comentário: </strong>
        <textarea 
          value={newComment} 
          onChange={handleChangeComment} 
          onInvalid={handleNewCommentInvalid}
          placeholder="Digite seu comentário..."
          required 
        />
        <footer>
          <button type='submit' disabled={isNewCommentEmpty}> Enviar </button>
        </footer>
      </form>

      {comments.map(data => 
        <Comment 
          {...data} 
          key={data.id}
          deleteComment={handleDeleteComment}
          likeComment={handleLikeComment}
        />
      )}
    </article>
  )
}
