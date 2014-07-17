$(function () {
        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Weekly "On Time" Report'
            },
            subtitle: {
                text: 'Week of July 7, 2014'
            },
            xAxis: {
                categories: [
                    'Scaffolding',
                    'Mobilization',
                    'Painting',
                    'Carpentry',
                    'Masonry',
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: '# of Stickies'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Late',
                data: [1, 0, 4, 2, 1]
    
            }, {
                name: 'On Time',
                data: [3, 1, 6, 6, 4]
    
            }, {
                name: 'Early',
                data: [1, 0, 1, 0, 1]
            }]
        });
    });
    