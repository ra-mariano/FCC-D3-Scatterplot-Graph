let json=[]

const req = new XMLHttpRequest();
req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',true);
req.send();
req.onload = function(){
 json = (JSON.parse(req.responseText));
 // let stringed=  JSON.stringify(json.data);
  // let dataset = json.data
 
 console.log(json[0])

 
 const w = 900;
 const h = 500;

 


 const xscale = d3.scaleLinear()
    .domain([1994,2015])
    .range([0, w]);

const yscale = d3.scaleLinear()
   .domain([0, 18064.7])
   .range([h, 0])




 
 const svgarea = d3.select("body")
 .append("svg")
 .attr("width", w)
 .attr("height", h+50);

svgarea.selectAll("circle")
       .data(json)
       .enter()
       .append("circle")
       .attr("id","dot")
       .attr("data-yvalue", d => d.Time)
       .attr("data-xvalue", d => d.Year)
       .attr("r", 4)
       .attr("cx", (d,i)=> (i*17+200))
       .attr("cy", (d)=> h-(d.Time-400))



   
   const xAxis = d3.axisBottom(xscale);
     
        svgarea.append("g")
           .attr("transform", "translate(200," + h + ")")
           .call(xAxis)
           .attr("id", "x-axis")

      const yAxis = d3.axisLeft(yscale);
     
        svgarea.append("g")
           .attr("transform", "translate("+200+", 0)")
           .call(yAxis)
           .attr("id", "y-axis")


}