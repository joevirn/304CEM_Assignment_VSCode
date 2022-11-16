const mongoose = require('mongoose');

const db = "mongodb+srv://joevirn:304CEM@cluster0.n2jpkn8.mongodb.net/304CEM?retryWrites=true&w=majority"; //connection string
  
mongoose
.connect(db)
.then(()=> {
    console.log("Connected to database"); //successful message
}
)
.catch(()=> {
    console.log("Error Connecting to database"); //error message
}
)

//declare a schema to match the database table
const schema = new mongoose.Schema({
    sourceCountryName: {type: String},
    sourceCountryCapital: {type: String},
    sourceCountryRegion: {type: String},
    sourceCountryTimeZone: {type: String},
    sourceCountryFlag: {type: String},
    sourceCountryCurrencyCode: {type: String},
    sourceCountryCurrencyName: {type: String},
    sourceCountryCurrencySymbol: {type: String},
    destinationCountryName: {type: String},
    destinationCountryCapital: {type: String},
    destinationCountryRegion: {type: String},
    destinationCountryTimeZone: {type: String},
    destinationCountryFlag: {type: String},
    destinationCountryCurrencyCode: {type: String},
    destinationCountryCurrencyName: {type: String},
    destinationCountryCurrencySymbol: {type: String},
    currencyExchangeRate: {type: String}
});

const CountriesAndExchangeRates = mongoose.model('CountriesAndExchangeRates', schema);

module.exports = CountriesAndExchangeRates;
