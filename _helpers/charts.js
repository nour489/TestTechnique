let builder = {};

builder.createChart = async function(type, labels, data, title, colors, networkLabels) {
  // type should be (bar,pie ...)
  // labels should be an array of strings,
  // data should be an array of arrays of numbers
  const width = 300; //px
  const height = 300; //px
  const backgroundColour = 'white'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp

  let datasets = [];
  for (const dataset in data) {

    datasets.push({
      label: labels[dataset],
      data: data[dataset],
      backgroundColor: colors[dataset] || [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',

      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',

      ],
      borderWidth: 1
    })
  }
  const {
    ChartJSNodeCanvas
  } = require('chartjs-node-canvas');
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    backgroundColour
  });

  const configuration = {
    type: type,
    data: {
      labels: networkLabels || labels,
      datasets: datasets
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: title || '',
          padding: {
            top: 10,
            bottom: 30
          }
        }
      }
    }
  };
  const image = await chartJSNodeCanvas.renderToBuffer(configuration);

  return image;
  // coverageSheet.addImage({
  //
  //   image: image,
  //
  //   type: 'picture',
  //
  //   position: {
  //     type: 'absoluteAnchor',
  //     x: '1in',
  //     y: '2in',
  //   },
  //  });



}


module.exports = builder;
