import * as types from './actionTypes';
import statisticApi, { parseAdopterStat, parseAnimalStat, parseSpeciesStat } from '../api/statisticApi';

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

export const showSpeciesStatisticSuccess = (statInfo) => {
  return {
    type: types.REQUEST_SPECIES_STATISTIC_SUCCESS,
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

export const loadDefaultSpeciesStatistic = () => {
  return (dispatch) => {
    return statisticApi.showDefaultSpeciesStatistic().then((response) => {
      let statInfo = parseSpeciesStat(response.datos);
      dispatch(showSpeciesStatisticSuccess(statInfo));
    }).catch(err => {
      throw err;
    });
  };
};

export const loadSpeciesStatistic = (dateStart, dateFinish, specie) => {
  return (dispatch) => {
    return statisticApi.showSpeciesStatistic(dateStart, dateFinish, specie).then((response) => {
      let statInfo = parseSpeciesStat(response.datos);
      dispatch(showSpeciesStatisticSuccess(statInfo));
    }).catch(err => {
      throw err;
    });
  };
};
