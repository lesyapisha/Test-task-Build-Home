function createDiagram (options) {
console.log(options)
	var dataset = options.data;

	/*ширина SVG елемента*/
	var svgWidth = 1200;

	/*висота SVG елемента*/
	var svgHeight = 500; 

	/*відступи графіка всередині SVG елемента*/
	var chartMargin = {top: 50, right: 30, bottom: 90, left: 60};

	/*ширина графіка*/
	var chartWidth = svgWidth - chartMargin.right - chartMargin.left;

	/*висота графіка*/
	var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom; 

	/*створюємо SVG елемент і задаємо йому ширину і висоту*/
	var svg = d3.select("#chart")
	    .append("svg")
	    .attr("width", svgWidth)
	    .attr("height", svgHeight);

	/*створюємо групу, всередині якої будуть розміщені элементи графіка*/
	var chart = svg.append("g")
	    .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

	/*функція масштабування значень по осі X*/
	var xScale = d3.scale.ordinal()
	    .rangeRoundBands([0, chartWidth], .2)
	    .domain(dataset.map(function (d) { return d.label; }));

	/*функція масштабування значень по оси Y*/
	var yScale = d3.scale.linear()
	    .range([chartHeight, 0])
	    .domain([0, d3.max(dataset, function (d) { return d.data; })]);

	/*функція створення горизонтальної осі Х*/
	var xAxis = d3.svg.axis()
	    .scale(xScale)
	    .orient("bottom");

	/*функция створення вертикальної осі Y*/
	var yAxis = d3.svg.axis()
	    .scale(yScale)
	    .orient("left");

	/*Додаємо осі на графік*/
	var lHorizontalAxis = chart.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0, " + chartHeight + ")")
	    .call(xAxis)
	    .selectAll("g.tick")
	    .call(tickTextWrapping, xScale.rangeBand());
	var lVerticalAxis = chart.append("g")
	    .attr("class", "y axis")
	    .call(yAxis);

	function tickTextWrapping(aTick, aTextMaxWidth) {
	    var lTickTextsWidth = 0;
	    aTick.each(function (d) {
	        var lTick = d3.select(this);
	        lTick.select("text").remove();
	        var lTextContainerInitialX = 0;
	        var lTextContainerInitialY = 17;
	        var lTextContainer = lTick.append("g").attr("transform", "translate(" + lTextContainerInitialX + ", " + lTextContainerInitialY + ")");
	        var lText = lTextContainer.append("text").text(d).style("text-anchor", "middle");
	        var lTextWidth = lText[0][0].clientWidth;
	        var lTextHeight = lText[0][0].clientHeight;
	        if (aTextMaxWidth/lTextWidth < 1) {
	            var lTextRadian = Math.acos(aTextMaxWidth/lTextWidth) * 180 / Math.PI;
	            var lTextIndent = lTextHeight / 2;
	            lTextContainerInitialY -= lTextIndent;
	            lText.attr("transform", "rotate(" + -lTextRadian + ")").attr("dy", lTextIndent).style("text-anchor", "middle");
	            var lTextContainerWidth = -lTextWidth * Math.sin(aTextMaxWidth/lTextWidth) / 2 + lTextContainerInitialX;
	            var lTextContainerHeight = lTextWidth * Math.cos(aTextMaxWidth/lTextWidth) / 2 + lTextContainerInitialY;
	            lTextContainer.attr("transform", "translate(" + lTextContainerWidth + ", " + lTextContainerHeight + ")");
	        }
	    });
	}

	/*Додаємо стовбчики*/
	chart.selectAll("rect.bar")
	    .data(dataset)
	    .enter()
	    .append("rect")
	    .attr("class", "bar")
	    .attr("x", function (d) { return xScale(d.label); })
	    .attr("width", xScale.rangeBand())
	    .attr("y", function (d) { return yScale(d.data); })
	    .attr("height", function (d) { return chartHeight - yScale(d.data); })
	    .on("mouseenter", function (d, i) {
	        chart.select("#label" + i).style("display", "block");
	    })
	    .on("mouseleave", function (d, i) { 
	        chart.select("#label" + i).style("display", "none"); 
	    });

	/*Додаємо легенду*/
	var lChartCaption = options.header;
	chart.append("text")
	    .attr("x", chartWidth / 2)
	    .attr("y", -chartMargin.top / 2)
	    .style({"text-anchor": "middle", "font": "24px Courier New"})
	    .text(lChartCaption);

	/*Нижче код для додавання підказки*/
	var labelsContainers = chart.selectAll("g.label")
	    .data(dataset)
	    .enter()
	    .append("g")
	    .attr("class", "label")
	    .attr("transform", function (d) {
	        var lInitialX = xScale(d.label);
	        var lX = lInitialX + xScale.rangeBand() / 2;
	        var lY = yScale(d.data);
	        return "translate(" + lX + ", " + lY + ")";
	    })
	    .attr("id", function (d, i) { return "label" + i; })
	    .style("display", "none");
	labelsContainers.append("polygon")
	    .attr("points", "0,0 -5,-10 -50,-10 -50,-50 50,-50 50,-10 5,-10");
	labelsContainers.append("text")
	    .attr("id", function (d, i) { return "date" + i; })
	    .attr("x", "0")
	    .attr("y", function (d) {
	        return -35;
	    })
	    .style("text-anchor", "middle")
	    .text(function (d) { return "Date: " + d.label; });
	labelsContainers.append("text")
	    .attr("id", function (d, i) { return "value" + i; })
	    .attr("x", "0")
	    .attr("y", function (d) {
	        return -15;
	    })
	    .style("text-anchor", "middle")
	    .text(function (d) { return "Attendance: " + d.data; });
};