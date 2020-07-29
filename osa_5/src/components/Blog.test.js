import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Blog from './Blog'

beforeEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'test_title',
    author: 'test_author',
    url: 'test_url',
    likes: 0
  }

  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent('test_title test_author')

  component.debug()
})

test('renders expanded content', () => {
  const blog = {
    title: 'test_title',
    author: 'test_author',
    url: 'test_url',
    likes: 0,
    user: {
      name: 'test_name'
    }
  }

  const user = {
    name: "test_name"
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('test_title test_author hide test_url likes 0 like test_name remove')
})

test('pressing like twice', async () => {
  const blog = {
    title: 'test_title',
    author: 'test_author',
    url: 'test_url',
    likes: 0,
    user: {
      name: 'test_name'
    }
  }
  
  const user = {
    name: "test_name"
  }
  
  const mockHandler = jest.fn()
  
  const component = render(
    <Blog blog={blog} user={user} addLike={mockHandler}/>
    )
    
  const button = component.getByText('view')
  fireEvent.click(button)
    
  const likeButton = component.getByText('like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)



  expect(mockHandler.mock.calls).toHaveLength(2)
  component.debug()
})