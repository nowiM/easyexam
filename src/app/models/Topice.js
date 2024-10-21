// models/Topice.js
import mongoose from 'mongoose';

const TopiceSchema = new mongoose.Schema({
    id: {// api/topices/[id]/route.js에서 id값을 저장
        type: Number,
        required: true,
        unique: true,
    },
    title: { // 시험 과목 저장
        type: String,
        required: true,
    },
    questions: { // 시험 문제의 개수를 저장
        type: Number,
        required: true,
    }
});

export default mongoose.models.Topice || mongoose.model('Topice', TopiceSchema);