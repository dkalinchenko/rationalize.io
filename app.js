// Define UI element variables
let newDecisionButton = document.querySelector('.newDecisionButton')
let newCriteriaButton = document.querySelector('.newCriteriaButton')
let newOptionButton = document.querySelector('.newOptionButton')
let optionsList = document.querySelector('.optionsList')
let criteriaList = document.querySelector('.criteriaList')
let scoringTable = document.createElement('table')
let tableRows = scoringTable.rows
let decisionNameInput = document.querySelector('.decisionNameInput')
let newCriteriaInput = document.querySelector('.newCriteriaInput')
let newCriteriaWeight = document.querySelector('.newCriteriaWeight')
let saveAllOptionsButton = document.querySelector('.saveAllOptionsButton')
let calcRDbutton = document.createElement('button')
let backToCriteriaButton = document.querySelector('.backToCriteriaButton')
let newOptionInput = document.querySelector('.newOptionInput')
let progressBar = document.querySelector('.progress-bar')
let chartDiv = document.querySelector('.chart')


// Define Arrays to store values
let criteriaNameArray = [] // Contains names of all criteria the user defines
let criteriaWeightArray = [] // Contains weights of all the criteria use defines
let optionNameArray = [] // Contains names of all the options the user defines
let inputScore = []// Contains all the values from the scoringTable
let inputScoreArray = [] // Contains all the weights fromt the scoringTable multipled by criteria weights
let optionScoreArray = [] // Contains the calculated scores for each object, or, more simply, sums of columsn for the scoringTable
let barChartScores = [] // Contains option scores broken out by criteria for the bar chart
let optionChartScores = []
let chartData = []

// THIS SECTION DEFINES THE DECISION PROBLEM (THE FIRST SCREEN)
newDecisionButton.addEventListener('click', () =>{

  if(decisionNameInput.value === ""){
    alert("Please enter the decision name before proceeding")
  } else {

    //Load Criteria-selection Div
    $(".definition").fadeOut("slow");
    $(".criteria").delay(400).fadeIn("slow");

    // Adjust the progress bar
    progressBar.setAttribute('aria-valuenow', 25)
    progressBar.setAttribute('style','width: 25%')
    progressBar.innerHTML = "25%"

    //Change the title to the decision name
    document.querySelector('.decisionHeader').innerHTML = decisionNameInput.value

    }
  })


// THIS SECTION DEFINES THE CRITERIA ON WHICH THE OPTIONS WILL BE EVALUATED (THE SECOND SCREEN)

// Define the functionality of the 'Add a New Criteria Button'

newCriteriaButton.onclick="document.getElementById('newCriteriaInput').value = ''"
newCriteriaButton.addEventListener('click', () => {

  // Validate the input to be between 1 and 10
  if (newCriteriaWeight.value > 10 || newCriteriaWeight.value < 0){
    alert("Please, enter value between 0 and 10")
  } if (newCriteriaInput.value =='') {
    alert("Please, define the criteria name")}
    else
    {
    // Create a new list item and push the contents of the input into it
    let savedCriteria = document.createElement ('li')
    savedCriteria.className = 'savedCriteria list-group-item list-group-item-action'
    savedCriteria.innerHTML = '<table><tr><td><b>Criteria: </td><td class="criteriaNameCell">' + newCriteriaInput.value + "</td></tr><tr><td><b>Weight: </b></td> <td class='criteriaWeightCell'>" + newCriteriaWeight.value + "</td></tr></table>"
    criteriaNameArray.push(newCriteriaInput.value)
    criteriaWeightArray.push(parseInt(newCriteriaWeight.value))
    criteriaList.appendChild(savedCriteria)

    // Create & define the functionality of "Remove Criteria" button
    let removeSavedCriteria = document.createElement ('button')
    removeSavedCriteria.className = 'removeSavedCriteria'
    removeSavedCriteria.textContent = 'Remove Criteria'
    removeSavedCriteria.addEventListener ('click', () => {
      // Nix the criteria name and weight out of their arrays
      let index = criteriaNameArray.indexOf(newCriteriaInput.value)
      if (index > -1) {
          criteriaNameArray.splice(index, 1)
          criteriaWeightArray.splice(index, 1)}
          criteriaList.removeChild(savedCriteria)
    })
    savedCriteria.appendChild(removeSavedCriteria)

    // Create and define the functionality of the 'Save All Criteria Button'
    let saveAllCriteriaButton = document.querySelector('.saveAllCriteriaButton')
    saveAllCriteriaButton.style.display = 'inherit'
    saveAllCriteriaButton.addEventListener('click', () => {

      // Adjust the progress bar
      progressBar.setAttribute('aria-valuenow', 50)
      progressBar.setAttribute('style','width: 50%')
      progressBar.innerHTML = "50%"

      // Load Option definition Div
      $(".criteria").fadeOut("slow");
      $(".options").delay(400).fadeIn("slow");

      // Clear the criteria name and weights
      newCriteriaInput.innerHTML = ' '
      newCriteriaWeight.value = 0


    })
  }
  })




