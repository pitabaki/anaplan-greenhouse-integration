jQuery(document).ready(function($){

    $.getJSON("https://boards-api.greenhouse.io/v1/boards/anaplan/departments/", function(data){
        var totalJobs = 0,
            engineeringJobs = 0,
            salesJobs = 0;
        $.each(data.departments, function(key,val){
            //console.log(val.name + " has " + val.jobs.length + " jobs");
            totalJobs += val.jobs.length;
            switch ( val.name ) {
                case "Engineering":
                    engineeringJobs += val.jobs.length;
                    break;
                case "Field Sales":
                    salesJobs += val.jobs.length;
                    break;
            }
        });
        console.log("totalJobs = " + totalJobs);
        console.log("engineeringJobs = " + engineeringJobs);
        console.log("salesJobs = " + salesJobs);
    });
});