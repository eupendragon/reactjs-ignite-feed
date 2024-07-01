export interface IAuthor {
  name: string
  avatarUrl: string
  role: string 
}

export interface IContentParagraph {
  type: 'PARAGRAPH' | 'LINK'
  content: string 
}

export interface IPost {
  id: string 
  author: IAuthor
  publishedAt: Date 
  content: IContentParagraph[]
}