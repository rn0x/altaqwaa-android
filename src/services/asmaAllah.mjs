import data from '../resources/data/asma_allah_alhusna_saeed_alqahtani.json'

export const ASMA_DATA = data

export function getAsmaById(id) {
  return ASMA_DATA.find((item) => item.id === id)
}

export function getAsmaByName(name) {
  return ASMA_DATA.find((item) => item.name === name)
}
