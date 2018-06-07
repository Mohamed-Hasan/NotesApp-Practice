import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
    Meteor.publish('notes',function () {
        return Notes.find({userId: this.userId}).fetch()        
    })
}
Meteor.methods({
    'notes.insert'(){
        if (!this.userId) {
            throw new Meteor.Error('Not Authorized to insert a note')
        };
        return Notes.insert({
            title:'',
            body:'',
            updatedAt:moment.valueOf() ,
            userId:this.userId,
        });
    },
    'notes.remove'(_id){
        if (!this.userId) {
            throw new Meteor.Error('Not Authorized to insert a note')
        };
        // const userId = this.userId
        new SimpleSchema({
            _id:{
                type: String,
                required: true,
                min: 1
            }
        }).validate({_id})
        
        Notes.remove({_id,userId: this.userId})
    },
    'notes.update'(_id, updatesObj){
        if (!this.userId) {
            throw new Meteor.Error('Not Authorized to insert a note')
        };
        new SimpleSchema({
            _id:{
                type: String,
                required: true,
                min: 1
            },
            body:{
                type: String,
                optional: true,
            },
            title:{
                type: String,
                optional: true,
            },
        }).validate({_id, ...updatesObj})
        Notes.update({_id, userId: this.userId},{
            $set: {
                updatedAt: moment().valueOf(),
                ...updatesObj
            }
        })
    },
})