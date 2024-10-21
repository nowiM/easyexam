import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
    answers: [
        {
            question: {
                type: String,
                required: true,
            },
            answer: {
                type: String,
                required: true,
            }
        }
    ]
});

// 이미 정의된 모델이 있다면 해당 모델 사용, 없다면 새로 정의
export default mongoose.models.Answer || mongoose.model('Answer', AnswerSchema);
