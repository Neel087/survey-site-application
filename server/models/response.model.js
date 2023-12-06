import mongoose from 'mongoose'
const responseSchema = new mongoose.Schema({
  survey_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
  answers: [{
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answer: { type: mongoose.Schema.Types.Mixed }
  }],
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Response', responseSchema);
