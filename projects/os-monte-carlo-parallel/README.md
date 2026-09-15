# CPU-bound Monte Carlo 병렬 처리 구조 성능 분석

**소속 / 기간** 운영체제 프로젝트
**최종 성과** 1.2억(120,000,000) trial 스케일링 측정, 4-worker 환경 92.5~94.0% 효율성 입증
**사용 기술** C, Linux, POSIX pthread, Process/IPC, Strong Scaling

## 문제
병렬 처리 워커 수를 늘리면 항상 성능이 비례해서 좋아질 것이라는 가정이 실제로 맞는지, 그리고 코어 활용률과 실행 시간 단축이 같은 지표인지 검증되지 않은 상태였습니다.

## 나의 역할
Monte Carlo 차량 추종 위험도 계산 워크로드를 설계하고, Sequential/Thread/Process/Hybrid/Pipeline 5가지 병렬 구조를 직접 구현 및 벤치마크했습니다.

## 구현 방법
- CPU-bound Monte Carlo 워크로드를 C로 구현 (1.2억 trial 규모)
- POSIX pthread, Process/IPC를 이용해 5가지 처리 구조(Sequential, Thread, Process, Hybrid, Pipeline)를 각각 구현
- Strong Scaling 기준으로 worker 수를 늘려가며 실행 시간과 자원 사용률을 측정

## 문제 해결 과정
4-worker 환경에서 높은 자원 포화도를 확인했고, 8-worker로 늘렸을 때 오히려 효율이 감소하는 현상을 데이터로 관찰했습니다. 이를 통해 "코어 활용률"과 "실제 실행 시간 단축"이 서로 다른 지표라는 것을 수치 레벨에서 입증했습니다.

## 결과
1.2억 trial 규모의 스케일링 측정을 완료했고, 4-worker 환경에서 92.5~94.0% 수준의 효율을 확인했습니다.

## 증빙 자료
- [운영체제 프로젝트 보고서 (PDF)](./os_report.pdf)
