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
}

export default StatisticApi;

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

export const parseAnimalStat = (animalStat) => {
  const color = ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"];
  const highlight = ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"];
  let ret = [];
  for (let i = 0; i < animalStat.length; i++) {
    ret[i] = { value: animalStat[i].animals_count,
                     label: animalStat[i].species_name,
                     color: color[i % highlight.length],
                     highlight: highlight[i % highlight.length] };
  }
  return ret;
};
