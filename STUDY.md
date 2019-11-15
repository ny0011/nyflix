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

### #2.2 React Router Part Two

```
http://localhost:3000/#/ 에서 #이 hash(#)router라고 생각하면 됨!
만약 #말고 http://localhost:3000 로 보여지고 싶으면 HashRouter 대신 BrowserRouter를 가져오면 됨.
HashRouter : 내가 만든 페이지 사용(??). 앱처럼 보이고 싶을 떄
BrouwserRouter : HTML history API 사용. 브라우저처럼 보이고 싶을 때
```

```
Composition : 두개 이상의 Route를 동시에 랜더링하는 방식. React Router에 있는 것임.

/tv외에 /tv/popular도 있다고 해보자
만약 /tv/popular를 부르면 어떻게 될까?
/tv, /tv/popular 둘다 모두 render됨. 왜냐면 exact를 빼면 /tv와 /tv/popular 모두 검색되나봐... 문자열 순차 검색을 하는가봄..?

composition을 잘 사용하면 유용하게 쓸 수 있음.
예를 들어서 공통으로 보여줄 것은 /tv에 정의해두고 /tv/popular에는 popular만의 것을 보여주는 방식으로 사용할 수 있을듯.

Components/Header.js 를 만들어서 App.js에서 Router 위에 선언을 해보자
Router 바깥에 있으니까 모든 곳에서 Header를 볼 수 있음.
URL을 바꾸면 Router는 자동으로 새 router를 render함.
```

```
Redirect : A 페이지에서 B페이지로 보내는 것.

Router는 맨 위에서 순차적으로 검색하기 때문에 아래 코드는 맨 밑에 써줘야 함!!
<Redirect from="*" to="/" />
=> 만약 어떤 router에 접근하려고 하는데 그 페이지를 보여줄 파일이 없다면 / 페이지를 보여주는 것임.
=> 하지만 composition 때문에 항상 Redirect가 실행돼서 /만 보여주게 됨.
=> switch를 사용해보자
```

```
Switch: 한번에 딱 한 개 router만 render해줌.

/tv/popular를 검색하면 /tv만 보여주게 될 것임
-> /tv에 exact 옵션을 주자
-> /tv를 보여주지 않고 /tv/popular만 보여주게 됨.
```

### #3.0 CSS in React part One

```
예전에 하던대로 styles.css 파일을 만들어서 디자인을 변경할 수도 잇다.
하지만 react의 component 시스템은 기능과 디자인을 한 곳에서 변경하는 것을 더 선호함.
js파일과 css파일로 기능과 디자인을 따로 구성하지 않고 한 곳에서 해보자

1. Header 폴더에 Header.js, index.js, Header.css 로 선언하고
- Header.js에는 Header 내용만 작성
- Header.css에는 Header의 CSS 내용만 작성
- index.js에는 Header.js를 불러와서 외부 모듈이 참조할 수 있도록 내보내기를 한다. -> export default Header;
- index.js가 있기 때문에 App.js에서 "Components/Header/Header"로 선언하지 않아도 됨.

2. App.js 에서 import Header from "Components/Header"; 로 선언하면
기존처럼 <Header />를 불러올 수 있다

이 방식의 문제점
- 모든 Component를 이렇게 만들어야 함 -> 파일 개수가 늘어남
- 지금 Header.css는 모든 component에서 적용됨. Global임.
```

### #3.1 CSS in React part Two

```
CSS Module을 이용해보자.
className을 사용해서 css를 global이 아니라 local이 되도록 한다
create-react-app으로 만든 프로젝트라면
1. Header.css -> Header.module.css 로 파일명을 변경한다
2. css파일의 nav class 이름을 navList로 변경한다
3. Header.js에서 import "./Header.css" -> import styles from "./Header.css"; 로 변경한다
4. className을 자바스크립트의 오브젝트처럼 사용.
: <ul className={styles.navList}> 처럼 {} 안에 styles.navList로 class이름을 가져온다
5. yarn start로 class 이름을 확인해보면 뭔가 달라졌음ㄷㄷ
=> 그래서 navList를 다른 component에서도 사용할 수 있따!

단점
- 여전히.. 사용한 class의 이름을 기억해야 함...
아직 javascript와 css는 분리되어 있음.
-> 한 파일에서 같이 표현해보자
- navList는 되지만 .nav-list는 동작하지 않음.
-> 왜냐면 className={styles.nav-list} 로 -가 들어간 문자를 class이름으로 할 수 없음.

장점
- 작은 프로젝트라면 괜찮은 방법임.
```

### #3.2 CSS in React part Three

```
추천하는 방법 : styled-components! 무료 강의 들어보자
1. Header폴더를 삭제하고 Header.js를 밖으로 빼내자
2. yarn add styled-components 를 실행시켜서 모듈을 다운로드 받는다
3. Header.js
import styled from "styled-components" 로 모듈을 가져온 후 변수 List를 만든다
4. List를 ul 태그 대신에 List 태그로 선언해서 서버를 재실행한다
5. 깔끔!하게 잘 된다

javascript 안에 CSS가 있어서 편함.
```

```
https://velopert.com/3417
a href 태그를 변환할 때 react-router-dom의 Link를 사용하면 페이지를 새로 불러오지 않고 원하는 route로 화면 전환해줌.

const SLink = styled(Link)``;
```

```
You should not use <Link> outside a <Router> 라는 에러 발생!
App.js의 <Header>를 Router 안에서 사용하도록 바꿔주자
1. App.js의 Header 부분을 모두 지운다
2. Router.js에서 Header.js를 import하고 <Router>는 component 딱 하나만 올 수 있음
-> Fragment Component(<></>)를 사용해서 <Switch>위에 <Header>를 선언한다.

```
