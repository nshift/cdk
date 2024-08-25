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
        .join('')).replace(new RegExp('_', 'g'), '-');
};
exports.makeName = makeName;
const makeQueueName = (...names) => {
    const projectName = environment_1.Environment.projectName();
    const environment = environment_1.Environment.environment();
    return [projectName, environment]
        .concat(names)
        .map((name) => (0, lodash_1.upperFirst)((0, lodash_1.camelize)(name)))
        .join('');
};
exports.makeQueueName = makeQueueName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL25hbWluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBMkM7QUFDM0MscUNBQTBEO0FBRW5ELE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUEsbUJBQVUsRUFBQyxJQUFBLGlCQUFRLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0FBQS9FLFFBQUEsTUFBTSxVQUF5RTtBQUVyRixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsS0FBZSxFQUFFLEVBQUU7SUFDN0MsTUFBTSxXQUFXLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUM3QyxNQUFNLFdBQVcsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzdDLE9BQU8sSUFBQSxrQkFBUyxFQUNkLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztTQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFBLG1CQUFVLEVBQUMsSUFBQSxpQkFBUSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDekMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUNaLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUE7QUFUWSxRQUFBLFFBQVEsWUFTcEI7QUFFTSxNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQUcsS0FBZSxFQUFFLEVBQUU7SUFDbEQsTUFBTSxXQUFXLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUM3QyxNQUFNLFdBQVcsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzdDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO1NBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDYixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUEsbUJBQVUsRUFBQyxJQUFBLGlCQUFRLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN6QyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDYixDQUFDLENBQUE7QUFQWSxRQUFBLGFBQWEsaUJBT3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW52aXJvbm1lbnQgfSBmcm9tICcuL2Vudmlyb25tZW50J1xuaW1wb3J0IHsgY2FtZWxpemUsIHNuYWtlbGl6ZSwgdXBwZXJGaXJzdCB9IGZyb20gJy4vbG9kYXNoJ1xuXG5leHBvcnQgY29uc3QgbWFrZUlkID0gKC4uLmlkczogc3RyaW5nW10pID0+IGlkcy5tYXAoKGlkKSA9PiB1cHBlckZpcnN0KGNhbWVsaXplKGlkKSkpLmpvaW4oKVxuXG5leHBvcnQgY29uc3QgbWFrZU5hbWUgPSAoLi4ubmFtZXM6IHN0cmluZ1tdKSA9PiB7XG4gIGNvbnN0IHByb2plY3ROYW1lID0gRW52aXJvbm1lbnQucHJvamVjdE5hbWUoKVxuICBjb25zdCBlbnZpcm9ubWVudCA9IEVudmlyb25tZW50LmVudmlyb25tZW50KClcbiAgcmV0dXJuIHNuYWtlbGl6ZShcbiAgICBbcHJvamVjdE5hbWUsIGVudmlyb25tZW50XVxuICAgICAgLmNvbmNhdChuYW1lcylcbiAgICAgIC5tYXAoKG5hbWUpID0+IHVwcGVyRmlyc3QoY2FtZWxpemUobmFtZSkpKVxuICAgICAgLmpvaW4oJycpXG4gICkucmVwbGFjZShuZXcgUmVnRXhwKCdfJywgJ2cnKSwgJy0nKVxufVxuXG5leHBvcnQgY29uc3QgbWFrZVF1ZXVlTmFtZSA9ICguLi5uYW1lczogc3RyaW5nW10pID0+IHtcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBFbnZpcm9ubWVudC5wcm9qZWN0TmFtZSgpXG4gIGNvbnN0IGVudmlyb25tZW50ID0gRW52aXJvbm1lbnQuZW52aXJvbm1lbnQoKVxuICByZXR1cm4gW3Byb2plY3ROYW1lLCBlbnZpcm9ubWVudF1cbiAgICAuY29uY2F0KG5hbWVzKVxuICAgIC5tYXAoKG5hbWUpID0+IHVwcGVyRmlyc3QoY2FtZWxpemUobmFtZSkpKVxuICAgIC5qb2luKCcnKVxufVxuIl19