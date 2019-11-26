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
vscode-styled-components extension을 다운로드 받자
```

### #3.3 GlobalStyles and Header

```
Styled-Component는 일반적으로 local(한 파일에서만 사용할 수 있따)임
Global하게 바꿔보자(사이트의 폰트를 같게 하거나 일괄 설정 하고싶을 때가 있을거임)
-> styled-reset을 사용해보자!
```

```
styled-reset : SC를 이용해서 css를 초기화해서 0의 상태로 만들어줌.
1. $ yarn add styled-reset
2. GlobalStyles.js 파일 생성
3. styled-component에서 createGlobalStyle, styled-reset에서 reset 모듈을 가져온다
4. 변수를 통해 모든 화면에 해당 CSS가 적용되도록 설정한다.

외부로 내보내기
1) export default globalStyles; 를 해주면 외부에서 해당 component를 사용하게 됨.
2) export default()=>createGloabalStyle``;

전역 Component로 등록하기 : App.js에서 <Router> 밑에 GlobalStyle을 써준다.


```

### #3.4 Location Aware Header

```
Header가 어떤 Route에 있는지를 표시하도록 만들어보자
예를 들어서 TV route에 있으면 TV밑에 border-bottom을 주자!
1) props값으로 SC 내부의 CSS 속성을 변화시켜본다
2) 현재 위치가 어딘지 알아서 props 값을 바꾼다

1)
1. Header.js > Item에 border-bottom 기본값을 설정한다.
2. Item에 props를 주자.
모든 Item에 current={true}로 설정한다. current값이 true, false에 따라 border-bottom 값을 변경할 계획임.
3. Item의 transparent대신에 조건문을 써준다
${props => (props.current ? "#3498db" : "transparent")}
4. Item의 current값을 수정해준다.

이렇게 하면 SC 외부에서 내부로 props를 전달할 수 있다.

2)
1. react-router-dom의 withRouter 모듈을 가져온다
withRouter : 다른 컴포넌트를 감싸는 컴포넌트. router에게 정보를 준다
https://thebook.io/006946/ch16/07-01/
https://react-router.vlpt.us/1/05.html
route가 아닌 컴포넌트에서 router에서 사용하는 객체(location, match, history)를 사용할 때 쓰는 coponent.
2. <Header></Header>의 모든 내용을 withRouter()로 감싼다.
그래서 실제로 export하는 것은 withRouter()임.
withRouter()덕분에 props에 접근할 수 있음.
3. HeaderComponent는 withRouter의 props를 전달받게 된다.
console.log(props)로 확인해보면 history, location, match를 갖고 잇음.
4. location의 pathname을 가져온다. -> Spread Operator를 사용한다
{ location: { pathname } }

```

### #4.0 Introduction to The Movie DB API

```
1. 영화 데이터는 the movie db API를 사용할 것임.
https://www.themoviedb.org/
settings > API 에서 API key(v3)을 복사한다
2. API가 어떤 값을 주는지 알아보자
https://developers.themoviedb.org/3
3. 아래 링크의 try it out에서 어떤 형식으로 request를 보내고 response를 받는지 확인할 수 있음
https://developers.themoviedb.org/3/movies/get-popular-movies
```

### #4.1 Sexy Networking with Axios Instances

```
API로 서버에서 데이터를 받아오자!
만들 목록은 Readme.md에 추가해둠.
fetch로 모든 Component에서 Api를 불러도 되지만 그러면 fetch를 여러번 부르게 되어 번거로움.
-> network와 API만 다루는 새 파일을 만들어보자
-> src/api.js
```

```
1. axios 패키지를 추가한다
axios는 HTTP Request를 다루기 좋음.
$ yarn add axios@0.18.1

2. api.js
import axios from "axios";

// 서버에 보낼 내용을 적는다. url과 공통으로 사용되는 내용은 params에 넣는다.
const api = axios.create({})

