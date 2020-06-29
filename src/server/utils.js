export function getObject(db, id) {
  return db.objects.find(obj => obj.id === id)
}

export function getObjectIndex(db, id) {
  return db.objects.findIndex(obj => obj.id === id)
}

export function getZ(db) {
  return Math.max(0, ...db.objects.map(obj => obj.z || 0)) + 1
}