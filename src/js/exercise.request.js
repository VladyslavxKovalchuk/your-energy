import ExerciseFilterType from './exercise.filter-type.js';
class ExerciseRequest {
  constructor({
    bodypart,
    muscles,
    equipment,
    keyword,
    page = 1,
    limit = 10,
  } = {}) {
    this.bodypart = bodypart;
    this.muscles = muscles;
    this.equipment = equipment;
    this.keyword = keyword;
    this.page = page;
    this.limit = limit;
  }
  
  addFilter(filterType, filterValue) {
    switch (filterType) {
      case ExerciseFilterType.MUSCLES:
        this.muscles = filterValue;
        break;
      case ExerciseFilterType.BODY_PART:
        this.bodypart = filterValue;
        break;
      case ExerciseFilterType.EQUIPMENT:
        this.equipment = filterValue;
        break;
    }
  }

  addKeyword(keyword) {
    this.keyword = keyword
  }

  toParams() {
    const params = {};
    if (this.bodypart) params.bodypart = this.bodypart;
    if (this.muscles) params.muscles = this.muscles;
    if (this.equipment) params.equipment = this.equipment;
    if (this.keyword) params.keyword = this.keyword;
    params.page = this.page;
    params.limit = this.limit;
    return params;
  }
}

export default ExerciseRequest;