// THIS SECTION DEFINES THE OPTIONS AVAILABLE TO THE USER (THE THIRD SCREEN)

  // Define the functionality of the "Add a New Option Button" button which appends the user input to the optionsList and pushes option name into optionNameArray
  newOptionButton.addEventListener('click', () => {

    // Create a new list item and push the contents from the input into it
    let savedOptionliItem = document.createElement('li')
    let removeSavedOptionButton = document.createElement('button')
    removeSavedOptionButton.className = "removeSavedOptionButton"
    removeSavedOptionButton.textContent = "Remove Option"
    savedOptionliItem.className = 'list-group-item list-group-item-action'
    savedOptionliItem.innerHTML = '<table><tr><td><b>Option:</b> </td><td class="optionNameCell">' + newOptionInput.value + "</td></tr></table>"
    optionsList.appendChild(savedOptionliItem)
    savedOptionliItem.appendChild(removeSavedOptionButton)
    optionNameArray.push(newOptionInput.value)

    // Create and define functionality of 'Remove option button'
    removeSavedOptionButton.addEventListener ('click', () => {
      optionsList.removeChild(savedOptionliItem) // Remove the UI element
      let index = optionNameArray.indexOf(newOptionInput.value) // Nix the value out of the array
      if (index > -1) {
          optionNameArray.splice(index, 1)}
    })

    saveAllOptionsButton.style.display = 'inherit'

  })

// THIS SECTION DEFINES THE FUNCTIONALITY OF THE LAST SCREEN WITH THE SCORING TABLE WHICH CALCULATES THE DECISION

