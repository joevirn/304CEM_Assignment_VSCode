import logo from './assets/logo.png';
import currencyExchangeIcon from './assets/currencyExchangeIcon.png';
import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

var dataHTMLHistory = "";

var dataHTMLCurrencyExchangeRate = "";
var dataHTMLSourceCountryInformation = "";
var dataHTMLDestinationCountryInformation = "";

function App() {
  const [sourceQuery,setSourceQuery] = useState('');
  const [destinationQuery,setDestinationQuery] = useState('');

  const [,setCurrencyExchangeRate] = useState('');
  const [,setSourceCountryInformation] = useState('');
  const [,setDestinationCountryInformation] = useState('');
  const [,setHistoryRecord] = useState('');

  function handleRefreshPage() {
    window.location.reload();
 }

  function handleSubmit(e) {
    dataHTMLHistory = "";
    setHistoryRecord(dataHTMLHistory);

    const query = `http://localhost:92/addRecord?sourceCountry=` + sourceQuery + `&destinationCountry=` + destinationQuery;
    console.log(query);
    e.preventDefault();

    axios
    .get(query)
    .then(res => {
      console.log(res.data.sourceCountryName);
      console.log(res.data.destinationCountryName);

      dataHTMLCurrencyExchangeRate = "";
      dataHTMLCurrencyExchangeRate += "<br/><p><img width='150px' alt='Currency Exchange Icon' src='" + currencyExchangeIcon + "'/></p>";
      dataHTMLCurrencyExchangeRate += "<h1><tt><b><u>CURRENCY EXCHANGE RATE</u></b></tt></h1><br/>";
      dataHTMLCurrencyExchangeRate += "<h1>" + 
                                        "<b>" + res.data.sourceCountryCurrencyCode + " 1  =  " + res.data.destinationCountryCurrencyCode + " " + res.data.currencyExchangeRate + "</b>" +
                                      "</h1><br/>";
      dataHTMLCurrencyExchangeRate += "<h2>" + 
                                        res.data.sourceCountryCurrencyName + " -> " + res.data.destinationCountryCurrencyName + 
                                      "</h2><br/><br/>";                                      
      setCurrencyExchangeRate(dataHTMLCurrencyExchangeRate);

      dataHTMLSourceCountryInformation = "";
      dataHTMLSourceCountryInformation += "<h1><tt><b><u>SOURCE COUNTRY</u></b></tt></h1><br/>";
      dataHTMLSourceCountryInformation += "<h2><b>Name: </b>" + res.data.sourceCountryName + "</h2>";
      dataHTMLSourceCountryInformation += "<h2><b>Capital: </b>" + res.data.sourceCountryCapital + "</h2>";
      dataHTMLSourceCountryInformation += "<h2><b>Region: </b>" + res.data.sourceCountryRegion + "</h2>";
      dataHTMLSourceCountryInformation += "<h2><b>Time Zone: </b>" + res.data.sourceCountryTimeZone + "</h2><br/>";
      dataHTMLSourceCountryInformation += "<h2><b>National Flag: </b></h2>";
      dataHTMLSourceCountryInformation += "<h2><img width='80%' border='2px' alt='Source Country Flag' src='" + res.data.sourceCountryFlag + "'/></h2><br/>";
      setSourceCountryInformation(dataHTMLSourceCountryInformation);

      dataHTMLDestinationCountryInformation = "";
      dataHTMLDestinationCountryInformation += "<h1><tt><b><u>DESTINATION COUNTRY</u></b></tt></h1><br/>";
      dataHTMLDestinationCountryInformation += "<h2><b>Name: </b>" + res.data.destinationCountryName + "</h2>";
      dataHTMLDestinationCountryInformation += "<h2><b>Capital: </b>" + res.data.destinationCountryCapital + "</h2>";
      dataHTMLDestinationCountryInformation += "<h2><b>Region: </b>" + res.data.destinationCountryRegion + "</h2>";
      dataHTMLDestinationCountryInformation += "<h2><b>Time Zone: </b>" + res.data.destinationCountryTimeZone + "</h2><br/>";
      dataHTMLDestinationCountryInformation += "<h2><b>National Flag: </b></h2>";
      dataHTMLDestinationCountryInformation += "<h2><img width='80%' border='2px' alt='Destination Country Flag' src='" + res.data.destinationCountryFlag + "'/></h2><br/>";
      setDestinationCountryInformation(dataHTMLDestinationCountryInformation);

    })
    .catch(error => {
      alert('Error: Countries not found! Please check your input & try again!');
      window.location.reload();
    });
  };

  async function handleShowHistory(e) {

    dataHTMLCurrencyExchangeRate = "";
    setCurrencyExchangeRate(dataHTMLCurrencyExchangeRate);
    dataHTMLSourceCountryInformation = "";
    setSourceCountryInformation(dataHTMLSourceCountryInformation);
    dataHTMLDestinationCountryInformation = "";
    setDestinationCountryInformation(dataHTMLDestinationCountryInformation);

    const res = await fetch(`http://localhost:92/getHistory`,{method:'GET'});
    const historyData = await res.json();

    if(historyData.data.length===0) {
      alert("No record found in history! Perform a search to view history.");
    }
    else {
      
      dataHTMLHistory = "";

      dataHTMLHistory += "<div className='row'>";
      dataHTMLHistory += "<div className='col-md-12'>";
  
      dataHTMLHistory += "<h1><tt><b><u>YOUR SEARCH HISTORY</u></b></tt></h1>";
      dataHTMLHistory += "<table>";
      dataHTMLHistory += "<tr>";
      dataHTMLHistory +=  "<th width='' colspan='8'><b>SOURCE COUNTRY</b></th>" + 
                          "<th width='' colspan='8'><b>DESTINATION COUNTRY</b></th>"+
                          "<th width='' rowspan='2'><b>CURRENCY CONVERSION RATE</b></th>";
      dataHTMLHistory += "</tr>";
      dataHTMLHistory += "<tr>";
      dataHTMLHistory +=  "<th width=''>Country Name</th>" + 
                          "<th width=''>National Flag</th>"+
                          "<th width=''>Capital</th>"+
                          "<th width=''>Region</th>"+
                          "<th width=''>Time Zone</th>"+
                          "<th width=''>Currency Code</th>"+
                          "<th width=''>Currency Name</th>"+
                          "<th width=''>Currency Symbol</th>";
      dataHTMLHistory +=  "<th width=''>Country Name</th>" + 
                          "<th width=''>National Flag</th>"+
                          "<th width=''>Capital</th>"+
                          "<th width=''>Region</th>"+
                          "<th width=''>Time Zone</th>"+
                          "<th width=''>Currency Code</th>"+
                          "<th width=''>Currency Name</th>"+
                          "<th width=''>Currency Symbol</th>";
      dataHTMLHistory += "</tr>";
  
      //loop through json array result from database in reverse order to get latest result on top
      for (var i = (historyData.data.length-1); i >= 0; i--){
        dataHTMLHistory += "<tr>";
        dataHTMLHistory +=  "<td><b>"+historyData.data[i].sourceCountryName+"</b></td>" + 
                            "<td><img width='100%' border='2px' alt='Destination Country Flag' src='" + historyData.data[i].sourceCountryFlag + "'/></td>"+
                            "<td>"+historyData.data[i].sourceCountryCapital+"</td>"+
                            "<td>"+historyData.data[i].sourceCountryRegion+"</td>"+
                            "<td>"+historyData.data[i].sourceCountryTimeZone+"</td>"+
                            "<td>"+historyData.data[i].sourceCountryCurrencyCode+"</td>"+
                            "<td>"+historyData.data[i].sourceCountryCurrencyName+"</td>"+
                            "<td>"+historyData.data[i].sourceCountryCurrencySymbol+"</td>";
        dataHTMLHistory +=  "<td><b>"+historyData.data[i].destinationCountryName+"</b></td>" + 
                            "<td><img width='100%' border='2px' alt='Destination Country Flag' src='" + historyData.data[i].destinationCountryFlag + "'/></td>"+
                            "<td>"+historyData.data[i].destinationCountryCapital+"</td>"+
                            "<td>"+historyData.data[i].destinationCountryRegion+"</td>"+
                            "<td>"+historyData.data[i].destinationCountryTimeZone+"</td>"+
                            "<td>"+historyData.data[i].destinationCountryCurrencyCode+"</td>"+
                            "<td>"+historyData.data[i].destinationCountryCurrencyName+"</td>"+
                            "<td>"+historyData.data[i].destinationCountryCurrencySymbol+"</td>";
        dataHTMLHistory +=  "<td><b>"+historyData.data[i].currencyExchangeRate+"</b></td>"
        dataHTMLHistory += "</tr>";
      }
  
      dataHTMLHistory+="</table>";
      dataHTMLHistory+="</div>";
      dataHTMLHistory+="</div>";
  
      setHistoryRecord(dataHTMLHistory);

    }

    console.log(historyData.data.length);
    console.log(historyData.data);
  };

  async function handleDeleteHistory(e) {
    const resResult = await fetch(`http://localhost:92/getHistory`,{method:'GET'});
    const historyData = await resResult.json();

    const res = await fetch(`http://localhost:92/deleteHistory`,{method:'GET'});
    const deleteHistoryData = await res.json();

    if(historyData.data.length===0) {
      alert("Unable to delete as there is no record found! Perform a search to add to history.");
    }
    else {
      console.log(deleteHistoryData.statusMessage);
      alert(deleteHistoryData.statusMessage);
      window.location.reload();
    }
  };

  return (
      <div className="App">
        <header className="App-header">
          <a onClick={handleRefreshPage} href=" "><img src={logo} className="App-logo" alt="logo" onClick={handleRefreshPage}/></a>
          <h3><tt>GLOBECUR</tt></h3>
          <h4><tt>Your one-stop travel guide!</tt></h4>
          <h4><tt>Get currency exchange rates and country information.</tt></h4><br></br>
        </header>
        <div className="container">
          <div>
            <br></br>
            <h3><tt>Enter source and destination country name<br></br>-------------------------------------------</tt></h3>
            <br></br>
            <div className='row'>
              <div className='col-md-3'></div>
              <div className='col-md-6'>
                <form onSubmit={handleSubmit}>
                  <label><b>Source Country:</b></label>
                  <input
                    type="text"
                    className="form-control"
                    name="sourceCountryInput"
                    onChange={(e)=>setSourceQuery(e.target.value)}
                    value={sourceQuery}
                  />
                  <br></br>
                  <label><b>Destination Country:</b></label>
                  <input
                    type="text"
                    className="form-control"
                    name="destinationCountryInput"
                    onChange={(e)=>setDestinationQuery(e.target.value)}
                    value={destinationQuery}
                  />   
                  <br/>
                  <input type="submit" className='button' value="SEARCH"/>
                </form>
              </div>
              <div className='col-md-3'></div>
            </div>
            <br></br>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className='currencyExchangeRate'>
                <div dangerouslySetInnerHTML={{__html:dataHTMLCurrencyExchangeRate}}/>
              </div>
            </div>  
          </div><br></br><br></br>
          <div className="row">
            <div className="col-md-6">
              <div className='country'>
                <div dangerouslySetInnerHTML={{__html:dataHTMLSourceCountryInformation}}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className='country'>
                <div dangerouslySetInnerHTML={{__html:dataHTMLDestinationCountryInformation}}/>
              </div>
            </div>
          </div><br></br>
          <div className="row">
            <div className="col-md-6">
              <button className='button-view' onClick={handleShowHistory}>VIEW HISTORY</button>
            </div>
            <div className="col-md-6">
              <button className='button-delete' onClick={handleDeleteHistory}>DELETE HISTORY</button>
            </div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{__html:dataHTMLHistory}}/><br></br>
        <div className='row'>
          <br></br>
          <p><tt><b>GLOBECUR - Your one-stop travel guide!</b></tt></p>
        </div>
      </div>

        
  );


}

export default App;