import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import LoginForm from './LoginForm';

const setup = (form, loading, submit) => {
  let props = {
    form,
    loading: loading,
    error: '',
    onChange: () => {},
    onKeyPress: () => {},
    onSubmit: submit
  };

   return shallow(<LoginForm {...props}/>);
};

describe('Elementos del formulario para iniciar sesión', () => {
  const emptyForm = {
    email: '',
    pass: ''
  };

  it('exite el formulario', () => {
    expect(LoginForm).to.exist;
  });

  it('Existen los campos del formulario', () => {
    const onSubmit = () => {};
    const wrapper = setup(emptyForm, false, onSubmit);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('Input')).to.have.length(2);
  });

  it('Cuando no está cargando se muestra el botón', () => {
    const onSubmit = () => {};
    const wrapper = setup(emptyForm, false, onSubmit);
    expect(wrapper.find('input[type="button"]')['node'].props.value).to.equal('INGRESAR');
    expect(wrapper.find('input[type="button"]')).to.have.length(1);
  });

  it('Hay un spinner si se está cargando', () => {
    const onSubmit = () => {};
    const wrapper = setup(emptyForm, true, onSubmit);
    expect(wrapper.find('Spinner')).to.have.length(1);
  });

  it('Simula el evento de clickear el boton', () => {
    const onSubmit = sinon.spy();
    const wrapper = setup(emptyForm, false, onSubmit);
    expect(onSubmit.calledOnce).to.be.false;
    const submitButton = wrapper.find('input[type="button"]');
    expect(submitButton['node'].props.value).to.equal('INGRESAR');
    submitButton.simulate('click');
    expect(onSubmit.calledOnce).to.be.true;
  });
});
