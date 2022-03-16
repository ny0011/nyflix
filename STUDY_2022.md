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

## CSS

### 어떤 tag를 가운데에 두고싶으면?

- 아래처럼 설정
  ```
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  ```

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
