import findAvalibleCells from './findAvalibleCells'

export default function(field){
  const availableCells = findAvalibleCells(field)
  const randomIndex = Math.floor(Math.random() * availableCells.length)

  return availableCells[randomIndex]
}
