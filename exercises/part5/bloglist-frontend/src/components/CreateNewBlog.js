import React from 'react'

const NewBlogForm = ({
  handleAddNew,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h2>add new</h2>
      <form onSubmit={handleAddNew}>
        <div>
          title
          <input
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            id='url'
            type="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button id="add-button" type="submit">add</button>
      </form>
    </div>
  )
}


export default NewBlogForm