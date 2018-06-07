import expect from 'expect';
import { validateUserFn } from "./users";
import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
    describe('user',function(){
        it('add the correct email',function () {
            const user = {
                emails: [
                    {
                        address: 'm@m.com'
                    }
                ]
            };
            expect(validateUserFn(user)).toBe(true);
        });

        it('Reject the incorrect email',function () {
            const user = {
                emails: [
                    {
                        address: 'mmcom'
                    }
                ]
            };
            expect(()=>validateUserFn(user)).toThrow();
        })
    })
}

