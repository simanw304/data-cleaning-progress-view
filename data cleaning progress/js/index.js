
var chart;
AmCharts.loadFile( "data.csv", {}, function( response ) {

  /**
   * Parse CSV
   */
  var data = AmCharts.parseCSV( response, {
    "delimiter": ";",
    "useColumnNames": true,
    "skip": 1
  } );
  
  console.log(data);

  /**
   * Create the chart
   */
  chart = AmCharts.makeChart( "chartdiv", {
    "type": "serial",
    "theme": "light",
    "dataProvider": data,
    "valueAxes": [ {
      "gridColor": "#FFFFFF",
      "gridAlpha": 0.2,
      "dashLength": 0,
      "title": "Size",
      "position": "left"
    } ],
    "gridAboveGraphs": true,
    "startDuration": 1,
    "graphs": [ {
      "balloonText": " <b>[[value]]</b>",
      "fillAlphas": 0.5,
      "lineAlpha": 0.2,
      "type": "line",
      "valueField": "size"
    } ],
    "chartScrollbar": {},

    "chartCursor": {
      "cursorPosition": "mouse",
      "selectWithoutZooming": true,
    },
    "categoryField": "time",
    "categoryAxis": {
      "labelRotation": 90,
      "gridPosition": "start",
      "gridAlpha": 0,
      "tickPosition": "start",
      "tickLength": 20,
      "title": "Time",
    },
    "zoomOutOnDataUpdate": false,
    "listeners": [{
        "event": "init",
        "method": function(e) {

          //add click event on the plot area
          e.chart.chartDiv.addEventListener("click", function() {
            //track cursor's last known position
            if (e.chart.lastCursorPosition !== undefined) {
              //get the category value of the last known cursor position
              var temp = e.chart.dataProvider[e.chart.lastCursorPosition][e.chart.categoryField];
              //add a new guide
                var guide = new AmCharts.Guide();
                guide.category = temp;
                guide.lineAlpha = 1;
                guide.lineColor = "#CC0000";
                guide.fillAlpha = 0.2;
                guide.fillColor = "#CC0000";
                guide.dashLength = 2;
                //guide balloon text
                guide.balloonText = "hello";
                e.chart.categoryAxis.addGuide( guide );
              e.chart.validateData();
            }
          })
        }
      }, {
        "event": "changed",
        "method": function(e) {
          e.chart.lastCursorPosition = e.index;
        }
      }]
  });
});
//button functions
function run(){
  var l = chart.categoryAxis.guides.length;
  chart.categoryAxis.guides[l-1].label = "selected";
  chart.categoryAxis.guides[l-1].inside = true;
  chart.validateNow();
}
function run2(){
}
function run3(){
  chart.categoryAxis.guides.pop();
  chart.validateNow();
}