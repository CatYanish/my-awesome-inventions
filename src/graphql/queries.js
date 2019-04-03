// eslint-disable
// this is an auto generated file. This will be overwritten

export const getInvention = `query GetInvention($id: ID!) {
  getInvention(id: $id) {
    id
    title
    description
    bitsUsed
    userName
    email
    otherMaterials
  }
}
`;
export const listInventions = `query ListInventions(
  $filter: ModelInventionFilterInput
  $limit: Int
  $nextToken: String
) {
  listInventions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      bitsUsed
      userName
      email
      otherMaterials
    }
    nextToken
  }
}
`;
