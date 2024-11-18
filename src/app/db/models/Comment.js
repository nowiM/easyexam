// db/models/Comment.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    topiceId: { type: Number, required: true }, // 연결된 Topice ID
    username: { type: String, required: true }, // 댓글 작성자
    content: { type: String, required: true }, // 댓글 내용
    createdAt: { type: Date, default: Date.now }, // 생성 시간
    updatedAt: { type: Date, default: Date.now }, // 수정 시간
});

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema);
