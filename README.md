# Description

This project template includes a scaffolded web app with the following:

Main app dependencies:

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com)

And developer tools:

- [Oxlint](https://oxc.rs/docs/guide/usage/oxlint)
- [Stylelint](https://stylelint.io/)
- [Husky](https://github.com/typicode/husky)

# Installation

To create a new app based on this project template :

    yarn create next-app -e https://github.com/carlesandres/project-template-supabase

**NOTE**: You **don't** need to create the project subfolder before executing the command.

You will need to setup a project in [Supabase](app.supabase.com) and define `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your `.env.local` file.
