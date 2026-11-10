import html,json
from data import P,B
for t,o,r,d,c,s in P: assert len(c)<=1000,(t,len(c))
md="# 주요 경험·활동 입력용 (복붙)\n\n각 칸 내용을 그대로 복사해 붙여넣으세요. 활동 내용은 모두 1000자 이내입니다. `※` 표시된 기간은 확인 후 수정하세요.\n"
for i,(t,o,r,d,c,s) in enumerate(P,1):
    md+=f"\n---\n\n## {i}. {t}\n\n**소속조직명**\n```\n{o}\n```\n**역할**\n```\n{r}\n```\n**활동 기간**\n```\n{d}\n```\n**활동 내용** ({len(c)}/1000자)\n```\n{c}\n```\n**포트폴리오 주소**\n```\n{B+s}\n```\n"
open("활동입력_복붙용.md","w").write(md)
def f(label,val,ta=False,extra=""):
    e=html.escape(val)
    inp=f'<textarea readonly rows="9">{e}</textarea>' if ta else f'<input readonly value="{e}">'
    return f'<div class="f"><label>{label}{extra}<button onclick="cp(this)">복사</button></label>{inp}</div>'
cards=""
for i,(t,o,r,d,c,s) in enumerate(P,1):
    cards+=f'<section><h2>{i}. {html.escape(t)}</h2>'+f("소속조직명",o)+f("역할",r)+f("활동 기간",d)+f("활동 내용",c,True,f' <small>{len(c)}/1000자</small>')+f("포트폴리오 주소",B+s)+'</section>'
open("index.html","w").write(f'''<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>활동 입력 복붙용</title>
<style>body{{font-family:system-ui,sans-serif;max-width:760px;margin:0 auto;padding:16px;background:#f6f6f4;color:#222}}section{{background:#fff;border-radius:14px;padding:16px;margin:16px 0}}h2{{font-size:17px}}label{{display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:14px;margin:12px 0 6px}}small{{font-weight:400;color:#777}}input,textarea{{width:100%;box-sizing:border-box;border:1px solid #bbb;border-radius:8px;padding:10px;font:inherit;font-size:14px}}button{{border:0;background:#1f6b4f;color:#fff;border-radius:6px;padding:5px 12px;cursor:pointer}}</style>
<h1>주요 경험·활동 복붙용</h1><p>각 칸의 [복사] 버튼을 눌러 붙여넣으세요. ※ 표시된 기간은 확인 후 수정.</p>{cards}
<script>function cp(b){{var e=b.closest('.f').querySelector('input,textarea');navigator.clipboard.writeText(e.value);b.textContent='복사됨';setTimeout(function(){{b.textContent='복사'}},1200)}}</script></html>''')
print([len(p[4]) for p in P])