// Define the functionality of 'Save All Options' button which saves the defined criteria and options and displays it as a row in a table
saveAllOptionsButton.addEventListener ('click', () => {
  // Reveal the table Div and append the scoring table onto it
  document.querySelector('.tableDiv').appendChild(scoringTable)
  scoringTable.className = 'scoringTable'

  chartDiv.innerHTML = ""

  // Adjust the progress bar
  progressBar.setAttribute('aria-valuenow', 75)
  progressBar.setAttribute('style','width: 75%')
  progressBar.innerHTML = "75%"

  // Load the decision matrix
  $(".options").fadeOut("slow");
  $(".tableDiv").delay(400).fadeIn("slow");

  // Create the top row of the table with headings as Options
  for (let i=0; i<1; i++){
      let criteriaRow = document.createElement('tr')
      scoringTable.appendChild(criteriaRow)
      let optionColumn = document.createElement('th')
      criteriaRow.appendChild(optionColumn)
      for (let i=0; i<optionNameArray.length; i++){
        let optionColumn = document.createElement('th')
        optionColumn.textContent = optionNameArray[i]
        criteriaRow.appendChild(optionColumn)
      }
  }

  // Create the rest of the rows with criterias, their weights and inputs
  for (let i=0; i<criteriaNameArray.length; i++) {
      let criteriaRow = document.createElement('tr')
      criteriaRow.textContent = criteriaNameArray[i] + " " + criteriaWeightArray[i]
      scoringTable.appendChild(criteriaRow)

      for (let c=0; c<optionNameArray.length; c++){
        let optionColumn = document.createElement('th')
        criteriaRow.appendChild(optionColumn)
        let tableInput = document.createElement('input')
        tableInput.value = ''
        tableInput.className = 'cell'
        optionColumn.appendChild(tableInput)
    }
  }

  // Create Save button for the table
  calcRDbutton.className = "calcRDbutton"
  calcRDbutton.setAttribute('data-toggle','modal')
  calcRDbutton.setAttribute('data-target','#finalAnswer')


  // data-toggle="modal" data-target="#finalAnswer

  calcRDbutton.textContent = 'Calculate the Rational Option'
  document.querySelector('.tableDiv').appendChild(calcRDbutton)


  // Calculate the Rational Decision
  calcRDbutton.addEventListener('click', () => {

      // Adjust the progress bar
      progressBar.setAttribute('aria-valuenow', 100)
      progressBar.setAttribute('style','width: 100%')
      progressBar.innerHTML = "100%"

      chartDiv.innerHTML = ""

      // Clear the arrays and reset the score counting for the options every time the calculation is ran
      for (let i=0; i<document.querySelectorAll('.totalScoreRow').length;i++){
      if (scoringTable.contains(document.querySelector('.totalScoreRow'))) {
        document.querySelectorAll('.totalScoreRow')[i].innerHTML = ''
        optionScoreArray = []
        inputScoreArray = []
        scoringTable.removeChild(document.querySelector('.totalScoreRow'))
        document.querySelector('#finalAnswerDiv').innerHTML = ""
      }}

      // Multiply all input scores by the criteria weight and pushes them into an array
      for (let tr=1; tr<criteriaNameArray.length+1; tr++){ //itterate through table rows
        for (let tc=1; tc<optionNameArray.length+1; tc++){ //itterate through table columns
          inputScore = parseFloat(tableRows[tr].childNodes[tc].firstChild.value)
          if (inputScore < 0 || inputScore > 10 || inputScore == ""){
            alert('Please, ensure that you are entering values between 0 and 10')
            throw new Error('Stop running the rest of the app and ask the user to enter a higher number')}
          else {
            inputScoreArray.push(inputScore*criteriaWeightArray[tr-1]) // multiplies criteria weight by the inputScore
          }
        }
      }

      // Create the last row of the table with the final scores for each option
      var row = document.createElement('tr')
      row.className = 'totalScoreRow'
      row.appendChild(document.createElement('td'))
      for (let i=0; i<optionNameArray.length; i++){ // first loop to define the option objects
        let objectScore = 0
        for (let b=i; b<inputScoreArray.length; b+=optionNameArray.length){ // second loop to define score of each option object
          objectScore+=inputScoreArray[b]
          optionChartScores.push(inputScoreArray[b])
        }
        optionScoreArray.splice(i, 1, objectScore)
        barChartScores.push(optionChartScores)
        optionChartScores =[]
      }

      // console.log(barChartScores)

      // Append the last row with the scores
      for (let i=0; i<optionNameArray.length; i++){
        let scoreTableTotal = document.createElement('td')
        scoreTableTotal.className = "scoreTableTotal"
        row.appendChild(scoreTableTotal)
        scoreTableTotal.innerHTML = optionScoreArray[i]
      }
      scoringTable.appendChild(row)
      let highestScore = optionScoreArray.indexOf(Math.max(...optionScoreArray));   // Return the index of the largest number in the array of scores
      let finalAnserDiv = document.getElementById('finalAnswerDiv')
      finalAnswerDiv.innerHTML = "<table><tr><th>Your best option</th><th>Score</th></tr><tr><td>" + optionNameArray[highestScore] + "</td><td>" + optionScoreArray[highestScore] + " </td><table>"


      //Push data into an array of objects for graphical rendering
      let chartData =[]
      for (let i=0; i<optionNameArray.length; i++){
          chartData.push({x:optionScoreArray[i], y:optionNameArray[i]})
        }

      // $(".scoringDirections").fadeOut("slow");
      // $(".finalAnswerDiv").delay(900).fadeIn("slow");
      // $(".chart").delay(900).fadeIn("slow");


      //Render the illastrative bar chart for the answer

      var outerWidth = 400;
      var outerHeight = 250;
      var margin = { left: 50, top: 0, right: 0, bottom: 30 };
      var barPadding = 0.2;

      var xColumn = "x";
      var yColumn = "y";
      var colorColumn = "y"

      var innerWidth  = outerWidth  - margin.left - margin.right;
      var innerHeight = outerHeight - margin.top  - margin.bottom;

      var colorScale = d3.scale.category10();

      var svg = d3.select(".chart").append("svg")
        .attr("width",  outerWidth)
        .attr("height", outerHeight)

      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var xAxisG = g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + innerHeight + ")");

      var yAxisG = g.append("g")
        .attr("class", "y axis");

      var xScale = d3.scale.linear().range(      [0, innerWidth]);
      var yScale = d3.scale.ordinal().rangeBands([0, innerHeight], barPadding);

      var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
        .ticks(5)                   // Use approximately 5 ticks marks.
        .tickFormat(d3.format("s")) // Use intelligent abbreviations, e.g. 5M for 5 Million
        .outerTickSize(0);          // Turn off the marks at the end of the axis.
      var yAxis = d3.svg.axis().scale(yScale).orient("left")
        .outerTickSize(0);          // Turn off the marks at the end of the axis.

      function render(data){

        xScale.domain([0, d3.max(data, function (d){ return d[xColumn]; })]);
        yScale.domain(       data.map( function (d){ return d[yColumn]; }));


        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        var bars = g.selectAll("rect").data(data);
        bars.enter().append("rect")
          .attr("height", yScale.rangeBand());
        bars
          .attr("x", 0)
          .attr("y",     function (d){ return yScale(d[yColumn]); })
          .attr("width", function (d){ return xScale(d[xColumn]); })
          .attr("fill",  function (d){ return colorScale(d[colorColumn]); });
        bars.exit().remove();
      }

      render(chartData)




    })


    // Define functionality of the button that takes the user back to defining the criteria and options
    backToCriteriaButton.addEventListener('click', () => {

      // Adjust the progress bar
      progressBar.setAttribute('aria-valuenow', 25)
      progressBar.setAttribute('style','width: 25%')
      progressBar.innerHTML = "25%"

      // Load criteria-selection DIV
      $(".tableDiv").fadeOut("slow");
      $(".criteria").delay(400).fadeIn("slow");

      //remove the table to be re-appended later
      scoringTable.innerHTML = ""
    })
  }
)


//MAKING A CHART SHOWING THE DECISION DISTIRBUTION AND CRITERIA WITHIN
