const getPoint = (
  rank: number,
  jackpod: number,
  type: number,
  numOfTeams: number
): number => {
  let points = [9, 7, 6, 5, 4, 3, 2, 1, 0]
  switch (type) {
    case 1:
      points = [9, 7, 6, 5, 4, 3, 2, 1, 0]
      break
    case 2:
      points = [18, 14, 12, 10, 8, 6, 4, 2, 0]
      break
    case 3:
      points = [9, 7, 6, 5, 4, 3, 2, 1, 0]
      break
    case 4:
      points = [9, 7, 6, 5, 0, 0, 0, 0, 0]
      break
    case 5:
      points = [14, 7, 0, 0, 0, 0, 0, 0, 0]
      break
    default:
      break
  }

  let point = 0
  switch (rank) {
    case 0 | 9:
      point = 0
      break
    case 1:
      for (
        let index = points.length - (4 - numOfTeams) * 2 - 2;
        index > jackpod - 1;
        index--
      ) {
        point = point + points[index]
      }
      break
    default:
      if (rank < jackpod) {
        point = points[rank - 1]
      }
      break
  }
  console.log(point)
  return point
}

export default {
  getPoint
}
