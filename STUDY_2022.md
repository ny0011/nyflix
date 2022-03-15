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
