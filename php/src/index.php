<?php
    $ini = parse_ini_file('app.ini');

    session_start();
    $_SESSION['base_url_swagger'] = $ini['base_url_swagger'];
    $_SESSION['token'] = $ini['token'];;
    $_SESSION['cdi'] = 	intval($ini['cdi']);
    $_SESSION['contractor_id'] = intval($ini['contractor_id']);
    $_SESSION['actor_id'] = intval($ini['actor_id']);    
?>



<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <style>
        body {
    background-image: url('https://www.oodrive.com/wp-content/uploads/2022/01/fond-business-card-1-2-2048x210.png');
    background-repeat: no-repeat;
    background-size: contain; /* Adjusted property */
    background-position: center bottom;
    font-family: Arial, sans-serif;
    text-align: center;
    padding-top: 30px;
    background-attachment: fixed;
}


        img {
            width: 1000px;
            height: 100px;
            margin-bottom: 20px;
        }

        button {
            padding: 8px 16px;
            background-color: #efefef;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 2px;
            transition: background-color 0.3s ease;
            background-image: linear-gradient(to bottom right, #e8e8e8, #c4c4c4);
        }

        button:hover {
            background-image: linear-gradient(to bottom right, #c4c4c4, #e8e8e8);
            font-size: 13px;
            line-height: 15px;
            font-weight: 50;
            text-align: left;
        }

        .select {
            background-color: #efefef;
            padding: 4px;
            border-radius: 2px;
            margin: 4px;
        }

        #iframediv {
            height: 800px;
        }
        #messagediv p.success-message {
            color: green;
            font-size: 40px;
            font-weight: bold ;
            font-style: i;
        }
        #messagediv p.failed-message {
            color: red;
            font-size: 40px;
        }
    </style>
</head>
<body>
    <img src="https://www.oodrive.com/wp-content/uploads/2021/12/LOGO-OODRIVE-2022-noir.svg"/>
    <br><br>
        <div style="text-align: center">
           <button onclick="send_request('create-contract4.php')">Create contract</button>
           <button onclick="getStatusAndExtract()">Get status</button>

           <select id="generate" onChange="generateOnSelect(this)" class="select" >
                <option value="" disabled selected>Select Signatory </option>
            </select>
           <button onclick="redirect_to_sign()">Sign contract in main page </button>
           <button onclick="disp_sign_iframe()">Sign contract here  </button>
           <button onclick="send_request('get-signed-contract4.php')">Download signed contract</button>      
        </div>
        <br><br>
        


        <div id="messagediv"></div>
        <div id="iframediv" ></div>
    </body>
    <script>
         const error = encodeURIComponent('https://bing.com');
            var infos = null;
            var contractor = null;
            var lid = 37846 //Put your licence id here
            function send_request(endpoint) {
                var objXMLHttpRequest = new XMLHttpRequest();
                objXMLHttpRequest.onreadystatechange = function() {
                    console.log(objXMLHttpRequest.responseText);
                    if(objXMLHttpRequest.readyState === 4) {
                        if(objXMLHttpRequest.status === 200) {    
                            console.log(objXMLHttpRequest.responseText);                     
                            const myjson = JSON.parse(objXMLHttpRequest.responseText);
                            const iframe = document.getElementById('iframediv');
                            let message = document.getElementById('messagediv');

                            if (endpoint === 'get-signed-contract4.php') {
                                if (myjson.code == 200) {
                                    message.innerHTML =  "";
                                    iframe.innerHTML = `<iframe src="${myjson.pdffile}" height="100%" width="100%"></iframe>`;
                                }
                                else {
                                    message.innerHTML = `<p>request error. Message : ${myjson.pdffile}`;
                                    iframe.innHTML = "";                              
                                }
                            }
                            else {
                                iframe.innerHTML = "";
                                message.innerHTML = `<p>${myjson.response}<p>`;
                                if (endpoint.startsWith('create-token')) {
                                    infos.token = myjson.response;
                                }
                                else if (endpoint.startsWith('create-contract')) {
                                // Check if contract was created successfully
                                if (myjson.code == 200) {
                                    message.innerHTML = `<p class="success-message" >Contract created successfully<p>`;
                                } else {
                                    message.innerHTML = `<p class="failed-message" > WARNING : Contract creation failed! . Message: ${myjson.message}<p>`;
                                }
                                infos = myjson.response;
                                fillSelect();
                            }
                            }
                        } else {
                            alert('Error Code: ' +  objXMLHttpRequest.status);
                            alert('Error Message: ' + objXMLHttpRequest.statusText);
                        }
                    }
                }
                objXMLHttpRequest.open('GET', endpoint);
                objXMLHttpRequest.send();               
            }

            function getStatusAndExtract() {
    send_request('get-status4.php');
    setTimeout(extractStatusFromDisplayedJson, 1000); // Wait 1 second before extracting status
}

