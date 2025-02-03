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
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
