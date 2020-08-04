jQuery(document).ready(function(e){var t=window.location.href,r=(t=t.substr(0,t.indexOf(".com")+4))+"/jobs/?id=",a=function(e,t,r,a){this.title=e,this.categoryArr=t,this.appendID=r,this.markup=a},o=function(e,t){this.query=e,this.amount=t},n=[],i=function(t,r){var a=e(r).length,o=e(t).length;a===o?e("#job-list-total").html("<p>Displaying ${amount} entries".replace(/\$\{amount\}/gi,"<strong>all</strong>")):e("#job-list-total").html("<p>Displaying ${amount} entries".replace(/\$\{amount\}/gi,"<strong>"+a+"</strong> of <strong>"+o+"</strong>"))},l=window.location.href;if(l.indexOf("/jobs/")>0){var s=l.substr(l.indexOf("?id=")+4,l.length);if(-1!==l.indexOf("?id=")){e("#job-background").css("opacity",0);var c="https://boards-api.greenhouse.io/v1/boards/anaplan/jobs/"+s;e.ajax({url:c}).done(function(t){console.log(t.content);var a=t.content.replace(/&lt;/gi,"<");a=(a=(a=(a=a.replace(/&gt;/gi,">")).replace(/&quot;/gi,'"')).replace(/\&amp\;nbsp\;/gi," ")).replace(/\&amp\;amp\;/gi,"&"),console.log(a),e("#job-title").find("h1").html(t.title),e("#job-title-content").find("h3").html(t.title),e("#job-location").find("h3").html(t.location.name.trim()),e("#job-location-content").find("h5").html(t.location.name.trim()),e("#job-content").html(a),e("#job-greenhouse-href").attr("href",t.absolute_url),String.prototype.tagRemoval=function(){var e=this.replace(/(\<strong\>.*\<\/strong\>)|(\<strong\>)|(\<\/strong\>)/gi,"");return e=e.replace(/(\<ul\>)|(\<\/ul\>)|(\<li\>)|(\<\/li\>)|(\<p\>)|(\<\/p\>)|(\<h1\>)|(\<h2\>)|(\<h3\>)|(\<\/h3\>)|(\<\/h1\>)|(\<\/h2\>)/gi,"")},String.prototype.trunc=function(e,t){var r=this.length>e,a=r?this.substr(0,e-1):this;return a=t&&r?a.substr(0,a.lastIndexOf(" ")):a+" ..."};var o=a.tagRemoval().trunc(240,!1);if(o.length>1){e("meta[name=description]").remove();var n=document.createElement("meta");n.name="description",n.content=o,e("head").append(n);var i=function(e,t){e.length>t&&i(e,++t)};i(e("meta"),0)}var l="/wp-content/uploads/2018/12/solution_IT_feature.jpg",c="/wp-content/uploads/2018/12/solution_sales_feature.jpg";switch(t.departments[0].name){case"Engineering":case"IT":case"Technical Operations":u=l;break;case"Field Sales":case"Inside Sales":case"Sales Development":case"Pre-Sales":case"Marketing":u=c;break;default:var u="/wp-content/uploads/2018/12/solution_supplyChain_feature.jpg"}e("#job-background").css({"background-image":"url("+u+")"}),setTimeout(function(){e("#job-background").css("opacity",1)},250);var p=t.departments[0].name;e.getJSON("https://boards-api.greenhouse.io/v1/boards/anaplan/departments/",function(t){e.each(t.departments,function(a,o){var n=[],i="<div class='job-related--row'><p id='job-related--title' class='job-related--title'><a href='${job-href}'>${job-title}</a></p><p id='job-related--location' class='job-related--location'>${job-location}</p></div>",l=function(e){var t=r+e.id,a=i.replace(/\$\{job-title\}/gi,e.title);return a=(a=a.replace(/\$\{job-location\}/gi,e.location.name)).replace(/\$\{job-href\}/gi,t)};if(t.departments[a].name===p){var c=function(r,a){n.length<2&&a<t.departments.length?(e.each(t.departments[a].jobs,function(e,t){if(t.id!==parseInt(s)&&e<=5){var r=l(t);n.push(r)}}),c(r,++a)):n.length<2&&a===t.departments.length&&(a=r,e.each(t.departments[a].jobs,function(e,t){if(t.id!==parseInt(s)&&e<=5){var r=l(t);n.push(r)}}),c(r,++a))};c(0,a),e("#job-related-attach").html(n.join(""))}})})}).fail(function(){window.location.href=window.location.href.substr(0,window.location.href.indexOf("/jobs"))+"/job-listing/"})}else window.location.href=window.location.href.substr(0,window.location.href.indexOf("/jobs"))+"/job-listing/"}else-1!==l.indexOf("/engineering")?l+="?filter=true;category=Eng%20Ops&Cloud%20Platform%20Engineering&Experience%20and%20Applications%20Engineering&Product%20Management%20and%20User%20Experience&Product,%20UX,%20and%20Engineering&Planning%20AI":-1!==l.indexOf("/sales")&&(l+="?filter=true;category=Field%20Sales&Pre-Sales&Sales%20Development"),e.getJSON("https://boards-api.greenhouse.io/v1/boards/anaplan/departments/",function(t){var l=0,s=0,c=0,u=0,p=0,h=0,f=[],d=[],g=[],b=[],m=[],j=[],w="<li><span class='item-title-checkbox'><input name='${value}' value='${value}' type='checkbox' /><label>${display}</label></span><span class='item-amount'><span class='item-amount-container'>${amount}</span></span></li>",v="<div data-search='${search}' data-category='${category}' data-city='${city}' data-country='${country}' data-title='${job-data-title}' class='job-list-row job-list-row--active job-list-row--filtered'><div class='job-list-column job-list-column--large'><p><a href='${job-href}'>${job-title}</a></p></div><div class='job-list-column job-list-column--small'><p>${category}</p></div><div class='job-list-column job-list-column--small'><p>${location}</p></div></div>",y=function(e,t,r){var a=e;if(t.length<1){var n=new o(a,1);t.push(n)}else if(r<t.length){if(a===t[r].query)return t[r].amount+=1,!1;y(e,t,++r)}else{n=new o(a,1);t.push(n)}};e.each(t.departments,function(t,a){if(a.jobs.length>0&&"Template"!==a.name){var n=new o(a.name.replace("Inside Sales","Sales Development"),a.jobs.length);m.push(n),e.each(a.jobs,function(e,t){var r=new o(t.title,1);b.push(r)});var i=a.jobs.map(function(e,t){var a=e.location.name.split(","),o=r+e.id,i=e.location.name.trim().toLowerCase()+","+e.title.toLowerCase();if(a.length>1){var l=a[0].trim().replace(/(\s-)|(-\s)/gi,"-"),s=a[1].trim().replace(/(\s-)|(-\s)/gi,"-");y(l,g,0),y(s,d,0),c=(c=v.replace(/\$\{city\}/gi,l.toLowerCase())).replace(/\$\{country\}/gi,s.toLowerCase())}else{s=a[0].trim().replace(/(\s-)|(-\s)/gi,"-");y(a[0],d,0);var c=v.replace(/\$\{country\}/gi,s.toLowerCase())}return(c=(c=(c=(c=(c=c.replace(/\$\{job-href\}/gi,o)).replace(/\$\{job-title\}/gi,e.title)).replace(/\$\{job-data-title\}/gi,e.title.toLowerCase())).replace(/\$\{location\}/gi,e.location.name.trim())).replace(/\$\{search\}/gi,i+n.query.trim().toLowerCase())).replace(/\$\{category\}/gi,n.query.trim().toLowerCase())});j.push(i.join(""))}l+=a.jobs.length;if(console.log("val.name = "+a.name),/engineering|eng|experience|ai/gi.test(a.name)){s+=a.jobs.length;var w=new o("engineering",s);f.push(w)}else if(/sales/gi.test(a.name)){c+=a.jobs.length;w=new o("sales",c);f.push(w)}if("Customer Success"===a.name.trim()){h+=a.jobs.length;w=new o("customer success",h);f.push(w)}else if("Pre-Sales"===a.name.trim()){u+=a.jobs.length;w=new o("pre-sales",u);f.push(w)}else if("Field Sales"===a.name.trim()){p+=a.jobs.length;w=new o("field sales",p);f.push(w)}}),e("<div/>",{html:j.join("")}).appendTo("#job-attach");var q=function(e){return e.sort(function(e,t){var r=e.query.toUpperCase(),a=t.query.toUpperCase();return r<a?-1:r>a?1:0})};d=q(d),g=q(g);var $=new a("Category",m,"category",w),x=new a("Country",d,"country",w),C=new a("City",g,"city",w);new a("Title",b,"title","<li style='display:none;'><span class='item-title-checkbox'><input name='${value}' value='${value}' type='checkbox' /><label>${display}</label></span><span class='item-amount'><span class='item-amount-container'>${amount}</span></span></li>");n.push($),n.push(x),n.push(C);var k=new o("all",l);f.push(k),e.each(f,function(t,r){var a;e('*[data-job-type="'+(a=r).query+'"]').html(a.amount)});var O=function(t,r){if(r<t.length){var a=t[r].categoryArr,o=t[r].markup,n=a.map(function(e,t){var r=o.replace(/\$\{value\}/gi,e.query.toLowerCase());return(r=r.replace(/\$\{display\}/gi,e.query)).replace(/\$\{amount\}/gi,e.amount)});e("<ul/>",{html:n.join("")}).appendTo("#"+t[r].appendID),O(t,++r)}};O(n,0),i(".job-list-row",".job-list-row--active.job-list-row--filtered")});var u=function(){var t=window.location.href;-1===window.location.href.indexOf("?search")&&e(".job-list-row").each(function(t,r){e(r).removeClass("job-list-row--search-exempt")});var r=[],a=[],o=function(e){this.query=e,this.arr=[]},n=function(e,t,r){t<e.length&&(e.eq(t).hasClass(r)||(e.eq(t).removeClass("job-list-row--active"),e.eq(t).removeClass("job-list-row--filtered")),n(e,++t,r))},l=function(e,t,r){t<e.length&&(e.eq(t).hasClass(r)||(e.eq(t).addClass("job-list-row--active"),e.eq(t).addClass("job-list-row--filtered")),l(e,++t,r))},s=e("*[type='checkbox']"),c=function(e,t,a){t<e.length&&(e[t].query.trim()===a.query.trim()?e[t].arr.push(a.arr[0]):t+1===e.length&&e[t].query.trim()!==a.query.trim()?r.push(a):c(e,++t,a))},u=function(e,t){if(t<e.length){if(!0===e.eq(t).prop("checked")&&void 0===e.eq(t).attr("id")){var a,n=e.eq(t).attr("value").trim(),i=e.eq(t).parents(".item-list").attr("id").trim();if(r.length>0)(a=new o(i)).arr.push(n),c(r,0,a);else(a=new o(i)).arr.push(n),r.push(a)}u(e,++t)}};n(e(".job-list-row"),0,"job-list-row--title"),u(s,0);var p=function(e,t,r){if(t<e.length){var o="<span class='job-filter-button job-filter-button--${color}' data-${query}='${filter}'>${filter} <span class='job-filter-button--delete'>x</span></span>";o=(o=(o="category"===r?o.replace(/\$\{color\}/gi,"blue"):"search"===r?o.replace(/\$\{color\}/gi,"grey"):o.replace(/\$\{color\}/gi,"green")).replace(/\$\{filter\}/gi,e[t])).replace(/\$\{query\}/gi,r),a.push(o),p(e,++t,r)}},h=function(t,r,a){r<t.length&&(e("*[data-"+a+"='"+t[r]+"']").each(function(t,r){e(r).eq(0).hasClass("job-list-row--search-exempt")||e(r).eq(0).addClass("job-list-row--filtered")}),h(t,++r,a))},f=function(t,r,a){r<t.length&&(e("*[data-"+a+"='"+t[r]+"']").each(function(t,r){e(r).eq(0).hasClass("job-list-row--search-exempt")||e(r).eq(0).addClass("job-list-row--active")}),f(t,++r,a))},d=function(t,r){r<t.length&&(0===r&&1!==t.length?(f(t[r].arr,0,t[r].query),p(t[r].arr,0,t[r].query)):0===r&&"category"===t[r].query&&1===t.length?(f(t[r].arr,0,t[r].query),h(t[r].arr,0,t[r].query),p(t[r].arr,0,t[r].query)):r>0?(h(t[r].arr,0,t[r].query),p(t[r].arr,0,t[r].query)):0===r&&1===t.length&&(f(t[r].arr,0,t[r].query),h(t[r].arr,0,t[r].query),p(t[r].arr,0,t[r].query)),d(t,++r)),e("#job-filter-buttons").html(a.join(""))};0===r.length&&-1===t.indexOf("?search")?(n(e(".job-list-row"),0,"job-list-row--title"),l(e(".job-list-row"),0,"job-list-row--title"),e("#job-filter-buttons").html("")):-1===t.indexOf("?search")?d(r,0):b(t),i(".job-list-row",".job-list-row--active.job-list-row--filtered")},p=function(t){var r=[],a=[],o=e("*[type='checkbox']"),n=function(e){this.query=e,this.arr=[]},l=function(e,t,a){t<e.length&&(e[t].query.trim()===a.query.trim()?e[t].arr.push(a.arr[0]):t+1===e.length&&e[t].query.trim()!==a.query.trim()?r.push(a):l(e,++t,a))},s=function(e,t){if(t<e.length){if(!0===e.eq(t).prop("checked")&&void 0===e.eq(t).attr("id")){var a,o=e.eq(t).attr("value").trim(),i=e.eq(t).parents(".item-list").attr("id").trim();if(r.length>0)(a=new n(i)).arr.push(o),l(r,0,a);else(a=new n(i)).arr.push(o),r.push(a)}s(e,++t)}},c=function(e,t,r){t<e.length&&(e.eq(t).hasClass(r)||e.eq(t).hasClass("job-list-row--search-exempt")||(e.eq(t).removeClass("job-list-row--active"),e.eq(t).removeClass("job-list-row--filtered")),c(e,++t,r))},u=function(e,t,r){t<e.length&&(e.eq(t).hasClass(r)||e.eq(t).hasClass("job-list-row--search-exempt")||(e.eq(t).addClass("job-list-row--active"),e.eq(t).addClass("job-list-row--filtered")),u(e,++t,r))};c(e(".job-list-row"),0,"job-list-row--title"),s(o,0);var p,h=function(e,t,r){var o="<span class='job-filter-button job-filter-button--${color}' data-${query}='${filter}'>${filter} <span class='job-filter-button--delete'>x</span></span>";o="category"===r?o.replace(/\$\{color\}/gi,"blue"):"search"===r?o.replace(/\$\{color\}/gi,"grey"):o.replace(/\$\{color\}/gi,"green"),t<e.length&&"object"==typeof e?(o=(o=o.replace(/\$\{filter\}/gi,e[t])).replace(/\$\{query\}/gi,r),a.push(o),h(e,++t,r)):"string"==typeof e&&(o=(o=o.replace(/\$\{filter\}/gi,e)).replace(/\$\{query\}/gi,r),a.push(o))},f=function(t,r,a){r<t.length&&(e("*[data-"+a+"='"+t[r]+"']").each(function(t,r){e(r).eq(0).hasClass("job-list-row--search-exempt")||e(r).eq(0).addClass("job-list-row--filtered")}),f(t,++r,a))},d=function(t,r,a){r<t.length&&(e("*[data-"+a+"='"+t[r]+"']").each(function(t,r){e(r).eq(0).hasClass("job-list-row--search-exempt")||e(r).eq(0).addClass("job-list-row--active")}),d(t,++r,a))},g=function(t,r){r<t.length&&(0===r&&1!==t.length?(d(t[r].arr,0,t[r].query),h(t[r].arr,0,t[r].query)):0===r&&"category"===t[r].query&&1===t.length?(d(t[r].arr,0,t[r].query),f(t[r].arr,0,t[r].query),h(t[r].arr,0,t[r].query)):r>0?(f(t[r].arr,0,t[r].query),h(t[r].arr,0,t[r].query)):0===r&&1===t.length&&(d(t[r].arr,0,t[r].query),f(t[r].arr,0,t[r].query),h(t[r].arr,0,t[r].query)),g(t,++r)),e("#job-filter-buttons").html(a.join(""))};if(0===r.length){c(e(".job-list-row"),0,"job-list-row--title"),u(e(".job-list-row"),0,"job-list-row--title"),e("#job-filter-buttons").html("");var b=t.substr(t.indexOf("?search=")+8,t.length).replace(/\%20/gi," ");p=(p="<span class='job-filter-button job-filter-button--grey' data-search='${filter}'>${filter} <span class='job-filter-button--delete'>x</span></span>").replace(/\$\{filter\}/gi,b),e("#job-filter-buttons").html(p)}else{b=t.substr(t.indexOf("?search=")+8,t.length).replace(/\%20/gi," ");h(b,0,"search"),g(r,0)}i(".job-list-row",".job-list-row--active.job-list-row--filtered")},h=!1,f=function(e,t){if(t<e.length){var r=e[t].substr(e[t].indexOf("=")+1,e[t].length).split("&");d(r,0),f(e,++t)}},d=function(t,r){r<t.length&&(e("*[value='"+t[r].replace(/%20/gi," ").toLowerCase()+"']").eq(0).prop("checked",!0),d(t,++r))},g=function(t){!1!==h||-1===t.indexOf("?filter=true;")&&-1===t.indexOf("?search")?!0===h&&-1!==t.indexOf("?filter=true;")?function(e){if(-1!==e.indexOf("?filter=true;")){var t=e.substr(e.indexOf("?filter=true;")+13,e.length),r=t.substr(0,t.length).split(";");f(r,0),u()}}(t):!0===h&&-1!==t.indexOf("?search")&&b(l):(e("*[type='checkbox']").length>0?h=!0:pageload=!1,setTimeout(function(){g(t)},500))};g(l);var b=function(t){var r=t.substr(t.indexOf("?search=")+8,t.length).replace(/\%20/gi," ");r=decodeURIComponent(r);var a,o=e(".job-list-row"),n=new RegExp(r,"gi");a=(a="<span class='job-filter-button job-filter-button--grey' data-search='${filter}'>${filter} <span class='job-filter-button--delete'>x</span></span>").replace(/\$\{filter\}/gi,r),e("#job-filter-buttons").html(a),e.each(o,function(t,r){var a=e(r).attr("data-search");!0===n.test(a)?e(r).addClass("job-list-row--filtered"):!1===n.test(a)&&(e(r).removeClass("job-list-row--filtered"),e(r).addClass("job-list-row--search-exempt"))}),i(".job-list-row",".job-list-row--active.job-list-row--filtered")};e(document).on("submit","#career-search-form",function(t){t.preventDefault();var r=window.location.href,a=r.substr(0,r.indexOf(".com")+4);window.location.href=a+"/job-listing/?search="+e("#form-field-name").val().trim()}),e(document).on("click","*[type='checkbox']",function(e){var t=window.location.href;-1===t.indexOf("?search")?u():p(t)}),e(document).on("click",".job-filter-button",function(t){t.preventDefault(),e.each(e(this).data(),function(t,r){"search"!==t.trim()?e("#"+t).find("*[value='"+r+"']").prop("checked",!1):history.pushState(null,null,"/job-listing/")});var r=window.location.href;-1===r.indexOf("?search")?u():p(r)});var m=e("img"),j=e("iframe"),w=function(t,r){if(r<t.length){if(parseFloat(e(window).scrollTop()+window.innerHeight)>t.eq(r).offset().top-200&&void 0===t.eq(r).attr("src")){var a=t.eq(r).attr("data-src");t.eq(r).attr("src",a),t.eq(r).css("opacity","1")}w(t,++r)}},v=function(t,r,a){if(r<t.length){if(parseFloat(e(window).scrollTop()+window.innerHeight)>t.eq(r).offset().top-200){var o=t.eq(r).attr("data-src");void 0!==a?t.eq(r).find(a).css({"background-image":"url("+o+")","background-position":"background-position","background-size":"cover"}):t.eq(r).css({"background-image":"url("+o+")","background-position":"background-position","background-size":"cover"})}v(t,++r,a)}};w(m,0),w(j,0),v(e(".flip-card-front"),0,".elementor-flip-box__front"),v(e(".background-image-elements"),0);new Date;console.log("Script update August 4th, 2020"),e(window).scroll(function(){var t=e("img"),r=e("iframe");w(t,0),w(r,0),v(e(".flip-card-front"),0,".elementor-flip-box__front"),v(e(".background-image-elements"),0)})});