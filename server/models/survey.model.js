import mongoose from 'mongoose'
const surveySchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
      required: 'Name is required'
   },
   description: { type: String },
   owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
   },
   created: { type: Date, default: Date.now },
   updated: Date,
});

export default mongoose.model('Survey', surveySchema);

