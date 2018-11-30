jQuery(document).ready(function($){
    /*

    All Global Constructive Objects

    */

    var sidebarMarkupObj = function(title, categoryArr, appendID, markup) {
        this.title = title;
        this.categoryArr = categoryArr;
        this.appendID = appendID;
        this.markup = markup;
    };
    var listItemObj = function(title, type, location) {
        this.title = title;
        this.type = type;
        this.location = location;
    };
    var jobFigureObj = function(query, amount) {
        this.query = query;
        this.amount = amount;
    };

    var swapJobFigures = function(jobObj){
        $('*[data-job-type="' + jobObj.query + '"]').html(jobObj.amount);
    };

    var sidebarMarkupArr = [];

    $.getJSON("https://boards-api.greenhouse.io/v1/boards/anaplan/departments/", function(data){
        var totalJobs = 0,
            engineeringJobs = 0,
            salesJobs = 0;

        var jobFigureArr = [],
            countryJobArr = [],
            cityJobArr = [],
            jobCategoryArr = [];

        var sidebarChecklistMarkup = "<li><span class='item-title-checkbox'>"
        + "<input name='${value}' value='${value}' type='checkbox' />"
        + "<label>${value}</label>"
        + "</span>"
        + "<span class='item-amount'><span class='item-amount-container'>${amount}</span></span></li>";

        var countryKey = ["Australia", "Belgium", "Canada", "Germany", "France", "United Kingdom", "India", "Japan", "Philippines", "Sweden", "Singapore", "US"];
        var cityKey = ["Atlanta", "Boston", "Chicago"];
        $.each(data.departments, function(key,val){
            console.log(val);

            /*

                swapJobFigures support
                pass value name and calculate total number of jobs

            */

            if ( val.jobs.length > 0 ) {
                var currentCategory = new jobFigureObj( val.name, val.jobs.length );
                jobCategoryArr.push( currentCategory);
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

            /*

                Create sidebar filter

            */

        });

        var categoryObj = new sidebarMarkupObj("Category", jobCategoryArr, "category", sidebarChecklistMarkup);


        sidebarMarkupArr.push(categoryObj);

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
                    var currentCategoryMarkup = sidebarMarkup.replace(/\$\{value\}/gi, key.query);
                    return currentCategoryMarkup.replace(/\$\{amount\}/gi, key.amount);
                });
                /*console.log("categoryMarkup");
                console.log(categoryMarkup);*/
                $("<ul/>", {
                    html: categoryMarkup.join("")
                }).appendTo("#" + arr[num].appendID);
                num++;
                sidebarMarkupFunc(arr, num);
            }
        };

        sidebarMarkupFunc(sidebarMarkupArr, 0);
        /*
        var jobCategoryMarkup = jobCategoryArr.map(function(key, val){
            var currentCategoryMarkup = sidebarChecklistMarkup.replace(/\$\{value\}/gi, key.query);
            return currentCategoryMarkup.replace(/\$\{amount\}/gi, key.amount);
        });
        console.log("jobCategoryMarkup");
        console.log(jobCategoryMarkup);
        
        $("<ul/>", {
            html: jobCategoryMarkup.join("")
        }).appendTo("#category");*/
    });
    $.getJSON("https://boards-api.greenhouse.io/v1/boards/anaplan/offices/", function(data){
        console.log(data);
        $.each(data.offices, function(key,val){
            var check = false;
            var totalJobs = 0;
            $.each(val.departments, function(key, val){
                if ( val.jobs.length > 0 ) {
                    check = true;
                }
                //console.log(val.jobs.length);
            });
            //console.log("Jobs checked");
            if ( check === true ) {
                console.log(val.name);
            }
            //console.log(val.name);
        });
    });

    /*

    When a box is checked, check which boxes are checked and which values need to be filtered

    */

    $(document).on("click","*[type='checkbox']", function(e){
        var checkboxArr = $("*[type='checkbox']");
        var checkboxCheck = function ( arr, num ) {
            if ( num < arr.length ) {
                var checkedCheck = arr.eq(num).prop("checked");
                if ( checkedCheck === true ) {
                    var checkboxValue = arr.eq(num).attr("value");
                    var categoryCheck = arr.eq(num).parents(".item-list").attr("id");
                }
                num++;
                checkboxCheck(arr,num);
            }
        };
    });
});