# Multi-step form

to run the application first run the command "npm install" and then to launch the development server run "npm run dev" - the application will open on http://localhost:5173/

The app was developed on node version 20.12.2 using react version 18.2 setup with Vite.

For the form I've used the react-hook-from library with yup for validation.

## Form submition
With the post request I intentionally show the success component at the end every though the reuqest fails - in a real world scenario a error should be thrown/handled and a error message displayed in UI.


### Suggestions for improvement
-Refactor code to sepparate the layout and logic more

-Move the fetching logic to a Api class

-Make a icon font (f.e. fontello)