// Define UI element variables
let newCriteriaButton = document.querySelector('.newCriteriaButton')
let newOptionButton = document.querySelector('.newOptionButton')
let optionsList = document.querySelector('.optionsList')
let optionAddList = document.querySelector('.optionAddList')
let criteriaList = document.querySelector('.criteriaList')
let fieldList = document.querySelector('.newCriteriaList')
let saveCriteriaListButton = document.querySelector('.saveCriteriaListButton')
let scoringTable = document.createElement('table')
let tableRows = scoringTable.rows
let newCriteriaInput = document.querySelector('.newCriteriaInput')
let newCriteriaWeight = document.querySelector('.newCriteriaWeight')
let saveAllOptionsButton = document.querySelector('.saveAllOptionsButton')
let calcRDbutton = document.createElement('button')
let backToOptions = document.createElement('button')
let backToCriteria = document.createElement('button')
let eraseTableButton = document.createElement('button')
let newOptionInput = document.querySelector('.newOptionInput')
let decisionCount = 0





// Define other variables
let criteriaNameArray = [] // Contains names of all criteria the user defines
let criteriaWeightArray = [] // Contains weights of all the criteria use defines
let optionNameArray = [] // Contains names of all the options the user defines
let inputScore = []// Contains all the values from the scoringTable
let inputScoreArray = [] // Contains all the weights fromt the scoringTable multipled by criteria weights
let optionScoreArray = [] // Contains the calculated scores for each object, or, more simply, sums of columsn for the scoringTable

// FUNCTIONS

// Function which multiplies all input scores by the criteria weight and pushes them into an array
function calcOptionScore (critWeight) {
  for (let tr=1; tr<criteriaNameArray.length+1; tr++){ //itterate through table rows
    for (let tc=1; tc<optionNameArray.length+1; tc++){ //itterate through table columns
      inputScore = parseInt(tableRows[tr].childNodes[tc].firstChild.value)
      // console.log(criteriaWeightArray[tr-1])
      inputScoreArray.push(inputScore*criteriaWeightArray[tr-1]) // multiplies criteria weight by the inputScore
      // console.log('criteria weight array: ' + criteriaWeightArray)
      // console.log('Input Score: ' + inputScore)
      // console.log("Score Array: " + inputScoreArray)
      }
    }
  }



// THIS SECTION DEFINES THE CRITERIA ON WHICH THE OPTIONS WILL BE EVALUATED

// Create a button to add a criteria

newCriteriaButton.addEventListener('click', () => {
  let savedCriteria = document.createElement ('li')
  savedCriteria.className = 'savedCriteria list-group-item list-group-item-action'


  savedCriteria.innerHTML = '<table><tr><td><b>Criteria: </td><td class="criteriaNameCell">' + newCriteriaInput.value + "</td></tr><tr><td><b>Weight: </b></td> <td class='criteriaWeightCell'>" + newCriteriaWeight.value + "</td></tr></table>"
  criteriaNameArray.push(newCriteriaInput.value)
  criteriaWeightArray.push(parseInt(newCriteriaWeight.value))

  criteriaList.appendChild(savedCriteria)

  // Define the functionality of "Remove Criteria" button
  let removeSavedCriteria = document.createElement ('button')
  removeSavedCriteria.className = 'removeSavedCriteria btn btn-warning btn-sm btn-block'
  removeSavedCriteria.textContent = 'Remove Criteria'
  removeSavedCriteria.addEventListener ('click', () => {
    //remove the criteria name and weight out of their arrays
    let index = criteriaNameArray.indexOf(newCriteriaInput.value)
    if (index > -1) {
        criteriaNameArray.splice(index, 1)
        criteriaWeightArray.splice(index, 1)}

    criteriaList.removeChild(savedCriteria)
  })
  savedCriteria.appendChild(removeSavedCriteria)

  let saveAllCriteriaButton = document.querySelector('.saveAllCriteriaButton')
  saveAllCriteriaButton.style.display = 'inherit'
  saveAllCriteriaButton.addEventListener('click', () => {
    document.querySelector('.options').style.display = 'inherit'
    document.querySelector('.criteria').style.display = 'none'
  })

})


