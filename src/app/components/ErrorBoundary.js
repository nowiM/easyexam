'use client';
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    // 에러가 발생한 뒤에 폴백 UI 렌더링
    static getDerivedStateFromError(error) {
        console.error("🚨 ErrorBoundary 감지됨:", error);
        return { hasError: true };
    }

    // 에러 정보를 기록
    componentDidCatch(error, errorInfo) {
        console.error("🛠 ErrorBoundary에서 잡은 에러:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h2>⚠️ 오류가 발생했습니다. 다시 시도해주세요.</h2>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