// /tv/popular로 보내면 안됨. /가 앞에 있으면 절대경로를 찾게 됨.
// 상대경로로 찾기 위해서 바로 문자를 적는다
api.get("tv/popular");

3. 확인은
api.js : export default api
index.js : import "./api"
로 debug > network 에서 확인할 수 있다
axios로 처리하면 깔끔함!
```

### #4.2 API Verbs part One

### #4.3 API Verbs part Two

```
나머지 API들을 추가해주자
그리고 details들은 append to response를 지원함.
https://developers.themoviedb.org/3/getting-started/append-to-response

append to response는 api.get(,{params: {append_to_response: "videos"}}) 로 params 안에 추가해준다.

search할 때 query도 마찬가지.
대신에 string이라서 스페이스나 느낌표같은 문자는 %20과 같이 바뀐다.
왜냐하면 uri가 인식하는 문자는 string이 아니기 때문.
제대로 uri가 인식하도록 인코딩하자
=> encodeURIComponent()

```

### #5.0 Container Presenter Pattern part One

```
작은 프로젝트라면 각 component가 state를 갖고 잇어서 state가 갱신될 때 api에서 데이터 가져오고 데이터를 렌더링 할 것.
하지만 작은 프로젝트 아니라면?
=> Container Presenter Pattern 으로 Api 데이터를 가져오자

- container(data)가 data, state를 갖고 있어서 api를 불러온다
- presenter(style)가 data를 보여주는 역할을 한다.
- 하지만 presenter는 state, api, class 등등 없고 그냥 함수형 컴포넌트임.
=> 4개 route(Routes 내부의 .js파일들)를 위해 모든 컨테이너와 프리젠터를 만들어보자

1. src/Routes에서 폴더를 만든다
Detail, Home, Search, TV
2. 만든 폴더에 index.js를 만든다(export를 쉽게하려고)
3. Home 폴더에 HomeContainer.js를 만든다
4. Home/index.js에서 HomeContainer를 가져오고 내보낸다
5. HomeContainer는 state를 가진 react component가 됨.
6. HomeContainer.js에 HomePresenter를 가져오고 HomePresenter.js를 만든다
7. Routes/Home.js는 삭제한다

Home
ㄴ index.js
ㄴ HomeContainer.js
ㄴ HomePresenter.js

Router.js에서 Home을 찾을 때 index.js가 있기 때문에 Router.js의 import를 바꾸지 않아도 됨.
index.js 가 default로 HomeContaiger.js를 불러오고 HomeContaiger.js가 렌더링될 때 HomePresenter.js를 부름.
결국 보여주는 화면은 HomePresenter.js다.

```

### #5.1 Container Presenter Pattern part Two

-   네가지 route container를 모두 만들었다!
-   근데 손이 아프다...

### #5.2 Home Container

-   await(ES6 script)
-   try-catch-finally

```
목표
1. mount 후 api 실행
2. api에서 값을 받아서 state 설정함
3. 에러가 있으면 loading : false

1. componentDidMount()를 사용한다
2. try-catch-finally 구문으로 에러를 받아보자
- try에서는 에러가 발생할 수 있는 구문을 넣음.
-> api가 데이터를 얻어올 수 있도록 비동기 처리
(async componentDidMount, await moviesApi.nowPlaying())
-> Object Deconstruction
- catch에서 에러를 얻어서 보여주는 처리를 함
- finally에서 try, catch 중 뭐가 끝났든 마지막에 처리할 구문을 넣음.
-> 지금은 loading: false로 해줄 것임.

```

### #5.3 TV Container

```
async componentDidMount{}
아래와 위는 같은 구문!
componentDidMount = async() => {

  }
