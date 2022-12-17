# yeka_server

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/jsoftware1/projects/yeka_server.git
git branch -M main
git push -uf origin main
```

# 인프라 정보(aws)

1. nodejs
2. pm2
3. nginx
   /etc/nginx/
4. ubuntu 22.04 : aws 웹으로 터미널 접근
5. 52.79.240.88
6. mysql : sudo mysql, config.json 에 접속정보 있음
7. /home/ubuntu/project/pyechago_web : git url (https://gitlab.com/jsoftware1/projects/pyechago/pyechago_web)

```shell
sudo apt update
sudo apt upgrade
mysql -uworldrecycling -p
cd project/pyechago_web/
sudo apt install npm
npm install
vi .env
mkdir config
vi config/config.json
sudo apt install mysql-server
sudo systemctl start mysql.service
sudo mysql
sudo mysql -uworldrecycling -p
npm start
sudo npm i -g nodemon
sudo npm i -g pm2
sudo npm i -g sequelize-cli
sudo apt install nginx
sudo vi /etc/nginx/sites-available/yeka
sudo vi /etc/nginx/nginx.conf
pm2 init simple
vi ecosystem.config.js
cd seeders/
rm 00.supplierusers.js 02.carinfo.js 03.clients.js 04.process.js 05.request.js imageSetting.js notice.js parts.js review.js users.js
sequelize init
sequelize db:seed:all
vi .sequelizerc
npm start
sudo service nginx status
vi /etc/nginx/nginx.conf
ln /etc/nginx/sites-available/yeka /etc/nginx/sites-enabled/yeka
sudo ln /etc/nginx/sites-available/yeka /etc/nginx/sites-enabled/yeka
sudo service nginx restart
```
