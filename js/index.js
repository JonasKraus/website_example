/**
 * Created by jonas-uni on 20.01.2017.
 */
function loadText() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        // check the state of the connection
        if (this.readyState == 4 && this.status == 200) {

            // json decode response
            var response = JSON.parse(this.responseText);

            // Check if succes is not undefined
            if (typeof response.success != undefined) {


                // Reset field if successfully saved
                if (response.success && typeof response.data != undefined) {

                    // value was returned and can be added to the view
                    document.getElementById('result_get').innerHTML = 'loaded ' + response.data.length + ' records';

                    createTable(response.data);
                }
            }
        }
    };
    //Send the proper header information along with the request
    xhttp.open('POST', 'php/input.php', true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var params = 'action=' + 'getText';
    xhttp.send(params);
}


/**
 * Function to save text to the database
 */
function saveText() {

    // get the textinput field from the view by its unique index
    var text = document.getElementById('text_box_set').value;

    // check if there is some text in the input field
    if (text == '') {

        alert('Please insert some text');
    }

    // AJAX Object to make an asynchronous request to the server
    var xhttp = new XMLHttpRequest();

    // Callback function for asynchronous response
    xhttp.onreadystatechange = function() {

        // check the state of the connection
        if (this.readyState == 4 && this.status == 200) {

            // json decode response
            var response = JSON.parse(this.responseText);

            // Check if succes is not undefined
            if (typeof response.success != undefined) {

                // value was returned and can be added to the view
                document.getElementById('result_set').innerHTML = 'saving text was successful: ' + response.success;

                // Reset field if successfully saved
                if (response.success) {

                    document.getElementById('text_box_set').value = '';

                    // if autoload is checked reload dataset
                    if (document.getElementById('autoload_text').checked) {

                        loadText();
                    }
                }
            }
        }
    };

    // HTTP-Method POST
    xhttp.open('POST', 'php/input.php', true);
    //Send the proper header information along with the request
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // sets POST value and sends the request
    // concat multiple params with & like (bla1=123&bla2=321)
    var params = 'action=' + 'saveText' +  '&param1=' + text;

    // Send request with post params
    xhttp.send(params);
}


function createTable(tableData) {

    var table = document.getElementById('result_table');

    // Remove body - so no duplicate rows
    document.getElementById('result_table_body').remove();

    // create new body
    var tableBody = document.createElement('tbody');
    // set same id
    tableBody.id = 'result_table_body';

    tableData.forEach(function (rowData) {

        var row = document.createElement('tr');
        var cellText = document.createElement('td');
        cellText.appendChild(document.createTextNode(rowData.text));

        var cellId = document.createElement('td');
        cellId.appendChild(document.createTextNode(rowData.id));

        row.appendChild(cellId);
        row.appendChild(cellText);

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody, document.getElementById('result_table_body'));
    document.body.appendChild(table, document.getElementById('result_table'));
}
