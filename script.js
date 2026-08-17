function toggleMenu(){document.querySelector('.links').classList.toggle('show')}

function startQuiz(){
  const qs=[...document.querySelectorAll('.question')];
  const bar=document.querySelector('.progress i');
  const res=document.querySelector('.quizResult');
  const counter=document.querySelector('#questionCounter');
  const liveScore=document.querySelector('#liveScore');
  if(!qs.length || !res) return;
  let i=0,s=0,answered=false;
  function update(){qs.forEach((q,n)=>q.classList.toggle('active',n===i));if(counter) counter.textContent=`Question ${Math.min(i+1,qs.length)} of ${qs.length}`;if(liveScore) liveScore.textContent=`Score: ${s}`;if(bar) bar.style.width=((i)/qs.length*100)+'%'}
  qs.forEach(q=>q.querySelectorAll('.answers button').forEach(btn=>btn.addEventListener('click',()=>{if(answered)return;answered=true;const correct=btn.dataset.correct==='true';if(correct)s++;q.querySelectorAll('button').forEach(b=>b.disabled=true);btn.style.borderColor=correct?'#25cf78':'#ff4d4d';btn.style.background=correct?'#25cf7820':'#ff4d4d20';const correctBtn=q.querySelector('button[data-correct="true"]');if(!correct&&correctBtn){correctBtn.style.borderColor='#25cf78';correctBtn.style.background='#25cf7820'}if(liveScore)liveScore.textContent=`Score: ${s}`;setTimeout(()=>{answered=false;i++;if(i<qs.length)update();else{qs.forEach(q=>q.classList.remove('active'));if(bar)bar.style.width='100%';if(counter)counter.textContent='Quiz Complete';const pct=Math.round(s/qs.length*100);let title='Keep going! 💪',message='You have a good starting point. Targeted practice can help you improve further.';if(s>=9){title='Outstanding! 🏆';message='Excellent foundation. Keep challenging yourself and aim even higher.'}else if(s>=7){title='Great Work! 🔥';message='You have a strong foundation. A little targeted practice can push you further.'}else if(s>=5){title='Good Start! 📚';message='You understand several fundamentals. More structured practice will help strengthen the gaps.'}res.hidden=false;res.innerHTML=`<div class="score">${s}/${qs.length}</div><h2>${title}</h2><p><strong>${pct}%</strong> — ${message}</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px"><a class="btn gold" href="contact.html">Get a Personal Study Plan →</a><button class="btn" type="button" onclick="location.reload()">Retake Quiz</button></div>`}},550)}));
  update();
}

async function enquiry(e){
  e.preventDefault();
  const form=e.target;
  const status=document.getElementById('formStatus');
  const button=form.querySelector('button[type="submit"]');
  const name=form.name.value.trim();
  const studentClass=form.class.value;
  const phone=form.phone.value.trim();
  const message=form.message.value.trim();
  if(!name||!phone||!message){status.textContent='Please complete all required fields.';status.style.color='#ffb4b4';return}
  const body=`Name: ${name}\nClass: ${studentClass}\nPhone: ${phone}\nMessage: ${message}`;
  button.disabled=true;button.textContent='Sending enquiry...';status.textContent='Sending your enquiry securely to harishr4447@gmail.com...';status.style.color='#ffc400';
  try{
    const response=await fetch('https://formsubmit.co/ajax/harishr4447@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({name:name,class:studentClass,phone:phone,message:message,_subject:'New Harry Tutorials Enquiry - '+name,_template:'table'})});
    const data=await response.json().catch(()=>({}));
    if(!response.ok || data.success===false) throw new Error('Email service did not confirm delivery');
    status.innerHTML='✅ <strong>Enquiry sent successfully!</strong><br>Your enquiry has been submitted to <strong>harishr4447@gmail.com</strong>. WhatsApp is opening so you can send the same enquiry there too.';status.style.color='#25cf78';
    const wa=`https://wa.me/919964124447?text=${encodeURIComponent('Hi Harry Tutorials, I have an enquiry.\n\n'+body)}`;
    window.open(wa,'_blank','noopener');
    form.reset();
    button.textContent='Enquiry Sent ✓';
  }catch(err){
    status.innerHTML='❌ <strong>Email could not be confirmed.</strong><br>Please try again or use the WhatsApp button below. Your enquiry has NOT been marked as sent.';status.style.color='#ff6b6b';
    button.disabled=false;button.textContent='Send Enquiry →';
  }
}

document.addEventListener('DOMContentLoaded',()=>{if(document.querySelector('.question'))startQuiz();const form=document.getElementById('enquiryForm');if(form)form.addEventListener('submit',enquiry)});
