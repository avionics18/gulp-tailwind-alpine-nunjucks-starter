# Gulp TailwindCSS Alpine Nunjucks Starter

Boilerplate HTML starter for your projects.

- Tailwindcss: for all your styling needs
- AlpineJS: for your simple to intermediate javascript needs
- Nunjucks: for your HTML templating needs


### Things To Note:

- While using variables through `{% set %}` command, you can have new lines, no problem in that. But the variable is having Javscript type notation, but delimiter properties like json i.e. last item should not have comma.
- Github Pages will disturb your url, so configuration has been done in the gulpfile.js - baseURL is set as per environment and is passed to nunjucks templates. (**So, if you plan to use your own custom domain, remeber to change the baseURL in gulpfile.js config**)


### DEPLOYMENT

- Before pushing the code to github always run `npm run build`
[] will implement github CI/CD later
