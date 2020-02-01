// Get references to page elements
var addEmployee = $("#add-Employee");
var employeeDatabase = $("#list-Employee");
var searchDepartment = $("#search-Department");
var employeeSearchBar = $("#employee-search");
var searchEmployee = $("#search-Employee")
var employeeHeader = $("h1");
var departmentFlag = false;
var check = 0;
var nameButton = $("#name-button");
//var body = $("body");
var bigDiv = $(".modal-body");
var bigForm = $("<form></form>");
bigForm.css("padding-left", "100px");
var inputLast = $(
  "<input type = 'text' id='last-name' placeholder='Last Name'>"
);
var inputFirst = $("<input type = 'text' id='first-name' >");
var inputDepartment = $("<input type = 'text' id='department'>");
var inputAttitude = $("<div class='wpac-rating' id='attitude'></div>");
var inputCommunication = $(
  "<div class='wpac-rating' id='communication'></div>"
);
var inputEfficiency = $("<div class='wpac-rating' id='efficiency'></div>");
var inputProficiency = $("<div class='wpac-rating' id='proficiency'></div>");
var inputReliability = $("<div class='wpac-rating id='reliability''></div>");

var submitButton = $("#sbmt-btn");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

searchDepartment.on("click", function() {
  // departmentFlag = true;
  console.log(departmentFlag);
  employeeSearchBar.attr("placeholder", "Search employee by department");
  return departmentFlag;
});

searchEmployee.on("click", function() {
  // departmentFlag = true;
  console.log(departmentFlag);
  employeeSearchBar.attr("placeholder", "Search employee by name");
  return departmentFlag;
})

$(document).ready(function() {
  // eslint-disable-next-line eqeqeq

  API.getExamples();
  refreshExamples();
  gsap.to(addEmployee, {
    duration: 3.5,
    ease: "power2.out",
    runBackwards: true,
    y: 500
  });

  gsap.to(searchDepartment, {
    duration: 2.5,
    ease: "power2.out",
    runBackwards: true,
    y: 500
  });

  gsap.to(searchEmployee, {
    duration: 1.0,
    ease: "power2.out",
    runBackwards: true,
    y: 500
  });

  gsap.to(employeeDatabase, {
    duration: 1.5,
    ease: "power2.out",
    runBackwards: true,
    y: 500
  });

  gsap.to(employeeSearchBar, {
    duration: 2.5,
    ease: "power2.out",
    runBackwards: true,
    y: -500
  });

  gsap.to(employeeHeader, {
    duration: 3.5,
    ease: "power2.out",
    runBackwards: true,
    y: -500
  });

  gsap.to($("#database"), {
    duration: 3.5,
    ease: "power2.out",
    runBackwards: true,
    x: -500
  });
});

function randomizeData() {
  inputAttitude.attr(
    "data-wpac-chan",
    Math.floor(Math.random() * 10000000) + 400
  );
  inputCommunication.attr(
    "data-wpac-chan",
    Math.floor(Math.random() * 10000000) + 400
  );
  inputEfficiency.attr(
    "data-wpac-chan",
    Math.floor(Math.random() * 10000000) + 400
  );
  inputProficiency.attr(
    "data-wpac-chan",
    Math.floor(Math.random() * 10000000) + 400
  );
  inputReliability.attr(
    "data-wpac-chan",
    Math.floor(Math.random() * 10000000) + 400
  );
}

// function removeAll() {}

