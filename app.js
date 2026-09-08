const form=document.querySelector("#trialForm");
const success=document.querySelector("#success");
if(form){form.addEventListener("submit",e=>{e.preventDefault();success.hidden=false;form.reset();});}

const menu=document.querySelector(".hamburger"),nav=document.querySelector(".site-header nav");
if(menu&&nav){menu.addEventListener("click",()=>{nav.style.display=nav.style.display==="flex"?"none":"flex";nav.style.position="absolute";nav.style.top="64px";nav.style.left="0";nav.style.right="0";nav.style.padding="20px";nav.style.background="#0b0c0c";nav.style.flexDirection="column";});}

document.querySelector(".wa")?.addEventListener("click",()=>window.open("https://wa.me/","_blank"));

// THF BMI Calculator — adult BMI screening, metric + imperial
const bmiForm=document.querySelector("#bmiForm");
if(bmiForm){
  const metricFields=document.querySelector("#metricFields");
  const imperialFields=document.querySelector("#imperialFields");
  const unitButtons=document.querySelectorAll(".bmi-unit-toggle button");
  const bmiValue=document.querySelector("#bmiValue");
  const bmiStatus=document.querySelector("#bmiStatus");
  const bmiError=document.querySelector("#bmiError");
  const scaleDot=document.querySelector(".bmi-scale span");

  let unit="metric";
  const setUnit=(next)=>{
    unit=next;
    unitButtons.forEach(btn=>btn.classList.toggle("active",btn.dataset.unit===unit));
    metricFields.hidden=unit!=="metric";
    imperialFields.hidden=unit!=="imperial";
    bmiError.hidden=true;
  };
  unitButtons.forEach(btn=>btn.addEventListener("click",()=>setUnit(btn.dataset.unit)));

  const getCategory=(bmi)=>{
    if(bmi<18.5) return {label:"UNDERWEIGHT",pos:12};
    if(bmi<25) return {label:"HEALTHY WEIGHT",pos:37};
    if(bmi<30) return {label:"OVERWEIGHT",pos:62};
    return {label:"OBESITY",pos:87};
  };

  bmiForm.addEventListener("submit",e=>{
    e.preventDefault();
    let heightM,weightKg;
    if(unit==="metric"){
      const h=Number(document.querySelector("#bmiHeightCm").value);
      const w=Number(document.querySelector("#bmiWeightKg").value);
      if(!h||!w||h<91||h>275||w<25||w>454){bmiError.hidden=false;return;}
      heightM=h/100; weightKg=w;
    }else{
      const ft=Number(document.querySelector("#bmiFeet").value);
      const inch=Number(document.querySelector("#bmiInches").value||0);
      const lb=Number(document.querySelector("#bmiWeightLb").value);
      const totalIn=ft*12+inch;
      if(!ft||!lb||totalIn<36||totalIn>108||lb<55||lb>1000){bmiError.hidden=false;return;}
      heightM=totalIn*0.0254; weightKg=lb*0.45359237;
    }
    const bmi=weightKg/(heightM*heightM);
    const category=getCategory(bmi);
    bmiValue.textContent=bmi.toFixed(1);
    bmiStatus.textContent=category.label;
    scaleDot.style.left=`${category.pos}%`;
    bmiError.hidden=true;
  });
}
