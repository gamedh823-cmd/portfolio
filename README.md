# 유지원 (Yu Jiwon) — Portfolio

검색 엔진, 운영체제 병렬 처리, 생성형 AI, 임베디드 시스템까지 서로 다른 레이어의 프로젝트를 직접 설계·구현하고, 그 결과를 수치로 검증하는 것을 중요하게 생각하는 엔지니어입니다. 숭실대학교 전자정보공학부 IT융합전공.

- **포트폴리오 웹사이트**: https://gamedh823-cmd.github.io/portfolio/
- **Contact**: gamedh823@gmail.com

## Experience

- 2025 SSU DATATHON — 우수상 (FAISS 기반 의미론적 검색 엔진 모델 구축)
- 2025 한이음 드림업 프로젝트 — 장려상 (과학기술정보통신부 주최, 생성형 이미지 AI 기반 결함 데이터 증강 시스템)
- 2026 SKT ALEPH 1기 이수 중
- 정보처리기사 — 필기 합격, 실기 준비 중

## Tech Stack

Python · C · ARM Assembly · Verilog HDL · PyTorch · FAISS · Django · AWS (S3/RDS) · Linux · POSIX pthread

## Projects

아래 표는 빠르게 훑어볼 수 있는 요약이고, 각 프로젝트 링크를 누르면 **문제 → 나의 역할 → 구현 방법 → 문제 해결 과정 → 결과 → 증빙 자료** 순서로 정리된 상세 README와 원본 보고서를 볼 수 있습니다.

| 프로젝트 | 한 줄 요약 | 핵심 결과 | 증빙 |
|---|---|---|---|
| [의미론적 검색 엔진 모델 구축](./projects/semantic-search-engine) | FAISS 기반 벡터 검색으로 키워드 매칭의 한계를 극복 | 데이터톤 대회 우수상 수상 | [보고서](./projects/semantic-search-engine/datathon_report.pdf) |
| [한이음 드림업: 결함 데이터 증강 시스템](./projects/hanium-dreamup) | Stable Diffusion 기반 제조 결함 이미지 생성 및 서비스 연동 (2025 과학기술정보통신부 주최) | 장려상 수상 | [보고서](./projects/hanium-dreamup/hanium_report.pdf) · [설계서](./projects/hanium-dreamup/hanium_design.pdf) |
| [CPU-bound Monte Carlo 병렬 처리 구조 성능 분석](./projects/os-monte-carlo-parallel) | 5가지 병렬 구조(Thread/Process/Hybrid 등) 성능 비교 | 1.2억 trial 측정, 4-worker 92.5~94.0% 효율 입증 | [보고서](./projects/os-monte-carlo-parallel/os_report.pdf) |
| [생성형 AI 기반 이상 탐지 모델 설계](./projects/ai-anomaly-detection) | Autoencoder + Diffusion 융합 이상 탐지 | 재구성 오차율 최소화 | [보고서](./projects/ai-anomaly-detection/ann_project.pdf) |
| [ARM 코드 최적화 및 이미지 변환 시스템](./projects/arm-image-processing) | Keil MDK, ARM Assembly로 이미지 변환 구현 | 링커 충돌 문제 분석·해결 | [보고서](./projects/arm-image-processing/microprocessor_report.pdf) · [발표자료](./projects/arm-image-processing/microprocessor_presentation.pdf) |
| [4-bit 하드웨어 아키텍처 설계](./projects/cpu-4bit-architecture) | 4-bit 연산 구조 및 논리 회로 설계 | 설계 명세 동작 검증 완료 | 로컬 아카이브 |
| [Reconfigurable FIR Filter 설계](./projects/fir-filter-design) | Verilog로 21-tap 재구성형 FIR 필터 설계 (4인 팀 프로젝트) | Impulse Response Waveform으로 정상 동작 검증 | [보고서](./projects/fir-filter-design/fir_filter_report.pdf) |

## Repository 구조

```
portfolio/
├── README.md
├── index.html                # 포트폴리오 웹사이트 (GitHub Pages)
└── projects/
    ├── semantic-search-engine/
    ├── hanium-dreamup/
    ├── os-monte-carlo-parallel/
    ├── ai-anomaly-detection/
    ├── arm-image-processing/
    ├── cpu-4bit-architecture/
    └── fir-filter-design/
```
