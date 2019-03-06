(function() {

  var commission_sex = [
    { key: "Male", color: '#aaa', values: [
      [2010, 4],
      [2011, 7],
      [2012, 2],
      [2013, 2],
      [2014, 3],
      [2015, 1],
      [2016, 0]
    ] },
    { key: "Altersex", color: '#ccc', values: [
      [2010, 0],
      [2011, 3],
      [2012, 4],
      [2013, 0],
      [2014, 0],
      [2015, 0],
      [2016, 0]
    ] },
    { key: "Genderless", color: '#fff', values: [
      [2010, 0],
      [2011, 0],
      [2012, 4],
      [2013, 14],
      [2014, 18],
      [2015, 6],
      [2016, 1]
    ] },
    { key: "MtF", color: '#666', values: [
      [2010, 0],
      [2011, 0],
      [2012, 0],
      [2013, 0],
      [2014, 0],
      [2015, 36],
      [2016, 24]
    ] },
    { key: "Female", color: '#44', values: [
      [2010, 0],
      [2011, 1],
      [2012, 0],
      [2013, 1],
      [2014, 1],
      [2015, 17],
      [2016, 14]
    ] }
  ];

  var commission_sex_chart;
  nv.addGraph(function() {
    commission_sex_chart = nv.models.stackedAreaChart()
      .useInteractiveGuideline(true)
      .x(function(d) { return d[0] })
      .y(function(d) { return d[1] })
      .showControls(false)
      .style('expand')
      .interpolate('monotone')
      .pointActive(function() { return false; })
      .duration(300);
    commission_sex_chart.yAxis.tickFormat(d3.format(',.4f'));
    d3.select('#commission_sex_chart')
      .datum(commission_sex.reverse())
      .transition().duration(1000)
      .call(commission_sex_chart)
      .each('start', function() {
        setTimeout(function() {
          d3.selectAll('#commission_sex_chart *').each(function() {
            if(this.__transition__)
            this.__transition__.duration = 1;
          })
        }, 0)
      });
    nv.utils.windowResize(commission_sex_chart.update);
    d3.select('#commission_sex_chart .nv-area-2')
      .style("fill", "url(#diagonal-stripe-1)")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", 150)
      .attr("width", 150);
    return commission_sex_chart;
  });

  var raw_alignments = [
    //Cisgender	Non-cisgender	It's complicated
    { key: "Masculine", values: [
      ["Cisgender", 2290],
      ["Non-cisgender", 94],
      ["It's complicated", 68]
    ] },
    { key: "Feminine", values: [
      ["Cisgender", 366],
      ["Non-cisgender", 94],
      ["It's complicated", 28]
    ] },
    { key: "Other", values: [
      ["Cisgender", 24],
      ["Non-cisgender", 116],
      ["It's complicated", 114]
    ] }
  ];
  var n = 0;
  var sexes = [{
    key: "Sexes",
    values: raw_alignments.map(function(d, i) {
      var total = d.values[0][1] + d.values[1][1] + d.values[2][1];
      n += total;
      return {
          label: d.key,
          color: ['#444', '#666', '#888'][i],
          value: total
        }
      })
    }];
  var alignments = [
    {
      key: "Cisgender",
      values: raw_alignments.map(function(sex, i) {
        return {
          x: sex.key,
          y: sex.values[0][1] /
            (sex.values[0][1] + sex.values[1][1] + sex.values[2][1]) * 100
        };
      })
    },
    {
      key: "Non-cisgender",
      values: raw_alignments.map(function(sex, i) {
        return {
          x: sex.key,
          y: sex.values[1][1] /
            (sex.values[0][1] + sex.values[1][1] + sex.values[2][1]) * 100
        };
      })
    },
    {
      key: "It's complicated",
      values: raw_alignments.map(function(sex, i) {
        return {
          x: sex.key,
          y: sex.values[2][1] /
            (sex.values[0][1] + sex.values[1][1] + sex.values[2][1]) * 100
        };
      })
    },
  ];


  var alignments_chart_sexes, alignments_chart_alignments;
  nv.addGraph(function() {
    var alignments_chart_sexes = nv.models.discreteBarChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .showYAxis(false)
        .showValues(true)
        .valueFormat(function(d) {
          return (d / n * 100).toFixed(1) + '%';
        })
        .duration(250);
    d3.select('#alignments_chart_sexes')
        .datum(sexes)
        .call(alignments_chart_sexes);
    nv.utils.windowResize(alignments_chart_sexes.update);
    return alignments_chart_sexes;
  });

  nv.addGraph(function() {
      var alignments_chart_alignments = nv.models.multiBarChart()
        .duration(350)
        .reduceXTicks(true)
        .showYAxis(false)
        .rotateLabels(0)
        .stacked(true)
        .showControls(false)
        .color(['#444', '#888', '#ccc'])
        .groupSpacing(0.1);

      d3.select('#alignments_chart_alignments')
          .datum(alignments)
          .call(alignments_chart_alignments);

      nv.utils.windowResize(alignments_chart_alignments.update);

      return alignments_chart_alignments;
  });

})();
