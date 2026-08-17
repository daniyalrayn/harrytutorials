function toggleMenu(){document.querySelector('.links').classList.toggle('show')}

function startQuiz(){
  const qs=[...document.querySelectorAll('.question')];
  const bar=document.querySelector('.progress i');
  const res=document.querySelector('.quizResult');
  const counter=document.querySelector('#questionCounter');
  const liveScore=document.querySelector('#liveScore');
  if(!qs.length || !res) return;
  let i=0,s=0,answered=false;
  function update(){qs.forEach((q,n)=>q.classList.toggle('active',n===i));if(counter) counter.textContent=`Question ${Math.min(i+1,qs.length)} of ${qs.length}`;if(liveScore) liveScore.textContent=`Score: ${s}`;if(bar) bar.style.width=((i)/qs.length*100)+'%';}
  qs.forEach(q=>q.querySelectorAll('.answers button').forEach(btn=>btn.addEventListener('click',()=>{if(answered)return;answered=true;const correct=btn.dataset.correct==='true';if(correct)s++;q.querySelectorAll('button').forEach(b=>b.disabled=true);btn.style.borderColor=correct?'#25cf78':'#ff4d4d';btn.style.background=correct?'#25cf7820':'#ff4d4d20';const correctBtn=q.querySelector('button[data-correct="true"]');if(!correct&&correctBtn){correctBtn.style.borderColor='#25cf78';correctBtn.style.background='#25cf7820';}if(liveScore)liveScore.textContent=`Score: ${s}`;setTimeout(()=>{answered=false;i++;if(i<qs.length)update();else{qs.forEach(q=>q.classList.remove('active'));if(bar)bar.style.width='100%';if(counter)counter.textContent='Quiz Complete';const pct=Math.round((s/qs.length)*100);let title='Keep going! 💪',message='You have a good starting point. Targeted practice can help you improve further.';if(s>=9){title='Outstanding! 🏆';message='Excellent foundation. Keep challenging yourself and aim even higher.'}else if(s>=7){title='Great Work! 🔥';message='You have a strong foundation. A little targeted practice can push you further.'}else if(s>=5){title='Good Start! 📚';message='You understand several fundamentals. More structured practice will help strengthen the gaps.'}res.hidden=false;res.innerHTML=`<div class="score">${s}/${qs.length}</div><h2>${title}</h2><p><strong>${pct}%</strong> — ${message}</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px"><a class="btn gold" href="contact.html">Get a Personal Study Plan →</a><button class="btn" type="button" onclick="location.reload()">Retake Quiz</button></div>`;}},550);})));update();

async function enquiry(e){
  e.preventDefault();
  const f=e.target,button=f.querySelector('button[type="submit"]'),status=document.getElementById('formStatus');
  const name=f.name.value.trim(),studentClass=f.class.value,phone=f.phone.value.trim(),message=f.message.value.trim();
  const subject=`Harry Tutorials Enquiry - ${name}`;
  const enquiryText=`New Harry Tutorials enquiry\n\nName: ${name}\nClass: ${studentClass}\nPhone: ${phone}\nMessage: ${message}`;
  const whatsappUrl=`https://wa.me/919964124447?text=${encodeURIComponent('Hi Harry Tutorials, I have a new enquiry.\n\n'+enquiryText)}`;
  button.disabled=true;button.textContent='Sending...';status.textContent='Sending your enquiry...';
  try{
    const response=await fetch('https://formsubmit.co/ajax/harishr4447@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({name:name,class:studentClass,phone:phone,message:message,_subject:subject,_captcha:'false'})});
    if(!response.ok)throw new Error('Email service error');
    window.open(whatsappUrl,'_blank','noopener');
    status.textContent='✓ Enquiry sent to email. WhatsApp has also been opened with the same enquiry ready to send.';status.style.color='#25cf78';f.reset();
  }catch(err){
    window.open('mailto:harishr4447@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(enquiryText),'_blank');
    window.open(whatsappUrl,'_blank','noopener');
    status.textContent='Email and WhatsApp have been opened with your enquiry. Please press Send if prompted.';status.style.color='#ffc400';
  }finally{button.disabled=false;button.textContent='Send Enquiry →';}
}

document.addEventListener('DOMContentLoaded',()=>{if(document.querySelector('.question')) startQuiz();if(document.querySelector('#enquiryForm')) document.querySelector('#enquiryForm').addEventListener('submit',enquiry);});
