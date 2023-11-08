export class Environment {
}
Environment.projectName = () => required('PROJECT_NAME');
Environment.region = () => required('REGION');
Environment.environment = () => required('ENVIRONMENT');
function required(environmentName) {
    const environmentVariable = process.env[environmentName];
    if (!environmentVariable) {
        throw new Error(`Environment variable ${environmentName} is required.`);
    }
    return environmentVariable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZW52aXJvbm1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFdBQVc7O0FBQ2YsdUJBQVcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDNUMsa0JBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDakMsdUJBQVcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUE7QUFHcEQsU0FBUyxRQUFRLENBQUMsZUFBdUI7SUFDdkMsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ3hELElBQUksQ0FBQyxtQkFBbUIsRUFBRTtRQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixlQUFlLGVBQWUsQ0FBQyxDQUFBO0tBQ3hFO0lBQ0QsT0FBTyxtQkFBbUIsQ0FBQTtBQUM1QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEVudmlyb25tZW50IHtcbiAgc3RhdGljIHByb2plY3ROYW1lID0gKCkgPT4gcmVxdWlyZWQoJ1BST0pFQ1RfTkFNRScpXG4gIHN0YXRpYyByZWdpb24gPSAoKSA9PiByZXF1aXJlZCgnUkVHSU9OJylcbiAgc3RhdGljIGVudmlyb25tZW50ID0gKCkgPT4gcmVxdWlyZWQoJ0VOVklST05NRU5UJylcbn1cblxuZnVuY3Rpb24gcmVxdWlyZWQoZW52aXJvbm1lbnROYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgZW52aXJvbm1lbnRWYXJpYWJsZSA9IHByb2Nlc3MuZW52W2Vudmlyb25tZW50TmFtZV1cbiAgaWYgKCFlbnZpcm9ubWVudFZhcmlhYmxlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFbnZpcm9ubWVudCB2YXJpYWJsZSAke2Vudmlyb25tZW50TmFtZX0gaXMgcmVxdWlyZWQuYClcbiAgfVxuICByZXR1cm4gZW52aXJvbm1lbnRWYXJpYWJsZVxufVxuIl19