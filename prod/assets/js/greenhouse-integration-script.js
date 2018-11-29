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
        $('*[data-job-type="all"]').html(totalJobs);
        $('*[data-job-type="engineering"]').html(engineeringJobs);
        $('*[data-job-type="sales"]').html(salesJobs);
    });
});