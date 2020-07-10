/**
 * Plugin Name:       Anaplan Greenhouse Integration
 * Plugin URI:        https://www.anaplan.com/
 * Description:       JS to work with Greenhouse API
 * Version:           1.2.1
 * Author:            Peter Berki
 * Author URI:        https://kumadev.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       anaplan
 * Domain Path:       /languages
 * Test URL Path:     window.location.href + ?filter=true;category=Engineering;city=San%20Francisco;country=United&20States
 */
jQuery(document).ready(function($){


    var absoluteURL = window.location.href;
    absoluteURL = absoluteURL.substr(0, absoluteURL.indexOf(".com") + 4);

    var careerSiteAbsoluteURL = absoluteURL + "/jobs/?id=";

    /*

    All Global Constructive Objects

    */

    var sidebarMarkupObj = function(title, categoryArr, appendID, markup) {
        this.title = title;
        this.categoryArr = categoryArr;
        this.appendID = appendID;
        this.markup = markup;
    };
    
    var jobFigureObj = function(query, amount) {
        this.query = query;
        this.amount = amount;
    };

    var swapJobFigures = function(jobObj){
        $('*[data-job-type="' + jobObj.query + '"]').html(jobObj.amount);
    };

    var sidebarMarkupArr = [];

    //Update inactive vs active jobs copy
    var jobCountUpdate = function( inactiveClass, activeClass ) {
        var displayMarkup = "<p>Displaying ${amount} entries";
        var totalActiveJobs = $(activeClass).length;
        var totalInactiveJobs = $(inactiveClass).length;
        if ( totalActiveJobs === totalInactiveJobs ) {
            $("#job-list-total").html(displayMarkup.replace(/\$\{amount\}/gi, "<strong>all</strong>"));
        } else {
            $("#job-list-total").html(displayMarkup.replace(/\$\{amount\}/gi, "<strong>" + totalActiveJobs + "</strong> of <strong>" + totalInactiveJobs + "</strong>"));
        }
    };


    /*
    
    Populate Job's page
    
    */

    var currentURL = window.location.href;

    if ( currentURL.indexOf("/jobs/") > 0 ) {
        var currentJobID = currentURL.substr(currentURL.indexOf("?id=") + 4, currentURL.length);
        //console.log("currentJobID = " + currentJobID);
        //console.log(currentURL.indexOf("?id="));
        if ( currentURL.indexOf("?id=") !== -1 ) {

            /*
            
            Hide background
            
            */
            $("#job-background").css("opacity", 0);

            //update Job href
            var greenhouseJobURL = "https://boards-api.greenhouse.io/v1/boards/anaplan/jobs/" + currentJobID;

            //call greenhouse data; pull in information about job
            $.ajax({
                url: greenhouseJobURL
            }).done(function(data) {
                var thisContent = data.content.replace(/&lt;/gi, "<");
                thisContent = thisContent.replace(/&gt;/gi, ">");
                thisContent = thisContent.replace(/&quot;/gi, "\"");
                $("#job-title").find("h1").html(data.title);
                $("#job-title-content").find("h3").html(data.title);
                $("#job-location").find("h3").html(data.location.name.trim());
                $("#job-location-content").find("h5").html(data.location.name.trim());
                $("#job-content").html(thisContent);
                $("#job-greenhouse-href").attr("href", data.absolute_url);
                String.prototype.tagRemoval = function () {
                    var tagsRemoved = this.replace(/(\<strong\>.*\<\/strong\>)|(\<strong\>)|(\<\/strong\>)/gi, "");
                    tagsRemoved = tagsRemoved.replace(/(\<ul\>)|(\<\/ul\>)|(\<li\>)|(\<\/li\>)|(\<p\>)|(\<\/p\>)|(\<h1\>)|(\<h2\>)|(\<h3\>)|(\<\/h3\>)|(\<\/h1\>)|(\<\/h2\>)/gi, "");
                    return tagsRemoved;
                };
                String.prototype.trunc = function ( n, useWordBoundary ) {
                    var isTooLong = this.length > n,
                        s_ = isTooLong ? this.substr(0,n-1) : this;
                    s_ = (useWordBoundary && isTooLong) ? s_.substr(0,s_.lastIndexOf(' ')) : s_ + " ...";
                    return  isTooLong ? s_ : s_;
                };
                var metaDescription = thisContent.tagRemoval().trunc(240, false);
                if ( metaDescription.length > 1 ) {
                    $('meta[name=description]').remove();
                    var metaTag = document.createElement("meta");
                    metaTag.name = "description";
                    metaTag.content = metaDescription;
                    $("head").append(metaTag);
                    var metaCycle = function ( arr, num ) {
                        console.log("metaCycle");
                        if ( arr.length > num ) {
                            console.log(arr.eq(num));
                            num++;
                            metaCycle(arr, num);
                        }
                    };
                    metaCycle($("meta"), 0);
                    //console.log(metaDescription);
                }


                var itFeaturePath = "/wp-content/uploads/2018/12/solution_IT_feature.jpg";
                var salesFeaturePath = "/wp-content/uploads/2018/12/solution_sales_feature.jpg";
                var supplyChainFeaturePath = "/wp-content/uploads/2018/12/solution_supplyChain_feature.jpg";

                switch ( data.departments[0].name ) {
                    case "Engineering":
                        var backgroundImage = itFeaturePath;
                        break;
                    case "IT":
                        var backgroundImage = itFeaturePath;
                        break;
                    case "Technical Operations":
                        var backgroundImage = itFeaturePath;
                        break;
                    case "Field Sales":
                        var backgroundImage = salesFeaturePath;
                        break;
                    case "Inside Sales":
                        var backgroundImage = salesFeaturePath;
                        break;
                    case "Sales Development":
                        var backgroundImage = salesFeaturePath;
                        break;
                    case "Pre-Sales":
                        var backgroundImage = salesFeaturePath;
                        break;
                    case "Marketing":
                        var backgroundImage = salesFeaturePath;
                        break;
                    default:
                        var backgroundImage = supplyChainFeaturePath;
                        break;
                }

                $("#job-background").css({"background-image" : "url(" + backgroundImage + ")"});
                setTimeout(function(){
                    $("#job-background").css("opacity", 1);
                }, 250);

                var thisDepartment = data.departments[0].name;

                $.getJSON("https://boards-api.greenhouse.io/v1/boards/anaplan/departments/", function(data){
                    var relatedJobsArr = [];
                    $.each(data.departments, function( key, val ) {

                        var availableDepartments = [];
    
                        var relatedJobMarkup = "<div class='job-related--row'>"
                        + "<p id='job-related--title' class='job-related--title'>"
                        + "<a href='${job-href}'>${job-title}</a></p>"
                        + "<p id='job-related--location' class='job-related--location'>${job-location}</p></div>";

                        /*

                        Related job markup loop
                        Just to clean up the loop below

                        */
                        var relatedJobMarkupLoop = function( values ) {
                            var relatedJobHref = careerSiteAbsoluteURL + values.id;
                            var markupUpdate = relatedJobMarkup.replace(/\$\{job-title\}/gi, values.title);
                            markupUpdate = markupUpdate.replace(/\$\{job-location\}/gi, values.location.name);
                            markupUpdate = markupUpdate.replace(/\$\{job-href\}/gi, relatedJobHref);
                            return markupUpdate;
                        };

                        //Starting point to pull related jobs is always the deparment that's being queried
                        if ( data.departments[key].name === thisDepartment ) {

                            /*
                            
                            Loops through deparments until the related jobs field has at least 2 jobs listed in it
                            
                            */
                            var availableDepartmentsLoop = function ( num, key ) {
                                if ( availableDepartments.length < 2 && key < data.departments.length ) {
                                    $.each( data.departments[key].jobs, function( key, val ) {
                                        if ( val.id !== parseInt(currentJobID) && key <= 5 ) {
                                            var thisRelatedJobMarkup = relatedJobMarkupLoop(val);
                                            availableDepartments.push(thisRelatedJobMarkup);
                                        }
                                    });
                                    key++;
                                    availableDepartmentsLoop(num, key);
                                } else if ( availableDepartments.length < 2 && key === data.departments.length ) {
                                    key = num;
                                    $.each( data.departments[key].jobs, function( key, val ) {
                                        if ( val.id !== parseInt(currentJobID) && key <= 5 ) {
                                            var thisRelatedJobMarkup = relatedJobMarkupLoop(val);
                                            availableDepartments.push(thisRelatedJobMarkup);
                                        }
                                    });
                                    key++;
                                    availableDepartmentsLoop(num, key);
                                }
                            };

                            //loop invocation
                            availableDepartmentsLoop(0, key);

                            //append related job content
                            $("#job-related-attach").html(availableDepartments.join(""));

                        }
                    });
                });
            })
            .fail(function(){
                window.location.href = window.location.href.substr(0, window.location.href.indexOf("/jobs")) + "/job-listing/";
            }); //End done
        } else {
            window.location.href = window.location.href.substr(0, window.location.href.indexOf("/jobs")) + "/job-listing/";
        }
    } else {

        /*
        
        Update filtering for Engineering and Sales job listing pages

        */

        if ( currentURL.indexOf("/engineering") !== -1 ) {
            currentURL = currentURL + "?filter=true;category=Engineering";
        } else if ( currentURL.indexOf("/sales") !== -1 ) {
            currentURL = currentURL + "?filter=true;category=Field%20Sales&Pre-Sales&Sales%20Development";
        }

        /*
        
        Make request from Greenhouse for job listing by departments

        */

        $.getJSON("https://boards-api.greenhouse.io/v1/boards/anaplan/departments/", function(data){
            var totalJobs = 0,
                engineeringJobs = 0,
                salesJobs = 0;
    
            var jobFigureArr = [],
                countryJobArr = [],
                cityJobArr = [],
                jobArr = [],
                jobCategoryArr = [],
                jobIndividualListArr = [];
    
            var sidebarChecklistMarkup = "<li><span class='item-title-checkbox'>"
            + "<input name='${value}' value='${value}' type='checkbox' />"
            + "<label>${display}</label>"
            + "</span>"
            + "<span class='item-amount'><span class='item-amount-container'>${amount}</span></span></li>";

            var sidebarChecklistMarkupHidden = "<li style='display:none;'><span class='item-title-checkbox'>"
            + "<input name='${value}' value='${value}' type='checkbox' />"
            + "<label>${display}</label>"
            + "</span>"
            + "<span class='item-amount'><span class='item-amount-container'>${amount}</span></span></li>";
    
            var individualJobMarkup = "<div data-search='${search}' data-category='${category}' data-city='${city}' data-country='${country}' data-title='${job-data-title}' class='job-list-row job-list-row--active job-list-row--filtered'>"
            + "<div class='job-list-column job-list-column--large'>"
            + "<p><a href='${job-href}'>${job-title}</a></p>"
            + "</div>"
            + "<div class='job-list-column job-list-column--small'>"
            + "<p>${category}</p>"
            + "</div>"
            + "<div class='job-list-column job-list-column--small'>"
            + "<p>${location}</p>"
            + "</div>"
            + "</div>";
    
            var addNewLocation = function( value, comparisonList, num ) {   
                var currentValue = value;
                if ( comparisonList.length < 1 ) {
                    var currentLocation = new jobFigureObj( currentValue , 1 );
                    comparisonList.push(currentLocation);
                } else if ( num < comparisonList.length ) {
                    if ( currentValue === comparisonList[num].query ) {
                        comparisonList[num].amount += 1;
                        return false;
                    } else {
                        num++;
                        addNewLocation( value, comparisonList, num);
                    }
                } else {
                    var currentLocation = new jobFigureObj( currentValue, 1 );
                    comparisonList.push(currentLocation);
                }
            };
    
            $.each(data.departments, function(key,val) {

                /*
    
                    swapJobFigures support
                    pass value name and calculate total number of jobs
    
                */
    
                if ( val.jobs.length > 0 && val.name !== "Template" ) {
                    var currentCategory = new jobFigureObj( val.name.replace("Inside Sales", "Sales Development"), val.jobs.length );
                    jobCategoryArr.push(currentCategory);

                    $.each(val.jobs, function(key,val) {
                        var currentJob = new jobFigureObj(val.title, 1);
                        jobArr.push(currentJob);
                    });

                    var currentCategoryJobs = val.jobs.map(function(key, val){
                        var currentLocation = key.location.name.split(",");
                        var jobHref = careerSiteAbsoluteURL + key.id;
                        var searchParameter = key.location.name.trim().toLowerCase() + "," + key.title.toLowerCase();
                        if ( currentLocation.length > 1 ) {
    
                            /*
    
                            Get city and country value from location field.
                            Location field's structure should be: city, country
    
                            */
                            var cityValue = currentLocation[0].trim().replace(/(\s-)|(-\s)/gi, "-");
                            var countryValue = currentLocation[1].trim().replace(/(\s-)|(-\s)/gi, "-");
    
                            /*
    
                            Adds the city and country location to the city and country sidebar
    
                            */
    
                            addNewLocation(cityValue, cityJobArr, 0);
                            addNewLocation(countryValue, countryJobArr, 0);
    
                            /*
    
                            Update individual job list item markup with city and country
    
                            */
    
                            var thisMarkup = individualJobMarkup.replace(/\$\{city\}/gi, cityValue.toLowerCase());
                            thisMarkup = thisMarkup.replace(/\$\{country\}/gi, countryValue.toLowerCase());
                        } else {
    
                            /*
    
                            Get city and country value from location field.
                            Location field's structure should be: country
    
                            */
    
                            var countryValue = currentLocation[0].trim().replace(/(\s-)|(-\s)/gi, "-");
    
                            /*
    
                            Adds the country location to the country sidebar
    
                            */
    
                            addNewLocation(currentLocation[0], countryJobArr, 0);
    
                            /*
    
                            Update individual job list item markup with country
    
                            */
    
                            var thisMarkup = individualJobMarkup.replace(/\$\{country\}/gi, countryValue.toLowerCase());
                        }
                        thisMarkup = thisMarkup.replace(/\$\{job-href\}/gi, jobHref);
                        thisMarkup = thisMarkup.replace(/\$\{job-title\}/gi, key.title);
                        thisMarkup = thisMarkup.replace(/\$\{job-data-title\}/gi, key.title.toLowerCase());
                        thisMarkup = thisMarkup.replace(/\$\{location\}/gi, key.location.name.trim());
                        thisMarkup = thisMarkup.replace(/\$\{search\}/gi, searchParameter + currentCategory.query.trim().toLowerCase());
                        return thisMarkup.replace(/\$\{category\}/gi, currentCategory.query.trim().toLowerCase());
                    });
                    jobIndividualListArr.push(currentCategoryJobs.join(""));
                }
    
                totalJobs += val.jobs.length;
                switch ( val.name ) {
                    case "Engineering":
                        engineeringJobs += val.jobs.length;
                        var currentJob = new jobFigureObj('engineering', engineeringJobs);
                        jobFigureArr.push(currentJob);
                        break;
                    case "Field Sales":
                        salesJobs += val.jobs.length;
                        var currentJob = new jobFigureObj('sales', salesJobs);
                        jobFigureArr.push(currentJob);
                        break;
                }
    
            });
    
            //console.log(jobIndividualListArr);
            $("<div/>", {
                "html" : jobIndividualListArr.join("")
            }).appendTo("#job-attach");
    
            /*
    
            Create sidebar filter
    
            */
    
            var categorySortFunction = function (arr) {
                return arr.sort(function(a, b) {
                    var textA = a.query.toUpperCase();
                    var textB = b.query.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
            };
    
            countryJobArr = categorySortFunction(countryJobArr);
            cityJobArr = categorySortFunction(cityJobArr);
            
            //Sidebar objects that are used to build out the sidebar (checklist based on categories)
            var categoryObj = new sidebarMarkupObj("Category", jobCategoryArr, "category", sidebarChecklistMarkup),
                countryObj = new sidebarMarkupObj("Country", countryJobArr, "country", sidebarChecklistMarkup),
                cityObj = new sidebarMarkupObj("City", cityJobArr, "city", sidebarChecklistMarkup),
                jobObj = new sidebarMarkupObj("Title", jobArr, "title", sidebarChecklistMarkupHidden);

            sidebarMarkupArr.push(categoryObj);
            sidebarMarkupArr.push(countryObj);
            sidebarMarkupArr.push(cityObj);
            //sidebarMarkupArr.push(jobObj);

    
            /*
    
            Swap numbers for job listing on homepage
    
            */
    
            var currentJob = new jobFigureObj('all', totalJobs);
            jobFigureArr.push(currentJob);
            $.each(jobFigureArr, function(key, val){
                swapJobFigures(val);
            });
    
            var sidebarMarkupFunc = function(arr, num) {
                if ( num < arr.length ) {
                    var categoryArr = arr[num].categoryArr;
                    var sidebarMarkup = arr[num].markup;
                    var categoryMarkup = categoryArr.map(function(key, val){
                        var currentCategoryMarkup = sidebarMarkup.replace(/\$\{value\}/gi, key.query.toLowerCase());
                        currentCategoryMarkup = currentCategoryMarkup.replace(/\$\{display\}/gi, key.query);
                        return currentCategoryMarkup.replace(/\$\{amount\}/gi, key.amount);
                    });
                    $("<ul/>", {
                        html: categoryMarkup.join("")
                    }).appendTo("#" + arr[num].appendID);
                    num++;
                    sidebarMarkupFunc(arr, num);
                }
            };
    
            sidebarMarkupFunc(sidebarMarkupArr, 0);
            jobCountUpdate(".job-list-row", ".job-list-row--active.job-list-row--filtered");
    
        });
    } // end else

    var searchExemptRemoval = function(){
        var currentURL = window.location.href;
        if ( currentURL.indexOf("?search") === -1 ) {
            $(".job-list-row").each(function(key, val){
                $(val).removeClass("job-list-row--search-exempt");
            });
        }
    };

    var filteringProcess = function() {

        var currentURL = window.location.href;

        searchExemptRemoval();

        var checkedArr = [],
            filterButtonMarkupArr = [];

        var checkedObj = function ( query ) {
            this.query = query;
            this.arr = [];
        };

        var hideJobRow = function ( arr, num, exception ) {
            if ( num < arr.length ) {
                if ( !arr.eq(num).hasClass(exception) ) {
                    arr.eq(num).removeClass("job-list-row--active");
                    arr.eq(num).removeClass("job-list-row--filtered");
                }
                num++;
                hideJobRow(arr, num, exception);
            }
        };

        var showJobRow = function ( arr, num, exception ) {
            if ( num < arr.length ) {
                if ( !arr.eq(num).hasClass(exception) ) {
                    arr.eq(num).addClass("job-list-row--active");
                    arr.eq(num).addClass("job-list-row--filtered");
                }
                num++;
                showJobRow(arr, num, exception);
            }
        };

        var initCheckboxCheck = function ( arr, num ) {
            if ( num + 1 < arr.length ) {
                if ( arr.eq(num).prop("checked") === true ) {
                    return false;
                } else {
                    num++;
                    initCheckboxCheck(arr, num);
                }
            } else {
                //invocation of hideJobRow
                hideJobRow($('.job-list-row'), 0, "job-list-row--title");
            }
        };

        var checkboxArr = $("*[type='checkbox']");

        //initCheckboxCheck(checkboxArr, 0);

        var checkboxArrCheck = function ( arr, num, comparison ) {
            if ( num < arr.length ) {
                if ( arr[num].query.trim() === comparison.query.trim() ) {
                    arr[num].arr.push(comparison.arr[0]);
                } else if ( num + 1 === arr.length && arr[num].query.trim() !== comparison.query.trim() ) {
                    checkedArr.push(comparison);
                } else {
                    num++;
                    checkboxArrCheck(arr, num, comparison);
                }
            }
        };

        var checkboxCheck = function ( arr, num ) {
            if ( num < arr.length ) {
                var checkedCheck = arr.eq(num).prop("checked");
                //console.log("arr id = " + arr.eq(num).attr("id"));
                if ( checkedCheck === true && arr.eq(num).attr("id") === undefined ) {
                    var checkboxValue = arr.eq(num).attr("value").trim(),
                        categoryCheck = arr.eq(num).parents(".item-list").attr("id").trim();
                        
                    if ( checkedArr.length > 0 ) {
                        var newCategory = new checkedObj(categoryCheck);
                        newCategory.arr.push(checkboxValue);
                        checkboxArrCheck(checkedArr, 0, newCategory);
                    } else {
                        var newCategory = new checkedObj(categoryCheck);
                        newCategory.arr.push(checkboxValue);
                        checkedArr.push(newCategory);
                    }
                }
                num++;
                checkboxCheck(arr, num);
            }
        };

        //invocation of hideJobRow
        hideJobRow($('.job-list-row'), 0, "job-list-row--title");

        //Checks for checked checkboxes
        checkboxCheck(checkboxArr, 0);

        
        var addFilterButton = function( arr, num, query ) {
            if ( num < arr.length ) {
                var filterButtonMarkup = "<span class='job-filter-button job-filter-button--${color}' data-${query}='${filter}'>${filter} <span class='job-filter-button--delete'>x</span></span>";
                if ( query === "category" ) {
                    filterButtonMarkup = filterButtonMarkup.replace(/\$\{color\}/gi, "blue");
                } else if ( query === "search" ) {
                    filterButtonMarkup = filterButtonMarkup.replace(/\$\{color\}/gi, "grey");
                } else {
                    filterButtonMarkup = filterButtonMarkup.replace(/\$\{color\}/gi, "green");
                }
                filterButtonMarkup = filterButtonMarkup.replace(/\$\{filter\}/gi, arr[num]);
                filterButtonMarkup = filterButtonMarkup.replace(/\$\{query\}/gi, query);
                filterButtonMarkupArr.push(filterButtonMarkup);
                num++;
                addFilterButton(arr, num, query);
            }
        };

        var removeFilterProcess = function( arr, num, query ) {
            if ( num < arr.length ) {
                $("*[data-" + query + "='" + arr[num] + "']").each(function(key, val){
                    if ( !$(val).eq(0).hasClass("job-list-row--search-exempt" ) ) {
                        $(val).eq(0).addClass("job-list-row--filtered");
                    }
                });
                num++;
                removeFilterProcess(arr, num, query);
            }
        };

        var additiveFilterProcess = function( arr, num, query ) {
            if ( num < arr.length ) {
                $("*[data-" + query + "='" + arr[num] + "']").each(function(key, val){
                    if ( !$(val).eq(0).hasClass("job-list-row--search-exempt" ) ) {
                        $(val).eq(0).addClass("job-list-row--active");
                    }
                });
                num++;
                additiveFilterProcess(arr, num, query);
            }
        };

        var applyFilters = function( arr, num ) {
            if ( num < arr.length ) {
                if ( num === 0 && arr.length !== 1 ) {
                    additiveFilterProcess( arr[num].arr, 0, arr[num].query );
                    addFilterButton( arr[num].arr, 0, arr[num].query );
                } else if ( num === 0 && arr[num].query === "category" && arr.length === 1 ) {
                    additiveFilterProcess( arr[num].arr, 0, arr[num].query );
                    removeFilterProcess( arr[num].arr, 0, arr[num].query );
                    addFilterButton( arr[num].arr, 0, arr[num].query );
                } else if ( num > 0 ) {
                    removeFilterProcess( arr[num].arr, 0, arr[num].query );
                    addFilterButton( arr[num].arr, 0, arr[num].query );
                } else if ( num === 0 && arr.length === 1 ) {
                    additiveFilterProcess( arr[num].arr, 0, arr[num].query );
                    removeFilterProcess( arr[num].arr, 0, arr[num].query );
                    addFilterButton( arr[num].arr, 0, arr[num].query );
                }
                num++;
                applyFilters(arr, num);
            }
            $("#job-filter-buttons").html(filterButtonMarkupArr.join(""));
        };

        if ( checkedArr.length === 0 && currentURL.indexOf("?search") === -1 ) {
            hideJobRow($('.job-list-row'), 0, "job-list-row--title");
            showJobRow($('.job-list-row'), 0, "job-list-row--title");
            $("#job-filter-buttons").html("");
        } else if ( currentURL.indexOf("?search") === -1 ) {
            applyFilters(checkedArr, 0);
        } else {
            searchProcess(currentURL);
        }

        jobCountUpdate(".job-list-row", ".job-list-row--active.job-list-row--filtered");
    };

    var searchFilteringProcess = function(search) {

        /*
        All assets that make the checkbox count work
        */

        var checkedArr = [],
            filterButtonMarkupArr = [];

        var checkboxArr = $("*[type='checkbox']");

        var checkedObj = function ( query ) {
            this.query = query;
            this.arr = [];
        };

        var checkboxArrCheck = function ( arr, num, comparison ) {
            if ( num < arr.length ) {
                if ( arr[num].query.trim() === comparison.query.trim() ) {
                    arr[num].arr.push(comparison.arr[0]);
                } else if ( num + 1 === arr.length && arr[num].query.trim() !== comparison.query.trim() ) {
                    checkedArr.push(comparison);
                } else {
                    num++;
                    checkboxArrCheck(arr, num, comparison);
                }
            }
        };

        var checkboxCheck = function ( arr, num ) {
            if ( num < arr.length ) {
                var checkedCheck = arr.eq(num).prop("checked");
                //console.log("arr id = " + arr.eq(num).attr("id"));
                if ( checkedCheck === true && arr.eq(num).attr("id") === undefined ) {
                    var checkboxValue = arr.eq(num).attr("value").trim(),
                        categoryCheck = arr.eq(num).parents(".item-list").attr("id").trim();
                    if ( checkedArr.length > 0 ) {
                        var newCategory = new checkedObj(categoryCheck);
                        newCategory.arr.push(checkboxValue);
                        checkboxArrCheck(checkedArr, 0, newCategory);
                    } else {
                        var newCategory = new checkedObj(categoryCheck);
                        newCategory.arr.push(checkboxValue);
                        checkedArr.push(newCategory);
                    }
                }
                num++;
                checkboxCheck(arr, num);
            }
        };

        var hideJobRow = function ( arr, num, exception ) {
            if ( num < arr.length ) {
                if ( !arr.eq(num).hasClass(exception) && !arr.eq(num).hasClass("job-list-row--search-exempt") ) {
                    //arr.eq(num).css({"display":"none"});
                    arr.eq(num).removeClass("job-list-row--active");
                    arr.eq(num).removeClass("job-list-row--filtered");
                }
                num++;
                hideJobRow(arr, num, exception);
            }
        };

        var showJobRow = function ( arr, num, exception ) {
            if ( num < arr.length ) {
                if ( !arr.eq(num).hasClass(exception) && !arr.eq(num).hasClass("job-list-row--search-exempt") ) {
                    //arr.eq(num).css({"display":"flex"});
                    arr.eq(num).addClass("job-list-row--active");
                    arr.eq(num).addClass("job-list-row--filtered");
                }
                num++;
                showJobRow(arr, num, exception);
            }
        };

        //invocation of hideJobRow
        hideJobRow($('.job-list-row'), 0, "job-list-row--title");

        //Checks for checked checkboxes
        checkboxCheck(checkboxArr, 0);

        var addFilterButton = function( arr, num, query ) {
            var filterButtonMarkup = "<span class='job-filter-button job-filter-button--${color}' data-${query}='${filter}'>${filter} <span class='job-filter-button--delete'>x</span></span>";
            if ( query === "category" ) {
                filterButtonMarkup = filterButtonMarkup.replace(/\$\{color\}/gi, "blue");
            } else if ( query === "search" ) {
                filterButtonMarkup = filterButtonMarkup.replace(/\$\{color\}/gi, "grey");
            } else {
                filterButtonMarkup = filterButtonMarkup.replace(/\$\{color\}/gi, "green");
            }
            if ( num < arr.length && typeof arr === "object" ) {
                filterButtonMarkup = filterButtonMarkup.replace(/\$\{filter\}/gi, arr[num]);
                filterButtonMarkup = filterButtonMarkup.replace(/\$\{query\}/gi, query);
                filterButtonMarkupArr.push(filterButtonMarkup);
                num++;
                addFilterButton(arr, num, query);
            } else if ( typeof arr === "string" ) {
                filterButtonMarkup = filterButtonMarkup.replace(/\$\{filter\}/gi, arr);
                filterButtonMarkup = filterButtonMarkup.replace(/\$\{query\}/gi, query);
                filterButtonMarkupArr.push(filterButtonMarkup);
            }
        };

        var removeFilterProcess = function( arr, num, query ) {
            if ( num < arr.length ) {
                $("*[data-" + query + "='" + arr[num] + "']").each(function(key, val){
                    if ( !$(val).eq(0).hasClass("job-list-row--search-exempt") ) {
                        $(val).eq(0).addClass("job-list-row--filtered");
                    }
                });
                num++;
                removeFilterProcess(arr, num, query);
            }
        };

        var additiveFilterProcess = function( arr, num, query ) {
            if ( num < arr.length ) {
                $("*[data-" + query + "='" + arr[num] + "']").each(function(key, val){
                    if ( !$(val).eq(0).hasClass("job-list-row--search-exempt") ) {
                        $(val).eq(0).addClass("job-list-row--active");
                    }
                });
                num++;
                additiveFilterProcess(arr, num, query);
            }
        };

        var applyFilters = function( arr, num ) {
            if ( num < arr.length ) {
                if ( num === 0 && arr.length !== 1 ) {
                    additiveFilterProcess( arr[num].arr, 0, arr[num].query );
                    addFilterButton( arr[num].arr, 0, arr[num].query );
                } else if ( num === 0 && arr[num].query === "category" && arr.length === 1 ) {
                    additiveFilterProcess( arr[num].arr, 0, arr[num].query );
                    removeFilterProcess( arr[num].arr, 0, arr[num].query );
                    addFilterButton( arr[num].arr, 0, arr[num].query );
                } else if ( num > 0 ) {
                    removeFilterProcess( arr[num].arr, 0, arr[num].query );
                    addFilterButton( arr[num].arr, 0, arr[num].query );
                } else if ( num === 0 && arr.length === 1 ) {
                    additiveFilterProcess( arr[num].arr, 0, arr[num].query );
                    removeFilterProcess( arr[num].arr, 0, arr[num].query );
                    addFilterButton( arr[num].arr, 0, arr[num].query );
                }
                num++;
                applyFilters(arr, num);
            }
            $("#job-filter-buttons").html(filterButtonMarkupArr.join(""));
        };


        var addSearchFilterButton = function( term ) {
            var filterButtonMarkup = "<span class='job-filter-button job-filter-button--grey' data-search='${filter}'>${filter} <span class='job-filter-button--delete'>x</span></span>";
            filterButtonMarkup = filterButtonMarkup.replace(/\$\{filter\}/gi, term);
            $("#job-filter-buttons").html(filterButtonMarkup);
        };

        if ( checkedArr.length === 0 ) {
            hideJobRow($('.job-list-row'), 0, "job-list-row--title");
            showJobRow($('.job-list-row'), 0, "job-list-row--title");
            $("#job-filter-buttons").html("");
            var searchSynth = search.substr(search.indexOf("?search=") + 8, search.length).replace(/\%20/gi, " ");
            addSearchFilterButton(searchSynth);
        } else {
            var searchSynth = search.substr(search.indexOf("?search=") + 8, search.length).replace(/\%20/gi, " ");
            addFilterButton(searchSynth, 0, "search");
            applyFilters(checkedArr, 0);
        }

        jobCountUpdate(".job-list-row", ".job-list-row--active.job-list-row--filtered");

    };

    /*

    When a box is checked, check which boxes are checked and which values need to be filtered

    */

    var pageLoad = false;

    //Filter loop based on URL
    var filterCategoryLoop = function (arr, num) {
        if ( num < arr.length ) {
            var checkFilters = arr[num].substr(arr[num].indexOf("=") + 1, arr[num].length).split("&");
            valueCheckboxesLoop(checkFilters, 0);
            num++;
            filterCategoryLoop(arr, num);
        }
    }

    //Value loop based on Filter Loop. This is the value being passed for filtering
    var valueCheckboxesLoop = function( arr, num ) {
        if ( num < arr.length ) {
            $("*[value='" + arr[num].replace(/%20/gi, " ").toLowerCase() + "']").eq(0).prop("checked", true);
            num++;
            valueCheckboxesLoop(arr, num);
        }
    };

    var checkForFilterURL = function( passedURL ) {
        if ( passedURL.indexOf("?filter=true;") !== -1 ) {
            //Shorten URL to only filters
            var newURL = passedURL.substr(passedURL.indexOf("?filter=true;") + 13, passedURL.length);

            //Split URL into array of filters
            var checkCategory = newURL.substr(0, newURL.length).split(";");

            //Loop through filters
            filterCategoryLoop(checkCategory, 0);
            filteringProcess();
        }
    };

    var checkCheckboxLoop = function(passedURL) {
        if ( pageLoad === false && ( passedURL.indexOf("?filter=true;") !== -1 || passedURL.indexOf("?search") !== -1 ) ) {
            var checkBoxCheck = $("*[type='checkbox']").length;
            ( checkBoxCheck > 0 ) ? pageLoad = true : pageload = false;
            setTimeout(function(){
                checkCheckboxLoop(passedURL);
            }, 500);
        } else if ( pageLoad === true && passedURL.indexOf("?filter=true;") !== -1 ) {
            checkForFilterURL(passedURL);
        } else if ( pageLoad === true && passedURL.indexOf("?search") !== -1 ) {
            searchProcess(currentURL);
        }
    };

    checkCheckboxLoop(currentURL);

    var searchProcess = function(search) {

        var searchSynth = search.substr(search.indexOf("?search=") + 8, search.length).replace(/\%20/gi, " ");
        searchSynth = decodeURIComponent(searchSynth);
        //Selects all jobs from jobs list
        var allJobs = $('.job-list-row');

        //Create regular expression from the search term
        var regExp = new RegExp(searchSynth,'gi');

        console.log("searchSynth = " + searchSynth);

        var addFilterButton = function( term ) {
            var filterButtonMarkup = "<span class='job-filter-button job-filter-button--grey' data-search='${filter}'>${filter} <span class='job-filter-button--delete'>x</span></span>";
            filterButtonMarkup = filterButtonMarkup.replace(/\$\{filter\}/gi, term);
            $("#job-filter-buttons").html(filterButtonMarkup);
        };

        var addHiddenCheckbox = function (term) {
            var sidebarChecklistMarkupHidden = "<li style='display:none;'><span class='item-title-checkbox'>"
            + "<input name='${value}' value='${value}' type='checkbox' checked />"
            + "<label>${display}</label>"
            + "</span>"
            + "<span class='item-amount'><span class='item-amount-container'>${amount}</span></span></li>";

            var searchObj = new sidebarMarkupObj("Search", term, "search", sidebarChecklistMarkupHidden);
        
            var sidebarMarkupFunc = function(obj) {
                var sidebarMarkup = obj.markup;
                var currentCategoryMarkup = sidebarMarkup.replace(/\$\{value\}/gi, obj.categoryArr.toLowerCase());
                currentCategoryMarkup = currentCategoryMarkup.replace(/\$\{display\}/gi, obj.categoryArr);
                currentCategoryMarkup.replace(/\$\{amount\}/gi, 1);
                $("<ul/>", {
                    html: currentCategoryMarkup
                }).appendTo("#search");
            };

            sidebarMarkupFunc(searchObj);
        };

        addFilterButton(searchSynth);
        //addHiddenCheckbox(searchSynth);

        $.each(allJobs, function(key, val){
            var currentJobCheck = $(val).attr("data-search");
            if ( regExp.test(currentJobCheck) === true ) {
                $(val).addClass("job-list-row--filtered");
            } else if ( regExp.test(currentJobCheck) === false ) {
                $(val).removeClass("job-list-row--filtered");
                $(val).addClass("job-list-row--search-exempt");
            }
        });

        //Updates "Displaying x Entries"
        jobCountUpdate(".job-list-row", ".job-list-row--active.job-list-row--filtered");
    };


    //window.location.href = window.location.href + "?filter=true;category=Engineering;city=San%20Francisco;country=United&20States";

    /*
    
    Actions/interactions
    
    */


    $(document).on("submit", "#career-search-form", function(e){

        e.preventDefault();

        var currentURL = window.location.href;
        var baseURL = currentURL.substr(0, currentURL.indexOf(".com") + 4);
        window.location.href = baseURL + "/job-listing/?search=" + $("#form-field-name").val().trim();
        
        //searchProcess($("#form-field-name"));
    });

    $(document).on("click", "*[type='checkbox']", function(e) {
        var currentURL = window.location.href;
        if ( currentURL.indexOf("?search") === -1 ) {
            filteringProcess();
        } else {
            searchFilteringProcess(currentURL);
        }
    });

    $(document).on("click", ".job-filter-button", function(e) {
        e.preventDefault();
        $.each($(this).data(), function(key, val){
            if ( key.trim() !== "search" ) {
                $("#" + key).find("*[value='" + val + "']").prop("checked", false);
            } else {
                history.pushState(null, null, "/job-listing/");
            }
        });
        var currentURL = window.location.href;
        if ( currentURL.indexOf("?search") === -1 ) {
            filteringProcess();
        } else {
            searchFilteringProcess(currentURL);
        }
    });

    var allImages=$("img");
    var alliFrames=$("iframe");

    var dataSrcToSrc = function(arr, num) {
      if ( num < arr.length ) {
        if ( parseFloat( $(window).scrollTop() + window.innerHeight ) > arr.eq(num).offset().top - 200 && arr.eq(num).attr('src') === undefined ) {
            var src = arr.eq(num).attr("data-src");
            arr.eq(num).attr('src', src);
            arr.eq(num).css("opacity", "1");
        }
        num++;
        dataSrcToSrc(arr, num);
      }
    };

    /*background image replace*/

    var dataBgSrctoBgImg = function( arr, num, applyTo ) {
        if ( num < arr.length) {
            if ( parseFloat( $(window).scrollTop() + window.innerHeight ) > arr.eq(num).offset().top - 200 ) {
                var backgroundSrc = arr.eq(num).attr("data-src");
                if ( typeof applyTo !== "undefined") {
                    arr.eq(num).find(applyTo).css({
                        "background-image":"url("+backgroundSrc+")",
                        "background-position":"background-position",
                        "background-size":"cover"
                    });
                } else {
                    arr.eq(num).css({
                        "background-image":"url("+backgroundSrc+")",
                        "background-position":"background-position",
                        "background-size":"cover"
                    });
                }
            }
            num++;
            dataBgSrctoBgImg(arr, num, applyTo);
        }
    };


    dataSrcToSrc(allImages, 0);
    dataSrcToSrc(alliFrames, 0);
    dataBgSrctoBgImg($(".flip-card-front"), 0, ".elementor-flip-box__front");
    dataBgSrctoBgImg($(".background-image-elements"), 0);

    var today = new Date();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    console.log("Script update October 22nd, 2019");

    $(window).scroll( function() {
        //console.log("window scrolled");
        var allImages=$("img");
        var alliFrames=$("iframe");
        dataSrcToSrc(allImages, 0);
        dataSrcToSrc(alliFrames, 0);
        dataBgSrctoBgImg($(".flip-card-front"), 0, ".elementor-flip-box__front");
        dataBgSrctoBgImg($(".background-image-elements"), 0);
    });


    /*
    
    Search Auto-Fill: work on to make functional soon

    $(document).on("input", "#form-field-name", function(e){
        var regExp = new RegExp($("#form-field-name").val(),'gi');
        $.ajax({url:"https://boards-api.greenhouse.io/v1/boards/anaplan/departments/"})
        .done(function(data){
            $.each(data.departments, function(key,val){
                console.log(val);
            });
        })
        .error(function(){
            console.log('Error with ajax request. URL not valid.');
        });
        console.log($("#form-field-name").val());
    });

    */

});