```

### #5.4 Search Container

```
기능
1. handleSubmit : form에서 검색할 단어를 적고 Enter할 때 실행됨.
- 1) searchTerm이 빈칸인지 확인
- 2) 빈칸이 아니면 search 함수(searchByTerm)를 실행
2. searchByTerm
- try :
- 1) 누군가 검색하려고 엔터를 누르면 loading:true로 만듦(로딩화면 띄우기)
- 2) api로 데이터 받아오기
- 3) state에 데이터 저장하기
- finally:
- 4) loading:false 로 끝내기

디버깅 하려면?
1. state의 searchTerm:"ddd" 값을 준다
2.  componentDidMount() {
    this.handleSubmit();
  }
  로 렌더링 후에 handleSubmit()을 불러오도록 한다
3. render()에서 console.log(this.state); 을 찍어본다

이렇게 만든 handleSubmit은 SearchPresenter에서 폼을 제출하려고 Enter를 누를 때 이벤트로 사용된다.
-> SearchPresenter로 handleSubmit 함수를 보내준다
-> searchTerm 변수를 가져오는 함수는 나중에 만들 것임
```

```
Detail 페이지에 접근하도록 라우터에 추가해보자
(/movie/12 로 이동할 수 있도록.. 12는 id값임)
Router.js
<Route path="/movie/:id" component={Detail}></Route>

- ':id' 자리에 어떤 값이 들어오더라도 모두 Detail 라우트에 보낼 것임.
```

### #5.5 Detail Container part One

```
Header.js에서는 withRouter()를 이용해서 location을 알 수 있었다
왜냐면 헤더는 라우트가 아니니까 바로 props를 얻을 수 없기 때문임.
하지만 Home, Detail 같이 Routes폴더 밑에있는 라우트는 라우터가
props를 전달하기 때문에 withRouter()를 사용하지 않아도 됨.

기능 flow
1. /movie 에서 왔는지 /show 에서 왔는지 확인
2. /movie 뒤에 어떤 숫자가 왔는지 파악
- 숫자만 오도록 설정하기
   const parsedId = parseInt(id);
    if (isNaN(parsedId)) { // 숫자가 아닌 다른 문자가 들어오면 NaN이 됨.
    // props의 history의 push함수. 다른 라우터로 이동하게 한다. return으로 함수를 강제 종료함.
      return push("/");
    }
- push 후 return을 하지 않으면 push 이후의 명령어가 실행되기 때문.
```

### #5.6 Detail Container part Two

```
1. string 데이터에 특정 문자열이 있는지 검색해보자
-> string.includes()
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/includes

2.  constructor를 만들자
1) constructor 내부로 state를 옮겨서 클래스가 생성될 때 변수들을 설정한다
2) isMovie를 state 안으로 옮긴다
3) const {isMovie} = this.state; 이렇게 isMovie 값을 불러올 수 있따

3. isMovie인지 아닌지에 따라 api를 다르게 불러온다.
const request = await moviesApi.movieDetail(parsedId);
result = request.data
이것도 되지만 다른 방법은 없을까?

```

### #6.0 Presenter Structure

-   presenter 추가하자

### #6.1 HomePresenter and Section Components

```
1. section을 추가하자!
-> upcoming movies section 안에 관련 영화들을 보여줌. 내용을 감싸는 것..
Components/Section.js
1) ({title, children})
- children : 예약된 react prop. component 내부에 위치하는 component들이 저장된 변수.
https://github.com/yannickcr/eslint-plugin-react/issues/7#issuecomment-90294004
2) title과 children을 화면에 출력한다

2. HomePresenter.js에서 화면을 어떻게 보여줄지 정한다.
화면에 바로 nowPlaying 값을 보여주게 되면 render가 되기 전에는 값이 없어서 에러가 발생한다.
-> loading 변수로 render()가 끝났는지 확인해보자

3. Section을 HomePresenter로 불러온다
1) 데이터를 Section으로 가져와서 Section에서 정의한대로 보여준다

아래것은 찾아보자
:not(:last-child) {
		margin-bottom: 50px;
	}

```
