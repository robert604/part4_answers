const {info,errorInfo} = require('./logger')
var _ = require('lodash')

const dummy = arr => {
  return 1
}

const totalLikes = arr => {
  let total = arr.reduce((tot,item)=>tot+=item.likes,0)
  return total
}

const favoriteBlog = arr =>{
  let fav = arr.reduce((best,current)=>{
    const mostLiked = best ? ((current.likes>best.likes) ? current : best) : current
    return mostLiked
  },null)
  const {_id,__v,url,...favBlogInfo} = fav
  return favBlogInfo
}

const mostBlogs = arr => {
  const grouped = Object.entries(_.groupBy(arr,blog=>blog.author))
  const maxed = _.maxBy(grouped,author_blogs=>{
    return author_blogs[1].length
  })
  return {author:maxed[0],blogs:maxed[1].length}
}

const mostLikes = arr => {
  const grouped = Object.entries(_.groupBy(arr,blog=>blog.author))
  const sumLikes = grouped.map(author_blogs=>{
    return {
      author: author_blogs[0],
      likes: _.sumBy(author_blogs[1],blog=>blog.likes)
    }
  })
  const maxLikes = _.maxBy(sumLikes,sumLike=>sumLike.likes)
  return maxLikes
}



module.exports = {dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes}