'use client';
import { useEffect, useState, useRef } from 'react';

const CommentSection = ({ topiceId }) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [updateContent, setUpdateContent] = useState('');
    const [editingComment, setEditingComment] = useState(null); // 수정 중인 댓글 ID
    const [username, setUsername] = useState(''); // 사용자 이름
    const [isFirstComment, setIsFirstComment] = useState(true); // 첫 댓글 작성 여부
    const [activeDropdown, setActiveDropdown] = useState(null); // 드롭다운 활성화 상태

    const dropdownRef = useRef(null);

    // 댓글 데이터 가져오기
    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/comments?topiceId=${topiceId}`);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            } else {
                console.error('Failed to fetch comments');
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();

        // localStorage에서 사용자 이름 가져오기
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            setIsFirstComment(false); // 이미 이름이 있으면 첫 댓글이 아님
        }
    }, [topiceId]);

    // 드롭다운 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 댓글 작성
    const handleAddComment = async () => {
        if (!content.trim()) return; // 내용이 없으면 등록 방지
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topiceId, username, content }),
            });

            if (response.ok) {
                setContent('');
                if (isFirstComment) {
                    // 이름을 localStorage에 저장
                    localStorage.setItem('username', username);
                    setIsFirstComment(false);
                }
                fetchComments();
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Enter 키로 댓글 등록
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // 새 줄 생성 방지
            handleAddComment();
        }
    };

    // 댓글 수정
    const handleEditComment = async (id, content) => {
        try {
            const response = await fetch('/api/comments', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, content }),
            });

            if (response.ok) {
                setEditingComment(null);
                fetchComments();
            } else {
                console.error('Failed to edit comment');
            }
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    // 댓글 삭제
    const handleDeleteComment = async (id) => {
        try {
            const response = await fetch(`/api/comments?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchComments();
            } else {
                console.error('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className='comentListAndinputs'>
            <h3>댓글</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <div className="commentHeader">
                            <span className="username">{comment.username}</span>
                            {editingComment === comment._id ? (
                                <textarea
                                    className='updateInput'
                                    value={updateContent}
                                    onChange={(e) => setUpdateContent(e.target.value)}
                                />
                            ) : (
                                <span className="comment">{comment.content}</span>
                            )}
                        </div>
                        <div className="commentControl">
                            {/* 드롭다운 버튼 */}
                            <button
                                className="menu-button"
                                onClick={() =>
                                    setActiveDropdown(
                                        activeDropdown === comment._id ? null : comment._id
                                    )
                                }
                            >
                                ...
                            </button>

                            {/* 드롭다운 메뉴 */}
                            {activeDropdown === comment._id && (
                                <div className="dropdown-menu" ref={dropdownRef}>
                                    <button
                                        onClick={() => {
                                            setEditingComment(comment._id);
                                            setUpdateContent(comment.content); // 수정할 댓글 내용 설정
                                            setActiveDropdown(null); // 드롭다운 닫기
                                        }}
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDeleteComment(comment._id);
                                            setActiveDropdown(null); // 드롭다운 닫기
                                        }}
                                    >
                                        삭제
                                    </button>
                                </div>
                            )}
                            {/* 저장 버튼 */}
                            {editingComment === comment._id && (
                                <button
                                    className='saveBtn'
                                    onClick={() => {
                                        handleEditComment(comment._id, updateContent);
                                        setEditingComment(null); // 수정 모드 종료
                                    }}
                                >
                                    저장
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <div className='inputFiledContainer'>
                {isFirstComment && (
                    <input
                        type="text"
                        placeholder="닉네임"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                )}
                <textarea
                    placeholder="댓글을 남겨주세요."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown} // Enter 키 이벤트
                />
                <div className="actionBtn">
                    <button onClick={handleAddComment}>등록</button>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
