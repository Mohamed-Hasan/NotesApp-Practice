import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Notes } from '../imports/api/notes';
import '../imports/api/users';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
    // Meteor.call('notes.insert',(err,res)=> { console.log(res) }); 
});

