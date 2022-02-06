import { getUsers } from '../../db/database.js'
import MongoDB from 'mongodb'
const ObjectId = MongoDB.ObjectId

/**
 * query = { username : username }
 * @param {*} username 
 * @returns 
 */
export async function findByUsername(username) {
  return getUsers().findOne({ username })
  .then(mapOptionalUser)
}

/**
 * _id 로 저장된 MongoDB id 값으로 검색
 * @param {*} id 
 * @returns 
 */
export async function findById(id) {
  return getUsers().findOne({_id : new ObjectId(id)})
    .then(mapOptionalUser)
}

/**
 * 
 * @param {*} user 
 * @returns 
 */
export async function createUser(user) {
  return getUsers().insertOne(user)
    .then(data => data.inseredId.toString())
}

function mapOptionalUser(user) {
  return user ? {...user, id: user._id} : null
}