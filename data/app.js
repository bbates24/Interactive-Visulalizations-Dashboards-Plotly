//grab the overall data and save to variable called d
let d =  d3.json("samples.json").then( data => {
    return data;
})

//populate the dropdown using the data
d.then(data => {
    console.log("data is",data);
    console.log("data names",data.names);

    let sel = document.getElementById('selDataset');
    let nameID = data.names;
    console.log("nameID", nameID);
    for (let i = 0; i < nameID.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = nameID[i];
        opt.value = nameID[i];
        sel.appendChild(opt);
    }
})

//changing the option in the select will render the corresponding graph
function optionChanged(filterData){

    d.then(d => {
        //metadata
        console.log("metadata", d.metadata);
        console.log("samples", d.samples);
        console.log("metadata-find", d.metadata.find(x => String(x.id) === filterData));

        let meta = document.getElementById('sample-metadata');
        meta.innerHTML = '';
        let mData = d.metadata.find(x => String(x.id) === filterData);

        let div = document.createElement('div');
        let br = document.createElement('br');
        let hr = document.createElement('hr');

        for (let key in mData){
            console.log( key, mData[key]);

            let span1 = document.createElement('span');
            let span2 = document.createElement('span');



            span1.innerHTML = key + " : ";
            span2.innerHTML = mData[key] + "<br>";
            //div.innerHTML = "<span>"

            div.append(span1);
            div.append(span2);
        }
        meta.append(div);
        meta.append(br);
        meta.append(hr);

        //bar chart
        console.log("chartData",d.samples.find(x => x.id === filterData));
        console.log("filterData", filterData);
        let chartData = d.samples.find(x => x.id === filterData);
        console.log("chartdata.samples", chartData.sample_values);
        let data_chart = [{
            type: 'bar',
            x: chartData.sample_values.slice(0,10),
            y: chartData.otu_ids.slice(0,10),
            text: chartData.otu_labels.slice(0,10),
            orientation: 'h'
        }];
        let layout = {
            autosize: true,
            width: 500,
            height: 1500
        };

        Plotly.newPlot('bar', data_chart, layout);


        //start bubble graph
        let data_chart2 = [{
            x: chartData.otu_ids,
            y: chartData.sample_values,
            text: chartData.otu_labels,
            mode: 'markers',
            marker: {
                size: chartData.sample_values,
                color: chartData.otu_ids
            }
        }];
        let layout2 = {
            autosize: false,
            width: 800,
            height: 1500
        };
        Plotly.newPlot('bubble', data_chart2, layout2);



    })


}
/*d3.json("samples.json").then( data => {


})

d3.json("samples.json").then( data => {
    console.log("testy",data);
    console.log("testx",data.samples[0].otu_ids);
    let data_chart = [{
        type: 'bar',
        x: data.samples[0].sample_values,
        y: data.samples[0].otu_ids,
        text: data.samples[0].otu_labels,
        orientation: 'h'
    }];
    let layout = {
        autosize: false,
        width: 500,
        height: 1500
    };

    Plotly.newPlot('bar', data_chart, layout);
})*/
/*
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
      console.log("this is the data", data)
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];

      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;

      // Create Horizontal Bar Chart
      var data = [{
          type: 'bar',
          text: 'hovertext',
          x: ['sample_values'],
          y: ['otu_ids'],
          orientation: 'h'
      }];

      Plotly.newPlot('bar', data);

      var trace2 = {
          x: x_data,
          y: y_data,
          text: hoverText,
          mode: 'markers',
          marker: {
              size: y_data,
              color: x_data
          }
      };

      // Build a Bubble Chart
      var bubbleLayout = {
          title: "Bacteria Cultures Per Sample",
          margin: {t: 0},
          hovermode: "closest",
          xaxis: {title: "OTU ID"},
          margin: {t: 30}
      };
      var bubbleData = [
          {
              x: otu_ids,
              y: sample_values,
              text: otu_labels,
              mode: "markers",
              marker: {
                  size: sample_values,
                  color: otu_ids,
                  colorscale: "Earth"
              }
          }
      ];

      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  }
  */
