// السكريبت الأول
var script1 = document.createElement('script');
script1.src = "//pl26581353.profitableratecpm.com/e7/d2/67/e7d2670b713058131818a78c74dc100f.js";
script1.async = true;
script1.setAttribute('data-cfasync', 'false');
document.body.appendChild(script1);

// انشئ عنصر div لعرض الإعلان
var adDiv = document.createElement('div');
adDiv.id = 'advertisement'; // يمكنك تغيير هذا إلى الهوية أو الفئة التي تريدها

// قم بتخصيص نص الإعلان والمحتوى
adDiv.innerHTML = '<p>هذا هو الإعلان الخاص بنا!</p>';

// أضف العنصر إلى صفحة الويب
document.body.appendChild(adDiv);
