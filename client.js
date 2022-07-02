const employees = [
  {
    name: 'Atticus',
    employeeNumber: '2405',
    annualSalary: '47000',
    reviewRating: 3
  },
  {
    name: 'Jem',
    employeeNumber: '62347',
    annualSalary: '63500',
    reviewRating: 4
  },
  {
    name: 'Scout',
    employeeNumber: '6243',
    annualSalary: '74750',
    reviewRating: 5
  },
  {
    name: 'Robert',
    employeeNumber: '26835',
    annualSalary: '66000',
    reviewRating: 1
  },
  {
    name: 'Mayella',
    employeeNumber: '89068',
    annualSalary: '35000',
    reviewRating: 1
  }
];

// YOU SHOULD NOT NEED TO CHANGE ANYTHING ABOVE THIS POINT

// This problem is massive! Break the problem down, take small steps, and test as you go.
// What is the fewest lines of code I can write and test to get just a little closer?

// This is not a race. Everyone on your team should understand what is happening.
// Ask questions when you don't.

console.log(employees);

// ## Processing Employee Bonuses

// Loop over the `employees` array and do the following:

// * use each employee object as the input to the function described below.
// * `console.log` the results of each iteration.

// ## Function Logic

// Write a declared function that takes in one **Employee** object (as an argument to the function), and returns a new **object** with the following properties:

// * The `name` property should contain the employee's name.
// * The `bonusPercentage` property should contain the bonus percentage the employee is to receive. See section below for calculation instructions.
// * The `totalCompensation` property should be the adjusted annual compensation (base annual + bonus)
// * The `totalBonus` should be the employee's total bonus rounded to the nearest dollar.

/**@author  Jennifer H. - Created bonusCalculator function with array loop, object and object array return*/

/* Directions say to loop over employees array as well as to take in one employee object.
We decided to input the employees array and then perform the bonus calculation on each employee object */

/**
 * @param {[array]} employeesArray - array of employee objects that includes name, employee number, annual salary, review rating properties
 * @return {[array]} - array of new employee objects - object that includes name, bonus Percentage, totalCompensation, totalBonus properties
 */

function bonusCalculator(employeesArray) {
  let employeeBonusArray = [];
  for (let employee of employeesArray) {
    const employeeBonusObject = {
      name: employee.name,
      bonusPercentage: bonusPercentage(employee) * 100,
      totalCompensation: Math.round(((bonusPercentage(employee) + 1) * employee.annualSalary)),
      totalBonus: Math.round((bonusPercentage(employee) * employee.annualSalary))
    };
    console.log(employeeBonusObject);
    employeeBonusArray.push(employeeBonusObject);
  }
  return employeeBonusArray;
}
console.log(bonusCalculator(employees));

// ### Individual Bonus calculation
// - Those who have a rating of a 2 or below should not receive a bonus.
// - Those who have a rating of a 3 should receive a base bonus of 4% of their base annual income.
// - Those who have a rating of a 4 should receive a base bonus of 6% of their base annual income.
// - Those who have a rating of a 5 should receive a base bonus of 10% of their base annual income.
// - If their employee number is 4 digits long, this means they have been with the company for longer than 15 years,
// and should receive an additional 5%.
// - However, if their annual income is greater than $65,000, they should have their bonus adjusted down 1%.
// - No bonus can be above 13% or below 0% total.

// NOTE: You may abstract out this bonus calculation into a second function if you like, but this is not mandatory.

/**@author Meaghan R. - Created bonus percentage calculator function*/
/**
 * @param {object} - takes in employee object (includes name, employee number, annual salary, review rating properties)
 * @return {number} - will return a bonus percentage 
 */
function bonusPercentage(employee) {
  let bonus = 0;
  if (employee.employeeNumber.length === 4) {
    bonus += .05;
  } if (employee.annualSalary > 65000) {
    bonus -= .01;
  }
  switch (employee.reviewRating) {
    case 1:
      bonus = 0;
      break;
    case 2:
      bonus = 0;
      break;
    case 3:
      bonus += .04;
      break;
    case 4:
      bonus += .06;
      break;
    case 5:
      bonus += .10;
      break;
  }
  if (bonus > .13) {
    bonus = .13;
  } if (bonus < 0) {
    bonus = 0;
  }

  return bonus;
} 

/**
 * Display stuff on DOM
 */

function display(employeesArray) {
  employeesArray = employees;
  const displayTarget = document.getElementById('display-target');
  displayTarget.innerHTML = '';
  for (let employee of employeesArray) {
    const employeeBonusObject = {
      name: employee.name,
      bonusPercentage: bonusPercentage(employee) * 100,
      totalCompensation: Math.round(((bonusPercentage(employee) + 1) * employee.annualSalary)),
      totalBonus: Math.round((bonusPercentage(employee) * employee.annualSalary))
    };
    displayTarget.innerHTML += `<h2> Name: ${employeeBonusObject.name} </h2> <ul> <li> Bonus: ${employeeBonusObject.bonusPercentage} % </li> <li> Total Comp (Salary + Bonus): ${employeeBonusObject.totalCompensation} </li> <li> Bonus: ${employeeBonusObject.totalBonus} </li> </ul>`;
  } 
}