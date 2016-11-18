import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import AnimalForm from './AnimalForm';
import { Checkbox } from 'react-bootstrap';
import ImagesDropzone from '../common/ImagesDropzone';
import ProfileDropzone from './ProfileDropzone';
import ModalAnimalButtons from '../common/ModalAnimalButtons';
import SelectInput from '../common/SelectInput';
import Input from '../common/Input';

function setup(animal, onSave, onCancel, speciesSelect) {
  let props = {
    animal,
    speciesSelect: speciesSelect,
    species: [],
    images: [],
    profilePic: '',
    onSave,
    onChange: () => {},
    onCancel,
    onDrop: () => {},
    onDelete: () => {},
    onDropProfile: () => {},
    errors: {}
  };

   return shallow(<AnimalForm {...props}/>);
}

describe('Elementos del formulario de crear un animal', () => {
  it('exite el formulario', () => {
    expect(AnimalForm).to.exist;
  });

  it('Existen los campos del formulario', () => {
    const animal = { species_id: '' };
    const onSave = () => {};
    const onCancel = () => {};
    const wrapper = setup(animal, onSave, onCancel);
    expect(wrapper.find('div')).to.have.length(4);
    expect(wrapper.find(Input)).to.have.length(7);
    expect(wrapper.find(Input)['nodes'][0].props.name).to.equal('chip_num');
    expect(wrapper.find(Input)['nodes'][1].props.name).to.equal('name');
    expect(wrapper.find(Input)['nodes'][2].props.name).to.equal('weight');
    expect(wrapper.find(Input)['nodes'][3].props.name).to.equal('admission_date');
    expect(wrapper.find(Input)['nodes'][4].props.name).to.equal('race');
    expect(wrapper.find(Input)['nodes'][5].props.name).to.equal('birthdate');
    expect(wrapper.find(Input)['nodes'][6].props.name).to.equal('death_date');

    expect(wrapper.find(SelectInput)).to.have.length(2);
    expect(wrapper.find(SelectInput)['node'].props.name).to.equal('sex');
    expect(wrapper.find(SelectInput).last()['node'].props.name).to.equal('species_id');

    expect(wrapper.find(ProfileDropzone)).to.have.length(1);
    expect(wrapper.find(ImagesDropzone)).to.have.length(1);
  });

  it('Cuando el animal es perro se muestran las opciones de vacunado y castrado', () => {
    const animal = { species_id: '1' };
    const speciesSelect = { id: 1, adoptable: true };
    const onSave = () => {};
    const onCancel = () => {};
    const wrapper = setup(animal, onSave, onCancel, speciesSelect);
    expect(wrapper.find(Checkbox)['node'].props.name).to.equal('castrated');
    expect(wrapper.find(Checkbox).last()['node'].props.name).to.equal('vaccines');
  });

  it('Cuando el animal es gato se muestran las opciones de vacunado y castrado', () => {
    const animal = { species_id: '2' };
    const onSave = () => {};
    const onCancel = () => {};
    const speciesSelect = { id: 2, adoptable: true };
    const wrapper = setup(animal, onSave, onCancel, speciesSelect);
    expect(wrapper.find(Checkbox)['node'].props.name).to.equal('castrated');
    expect(wrapper.find(Checkbox).last()['node'].props.name).to.equal('vaccines');
  });

  it('Cuando el animal es de otra especie no se muestran las Checkbox', () => {
    const animal = { species_id: '3' };
    const speciesSelect = { id: 2, adoptable: false };
    const onSave = () => {};
    const onCancel = () => {};
    const wrapper = setup(animal, onSave, onCancel, speciesSelect);
    expect(wrapper.find(Checkbox).length).to.equal(0);
  });

  it('Cuando el animal es de no tiene especie no se muestran las Checkbox', () => {
    const animal = {};
    const speciesSelect = null;
    const onSave = () => {};
    const onCancel = () => {};
    const wrapper = setup(animal, onSave, onCancel, speciesSelect);
    expect(wrapper.find(Checkbox).length).to.equal(0);
  });

  it('Donde están los botones dentro del formulario', () => {
    const animal = {};
    const onSave = sinon.spy();
    const onCancel = sinon.spy();
    const wrapper = setup(animal, onSave, onCancel);
    expect(wrapper.find(ModalAnimalButtons)).to.have.length(1);
    expect(wrapper.find(ModalAnimalButtons)['node'].props.title).to.equal('INGRESAR');
  });
});
