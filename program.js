const Record = require('./dbconnection');
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
app.use(cors());

//variables to store the api data
var sourceCountryName, sourceCountryCapital, sourceCountryRegion, sourceCountryTimeZone, sourceCountryFlag, sourceCountryCurrencyCode, sourceCountryCurrencyName, sourceCountryCurrencySymbol;
var destinationCountryName, destinationCountryCapital, destinationCountryRegion, destinationCountryTimeZone, destinationCountryFlag, destinationCountryCurrencyCode, destinationCountryCurrencyName, destinationCountryCurrencySymbol;
var currencyExchangeRate;

//adds all selected data returned by the API call into mongodb database
//and return the data in json format for client side
app.get('/addRecord', (req, res) => {
    const sourceCountry = req.query.sourceCountry; //store source country input
    console.log("Source Country: " + sourceCountry); //output to terminal for checking purpose
    const destinationCountry = req.query.destinationCountry; //store destination country input
    console.log("Destination Country: " + destinationCountry); //output to terminal for checking purpose
    console.log('\n');

    //1st API link to get source country
    const queryStr1 = `https://restcountries.com/v2/name/${sourceCountry}`;
    //1st API link to get destination country
    const queryStr2 = `https://restcountries.com/v2/name/${destinationCountry}`;

    axios.get(queryStr1).then( (response) =>{
        //variables to store the API data received
        sourceCountryName = response.data[0].name;
        sourceCountryCapital = response.data[0].capital;
        sourceCountryRegion = response.data[0].region;
        sourceCountryTimeZone = response.data[0].timezones[0];
        sourceCountryFlag = response.data[0].flags.png;
        sourceCountryCurrencyCode = response.data[0].currencies[0].code;
        sourceCountryCurrencyName = response.data[0].currencies[0].name;
        sourceCountryCurrencySymbol = response.data[0].currencies[0].symbol;
        
        //display the API data in terminal for checking purpose
        console.log(sourceCountryName);
        console.log(sourceCountryCapital);
        console.log(sourceCountryRegion);
        console.log(sourceCountryTimeZone);
        console.log(sourceCountryFlag);
        console.log(sourceCountryCurrencyCode);
        console.log(sourceCountryCurrencyName);
        console.log(sourceCountryCurrencySymbol);
        console.log('\n');

        axios.get(queryStr2).then( (response) =>{
            //variables to store the API data received
            destinationCountryName = response.data[0].name;
            destinationCountryCapital = response.data[0].capital;
            destinationCountryRegion = response.data[0].region;
            destinationCountryTimeZone = response.data[0].timezones[0];
            destinationCountryFlag = response.data[0].flags.png;
            destinationCountryCurrencyCode = response.data[0].currencies[0].code;
            destinationCountryCurrencyName = response.data[0].currencies[0].name;
            destinationCountryCurrencySymbol = response.data[0].currencies[0].symbol;
            
            //display the API data in terminal for checking purpose
            console.log(destinationCountryName);
            console.log(destinationCountryCapital);
            console.log(destinationCountryRegion);
            console.log(destinationCountryTimeZone);
            console.log(destinationCountryFlag);
            console.log(destinationCountryCurrencyCode);
            console.log(destinationCountryCurrencyName);
            console.log(destinationCountryCurrencySymbol);
            console.log('\n');

            //2nd API link to get currency conversion rate
            const queryStr3 = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${sourceCountryCurrencyCode.toLowerCase()}/${destinationCountryCurrencyCode.toLowerCase()}.json`;

            axios.get(queryStr3).then( (response) =>{

                //variables to store the API data received
                var fullData = response.data; //get full API data in object format
                var dataString = JSON.stringify(fullData); //convert the object to a string format
                currencyExchangeRate = dataString.slice(27,-1); //remove unwanted characters from the string
                
                //display the API data in terminal for checking purpose
                console.log(fullData);
                console.log(currencyExchangeRate);

                //declare a new record
                dataValue = new Record({
                    sourceCountryName:sourceCountryName,
                    sourceCountryCapital:sourceCountryCapital,
                    sourceCountryRegion:sourceCountryRegion,
                    sourceCountryTimeZone:sourceCountryTimeZone,
                    sourceCountryFlag:sourceCountryFlag,
                    sourceCountryCurrencyCode:sourceCountryCurrencyCode,
                    sourceCountryCurrencyName:sourceCountryCurrencyName,
                    sourceCountryCurrencySymbol:sourceCountryCurrencySymbol,
                    destinationCountryName:destinationCountryName,
                    destinationCountryCapital:destinationCountryCapital,
                    destinationCountryRegion:destinationCountryRegion,
                    destinationCountryTimeZone:destinationCountryTimeZone,
                    destinationCountryFlag:destinationCountryFlag,
                    destinationCountryCurrencyCode:destinationCountryCurrencyCode,
                    destinationCountryCurrencyName:destinationCountryCurrencyName,
                    destinationCountryCurrencySymbol:destinationCountryCurrencySymbol,
                    currencyExchangeRate:currencyExchangeRate
                });

                //add record to database
                dataValue
                .save()
                .then(result=> {
                    console.log("Success" + result);
                })
                .catch(error=> {
                    console.log("Error" + error);
                });

                return res.json({
                    status:'ok',
                    sourceCountryName: sourceCountryName,
                    sourceCountryCapital: sourceCountryCapital,
                    sourceCountryRegion: sourceCountryRegion,
                    sourceCountryTimeZone: sourceCountryTimeZone,
                    sourceCountryFlag: sourceCountryFlag,
                    sourceCountryCurrencyCode: sourceCountryCurrencyCode,
                    sourceCountryCurrencyName: sourceCountryCurrencyName,
                    sourceCountryCurrencySymbol: sourceCountryCurrencySymbol,
                    destinationCountryName: destinationCountryName,
                    destinationCountryCapital: destinationCountryCapital,
                    destinationCountryRegion: destinationCountryRegion,
                    destinationCountryTimeZone: destinationCountryTimeZone,
                    destinationCountryFlag: destinationCountryFlag,
                    destinationCountryCurrencyCode: destinationCountryCurrencyCode,
                    destinationCountryCurrencyName: destinationCountryCurrencyName,
                    destinationCountryCurrencySymbol: destinationCountryCurrencySymbol,
                    currencyExchangeRate: currencyExchangeRate
                });

                //only used when not connected to client slide
                //for checking purposes to send API data that is retrieved from server to browser
                // res.send(
                //     '<b>Source Country: ' + '</b><br>' +  
                //     sourceCountryName + '<br>' + 
                //     sourceCountryCapital + '<br>' + 
                //     sourceCountryRegion + '<br>' + 
                //     sourceCountryTimeZone + '<br>' + 
                //     sourceCountryFlag + '<br>' + 
                //     sourceCountryCurrencyCode + '<br>' +
                //     sourceCountryCurrencyName + '<br>' +
                //     sourceCountryCurrencySymbol + '<br><br>' +
                //     '<b>Destination Country: ' + '</b><br>' +
                //     destinationCountryName + '<br>' + 
                //     destinationCountryCapital + '<br>' + 
                //     destinationCountryRegion + '<br>' + 
                //     destinationCountryTimeZone + '<br>' + 
                //     destinationCountryFlag + '<br>' + 
                //     destinationCountryCurrencyCode + '<br>' +
                //     destinationCountryCurrencyName + '<br>' +
                //     destinationCountryCurrencySymbol + '<br><br>' +
                //     '<b>Exchange Rate: ' + currencyExchangeRate + '</b>'
                // );
            });
        });
    });
});

//gets all records saved in mongodb database
//and return the data in json format for client side
app.get('/getHistory', async (req, res) => {
    const data = await Record.find({});
    return res.json({statusMessage:'Fetch records successful!', data:data});
});

//deletes all records in mongodb database
//and return deletion status in json format for client side
app.get('/deleteHistory', async (req, res) => {
    const data = await Record.remove({});
    return res.json({statusMessage:'Deletion successful!'});
});

app.listen(92); //port 92
