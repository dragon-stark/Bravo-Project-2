
// Get references to page elements
var addEmployee = $("#add-Employee");
//var employeeDatabase = $("#list-Employee");
var searchDepartment = $("#search-Department");
var employeeSearchBar = $("#employee-search");
var employeeHeader = $("h1");
var departmentFlag = false;
var body = $("body");

var bigDiv = $("<div></div>");
var bigForm = $("<form></form>");
bigForm.css("padding-left", "100px");

var inputEmployeeId = $("<input type = 'text' id='employee-id'>");
var inputLast = $("<input type = 'text' id='last-name'>");
var inputFirst = $("<input type = 'text' id='first-name'>");
var inputDepartment = $("<input type = 'text' id='department'>");
var inputAttitude = $("<div class='wpac-rating'></div>");
var inputCommunication = $("<div class='wpac-rating'></div>");
var inputEfficiency = $("<div class='wpac-rating'></div>");
var inputProficiency = $("<div class='wpac-rating'></div>");
var inputReliability = $("<div class='wpac-rating'></div>");

var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

searchDepartment.on("click", function() {
  departmentFlag = true;
  console.log(departmentFlag);
  employeeSearchBar.attr("placeholder", "Enter department name");
  return departmentFlag;
});

$(document).ready(function() {
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

  gsap.to(addEmployee, {
    duration: 2.5,
    ease: "power2.out",
    runBackwards: true,
    x: 500
  });

  gsap.to(searchDepartment, {
    duration: 2.5,
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
    duration: 2.5,
    ease: "power2.out",
    runBackwards: true,
    y: -500
  });
});

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
  var inputArr = [
    inputEmployeeId,
    inputLast,
    inputFirst,
    inputDepartment,
    inputAttitude,
    inputCommunication,
    inputEfficiency,
    inputProficiency,
    inputReliability
  ];

  for (var j = 0; j < inputArr.length; j++) {
    bigForm.append(inputArr[j]);
  }

  bigDiv.append(bigForm);
  body.append(bigDiv);

  inputCommunication.on("click", function() {
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
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
