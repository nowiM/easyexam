// app/api/comments/route.js
import { NextResponse } from 'next/server';
import Comment from '../../db/models/Comment';

// 댓글 목록 조회 (GET)
export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const topiceId = searchParams.get('topiceId');

    try {
        const comments = await Comment.find({ topiceId: parseInt(topiceId) }).sort({ createdAt: -1 });
        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
};

// 댓글 생성 (POST)
export const POST = async (request) => {
    try {
        const { topiceId, username, content } = await request.json();

        const newComment = new Comment({ topiceId, username, content });
        const savedComment = await newComment.save();
        return NextResponse.json(savedComment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
    }
};

// 댓글 수정 (PUT)
export const PUT = async (request) => {
    try {
        const { id, content } = await request.json();

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { content, updatedAt: new Date() },
            { new: true }
        );
        return NextResponse.json(updatedComment);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
    }
};

// 댓글 삭제 (DELETE)
export const DELETE = async (request) => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        await Comment.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
    }
};
