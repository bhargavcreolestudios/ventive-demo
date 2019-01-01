# ventive-demo

This README would normally document whatever steps are necessary to get your application up and running.

### What's Added ###
- [ReactJs] (https://reactjs.org/docs/create-a-new-react-app.html)
- [Laravel Lumen] (https://lumen.laravel.com)
- [NodeJs] (https://nodejs.org/en/download/package-manager/)
- [Yarn] (https://yarnpkg.com/lang/en/docs/install/#debian-stable)

### How do I get set up? ###

**Summary of set up**

- Clone this repo or download it's release archive and extract it somewhere. Prefer location would be /var/www/html folder on ubuntu, www directory on WAMP, htdocs directory on XAMPP.
- You may delete .git folder if you get this code via git clone
- Run ```npm install``` OR ```yarn install``` in `react-app` directory (to install packages for you project)
- Run ```composer install``` in `lumen-app` directory (to install packages dependancies of lumen-app)
- Run migration and seeder for lumen-app by `php artisan migrate --seed`
- Seeder will create user account with `123456` password, refer user table and use email and mentioned password for login
- In case of issues with migration and seeder, please find `.sql` file inside `database` folder on root.


**Dependencies:**

- Required NodeJs And npm to run a project
- Install with: ```$ sudo apt-get install nodejs```
                ```$ sudo apt-get install npm```


**Server startup:**
- To start lumen server, go to `lumen-app` directory by terminal and run `php -S localhost:8000 -t public`.
- Run ```npm start``` OR ```yarn start```  in your `react-app` directory (to run project)
- React will be run on `http://localhost:3000`
