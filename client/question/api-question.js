import queryString from 'query-string'
const create = async (params, credentials, question) => {
  try {
    let response = await fetch('/api/questions/by/' + params.surveyId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(question)
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const read = async (params, signal) => {
  try {
    let response = await fetch('/api/questions/' + params.questionId, {
      method: 'GET',
      signal: signal
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (params, credentials, question) => {
  try {
    let response = await fetch('/api/question/' + params.surveyId + '/' + params.questionId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(question)
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/question/' + params.surveyId + '/' + params.questionId, {
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

const listBySurvey = async (params, signal) => {
  try {
    let response = await fetch('/api/questions/by/' + params.surveyId, {
      method: 'GET',
      signal: signal
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const listLatest = async (signal) => {
  try {
    let response = await fetch('/api/questions/latest', {
      method: 'GET',
      signal: signal
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const listRelated = async (params, signal) => {
  try {
    let response = await fetch('/api/questions/related/' + params.questionId, {
      method: 'GET',
      signal: signal
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const listCategories = async (signal) => {
  try {
    let response = await fetch('/api/questions/categories', {
      method: 'GET',
      signal: signal
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const list = async (params, signal) => {
  const query = queryString.stringify(params)
  try {
    let response = await fetch('/api/questions?' + query, {
      method: 'GET',
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

export {
  create,
  read,
  update,
  remove,
  listBySurvey,
  listLatest,
  listRelated,
  listCategories,
  list
}
