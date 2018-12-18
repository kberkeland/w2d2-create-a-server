class Employee{
    constructor( firstName, lastName, idNumber, title, annualSalary ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.title = title;
        this.annualSalary = annualSalary;
    } //end constructor
} // end Employee class
  
let employeeArray = [];
let tableHeaders = '<tr>' + '<th>' + 'First Name' + '</th>' + '<th>' + 'Last Name' + '</th>' + '<th>' + 'ID' + '</th>' + '<th>' + 'Title' + '</th>' + '<th>' + 'Annual Salary' + '</th>' + '<th>' + 'Delete Row?' + '</th>' + '</tr>';
let monthlySalaryTotal;

$ ( document ).ready( function() {
    // console.log('DOM ready');
    
    $ ( '#employeeTable' ).append(tableHeaders);

    $ ( '#addEmployeeButton' ).on( 'click', addEmployee );

    $ ( '#employeeTable' ).on( 'click', '#delete', removeFromArray);

}); // end document ready
  
// Adds an employee to an array and displays on the DOM in a table.
function addEmployee() {
    // displayMessage('');
    if ( $( '#firstNameIn' ).val() == '' || $( '#lastNameIn' ).val() == '' || $( '#idNumberIn' ).val() == '' || $( '#titleIn' ).val() == '' || $( '#annualSalaryIn' ).val() == '') {
        // display an error message because one of the fields is empty
        headerMessage(' - One of the fields is missing');
        return false;
    } else if ( isNaN($( '#annualSalaryIn' ).val()) ) {
        // display an error message because Annual Salary is not a number.
        headerMessage(' - Annual Salary is Not a Number');
        return false;
    } else {
        // use newEmployee function to add an employee
        headerMessage(' ');
        newEmployee( $( '#firstNameIn' ).val(), $( '#lastNameIn' ).val(), $( '#idNumberIn' ).val(), $( '#titleIn' ).val(), $( '#annualSalaryIn' ).val() );
    } // end if

    // run functions to clear the input fields and display employees
    clearInput();
    showEmployee();
    monthlySalaryDisplay();

} // end addEmployee

// Creates an entry in the employeeArray
function newEmployee( firstName, lastName, idNumber, title, annualSalary ){
    employeeArray.push( new Employee( firstName, lastName, parseFloat(idNumber), title, parseFloat(annualSalary) ) );
    return true;
} // end newEmployee

// Clears the input fields
function clearInput() {
    // clear the values in html
    $( '#firstNameIn' ).val( '' );
    $( '#lastNameIn' ).val( '' );
    $( '#idNumberIn' ).val( '' );
    $( '#titleIn' ).val( '' );
    $( '#annualSalaryIn' ).val( '' );
} // end clearInput

// Function to display employees on a table
function showEmployee() {
    let outputElement = $ ( '#employeeTable' );
    outputElement.empty();
    outputElement.append(tableHeaders);
    for ( employee of employeeArray) {
      outputElement.append( '<tr>' + 
        '<td>' + employee.firstName + '</td>' +
        '<td>' + employee.lastName + '</td>' +
        '<td>' + employee.idNumber + '</td>' +
        '<td>' + employee.title + '</td>' +
        '<td>' + formatter.format(employee.annualSalary) + '</td>' + 
        '<td>' + '<button class="btn btn-danger" id="delete">Delete</button>' + '</td>' + '</tr>');
    } // end for of
} // end showEmployee

// Displays the monthly total
function monthlySalaryDisplay() {
    monthlySalaryTotal = monthlySalary();
    let totalSalaryOut = '<div>' + 'Monthly total: ' + formatter.format(monthlySalaryTotal) + '</div>'
    if( monthlySalaryTotal > 20000 ) {
        $( '#monthlySalary' ).html(totalSalaryOut).css('background-color','red');
    } else {
        $( '#monthlySalary' ).html(totalSalaryOut).css('background-color','ivory');
    } // end if
} // end monthlySalaryDisplay

// Totals the monthly expenditure
function monthlySalary() {
    let yearTotal = 0;
    for( employee of employeeArray ) {
        yearTotal += employee.annualSalary;
    }
    return yearTotal / 12;
}

// Removes a line from the table when delete is clicked. Calls a function to remove the row from employeeArray.
function removeFromArray() {
    let rowToRemove =  $(this).parent().siblings().text();
    removeEmployee(rowToRemove);
}

// Removes an employee from employeeArray
function removeEmployee(rowToDelete) {
    for( let i in employeeArray ) {
        let currentEmployee =   employeeArray[i].firstName + 
                                employeeArray[i].lastName + 
                                employeeArray[i].idNumber +
                                employeeArray[i].title +
                                formatter.format(employeeArray[i].annualSalary);
        if( rowToDelete == currentEmployee ) {
            employeeArray.splice(i, 1);
        } // end if
    } // end for in

    showEmployee();
    monthlySalaryDisplay();

} // end removeEmployee

// add display message function
function headerMessage( text ) {
    let outputError = $ ( '#headerMessageOut' );
    outputError.empty();
    outputError.append( '<h3>Add Employee' + text + '</h3>' );
} // end headerMessage

// Create our number formatter. - Stolen from the internet
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
});