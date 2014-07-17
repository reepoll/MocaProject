$(function () {

    Highcharts.data({
        csv: document.getElementById('tsv').innerHTML,
        itemDelimiter: '\t',
        parsed: function (columns) {

            var PPCs = {},
                PPCsData = [],
                subcontractors = {},
                drilldownSeries = [];
            
            // Parse percentage strings
            columns[1] = $.map(columns[1], function (value) {
                if (value.indexOf('%') === value.length - 1) {
                    value = parseFloat(value);
                }
                return value;
            });

            $.each(columns[0], function (i, name) {
                var PPC,
                    subcontractor;

                if (i > 0) {

                    // Remove special edition notes
                    name = name.split(' -')[0];

                    // Split into PPC and subcontractor
                    subcontractor = name.match(/([0-9]+[\.0-9x]*)/);
                    if (subcontractor) {
                        subcontractor = subcontractor[0];
                    }
                    PPC = name.replace(subcontractor, '');

                    // Create the main data
                    if (!PPCs[PPC]) {
                        PPCs[PPC] = columns[1][i];
                    } else {
                        PPCs[PPC] += columns[1][i];
                    }

                    // Create the week data
                    if (subcontractor !== null) {
                        if (!subcontractors[PPC]) {
                            subcontractors[PPC] = [];
                        }
                        subcontractors[PPC].push(['Week ' + subcontractor, columns[1][i]]);
                    }
                }
                
            });

            $.each(PPCs, function (name, y) {
                PPCsData.push({ 
                    name: name, 
                    y: y/6,
                    drilldown: subcontractors[name] ? name : null
                });
            });
            $.each(subcontractors, function (key, value) {
                drilldownSeries.push({
                    name: key,
                    id: key,
                    data: value
                });
            });

            // Create the chart
            $('#container').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'PPC'
                },
                subtitle: {
                    text: 'Click the columns to view subcontractors'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'PPC'
                    },
                    labels: {
                        format: '{value} %'
                    },
                    max: 100
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> <br/>'
                }, 

                series: [{
                    name: 'PPCs',
                    colorByPoint: true,
                    data: PPCsData
                }],
                drilldown: {
                    series: drilldownSeries
                }
            })

        }
    });
});
    
