import * as awardsData from './awards-data.json'

export const getNomineeNameFromId = nomineeId => {
    return getNomineeFromId(nomineeId).name
}

export const getNomineeFromId = nomineeId => {
    const allNomineesAllAwards = awardsData.awards.flatMap(a => a.nominees)
    const nominee = allNomineesAllAwards.find(a => a.id === nomineeId)
    return nominee
}
