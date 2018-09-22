import minMax from './minMax'

export default function(field) {
  return minMax({ field, targetPlayer: 'O'}).cell
}
