# 국가 자격증 복원 프로젝트

## 프로젝트 개요
이 프로젝트는 국가 자격증 시험 답안을 효과적으로 관리하고 사용자 간 의견 공유를 지원하기 위한 웹 애플리케이션입니다. 주제별 문제와 답안을 관리하며, 각 질문에 대해 사용자들이 댓글로 의견을 나눌 수 있는 기능을 제공합니다.

## 개발 기간 및 배포 주소
- **개발 기간** : 2024.10 ~ 
- **배포 주소** : [https://easyexam.me/](https://easyexam.me/)

## 주요 기능
### 1. 문제 및 답안 관리
- 시험 문제와 사용자가 제출한 답안을 저장, 조회, 관리할 수 있는 기능.
- JSON 파일 또는 데이터베이스를 기반으로 데이터를 저장하며, 주제별 답안 관리를 지원.

### 2. 댓글 및 토론 기능
- 각 문제에 대해 댓글을 추가할 수 있으며, 사용자들 간의 의견 공유와 피드백 가능.
- 실시간 댓글 표시 및 삭제 기능 지원.

### 3. 데이터 저장 및 관리
- MongoDB와 연동하여 시험 데이터, 사용자 답안, 댓글 등을 효율적으로 저장 및 관리.

## 기술 스택
- **Frontend**: React, Next.js
- **Backend**: Node.js, MongoDB
- **API**: Next.js API Routes
- **Styling**: CSS (글로벌 스타일 포함)

## API 라우트
- /api/answers: 답안 데이터 관리.
- /api/comments: 댓글 데이터 관리.
- /api/topices: 주제 데이터 CRUD.
- /api/topices/[id]: 특정 주제 데이터 관리.
