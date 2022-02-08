let json=[]

const req = new XMLHttpRequest();
req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',true);
req.send();
req.onload = function(){
 json = (JSON.parse(req.responseText));
 // let stringed=  JSON.stringify(json.data);
  // let dataset = json.data
 
 console.log(json)


 
 json.forEach(function (d) {
  var parsedTime = d.Time.split(':');
  d.Time = new Date(2010, 8, 4, 0, parsedTime[0], parsedTime[1]);
});
 
 const w = 900;
 const h = 500;

 


 const xscale = d3.scaleLinear()
    .domain([1992,2015])
    .range([200, w]);

const yscale = d3.scaleTime()
   .domain(
    d3.extent(json, function (d) {
      return d.Time;
    })
  )
   .range([0, h])
   




 
 const svgarea = d3.select("body")
 .append("svg")
 .attr("width", w+20)
 .attr("height", h+50);

svgarea.selectAll("circle")
       .data(json)
       .enter()
       .append("circle")
       .attr("class","dot")
       .attr("data-yvalue", d => d.Time)
       .attr("data-xvalue", d => d.Year)
       .attr("r", 4)
       .attr('cx', (d) => xscale(d.Year))
       .attr('cy', (d) => yscale(d.Time))



   
   const xAxis = d3.axisBottom(xscale);
     
        svgarea.append("g")
           .attr("transform", "translate(00," + h + ")")
           .call(xAxis)
           .attr("id", "x-axis")

           var timeFormat = d3.timeFormat('%M:%S');
           var yAxis = d3.axisLeft(yscale).tickFormat(timeFormat);
     
        svgarea.append("g")
           .attr("transform", "translate("+200+", 0)")
           .call(yAxis)
           .attr("id", "y-axis")


}