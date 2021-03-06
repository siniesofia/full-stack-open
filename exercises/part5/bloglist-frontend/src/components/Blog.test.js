import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not likes or url', () => {
  const user = {
    'username': 'kiira',
    'name': 'kiira',
    'password': 'salasana',
    'id': '61b350f00325d3a5d7b80ed4'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'blog author',
    url: 'yle.fi',
    user: user
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )



  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  expect(component.container).toHaveTextContent(
    'blog author'
  )

  expect(component.container).toHaveTextContent(
    'blog author'
  )

})

