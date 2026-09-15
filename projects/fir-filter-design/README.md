# Reconfigurable FIR Filter 설계

**소속 / 기간** 팀 프로젝트 (Verilog HDL 기반 FPGA 하드웨어 설계, 4인)
**팀원** 한승조, 최승완, 정의찬, 유지원
**최종 성과** Impulse Response Waveform 검증을 통해 21-tap FIR 구조의 정상 동작 확인
**사용 기술** Verilog HDL, FPGA, Quartus, QuestaSim, SRAM 기반 메모리 설계

## 문제
기존 고정 계수(fixed-coefficient) FIR 필터는 설계 시점에 정해진 필터 특성 하나만 제공한다. 저역통과·고역통과·대역통과 등 서로 다른 필터 특성이 필요할 때마다 하드웨어를 새로 설계해야 하는 비효율이 있었다.

## 나의 역할
기본 Verilog 코드 작성, Waveform 확인, 보고서 작성을 맡았다. (팀장·발표는 한승조, Waveform 확인·발표는 최승완, Testbench 코드 작성은 정의찬이 각각 분담)

## 구현 방법
- 21-tap Multiply-Accumulate(MAC) 구조의 FIR 필터를 Verilog로 설계
- 필터 계수(coefficient)를 4개의 SRAM(SpSram10x16) 모듈에 저장해, 계수를 바꾸는 것만으로 필터 특성을 재구성할 수 있는 구조로 설계
- Controller(FSM)로 "계수 업데이트(Coefficient Update) 단계"와 "필터 연산(Filter Operation) 단계"를 분리 제어
- Accumulator 모듈에서 각 tap의 곱셈 결과를 순차 누적하고 saturation check 수행
- Quartus·QuestaSim으로 시뮬레이션 및 Impulse Response Waveform 분석

## 문제 해결 과정
FIR 연산이 진행되는 도중 계수를 변경하면 tap마다 서로 다른 계수가 섞여 waveform이 고르게 출력되지 않는 문제가 있었다. 이를 계수 업데이트 구간과 필터 연산 구간을 완전히 분리된 타이밍으로 설계해 해결했다 — 필터 연산 단계에서는 SRAM을 Read-only로, 계수 업데이트 단계에서는 Write-only로 동작하도록 FSM에서 통제했다.

## 결과
Impulse Response Waveform 검증 결과, 계수가 정상적으로 로딩되고 Accumulator와 enable 신호 타이밍이 정상 동작하며 FIR 구조에 오류가 없음을 확인했다. 출력 파형은 Kaiser window 기반 계수의 대칭 구조(Linear Phase FIR)를 그대로 보여주었다.

## 증빙 자료
- [Reconfigurable FIR Filter 보고서 (PDF)](./fir_filter_report.pdf)
