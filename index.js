

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
 .domain([1993,2016])
 .range([200, w]);

 
 const yscale = d3.scaleTime()
 .domain(
  d3.extent(json, function (d) {
    return d.Time;
  })
)
 .range([10, h])




 
 const svgarea = d3.select("body")
 .append("svg")
 .attr("id", "svgarea")
 .attr("width", w+20)
 .attr("height", h+50);


svgarea.selectAll("circle")
       .data(json)
       .enter()
       .append("circle")
       .attr("class","dot")
       .attr("data-yvalue", d => d.Time)
       .attr("data-xvalue", d => d.Year)
       .attr("r", 5)
       .attr('index', (d, i) => i)
       .attr('cx', (d) => xscale(d.Year))
       .attr('cy', (d) => yscale(d.Time))
       



   
            var xAxis = d3.axisBottom(xscale).tickFormat(d3.format("d"));
     
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


           var tooltip = d3.select("body")
           .append("div")
           .style("position", "absolute")
           .style("visibility", "hidden")
           .attr("id","tooltip")
           

           d3.selectAll(".dot")
           
           .on("mouseover", function(event, d){
           let dataxvalue =  this.getAttribute("data-xvalue")
           return tooltip
            .style("visibility", "visible")
            .attr("data-year", dataxvalue)
            .html(d.Name + "<br/>" + d.Nationality + "<br/>" + d.Year + "<br/>" + d.Time+ "<br/>" + d.Doping)})

            .on("mousemove", function(event, d){
              var i = this.getAttribute('index');
             
              return tooltip
              .style('left', (i*5)  +"px")
              .style('top', h- (d[1])+50 +"px")
            })


           .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


}