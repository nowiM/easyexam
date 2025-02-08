# 시험 복원 및 채점  

**개발 기간**: 2024.10 ~ 현재  
**배포 주소**: [easyexam.me](https://www.easyexam.me/)  

---

## 기획 배경  
정보처리기사 실기 시험 직후 복원 작업을 시작했지만, 모바일 환경에서 Google 스프레드시트의 UI/UX가 불편하게 느껴졌습니다. 또한, 실시간 채점 기능을 통해 별도의 계산 없이 점수를 제공하여 사용자 경험을 개선하고자 본 서비스를 개발하게 되었습니다.  

---

## 주요 기능  
- 시험 과목 및 답안 관리  
- 실시간 채점 기능 제공 
- 댓글 기능을 통한 사용자 간 토론 가능   

---

## 사용 기술  
- JavaScript, Next.JS, MongoDB(Mongoose), Vercel 

---

## 기술적 이슈와 해결 방안  

### 1. 리액트에서 비동기 처리에 대한 고민
- **문제** : 
리액트에서 비동기 요청 상태(성공, 로딩, 실패)를 컴포넌트 내부에서 직접 관리하다 보니, 중복 코드가 많아지고 유지 보수 어려움
- **기술 스택 선택 배경**
  - `Suspense` & `ErrorBoundary`를 활용하여 비동기 요청의 상태(성공, 로딩, 실패)를 선언적으로 관리
  - **컴포넌트 내부에서 직접 상태를 관리하는 대신**, 로딩과 에러 처리를 외부에 위임하여 **컴포넌트 역할을 명확하게 분리**
  - 중복된 `try/catch` 구문을 제거하고, 에러 처리를 **전역적으로 관리하여 코드의 가독성과 유지 보수성을 향상**
- **해결책**
  - 로딩, 성공, 실패 상태를 한 컴포넌트에서 관리하는 대신, 외부에서 선언적으로 처리하여 불필요한 조건문을 줄임
  - Suspense를 사용하여 비동기 로딩을 간결하게 구현, `ErrorBoundary`를 통해 `try/catch` 없이 전역적인 에러 처리를 적용
  - 컴포넌트는 UI 렌더링 역할만 담당하도록 개선하여, 비즈니스 로직과 상태 관리를 분리
- **성과**
 - 각 비동기 요청마다 `try/catch`를 사용해야 하는 번거로움을 제거
 - 컴포넌트가 UI 역할에 집중할 수 있도록 개선
 - 비동기 요청의 성공/실패/로딩 상태를 외부에서 선언적으로 관리하여 가독성 향상
 - 코드의 역할을 명확히 분리하여 유지 보수성을 높임

### 2. 데이터 저장 및 관리 방식  
- **문제**: JSON 서버 사용 시 실시간 동기화와 데이터 관리가 어려움  
- **해결 방안**: JSON 서버에서 데이터베이스(DB)로 전환  
- **성과**: 실시간 동기화와 안정적인 데이터 관리로 사용자 경험(UX) 개선  

### 3. 댓글 작성 UX 개선  
- **문제**: 댓글 작성 시 마우스 클릭으로만 가능해 UX가 저하  
- **해결 방안**:  
  - 키 다운 이벤트를 활용하여 **Enter**로 댓글 작성  
  - **Shift + Enter**로 줄바꿈 기능 구현  
- **성과**: 키보드 자원을 활용해 UX를 대폭 개선  

### 4. 모달창 컴포넌트 설계  
- **문제**: 계산 및 제출 버튼 클릭 시 모달창을 효율적으로 설계하는 방식을 고민  
- **해결 방안**:  
  - 재사용 가능한 모달 컴포넌트 구조 설계  
  - 모달 상태와 메시지를 동적으로 관리하는 방식 구현  
- **성과**: 재사용 가능한 구조로 설계하여 코드 재사용성과 유지 보수성을 향상  

---