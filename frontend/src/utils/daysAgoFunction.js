
export const daysAgoFunction = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference/(1000*24*60*60))
}