function extractStatusFromDisplayedJson() {
    const messageDiv = document.getElementById('messagediv');
    const displayedJsonText = messageDiv.textContent;

    try {
        const displayedJson = JSON.parse(displayedJsonText);
        const status = displayedJson.status || "Status information not available";
        messageDiv.innerHTML = `<p>Status: ${status}</p>`;
    } catch (error) {
        console.error("Error parsing JSON:", error);
        messageDiv.innerHTML = "<p>Error parsing JSON</p>";
    }
}




            function fillSelect() {
    let select = document.getElementById('generate');
    infos.contractors.forEach((c) => {
        let opt = document.createElement('option');
        opt.value = c.lastname;
        opt.setAttribute('data-contractor-id', c.id); // Set the data-contractor-id attribute
        opt.innerHTML = c.lastname;
        select.appendChild(opt);
    });

    select.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const contractor_id = selectedOption.getAttribute('data-contractor-id'); // Retrieve the contractor_id attribute
        generateSignatureLink(contractor_id);
    });
}

function generateSignatureLink(contractor_id) {
    
    const signatureLinkUrlRequest = new XMLHttpRequest();
    signatureLinkUrlRequest.onreadystatechange = function() {
        if (signatureLinkUrlRequest.readyState === 4 && signatureLinkUrlRequest.status === 200) {
            const jsonResponse = JSON.parse(signatureLinkUrlRequest.responseText);
            const signatureLinkUrl = jsonResponse.response; // Extract the URL from the JSON response
            displayLink(signatureLinkUrl); // Display the link in the messagediv
        }
    };
    signatureLinkUrlRequest.open('GET', `generate_signature_link.php?contractor_id=${contractor_id}`, true);
    signatureLinkUrlRequest.send();
}


let displayedLink = ''; // Declare a variable to store the displayed link

function displayLink(link) {
    const messagediv = document.getElementById("messagediv");

    // Remove the escaping from slashes
    const formattedLink = link.replace(/\\/g, '');

    // Store the formatted link in the variable and display it
    displayedLink = formattedLink;
    messagediv.textContent = displayedLink;
}

function clearDisplayedLink() {
    const messagediv = document.getElementById("messagediv");
    messagediv.textContent = ''; // Clear the link content
    displayedLink = ''; // Clear the stored link
}

// Example usage:
function anotherButtonClicked() {
    const messagediv = document.getElementById("messagediv");
    messagediv.innerHTML = ""; // Clear the link content
    // ... (perform other actions)
}


//


function disp_sign_iframe() {
    const iframe = document.getElementById('iframediv');
    const messagediv = document.getElementById('messagediv');
    
    // Retrieve the formatted link from the messagediv
    const formattedLink = messagediv.textContent;
    clearDisplayedLink();
   
    if (formattedLink) {
        // Display the iframe with the stored formatted link as the source
        iframe.innerHTML = `<iframe width="1024" height="800" src="${formattedLink}"></iframe>`;
    } else {
        // Handle the case when the formatted link is not available
        iframe.innerHTML = "No signature link available.";
    }
}

function redirect_to_sign() {
    
    
    const messagediv = document.getElementById('messagediv');
    const formattedLink = messagediv.textContent;
    clearDisplayedLink();
    if (formattedLink) {
        console.log(infos.contract_id);
        console.log(contractor);
        
        // Redirect to the formatted link
        // location.href = formattedLink;
        window.open(formattedLink, '_blank');
    } else {
        console.log("No signature link available.");
    }
}

        </script>
</html>