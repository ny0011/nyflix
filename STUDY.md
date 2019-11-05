# React Js nomflix

1. vanila js 기본 문법 https://codesandbox.io/s/quirky-goldstine-iec5p

2. Project Setup

### #2.0 Setting Up the Project

```
npx로 create-react-app 을 실행하면 create-react-app을 항상 최신버전으로 실행시킬 수 있다

$ yarn global add npx
$ npm i npx -g
$ npx create-react-app nomflix

$ yarn add prop-types
```

### #2.1 React Router Part One

```
README.md에는 구현할 내용을 써보자
src밑에 Components 폴더를 만들고 App.js를 여기로 옮기자
-> index.js에서 못찾을 것임
-> import App from "Components/App"; 로 수정해주자
-> ./Components로 안해도 되는 이유는 .env에서 NODE_PATH=src 로 설정했기 때문에 앱 실행 기본경로가 src가 됐음
=> 그런데 이제 NODE_PATH를 지원하지 않음!
=> .env대신 jsconfig.json을 만들고 "baseUrl": "src" 로 수정하자~
https://code.visualstudio.com/docs/languages/jsconfig

```

```
Routes 폴더 밑에는 앱에서 보여줄 스크린 js 파일을 저장한다
(Home, TV, Search, Detail.js)
그러면 React App이 처음 실행할 때 Home에서 시작하도록 어떻게 설정할까?
=> React Router를 사용해서 해결할 수 있다!
https://github.com/ReactTraining/react-router
우리는 그 중에서 react-router-dom만 사용할거얌
https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom

$ yarn add react-router-dom
```

```
사용할 수 있는 router가 여러개가 있는데 그중 HashRouter를 사용해보겠음
// Router.js
<Router> 안에 <Route>를 만듦.
- path는 URL의 주소를 지정. 정확한 path를 입력했을 때 보여지길 원하면 exact 옵션을 추가해준다
- component는 누군가가 URL로 path에 해당하는 Router에 접근했을 때 내 파일 중에서 어떤 것을 보여줄 지 설정하는 것.
- / path에 접근했을 때 Home App을 보여주도록 설정해보자.
- Detail 빼고 다 추가해보자~~

// App.js
- React는 한 개 component만 return해야 함.
-> Fragments component를 사용해보자!
<></>
-> 요 안에 여러 개의 component를 넣으면 됨
-> Components/Router를 리턴해보자
```
