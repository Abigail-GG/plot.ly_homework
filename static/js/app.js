function plots(id){
    d3.json("../data/samples.json").then(sampledata => {

        console.log(sampledata)
        
        var otuIds = sampledata.samples[0].otu_ids;
        console.log(otuIds)
        
        var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        
        var sampleValues2 = sampledata.samples[0].sample_values;
      
        var otuLabels = sampledata.samples[0].otu_labels.slice(0,10).reverse();
        console.log(otuLabels)
        
        var otuLabels2 = sampledata.samples[0].otu_labels;
      
        var topOtuIds = sampledata.samples[0].otu_ids.slice(0,10).reverse();
      
        var otuIdLabels = topOtuIds.map(d => "OTU " + d);
        console.log(otuIdLabels)
      
        // Bar chart
        var trace1 = {
            x: sampleValues,
            y: otuIdLabels,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };
        
        var data = [trace1];
        var layout = {
            title: "Top 10 OTUs",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
      
        // Create bar plot
        Plotly.react("bar", data, layout);
      
        // Bubble plot
      
        var trace2 = {
            x: otuIds,
            y: sampleValues2,
            text:otuLabels2,
            mode: 'markers',
            marker: {
                size: sampleValues2,
                color: otuIds
            }
        }
      
        var data = [trace2];
        var layout = {
          title: 'Bubble Chart',
          showlegend: false,
          height: 500,
          width: 1200
        }
      
        Plotly.react("bubble", data, layout);

});
};
function getInfo(id){

    d3.json("../data/samples.json").then((data)=>{
        var metadata = data.metadata;
        console.log(metadata);
        var result = metadata.filter(metadataInfo => metadataInfo.id.toString() === id)[0];
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

function optionChanged(id) {
    plots(id);
    getInfo(id);
}

function init() {
    var dropdown = d3.select("#selDataset");

    d3.json("../data/samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        plots(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();



