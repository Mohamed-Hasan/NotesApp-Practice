import expect from 'expect';
import {Meteor} from 'meteor/meteor';
import {Notes} from './notes';
import moment from 'moment';

if (Meteor.isServer) {
    describe('Notes', function (params) {
        beforeEach(function () {
            Notes.remove({});
            Notes.insert({
                _id: 'testId',
                title: '',
                body: '',
                updatedAt: moment().valueOf(),
                userId: 'testID',
            })
            Notes.insert({
                _id: 'testId2',
                title: '',
                body: '',
                updatedAt: moment().valueOf(),
                userId: 'testID2',
            })
        });
        it('should insert a note', function () {
            const userId = 'testUserId'
            const user = {
                userId
            }
            // console.log(Meteor.server.method_handlers)
            const _id = Meteor.server.method_handlers['notes.insert'].apply(user)
            expect(_id).toExist()
        });
        it('should remove a note', function () {
            const userId = 'testId'
            const _id = Meteor.server.method_handlers['notes.remove'].apply({
                userId: 'testID'
            }, ['testId'])
            expect(Notes.findOne({
                _id: "testId"
            })).toNotExist()
        });
        it('should update a note', function () {
            const title = 'new updated title';
            const before = Notes.findOne({
                _id: "testId"
            })
            const _id = Meteor.server.method_handlers['notes.update'].apply({
                userId: 'testID'
            }, ['testId', {
                title
            }])
            expect(Notes.findOne({
                _id: "testId"
            })).toInclude({
                title
            })
            expect(Notes.findOne({
                _id: "testId"
            }).updatedAt).toBeGreaterThan(before.updatedAt);

            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: 'testID'
                }, ['testId', {
                    title,
                    name: 'name'
                }])
            }).toThrow()
        });

        it('should retrieve a user note', function () {
            const notes = Meteor.server.publish_handlers.notes.apply({
                userId: "testID"
            });
            expect(notes.length).toBe(1);
        });

        it('should not retrieve any user note', function () {
            const notes = Meteor.server.publish_handlers.notes.apply({
                userId: "testID3"
            });
            expect(notes.length).toBe(0);
        })
    })
}