addEmployee.on("click", function() {
  wpac_init = window.wpac_init || [];
  wpac_init.push({ widget: "Rating", id: 23052 });
  (function() {
    if ("WIDGETPACK_LOADED" in window) {
      return;
    }
    WIDGETPACK_LOADED = true;
    var mc = document.createElement("script");
    mc.type = "text/javascript";
    mc.async = true;
    mc.src = "https://embed.widgetpack.com/widget.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(mc, s.nextSibling);
  })();

  randomizeData();
  bigForm.append($("<p>Last Name: </p>"));
  bigForm.append(inputLast);
  bigForm.append($("<br>"));
  bigForm.append($("<br>"));
  bigForm.append($("<hr>"));

  bigForm.append($("<p>First Name: </p>"));
  bigForm.append(inputFirst);
  bigForm.append($("<br>"));
  bigForm.append($("<br>"));
  bigForm.append($("<hr>"));

  bigForm.append($("<p>Department: </p>"));
  bigForm.append(inputDepartment);
  bigForm.append($("<br>"));
  bigForm.append($("<br>"));
  bigForm.append($("<hr>"));

  bigForm.append($("<p>Attitude: </p>"));
  bigForm.append(inputAttitude);
  bigForm.append($("<br>"));
  bigForm.append($("<hr>"));

  bigForm.append($("<p>Communication: </p>"));
  bigForm.append(inputCommunication);
  bigForm.append($("<br>"));
  bigForm.append($("<hr>"));

  bigForm.append($("<p>Efficiency </p>"));
  bigForm.append(inputEfficiency);
  bigForm.append($("<br>"));
  bigForm.append($("<hr>"));

  bigForm.append($("<p>Proficiency: </p>"));
  bigForm.append(inputProficiency);
  bigForm.append($("<br>"));
  bigForm.append($("<hr>"));

  bigForm.append($("<p>Reliability: </p>"));
  bigForm.append(inputReliability);
  bigForm.append($("<br>"));
  bigForm.append($("<hr>"));

  bigDiv.append(bigForm);
  // body.append(bigDiv);

  inputCommunication.on("click", function() {
    console.log(
      $(this)
        .val($(this))
        .attr("data-wpac-chan")
    );
  });
  inputAttitude.on("click", function() {
    console.log(
      $(this)
        .val($(this))
        .attr("data-wpac-chan")
    );
  });
});

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/employees",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "/api/employees",
      type: "GET"
    });
  }
};

////////////////////////////

//////////////////////////

var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $employees = data.map(function(employee) {
      var $dep = $("<h4>").text("Department: " + employee.department);
      var $a = $("<h2>")
        .text(employee.last_name + ", " + employee.first_name)
        .attr("href", "/employees/" + employee.employee_id);
      var $div = $("<div>")
        .attr("class", "wpac-rating")
        .attr("data-wpac-chan", employee.attitute);
      var $div2 = $("<div>")
        .attr("class", "wpac-rating")
        .attr("data-wpac-chan", employee.communication);
      var $div3 = $("<div>")
        .attr("class", "wpac-rating")
        .attr("data-wpac-chan", employee.efficiency);
      var $div4 = $("<div>")
        .attr("class", "wpac-rating")
        .attr("data-wpac-chan", employee.proficiency);
      var $div5 = $("<div>")
        .attr("class", "wpac-rating")
        .attr("data-wpac-chan", employee.Reliability);
      var $p = $("<p>").text("Attitude:");
      var $p2 = $("<p>").text("Communication:");
      var $p3 = $("<p>").text("Efficiency:");
      var $p4 = $("<p>").text("Proficiency:");
      var $p5 = $("<p>").text("Reliability:");
      var $li = $("<li>")
        .attr({ class: "list-group-item", "data-id": employee.employee_id })
        .append($a)
        .append($dep)
        .append($p)
        .append($div)
        .append($p2)
        .append($div2)
        .append($p3)
        .append($div3)
        .append($p4)
        .append($div4)
        .append($p5)
        .append($div5);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($employees);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  //removeAll();
  check = 1;
  var employee = {
    last_name: inputLast.val().trim(),
    first_name: inputFirst.val().trim(),
    department: inputDepartment.val().trim(),
    attitute: inputAttitude.val($(this)).attr("data-wpac-chan"),
    communication: inputCommunication.val($(this)).attr("data-wpac-chan"),
    efficiency: inputEfficiency.val($(this)).attr("data-wpac-chan"),
    proficiency: inputProficiency.val($(this)).attr("data-wpac-chan"),
    Reliability: inputReliability.val($(this)).attr("data-wpac-chan")
  };

  API.saveExample(employee);
  inputLast.val("");
  inputFirst.val("");
  inputDepartment.val("");
  randomizeData();

  bigDiv.append($("<p>Employee Added!</p>"));
  submitButton.hide();
};

$("#reset").on("click", function() {
  if (check == 0) {
    bigForm.empty();
    bigDiv.empty();
  } else {
    setTimeout(function() {
      window.location.reload();
    }, 0);
  }
});

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list

// Add event listeners to the submit and delete buttons
submitButton.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
nameButton.on("click", function() {
  console.log("yay");
});
