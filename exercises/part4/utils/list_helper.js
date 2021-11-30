const dummy = (array) => {
  return 1
}

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return array.reduce(reducer, 0)
}

const favoriteBlog = (array) => {
  const reducer = (previousLargestNumberItem, item) => {
    return (item.likes > previousLargestNumberItem.likes) ? item : previousLargestNumberItem
  }

  return array.length === 0
  ? "empty array"
  : array.reduce(reducer, { likes: 0 }).title
}

// const mostBlogs = (array) => {
//   const authorreducer = (author, item) => {
//     if (author === item.author) {
//       return 
//     }
//   }

//   const reducer = (startingpoint, item) => {
//     console.log("array",array)
//     array.reduce(authorreducer, item.author)
//     return array
//   }

//   return array.reduce(reducer, 0)
// }

// const mostBlogs2 = (array) => {


//   return array.map(reducer, 0)
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}