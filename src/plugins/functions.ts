import axios from 'axios'

const func = async (): Promise<string[]> => {
  return await axios
    .get(
      ''
    )
    .then(function(res) {
      console.log(res.data)
      const values = res.data.values
      const resultList: string[] = []
      for (let index = 1; index < values.length; index++) {
        const raceResut = {
          no: values[index][0],
          dist: values[index][1],
          style: values[index][2],
          class: values[index][3]
        }
        resultList.push(JSON.stringify(raceResut))
      }
      return resultList
    })
}

export default {
  func
}
