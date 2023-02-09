const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Виртуальное свойство для полного имени автора
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Виртуальное свойство - URL автора
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});


AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
   
  return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_FULL);
});


AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_FULL);

});


//Export model
module.exports = mongoose.model('Author', AuthorSchema);
