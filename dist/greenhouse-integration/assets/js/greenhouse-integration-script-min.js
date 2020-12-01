!function(e){var t={};function r(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(o,a,function(t){return e[t]}.bind(null,a));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);r(1);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}
/*!*
 * Plugin Name:       Anaplan Greenhouse Integration
 * Plugin URI:        https://careers.anaplan.com/
 * Description:       JS to work with Greenhouse API
 * Version:           1.2.1
 * Author:            Peter Berki
 * Author URI:        https://kumadev.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       anaplan
 * Domain Path:       /languages
 * Test URL Path:     window.location.href + ?filter=true;category=Engineering;city=San%20Francisco;country=United&20States
 */jQuery(document).ready((function(e){var t=window.location.href,r=(t=t.substr(0,t.indexOf(".com")+4))+"/jobs/?id=",a=function(e,t,r,o){this.title=e,this.categoryArr=t,this.appendID=r,this.markup=o},n=function(e,t){this.query=e,this.amount=t},i=[],l=function(t,r){var o=e(r).length,a=e(t).length;o===a?e("#job-list-total").html("<p>Displaying ${amount} entries".replace(/\$\{amount\}/gi,"<strong>all</strong>")):e("#job-list-total").html("<p>Displaying ${amount} entries".replace(/\$\{amount\}/gi,"<strong>"+o+"</strong> of <strong>"+a+"</strong>"))},s=window.location.href;if(s.indexOf("/jobs/")>0){var c=s.substr(s.indexOf("?id=")+4,s.length);if(-1!==s.indexOf("?id=")){e("#job-background").css("opacity",0);var u="https://boards-api.greenhouse.io/v1/boards/anaplan/jobs/"+c;e.ajax({url:u}).done((function(t){var o=t.content.replace(/&lt;/gi,"<");o=(o=(o=(o=o.replace(/&gt;/gi,">")).replace(/&quot;/gi,'"')).replace(/\&amp\;nbsp\;/gi," ")).replace(/\&amp\;amp\;/gi,"&"),console.log(o),e("#job-title").html(t.title),e("#job-title-content").find("h3").html(t.title),e("#job-location").html(t.location.name.trim()),e("#job-location-content").find("h5").html(t.location.name.trim()),e("#job-content").html(o),e("#job-greenhouse-href").attr("href",t.absolute_url+"#application"),String.prototype.tagRemoval=function(){var e=this.replace(/(\<strong\>.*\<\/strong\>)|(\<strong\>)|(\<\/strong\>)/gi,"");return e=e.replace(/(\<ul\>)|(\<\/ul\>)|(\<li\>)|(\<\/li\>)|(\<p\>)|(\<\/p\>)|(\<h1\>)|(\<h2\>)|(\<h3\>)|(\<\/h3\>)|(\<\/h1\>)|(\<\/h2\>)/gi,"")},String.prototype.trunc=function(e,t){var r=this.length>e,o=r?this.substr(0,e-1):this;return o=t&&r?o.substr(0,o.lastIndexOf(" ")):o+" ..."};var a=o.tagRemoval().trunc(240,!1);if(a.length>1){e("meta[name=description]").remove();var n=document.createElement("meta");n.name="description",n.content=a,e("head").append(n);!function e(t,r){t.length>r&&e(t,++r)}(e("meta"),0)}var i="/wp-content/uploads/2018/12/solution_IT_feature.jpg",l="/wp-content/uploads/2018/12/solution_sales_feature.jpg";switch(t.departments[0].name){case"Engineering":var s=i;break;case"IT":s=i;break;case"Technical Operations":s=i;break;case"Field Sales":s=l;break;case"Inside Sales":s=l;break;case"Sales Development":s=l;break;case"Pre-Sales":s=l;break;case"Marketing":s=l;break;default:s="/wp-content/uploads/2018/12/solution_supplyChain_feature.jpg"}e("#job-background").css({"background-image":"url("+s+")"}),setTimeout((function(){e("#job-background").css("opacity",1)}),250);var u=t.departments[0].name;e.getJSON("https://boards-api.greenhouse.io/v1/boards/anaplan/departments/",(function(t){e.each(t.departments,(function(o,a){var n=[],i="<div class='job-related--row'><p id='job-related--title' class='job-related--title'><a href='${job-href}'>${job-title}</a></p><p id='job-related--location' class='job-related--location'>${job-location}</p></div>",l=function(e){var t=r+e.id,o=i.replace(/\$\{job-title\}/gi,e.title);return o=(o=o.replace(/\$\{job-location\}/gi,e.location.name)).replace(/\$\{job-href\}/gi,t)};if(t.departments[o].name===u){!function r(o,a){n.length<2&&a<t.departments.length?(e.each(t.departments[a].jobs,(function(e,t){if(t.id!==parseInt(c)&&e<=5){var r=l(t);n.push(r)}})),r(o,++a)):n.length<2&&a===t.departments.length&&(a=o,e.each(t.departments[a].jobs,(function(e,t){if(t.id!==parseInt(c)&&e<=5){var r=l(t);n.push(r)}})),r(o,++a))}(0,o),e("#job-related-attach").html(n.join(""))}}))}))})).fail((function(){window.location.href=window.location.href.substr(0,window.location.href.indexOf("/jobs"))+"/job-listing/"}))}else window.location.href=window.location.href.substr(0,window.location.href.indexOf("/jobs"))+"/job-listing/"}else-1!==s.indexOf("/engineering")?s+="?filter=true;category=Eng%20Ops&Cloud%20Platform%20Engineering&Experience%20and%20Applications%20Engineering&Product%20Management%20and%20User%20Experience&Product,%20UX,%20and%20Engineering&Planning%20AI":-1!==s.indexOf("/sales")&&(s+="?filter=true;category=Field%20Sales&Pre-Sales&Sales%20Development"),e.getJSON("https://boards-api.greenhouse.io/v1/boards/anaplan/departments/",(function(t){var o=0,s=0,c=0,u=0,p=0,f=0,h=[],d=[],b=[],g=[],m=[],j=[];console.log(t);var v="<li><span class='item-title-checkbox'><input name='${value}' value='${value}' type='checkbox' /><label>${display}</label></span><span class='item-amount'><span class='item-amount-container'>${amount}</span></span></li>",w="<div data-search='${search}' data-category='${category}' data-city='${city}' data-country='${country}' data-title='${job-data-title}' class='job-list-row job-list-row--active job-list-row--filtered'><div class='job-list-column job-list-column--large'><p><a href='${job-href}'>${job-title}</a></p></div><div class='job-list-column job-list-column--small'><p>${category}</p></div><div class='job-list-column job-list-column--small'><p>${location}</p></div></div>",y=function e(t,r,o){var a=t.trim();if(r.length<1){var i=new n(a,1);r.push(i)}else if(o<r.length){if(a===r[o].query)return r[o].amount+=1,!1;e(t,r,++o)}else{i=new n(a,1);r.push(i)}};e.each(t.departments,(function(t,a){if(a.jobs.length>0&&"Template"!==a.name){var i=new n(a.name.replace("Inside Sales","Sales Development"),a.jobs.length);m.push(i),e.each(a.jobs,(function(e,t){var r=new n(t.title,1);g.push(r)}));var l=a.jobs.map((function(e,t){var o=e.location.name.split(","),a=r+e.id,n=e.location.name.trim().toLowerCase()+","+e.title.toLowerCase();if(o.length>1){var l=o[0].trim().replace(/(\s-)|(-\s)/gi,"-"),s=o[1].trim().replace(/(\s-)|(-\s)/gi,"-");y(l.trim(),b,0),y(s.trim(),d,0),c=(c=w.replace(/\$\{city\}/gi,l.toLowerCase())).replace(/\$\{country\}/gi,s.toLowerCase())}else{s=o[0].trim().replace(/(\s-)|(-\s)/gi,"-");y(o[0],d,0);var c=w.replace(/\$\{country\}/gi,s.toLowerCase())}return(c=(c=(c=(c=(c=c.replace(/\$\{job-href\}/gi,a)).replace(/\$\{job-title\}/gi,e.title)).replace(/\$\{job-data-title\}/gi,e.title.toLowerCase())).replace(/\$\{location\}/gi,e.location.name.trim())).replace(/\$\{search\}/gi,n+i.query.trim().toLowerCase())).replace(/\$\{category\}/gi,i.query.trim().toLowerCase())}));j.push(l.join(""))}o+=a.jobs.length;if(console.log("val.name = "+a.name),/engineering|eng|experience|ai/gi.test(a.name)){s+=a.jobs.length;var v=new n("engineering",s);h.push(v)}else if(/sales/gi.test(a.name)){c+=a.jobs.length;v=new n("sales",c);h.push(v)}if("Customer Success"===a.name.trim()){f+=a.jobs.length;v=new n("customer success",f);h.push(v)}else if("Pre-Sales"===a.name.trim()){u+=a.jobs.length;v=new n("pre-sales",u);h.push(v)}else if("Field Sales"===a.name.trim()){p+=a.jobs.length;v=new n("field sales",p);h.push(v)}})),e("<div/>",{html:j.join("")}).appendTo("#job-attach");var q=function(e){return e.sort((function(e,t){var r=e.query.toUpperCase(),o=t.query.toUpperCase();return r<o?-1:r>o?1:0}))};d=q(d),b=q(b);var $=new a("Category",m,"category",v),x=new a("Country",d,"country",v),C=new a("City",b,"city",v);new a("Title",g,"title","<li style='display:none;'><span class='item-title-checkbox'><input name='${value}' value='${value}' type='checkbox' /><label>${display}</label></span><span class='item-amount'><span class='item-amount-container'>${amount}</span></span></li>");i.push($),i.push(x),i.push(C);var k=new n("all",o);h.push(k),e.each(h,(function(t,r){!function(t){e('*[data-job-type="'+t.query+'"]').html(t.amount)}(r)}));!function t(r,o){if(o<r.length){var a=r[o].categoryArr,n=r[o].markup,i=a.map((function(e,t){var r=n.replace(/\$\{value\}/gi,e.query.toLowerCase());return(r=r.replace(/\$\{display\}/gi,e.query)).replace(/\$\{amount\}/gi,e.amount)}));e("<ul/>",{html:i.join("")}).appendTo("#"+r[o].appendID),t(r,++o)}}(i,0),l(".job-list-row",".job-list-row--active.job-list-row--filtered")}));var p=function(){var t=window.location.href;-1===window.location.href.indexOf("?search")&&e(".job-list-row").each((function(t,r){e(r).removeClass("job-list-row--search-exempt")}));var r=[],o=[],a=function(e){this.query=e,this.arr=[]},n=function e(t,r,o){r<t.length&&(t.eq(r).hasClass(o)||(t.eq(r).removeClass("job-list-row--active"),t.eq(r).removeClass("job-list-row--filtered")),e(t,++r,o))},i=e("*[type='checkbox']");n(e(".job-list-row"),0,"job-list-row--title"),function e(t,o){if(o<t.length){if(!0===t.eq(o).prop("checked")&&void 0===t.eq(o).attr("id")){var n,i=t.eq(o).attr("value").trim(),l=t.eq(o).parents(".item-list").attr("id").trim();if(r.length>0)(n=new a(l)).arr.push(i),function e(t,o,a){o<t.length&&(t[o].query.trim()===a.query.trim()?t[o].arr.push(a.arr[0]):o+1===t.length&&t[o].query.trim()!==a.query.trim()?r.push(a):e(t,++o,a))}(r,0,n);else(n=new a(l)).arr.push(i),r.push(n)}e(t,++o)}}(i,0);var s=function e(t,r,a){if(r<t.length){var n="<span class='job-filter-button job-filter-button--${color}' data-${query}='${filter}'>${filter} <span class='job-filter-button--delete'>x</span></span>";n=(n=(n="category"===a?n.replace(/\$\{color\}/gi,"blue"):"search"===a?n.replace(/\$\{color\}/gi,"grey"):n.replace(/\$\{color\}/gi,"green")).replace(/\$\{filter\}/gi,t[r])).replace(/\$\{query\}/gi,a),o.push(n),e(t,++r,a)}},c=function t(r,o,a){o<r.length&&(e("*[data-"+a+"='"+r[o]+"']").each((function(t,r){e(r).eq(0).hasClass("job-list-row--search-exempt")||e(r).eq(0).addClass("job-list-row--filtered")})),t(r,++o,a))},u=function t(r,o,a){o<r.length&&(e("*[data-"+a+"='"+r[o]+"']").each((function(t,r){e(r).eq(0).hasClass("job-list-row--search-exempt")||e(r).eq(0).addClass("job-list-row--active")})),t(r,++o,a))};0===r.length&&-1===t.indexOf("?search")?(n(e(".job-list-row"),0,"job-list-row--title"),function e(t,r,o){r<t.length&&(t.eq(r).hasClass(o)||(t.eq(r).addClass("job-list-row--active"),t.eq(r).addClass("job-list-row--filtered")),e(t,++r,o))}(e(".job-list-row"),0,"job-list-row--title"),e("#job-filter-buttons").html("")):-1===t.indexOf("?search")?function t(r,a){a<r.length&&(0===a&&1!==r.length?(u(r[a].arr,0,r[a].query),s(r[a].arr,0,r[a].query)):0===a&&"category"===r[a].query&&1===r.length?(u(r[a].arr,0,r[a].query),c(r[a].arr,0,r[a].query),s(r[a].arr,0,r[a].query)):a>0?(c(r[a].arr,0,r[a].query),s(r[a].arr,0,r[a].query)):0===a&&1===r.length&&(u(r[a].arr,0,r[a].query),c(r[a].arr,0,r[a].query),s(r[a].arr,0,r[a].query)),t(r,++a)),e("#job-filter-buttons").html(o.join(""))}(r,0):g(t),l(".job-list-row",".job-list-row--active.job-list-row--filtered")},f=function(t){var r=[],a=[],n=e("*[type='checkbox']"),i=function(e){this.query=e,this.arr=[]},s=function e(t,r,o){r<t.length&&(t.eq(r).hasClass(o)||t.eq(r).hasClass("job-list-row--search-exempt")||(t.eq(r).removeClass("job-list-row--active"),t.eq(r).removeClass("job-list-row--filtered")),e(t,++r,o))};s(e(".job-list-row"),0,"job-list-row--title"),function e(t,o){if(o<t.length){if(!0===t.eq(o).prop("checked")&&void 0===t.eq(o).attr("id")){var a,n=t.eq(o).attr("value").trim(),l=t.eq(o).parents(".item-list").attr("id").trim();if(r.length>0)(a=new i(l)).arr.push(n),function e(t,o,a){o<t.length&&(t[o].query.trim()===a.query.trim()?t[o].arr.push(a.arr[0]):o+1===t.length&&t[o].query.trim()!==a.query.trim()?r.push(a):e(t,++o,a))}(r,0,a);else(a=new i(l)).arr.push(n),r.push(a)}e(t,++o)}}(n,0);var c,u=function e(t,r,n){var i="<span class='job-filter-button job-filter-button--${color}' data-${query}='${filter}'>${filter} <span class='job-filter-button--delete'>x</span></span>";i="category"===n?i.replace(/\$\{color\}/gi,"blue"):"search"===n?i.replace(/\$\{color\}/gi,"grey"):i.replace(/\$\{color\}/gi,"green"),r<t.length&&"object"===o(t)?(i=(i=i.replace(/\$\{filter\}/gi,t[r])).replace(/\$\{query\}/gi,n),a.push(i),e(t,++r,n)):"string"==typeof t&&(i=(i=i.replace(/\$\{filter\}/gi,t)).replace(/\$\{query\}/gi,n),a.push(i))},p=function t(r,o,a){o<r.length&&(e("*[data-"+a+"='"+r[o]+"']").each((function(t,r){e(r).eq(0).hasClass("job-list-row--search-exempt")||e(r).eq(0).addClass("job-list-row--filtered")})),t(r,++o,a))},f=function t(r,o,a){o<r.length&&(e("*[data-"+a+"='"+r[o]+"']").each((function(t,r){e(r).eq(0).hasClass("job-list-row--search-exempt")||e(r).eq(0).addClass("job-list-row--active")})),t(r,++o,a))};if(0===r.length){s(e(".job-list-row"),0,"job-list-row--title"),function e(t,r,o){r<t.length&&(t.eq(r).hasClass(o)||t.eq(r).hasClass("job-list-row--search-exempt")||(t.eq(r).addClass("job-list-row--active"),t.eq(r).addClass("job-list-row--filtered")),e(t,++r,o))}(e(".job-list-row"),0,"job-list-row--title"),e("#job-filter-buttons").html("");var h=t.substr(t.indexOf("?search=")+8,t.length).replace(/\%20/gi," ");c=(c="<span class='job-filter-button job-filter-button--grey' data-search='${filter}'>${filter} <span class='job-filter-button--delete'>x</span></span>").replace(/\$\{filter\}/gi,h),e("#job-filter-buttons").html(c)}else{h=t.substr(t.indexOf("?search=")+8,t.length).replace(/\%20/gi," ");u(h,0,"search"),function t(r,o){o<r.length&&(0===o&&1!==r.length?(f(r[o].arr,0,r[o].query),u(r[o].arr,0,r[o].query)):0===o&&"category"===r[o].query&&1===r.length?(f(r[o].arr,0,r[o].query),p(r[o].arr,0,r[o].query),u(r[o].arr,0,r[o].query)):o>0?(p(r[o].arr,0,r[o].query),u(r[o].arr,0,r[o].query)):0===o&&1===r.length&&(f(r[o].arr,0,r[o].query),p(r[o].arr,0,r[o].query),u(r[o].arr,0,r[o].query)),t(r,++o)),e("#job-filter-buttons").html(a.join(""))}(r,0)}l(".job-list-row",".job-list-row--active.job-list-row--filtered")},h=function t(r,o){o<r.length&&(e("*[value='"+r[o].replace(/%20/gi," ").toLowerCase()+"']").eq(0).prop("checked",!0),t(r,++o))},d=function(e){if(-1!==e.indexOf("?filter=true;")){var t=e.substr(e.indexOf("?filter=true;")+13,e.length),r=t.substr(0,t.length).split(";");console.log("Check Category "+r),function e(t,r){if(r<t.length){var o=t[r].substr(t[r].indexOf("=")+1,t[r].length).split("&");h(o,0),e(t,++r)}}(r,0),p()}},b=!1;!function t(r){if(!1!==b||-1===r.indexOf("?filter=true;")&&-1===r.indexOf("?search"))!0===b&&-1!==r.indexOf("?filter=true;")?d(r):!0===b&&-1!==r.indexOf("?search")&&g(s);else{var o=e("*[type='checkbox']").length;b=o>0,setTimeout((function(){t(r)}),500)}}(s);var g=function(t){var r=t.substr(t.indexOf("?search=")+8,t.length).replace(/\%20/gi," ");r=decodeURIComponent(r);var o,a=e(".job-list-row"),n=new RegExp(r,"gi");o=(o="<span class='job-filter-button job-filter-button--grey' data-search='${filter}'>${filter} <span class='job-filter-button--delete'>x</span></span>").replace(/\$\{filter\}/gi,r),e("#job-filter-buttons").html(o),e.each(a,(function(t,r){var o=e(r).attr("data-search");!0===n.test(o)?e(r).addClass("job-list-row--filtered"):!1===n.test(o)&&(e(r).removeClass("job-list-row--filtered"),e(r).addClass("job-list-row--search-exempt"))})),l(".job-list-row",".job-list-row--active.job-list-row--filtered")};e(document).on("submit","#career-search-form",(function(t){t.preventDefault();var r=window.location.href,o=r.substr(0,r.indexOf(".com")+4);window.location.href=o+"/job-listing/?search="+e("#form-field-name").val().trim()})),e(document).on("click","*[type='checkbox']",(function(e){var t=window.location.href;-1===t.indexOf("?search")?p():f(t)})),e(document).on("click",".job-filter-button",(function(t){t.preventDefault(),e.each(e(this).data(),(function(t,r){"search"!==t.trim()?e("#"+t).find("*[value='"+r+"']").prop("checked",!1):history.pushState(null,null,"/job-listing/")}));var r=window.location.href;-1===r.indexOf("?search")?p():f(r)}));var m=e("img"),j=e("iframe"),v=function t(r,o){if(o<r.length){if(parseFloat(e(window).scrollTop()+window.innerHeight)>r.eq(o).offset().top-200&&void 0===r.eq(o).attr("src")){var a=r.eq(o).attr("data-src");r.eq(o).attr("src",a),r.eq(o).css("opacity","1")}t(r,++o)}},w=function t(r,o,a){if(o<r.length){if(parseFloat(e(window).scrollTop()+window.innerHeight)>r.eq(o).offset().top-200){var n=r.eq(o).attr("data-src");void 0!==a?r.eq(o).find(a).css({"background-image":"url("+n+")","background-position":"background-position","background-size":"cover"}):r.eq(o).css({"background-image":"url("+n+")","background-position":"background-position","background-size":"cover"})}t(r,++o,a)}};v(m,0),v(j,0),w(e(".flip-card-front"),0,".elementor-flip-box__front"),w(e(".background-image-elements"),0);new Date;console.log("Script update November 26th, 2020"),e(window).scroll((function(){var t=e("img"),r=e("iframe");v(t,0),v(r,0),w(e(".flip-card-front"),0,".elementor-flip-box__front"),w(e(".background-image-elements"),0)}))}))},function(e,t,r){}]);