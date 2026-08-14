function toggleMenu(){document.querySelector('.links').classList.toggle('show')}

function startQuiz(){
  const qs=[...document.querySelectorAll('.question')];
  const bar=document.querySelector('.progress i');
  const res=document.querySelector('.quizResult');
  const counter=document.querySelector('#questionCounter');
  const liveScore=document.querySelector('#liveScore');
  if(!qs.length || !res) return;
  let i=0,s=0,answered=false;

  function update(){
    qs.forEach((q,n)=>q.classList.toggle('active',n===i));
    if(counter) counter.textContent=`Question ${Math.min(i+1,qs.length)} of ${qs.length}`;
    if(liveScore) liveScore.textContent=`Score: ${s}`;
    if(bar) bar.style.width=((i)/qs.length*100)+'%';
  }

  qs.forEach(q=>{
    q.querySelectorAll('.answers button').forEach(btn=>{
      btn.addEventListener('click',()=>{
        if(answered) return;
        answered=true;
        const correct=btn.dataset.correct==='true';
        if(correct) s++;
        q.querySelectorAll('button').forEach(b=>b.disabled=true);
        btn.style.borderColor=correct?'#25cf78':'#ff4d4d';
        btn.style.background=correct?'#25cf7820':'#ff4d4d20';
        const correctBtn=q.querySelector('button[data-correct="true"]');
        if(!correct && correctBtn){correctBtn.style.borderColor='#25cf78';correctBtn.style.background='#25cf7820';}
        if(liveScore) liveScore.textContent=`Score: ${s}`;
        setTimeout(()=>{
          answered=false;
          i++;
          if(i<qs.length){update();}
          else{
            qs.forEach(q=>q.classList.remove('active'));
            if(bar) bar.style.width='100%';
            if(counter) counter.textContent='Quiz Complete';
            const pct=Math.round((s/qs.length)*100);
            let title='Keep going! 💪',message='You have a good starting point. Targeted practice can help you improve further.';
            if(s>=9){title='Outstanding! 🏆';message='Excellent foundation. Keep challenging yourself and aim even higher.';}
            else if(s>=7){title='Great Work! 🔥';message='You have a strong foundation. A little targeted practice can push you further.';}
            else if(s>=5){title='Good Start! 📚';message='You understand several fundamentals. More structured practice will help strengthen the gaps.';}
            res.hidden=false;
            res.innerHTML=`<div class="score">${s}/${qs.length}</div><h2>${title}</h2><p><strong>${pct}%</strong> — ${message}</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px"><a class="btn gold" href="contact.html">Get a Personal Study Plan →</a><button class="btn" type="button" onclick="location.reload()">Retake Quiz</button></div>`;
          }
        },550);
      });
    });
  });
  update();
}

function enquiry(e){e.preventDefault();const f=e.target;const sub=encodeURIComponent('Harry Tutorials Enquiry - '+f.name.value);const body=encodeURIComponent(`Name: ${f.name.value}\nClass: ${f.class.value}\nPhone: ${f.phone.value}\nMessage: ${f.message.value}`);location.href=`mailto:harishr4447@gmail.com?subject=${sub}&body=${body}`}

document.addEventListener('DOMContentLoaded',()=>{if(document.querySelector('.question')) startQuiz();});
