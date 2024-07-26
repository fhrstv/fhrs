// السكريبت الأول
var script1 = document.createElement('script');
script1.src = "//pl21174538.toprevenuegate.com/b648da115a008d9509a7fac590057c1b/invoke.js";
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
