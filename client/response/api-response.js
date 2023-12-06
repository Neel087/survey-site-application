const create = async (params, response, token) => {
    try {
        let resp = await fetch('/api/responses/' + params.surveyId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ response: response, token: token })
        })
        return resp.json()
    } catch (err) {
        console.log(err)
    }
}

const listBySurvey = async (params, credentials) => {
    try {
        let response = await fetch('/api/responses/survey/' + params.surveyId, {
            method: 'GET',
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

export {
    create,
    listBySurvey
}
