import mongoose from 'mongoose'
const questionSchema = new mongoose.Schema({
   survey_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Survey'
   },
   title: { type: String },
   type: { type: String, enum: ['text', 'multiple_choice', 'rating'] },
   options: { type: mongoose.Schema.Types.Mixed }
});

export default mongoose.model('Question', questionSchema);