// THIS SECTION DEFINES THE OPTIONS AVAILABLE TO THE USER

  // Define the functionality of the "Add a New Option Button" button which appends the user input to the optionsList and pushes option name into optionNameArray
  newOptionButton.addEventListener('click', () => {
    let savedOptionliItem = document.createElement('li')
    let removeSavedOptionButton = document.createElement('button')

    removeSavedOptionButton.className = "removeSavedOptionButton btn btn-warning btn-sm btn-block"
    removeSavedOptionButton.textContent = "Remove Option"
    savedOptionliItem.className = 'list-group-item list-group-item-action'
    savedOptionliItem.innerHTML = '<table><tr><td><b>Option:</b> </td><td class="optionNameCell">' + newOptionInput.value + "</td></tr></table>"
    optionsList.appendChild(savedOptionliItem)
    savedOptionliItem.appendChild(removeSavedOptionButton)
    optionNameArray.push(newOptionInput.value)

    removeSavedOptionButton.addEventListener ('click', () => {
      optionsList.removeChild(savedOptionliItem)
      let index = optionNameArray.indexOf(newOptionInput.value)
      if (index > -1) {
          optionNameArray.splice(index, 1)}
    })

    saveAllOptionsButton.style.display = 'inherit'
    saveAllOptionsButton.addEventListener('click', () => {
      document.querySelector('.tableDiv').style.display = 'inherit'
      document.querySelector('.options').style.display = 'none'
    })

  })





// Saves the defined criteria and options and displays it as a row in a table
saveAllOptionsButton.addEventListener ('click', () => {

    document.querySelector('.tableDiv').appendChild(scoringTable)
    scoringTable.className = 'scoringTable'
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
          tableInput.value = '3'
          tableInput.className = 'cell'
          optionColumn.appendChild(tableInput)
        }
      }
    // Create Save button for the table
    calcRDbutton.className = "btn btn-primary btn-sm m-4"
    calcRDbutton.textContent = 'Calculate the Rational Option'
    document.querySelector('.tableDiv').appendChild(calcRDbutton)


    // Calculate the Rational Decision
    calcRDbutton.addEventListener('click', () => {
        // Reset the score counting for the options every for every time the calculation is ran
        for (let i=0; i<document.querySelectorAll('.totalScoreRow').length;i++){
        if (scoringTable.contains(document.querySelector('.totalScoreRow'))) {
          document.querySelectorAll('.totalScoreRow')[i].innerHTML = ''

          optionScoreArray = []
          inputScoreArray = []
          scoringTable.removeChild(document.querySelector('.totalScoreRow'))
          document.querySelector('#finalAnswerDiv').innerHTML = ""
        }}


        calcOptionScore()
        // Create the last row of the table with the final scores for each option
        var row = document.createElement('tr')
        row.className = 'totalScoreRow'
        row.appendChild(document.createElement('td'))
        for (let i=0; i<optionNameArray.length; i++){ // first loop to define the option objects
          let objectScore = 0
          for (let b=i; b<inputScoreArray.length; b+=optionNameArray.length){ // second loop to define score of each option object
            objectScore+=inputScoreArray[b]
          }
          optionScoreArray.splice(i, 1, objectScore)
        }
        //append the last row with the scores
        for (let i=0; i<optionNameArray.length; i++){
          let scoreTableTotal = document.createElement('td')
          scoreTableTotal.className = "scoreTableTotal"
          row.appendChild(scoreTableTotal)
          scoreTableTotal.innerHTML = optionScoreArray[i]
        }


        scoringTable.appendChild(row)
        let highestScore = optionScoreArray.indexOf(Math.max(...optionScoreArray));   // Return the index of the largest number in the array of scores
        let finalAnserDiv = document.getElementById('finalAnswerDiv')
        finalAnswerDiv.innerHTML = "<h1> Your best bet is: " + optionNameArray[highestScore] + ". Because it has scored: " + optionScoreArray[highestScore]
      })


      // Define functionality of "Recalculate" button which clears the arrays and removes the last row from the table
      eraseTableButton.className = "btn btn-warning btn-sm m-4"
      eraseTableButton.textContent = "Recalculate"
      document.querySelector('.tableDiv').appendChild(eraseTableButton)
      eraseTableButton.addEventListener ('click', () =>{
        optionScoreArray = []
        inputScoreArray = []
          if (scoringTable.contains(document.querySelector('.totalScoreRow'))) {
        scoringTable.removeChild(document.querySelector('.totalScoreRow'))
      }
        document.querySelector('#finalAnswerDiv').innerHTML = ""
      })

      // Define functionality of buttons that take the user back to defining the criteria and options
      backToCriteria.className = "btn btn-light btn-sm m-4"
      backToCriteria.textContent = "<<< Adjust the Options and Criteria"

      backToCriteria.addEventListener('click', () => {
        //hide the table element and display the criteria selection element
        document.querySelector('.tableDiv').style.display = 'none'
        document.querySelector('.criteria').style.display = 'inherit'
        //remove the elements to be re-appended later
        scoringTable.innerHTML = ""
        document.querySelector('.tableDiv').removeChild(calcRDbutton)
        document.querySelector('.tableDiv').removeChild(eraseTableButton)
        document.querySelector('.tableDiv').removeChild(backToCriteria)
        document.querySelector('#finalAnswerDiv').innerHTML = ""



      })


      document.querySelector('.tableDiv').insertBefore(backToCriteria, document.querySelector('.scoringDirections'))
  }
)
