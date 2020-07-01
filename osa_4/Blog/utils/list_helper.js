const lodash = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const max = Math.max(...blogs.map(blog => blog.likes))
    const favourite = blogs.find(blog => blog.likes === max)
    return favourite
}


const mostBlogs = (blogs) => {
    const count = lodash.countBy(blogs, 'author')
    const author = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b)

    return ({ author: author, blogs: count[author] })
}

const mostLikes = (blogs) => {
    const authors = []
    lodash.forEach(blogs, (value, key) => {
        if (!authors.find(author => value.author === author.author)) {
            const new_author = value.author
            const init_likes = value.likes
            authors.push({ author: new_author, likes: init_likes })
        }else{
            const index = authors.indexOf(authors.find(author => value.author === author.author))
            authors[index]['likes'] = authors[index]['likes'] + value.likes
        }
    })
    const max = Math.max(...authors.map(name => name.likes))
    const favouriteTotal = authors.find(name => name.likes === max)
    return(favouriteTotal)
}

module.exports = { totalLikes, dummy, favouriteBlog, mostBlogs, mostLikes }