import MongoDB from 'mongodb'
import * as userRepository from './auth.js';
import { getJweets } from '../../db/database.js';
const ObjectId = MongoDB.ObjectId

export async function getAll() {
  return getJweets() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapJweets)
}
  
export async function getAllByUsername(username) {
  return getJweets().find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapJweets)
}

export async function getById(id) {
  return getJweets().findOne({ _id: new ObjectId(id)})
  .then(mapOptionalJweet)
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId)
  const jweet = {
    text,
    createdAt: new Date(),
    userId, 
    name,
    username,
    url
  }
  return getJweets().insertOne(jweet)
    .then(data => mapOptionalJweet({ ...jweet, _id: data.insertedId}))
}

export async function update(id, text) {
  return getJweets().findOneAndUpdate( // 해당 함수는 return value 가 있음, void 의 경우 updateOne() 사용
    {
      _id: new ObjectId(id)
    },
    {
      $set: { text }
    },
    {
      returnDocument: 'after'
    }
  )
  .then(result => result.value) // 저장된 데이터는 res.value 안에 들어와있는 구조
  .then(mapOptionalJweet)
}

export async function remove(id) {
  return getJweets().deleteOne({ _id: new ObjectId(id)})
}

function mapOptionalJweet(jweet) {
  return jweet ? { ...jweet, id: jweet._id.toString() } : null
}

function mapJweets(jweets) {
  return jweets.map(mapOptionalJweet)
}