import * as types from './actionTypes';
import statisticApi from '../api/statisticApi';

export const showAdoptionStatisticSuccess = (response) => {
  return {
    type: types.REQUEST_ADOPTION_STATISTIC_SUCCESS,
    response
  };
};

export const showAnimalStatisticSuccess = (response) => {
  return {
    type: types.REQUEST_ANIMAL_STATISTIC_SUCCESS,
    response
  };
};

export const loadAdoptionStatistic = (date_start, date_finish) => {
  return (dispatch) => {
    return statisticApi.showAdoptionStatistic(date_start, date_finish).then((response) => {
      dispatch(showAdoptionStatisticSuccess(response));
    }).catch(err => {
      throw err;
    });
  };
};

export const loadDefaultAdoptionStatistic = () => {
  return (dispatch) => {
    return statisticApi.showDefaultAdoptionStatistic().then((response) => {
      dispatch(showAdoptionStatisticSuccess(response));
    }).catch(err => {
      throw err;
    });
  };
};

export const loadAnimalStatistic = () => {
  return (dispatch) => {
    return statisticApi.showAnimalStatistic().then((response) => {
      dispatch(showAnimalStatisticSuccess(response));
    }).catch(err => {
      throw err;
    });
  };
};
