import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'


import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="view">
        <div className="testDiv" />
      </Togglable>
    )

  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })


  test('clicking the like button calls event handler once', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

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

    const mockHandler = jest.fn()

    const component2 = render(
      <Blog blog={blog} user={user} handleLike={mockHandler}/>
    )

    const likebutton = component2.getByText('like')
    fireEvent.click(likebutton)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })

})

