window.onload = function () {

	loadCourseResults();



};

function loadCourseResults() {

	var url = "courseResults.json";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			buildCourseResults(xmlhttp.responseText); // do something when server responds
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();


}

function buildCourseResults(text) {
	var list = [];
	var data = JSON.parse(text);

	var length = data.courseResults.length;


	for (var i = 0; i < length; i++) {
		var courses = data.courseResults[i];

		var cr = new CourseResult(courses.courseNumber, courses.courseName, courses.studentMarks);
		list.push(cr);
	}

	displayResults(list);
}


function CourseResult(courseNumber, courseName, studentMarks) {

	this.courseNumber = courseNumber;
	this.courseName = courseName;
	this.studentMarks = studentMarks;

	this.toHTML = function () {
		// write code to produce HTML for the entire course 
		var html = "";
		
		html += "<table><tr><th>ID</th><th>Mark</th></tr>";
		
		for(var i = 0; i < this.studentMarks.length; i++) {
			
			var temp = this.studentMarks[i];
			var marks = new StudentMark(temp.id, temp.mark);
			
			html += marks.toHTML();
		}
		
		html += "</table>";
		
     	return html;
	}; // note the semicolon

	this.findMin = function () {
		// write the code to find the minimum mark
		var len = this.studentMarks.length
		var min = Infinity;
		while (len--) {
			if (this.studentMarks[len].mark < min) {
				min = this.studentMarks[len].mark;
			}
		}
		return min;

	};

	this.findMax = function () {
		// write hte code to find the maximum mark
		var len = this.studentMarks.length
		var max = -Infinity;
		while (len--) {
			if (this.studentMarks[len].mark > max) {
				max = this.studentMarks[len].mark;
			}
		}
		return max;
	};

	this.findAverage = function () {
		// write the code to find the average mark

		var average = 0;
		var sum = 0;
		var length = this.studentMarks.length;

		for (var i = 0; i < length; i++) {

			sum += this.studentMarks[i].mark;

		}

		average = sum / length;

		return average;
	};
}

function StudentMark(id, mark) {

	this.id = id;
	this.mark = mark;

	this.toHTML = function () {
		return "<tr><td>" + id + "</td><td>" + mark + "</td></tr>";
	}; // note the semicolon
}


function displayResults(crArray) {
	var html = "";

	for (var i = 0; i < crArray.length; i++) {

		html += "<div class='course'>";
		html += "<h1>" + crArray[i].courseName + "</h1>";
		html += crArray[i].toHTML();
		html += "<p>Average Mark: " + crArray[i].findAverage() + "</p>";
		html += "<p>Highest Mark: " + crArray[i].findMax() + "</p>";
		html += "<p>Lowest Mark: " + crArray[i].findMin() + "</p>";
		html += "</div>";

		var div = document.querySelector(".results");

		div.innerHTML = html;
	}
}
