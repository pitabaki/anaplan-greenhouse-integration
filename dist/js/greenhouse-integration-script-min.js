jQuery(document).ready(function(e){var t=function(e,t,a,n){this.title=e,this.categoryArr=t,this.appendID=a,this.markup=n},a=function(e,t){this.query=e,this.amount=t},n=[],r=window.location.href;if(r.indexOf("/jobs/")>0){var o=r.substr(r.indexOf("?id=")+4,r.length);if(console.log("currentJobID = "+o),o.length>1){e("#job-background").css("opacity",0);var i="https://boards-api.greenhouse.io/v1/boards/anaplan/jobs/"+o;e.getJSON(i,function(t){var a=t.content.replace(/&lt;/gi,"<");switch(a=(a=a.replace(/&gt;/gi,">")).replace(/&quot;/gi,'"'),e("#job-title").find("h1").html(t.title),e("#job-title-content").find("h3").html(t.title),e("#job-location").find("h3").html(t.location.name.trim()),e("#job-location-content").find("h5").html(t.location.name.trim()),e("#job-content").html(a),e("#job-greenhouse-href").attr("href",t.absolute_url),t.departments[0].name){case"Engineering":case"IT":case"Technical Operations":n="/careers/wp-content/uploads/sites/23/2018/12/solution_IT_feature.jpg";break;case"Field Sales":case"Inside Sales":case"Pre-Sales":case"Marketing":n="/careers/wp-content/uploads/sites/23/2018/12/solution_sales_feature.jpg";break;default:var n="/careers/wp-content/uploads/sites/23/2018/12/solution_supplyChain_feature.jpg"}e("#job-background").css({"background-image":"url("+n+")"}),setTimeout(function(){e("#job-background").css("opacity",1)},250);var r=t.departments[0].name;e.getJSON("https://boards-api.greenhouse.io/v1/boards/anaplan/departments/",function(t){console.log(t.departments);e.each(t.departments,function(a,n){var i=[],l="<div class='job-related--row'><p id='job-related--title' class='job-related--title'><a href='${job-href}'>${job-title}</a></p><p id='job-related--location' class='job-related--location'>${job-location}</p></div>",s=function(e){var t="https://anaplan.staging.wpengine.com/careers/jobs/?id="+e.id,a=l.replace(/\$\{job-title\}/gi,e.title);return a=(a=a.replace(/\$\{job-location\}/gi,e.location.name)).replace(/\$\{job-href\}/gi,t)};if(t.departments[a].name===r){var c=function(a,n){i.length<2&&n<t.departments.length?(e.each(t.departments[n].jobs,function(e,t){if(t.id!==parseInt(o)&&e<=5){var a=s(t);i.push(a)}}),c(a,++n)):i.length<2&&n===t.departments.length&&(n=a,e.each(t.departments[n].jobs,function(e,t){if(t.id!==parseInt(o)&&e<=5){var a=s(t);i.push(a)}}),c(a,++n))};c(0,a),e("#job-related-attach").html(i.join(""))}})})})}}else-1!==r.indexOf("/engineering")?r+="?filter=true;category=Engineering":-1!==r.indexOf("/sales")&&(r+="?filter=true;category=Field%20Sales"),e.getJSON("https://boards-api.greenhouse.io/v1/boards/anaplan/departments/",function(r){var o=0,i=0,l=0,s=[],c=[],u=[],p=[],h=[],g="<li><span class='item-title-checkbox'><input name='${value}' value='${value}' type='checkbox' /><label>${value}</label></span><span class='item-amount'><span class='item-amount-container'>${amount}</span></span></li>",d="<div data-category='${category}' data-city='${city}' data-country='${country}' class='job-list-row job-list-row--active job-list-row--filtered'><div class='job-list-column job-list-column--large'><p><a href='${job-href}'>${job-title}</a></p></div><div class='job-list-column job-list-column--small'><p>${category}</p></div><div class='job-list-column job-list-column--small'><p>${location}</p></div></div>",b=function(e,t,n){var r=e;if(t.length<1){var o=new a(r,1);t.push(o)}else if(n<t.length){if(r===t[n].query)return t[n].amount+=1,!1;b(e,t,++n)}else{o=new a(r,1);t.push(o)}};e.each(r.departments,function(e,t){if(t.jobs.length>0&&"Template"!==t.name){var n=new a(t.name,t.jobs.length);p.push(n);var r=t.jobs.map(function(e,t){var a=e.location.name.split(","),r="https://anaplan.staging.wpengine.com/careers/jobs/?id="+e.id;if(a.length>1){var o=a[0].trim().replace(/(\s-)|(-\s)/gi,"-"),i=a[1].trim().replace(/(\s-)|(-\s)/gi,"-");b(o,u,0),b(i,c,0),l=(l=d.replace(/\$\{city\}/gi,o)).replace(/\$\{country\}/gi,i)}else{i=a[0].trim().replace(/(\s-)|(-\s)/gi,"-");b(a[0],c,0);var l=d.replace(/\$\{country\}/gi,i)}return(l=(l=(l=l.replace(/\$\{job-href\}/gi,r)).replace(/\$\{job-title\}/gi,e.title)).replace(/\$\{location\}/gi,e.location.name.trim())).replace(/\$\{category\}/gi,n.query)});h.push(r.join(""))}switch(o+=t.jobs.length,t.name){case"Engineering":i+=t.jobs.length;var g=new a("engineering",i);s.push(g);break;case"Field Sales":l+=t.jobs.length;g=new a("sales",l);s.push(g)}}),e("<div/>",{html:h.join("")}).appendTo("#job-attach");var f=function(e){return e.sort(function(e,t){var a=e.query.toUpperCase(),n=t.query.toUpperCase();return a<n?-1:a>n?1:0})};c=f(c),u=f(u);var m=new t("Category",p,"category",g),j=new t("Country",c,"country",g),y=new t("City",u,"city",g);n.push(m),n.push(j),n.push(y);var v=new a("all",o);s.push(v),e.each(s,function(t,a){var n;e('*[data-job-type="'+(n=a).query+'"]').html(n.amount)});var w=function(t,a){if(a<t.length){var n=t[a].categoryArr,r=t[a].markup,o=n.map(function(e,t){return r.replace(/\$\{value\}/gi,e.query).replace(/\$\{amount\}/gi,e.amount)});e("<ul/>",{html:o.join("")}).appendTo("#"+t[a].appendID),w(t,++a)}};w(n,0)});var l=function(){var t=[],a=function(e){this.query=e,this.arr=[]},n=function(e,t,a){t<e.length&&(e.eq(t).hasClass(a)||(e.eq(t).removeClass("job-list-row--active"),e.eq(t).removeClass("job-list-row--filtered")),n(e,++t,a))},r=function(e,t,a){t<e.length&&(e.eq(t).hasClass("job-list-row--title")||(e.eq(t).addClass("job-list-row--active"),e.eq(t).addClass("job-list-row--filtered")),r(e,++t,a))},o=e("*[type='checkbox']"),i=function(e,a,n){a<e.length&&(e[a].query.trim()===n.query.trim()?e[a].arr.push(n.arr[0]):a+1===e.length&&e[a].query.trim()!==n.query.trim()?t.push(n):i(e,++a,n))},l=function(e,n){if(n<e.length){if(!0===e.eq(n).prop("checked")){var r,o=e.eq(n).attr("value").trim(),s=e.eq(n).parents(".item-list").attr("id").trim();if(t.length>0)(r=new a(s)).arr.push(o),i(t,0,r);else(r=new a(s)).arr.push(o),t.push(r)}l(e,++n)}};n(e(".job-list-row"),0,"job-list-row--title"),l(o,0);var s=function(t,a,n){a<t.length&&(console.log("arr[num] ="+t[a]),e("*[data-"+n+"='"+t[a]+"']").addClass("job-list-row--filtered"),s(t,++a,n))},c=function(t,a,n){a<t.length&&(e("*[data-"+n+"='"+t[a]+"']").addClass("job-list-row--active"),c(t,++a,n))},u=function(e,t){t<e.length&&(0===t&&"category"===e[t].query&&1!==e.length?c(e[t].arr,0,e[t].query):0===t&&"category"===e[t].query&&1===e.length?(c(e[t].arr,0,e[t].query),s(e[t].arr,0,e[t].query)):0!==t||"city"!==e[t].query&&"country"!==e[t].query||1===e.length?t>0&&("city"===e[t].query||"country"===e[t].query)?s(e[t].arr,0,e[t].query):0===t&&1===e.length&&(c(e[t].arr,0,e[t].query),s(e[t].arr,0,e[t].query)):c(e[t].arr,0,e[t].query),u(e,++t))};console.log("checkedArr.length = "+t.length),0===t.length?(n(e(".job-list-row"),0,"job-list-row--title"),r(e(".job-list-row"),0,"job-list-row--title")):u(t,0),console.log(t)};e(document).on("click","*[type='checkbox']",function(e){l()});var s=!1,c=function(e,t){if(t<e.length){var a=e[t].substr(e[t].indexOf("=")+1,e[t].length).split("&");u(a,0),c(e,++t)}},u=function(t,a){a<t.length&&(console.log(t[a].replace(/%20/gi," ")),e("*[value='"+t[a].replace(/%20/gi," ")+"']").eq(0).prop("checked",!0),u(t,++a))},p=function(t){!1===s&&-1!==t.indexOf("?filter=true;")?(e("*[type='checkbox']").length>0?s=!0:pageload=!1,setTimeout(function(){p(t)},500)):!0===s&&-1!==t.indexOf("?filter=true;")&&function(e){if(-1!==e.indexOf("?filter=true;")){var t=e.substr(e.indexOf("?filter=true;")+13,e.length),a=t.substr(0,t.length).split(";");c(a,0),l()}}(t)};p(r)});