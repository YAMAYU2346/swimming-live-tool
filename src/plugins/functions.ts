import axios from 'axios'

const getEntryList = async (url: string): Promise<any> => {
  console.log(url)
  return await axios.get(url).then(function(res) {
    const values = res.data.values
    const teamList: [] = values[0]
    teamList.splice(0, 4)
    const entryList: any[] = []
    for (let index = 1; index < values.length; index++) {
      const entry = {
        no: values[index][0],
        dist: values[index][1],
        style: values[index][2],
        class: values[index][3],
        athleteList: createAthleteList(values[index], teamList)
      }
      entryList.push(entry)
    }
    return entryList
  })
}

const createAthleteList = (enrtyList: any[], teamList: string[]): any[] => {
  enrtyList.splice(0, 4)
  console.log(enrtyList)
  const athleteList = []
  for (let index = 0; index < enrtyList.length; index++) {
    const athlete = {
      lane: index + 1,
      team: teamList[index],
      name: enrtyList[index]
    }
    athleteList.push(athlete)
  }
  return athleteList
}

const getTeamName = async (url: string): Promise<string> => {
  const teamSheetURL = url.replace('system_entry', 'system_team')
  return await axios.get(teamSheetURL).then(function(res) {
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
