export default function(field) {
  return field.filter(cell => cell.player !== 'X' && cell.player !== 'O')
}
