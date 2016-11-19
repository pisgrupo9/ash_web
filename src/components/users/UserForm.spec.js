import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import UserForm from './UserForm';

function setup(user, loading, onSave) {
  let props = {
    user,
    loading: loading || false,
    errors: {},
    onSave,
    onChange: () => {},
    onBlur: () => {},
    onKeyPress: () => {}
  };

   return shallow(<UserForm {...props}/>);
}

describe('Elementos del formulario de crear cuenta para un usuario', () => {
  it('exite el formulario', () => {
    expect(UserForm).to.exist;
  });

  it('Existen los campos del formulario', () => {
    const user = {};
    const onSave = () => {};
    const wrapper = setup(user, false, onSave);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('Input')).to.have.length(6);
  });

  it('Cuando no está cargando se muestra el botón', () => {
    const user = {};
    const onSave = () => {};
    const wrapper = setup(user, false, onSave);
    expect(wrapper.find('input[type="submit"]')['node'].props.value).to.equal('ENVIAR');
    expect(wrapper.find('input[type="submit"]')).to.have.length(1);
  });

  it('Hay un spinner si se está cargando', () => {
    const user = {};
    const onSave = () => {};
    const wrapper = setup(user, true, onSave);
    expect(wrapper.find('Spinner')).to.have.length(1);
  });

  it('Simula el evento de clickear el boton', () => {
    const user = {
      nameValue: 'Test One',
      emailValue: 'password',
      phoneValue: '099123456',
      passwordValue: 'password',
      confirmedPasswordValue: 'password'
    };
    const onSave = sinon.spy();
    const wrapper = setup(user, false, onSave);
    expect(onSave.calledOnce).to.be.false;
    wrapper.find('input[type="submit"]').simulate('click');
    expect(onSave.calledOnce).to.be.true;
  });
});
