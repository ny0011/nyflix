## framer-motion

### svg의 scale을 직접 다루지 않고 바깥 tag에서 조절할 때 origin이 변경되는 문제

#### 원인

- svg에서 크기를 고정하고 svg를 감싸고 있는 div에서 크기 조정을 하는 방법을 사용

  - scale을 변경 했을 때 origin이 default인 50%가 아니라 값으로 고정이 되었음
    - `transform-origin: 512px 133px`
    - 값으로 고정되면 왼쪽 위가 +방향이라서 축이 변경됨
    - scale이 가운데 고정이 아니라 왼쪽 위 고정이 됨!
    - 가운데 -> 왼쪽 위 -> 가운데로 무빙이 되는 효과

#### CSS scale

- https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale()
- scale을 사용할 때 기본축(transform-origin)이 현재 크기의 가운데 값임
  - (x y z) = (50% 50% 0)
- 왼쪽 위의 좌표가 (0, 0)이고 가운데가 50%, 50%이 되는 구조

#### 수정

- variants에서 origin을 고정하기. initial이든 whileHover에 해두든 상관 없는듯
  ```
  originX: "50%",
  originY: "50%",
  scale: [1, 1.2, 1],
  ```

### tag 간 간단한 이동 모션

- layoutId를 같게 만든다

### 여러 animation을 한번에 다룰 때는 useAnimation hook을 사용

#### 사용 방법

1. useAnimation() 변수 생성
   ```
   const inputAnimation = useAnimation();
   ```
2. animation을 넣고 싶은 tag의 animate에 변수 추가

   ```
   <Input animate={inputAnimation} />
   ```

3. 이벤트를 받는 함수에서 변수 사용

   ```
   const toggleSearch = () => {
   if (searchOpen) {
     inputAnimation.start({
       scaleX: 0,
     });
   } else {
     inputAnimation.start({
       scaleX: 1,
     });
   }
   setSearchOpen((prev) => !prev);
   };

   ```

### AnimatePresence

- React 트리에서 component가 제거될 때의 애니메이션을 주는 것
- component에서 key 값이 변경되면 trigger돼서 exit -> initial -> animate 순으로 움직임
- onClick 시 애니메이션이 동작하고 있을 때 다시 클릭 입력이 되는 걸 막기 위해 leaving이 true면 return 처리함
- 애니메이션이 끝났을 때 leaving이 끝났으니 false로 변경해야 함
  - `onExitComplete` prop를 사용하면 모든 node의 애니메이션 동작이 끝났을 때 어떤 일을 할지 지정할 수 있음
- 새로 고침하면 애니메이션이 실행돼서 움직이게 되는데 처음에는 애니메이션 동작을 안하게 하고 싶음
  - `initial={false}`로 지정하면 애니메이션이 동작하지 않음

## CSS

### 어떤 tag를 가운데에 두고싶으면?

- 아래처럼 설정
  ```
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  ```

### 배경 위에 텍스트가 잘 안보일 때?

- background-color에 linear-gradient를 추가
  ```
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
  url(${(props) => props.bgPhoto});
  ```
  - 이미지 위에 linear-gradient 색이 덮어 씌워짐.

## React Router

### 현재 URL의 router 위치를 알고 싶을 때?

- useRouteMatch() hooks를 사용
  - https://v5.reactrouter.com/web/api/Hooks/useroutematch
  - '/'는 항상 match되어서 isExact 값으로 체크함

### 홈페이지 url이 /가 시작이 아닐 때

- Router의 basename을 변경하기
  ```
  basename={process.env.PUBLIC_URL}
  ```

## React Query

### 사용 방법

1. QueryClient() 인스턴스 생성
2. QueryClientProvider에 client로 인스턴스 등록
3. QueryClientProvider 안에 React Query를 사용하는 component를 두기
4. component 내에서 useQuery 사용
