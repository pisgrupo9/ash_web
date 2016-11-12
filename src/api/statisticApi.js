import api from './apiService';
import * as consts from '../constants/apiConstants';
import moment from 'moment';

class StatisticApi {
  static showDefaultAdoptionStatistic() {
    return api.get(`${consts.API_STAGING_URL}/statistics/adoptions_by_week`);
  }

  static showAdoptionStatistic(date_start, date_finish) {
    return api.get(`${consts.API_STAGING_URL}/statistics/adoptions_by_week?date_from=${date_start}&date_to=${date_finish}`);
  }

  static showAnimalStatistic() {
    return api.get(`${consts.API_STAGING_URL}/statistics/animals_by_species`);
  }

  static showDefaultSpeciesStatistic() {
    return api.get(`${consts.API_STAGING_URL}/statistics/entry_by_week`);
  }

  static showSpeciesStatistic(date_start, date_finish, species_id) {
    return api.get(`${consts.API_STAGING_URL}/statistics/entry_by_week?date_from=${date_start}&date_to=${date_finish}&species_id=${species_id}`);
  }
}

export default StatisticApi;

export const parseAnimalStat = (animalStat) => {
  const color = ["#ED7506", "#F7464A", "#403075", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#AA6C39"];
  const highlight = ["#FD9738", "#FF5A5E", "#605292", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", "#D49A6A"];
  let ret = [];
  for (let i = 0; i < animalStat.length; i++) {
    ret[i] = { value: animalStat[i].animals_count,
                     label: animalStat[i].species_name,
                     color: color[i % highlight.length],
                     highlight: highlight[i % highlight.length] };
  }
  return ret;
};

export const parseAdopterStat = (adopterStat) => {
  let data = [];
  let labels = [];
  let label = '';
  for (let i = 0; i < adopterStat.length; i++) {
    label = moment(adopterStat[i].date_start).format("DD/MM/YYYY");
    data.push(adopterStat[i].adoptions_count);
    labels.push(label);
  }
  let ret = {
    labels,
    datasets: [
      {
        fillColor: '#E06900',
        label: 'Cant. de animales adoptados',
        borderWidth: 1,
        data: data,
        length: 1,
        strokeColor: '#FF871F'
      }
    ]
  };
  return ret;
};

export const parseSpeciesStat = (speciesStat) => {
  let data = [];
  let labels = [];
  let label = '';
  for (let i = 0; i < speciesStat.length; i++) {
    label = moment(speciesStat[i].date_start).format("DD/MM/YYYY");
    data.push(speciesStat[i].entry_count);
    labels.push(label);
  }
  let ret = {
    labels,
    datasets: [
      {
        label: "Animales adoptados por especie",
        fillColor: 'rgba(151,187,205,0.2)',
        pointColor: 'rgba(151,187,205,1)',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        strokeColor: 'rgba(151,187,205,1)',
        data,
        spanGaps: false,
      }
    ]
  };
  return ret;
};
