import * as types from './actionTypes';
import statisticApi, { parseAdopterStat, parseAnimalStat } from '../api/statisticApi';

export const showAdoptionStatisticSuccess = (statInfo) => {
  return {
    type: types.REQUEST_ADOPTION_STATISTIC_SUCCESS,
    statInfo
  };
};

export const showAnimalStatisticSuccess = (statInfo) => {
  return {
    type: types.REQUEST_ANIMAL_STATISTIC_SUCCESS,
    statInfo
  };
};

export const loadAdoptionStatistic = (dateStart, dateFinish) => {
  return (dispatch) => {
    return statisticApi.showAdoptionStatistic(dateStart, dateFinish).then((response) => {
      let statInfo = parseAdopterStat(response.datos);
      dispatch(showAdoptionStatisticSuccess(statInfo));
    }).catch(err => {
      throw err;
    });
  };
};

export const loadDefaultAdoptionStatistic = () => {
  return (dispatch) => {
    return statisticApi.showDefaultAdoptionStatistic().then((response) => {
      let statInfo = parseAdopterStat(response.datos);
      dispatch(showAdoptionStatisticSuccess(statInfo));
    }).catch(err => {
      throw err;
    });
  };
};

export const loadAnimalStatistic = () => {
  return (dispatch) => {
    return statisticApi.showAnimalStatistic().then((response) => {
      let statInfo = parseAnimalStat(response.datos);
      dispatch(showAnimalStatisticSuccess(statInfo));
    }).catch(err => {
      throw err;
    });
  };
};
