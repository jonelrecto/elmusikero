<template>
  <q-page>
    <div id="reportPage">
      <div id="chartContainer">
        <pie-chart id="chart1" :data="[['Blueberry', 266], ['Strawberry', 23]]"></pie-chart>
      </div>
      <p>aldfjklaskdf</p>
      <div>
        <line-chart :data="{'2017-01-01': 11, '2017-01-02': 6}"></line-chart>
      </div>
      
    </div>
    
    <q-btn label="test" @click="test"></q-btn>
  </q-page>
</template>
<script>
import $ from 'jquery'
import jsPDF from 'jspdf'

var doc = new jsPDF();

export default {
  // components: {
  //   LineChart
  // }
  methods: {
    test () {
      // get size of report page
      var reportPageHeight = $('#reportPage').innerHeight();
      var reportPageWidth = $('#reportPage').innerWidth();
      
      // create a new canvas object that we will populate with all other canvas objects
      var pdfCanvas = $('<canvas />').attr({
        id: "canvaspdf",
        width: reportPageWidth,
        height: reportPageHeight
      });
      
      
      // keep track canvas position
      var pdfctx = $(pdfCanvas)[0].getContext('2d');
      var pdfctxX = 0;
      var pdfctxY = 0;
      var buffer = 100;
      
      // for each chart.js chart
      $("canvas").each(function(index) {
        // get the chart height/width
        var canvasHeight = $(this).innerHeight();
        var canvasWidth = $(this).innerWidth();
        
        // draw the chart into the new canvas
        pdfctx.drawImage($(this)[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
        pdfctxX += canvasWidth + buffer;
        
        // our report page is in a grid pattern so replicate that in the new canvas
        if (index % 2 === 1) {
          pdfctxX = 0;
          pdfctxY += canvasHeight + buffer;
        }
      })
      console.log(pdfCanvas[0], 'canvas')
      // create new pdf and add our new canvas as an image
      var pdf = new jsPDF();
      pdf.addHTML($('#reportPage')[0], 0, 0);
      
      // download the pdf
      pdf.save('filename.pdf');
    }
  }
}
</script>