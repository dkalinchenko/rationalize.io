var newCriteriaButton = document.querySelector('.addFieldButton')
var newOptionButton = document.querySelector('.newOptionButton')
var optionsList = document.querySelector('.optionsList')
var optionAddList = document.querySelector('.optionAddList')
var criteriaList = document.querySelector('.criteriaList')
var fieldList = document.querySelector('.fieldList')
var saveCriteriaListButton = document.querySelector('.saveCriteriaListButton')
var criteriaNameArray = []
var criteriaWeightArray = []
var criteriaArray = []

// THIS SECTION DEFINES THE OPTIONS AVAILABLE TO THE USER

newOptionButton.addEventListener ('click', () =>{
  newOptionFunction(optionsList)
})

// FUNCTION ADDS A NEW OPTION TO THE LIST OF OPTIONS
function newOptionFunction (optionsList) {

  // CREATE THE NEEDED UI ELEMENTS FOR ADDING AN OPTION
  let newOptionLiItem = document.createElement ('li')
  let newOptionInput = document.createElement ('input')
  newOptionInput.value = 'Option Name'
  newOptionInput.className = 'newOptionInput'

  let closeButton = document.createElement('button')
  closeButton.className = "closeButton"
  closeButton.textContent = "Remove"

  let saveButton = document.createElement('button')
  saveButton.className = "saveButton"
  saveButton.textContent = "Save"

  // APPEND THE ELEMENTS TO THE LIST
  optionAddList.appendChild(newOptionLiItem)
  newOptionLiItem.appendChild(newOptionInput)
  newOptionLiItem.appendChild(saveButton)
  newOptionLiItem.appendChild(closeButton)

  // DEFINE THE FUNCTIONALITY OF 'CLOSE' BUTTON
  // WHICH REMOVES THE INPUT UI ELEMENT FROM THE LIST
  closeButton.addEventListener('click', () => {
    optionAddList.removeChild(newOptionLiItem)
  })

  // DEFINE THE FUNCTIONALITY OF 'SAVE' BUTTON
  // WHICH ADDS THE INFORMATION FROM THE INPUT FIELD
  // INTO 'optionsList' LIST AND DELETES THE UI INPUT ELEMENT
  saveButton.addEventListener('click', () => {
    let savedOptionliItem = document.createElement('li')
    let removeSavedOptionButtom = document.createElement('button')
    savedOptionliItem.innerHTML = newOptionInput.value
    optionsList.appendChild(savedOptionliItem)
    optionAddList.removeChild(newOptionLiItem)

  })
}





// THIS SECTION DEFINES THE CRITERIA ON WHICH
// THE OPTIONS WILL BE EVALUATED AND
// PROVIDES WEIGHT FOR EACH OPTION

newCriteriaButton.addEventListener ('click', () => {
  newCriteriaFunction(fieldList)
  })

// Saves the defined criteria
saveCriteriaListButton.addEventListener ('click', () => {
    // for (let i=0; i<criteriaNameArray.length; i++){
    //   let criteriaObject = new Object()
    //   criteriaObject.name = criteriaNameArray[i]
    //   criteriaObject.weight = criteriaWeightArray[i]
    //   criteriaArray.push(criteriaObject)
    //
    // }
    var criteriaArray = [[criteriaNameArray],[criteriaWeightArray]];
    console.log(criteriaArray)
      }
)

// Adds new criteria item to the field on the right
function newCriteriaFunction (fieldList){
  let liItem = document.createElement('li')
  liItem.className = 'criteriaListItem'

  let criteriaInput = document.createElement('input')
  criteriaInput.className = 'input'
  criteriaInput.value = 'Criteria Name'

  let criteriaWeight = document.createElement ('input')
  criteriaWeight.className = 'criteriaWeight'
  criteriaWeight.value = 'Criteria Weight'

  let closeButton = document.createElement('button')
  closeButton.className = "closeButton"
  closeButton.textContent = "Remove"

  let saveButton = document.createElement('button')
  saveButton.className = "saveButton"
  saveButton.textContent = "Save"


  closeButton.addEventListener('click', () => {
    fieldList.removeChild(liItem)
  })

  saveButton.addEventListener('click', () => {
    let savedCriteria = document.createElement ('li')
    savedCriteria.className = 'savedCriteria'


    savedCriteria.innerHTML = '<b>Criteria: </b>' + criteriaInput.value + "; <br><b>Weight:</b> " + criteriaWeight.value
    criteriaNameArray.push(criteriaInput.value)
    criteriaWeightArray.push(criteriaWeight.value)

    criteriaList.appendChild(savedCriteria)

    let removeSavedCriteria = document.createElement ('button')
    removeSavedCriteria.className = 'removeSavedCriteria'
    removeSavedCriteria.textContent = 'Remove Criteria'
    removeSavedCriteria.addEventListener ('click', () => {
      criteriaList.removeChild(savedCriteria)
    })
    fieldList.removeChild(liItem)
    savedCriteria.appendChild(removeSavedCriteria)

  })

    fieldList.appendChild(liItem)
    liItem.appendChild(criteriaInput)
    liItem.appendChild(criteriaWeight)
    liItem.appendChild(saveButton)
    liItem.appendChild(closeButton)
}
