import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

if (Meteor.isClient) {
    describe('PrivateHeader',function () {
        const title = "MY Title"
        const wrapper = mount( <PrivateHeader title={title} handleLogOut={ ()=> 1 } />);
        it('Button text should be "Logout" ',function(){
            const button = wrapper.find('.button').text();
            expect(button).toBe('Logout')
        })
        it('Button text should be "Logout" ',function(){
            const realTitle = wrapper.find('h1').text();
            expect(realTitle).toBe(title);
        })
        it("should call the spy", function(){
            const spy = expect.createSpy();
            const wrapper = mount(<PrivateHeader title={title} handleLogOut={spy} />)
            wrapper.find('button').simulate('click')
            expect(spy).toHaveBeenCalled()
        })
    })
}