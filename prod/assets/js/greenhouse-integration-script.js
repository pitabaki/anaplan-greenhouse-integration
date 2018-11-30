jQuery(document).ready(function($){
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
    $.getJSON("https://boards-api.greenhouse.io/v1/boards/anaplan/departments/", function(data){
        var totalJobs = 0,
            engineeringJobs = 0,
            salesJobs = 0;

        var jobFigureArr = [],
            countryJobArr = [],
            cityJobArr = [];

        var countryKey = ["Australia", "Belgium", "Canada", "Germany", "France", "United Kingdom", "India", "Japan", "Philippines", "Sweden", "Singapore", "US"];
        var cityKey = ["Atlanta", "Boston", "Chicago"];
        $.each(data.departments, function(key,val){

            /*

                swapJobFigures support
                pass value name and calculate total number of jobs

            */

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
        var currentJob = new jobFigureObj('all', totalJobs);
        jobFigureArr.push(currentJob);
        $.each(jobFigureArr, function(key, val){
            swapJobFigures(val);
        });
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
});