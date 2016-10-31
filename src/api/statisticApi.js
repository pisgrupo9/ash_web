import api from './apiService';
import * as consts from '../constants/apiConstants';

class StatisticApi {
  static showDefaultAdoptionStatistic() {
    return api.get(`${consts.API_STAGING_URL}/statistics/adoptions_by_week`);
  }

  static showAdoptionStatistic(date_start, date_finish) {
    return api.get(`${consts.API_STAGING_URL}/statistics/adoptions_by_week?date_from=${date_start}&date_to=${date_finish}`);
  }
}

export default StatisticApi;

const parseDate = (date) => {
  let arrayDate = date.split("-");
  return arrayDate[2] + "/" + arrayDate[1] + "/" + arrayDate[0];
};

export const parseAdopterStat = (adopterStat) => {
  let data = [];
  let labels = [];
  let label = '';
  for (let i = 0; i < adopterStat.length; i++) {
    label = parseDate(adopterStat[i].date_start);
    data.push(adopterStat[i].adoptions_count);
    labels.push(label);
  }
  let ret = {
    labels: labels,
    datasets: [
      {
        label: "Cant. de animales adoptados",
        borderWidth: 1,
        data: data,
        length: 1
      }
    ]
  };
  return ret;

};
