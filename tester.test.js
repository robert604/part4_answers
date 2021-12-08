const listHelper = require('./utils/list_helper')

const listWithOneBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }
]

const listWithThreeBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  }
]

test('dummy returns one',()=>{
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes',()=>{

  test('total likes for one blog',()=>{
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('total likes for 3 blogs',()=>{
    const result = listHelper.totalLikes(listWithThreeBlogs)
    expect(result).toBe(27)
  })
})

describe('favorite blog',()=>{
  test('favorite with one blog',()=>{
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: "React patterns",
      author: "Michael Chan",
      likes: 7
    })
  })

  test('favorite with three blogs',()=>{
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })
})

describe('most blogs',()=>{
  test('most blogs with one blog',()=>{
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: "Michael Chan",
      blogs: 1
    })
  })

  test('most blogs with three blogs',()=>{
    const result = listHelper.mostBlogs(listWithThreeBlogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 2,
    })
  })
})