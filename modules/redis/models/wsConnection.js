import { Entity, Schema } from 'redis-om'

const wsConnectionSchema = new Schema("WsConnection", {
  uuid: { type: 'string' },
  userid: { type: 'string' },
  status: { type: 'string' }
})

export default async function(client) {
  const personRepository = client.fetchRepository(wsConnectionSchema)

  await personRepository.createIndex()

  return personRepository
}