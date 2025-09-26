export type TTodo = { //export > todo를 임포트해서 가져갈 수 있다, 외부 허용
    id: number;
    text: string;
}//Todo 이름 겹치는 걸 막기위해 타입이면 앞에 T 인터페이스면 I를 붙이는 방법을 사용할 수 있다
//근데 대부분의 회사에선 이런 컨벤션을 안 쓴다고...?