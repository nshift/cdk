"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeQueueName = exports.makeName = exports.makeId = void 0;
const environment_1 = require("./environment");
const lodash_1 = require("./lodash");
const makeId = (...ids) => ids.map((id) => (0, lodash_1.upperFirst)((0, lodash_1.camelize)(id))).join();
exports.makeId = makeId;
const makeName = (...names) => {
    const projectName = environment_1.Environment.projectName();
    const environment = environment_1.Environment.environment();
    return (0, lodash_1.snakelize)([projectName, environment]
        .concat(names)
        .map((name) => (0, lodash_1.upperFirst)((0, lodash_1.camelize)(name)))
        .join()).replace(new RegExp('_', 'g'), '-');
};
exports.makeName = makeName;
const makeQueueName = (...names) => {
    const projectName = environment_1.Environment.projectName();
    const environment = environment_1.Environment.environment();
    return [projectName, environment]
        .concat(names)
        .map((name) => (0, lodash_1.upperFirst)((0, lodash_1.camelize)(name)))
        .join();
};
exports.makeQueueName = makeQueueName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL25hbWluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBMkM7QUFDM0MscUNBQTBEO0FBRW5ELE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUEsbUJBQVUsRUFBQyxJQUFBLGlCQUFRLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0FBQS9FLFFBQUEsTUFBTSxVQUF5RTtBQUVyRixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsS0FBZSxFQUFFLEVBQUU7SUFDN0MsTUFBTSxXQUFXLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUM3QyxNQUFNLFdBQVcsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzdDLE9BQU8sSUFBQSxrQkFBUyxFQUNkLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztTQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFBLG1CQUFVLEVBQUMsSUFBQSxpQkFBUSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDekMsSUFBSSxFQUFFLENBQ1YsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FBQTtBQVRZLFFBQUEsUUFBUSxZQVNwQjtBQUVNLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxLQUFlLEVBQUUsRUFBRTtJQUNsRCxNQUFNLFdBQVcsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzdDLE1BQU0sV0FBVyxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDN0MsT0FBTyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7U0FDOUIsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNiLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBQSxtQkFBVSxFQUFDLElBQUEsaUJBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3pDLElBQUksRUFBRSxDQUFBO0FBQ1gsQ0FBQyxDQUFBO0FBUFksUUFBQSxhQUFhLGlCQU96QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudmlyb25tZW50IH0gZnJvbSAnLi9lbnZpcm9ubWVudCdcbmltcG9ydCB7IGNhbWVsaXplLCBzbmFrZWxpemUsIHVwcGVyRmlyc3QgfSBmcm9tICcuL2xvZGFzaCdcblxuZXhwb3J0IGNvbnN0IG1ha2VJZCA9ICguLi5pZHM6IHN0cmluZ1tdKSA9PiBpZHMubWFwKChpZCkgPT4gdXBwZXJGaXJzdChjYW1lbGl6ZShpZCkpKS5qb2luKClcblxuZXhwb3J0IGNvbnN0IG1ha2VOYW1lID0gKC4uLm5hbWVzOiBzdHJpbmdbXSkgPT4ge1xuICBjb25zdCBwcm9qZWN0TmFtZSA9IEVudmlyb25tZW50LnByb2plY3ROYW1lKClcbiAgY29uc3QgZW52aXJvbm1lbnQgPSBFbnZpcm9ubWVudC5lbnZpcm9ubWVudCgpXG4gIHJldHVybiBzbmFrZWxpemUoXG4gICAgW3Byb2plY3ROYW1lLCBlbnZpcm9ubWVudF1cbiAgICAgIC5jb25jYXQobmFtZXMpXG4gICAgICAubWFwKChuYW1lKSA9PiB1cHBlckZpcnN0KGNhbWVsaXplKG5hbWUpKSlcbiAgICAgIC5qb2luKClcbiAgKS5yZXBsYWNlKG5ldyBSZWdFeHAoJ18nLCAnZycpLCAnLScpXG59XG5cbmV4cG9ydCBjb25zdCBtYWtlUXVldWVOYW1lID0gKC4uLm5hbWVzOiBzdHJpbmdbXSkgPT4ge1xuICBjb25zdCBwcm9qZWN0TmFtZSA9IEVudmlyb25tZW50LnByb2plY3ROYW1lKClcbiAgY29uc3QgZW52aXJvbm1lbnQgPSBFbnZpcm9ubWVudC5lbnZpcm9ubWVudCgpXG4gIHJldHVybiBbcHJvamVjdE5hbWUsIGVudmlyb25tZW50XVxuICAgIC5jb25jYXQobmFtZXMpXG4gICAgLm1hcCgobmFtZSkgPT4gdXBwZXJGaXJzdChjYW1lbGl6ZShuYW1lKSkpXG4gICAgLmpvaW4oKVxufVxuIl19