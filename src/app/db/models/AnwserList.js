import mongoose from 'mongoose';

const AnswersSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    }
})

const AnswerListSchema  = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    answers: {
        type: [AnswersSchema], // 서브 스키마를 사용하여 answers를 배열로 정의
        required: true
    }
});

// 모델 생성
export default mongoose.models.AnswerList || mongoose.model('AnswerList', AnswerListSchema);