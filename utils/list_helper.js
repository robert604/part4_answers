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

module.exports = {dummy,totalLikes,favoriteBlog}