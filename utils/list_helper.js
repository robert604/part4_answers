const dummy = arr => {
  return 1
}

const totalLikes = arr => {
  let total = arr.reduce((tot,item)=>tot+=item.likes,0)
  return total
}

module.exports = {dummy,totalLikes}