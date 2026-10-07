# OPC Recipe 파라미터 변화에 따른 Mask·Contour 보정 분석

**소속 / 기간** 컴퓨터를 활용한 리소그래피 PBL (6인 팀 프로젝트)
**최종 성과** Split recipe 적용으로 Corner Rounding 24.39nm → 19.1nm, Mask–Contour CD 차이 5nm → 3.5nm 개선
**사용 기술** Synopsys Proteus WorkBench, OPC(Optical Proximity Correction), Hierman / Corexec, Contour Simulation

## 문제
반도체 공정에서는 빛의 회절 때문에 마스크 패턴을 그대로 웨이퍼에 인쇄하면 모서리가 둥글어지고 선폭이 줄어드는 왜곡이 생깁니다. OPC는 이 왜곡을 미리 계산해 마스크를 보정하는 기술인데, Recipe 파라미터를 어떻게 잡느냐에 따라 보정 결과가 달라집니다. 어떤 파라미터가 어떤 품질 지표를 바꾸는지 직접 확인하는 것이 과제의 목표였습니다.

## 나의 역할
6인 팀의 일원으로 default / split 두 가지 recipe를 설정해 OPC를 수행하고, Contour simulation 결과를 비교하는 실습에 참여했습니다.
## 구현 방법
- **Feature Classification**: Min_feature를 65nm → 50nm로 낮춰 더 작은 Feature까지 인식하도록 설정
- **Dissection**: out/in_vert_len 60 → 50, nominal_seg_len 50 → 40, min_seg_len 40 → 35, num_run_segs 5 → 6으로 Edge를 더 세밀하게 분할
- **Retargeting**: vert_control 1.0 → 0.8로 낮춰 Corner 부근의 과도한 보정 방지
- **Hierman → Corexec**: 입력 Layout의 Template를 생성한 뒤, Recipe Parameter를 적용해 OPC 수행
- OPC Mask layout 생성 후 Model Set up / simulation으로 Contour를 얻고 CD를 측정

## 문제 해결 과정
Recipe 파라미터마다 영향을 주는 영역이 달라, 변경 항목별로 "예상 결과"를 먼저 세운 뒤 실제 측정값과 대조했습니다.
Dissection을 세분화하면 Segment 수가 늘어 Corner·Edge 보정 정밀도가 오르고, Retarget 강도를 낮추면 Corner에서 과도한 Edge 이동이 줄어들 것이라 예상했고, 두 recipe의 Contour를 같은 위치에서 측정해 이를 확인했습니다.

## 결과
| 지표 | default | split |
|---|---|---|
| OPC Mask 기준 spacing | 28.5nm | 37.5nm |
| Mask–Contour CD 차이 | 5nm | 3.5nm |
| Contour narrowing (Mask–Contour 거리) | 1.5nm | 1nm |
| Corner Rounding | 24.39nm | 19.1nm |
| Line Edge Roughness | — | 육안으로 감소 확인 |

Split 조건 적용으로 Contour segmentation이 세분화되어 Contour narrowing·Corner rounding·LER이 모두 개선됐고, 미세 패턴에서도 안정적인 contour control이 가능함을 확인했습니다.

## 증빙 자료
- [PBL 과제 발표자료 (PDF)](./lithography_pbl.pdf)
