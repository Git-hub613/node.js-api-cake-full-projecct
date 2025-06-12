import fs from 'fs/promises'
const Data = async() => {
  try {
    const userData = await fs.readFile("user.json","utf8")
  const commentsData = await fs.readFile("comments.json","utf8")

  console.log(userData)
  console.log(commentsData)
  } catch (error) {

    console.log(error)
    
  } finally {
    console.log("this code is finally")
  }
}

console.log(Data())

