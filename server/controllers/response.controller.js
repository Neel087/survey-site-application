import Response from '../models/response.model.js'
import errorHandler from './../helpers/dbErrorHandler.js'

const create = async (req, res) => {
    try {
        const response = new Response()
        response.answers = req.body.response
        response.survey_id = req.survey._id
        let result = await response.save()
        res.status(200).json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listBySurvey = async (req, res) => {
    try {
        let responses = await Response.find({ survey_id: req.survey._id })
            .populate({
                path: 'answers.question_id',
                model: 'Question',
                select: 'title type options'
            })
            .populate('survey_id', 'name')
            .sort('-created_at')
            .exec();
        console.log("listBySurvey :: ", responses)
        const formattedResponses = responses.map(response => {
            const formattedAnswers = response.answers.map(answer => ({
                questionTitle: answer.question_id.title,
                selectedAnswer: answer.answer
            }));

            return {
                surveyTitle: response.survey_id.name,
                answers: formattedAnswers,
                created_at: response.created_at
            };
        });
        res.json(formattedResponses);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default {
    create,
    listBySurvey
}
