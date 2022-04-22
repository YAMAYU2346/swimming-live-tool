import axios from 'axios'

const getEntryList = async (url: string): Promise<string[]> => {
  console.log(url)
  return await axios.get(url).then(function(res) {
    console.log(res.data)
    const values = res.data.values
    const entryList: string[] = []
    for (let index = 1; index < values.length; index++) {
      const raceResut = {
        no: values[index][0],
        dist: values[index][1],
        style: values[index][2],
        class: values[index][3]
      }
      entryList.push(JSON.stringify(raceResut))
    }
    return entryList
  })
}

const getTeamName = async (url: string): Promise<string> => {
  const teamSheetURL = url.replace('system_entry', 'system_team')
  return await axios.get(teamSheetURL).then(function(res) {
    console.log(res.data)
    const values = res.data.values
    const teamList: {
      no: number
      name: any
      nameAbbr: any
    }[] = []
    for (let index = 1; index < values.length; index++) {
      const raceResut = {
        no: index,
        name: values[index][0],
        nameAbbr: values[index][1]
      }
      teamList.push(raceResut)
    }
    return JSON.stringify(teamList)
  })
}

export default {
  getEntryList,
  getTeamName
}
