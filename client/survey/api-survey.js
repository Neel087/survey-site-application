const create = async (params, credentials, survey) => {
  try {
    let response = await fetch('/api/surveys/by/' + params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(survey)
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const list = async (signal) => {
  try {
    let response = await fetch('/api/surveys', {
      method: 'GET',
      signal: signal
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const listByOwner = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/surveys/by/' + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const read = async (params, signal) => {
  try {
    let response = await fetch('/api/survey/' + params.surveyId, {
      method: 'GET',
      signal: signal,
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (params, credentials, survey) => {
  try {
    console.log("Body :", JSON.stringify(survey))
    let response = await fetch('/api/surveys/' + params.surveyId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(survey)
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/surveys/' + params.surveyId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

export {
  create,
  list,
  listByOwner,
  read,
  update,
  remove
}
